import Confirm from "../components/Confirm";
import Modal from "../components/Modal";
import {
  getAllBusLineDatesAndTimes,
  getAllBusLines,
  getAllReservations,
  getUserById,
} from "../services/user.service";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth.service";
import { createReservation } from "../services/user.service";
import { TbTrash } from "react-icons/tb";

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
    const total = calculateTotalPrice();
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
        console.error("Error while fetching data", error);
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
  }

  function handleSelectToChange(e) {
    const { value } = e.target;
    setSelectedTo(value);

    setSelectedDate("");
  }

  function handleSelectDateChange(e) {
    const { value } = e.target;
    setSelectedDate(value);
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

  //Total
  const calculateTotalPrice = () => {
    const totalPrice = selectedSeats.reduce((total, seat) => {
      const busLine = busLines.find((bl) => bl.id === seat.busLineId);
      const seatPrice = busLine ? busLine.price : 0;
      return total + seatPrice;
    }, 0);
    return totalPrice;
  };

  // Send Data
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
        price: calculateTotalPrice(),
        reservation_date: selectedDate,
        reservation_time: selectedTime,
        seat_number: selectedSeats.length,
        username: currentUsername,
        selected_seats: reservedSeats,
        user: currentUser,
      };

      const response = await createReservation(reservationData);

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
      calculateTotalPrice();
    }
  }

  return (
    <>
      <div className={classes.planContainer}>
        <div className={classes.planBox}>
          <div className={classes.planBoxBody}>
            <div className={classes.tripDiv}>
              <h2>Plan your trip</h2>

              {/* FROM */}
              <label>
                From:
                <div className={classes.dropDownBox}>
                  <select
                    className={classes.select}
                    onChange={handleSelectFromChange}
                    value={selectedFrom}
                  >
                    <option value="" disabled>
                      Choose your starting place
                    </option>
                    {/*ADDED*/}
                    {Array.from(
                      new Set(
                        busLines.map((busLine) =>
                          busLine.name.split("-")[0].trim()
                        )
                      )
                    )
                      .sort()
                      .map((startingPlace) => (
                        <option key={startingPlace} value={startingPlace}>
                          {startingPlace}
                        </option>
                      ))}
                  </select>
                </div>
              </label>

              {/* TO */}
              <label>
                To:
                <div className={classes.dropDownBox}>
                  <select
                    className={classes.select}
                    onChange={handleSelectToChange}
                    value={selectedTo}
                  >
                    <option value="" disabled>
                      Choose your destination place
                    </option>
                    {busLines
                      .filter(
                        (busLine) =>
                          busLine.name.split("-")[0].trim() === selectedFrom
                      )
                      .sort((a, b) => {
                        const cityA = a.name.split("-")[1].trim();
                        const cityB = b.name.split("-")[1].trim();
                        return cityA.localeCompare(cityB);
                      })
                      .map((busLine) => (
                        <option
                          key={busLine.id}
                          value={busLine.name.split("-")[1].trim()}
                        >
                          {busLine.name.split("-")[1].trim()}
                        </option>
                      ))}
                  </select>
                </div>
              </label>

              {/* DATE */}
              <label>
                Available dates:
                <div className={classes.dropDownBox}>
                  <select
                    className={classes.select}
                    onChange={handleSelectDateChange}
                    value={selectedDate}
                  >
                    <option value="" disabled>
                      Choose a date
                    </option>

                    {selectedTo &&
                      Array.from(
                        new Set(
                          groupedDatesByLineId[
                            getLineId(selectedFrom, selectedTo)
                          ]?.map((date) => date.date) || []
                        )
                      )
                        .sort()
                        .map((date) => (
                          <option key={date} value={date}>
                            {date}
                          </option>
                        ))}
                  </select>
                </div>
              </label>

              {/* TIME */}
              <label>
                Available times:
                <div className={classes.dropDownBox}>
                  <select
                    className={classes.select}
                    onChange={handleSelectTimeChange}
                    value={selectedTime}
                  >
                    <option value="" disabled>
                      Choose a time
                    </option>

                    {selectedDate &&
                      Array.from(
                        new Set(
                          groupedTimesByLineId[
                            getLineId(selectedFrom, selectedTo)
                          ]?.map((time) => time) || []
                        )
                      )
                        .sort()
                        .map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                  </select>
                </div>
              </label>

              {/* PRICE */}
              <label>
                Price:
                <div>
                  {busLines.map((busLine) => {
                    const selectedLine = getLineId(selectedFrom, selectedTo);

                    if (busLine.id === selectedLine) {
                      return <p key={busLine.id}>{busLine.price} Ft / seat</p>;
                    }
                  })}
                  {!selectedTo && (
                    <p className={classes.noItemMessage}>No price available</p>
                  )}
                </div>
              </label>
            </div>

            {/* SEATS */}
            <div className={classes.seatsDiv}>
              <div className={classes.seatsDivHeader}>
                <p>Available seats:</p>
                <span>
                  <TbTrash onClick={handleClearSelectedSeats} />
                </span>
              </div>
              {!selectedTime && (
                <p className={classes.noItemMessage}>No seats available</p>
              )}
              <div className={classes.seats}>
                {selectedFrom &&
                  selectedTo &&
                  selectedDate &&
                  selectedTime &&
                  groupedDatesByLineId[getLineId(selectedFrom, selectedTo)] &&
                  groupedDatesByLineId[getLineId(selectedFrom, selectedTo)]
                    .filter((date) => date.busLine)
                    .slice(0, 1)
                    .map((date) => {
                      const busLineId = getLineId(
                        date.busLine.name.split("-")[0].trim(),
                        date.busLine.name.split("-")[1].trim()
                      );
                      return renderSeats(busLineId);
                    })}
              </div>
            </div>

            {/* DEATAILS */}
            <div className={classes.detailsDiv}>
              <ul>
                <li>Free 🟩</li>
                <li>Booked 🟥</li>
                <li>Selected ⬛</li>
              </ul>

              {/* TOTAL */}
              <div>
                <p>Total: {calculateTotalPrice()} Ft</p>
              </div>
            </div>
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
    </>
  );
}
