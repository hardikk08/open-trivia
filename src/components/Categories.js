import React from 'react'
import { retrieveCategoriesFunction } from '../helper'
import Questions from './Questions'

export default class Categories extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            categories: [],
            categoryId: null
        }
    }
    
    componentDidMount () {
        this.loadCategories()
    }

    async loadCategories() {
        const categories = await retrieveCategoriesFunction()
        this.setState({categories: categories.trivia_categories})
    }

    showQuestionsByCategory (event) {
        this.setState({categoryId: event.target.value})    
    }

    render () {
        const { categoryId } = this.state
        const categories = this.state.categories.map((item, i) => (
            <option value={item.id} key={i}>{item.name}</option>
        ))

        return (
            <div>
                <div className = 'custom-select'>
                    <select value={categories.id} onChange={(event) => this.showQuestionsByCategory(event)}>
                        <option>Questions from random categories</option>
                        {categories}
                    </select>
                </div>
                <Questions categoryId={categoryId} />
            </div>
        )
    }
}
