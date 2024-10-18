// Quiz.js
import React, { useState } from 'react';
import quizData from './quizData';
import './index.css'; 

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (answer) => {
    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    setIsCorrect(null);
    if (currentQuestion + 1 === quizData.length) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setIsCorrect(null);
  };

  return (
    <div className="quiz-container">
      {showResults ? (
        <div className="results">
          <h2>Results</h2>
          <p>Score: {score} / {quizData.length}</p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-container">
          <h2>Question {currentQuestion + 1} / {quizData.length}</h2>
          <p>{quizData[currentQuestion].question}</p>
          <ul className="options-list">
            {quizData[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button className="option-button" onClick={() => handleAnswer(option)}>{option}</button>
              </li>
            ))}
          </ul>
          {isCorrect !== null && (
            <p className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;