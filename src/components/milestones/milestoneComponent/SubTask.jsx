import { Modal, Button, Table } from "react-bootstrap"

const SubTask = ({ show, handleClose, subTask = {} }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sub Task Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Run Date</td>
                            <td>{subTask["Run Date"]}</td>
                        </tr>
                        <tr>
                            <td>Run time</td>
                            <td>{subTask["Run time"]}</td>
                        </tr>
                        <tr>
                            <td>Job Folder Name</td>
                            <td>{subTask["Job Folder Name"]}</td>
                        </tr>
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

export default SubTask
