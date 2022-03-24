import MileStone from "../milestoneComponent/MileStoneComponent"

const MileStones = ({ taskData = [], milestoneDes }) => {
    return taskData.map((milestone, id) => (
        <MileStone
            milestone={milestone}
            key={id}
            id={id}
            description={milestoneDes[milestone.data["Milestone"]]}
        />
    ))
}

export default MileStones
