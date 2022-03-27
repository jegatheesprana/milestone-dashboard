
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Container } from 'react-bootstrap';
import { Header, CurrentTime, TaskStatus, MileStones } from './components';
import { useEffect, useState, useMemo } from 'react';
import csv from './data/runtype.csv'
import description from './data/milestone description.csv'
import moment from 'moment'

function csvToJson(data) {
    const lines = data.split('\r\n');
    const keys = lines[0].split(',');
    return lines.slice(1).map(line => {
        return line.split(',').reduce((acc, cur, i) => {
            const toAdd = {};
            toAdd[keys[i]] = cur;
            return { ...acc, ...toAdd };
        }, {});
    }).slice(0, lines.length - 1);
}

function csvToArray(data) {
    const lines = data.split('\r\n');
    return lines.map(line => {
        return line.split(',')
    }).slice(0, lines.length - 1);
}

function App() {
    const [data, setData] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [taskData, setTaskData] = useState()
    const [milestoneDes, setMilestoneDes] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(csv)
            .then(res => res.text())
            .then(data => {
                const converted = csvToJson(data);
                converted.sort((a, b) => {
                    const timeA = moment(a["Run time"], "MM/DD/YYYY h.mm A")
                    const timeB = moment(b["Run time"], "MM/DD/YYYY h.mm A")
                    const diff = timeA.diff(timeB, 'minutes')
                    if (diff < 0) return -1
                    else return 1
                })
                setData(converted)
                fetch(description).then(res => res.text())
                    .then(data => {
                        const converted = csvToJson(data).reduce((acc, cur) => {
                            acc[cur["Milestone"]] = cur["Description"]
                            return acc
                        }, {})
                        setMilestoneDes(converted)
                    })
            })
    }, [])

    useEffect(() => {
        if (!data || selectedDate === null) return
        setLoading(true)
        Promise.all([import(`./data/jsons/${data[selectedDate]['Json output']}`), import(`./data/csvs/${data[selectedDate]['CSV file']}`)]).then(async ([{ default: taskData }, csvPath]) => {
            const csvData = await fetch(csvPath.default).then(res => res.text()).catch(console.log)
            const converted = csvToArray(csvData)
                // .map((row, id) => {
                //     const obj = {
                //         "Job Folder Name": row[0],
                //         "Job Name": row[1],
                //         "Milestone": row[2],
                //         "Taskflow": row[3],
                //         "Pending": !taskData[id]
                //     }
                //     const taskObj = taskData[id] || {}
                //     return { ...taskObj, ...obj }
                // })
                .reduce((acc, cur, i) => {
                    const milestone = cur[2]
                    if (!acc[milestone]) acc[milestone] = {
                        tasks: [], avgTime: 0, count: { total: 0, completed: 0, longRunning: 0, upcoming: 0, warning: 0, pending: 0 }, data: {
                            "Job Folder Name": cur[0],
                            "Job Name": cur[1],
                            "Milestone": cur[2],
                            "Taskflow": cur[3],
                        }
                    }

                    acc[milestone].tasks.push(cur)
                    acc[milestone].count.total += 1;

                    return acc
                }, {});
            // .reduce((acc, cur, i) => {
            //     const milestone = cur["Milestone"]
            //     if (!acc[milestone]) acc[milestone] = {
            //         tasks: [], avgTime: 0, count: { total: 0, completed: 0, longRunning: 0, upcoming: 0, warning: 0, pending: 0 }, data: {
            //             "Job Folder Name": cur["Job Folder Name"],
            //             "Job Name": cur["Job Name"],
            //             "Milestone": cur["Milestone"],
            //             "Taskflow": cur["Taskflow"],
            //         }
            //     }

            //     let type = ""

            //     if (!cur["Pending"]) {
            //         acc[milestone].avgTime += cur["Run Time"]
            //         if (cur["Long Running"] === "Y") {
            //             type = "longRunning"
            //             acc[milestone].count.longRunning += 1;
            //         } else {
            //             if (cur["Status"] === "Success") {
            //                 type = "completed"
            //                 acc[milestone].count.completed += 1;
            //             } else {
            //                 type = "warning"
            //                 acc[milestone].count.warning += 1;
            //             }
            //         }
            //     } else {
            //         acc[milestone].count.pending += 1;
            //         type = 'pending'
            //     }

            //     cur.type = type

            //     acc[milestone].tasks.push(cur)
            //     acc[milestone].count.total += 1;

            //     return acc
            // }, {});


            const jsonReduced = taskData.reduce((acc, cur, i) => {
                const milestone = cur["Milestone"]
                if (!acc[milestone]) acc[milestone] = []

                acc[milestone].push(cur)

                return acc
            }, {})

            // console.log(converted, jsonReduced)

            Object.keys(converted).forEach(key => {
                const acc = converted
                converted[key].tasks = converted[key].tasks.map((task, id) => {
                    const cur = { ...task, ...jsonReduced[key][id] }
                    const milestone = task["Milestone"]
                    let type = ""
                    if (jsonReduced[key][id]) {
                        var pending = false
                        converted[key].avgTime += cur["Run Time"]
                        if (cur["Long Running"] === "Y") {
                            type = "longRunning"
                            converted[key].count.longRunning += 1;
                        } else {
                            if (cur["Status"] === "Success") {
                                type = "completed"
                                converted[key].count.completed += 1;
                            } else {
                                type = "warning"
                                converted[key].count.warning += 1;
                            }
                        }
                    } else {
                        var pending = true
                        converted[key].count.pending += 1;
                        type = "pending"
                    }
                    cur.type = type
                    cur.Pending = pending
                    return cur
                })
            })

            // console.log(converted)

            const taskDataArray = Object.keys(converted).map(key => {
                const obj = converted[key]
                if (obj.count.pending) {
                    // console.log("match")
                    obj.count.upcoming = 1
                    // console.log(obj.tasks.find(task => task["Pending"]))
                    obj.tasks.find(task => task["Pending"]).type = 'upcoming'
                }
                return obj
            })
            setTaskData(taskDataArray)
            setLoading(false)
        })
            .catch(e => {
                console.log(e)
                setLoading(false)
                alert("File not found")
                setTaskData([])
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

    // if (loading) return null
    return (
        <Container className="my-3">
            <Header data={data} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            {!loading && (selectedDate !== null) &&
                <>
                    <CurrentTime data={data} selectedDate={selectedDate} taskData={taskData} />
                    <TaskStatus taskData={taskData} count={count} />
                    <MileStones taskData={taskData} milestoneDes={milestoneDes} />
                </>
            }
        </Container >
    );
}

export default App;
