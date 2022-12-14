import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import TutoringSlotRender from "./TutoringSlotRender";


function TutoringSignUp({
  tutoringInfo,
  callingComponent,
  handleDashboardKeyChange,
}) {
  const user = useAuth().currentUser;
  const [errors, setErrors] = useState([]);

  function handleSetErrors(inputErrors){
    setErrors(inputErrors)
  }

  function renderErrors() {
    const error_text = errors.map((error, index) => {
      return (
        <li key={index}>
          {error[0]}
          <ul>
            {error[1].map((text) => (
              <li>{text}</li>
            ))}
          </ul>
        </li>
      );
    });
    return error_text;
  }

  function handle_closed_sessions(session) {
    if (callingComponent === "TutoringSignUp") {
      if (session.open_status === true) {
        return (
          <TutoringSlotRender
            slotInfo={session}
            handleDashboardKeyChange={handleDashboardKeyChange}
            callingComponent={callingComponent}
            setErrors={handleSetErrors}
          />
        );
      } else {
        return null;
      }
    } else {
      if (session.tutors.length < session.tutor_capacity) {
        let tutorsIds = [];
        session.tutors.forEach((tutor) => {
          if (!tutorsIds.includes(tutor.id)) {
            tutorsIds.push(tutor.id);
          }
        });
        if (!tutorsIds.includes(user.id)) {
          return (
            <TutoringSlotRender
              slotInfo={session}
              handleDashboardKeyChange={handleDashboardKeyChange}
              callingComponent={callingComponent}
              setErrors={handleSetErrors}
            />
          );
        } else {
          return null;
        }
      }
    }
  }
  return (
    <>
      {tutoringInfo.id ? (
        <Container>
          <Row>
            <h1>{tutoringInfo.name}</h1>
            <ul>{renderErrors()}</ul>
          </Row>
          <Row>
            {tutoringInfo.locations
              .sort((a, b) => (a.building.id > b.building.id ? 1 : -1))
              .map((buildingInfo) => {
                return (
                  <Row key={buildingInfo.building.id}>
                    <h3>{buildingInfo.building.name}</h3>
                    {buildingInfo.rooms
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                      .map((rooms) => {
                        return (
                          <Row key={rooms.id}>
                            <Row>
                              <h5>{rooms.name}</h5>
                            </Row>
                            <Row>
                              <Table responsive="md">
                                <thead>
                                  <tr>
                                    <th className="text-center">Session</th>
                                    <th className="text-center">Tutor</th>
                                    <th className="text-center">
                                      Subjects Covered
                                    </th>
                                    <th className="text-center">Start Time</th>
                                    <th className="text-center">End Time</th>
                                    <th className="text-center">Open Slots</th>
                                    <th className="text-center">Status</th>
                                  </tr>
                                </thead>
                                {tutoringInfo.tutoring_time_slots
                                  .sort((a, b) =>
                                    a.date_sort > b.date_sort ? 1 : -1
                                  )
                                  .map((slot) => {
                                    return (
                                      <tbody key={slot.id}>
                                        {slot.room_id === rooms.id
                                          ? handle_closed_sessions(slot)
                                          : null}
                                      </tbody>
                                    );
                                  })}
                              </Table>
                            </Row>
                          </Row>
                        );
                      })}
                  </Row>
                );
              })}
          </Row>
        </Container>
      ) : (
        <h1> Loading....</h1>
      )}
    </>
  );
}

export default TutoringSignUp;
