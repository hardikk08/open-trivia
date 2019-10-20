import React from 'react'
import { retrieveQuestionsByCategoryFunction, retrieveQuestionsFunction } from '../helper'

class Questions extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            questions: [],
            loading: true
        }
    }

    componentDidMount () {
        this.fetchQuestions()
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.categoryId !== prevProps.categoryId) {
            this.setState({loading: true})
            this.fetchQuestions(this.props.categoryId)
        }
    }

    async fetchQuestions (hasCategoryId) {
        let questions;
        if(hasCategoryId) questions = await retrieveQuestionsByCategoryFunction(hasCategoryId)
        else questions = await retrieveQuestionsFunction()

        this.setState({questions: questions.results, loading: false})
    }

    render () {
        const colorTable = {
            easy: '#4CAF50',
            medium: '#FFEB3B',
            hard: '#FF5722'
        }
        
        const questions = !this.state.loading 
        ? this.state.questions.map((item, i) => (
            <div className="single-question" key={i}>
                <div className="question sub-container">
                    {item.question}
                </div>
                <div className="category sub-container">
                    {item.category}
                </div>
                <div className="difficulty sub-container" style={{backgroundColor: colorTable[item.difficulty]}}>
                    {item.difficulty}
                </div>
            </div>
        ))
        : <div className="loading">Loading your questions...</div>

        return (
            <div className="questions-container">
                {questions} 
            </div>
        )
    }
}

export default Questions
