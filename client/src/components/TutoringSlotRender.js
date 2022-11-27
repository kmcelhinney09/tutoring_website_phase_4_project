import { useAuth } from "../context/AuthProvider";
import Button from "react-bootstrap/esm/Button";

function TutoringSlotRender({ slot_info }) {
  const user = useAuth().currentUser;
  let slot_status;

  function handle_book_tutoring(tutor_id, slot_id) {
    fetch("/booked_time_slots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tutor_id: tutor_id,
        tutee_id: user.id,
        tutoring_time_slot_id: slot_id,
      }),
    });
  }

  return (
    <>
      {slot_info.tutors.map((tutor) => {
        if (slot_info.booked_status === false) {
          slot_status = (
            <td>
              <Button
                onClick={() => handle_book_tutoring(tutor.id, slot_info.id)}
              >
                Sign-up
              </Button>
            </td>
          );
        } else {
          slot_status = <td className="text-danger">Full</td>;
        }

        return (
          <tr key={slot_info.id + tutor.full_name + slot_info.room_id}>
            <td className="text-center">{slot_info.date}</td>
            <td className="text-center">{tutor.full_name}</td>
            <td className="text-center">{tutor.subjects_covered}</td>
            <td className="text-center">{slot_info.start_time}</td>
            <td className="text-center">{slot_info.end_time}</td>
            <td className="text-center">{slot_info.tutee_space}</td>
            {slot_status}
          </tr>
        );
      })}
    </>
  );
}

export default TutoringSlotRender;