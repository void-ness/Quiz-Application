import React, { useEffect, useState } from "react";
import { MathJax } from "better-react-mathjax";

const Question = ({ questionId }) => {
    const [ques, setQues] = useState("");

    const fetchQues = async () => {
        // console.log(questionId);

        const fetchedQues = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionId}`)
            .then((res) => res.json())
            .then((data) => data[0]?.Question);

        // console.log(fetchedQues);
        setQues(fetchedQues);
    }


    useEffect(() => {
        fetchQues();
    }, []);

    return (
        <div>
            {
                ques ? (
                    <MathJax>{`${ques}`}</MathJax>
                ) : (
                    <span>invalid question added</span>
                )
            }

        </div >
    );
};

export default Question;