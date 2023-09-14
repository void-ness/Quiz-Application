import React from "react";
import { useSelector } from "react-redux";
import { selectFinishTime, selectQuestions, selectUser } from "../../features/user/userSlice";

const Results = () => {
    const name = useSelector(selectUser);
    const time = useSelector(selectFinishTime);
    const quesList = useSelector(selectQuestions);

    return (
        <div className="pt-10 flex flex-col w-10/12 sm:w-1/2 mx-auto text-lg">
            <span className="font-bold text-2xl">Results</span>

            <div className="bg-green-400/70 flex flex-col p-2 my-2 shadow-xl">
                <span className="">Name: <b>{name}</b></span>
                <span>Time Taken: <b>{time.minutes}min {time.seconds}sec</b></span>
            </div>

            <div className="my-2 bg-green-500/30 p-2 shadow-2xl">
                {
                    quesList.map((ques, ind) => {
                        return (
                            <div key={ind} className="flex flex-col my-2">
                                <span><b>QuesId:</b> {ques.questionId}</span>
                                <span><b>Time Taken:</b> {ques.totalTime.minutes}min {ques.totalTime.seconds}sec</span>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};

export default Results;