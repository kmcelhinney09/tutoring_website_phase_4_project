import { useAuth } from "../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

function ManageTimeSlots() {
  const user = useAuth().currentUser

  function slot_render(slot){

  }

  return (
     <>
      <h3> Current Resources</h3>
      {user.id ? (
        user.school.locations
          .sort((a, b) => (a.building.id > b.building.id ? 1 : -1))
          .map((buildingInfo) => {
            return (
              <Container>
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
                                    <th>Session</th>
                                    <th className="text-center">Start Time</th>
                                    <th className="text-center">End Time</th>
                                    <th className="text-center">Tutor Capacity</th>
                                    <th className="text-center">Tutee Capacity</th>
                                    <th className="text-center">Status</th>
                                    <th className="text_center">Actions</th>
                                  </tr>
                                </thead>
                                {user.school.tutoring_time_slots
                                  .sort((a, b) =>
                                    a.date_sort > b.date_sort ? 1 : -1
                                  )
                                  .map((slot) => {
                                    return (
                                      <tbody key={slot.id}>
                                        {slot.room_id === rooms.id
                                          ? (<tr>
                                            <td>{new Date(slot.start_time).toDateString()}</td>
                                            <td className="text-center">{new Date(slot.start_time).toLocaleTimeString()}</td>
                                            <td className="text-center">{new Date(slot.end_time).toLocaleTimeString()}</td>                                            
                                            <td className="text-center">{slot.tutor_capacity}</td>
                                            <td className="text-center">{slot.tutee_capacity}</td>
                                            <td className="text-center">{slot.booked_status?'Full':'Open'}</td>
                                            <td>
                                              <Button>Edit</Button>
                                              <Button>View</Button>
                                            </td>
                                          </tr>)
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
              </Container>
            );
          })
      ) : (
        <h4>Loading....</h4>
      )}
      <Button>Create New Building</Button>{" "}
      <Button>Create New Room</Button>
    </>
  )
}

export default ManageTimeSlots