import React from 'react'
import { retrieveQuestionsByCategoryFunction, retrieveQuestionsFunction } from '../helper'
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { addQuestions } from '../redux/actions'

function mapDisptachToProps (dispatch) {
    return {
        addQuestions: (questions) => dispatch(addQuestions(questions))
    }
}

const mapStateToProps = (state) => ({questions: state.questions})

class QuestionsComponent extends React.Component {
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
        // TODO: Implement redux 
        // if (this.props.questions.length > 0) {
        //     this.setState({questions: this.props.questions})
        //     console.log('Questions present in state', this.state)
        //     return
        // }
        let questions;
        if(hasCategoryId) questions = await retrieveQuestionsByCategoryFunction(hasCategoryId)
        else questions = await retrieveQuestionsFunction()

        this.props.addQuestions(questions.results)
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
                <Link className="question sub-container" to={{ pathname: '/question', state: { questionData: item, allQuestions: this.state.questions} }}>
                    {item.question}
                </Link>
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

const Questions = withRouter(connect(mapStateToProps, mapDisptachToProps)(QuestionsComponent))

export default Questions
