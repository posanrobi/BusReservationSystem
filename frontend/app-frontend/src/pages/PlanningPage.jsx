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

/**
 * Component for planning and creating reservations.
 *
 * @returns {JSX.Element} The PlanningPage component.
 */
export default function PlanningPage() {
  /**
   * State variable for storing bus lines.
   * @type {Array<Object>}
   */
  const [busLines, setBusLines] = useState([]);

  /**
   * State variable for storing bus line dates and times.
   * @type {Array<Object>}
   */
  const [busLineDateTime, setBusLineDateTime] = useState([]);

  /**
   * State variable for storing starting city of the bus line.
   * @type {String}
   */
  const [selectedFrom, setSelectedFrom] = useState("");

  /**
   * State variable for storing destination city of the bus line.
   * @type {String}
   */
  const [selectedTo, setSelectedTo] = useState("");

  /**
   * State variable for storing the date of the bus line.
   * @type {String}
   */
  const [selectedDate, setSelectedDate] = useState("");

  /**
   * State variable for storing the time of the bus line.
   * @type {String}
   */
  const [selectedTime, setSelectedTime] = useState("");

  /**
   * State variable for managing the visibility of the confirmation modal.
   * @type {boolean}
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * State variable for storing the selected seats.
   * @type {Array<Object>}
   */
  const [selectedSeats, setSelectedSeats] = useState([]);

  /**
   * State variable for storing information about already reserved seats.
   * @type {Object}
   */
  const [alreadyReserved, setAlreadyReserved] = useState({});

  /**
   * State variable for managing the visibility of the token expiration modal.
   * @type {boolean}
   */
  const [openExpiredModal, setOpenExpiredModal] = useState(false);

  /**
   * State variable for storing data related to the confirmed reservation.
   * @type {Object}
   */
  const [selectedData, setSelectedData] = useState({
    startingCity: "",
    destinationCity: "",
    date: "",
    time: "",
    totalPrice: 0,
    numberOfSelectedSeats: [],
  });

  /**
   * Function to open the confirmation modal.
   */
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

  /**
   * Function to close the confirmation modal.
   */
  const closeConfirm = () => setIsModalOpen(false);

  /**
   * Function to handle click on a seat.
   * @param {string} busLineId - The ID of the bus line.
   * @param {number} seatContent - The seat number.
   */
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

  /**
   * Function to render the seats for a specific bus line.
   * @param {string} busLineId - The ID of the bus line.
   * @returns {JSX.Element[]} An array of JSX elements representing the seats.
   */
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

  /**
   * Fetching buslines and dates and times.
   */
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

  /**
   * Checking that a seat is reserved or not.
   */
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

  /**
   * Function to clear the selected seats.
   */
  function handleClearSelectedSeats() {
    setSelectedSeats([]);
  }

  /**
   * Function to handle the change event when selecting the starting city.
   * @param {Event} e - The change event object.
   */
  function handleSelectFromChange(e) {
    const { value } = e.target;
    setSelectedFrom(value);

    setSelectedTo("");
    setSelectedDate("");
    setSelectedTime("");
  }

  /**
   * Function to handle the change event when selecting the destination city.
   * @param {Event} e - The change event object.
   */
  function handleSelectToChange(e) {
    const { value } = e.target;
    setSelectedTo(value);

    setSelectedDate("");
    setSelectedTime("");
  }

  /**
   * Function to handle the change event when selecting the date.
   * @param {Event} e - The change event object.
   */
  function handleSelectDateChange(e) {
    const { value } = e.target;
    setSelectedDate(value);
    setSelectedTime("");
  }

  /**
   * Function to handle the change event when selecting the time.
   * @param {Event} e - The change event object.
   */
  function handleSelectTimeChange(e) {
    const { value } = e.target;
    setSelectedTime(value);
  }

  /**
   * Function to get the ID of a bus line based on its starting and destination cities.
   * @param {string} from - The starting city.
   * @param {string} to - The destination city.
   * @returns {string|null} The ID of the bus line if found, or null if not found.
   */
  const getLineId = (from, to) => {
    const line = `${from}-${to}`;
    const busLine = busLines.find((bl) => bl.name === line);
    return busLine ? busLine.id : null;
  };

  /**
   * Object storing dates grouped by bus line ID.
   * @type {Object<string, Array<Object>>}
   */
  const groupedDatesByLineId = busLineDateTime.reduce((grouped, date) => {
    const lineId = date.busLine.id;
    if (!grouped[lineId]) {
      grouped[lineId] = [];
    }
    grouped[lineId].push(date);
    return grouped;
  }, {});

  /**
   * Object storing times grouped by bus line ID.
   * @type {Object<string, Array<string>>}
   */
  const groupedTimesByLineId = busLineDateTime.reduce((grouped, time) => {
    const lineId = time.busLine.id;
    const formattedTime = time.time.split(":").slice(0, 2).join(":");

    if (!grouped[lineId]) {
      grouped[lineId] = [];
    }
    grouped[lineId].push(formattedTime);
    return grouped;
  }, {});

  /**
   * Function to handle the submission of the reservation confirmation.
   */
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
