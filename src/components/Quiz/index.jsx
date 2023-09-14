import React, { useEffect, useState } from "react";
import Question from "./Question";

import { useDispatch, useSelector } from "react-redux";
import {
    selectQuestions,
    selectTotalTime,
    updateFinishTime,
    updateStartTimeofQues,
    updateTimeSpentonQues
} from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const quesList = useSelector(selectQuestions); //list of all the question ids selected by the user
    const [quesNo, setQuesNo] = useState(0); // curr question to display
    const quesLen = quesList.length; // total no. of questions
    const quesNoList = [];

    for (let i = 1; i <= quesLen; i++) {
        quesNoList.push(i);
    }

    // the time at which user starts the test
    const [startTime, setStartTime] = useState(new Date());

    // total time needed by the user.
    const finishTime = useSelector(selectTotalTime);

    // the time by which the test should end
    let endTime = new Date(startTime.getTime() + (finishTime * 60 * 1000));
    // let endTime = new Date(startTime.getTime() + (10 * 1000)); // the time by which the test should end

    // remaining time user have to complete the test
    const [time, setTime] = useState({ minutes: finishTime, seconds: 0 });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (time.minutes + time.seconds > 1) {
            let currTime = new Date();

            const timer = setTimeout(() => {
                setTime(findTimeDiff(endTime, currTime));
            }, 1000);

            return () => clearTimeout(timer);
        }

        else {
            alert("Your time is up, please submit the test!");
        }
    })

    const handleChange = (updatedInd) => {
        let currTime = new Date();
        let quesStartTime = quesList[quesNo].startTime;

        if (quesStartTime === "") {
            quesStartTime = startTime;
        }

        let timeDiff = findTimeDiff(currTime, quesStartTime);
        dispatch(updateTimeSpentonQues({ quesNo, timeDiff }));

        setQuesNo(updatedInd);

        dispatch(updateStartTimeofQues({ quesNo: updatedInd, currTime }))
    }

    const handleSubmit = () => {
        let currTime = new Date();
        let quesStartTime = quesList[quesNo].startTime;

        if (quesStartTime === "") {
            quesStartTime = startTime;
        }

        let timeDiff = findTimeDiff(currTime, quesStartTime);
        dispatch(updateTimeSpentonQues({ quesNo: quesNo, timeDiff }));

        // updating the test finished time
        dispatch(updateFinishTime(findTimeDiff(currTime, startTime)));
        navigate("/results");
    }

    const findTimeDiff = (endTime, startTime) => {
        let diff = endTime - startTime;

        let timeDiff = {
            minutes: Math.floor(diff / (1000 * 60)),
            seconds: Math.floor((diff / (1000)) % 60),
        }

        return timeDiff;
    }

    return (
        <div className="pt-5 md:pt-10 w-10/12 mx-auto">
            <div>
                {
                    quesNoList.map((quesInd) => {
                        return (
                            <button
                                className={`${quesInd === quesNo + 1 ? "bg-green-400/75" : "bg-green-900/75"} w-fit px-3 py-1 mr-2 text-white hover:scale-105`}
                                onClick={() => handleChange(quesInd - 1)}>{quesInd}</button>
                        )
                    })
                }
            </div>

            <div className="flex justify-between mt-5">
                <span className="font-bold mb-4">
                    Ques {quesNo + 1}
                </span>

                {time &&
                    <div className="font-semibold">
                        <span>{time.minutes}min {time.seconds}sec</span>
                        <span></span>
                    </div>
                }
            </div>

            <Question key={quesNo} questionId={quesList[quesNo]?.questionId} />

            <div className="nav_buttons_container flex justify-between mt-5">
                <div>
                    {quesNo > 0 && <button onClick={() => handleChange(quesNo - 1)} className="bg-green-900/75 w-fit px-3 py-1 text-white hover:scale-105 mr-2">Prev</button>}

                    {quesNo + 1 < quesLen && <button onClick={() => handleChange(quesNo + 1)} className="bg-green-900/75 w-fit px-3 py-1 text-white hover:scale-105">Next</button>}
                </div>

                {<button onClick={() => handleSubmit()} className="bg-green-900 w-fit px-3 py-1 text-white hover:scale-105 mr-2">Finish Test</button>}
            </div>
        </div>
    )
};

export default Quiz;