
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Container } from 'react-bootstrap';
import { Header, CurrentTime, TaskStatus, MileStones } from './components';
import { useEffect, useState, useMemo } from 'react';
import csv from './data/runtype.csv'

function csvToJson(data) {
    const lines = data.split('\n');
    const keys = lines[0].split(',');
    return lines.slice(1).map(line => {
        return line.split(',').reduce((acc, cur, i) => {
            const toAdd = {};
            toAdd[keys[i]] = cur;
            return { ...acc, ...toAdd };
        }, {});
    });
}

function csvToArray(data) {
    const lines = data.split('\r\n');
    return lines.map(line => {
        return line.split(',')
    });
}

function App() {
    const [data, setData] = useState()
    const [selectedDate, setSelectedDate] = useState(1)
    const [taskData, setTaskData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(csv)
            .then(res => res.text())
            .then(data => {
                const converted = csvToJson(data);
                setData(converted)
            })
    }, [])

    useEffect(() => {
        if (!data) return
        setLoading(true)
        Promise.all([import(`./data/jsons/${data[selectedDate]['Json output']}`), import(`./data/csvs/${data[selectedDate]['CSV file']}`)]).then(async ([{ default: taskData }, csvPath]) => {
            const csvData = await fetch(csvPath.default).then(res => res.text()).catch(console.log)
            const converted = csvToArray(csvData)
                .map((row, id) => {
                    const obj = {
                        "Job Folder Name": row[0],
                        "Job Name": row[1],
                        "Milestone": row[2],
                        "Taskflow": row[3],
                        "Pending": !taskData[id]
                    }
                    const taskObj = taskData[id] || {}
                    return { ...taskObj, ...obj }
                })
                .reduce((acc, cur, i) => {
                    const milestone = cur["Milestone"]
                    if (!acc[milestone]) acc[milestone] = {
                        tasks: [], avgTime: 0, count: { total: 0, completed: 0, longRunning: 0, upcoming: 0, warning: 0, pending: 0 }, data: {
                            "Job Folder Name": cur["Job Folder Name"],
                            "Job Name": cur["Job Name"],
                            "Milestone": cur["Milestone"],
                            "Taskflow": cur["Taskflow"],
                        }
                    }

                    let type = ""

                    if (!cur["Pending"]) {
                        acc[milestone].avgTime += cur["Run Time"]
                        if (cur["Long Running"] === "Y") {
                            type = "longRunning"
                            acc[milestone].count.longRunning += 1;
                        } else {
                            if (cur["Status"] === "Success") {
                                type = "completed"
                                acc[milestone].count.completed += 1;
                            } else {
                                type = "warning"
                                acc[milestone].count.warning += 1;
                            }
                        }
                    } else {
                        acc[milestone].count.pending += 1;
                        type = 'pending'
                    }

                    cur.type = type

                    acc[milestone].tasks.push(cur)
                    acc[milestone].count.total += 1;

                    return acc
                }, {});
            const taskDataArray = Object.keys(converted).map(key => {
                const obj = converted[key]
                if (obj.count.pending) {
                    console.log("match")
                    obj.count.upcoming = 1
                    console.log(obj.tasks.find(task => task["Pending"]))
                    obj.tasks.find(task => task["Pending"]).type = 'upcoming'
                }
                return obj
            })
            setTaskData(taskDataArray)
            setLoading(false)
        })
            // import(`./data/jsons/${data[selectedDate]['Json output']}`).then(data => {
            //     console.log(data.default)
            //     setTaskData(data.default)
            //     setLoading(false)
            // })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
    }, [selectedDate, data])

    const count = useMemo(() => {

        const statusCount = {
            completed: 0,
            longRunning: 0,
            upcoming: 0,
            warning: 0
        }
        if (!taskData) return statusCount
        taskData.forEach(data => {
            statusCount.completed += data.count.completed
            statusCount.longRunning += data.count.longRunning
            statusCount.upcoming += data.count.upcoming
            statusCount.warning += data.count.warning
        })
        return statusCount
    }, [taskData])

    if (loading) return null
    return (
        <Container className="my-3">
            <Header data={data} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <CurrentTime data={data} selectedDate={selectedDate} taskData={taskData} />
            <TaskStatus count={count} />
            <MileStones taskData={taskData} />
        </Container>
    );
}

export default App;
