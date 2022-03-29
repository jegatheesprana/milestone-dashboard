import { ProgressBar } from "react-bootstrap"
import SubTask from "./SubTask"
import { colors } from "../../../config"
import { useState } from "react"

const Stepper = ({ stage, timezone }) => {
    const [subTaskModal, setSubTaskModal] = useState(false)
    const [subTask, setSubTask] = useState()

    var progressWidth = 100
    const index = stage.findIndex((item) => item.type === "upcoming")
    if (index != -1) {
        progressWidth = ((index - 1) / (stage.length - 1)) * 100
    }

    const handleClose = () => {
        setSubTaskModal(false)
    }

    const handleShow = (subTask) => {
        setSubTask(subTask)
        setSubTaskModal(true)
    }

    return (
        <div
            className="container mt-3 mb-3"
            style={{ background: colors.bgGray }}
        >
            <div
                className="progress ml-1 mr-1"
                style={{
                    height: "13px",
                    backgroundColor: colors.progressPendingColor,
                }}
            >
                <ProgressBar
                    style={{
                        width: `${progressWidth}%`,
                        backgroundColor: colors.progressedColor,
                    }}
                />
            </div>

            <div className="d-flex justify-content-between">
                {stage.map((task, id) => {
                    return (
                        <div
                            className="progress-container"
                            key={id}
                            style={{
                                backgroundColor: `${colors.status[task.type]}`,
                                cursor: "pointer",
                            }}
                            onClick={() => handleShow(task)}
                        ></div>
                    )
                })}
            </div>
            <SubTask
                show={subTaskModal}
                handleClose={handleClose}
                subTask={subTask}
                timezone={timezone}
            />
        </div>
    )
}

export default Stepper
