import React, { useMemo, useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { measurments, colors } from "../config"
import moment from "moment"

const CurrentTime = ({
    data,
    selectedDate,
    timezone,
    setTimezone,
    getTime,
    times,
}) => {
    const handleClick = (zone) => {
        setTimezone(zone)
    }

    const upcomming = useMemo(() => {
        const stringDate = data[selectedDate + 0]?.["Run time"]
        const converted = getTime(stringDate).split(" ")
        return (
            <>
                {converted[0]}
                <br />
                {converted.slice(1, converted.length).join(" ")}
            </>
        )
    }, [selectedDate, timezone])

    const expectedCompletion = useMemo(() => {
        const duration = data[selectedDate]?.["Total duration(expected)"]
        const runTime = moment(
            data[selectedDate]?.["Run time"],
            "MM/DD/YYYY h.mm A"
        )
        const arr = duration.trim().split(" ")
        const obj = {}
        for (let i = 0; i < arr.length; i += 2) {
            if (arr[i + 1] === "hrs") {
                runTime.add(Number(arr[i]), "hours")
            } else if (arr[i + 1] === "mins") {
                runTime.add(Number(arr[i]), "minutes")
            }
        }
        const stringDate = runTime.format("MM/DD/YYYY h.mm A")
        const converted = getTime(stringDate).split(" ")
        return (
            <>
                {converted[0]}
                <br />
                {converted.slice(1, converted.length).join(" ")}
            </>
        )
    }, [selectedDate, timezone])

    return (
        <Card
            className={`mt-${measurments.componentSpacing} py-2 bg-dark text-white`}
        >
            <Card.Body>
                <Row>
                    <Col>
                        <h6>Current Time</h6>
                        {times.map((val, id) => {
                            const border =
                                val === timezone
                                    ? { border: "2px solid red" }
                                    : {}
                            return (
                                <Row className="px-4 mb-2" key={id}>
                                    <Col lg="5">
                                        <Card
                                            style={{
                                                width: "5rem",
                                                height: "2.5rem",
                                                backgroundColor: "#c4c4c4",
                                                cursor: "pointer",
                                                ...border,
                                            }}
                                            onClick={() => handleClick(val)}
                                        ></Card>
                                    </Col>
                                    <Col lg="7" className="mt-1">
                                        <span className="align-middle">
                                            {`${val} Time`}
                                        </span>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Col>
                    <Col sm={9}>
                        <Row>
                            <Col sm={3} className="mt-2">
                                <Row
                                    style={{
                                        color: `${colors.currentTime.subColor}`,
                                        fontWeight: "900",
                                    }}
                                >
                                    <h6>
                                        Upcoming/Current
                                        <br />
                                        Job Run
                                    </h6>
                                </Row>
                            </Col>
                            <Col sm={3} className="mt-2">
                                <Row
                                    style={{
                                        color: `${colors.currentTime.subColor}`,
                                        fontWeight: "bold",
                                    }}
                                >
                                    <h6>
                                        Expected completion
                                        <br />
                                        Time
                                    </h6>
                                </Row>
                            </Col>
                            <Col sm={3} className="mt-2">
                                <Row
                                    style={{
                                        color: `${colors.currentTime.subColor}`,
                                        fontWeight: "bold",
                                    }}
                                >
                                    <h6>Time to Completion</h6>
                                </Row>
                            </Col>
                            <Col sm={3} className="mt-2">
                                <Row
                                    style={{
                                        color: `${colors.currentTime.subColor}`,
                                        fontWeight: "bold",
                                    }}
                                >
                                    <h6>Number of Tasks</h6>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <h5>
                                        {upcomming} {timezone}
                                    </h5>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <h5>
                                        {expectedCompletion} {timezone}
                                    </h5>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <h5>
                                        {
                                            data[selectedDate]?.[
                                                "Total duration(expected)"
                                            ]
                                        }
                                    </h5>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <h5>
                                        {data[selectedDate]?.["number of taks"]}
                                    </h5>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CurrentTime
