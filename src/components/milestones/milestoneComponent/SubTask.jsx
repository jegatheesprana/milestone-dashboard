import { Modal, Button, Table, Container } from "react-bootstrap"

const SubTask = ({ show, handleClose, subTask = {}, timezone }) => {
    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Sub Task Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="my-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{`Run Date (${timezone})`}</td>
                                <td>{subTask["Run Date converted"]}</td>
                            </tr>
                            <tr>
                                <td>{`Run time (${timezone})`}</td>
                                <td>{subTask["Run time converted"]}</td>
                            </tr>
                            <tr>
                                <td>Job Folder Name</td>
                                <td>{subTask["Job Folder Name"]}</td>
                            </tr>
                            <tr>
                                <td>Milestone</td>
                                <td>{subTask["Milestone"]}</td>
                            </tr>
                            <tr>
                                <td>Taskflow</td>
                                <td>{subTask["Taskflow"]}</td>
                            </tr>
                            <tr>
                                <td>Start Time</td>
                                <td>{subTask["Start Time converted"]}</td>
                            </tr>
                            <tr>
                                <td>End Time</td>
                                <td>{subTask["End Time converted"]}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{subTask["Status"]}</td>
                            </tr>
                            <tr>
                                <td>SubTasks</td>
                                <td>{subTask["SubTasks"]}</td>
                            </tr>
                            <tr>
                                <td>Average Time</td>
                                <td>{subTask["Average Time"]}</td>
                            </tr>
                            <tr>
                                <td>Run Time</td>
                                <td>{subTask["Run Time"]}</td>
                            </tr>
                            <tr>
                                <td>Rows Processed</td>
                                <td>{subTask["Rows Processed"]}</td>
                            </tr>
                            <tr>
                                <td>Long Running</td>
                                <td>{subTask["Long Running"]}</td>
                            </tr>
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

export default SubTask
