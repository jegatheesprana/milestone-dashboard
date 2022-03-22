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
import { measurments } from "../config"

const CurrentTime = () => {
    return (
        <Container
            fluid
            className={`mt-${measurments.componentSpacing} py-2 bg-dark text-white`}
        >
            <Row>
                <Col sm={3}>Current Time</Col>
                <Col sm={9}>
                    <Row>
                        <Col sm={3}>Current Time</Col>
                        <Col sm={3}>Current Time</Col>
                        <Col sm={3}>Current Time</Col>
                        <Col sm={3}>Current Time</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default CurrentTime
