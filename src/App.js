
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Container } from 'react-bootstrap';
import { Header, CurrentTime, TaskStatus, MileStones } from './components';
import { useEffect, useState } from 'react';
import csv from './data/runtype.csv'

function App() {
    const [data, setData] = useState()
    const [currentDate, setCurrentDate] = useState()
    const [currentData, setCurrentData] = useState()
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
                setCurrentDate(converted[0])
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (!currentDate) return
        setLoading(true)
        const filename =
            import(`./data/${currentDate['Json output']}`).then(data => {
                console.log(data.default)
                setCurrentData(data.default)
                setLoading(false)
            })
    }, [currentDate])

    if (loading) return null
    return (
        <Container className="mt-2">
            <Header data={data} currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <CurrentTime />
            <TaskStatus />
            <MileStones />
        </Container>
    );
}

export default App;
