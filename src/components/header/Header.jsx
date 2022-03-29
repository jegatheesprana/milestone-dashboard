import React, { useEffect, useMemo, useState } from "react"
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
        {children || "Filter Date & Time"}{" "}
        <i
            className="bi bi-caret-down-fill"
            style={{ color: colors.primaryGreen }}
        ></i>
    </Button>
))

const Header = ({ data: notFiltered, selectedDate, setSelectedDate }) => {
    const [selectedSector, setSelectedSector] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)

    // useEffect(() => {

    // }, [data])

    const sectors = useMemo(() => {
        const arr = notFiltered?.map((data) => data["Sector"]) || []
        const unique = [...new Set(arr)]
        setSelectedSector(unique.length - 1)
        return unique
    }, [notFiltered])

    const handleClick = (date) => {
        setSelectedDate(date)
        setMenuOpen(false)
    }

    const handleSectorClick = (sector) => {
        setSelectedSector(sector)
    }

    const handleToggle = (toggle) => {
        setMenuOpen(toggle)
    }

    const data = useMemo(() => {
        if (!selectedSector) return notFiltered
        return notFiltered.filter(
            (data) => data["Sector"] === sectors[selectedSector]
        )
    }, [notFiltered, selectedSector])

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
                    <Dropdown className="mx-1">
                        <Dropdown.Toggle
                            style={{
                                backgroundColor: colors.bgGray,
                                borderColor: colors.bgGray,
                            }}
                        >
                            {sectors[selectedSector] || "Sector"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {sectors.map((data, id) => (
                                <Dropdown.Item
                                    key={id}
                                    onClick={() => handleSectorClick(id)}
                                    active={selectedSector === id}
                                >
                                    {data}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown show={menuOpen} onToggle={handleToggle}>
                        <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                        >
                            {data[selectedDate]?.["Run time"]}
                        </Dropdown.Toggle>
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
