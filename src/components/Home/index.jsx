import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { updateName, updateQues, updateStartTime, updateTotalTime } from "../../features/user/userSlice";
import quesId from "./data";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [name, setName] = useState("");
    const [quesList, setQuesList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const findQues = (ques, quesList) => {
        for (let i = 0; i < quesList.length; i++) {
            if (quesList[i].questionId === ques) return true;
        }
        return false;
    }

    const handleCheckBox = (ques) => {
        let updatedQuesList = quesList;

        if (findQues(ques, updatedQuesList) === false) {
            let updatedQues = {
                questionId: ques,
                startTime: "",
                totalTime: {
                    minutes: 0,
                    seconds: 0,
                }
            }
            updatedQuesList.push(updatedQues);
        }

        else {
            updatedQuesList = updatedQuesList.filter((currQues) => {
                return (currQues.questionId !== ques)
            })
        }

        setQuesList(updatedQuesList);
    }

    const handleSubmit = () => {
        dispatch(updateName(name));
        dispatch(updateQues(quesList));
        dispatch(updateTotalTime(quesList.length * 5))
        navigate('/quiz');
    }

    return (
        <div className="flex flex-col w-10/12 lg:w-1/2 mx-auto pt-20">
            <span className="font-bold text-3xl text-center">
                Quiz Assessment
            </span>

            <div className="mt-10 p-10 bg-green-700/40 rounded-lg mx-auto flex flex-col items-start w-full sm:w-2/3 xl:w-1/2">

                <div className="flex flex-col w-fit">
                    <label htmlFor="username" className="font-semibold text-lg mb-1">Username</label>
                    <input id="username" type="text"
                        placeholder="Enter your Name"
                        onChange={(e) => setName(e.target.value)}
                        className="mx-auto px-2 py-1 rounded-md focus-visible:outline-none bg-green-50"
                    ></input>
                </div>

                <div className="ques-container flex flex-col mt-5">
                    <label htmlFor="username" className="font-semibold text-lg mb-1 transition-all ease-in">Questions</label>
                    {quesId.map((ques, ind) => {
                        return (
                            <div key={ind} className="w-fit my-1 hover:font-bold">
                                <input id={`ques${ind}`} type="checkbox" value={ques} onChange={(e) => handleCheckBox(e.target.value)}
                                    className=""></input>
                                <label className="ml-3 text-base" htmlFor={`ques${ind}`}>{ques}</label>
                            </div>
                        )
                    })}
                </div>

                <button
                    value={"Submit"}
                    onClick={handleSubmit}
                    className="border-2 border-black px-3 py-1 mt-5 hover:font-bold">Submit</button>
            </div>



        </div>
    )
}

export default Home;