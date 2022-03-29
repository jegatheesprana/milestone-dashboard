import MileStone from "../milestoneComponent/MileStoneComponent"

const MileStones = ({ taskData = [], milestoneDes, timezone }) => {
    return taskData.map((milestone, id) => (
        <MileStone
            milestone={milestone}
            key={id}
            id={id}
            description={milestoneDes[milestone.data["Milestone"]]}
            timezone={timezone}
        />
    ))
}

export default MileStones
