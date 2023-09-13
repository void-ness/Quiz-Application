import React from "react";
import { useSelector } from "react-redux";
import { selectFinishTime, selectUser } from "../../features/user/userSlice";

const Results = () => {
    const name = useSelector(selectUser);
    const time = useSelector(selectFinishTime);

    return (
        <div>
            <span>Thanks for giving this test. Here are your results</span>
            <span>Name: {name}</span>
            <span>Time Taken: {time.minutes} Minutes & {time.seconds} Seconds</span>
        </div>
    );
};

export default Results;