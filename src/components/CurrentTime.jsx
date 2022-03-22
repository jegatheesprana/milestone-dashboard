import React, {useEffect, useState} from "react"
import {
    Navbar,
    Container,
    Row,
    Col,
    DropdownButton,
    Dropdown,
    Button,
    Card
} from "react-bootstrap"
import { measurments, colors } from "../config"
import moment from "moment"

const times = ['EST Time', 'CST Time', 'IST Time']

const CurrentTime = ({duration='4hrs 20mins', jobRun='02/22/2022 2:30'}) => {
    const arr = duration.trim().split(' ')
    const obj={}
    arr.map((val, id)=>{
        obj[val.replace(/[0-9]/g, '')] = val.match(/\d/g).join('')
    })
    const [time,setTime] = useState({
        hrs: '',
        mins: ''
    })
    console.log(arr[0].replace(/[0-9]/g, '')=='hrs')
    useEffect(()=>{
        setTime(obj)
    },[])
    

    // const newDate = moment(jobRun).format('YYYY-MM-DDTHH:mm')

    const dateNOW=new Date(parseInt(moment(jobRun).format('YYYY')),parseInt(moment(jobRun).format('MM')),parseInt(moment(jobRun).format('DD')),(parseInt(moment(jobRun).format('HH'))+parseInt(time?.hrs)),(parseInt(moment(jobRun).format('mm'))+parseInt(time?.mins)))
    console.log(dateNOW);
    
    return (
        <Container
            fluid
            className={`mt-${measurments.componentSpacing} py-2 bg-dark text-white`}
        >
            <Row>
                <Col>
                    <h6>Current Time</h6>
                    {
                        times.map((val, id)=>{
                            return(
                                <Row className='px-4 mb-2' key={id}>
                                    <Col lg='5'>
                                        <Card style={{ width: '5rem', height: '2.5rem', backgroundColor:'#c4c4c4' }}></Card>
                                    </Col>
                                    <Col lg='7' className='mt-1'>
                                        <span className="align-middle">{val}</span>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Col>
                <Col sm={9}>
                    <Row>
                        <Col sm={3} className='mt-2'>
                            <Row style={{color: `${colors.currentTime.subColor}`, fontWeight:'900'}} >
                                <h6>Upcoming/Current<br/>Job Run</h6>
                            </Row>
                        </Col>
                        <Col sm={3} className='mt-2'>
                            <Row style={{color: `${colors.currentTime.subColor}`, fontWeight:'bold'}} >
                                <h6>Expected Completion<br/>Time</h6>
                            </Row>
                        </Col>
                        <Col sm={3} className='mt-2'>
                            <Row style={{color: `${colors.currentTime.subColor}`, fontWeight:'bold'}} >
                                <h6>Time to Completion</h6>
                            </Row>
                        </Col>
                        <Col sm={3} className='mt-2'>
                            <Row style={{color: `${colors.currentTime.subColor}`, fontWeight:'bold'}} >
                                <h6>Number of Tasks</h6>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <h5>02/22/2022 <br/> 2:30 AM EST</h5>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h5>02/22/2022 <br/> 6:50 AM EST</h5>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h5>4 Hours <br/> 20 Minutes</h5>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h5>30</h5>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {console.log(dateNOW)}
        </Container>
    )
}

export default CurrentTime
