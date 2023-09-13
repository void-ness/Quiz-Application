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

    const handleCheckBox = (ques) => {
        let updatedQuesList = quesList;

        if (updatedQuesList.includes(ques) === false) {
            updatedQuesList.push(ques);
        }

        else {
            updatedQuesList = updatedQuesList.filter((currQues) => {
                return (currQues !== ques)
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
        <div className="flex flex-col w-1/2 mx-auto text-center">
            <span className="font-bold text-2xl">
                Welcome!
            </span>

            <div className="flex flex-col my-2">
                <label htmlFor="username">Username</label>
                <input id="username" type="text"
                    placeholder="Enter your Name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-1/2 mx-auto"
                ></input>
            </div>

            <div className="ques-container flex flex-col items-start w-fit mx-auto">
                {quesId.map((ques, ind) => {
                    return (
                        <div key={ind}>
                            <input id={`ques${ind}`} type="checkbox" value={ques} onChange={(e) => handleCheckBox(e.target.value)}></input>
                            <label className="ml-3" htmlFor={`ques${ind}`}>{ques}</label>
                        </div>
                    )
                })}
            </div>


            <button value={"Submit"} onClick={handleSubmit} className="border-2 border-black w-fit mx-auto p-1 rounded-lg my-2">Submit</button>
        </div>
    )
}

export default Home;