import React from 'react'
import { retrieveCategoriesFunction } from '../helper'
import Questions from './Questions'
import { connect } from 'react-redux'
import { addCategory } from '../redux/actions'

function mapDispatchToProps (dispatch) {
    return {
        addCategory: category => dispatch(addCategory(category))
    }
}

const mapStateToProps = (state) => ({categoryId: state.categoryId})

class Categories extends React.Component {
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
        const categoryId = event.target.value
        this.setState({ categoryId })
        this.props.addCategory({ categoryId })
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories)