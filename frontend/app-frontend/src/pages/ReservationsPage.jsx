import { useEffect, useState } from "react";
import { getAllReservations } from "../services/user.service";
import authHeader from "../services/auth-header";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function getReservations() {
      try {
        const response = await getAllReservations();
        setReservations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error while fetching reservations", error);
      }
    }

    getReservations();
  }, []);

  return (
    <>
      <div>
        <div>
          <div>
            {reservations.map((res) => (
              <ul key={res.id}>
                <li>{res.reservation_date}</li>
                <li>{res.reservation_time}</li>
                <li>{res.seat_number}</li>
                <li>{res.price}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
