'use client';

import { useState } from "react";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  const handleAnswerOptionClick = (isCorrect: boolean): void => {
    if (isCorrect) setScore(score + 1)

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const getGrade = (score: number) => {
    switch (score) {
      case 5:
        return 'A'
      case 4:
        return 'B'
      case 3:
        return 'C'
      case 2:
        return 'D'
      default:
        return 'E'
    }
  };

  return (
    <section className="container">
      {showScore ? (
        <ScoreSection
          score={score}
          getGrade={getGrade} />
      ) : (
        <>
          <QuizSection currentQuestion={currentQuestion} />
          <AnswerSection
            currentQuestion={currentQuestion}
            handleAnswerOptionClick={handleAnswerOptionClick}
          />
        </>
      )}
    </section>
  );
}


type QuizQuestion = {
  question: string;
  options: string[];
  correct: string;
}

const questions: QuizQuestion[] = [
  {
    "question": "ラグビーのボールは何角形ですか？",
    "options": ["円形", "楕円形", "四角形", "三角形"],
    "correct": "楕円形",
  },
  {
    "question": "スクラムとは何ですか？",
    "options": ["キック", "パス", "タックル", "フォーメーション"],
    "correct": "フォーメーション"
  },
  {
    "question": "ラグビーワールドカップが最初に開催された年は？",
    "options": ["1975", "1987", "1991", "2000"],
    "correct": "1987"
  },
  {
    "question": "トライは何点ですか？",
    "options": ["3点", "5点", "7点", "10点"],
    "correct": "5点"
  },
  {
    "question": "ラグビーは何人でプレイしますか？",
    "options": ["11人", "13人", "15人", "18人"],
    "correct": "15人"
  }
]

const ScoreSection: React.FC<{ score: number, getGrade: (score: number) => string }> = ({ score, getGrade }) => {
  return (
    <section className="score-section">
      You scored {score} out of {questions.length} - Grade: {getGrade(score)}
    </section>
  )
}

const QuizSection: React.FC<{ currentQuestion: number }> = ({ currentQuestion }) => {
  return (
    <section className="question-section">
      <div className="question-count">
        <span>Question {currentQuestion + 1}</span>/{questions.length}
      </div>
      <div className="question-text">
        {questions[currentQuestion].question}
      </div>
    </section>
  )
}

const AnswerSection: React.FC<{ currentQuestion: number, handleAnswerOptionClick: (isCorrect: boolean) => void }> = ({ currentQuestion, handleAnswerOptionClick }) => {
  return (
    <section className="answer-section">
      {questions[currentQuestion].options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerOptionClick(option === questions[currentQuestion].correct)}
        >
          {option}
        </button>
      ))}
    </section>
  )
}
