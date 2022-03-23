import { Card, Row, Col, Button,DropdownButton,Dropdown,OverlayTrigger,Tooltip,Popover,Overlay } from "react-bootstrap"
import { colors, measurments } from "../../../config"
import Detail from "./Detail"
import Stepper from "./Stepper"
import { useRef,useState } from "react"

const MileStoneComponent = ({stage}) => {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <Card
            bg="dark"
            className={`mt-${measurments.componentSpacing} text-white`}
        >
            <Card.Body>
                <Row className="d-flex justify-content-between">
                    <Col xs={10}>
                        <Row>
                            <Col  sm={4}>
                                <h4>Milestone 1</h4>
                                <p>Avg time - 1hr 40 Mins</p>
                                <h4 style={{ color: colors.milestone.font }}>
                                    Anaplan Spoke to Admin
                                </h4>
                            </Col>
                            <Col sm={8}>
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
                        </Row>
                    </Col>
                    <Col xs={1} sm={1} className="pt-3 px-4 text-end">
                        
                        {/* <DropdownButton
                            className="dropdown-toggle"
                            id="dropdown-button-drop-start"
                            drop="start"
                            menuVariant="dark"
                            title={<i className="bi bi-three-dots-vertical"></i>}
                            variant="dark"
                        >
                           
                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            </Dropdown.Menu>
                            
                        </DropdownButton> */}
                        
                        {/* <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}
                        >
                            {({ ref, ...triggerHandler }) => (
                            <Button
                                variant="dark"
                                {...triggerHandler}
                                className="d-inline-flex align-items-center"
                            >
                               <i className="bi bi-three-dots-vertical" ref={ref}></i>
                            </Button>
                            )}
                        </OverlayTrigger> */}

                    <div ref={ref}>
                        <Button onFocus={handleClick} onBlur={handleClick}  variant="dark">
                            <i className="bi bi-three-dots-vertical"></i>
                        </Button>

                        <Overlay
                            show={show}
                            target={target}
                            placement="left"
                            container={ref}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained" >
                            {/* <Popover.Header as="h3"  >Popover bottom</Popover.Header> */}
                            <Popover.Body>
                                <strong>Popover bottom</strong> 
                            </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Stepper stage={stage}/>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default MileStoneComponent
