import {
    Card,
    Row,
    Col,
    Button,
    DropdownButton,
    Dropdown,
    OverlayTrigger,
    Tooltip,
    Popover,
    Overlay,
} from "react-bootstrap"
import { colors, measurments } from "../../../config"
import Detail from "./Detail"
import Stepper from "./Stepper"
import { useRef, useState } from "react"

const MileStoneComponent = ({ milestone, id, description, timezone }) => {
    const [show, setShow] = useState(false)
    const [target, setTarget] = useState(null)
    const ref = useRef(null)

    const handleClick = (event) => {
        setShow(!show)
        setTarget(event.target)
    }

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
                                <h4>{`Milestone ${id + 1}`}</h4>
                                <p>
                                    Avg time -{" "}
                                    {Math.floor(milestone.avgTime / 60)}hr{" "}
                                    {milestone.avgTime % 60} Mins
                                </p>
                                <h4 style={{ color: colors.milestone.font }}>
                                    {milestone.data["Milestone"]}
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
                        <div ref={ref}>
                            <Button
                                onFocus={handleClick}
                                onBlur={handleClick}
                                variant="dark"
                            >
                                <i className="bi bi-three-dots-vertical"></i>
                            </Button>

                            <Overlay
                                show={show}
                                target={target}
                                placement="left"
                                container={ref}
                                containerPadding={20}
                            >
                                <Popover
                                    id="popover-contained"
                                    style={{ minWidth: 500 }}
                                >
                                    {/* <Popover.Header as="h3"  >Popover bottom</Popover.Header> */}
                                    <Popover.Body>
                                        <strong>{description}</strong>
                                    </Popover.Body>
                                </Popover>
                            </Overlay>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Stepper stage={milestone.tasks} timezone={timezone} />
                </Row>
            </Card.Body>
        </Card>
    )
}

export default MileStoneComponent
