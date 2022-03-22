import React from "react"
import {
    Navbar,
    Container,
    Row,
    Col,
    DropdownButton,
    Dropdown,
    Button,
} from "react-bootstrap"
import { colors } from "../config"
import headerImage from "../assests/headerImage.png"

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
        style={{ backgroundColor: colors.bgGray, borderColor: colors.bgGray }}
        ref={ref}
        onClick={(e) => {
            e.preventDefault()
            onClick(e)
        }}
    >
        <i
            className="bi bi-calendar"
            style={{ color: colors.primaryGreen }}
        ></i>{" "}
        Filter Date & Time{" "}
        <i
            className="bi bi-caret-down-fill"
            style={{ color: colors.primaryGreen }}
        ></i>
    </Button>
))

const Header = () => {
    return (
        <Container fluid className="py-2 bg-dark text-white">
            <Row>
                <Col sm={4}>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={headerImage}
                            width="90%"
                            height=""
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </Col>
                <Col
                    sm={4}
                    className="text-white d-flex align-items-center justify-content-center"
                >
                    <h5>Job Run Stats Dashboard</h5>
                </Col>
                <Col
                    sm={4}
                    className="text-white d-flex align-items-center justify-content-end"
                >
                    <Dropdown>
                        <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                        />
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                                Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                Something else
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    )
}

export default Header