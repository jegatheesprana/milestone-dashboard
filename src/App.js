
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Container } from 'react-bootstrap';
import { Header, CurrentTime, TaskStatus, MileStones } from './components';
import { useEffect, useState, useMemo } from 'react';
import csv from './data/runtype.csv'

function App() {
    const [data, setData] = useState()
    const [selectedDate, setSelectedDate] = useState(1)
    const [taskData, setTaskData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(csv)
            .then(res => res.text())
            .then(data => {
                const lines = data.split('\n');
                const keys = lines[0].split(',');
                const converted = lines.slice(1).map(line => {
                    return line.split(',').reduce((acc, cur, i) => {
                        const toAdd = {};
                        toAdd[keys[i]] = cur;
                        return { ...acc, ...toAdd };
                    }, {});
                });
                setData(converted)
            })
    }, [])

    useEffect(() => {
        if (!data) return
        import(`./data/${data[selectedDate]['Json output']}`).then(data => {
            console.log(data.default)
            setTaskData(data.default)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [selectedDate, data])

    const taskObject = useMemo(() => {
        if (!taskData) return {}
        const milestoneGroup = {}
        const statusCount = {
            completed: 0,
            longRunning: 0,
            upcoming: 0,
            warning: 0
        }
        for (let i = 0; i < taskData.length; i++) {
            obj[taskData[i].Milestone] = taskData[i]
            switch (taskData[i].status) {
                case 'Success':
                    break;
                case 'Warning':
                    break;

                case "Suspended":
                    break;
                case "Running":
                    break;
            }
        }
    }, [taskData])

    if (loading) return null
    return (
        <Container className="my-3">
            <Header data={data} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <CurrentTime data={data} selectedDate={selectedDate} taskData={taskData} />
            <TaskStatus />
            <MileStones />
        </Container>
    );
}

export default App;
