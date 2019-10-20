import React from 'react';
import './App.css';
import Categories from './components/Categories'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import QuestionAnswer from './components/QuestionAnswer'

function App() {

  return (
    <Router>
      <div className="App1">
          <Route path="/" exact component={Categories} />
          <Route path="/question" component={QuestionAnswer} />
      </div>
    </Router>
  );
}

export default App;
