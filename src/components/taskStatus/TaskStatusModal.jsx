import { Modal, Button, Table, Container } from "react-bootstrap"

const TaskStatusModal = ({
    show,
    handleClose,
    tasks = [],
    timezone,
    getTime,
}) => {
    return (
        <Modal show={show} onHide={handleClose} centered fullscreen>
            <Modal.Header closeButton>
                <Modal.Title>Status Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxWidth: "100%", overflow: "auto" }}>
                <Container className="my-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Run Date ({timezone})</th>
                                <th>Run time ({timezone})</th>
                                <th>Job Folder Name</th>
                                <th>Job Name</th>
                                <th>Milestone</th>
                                <th>Taskflow</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                                <th>SubTasks</th>
                                <th>Average Time</th>
                                <th>Run Time</th>
                                <th>Rows Processed</th>
                                <th>Long Running</th>
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
                                    <td>{task["Taskflow"]}</td>
                                    <td>{task["Start Time"]}</td>
                                    <td>{task["End Time"]}</td>
                                    <td>{task["Status"]}</td>
                                    <td>{task["SubTasks"]}</td>
                                    <td>{task["Average Time"]}</td>
                                    <td>{task["Run Time"]}</td>
                                    <td>{task["Rows Processed"]}</td>
                                    <td>{task["Long Running"]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
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
