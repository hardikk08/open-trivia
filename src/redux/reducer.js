const initialState = {
    questions: [],
    categoryId: null
  }

function rootReducer(state = initialState, action) {
    if (action.type === "ADD_QUESTIONS") {
        const updatedState = {...state, questions: action.payload}
        console.log('adding questions to state', updatedState)
        return updatedState
    }
    if (action.type === "ADD_CATEGORY") {
        const updatedState = { ...state, categoryId: action.payload.categoryId}
        console.log('adding categoryId to state', updatedState)
        return updatedState
    }
    return state
}

export default rootReducer
