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
        const response = await getAllBusLines();
        setBusLines(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error while fetching buslines", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllBusLineDates();
        setBusLineDates(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error while fetching buslines", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div>
        {busLines.map((busLine) => (
          <div key={busLine.id}>
            <h3>{busLine.name}</h3>
            <p>Seat Num: {busLine.seatNum}</p>
            <p>Price: {busLine.price}</p>
          </div>
        ))}
      </div>
      <div>
        {busLineDates.map((date) => (
          <div key={date.id}>
            <p>Date: {date.date}</p>
          </div>
        ))}
      </div>
      <div className={classes.planContainer}>
        <div className={classes.planBox}>
          <div className={classes.planBoxBody}>
            <div className={classes.tripDiv}>
              <h2>Plan your trip</h2>
              <form>
                <Input
                  label={"Please enter your full name"}
                  type={"text"}
                  name={"fullname"}
                  placeholder={"Enter your name"}
                  /* value={formData.username}
                  onChange={handleInputChange}
                  error={errors.username} */
                />
                <Input
                  label={"When do you want to go?"}
                  type={"text"}
                  name={"date"}
                  placeholder={"Select the date"}
                  /* value={formData.username}
                  onChange={handleInputChange}
                  error={errors.username} */
                />
                <Input
                  label={"From:"}
                  type={"text"}
                  name={"start"}
                  placeholder={"Select the starting city"}
                  /* value={formData.username}
                  onChange={handleInputChange}
                  error={errors.username} */
                />
                <Input
                  label={"To:"}
                  type={"text"}
                  name={"destination"}
                  placeholder={"Select the destination city"}
                  /* value={formData.username}
                  onChange={handleInputChange}
                  error={errors.username} */
                />
              </form>
            </div>
            <div className={classes.seatsDiv}>
              <p>Available seats:</p>
              <div className={classes.seats}>seats</div>
            </div>
            <div className={classes.detailsDiv}>free</div>
          </div>
          <div className={classes.planBoxFooter}>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
