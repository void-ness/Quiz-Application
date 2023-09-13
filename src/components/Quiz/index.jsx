import React, { useEffect, useState } from "react";
import Question from "./Question";

import { useDispatch, useSelector } from "react-redux";
import { selectQuestions, selectTotalTime, updateFinishTime } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const quesList = useSelector(selectQuestions); //list of all the question ids selected by the user
    const finishTime = useSelector(selectTotalTime);
    const dispatch = useDispatch();
    const [quesNo, setQuesNo] = useState(0); // curr question to display
    const quesLen = quesList.length; // total no. of questions

    const [startTime, setStartTime] = useState(new Date());
    let endTime = new Date(startTime.getTime() + (finishTime * 60 * 1000));

    const [leftTime, setLeftTime] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        // const timeInterval = setInterval(() => {
        //     findTimeElapsed();
        // }, 1000);
    })

    const handleIncrement = () => {
        setQuesNo((quesNo + 1));
    }

    const handleDecrement = () => {
        setQuesNo((quesNo - 1));
    }

    const handleSubmit = () => {
        // navigate("/results");
        // findTimeElapsed();
        // clearInterval(timeInterval);
        dispatch(updateFinishTime(leftTime))
    }

    const findTimeElapsed = () => {
        let currTime = new Date();

        let diff = endTime - currTime;

        let timeLeft = {
            minutes: Math.floor(diff / (1000 * 60)),
            seconds: Math.floor((diff / (1000)) % 60),
        }

        setLeftTime(timeLeft);
    }

    return (
        <div>
            <span>
                The Quiz starts now!
            </span>

            <Question questionId={quesList[quesNo]} />

            {quesNo > 0 && <button onClick={() => handleDecrement()}>Prev</button>}

            {quesNo + 1 < quesLen && <button onClick={() => handleIncrement()}>Next</button>}

            {<button onClick={() => handleSubmit()}>Finish Test</button>}

            {leftTime &&
                <div>
                    <span>{leftTime.minutes} minutes</span>
                    <span>{leftTime.seconds} seconds</span>
                </div>
            }
        </div>
    )
};

export default Quiz;