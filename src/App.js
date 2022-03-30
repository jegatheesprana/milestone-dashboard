
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Container } from 'react-bootstrap';
import { Header, CurrentTime, TaskStatus, MileStones } from './components';
import { useEffect, useState, useMemo } from 'react';
import csv from './data/runtype.csv'
import description from './data/milestone description.csv'
import moment from 'moment'
import momentTimezone from "moment-timezone"
import Papa from 'papaparse'

const times = ["EST", "CST", "IST", "SGT"]

function csvToJson(data, limit) {
    const lines = Papa.parse(data).data;
    const keys = lines[0];
    return lines.slice(1, lines.length - 1).map(line => {
        let arr = line
        // if (limit) {
        //     arr = arr.slice(0, limit).concat(arr.slice(limit).join(", "));
        // }
        return arr.reduce((acc, cur, i) => {
            const toAdd = {};
            toAdd[keys[i]] = cur;
            return { ...acc, ...toAdd };
        }, {});
    }).slice(0);
}

function csvToArray(data) {
    // const lines = data.split('\r\n');
    // return lines.map(line => {
    //     return line.split(',')
    // }).slice(0, lines.length - 1);
    const lines = Papa.parse(data).data
    return lines.slice(0, lines.length - 1);
}

function App() {
    const [data, setData] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [taskData, setTaskData] = useState()
    const [milestoneDes, setMilestoneDes] = useState({})
    const [loading, setLoading] = useState(true)
    const [timezone, setTimezone] = useState("EST")

    const getTime = (stringDate, format = "MM/DD/YYYY h.mm A") => {
        switch (timezone) {
            case "EST":
                return stringDate
            case "CST":
                return momentTimezone
                    .tz(stringDate, format, "America/Atikokan")
                    .tz("America/Monterrey")
                    .format(format)
            case "IST":
                return momentTimezone
                    .tz(stringDate, format, "America/Atikokan")
                    .tz("Asia/Kolkata")
                    .format(format)
            case "SGT":
                return momentTimezone
                    .tz(stringDate, format, "America/Atikokan")
                    .tz("Asia/Singapore")
                    .format(format)
        }
    }

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
                }).map((data, id) => {
                    data.id = id
                    return data
                })
                setData(converted)
                // setSelectedDate(0)
                fetch(description).then(res => res.text())
                    .then(data => {
                        const converted = csvToJson(data, 1).reduce((acc, cur) => {
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
        console.log(`./data/jsons/${data[selectedDate]['Json output']}`)
        Promise.all([import(`./data/jsons/${data[selectedDate]['Json output']}`), import(`./data/csvs/${data[selectedDate]['CSV file']}`)]).then(async ([{ default: taskData }, csvPath]) => {
            const csvData = await fetch(csvPath.default).then(res => res.text()).catch(console.log)
            const converted = csvToArray(csvData)

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
                    if (jsonReduced[key][id]) {
                        var cur = { ...task, ...jsonReduced[key][id] }
                    } else {
                        var cur = {
                            "Job Folder Name": task[0],
                            "Job Name": task[1],
                            "Milestone": task[2],
                            "Taskflow": task[3],
                            "Number of Sub tasks": task[4],
                            "Average Run Time": task[5],
                        }
                    }

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

            taskDataArray.forEach((taskData, dataId) => {
                taskData.tasks.forEach((task, taskId) => {
                    if (task["Run Date"]) {
                        let pointer = taskDataArray[dataId].tasks[taskId]
                        pointer.concatedTime = `${task["Run Date"]} ${task["Run time"]}`
                        const converted = getTime(
                            `${task["Run Date"]} ${task["Run time"]}`,
                            "DD/MM/YYYY HH:mm"
                        ).split(" ")
                        pointer["Run Date converted"] = converted[0]
                        pointer["Run time converted"] = converted[1]
                        pointer["Start Time converted"] = getTime(task["Start Time"], "MMM DD, YYYY, h:mm A")
                        pointer["End Time converted"] = getTime(task["End Time"], "MMM DD, YYYY, h:mm A")
                    }
                })
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

    useEffect(() => {
        if (!taskData) return
        console.log("Running")
        const dupTaskData = [...taskData]
        dupTaskData.forEach((taskData, dataId) => {
            taskData.tasks.forEach((task, taskId) => {
                if (task["Run Date"]) {
                    let pointer = dupTaskData[dataId].tasks[taskId]
                    pointer.concatedTime = `${task["Run Date"]} ${task["Run time"]}`
                    const converted = getTime(
                        `${task["Run Date"]} ${task["Run time"]}`,
                        "DD/MM/YYYY HH:mm"
                    ).split(" ")
                    pointer["Run Date converted"] = converted[0]
                    pointer["Run time converted"] = converted[1]
                    pointer["Start Time converted"] = getTime(task["Start Time"], "MMM DD, YYYY, h:mm A")
                    pointer["End Time converted"] = getTime(task["End Time"], "MMM DD, YYYY, h:mm A")
                }
            })
        })
        setTaskData(dupTaskData)
    }, [timezone])

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
                    <CurrentTime data={data} selectedDate={selectedDate} taskData={taskData} timezone={timezone} setTimezone={setTimezone} getTime={getTime} times={times} />
                    <TaskStatus taskData={taskData} count={count} timezone={timezone} getTime={getTime} />
                    <MileStones taskData={taskData} milestoneDes={milestoneDes} timezone={timezone} getTime={getTime} />
                </>
            }
        </Container >
    );
}

export default App;
