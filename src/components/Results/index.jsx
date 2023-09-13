import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

const Results = () => {
    const name = useSelector(selectUser);

    return (
        <div>
            <span>Thanks for giving this test. Here are your results</span>
            <span>Name: {name}</span>
        </div>
    );
};

export default Results;