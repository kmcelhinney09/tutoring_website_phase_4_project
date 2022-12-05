import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import ResetPassward from "./ResetPassward";
import EditUserInfo from "./EditUserInfo";

function ManageUsers() {
  const user = useAuth().currentUser;
  const [schoolData, setSchoolData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    fetch("/users").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setSchoolData(data);
        });
      } else {
        res.json().then((e) => console.log(Object.entries(e.error)));
      }
    });
  }, [user.school.id]);

  function handleModalAction(modal_type, id = 0, resources = [], index = 0) {
    if (modal_type === "editUser") {
      setModalTitle("Edit User password");
      setModalBody(
        <EditUserInfo
          closeForm={handleCloseModal}
          userInfo={resources}
          userIndex={index}
          schoolData={schoolData}
          setSchoolData={setSchoolData}
        />
      );
    } else if (modal_type === "resetPassword") {
      setModalTitle("Update User Passward");
      setModalBody(<ResetPassward closeForm={handleCloseModal} userId={id} />);
    } else if (modal_type === "deleteUser") {
      setModalTitle("Delete User");
      setModalBody(confirmDeleteUserModal(id, resources[0], index));
    }

    handleShowModal();
  }

  function confirmDeleteUserModal(userId, userName, userIndex) {
    return(
    <>
      <h4>{`Are you sure you want to ${userName}`}</h4>
      <br />
      <Button variant="primary" type="submit" onClick={() => {handleDeleteUser(userId, userIndex)}}>
        Yes
      </Button>{" "}
      <Button variant="primary" onClick={handleCloseModal}>
        Close
      </Button>
      <br />
    </>
    )
  }

  function handleDeleteUser(userId, userIndex) {
    let newSchoolData = JSON.parse(JSON.stringify(schoolData));
    newSchoolData.splice(userIndex, 1);
    setSchoolData(newSchoolData);

    fetch(`/users/${userId}`, {
      method: "DELETE",
    });
    handleCloseModal();
  }
  
  console.log(schoolData);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schoolData.length !== 0 ? (
            schoolData
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((schoolUser, index) => {
                return (
                  <tr key={schoolUser.id}>
                    <td>{schoolUser.full_name}</td>
                    <td>{schoolUser.email}</td>
                    <td>{schoolUser.role}</td>
                    <td>{schoolUser.grade}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() =>
                          handleModalAction(
                            "editUser",
                            schoolUser.id,
                            schoolUser,
                            index
                          )
                        }
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="success"
                        onClick={() =>
                          handleModalAction(
                            "deleteUser",
                            schoolUser.id,
                            [schoolUser.full_name],
                            index
                          )
                        }
                      >
                        Delete
                      </Button>{" "}
                      <Button
                        variant="success"
                        onClick={() =>
                          handleModalAction("resetPassword", schoolUser.id)
                        }
                      >
                        Reset Password
                      </Button>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td>Loading....</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}

export default ManageUsers;
