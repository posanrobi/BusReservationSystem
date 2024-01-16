import Input from "../components/Input";
import { getAllBusLineDates, getAllBusLines } from "../services/user.service";
import classes from "./PlanningPage.module.css";
import { useState, useEffect } from "react";

export default function PlanningPage() {
  const [busLines, setBusLines] = useState([]);
  const [busLineDates, setBusLineDates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const linesResponse = await getAllBusLines();
        setBusLines(linesResponse.data);

        const datesResponse = await getAllBusLineDates();
        setBusLineDates(datesResponse.data);

        /*  console.log(linesResponse.data);
        console.log(datesResponse.data); */
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    }

    fetchData();
  }, []);

  const groupedDatesByLineId = busLineDates.reduce((grouped, date) => {
    const lineId = date.busLine.id;
    if (!grouped[lineId]) {
      grouped[lineId] = [];
    }
    grouped[lineId].push(date);
    return grouped;
  }, {});

  console.log("HELLOO", groupedDatesByLineId);

  return (
    <>
      <div>
        {busLines.map((busLine) => (
          <div key={busLine.id}>
            <h3>{busLine.name}</h3>
            <p>Seat Num: {busLine.seatNum}</p>
            <p>Price: {busLine.price}</p>
            <div>
              {groupedDatesByLineId[busLine.id]?.map((date) => (
                <div key={date.id}>
                  <p>Date: {date.date}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={classes.planContainer}>
        <div className={classes.planBox}>
          <div className={classes.planBoxBody}>
            <div className={classes.tripDiv}>
              <h2>Plan your trip</h2>

              <label>
                From:
                <div>
                  <select>
                    <option value="" disabled selected>
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

              <label>
                To:
                <div>
                  <select>
                    <option value="" disabled selected>
                      Choose your destination place
                    </option>
                    {busLines.map((busLine) => {
                      const destinationPlace = busLine.name
                        .split("-")[1]
                        .trim();
                      return (
                        <option key={busLine.id} value={destinationPlace}>
                          {destinationPlace}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </label>

              <label>
                Available dates:
                <div>
                  <select>
                    <option value="" disabled selected>
                      Choose a date
                    </option>
                    {busLines.map((busLine) =>
                      groupedDatesByLineId[busLine.id]?.map((date) => (
                        <option key={date.id} value={date.date}>
                          {date.date}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </label>
            </div>

            <div className={classes.seatsDiv}>
              <p>Available seats:</p>
              <div className={classes.seats}>
                {busLines.map((busLine) => {
                  const seatDivs = [];
                  for (let i = 0; i < busLine.seatNum; i++) {
                    seatDivs.push(
                      <div className={classes.seat} key={i}>
                        {i + 1}
                      </div>
                    );
                  }
                  return seatDivs;
                })}
              </div>
            </div>

            <div className={classes.detailsDiv}>
              <ul>
                <li>Free</li>
                <li>Booked</li>
                <li>Selected</li>
              </ul>
            </div>
          </div>
          <div className={classes.planBoxFooter}>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
