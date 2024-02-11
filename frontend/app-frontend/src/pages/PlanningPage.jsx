import Confirm from "../components/Confirm";
import Modal from "../components/Modal";
import {
  getAllBusLineDatesAndTimes,
  getAllBusLines,
  getAllReservations,
  getUserById,
  createReservation,
} from "../services/user.service";
import TokenExpired from "../components/TokenExpired";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth.service";
import { calculateTotalPrice } from "../services/utils";
import TripSelection from "../components/TripSelection";
import SeatSelection from "../components/SeatSelection";
import DetailsSelection from "../components/DetailsSelection";

import classes from "./PlanningPage.module.css";
import modalClasses from "../components/Modal.module.css";

export default function PlanningPage() {
  const [busLines, setBusLines] = useState([]);
  const [busLineDateTime, setBusLineDateTime] = useState([]);

  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [alreadyReserved, setAlreadyReserved] = useState({});

  const [openExpiredModal, setOpenExpiredModal] = useState(false);

  const [selectedData, setSelectedData] = useState({
    startingCity: "",
    destinationCity: "",
    date: "",
    time: "",
    totalPrice: 0,
    numberOfSelectedSeats: [],
  });

  // open modal
  const openConfirm = () => {
    const total = calculateTotalPrice(selectedSeats, busLines);
    setSelectedData({
      startingCity: selectedFrom,
      destinationCity: selectedTo,
      date: selectedDate,
      totalPrice: total,
      numberOfSelectedSeats: selectedSeats.length,
    });
    setIsModalOpen(true);
  };

  // close modal
  const closeConfirm = () => setIsModalOpen(false);

  // click on seats
  const handleClick = (busLineId, seatContent) => {
    const selectedSeat = { busLineId, seatContent };

    const isAlreadySelected = selectedSeats.some(
      (seat) =>
        seat.busLineId === selectedSeat.busLineId &&
        seat.seatContent === selectedSeat.seatContent
    );

    if (isAlreadySelected) {
      setSelectedSeats((prevSeats) =>
        prevSeats.filter(
          (seat) =>
            seat.busLineId !== selectedSeat.busLineId ||
            seat.seatContent !== selectedSeat.seatContent
        )
      );
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, selectedSeat]);
    }
  };

  //Render seats
  const renderSeats = (busLineId) => {
    const seatDiv = [];

    let seatNumber = 1;

    for (let row = 0; row < 5; row++) {
      const columns = [];

      for (let col = 0; col < 8; col++) {
        const isDisabled = row === 2 && col !== 7;
        const isUnnumbered = row === 2 && (col === 4 || col === 12);
        const isLastTwoRows = row >= 3;
        const isLastTwoRowsColumn = isLastTwoRows && col === 3;

        const isClickable =
          !isDisabled && !isUnnumbered && !isLastTwoRowsColumn;

        const currentCellStyle = isDisabled
          ? [classes.cellStyle, classes.disabledCellStyle].join(" ")
          : isLastTwoRowsColumn
          ? [classes.cellStyle, classes.disabledCellStyle].join(" ")
          : classes.cellStyle;

        const isSelected = selectedSeats.some(
          (seat) =>
            seat.busLineId === busLineId && seat.seatContent === seatNumber
        );

        const seatClickHandler = isClickable
          ? (
              (num) => () =>
                handleClick(busLineId, num)
            )(seatNumber)
          : null;

        const isReserved = alreadyReserved[busLineId]?.includes(seatNumber);

        columns.push(
          <div
            key={`${busLineId}-${row}-${col}`}
            onClick={seatClickHandler}
            className={`${currentCellStyle} ${
              isSelected ? classes.selected : ""
            } ${isReserved ? classes.reserved : ""}`}
          >
            {isClickable && seatNumber}
          </div>
        );

        if (isClickable) {
          seatNumber++;
        }
      }

      seatDiv.push(<div key={row}>{columns}</div>);
    }

    return seatDiv;
  };

  // FETCH
  useEffect(() => {
    async function fetchData() {
      try {
        const linesResponse = await getAllBusLines();
        setBusLines(linesResponse.data);

        const datetimeResponse = await getAllBusLineDatesAndTimes();
        setBusLineDateTime(datetimeResponse.data);
      } catch (error) {
        if (error.message === "Your token is expired. Please login again.") {
          setOpenExpiredModal(true);
        } else {
          console.error("Error while fetching data", error);
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchReservedSeats() {
      try {
        if (selectedFrom && selectedTo && selectedDate && selectedTime) {
          const busLineId = getLineId(selectedFrom, selectedTo);
          const reservationsResponse = await getAllReservations();

          const reservedSeatsData = {};

          reservationsResponse.data.forEach((res) => {
            const lineId = getLineId(
              res.bus_line.split("-")[0].trim(),
              res.bus_line.split("-")[1].trim()
            );

            if (
              lineId !== null &&
              lineId === busLineId &&
              res.reservation_date === selectedDate &&
              res.reservation_time.split(":").slice(0, 2).join(":") ===
                selectedTime
            ) {
              if (!reservedSeatsData[lineId]) {
                reservedSeatsData[lineId] = [];
              }

              reservedSeatsData[lineId].push(
                ...res.selected_seats.split(",").map(Number)
              );
            }
          });

          setAlreadyReserved(reservedSeatsData);
        }
      } catch (error) {
        console.error("Error while fetching reserved seats data", error);
      }
    }

    fetchReservedSeats();
  }, [selectedFrom, selectedTo, selectedDate, selectedTime]);

  function handleClearSelectedSeats() {
    setSelectedSeats([]);
  }

  function handleSelectFromChange(e) {
    const { value } = e.target;
    setSelectedFrom(value);

    setSelectedTo("");
    setSelectedDate("");
    setSelectedTime("");
  }

  function handleSelectToChange(e) {
    const { value } = e.target;
    setSelectedTo(value);

    setSelectedDate("");
    setSelectedTime("");
  }

  function handleSelectDateChange(e) {
    const { value } = e.target;
    setSelectedDate(value);
    setSelectedTime("");
  }

  function handleSelectTimeChange(e) {
    const { value } = e.target;
    setSelectedTime(value);
  }

  //Get lineId
  const getLineId = (from, to) => {
    const line = `${from}-${to}`;
    const busLine = busLines.find((bl) => bl.name === line);
    return busLine ? busLine.id : null;
  };

  //Grouping Date by id
  const groupedDatesByLineId = busLineDateTime.reduce((grouped, date) => {
    const lineId = date.busLine.id;
    if (!grouped[lineId]) {
      grouped[lineId] = [];
    }
    grouped[lineId].push(date);
    return grouped;
  }, {});

  //Grouping Time by id
  const groupedTimesByLineId = busLineDateTime.reduce((grouped, time) => {
    const lineId = time.busLine.id;
    const formattedTime = time.time.split(":").slice(0, 2).join(":");

    if (!grouped[lineId]) {
      grouped[lineId] = [];
    }
    grouped[lineId].push(formattedTime);
    return grouped;
  }, {});

  //Send Data
  async function handleSubmitConfirm() {
    try {
      const user = getCurrentUser();
      const userId = user.id;

      const currentUserResponse = await getUserById(userId);
      const currentUserData = currentUserResponse.data;
      const currentUser =
        currentUserData.lastname + " " + currentUserData.firstname;
      const currentUsername = currentUserData.username;

      const busLineId = getLineId(selectedFrom, selectedTo);
      const selectedBusLine =
        busLines.find((l) => l.id === busLineId)?.name || null;

      const reservedSeats = selectedSeats
        .map((seat) => seat.seatContent)
        .sort((a, b) => a - b)
        .join(", ");

      const reservationData = {
        bus_line: selectedBusLine,
        price: calculateTotalPrice(selectedSeats, busLines),
        reservation_date: selectedDate,
        reservation_time: selectedTime,
        seat_number: selectedSeats.length,
        username: currentUsername,
        selected_seats: reservedSeats,
        user: currentUser,
      };

      await createReservation(reservationData);

      setTimeout(() => {
        closeConfirm();
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setSelectedFrom("");
      setSelectedTo("");
      setSelectedDate("");
      setSelectedTime("");
      setSelectedSeats([]);
      calculateTotalPrice(selectedSeats, busLines);
    }
  }

  return (
    <>
      <div className={classes.planContainer}>
        <div className={classes.planBox}>
          <div className={classes.planBoxBody}>
            <TripSelection
              busLines={busLines}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              handleSelectFromChange={handleSelectFromChange}
              handleSelectToChange={handleSelectToChange}
              handleSelectDateChange={handleSelectDateChange}
              handleSelectTimeChange={handleSelectTimeChange}
              getLineId={getLineId}
              groupedDatesByLineId={groupedDatesByLineId}
              groupedTimesByLineId={groupedTimesByLineId}
            />

            <SeatSelection
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              groupedDatesByLineId={groupedDatesByLineId}
              getLineId={getLineId}
              handleClearSelectedSeats={handleClearSelectedSeats}
              renderSeats={renderSeats}
            />

            <DetailsSelection
              busLines={busLines}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
              getLineId={getLineId}
              calculateTotalPrice={calculateTotalPrice}
              selectedSeats={selectedSeats}
            />
          </div>
          <div className={classes.planBoxFooter}>
            <button onClick={openConfirm} type="button">
              Create reservation
            </button>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} className={modalClasses.modalContainer}>
        <Confirm
          onCloseConfirm={closeConfirm}
          selectedData={selectedData}
          onSubmitConfirm={handleSubmitConfirm}
        />
      </Modal>

      {openExpiredModal && (
        <Modal open={openExpiredModal} className={modalClasses.modalContainer}>
          <TokenExpired />
        </Modal>
      )}
    </>
  );
}
