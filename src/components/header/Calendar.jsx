import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { ListGroup, Row, Col } from "react-bootstrap"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useMemo } from "react"

const localizer = momentLocalizer(moment)

const Calendar = ({ events, handleClick }) => {
    const mapped = useMemo(() => {
        const innerMappend = events.map((data, id) => {
            return {
                id: data.id,
                title: data["Run time"],
                allDay: true,
                start: moment(data["Run time"], "MM/DD/YYYY h.mm A").toDate(),
                end: moment(data["Run time"], "MM/DD/YYYY h.mm A").toDate(),
            }
        })
        return innerMappend
    }, [events])

    return (
        <div>
            {/* <Row style={{ overflow: "auto" }}>
            <Col xs={6}>
                <ListGroup>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col xs={6}> */}
            <BigCalendar
                localizer={localizer}
                events={mapped}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={(slotInfo) => {
                    console.log(slotInfo)
                    handleClick(slotInfo.id)
                }}
                // views={["month"]}
                style={{ height: 500, width: 400 }}
            />
            {/* </Col>
        </Row> */}
        </div>
    )
}

export default Calendar
