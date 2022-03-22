import { Row, Col } from "react-bootstrap"
import Status from "./Status"
import { colors, measurments } from "../../config"

const TaskStatus = () => {
    return (
        <Row className={`mt-${measurments.componentSpacing} text-white`}>
            <Col>
                <Status
                    title="Completed"
                    tasks={4}
                    bg={colors.status.completed}
                />
            </Col>
            <Col>
                <Status
                    title="Long Running"
                    tasks={5}
                    bg={colors.status.longRunning}
                />
            </Col>
            <Col>
                <Status
                    title="Upcoming"
                    tasks={10}
                    bg={colors.status.upcoming}
                />
            </Col>
            <Col>
                <Status
                    title="Warning /Error"
                    tasks={8}
                    bg={colors.status.warning}
                />
            </Col>
        </Row>
    )
}

export default TaskStatus
