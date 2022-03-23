import MileStone from "../milestoneComponent/MileStoneComponent"

const MileStones = ({ taskData = [] }) => {
    const stages = [
        [
            { index: 1, type: "completed" },
            { index: 2, type: "longRunning" },
            { index: 3, type: "longRunning" },
            { index: 4, type: "warning" },
            { index: 5, type: "completed" },
            { index: 6, type: "upcoming" },
            { index: 7, type: "upcoming" },
            { index: 8, type: "upcoming" },
            { index: 9, type: "upcoming" },
            { index: 10, type: "upcoming" },
            { index: 11, type: "upcoming" },
        ],
        [
            { index: 1, type: "completed" },
            { index: 2, type: "longRunning" },
            { index: 3, type: "completed" },
            { index: 4, type: "warning" },
            { index: 5, type: "upcoming" },
        ],
        [
            { index: 1, type: "completed" },
            { index: 2, type: "longRunning" },
            { index: 3, type: "upcoming" },
            { index: 4, type: "upcoming" },
            { index: 5, type: "upcoming" },
            { index: 6, type: "upcoming" },
            { index: 7, type: "upcoming" },
            { index: 8, type: "upcoming" },
            { index: 9, type: "upcoming" },
            { index: 10, type: "upcoming" },
            { index: 11, type: "upcoming" },
            { index: 12, type: "upcoming" },
        ],
    ]
    return taskData.map((milestone, id) => (
        <MileStone milestone={milestone} stage={stages[id] || []} key={id} />
    ))
}

export default MileStones
