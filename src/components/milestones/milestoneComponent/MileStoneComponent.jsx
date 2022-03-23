import { Card, Row, Col } from "react-bootstrap"
import { colors, measurments } from "../../../config"
import Detail from "./Detail"
import Stepper from "./Stepper"

const MileStoneComponent = ({ milestone, stage }) => {
    return (
        <Card
            bg="dark"
            className={`mt-${measurments.componentSpacing} text-white`}
        >
            <Card.Body>
                <Row className="d-flex justify-content-between">
                    <Col xs={10}>
                        <Row>
                            <Col sm={4}>
                                <h4>{milestone.data["Milestone"]}</h4>
                                <p>
                                    Avg time -{" "}
                                    {Math.floor(milestone.avgTime / 60)}hr{" "}
                                    {milestone.avgTime % 60} Mins
                                </p>
                                <h4 style={{ color: colors.milestone.font }}>
                                    {milestone.data["Job Name"]}
                                </h4>
                            </Col>
                            <Col sm={8}>
                                <Row>
                                    <Col sm={3} style={{ minHeight: 80 }}>
                                        <Detail
                                            title="Total Tasks"
                                            amount={milestone.count.total}
                                        />
                                    </Col>
                                    <Col sm={3} style={{ minHeight: 80 }}>
                                        <Detail
                                            title="Completed"
                                            amount={milestone.count.completed}
                                        />
                                    </Col>
                                    <Col sm={3} style={{ minHeight: 80 }}>
                                        <Detail
                                            title="In Process/Upcoming"
                                            amount={milestone.count.upcoming}
                                        />
                                    </Col>
                                    <Col sm={3} style={{ minHeight: 80 }}>
                                        <Detail
                                            title="Warnings/Long Running"
                                            amount={milestone.count.warning}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={1} sm={1} className="pt-3 px-4 text-end">
                        <i className="bi bi-three-dots-vertical"></i>
                    </Col>
                </Row>
                <Row>
                    <Stepper stage={milestone.tasks} />
                </Row>
            </Card.Body>
        </Card>
    )
}

export default MileStoneComponent
