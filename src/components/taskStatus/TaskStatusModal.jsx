import { Modal, Button, Table, Container } from "react-bootstrap"

const TaskStatusModal = ({
    show,
    handleClose,
    tasks = [],
    timezone,
    getTime,
}) => {
    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Status Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container
                    className="my-3"
                    style={{ maxWidth: "100%", overflow: "auto" }}
                >
                    <Table
                        striped
                        bordered
                        hover
                        style={{ fontSize: "0.55rem" }}
                    >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Run Date ({timezone})</th>
                                <th>Run time ({timezone})</th>
                                <th>Job Name</th>
                                <th>Milestone</th>
                                <th>Taskflow</th>
                                <th className="px-5">Start Time</th>
                                <th className="px-5">End Time</th>
                                <th>SubTasks</th>
                                <th>Run Time</th>
                                <th>Rows Processed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, id) => (
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{task["Run Date converted"]}</td>
                                    <td>{task["Run time converted"]}</td>
                                    <td>{task["Job Name"]}</td>
                                    <td>{task["Milestone"]}</td>
                                    <td>{task["Taskflow"]}</td>
                                    <td>{task["Start Time converted"]}</td>
                                    <td>{task["End Time converted"]}</td>
                                    <td>{task["SubTasks"]}</td>
                                    <td>{task["Run Time"]}</td>
                                    <td>{task["Rows Processed"]}</td>
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
