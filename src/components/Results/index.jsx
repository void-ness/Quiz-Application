import React from "react";
import { useSelector } from "react-redux";
import { selectFinishTime, selectQuestions, selectUser } from "../../features/user/userSlice";

const Results = () => {
    const name = useSelector(selectUser);
    const time = useSelector(selectFinishTime);
    const quesList = useSelector(selectQuestions);

    return (
        <div>
            <span>Thanks for giving this test. Here are your results</span>
            <span>Name: {name}</span>
            <span>Time Taken: {time.minutes} Minutes & {time.seconds} Seconds</span>

            {
                quesList.map((ques, ind) => {
                    return (
                        <div key={ind}>
                            <span>QuesId: {ques.questionId}</span>
                            <span>Time Taken: {ques.totalTime.minutes} Minutes & {ques.totalTime.seconds} seconds</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Results;