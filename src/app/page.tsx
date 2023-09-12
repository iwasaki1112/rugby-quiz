'use client';

import { useEffect, useState } from "react"

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
  },
  {
    "question": "ラグビーのピッチの最大の長さは何メートルですか？",
    "options": ["90m", "100m", "120m", "130m"],
    "correct": "100m"
  },
  {
    "question": "ラグビーのピッチの最大の幅は何メートルですか？",
    "options": ["50m", "60m", "70m", "80m"],
    "correct": "70m"
  },
  {
    "question": "ラグビーで、ボールを前方に落とすと、何が与えられますか？",
    "options": ["ペナルティ", "スクラム", "フリーキック", "トライ"],
    "correct": "スクラム"
  },
  {
    "question": "どの国がラグビーワールドカップで最も多くのタイトルを持っていますか？",
    "options": ["イングランド", "南アフリカ", "ニュージーランド", "オーストラリア"],
    "correct": "ニュージーランド"
  },
  {
    "question": "ラグビーボールは主に何から作られていますか？",
    "options": ["ゴム", "皮", "ナイロン", "綿"],
    "correct": "皮"
  },
  {
    "question": "ラグビーの試合は通常何分で終了しますか？",
    "options": ["60分", "70分", "80分", "90分"],
    "correct": "80分"
  },
  {
    "question": "ゲームでプレイヤーがペナルティを受けた場合、どれが正確なリスタート方法ですか？",
    "options": ["スクラム", "キックオフ", "ドロップキック", "ペナルティキック"],
    "correct": "ペナルティキック"
  },
  {
    "question": "ラグビーリーグとラグビーユニオンの主な違いの一つは何ですか？",
    "options": ["ボールの形", "試合時間", "プレイヤーの数", "ピッチのサイズ"],
    "correct": "プレイヤーの数"
  },
  {
    "question": "どの国が「オールブラックス」として知られていますか？",
    "options": ["オーストラリア", "ニュージーランド", "南アフリカ", "アルゼンチン"],
    "correct": "ニュージーランド"
  },
  {
    "question": "ハカはどの国の伝統的な戦争のダンスですか？",
    "options": ["フィジー", "サモア", "タヒチ", "ニュージーランド"],
    "correct": "ニュージーランド"
  }
]
const MAX_QUESTION_NUM = 5;

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);

  const handleAnswerOptionClick = (isCorrect: boolean): void => {
    if (isCorrect) setScore(score + 1)

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < MAX_QUESTION_NUM) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    const random5Quiz = getRandom5Quiz(questions);
    setQuiz(random5Quiz)
  }, [])

  const getRandom5Quiz = (questions: QuizQuestion[]) => {
    const shuffled = questions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }

  const getGrade = (score: number) => {
    switch (score) {
      case 5:
        return 'W杯級'
      case 4:
        return 'スーパーラグビー級'
      case 3:
        return 'トップリーグ級'
      case 2:
        return '花園級'
      default:
        return '県大会級'
    }
  };

  if (quiz.length === 0) return (<div className="loading">ロード中です</div>)
  return (
    <section className="container">
      {showScore ? (
        <ScoreSection
          score={score}
          getGrade={getGrade} />
      ) : (
        <>
          <QuizSection
            currentQuestion={currentQuestion}
            questions={quiz}
          />
          <AnswerSection
            currentQuestion={currentQuestion}
            handleAnswerOptionClick={handleAnswerOptionClick}
            questions={quiz}
          />
        </>
      )}
    </section>
  );
}

const ScoreSection: React.FC<{ score: number, getGrade: (score: number) => string }> = ({ score, getGrade }) => {
  return (
    <section className="score-section">
      あなたは<span className="score-section--strong">{getGrade(score)}</span>です！
    </section>
  )
}

const QuizSection: React.FC<{ currentQuestion: number, questions: QuizQuestion[] }> = ({ currentQuestion, questions }) => {
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

const AnswerSection: React.FC<{ currentQuestion: number, questions: QuizQuestion[], handleAnswerOptionClick: (isCorrect: boolean) => void }> = ({ currentQuestion, questions, handleAnswerOptionClick }) => {
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
