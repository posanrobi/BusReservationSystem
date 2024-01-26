import Confirm from "../components/Confirm";
import Modal from "../components/Modal";
import {
  getAllBusLineDatesAndTimes,
  getAllBusLines,
  getUserById,
} from "../services/user.service";
import { useState, useEffect } from "react";
import { TbTrash, TbInfoCircle } from "react-icons/tb";

import classes from "./PlanningPage.module.css";
import modalClasses from "../components/Modal.module.css";
import { getCurrentUser, createReservation } from "../services/auth.service";

export default function PlanningPage() {
  const [busLines, setBusLines] = useState([]);
  const [busLineDateTime, setBusLineDateTime] = useState([]);

  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [selectedData, setSelectedData] = useState({
    startingCity: "",
    destinationCity: "",
    date: "",
    time: "",
    totalPrice: 0,
    numberOfSelectedSeats: [],
  });

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
  const closeConfirm = () => setIsModalOpen(false);

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

  useEffect(() => {
    console.log(selectedSeats);
  }, [selectedSeats]);

  //----------------------------------------------------------------
  /* const renderSeats = (busLineId, seatNum) => {
    const seatDivs = [];
    const seatsPerRow = 4;
    const totalSeats = 32; //31 a jó

    const rows = Math.ceil(totalSeats / seatsPerRow);

    for (let row = 1; row <= rows; row++) {
      const rowDivs = [];

      for (let col = 1; col <= seatsPerRow; col++) {
        const seatNumber = col + (row - 1) * seatsPerRow;

        if (seatNumber <= totalSeats) {
          const isSelected = selectedSeats.some(
            (seat) =>
              seat.busLineId === busLineId && seat.seatContent === seatNumber
          );

          rowDivs.push(
            <div
              onClick={() => handleClick(busLineId, seatNumber)}
              className={`${classes.seat} ${
                isSelected ? classes.selected : ""
              }`}
              key={`${busLineId}-${row}-${col}`}
            >
              {seatNumber}
            </div>
          );

          if (col === 2) {
            rowDivs.push(
              <div
                key={`empty-space-${busLineId}-${row}`}
                className={classes.corridor}
              />
            );
          }
        }
      }

      seatDivs.push(
        <div className={classes.seatRow} key={`${busLineId}-${row}`}>
          {rowDivs}
        </div>
      );
    }

    return seatDivs;
  }; */

  //-------------------------------------

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

        columns.push(
          <div
            key={`${busLineId}-${row}-${col}`}
            onClick={seatClickHandler}
            className={`${currentCellStyle} ${
              isSelected ? classes.selected : ""
            }`}
          >
            {isClickable && seatNumber}
          </div>
        );

        if (isClickable) {
          seatNumber++;
        }
      }

      seatDiv.push(
        <div key={row} className={classes.rowStyle}>
          {columns}
        </div>
      );
    }

    return seatDiv;
  };

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

  const getLineId = (from, to) => {
    const line = `${from}-${to}`;
    const busLine = busLines.find((bl) => bl.name === line);
    return busLine ? busLine.id : null;
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
    /* const formattedTime = time.time
      .split(":")
      .slice(0, 2)
      .join(":")
      .replace(/^0/, ""); */

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

  //user: { id: userId },
  //busLine: { id: busLineId },

  // Send Data
  async function handleSubmitConfirm() {
    try {
      const user = getCurrentUser();
      const userId = user.id;

      const currentUserResponse = await getUserById(userId);
      const currentUser = currentUserResponse.data;
      const userName = currentUser.lastname + " " + currentUser.firstname;

      const busLineId = getLineId(selectedFrom, selectedTo);
      const selectedBusLine =
        busLines.find((l) => l.id === busLineId)?.name || null;

      //--TEST
      const reservedSeats = selectedSeats
        .map((seat) => seat.seatContent)
        .join(", ");
      console.log(reservedSeats);
      //------

      const reservationData = {
        bus_line: selectedBusLine,
        price: calculateTotalPrice(),
        reservation_date: selectedDate,
        reservation_time: selectedTime,
        seat_number: selectedSeats.length,
        status: "true",
        //status: reservedSeats, //TEST
        user: userName,
      };

      const response = await createReservation(reservationData);
      console.log(response.data);

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
                    {busLines.map((busLine) => {
                      const startingPlace = busLine.name.split("-")[0].trim();

                      return (
                        <option key={busLine.id} value={startingPlace}>
                          {startingPlace}
                        </option>
                      );
                    })}
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
                      groupedDatesByLineId[
                        getLineId(selectedFrom, selectedTo)
                      ]?.map((date) => (
                        <option key={date.id} value={date.date}>
                          {date.date}
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
                      groupedTimesByLineId[
                        getLineId(selectedFrom, selectedTo)
                      ]?.map((time) => (
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
                    .map(
                      (date) =>
                        /*  renderSeats(
                        getLineId(
                          date.busLine.name.split("-")[0].trim(),
                          date.busLine.name.split("-")[1].trim()
                        ),
                        date.busLine.seatNum
                      ) */

                        //--
                        renderSeats(
                          getLineId(
                            date.busLine.name.split("-")[0].trim(),
                            date.busLine.name.split("-")[1].trim()
                          )
                        )
                      //--
                    )}
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
          {/* <div className={classes.infoDiv}>
            <TbInfoCircle className={classes.infoIcon} />
            <div className={classes.hide}>
              <BusInfo />
            </div>
          </div> */}
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
