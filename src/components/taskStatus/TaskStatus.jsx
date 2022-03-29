import { Row, Col } from "react-bootstrap"
import Status from "./Status"
import { colors, measurments } from "../../config"
import TaskStatusModal from "./TaskStatusModal"
import { useState } from "react"

const TaskStatus = ({ count, taskData, timezone, getTime }) => {
    const [status, setStatus] = useState([])
    const [statusModal, setStatusModal] = useState(false)

    const handleClose = () => {
        setStatusModal(false)
    }

    const handleShow = (status) => {
        const filtered = taskData.reduce((acc, cur) => {
            const tasks = cur.tasks.filter((task) => task.type === status)
            return [...acc, ...tasks]
        }, [])
        console.log(filtered)
        setStatus(filtered || [])
        setStatusModal(true)
    }

    return (
        <>
            <Row className={`mt-${measurments.componentSpacing} text-white`}>
                <Col>
                    <Status
                        title="Completed"
                        tasks={count.completed}
                        bg={colors.status.completed}
                        onClick={() => handleShow("completed")}
                    />
                </Col>
                <Col>
                    <Status
                        title="Long Running"
                        tasks={count.longRunning}
                        bg={colors.status.longRunning}
                        onClick={() => handleShow("longRunning")}
                    />
                </Col>
                <Col>
                    <Status
                        title="Upcoming"
                        tasks={count.upcoming}
                        bg={colors.status.upcoming}
                        onClick={() => handleShow("upcoming")}
                    />
                </Col>
                <Col>
                    <Status
                        title="Warning /Error"
                        tasks={count.warning}
                        bg={colors.status.warning}
                        onClick={() => handleShow("warning")}
                    />
                </Col>
            </Row>
            <TaskStatusModal
                show={statusModal}
                handleClose={handleClose}
                tasks={status}
                timezone={timezone}
                getTime={getTime}
            />
        </>
    )
}

export default TaskStatus
