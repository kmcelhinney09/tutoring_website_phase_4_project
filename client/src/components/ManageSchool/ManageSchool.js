import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import CreateBuilding from "./CreateBuilding";
import CreateRoom from "./CreateRoom";
import EditRoom from "./EditRoom";
import EditBuilding from "./EditBuilding";

function ManageSchool() {
  const auth = useAuth();
  let user = auth.currentUser;

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  function handleModalAction(modal_type, id = 0, resources_name = []) {
    console.log(resources_name[0])
    if (modal_type === "create room") {
      setModalTitle("Create Room");
      setModalBody(
        <CreateRoom closeForm={handleCloseModal} building_id={id} />
      );
    } else if (modal_type === "create building") {
      setModalTitle("Create Building");
      setModalBody(
        <CreateBuilding
          closeForm={handleCloseModal}
          school_id={user.school.id}
        />
      );
    } else if (modal_type === "edit building") {
      setModalTitle("Edit Building");
      setModalBody(
        <EditBuilding
          closeForm={handleCloseModal}
          building_id={id}
          school_id={user.school.id}
          building_name={resources_name[0]}
        />
      );
    } else {
      setModalTitle(modal_type);
      setModalBody(
        <EditRoom
          closeForm={handleCloseModal}
          room_id={id}
          resources_name={resources_name}
        />
      );
    }
    handleShowModal();
  }

  function handleRemoveRoom(room_id) {
    let new_user = JSON.parse(JSON.stringify(user));
    let locations = new_user.school.locations;
    let new_rooms = [];
    let saved_index;
    let removed_room_building;

    locations.forEach((location) => {
      location.rooms.forEach((room, index) => {
        // console.log(location.rooms)
        if (room.id === room_id) {
          new_rooms = [...location.rooms];
          removed_room_building = location.building.id;
          saved_index = index;
        }
      });
      if (new_rooms.length !== 0) {
        new_rooms.splice(saved_index, 1);
        locations.map((location) => {
          if (location.building.id === removed_room_building) {
            location.rooms = new_rooms;
          }
        });
      }
    });
    auth.updateCurrentUser(new_user);

    fetch(`/room/${room_id}`, {
      method: "DELETE",
    });
  }

  function handleRemoveBuilding(building_id) {
    let new_user = JSON.parse(JSON.stringify(user));
    let locations = new_user.school.locations;
    let building_index;
    locations.forEach((location, index) => {
      if (location.building.id === building_id) {
        building_index = index;
      }
    });
    locations.splice(building_index, 1);
    auth.updateCurrentUser(new_user);

    fetch(`/building/${building_id}`, {
      method: "DELETE",
    });
  }
  

  return (
    <>
      <h3> Current Resources</h3>
      {user.id ? (
        user.school.locations
          .sort((a, b) => (a.building.id > b.building.id ? 1 : -1))
          .map((buildingInfo) => {
            return (
              <Container key={buildingInfo.building.id}>
                <Row>
                  <h5>{buildingInfo.building.name}</h5>
                </Row>
                <Row>
                  <Table responsive="md" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Room</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildingInfo.rooms
                        .sort((a, b) => (a.id > b.id ? 1 : -1))
                        .map((room) => {
                          return (
                            <tr key={room.id}>
                              <td>{room.name}</td>
                              <td className="text-center">
                                <Button
                                  variant="success"
                                  onClick={() =>
                                    handleModalAction(
                                      `Edit ${room.name}`,
                                      room.id,
                                      [buildingInfo.building.name, room.name]
                                    )
                                  }
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  variant="success"
                                  onClick={() => handleRemoveRoom(room.id)}
                                >
                                  {" "}
                                  Remove Room
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Row>
                <Button
                  className="mb-2"
                  variant="success"
                  onClick={() =>
                    handleModalAction("create room", buildingInfo.building.id)
                  }
                >
                  Create New Room
                </Button>{" "}
                <Button
                  className="mb-2"
                  variant="success"
                  onClick={() =>
                    handleModalAction(
                      "edit building",
                      buildingInfo.building.id,
                      [buildingInfo.building.name]
                    )
                  }
                >
                  Edit Building
                </Button>{" "}
                <Button
                  className="mb-2"
                  variant="success"
                  onClick={() => handleRemoveBuilding(buildingInfo.building.id)}
                >
                  Remove Building
                </Button>
              </Container>
            );
          })
      ) : (
        <h4>Loading....</h4>
      )}
      <Button
        variant="success"
        onClick={() => handleModalAction("create building")}
      >
        Create New Building
      </Button>{" "}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}

export default ManageSchool;