import { Modal, Button, Table } from "react-bootstrap"

const TaskStatusModal = ({ show, handleClose, tasks = [] }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Status Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxWidth: "100%", overflow: "auto" }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Run Date</th>
                            <th>Run time</th>
                            <th>Job Folder Name</th>
                            <th>Job Name</th>
                            <th>Milestone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{task["Run Date"]}</td>
                                <td>{task["Run time"]}</td>
                                <td>{task["Job Folder Name"]}</td>
                                <td>{task["Job Name"]}</td>
                                <td>{task["Milestone"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
            </Modal.Footer>
        </Modal>
    )
}

export default TaskStatusModal
