// List of API's

let retrieveCategories = `https://opentdb.com/api_category.php`
let retrieveQuestions = `https://opentdb.com/api.php?amount=10`
let retrieveQuestionsByCategory = `https://opentdb.com/api.php?amount=10&category=`

async function retrieveCategoriesFunction () {
    let data = await fetch(retrieveCategories)
    let categories = await data.json()
    return categories
}

async function retrieveQuestionsFunction () {
    const data = await fetch(retrieveQuestions)
    let questions = await data.json()
    return questions
}

async function retrieveQuestionsByCategoryFunction (categoryId) {
    const data = await fetch(`${retrieveQuestionsByCategory}${categoryId}`)
    let questionsByCategory = await data.json()
    return questionsByCategory
}

export {retrieveCategoriesFunction, retrieveQuestionsByCategoryFunction, retrieveQuestionsFunction}
