import { ProgressBar } from "react-bootstrap"
import { colors } from "../../../config"

const Stepper = ({ stage }) => {
    var progressWidth = 100
    const index = stage.findIndex((item) => item.type === "upcoming")
    if (index != -1) {
        progressWidth = ((index - 1) / (stage.length - 1)) * 100
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
                {stage.map(({ index, type }, id) => {
                    return (
                        <div
                            className="progress-container"
                            key={id}
                            style={{
                                backgroundColor: `${colors.status[type]}`,
                            }}
                        ></div>
                    )
                })}
            </div>
        </div>
    )
}

export default Stepper
