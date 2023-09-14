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
        if (time.minutes + time.seconds > 0) {
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

    const handleChange = (change) => {
        let currTime = new Date();
        let quesStartTime = quesList[quesNo].startTime;

        if (quesStartTime === "") {
            quesStartTime = startTime;
        }

        let timeDiff = findTimeDiff(currTime, quesStartTime);
        dispatch(updateTimeSpentonQues({ quesNo, timeDiff }));

        setQuesNo((quesNo + change));

        dispatch(updateStartTimeofQues({ quesNo: quesNo + change, currTime }))
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
        <div>
            <span>
                The Quiz starts now!
            </span>

            <Question key={quesNo} questionId={quesList[quesNo]?.questionId} />

            {quesNo > 0 && <button onClick={() => handleChange(-1)}>Prev</button>}

            {quesNo + 1 < quesLen && <button onClick={() => handleChange(1)}>Next</button>}

            {<button onClick={() => handleSubmit()}>Finish Test</button>}

            {time &&
                <div>
                    <span>{time.minutes} minutes</span>
                    <span>{time.seconds} seconds</span>
                </div>
            }
        </div>
    )
};

export default Quiz;