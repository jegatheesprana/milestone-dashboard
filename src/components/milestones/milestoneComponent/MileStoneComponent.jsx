import { Card, Row, Col } from "react-bootstrap"
import { colors, measurments } from "../../../config"
import Detail from "./Detail"
import Stepper from "./Stepper"

const MileStoneComponent = ({ stage }) => {
    return (
        <Card
            bg="dark"
            className={`mt-${measurments.componentSpacing} text-white`}
        >
            <Card.Body>
                <Row>
                    <Col xs={11} sm={4}>
                        <h4>Milestone 1</h4>
                        <p>Avg time - 1hr 40 Mins</p>
                        <h4 style={{ color: colors.milestone.font }}>
                            Anaplan Spoke to Admin
                        </h4>
                    </Col>
                    <Col sm={7}>
                        <Row>
                            <Col sm={3} style={{ minHeight: 80 }}>
                                <Detail title="Total Tasks" amount="11" />
                            </Col>
                            <Col sm={3} style={{ minHeight: 80 }}>
                                <Detail title="Completed" amount="11" />
                            </Col>
                            <Col sm={3} style={{ minHeight: 80 }}>
                                <Detail
                                    title="In Process/Upcoming"
                                    amount="11"
                                />
                            </Col>
                            <Col sm={3} style={{ minHeight: 80 }}>
                                <Detail
                                    title="Warnings/Long Running"
                                    amount="11"
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={1} sm={1} className="pt-3 px-4 text-end">
                        <i className="bi bi-three-dots-vertical"></i>
                    </Col>
                </Row>
                <Row>
                    <Stepper stage={stage} />
                </Row>
            </Card.Body>
        </Card>
    )
}

export default MileStoneComponent
