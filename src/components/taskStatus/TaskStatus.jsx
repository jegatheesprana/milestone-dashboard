import { Row, Col } from "react-bootstrap"
import Status from "./Status"
import { colors, measurments } from "../../config"

const TaskStatus = ({ count }) => {
    return (
        <Row className={`mt-${measurments.componentSpacing} text-white`}>
            <Col>
                <Status
                    title="Completed"
                    tasks={count.completed}
                    bg={colors.status.completed}
                />
            </Col>
            <Col>
                <Status
                    title="Long Running"
                    tasks={count.longRunning}
                    bg={colors.status.longRunning}
                />
            </Col>
            <Col>
                <Status
                    title="Upcoming"
                    tasks={count.upcoming}
                    bg={colors.status.upcoming}
                />
            </Col>
            <Col>
                <Status
                    title="Warning /Error"
                    tasks={count.warning}
                    bg={colors.status.warning}
                />
            </Col>
        </Row>
    )
}

export default TaskStatus
