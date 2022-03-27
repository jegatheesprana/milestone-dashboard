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
import { colors } from "../../config"
import headerImage from "../../assests/headerImage.png"
import Calendar from "./Calendar"
import moment from "moment"

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

const Header = ({ data, selectedDate, setSelectedDate }) => {
    const handleClick = (date) => {
        setSelectedDate(date)
    }
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
                            {/* {data.map((data, id) => (
                                <Dropdown.Item
                                    key={id}
                                    onClick={() => handleClick(id)}
                                    active={selectedDate === id}
                                >
                                    {data["Run time"]}
                                </Dropdown.Item>
                            ))} */}
                            <Calendar events={data} handleClick={handleClick} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    )
}

export default Header
