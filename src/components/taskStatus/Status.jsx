import { Card, Container } from "react-bootstrap"
import styles from "./status.module.css"

const Status = ({ title, bg }) => {
    return (
        <Card style={{ backgroundColor: bg }}>
            <Card.Body>
                <div className={styles.roundCont}>
                    <svg
                        width="55"
                        height="30"
                        viewBox="0 0 110 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <ellipse
                            cx="76.0503"
                            cy="29.8598"
                            rx="33.8778"
                            ry="29.4742"
                            fill="white"
                            fill-opacity="0.43"
                        />
                        <ellipse
                            cx="34.5677"
                            cy="29.8598"
                            rx="33.8778"
                            ry="29.4742"
                            fill="white"
                            fill-opacity="0.43"
                        />
                    </svg>
                </div>
                <h5>{title}</h5>
                <div className={styles.taskCont}>4 Tasks</div>
            </Card.Body>
        </Card>
    )
}

export default Status
