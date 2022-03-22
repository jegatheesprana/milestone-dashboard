import MileStone from "../milestoneComponent/MileStoneComponent"

const MileStones = () => {
    return [1, 2, 3].map((milestone, id) => <MileStone />)
}

export default MileStones
