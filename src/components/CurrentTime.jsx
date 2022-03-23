import React, { useMemo, useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { measurments, colors } from "../config"
import moment from "moment"

const times = ["EST Time", "CST Time", "IST Time"]

const CurrentTime = ({
    duration = "4hrs 20mins",
    jobRun = "02/22/2022 2:30",
    data,
    selectedDate,
    taskData,
}) => {
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
        // arr.map((val, id) => {
        //     obj[val.replace(/[0-9]/g, "")] = val.match(/\d/g).join("")
        // })
        return runTime.format("MM/DD/YYYY h.mm A")
    }, [selectedDate])
    // const [time, setTime] = useState({
    //     hrs: "",
    //     mins: "",
    // })
    // console.log(arr[0].replace(/[0-9]/g, "") == "hrs")
    // useEffect(() => {
    //     setTime(obj)
    // }, [])

    // const newDate = moment(jobRun).format('YYYY-MM-DDTHH:mm')

    // const dateNOW = new Date(
    //     parseInt(moment(jobRun).format("YYYY")),
    //     parseInt(moment(jobRun).format("MM")),
    //     parseInt(moment(jobRun).format("DD")),
    //     parseInt(moment(jobRun).format("HH")) + parseInt(time?.hrs),
    //     parseInt(moment(jobRun).format("mm")) + parseInt(time?.mins)
    // )
    // console.log(dateNOW)

    return (
        <Card
            fluid
            className={`mt-${measurments.componentSpacing} py-2 bg-dark text-white`}
        >
            <Card.Body>
                <Row>
                    <Col>
                        <h6>Current Time</h6>
                        {times.map((val, id) => {
                            return (
                                <Row className="px-4 mb-2" key={id}>
                                    <Col lg="5">
                                        <Card
                                            style={{
                                                width: "5rem",
                                                height: "2.5rem",
                                                backgroundColor: "#c4c4c4",
                                            }}
                                        ></Card>
                                    </Col>
                                    <Col lg="7" className="mt-1">
                                        <span className="align-middle">
                                            {val}
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
                                        {data[selectedDate + 1]?.["Run time"]}{" "}
                                        EST
                                    </h5>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <h5>{expectedCompletion} EST</h5>
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
