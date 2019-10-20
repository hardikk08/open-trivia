import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux"

const questionAnswer = (props) => {
    const { questionData } = props.location.state

    return (
        <div>
            <div className="question-data">
                <Link className="question-back" to={{ pathname: '/', state: { allQuestions: props.location.state.allQuestions, hasOldData: true } }}>
                    Back
                </Link>
                <div className="question-question question-common-color">
                    {questionData.question}
                </div>
                <div className="question-difficulty question-common-color">
                    {questionData.difficulty} 
                </div>
                <div className="question-type question-common-color">
                    {questionData.type} 
                </div>
            </div>
            <div className="answers">
                <div className="correct-answer">
                    {questionData.correct_answer}
                </div>
                {questionData.incorrect_answers.map((answer, i)=> <div className="incorrect-answer" key={i}>{answer}</div>)}
            </div>
        </div>
    )
}

export default connect(null, null)(questionAnswer)
