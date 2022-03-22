import { colors } from "../../../config"

const Detail = ({ title, amount }) => {
    return (
        <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
            <span style={{ color: colors.milestone.header }}>{title}</span>
            <span
                style={{
                    margin: "auto",
                    marginBottom: 15,
                    marginLeft: 0,
                }}
            >
                {amount}
            </span>
        </div>
    )
}

export default Detail
