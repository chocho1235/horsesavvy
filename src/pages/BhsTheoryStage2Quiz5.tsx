import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle, XCircle, BookOpen, Award, Clock, RotateCcw, Mail } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Link } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Why is it important to notice early signs of a horse's health deteriorating?",
    options: [
      "Because early action can prevent serious health problems and keep the horse comfortable.",
      "So you can avoid riding the horse.",
      "To save money on vet bills.",
      "Because it's required by law."
    ],
    correctAnswer: 0,
    explanation: "Because early action can prevent serious health problems and keep the horse comfortable."
  },
  {
    id: 2,
    question: "Name five signs that a horse's health might be getting worse.",
    options: [
      "Dull coat, weight loss, lameness, change in behaviour, not drinking enough water.",
      "Eating normally, drinking water, looking happy, moving freely, shiny coat.",
      "Running around the field, playing with other horses, eating hay, drinking water, sleeping.",
      "Being friendly, eating treats, walking normally, looking alert, having a shiny coat."
    ],
    correctAnswer: 0,
    explanation: "Dull coat, weight loss, lameness, change in behaviour, not drinking enough water."
  },
  {
    id: 3,
    question: "How can age affect a horse's health?",
    options: [
      "It can cause joint stiffness, tooth wear, and a weaker immune system.",
      "Older horses are always healthier than young horses.",
      "Age doesn't affect horse health at all.",
      "Older horses need less food and water."
    ],
    correctAnswer: 0,
    explanation: "It can cause joint stiffness, tooth wear, and a weaker immune system."
  },
  {
    id: 4,
    question: "What are two problems worms can cause in horses?",
    options: [
      "Weight loss and colic.",
      "Better appetite and more energy.",
      "Shinier coat and stronger muscles.",
      "Improved digestion and weight gain."
    ],
    correctAnswer: 0,
    explanation: "Weight loss and colic."
  },
  {
    id: 5,
    question: "Why is feeding the wrong diet dangerous for a horse?",
    options: [
      "It can lead to weight problems, stomach issues, and diseases like laminitis.",
      "The horse might not like the taste.",
      "It's more expensive than the right diet.",
      "The horse might eat too quickly."
    ],
    correctAnswer: 0,
    explanation: "It can lead to weight problems, stomach issues, and diseases like laminitis."
  },
  {
    id: 6,
    question: "How can too much or unsuitable work cause a horse's health to go downhill?",
    options: [
      "It can cause injury, tiredness, and stress if the horse isn't fit enough.",
      "It makes the horse stronger and healthier.",
      "It helps the horse lose weight faster.",
      "It improves the horse's mood."
    ],
    correctAnswer: 0,
    explanation: "It can cause injury, tiredness, and stress if the horse isn't fit enough."
  },
  {
    id: 7,
    question: "What extra care might a pregnant (in foal) horse need?",
    options: [
      "She needs more nutrition, careful handling, and monitoring for health changes.",
      "She needs less food and exercise.",
      "She should be kept away from all other horses.",
      "She needs no special care at all."
    ],
    correctAnswer: 0,
    explanation: "She needs more nutrition, careful handling, and monitoring for health changes."
  },
  {
    id: 8,
    question: "What are welfare issues, and how can they affect a horse's health?",
    options: [
      "They include poor shelter, dirty water, and neglect – all of which can make the horse ill or uncomfortable.",
      "They are only about the horse's appearance.",
      "They don't affect horse health at all.",
      "They are only about the horse's training."
    ],
    correctAnswer: 0,
    explanation: "They include poor shelter, dirty water, and neglect – all of which can make the horse ill or uncomfortable."
  },
  {
    id: 9,
    question: "Describe one way illness might show up in a horse.",
    options: [
      "The horse might have a runny nose, a cough, or seem weak and quiet.",
      "The horse might be eating more than usual.",
      "The horse might be running around more than usual.",
      "The horse might have a shinier coat than usual."
    ],
    correctAnswer: 0,
    explanation: "The horse might have a runny nose, a cough, or seem weak and quiet."
  },
  {
    id: 10,
    question: "What would you do if you noticed a horse not eating and looking tired?",
    options: [
      "Tell a responsible adult or a vet, and make sure the horse is comfortable.",
      "Ignore it as the horse is probably just resting.",
      "Give the horse more food to encourage eating.",
      "Try to make the horse exercise to wake it up."
    ],
    correctAnswer: 0,
    explanation: "Tell a responsible adult or a vet, and make sure the horse is comfortable."
  }
];

export default function BhsTheoryStage2Quiz5() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    setCompletedQuestions(prev => new Set([...prev, currentQuestion]));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedQuestions(new Set());
    setQuizCompleted(false);
  };

  const progressPercentage = (completedQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-dyslexic">
      <ContactHeader bgColor="bg-red-600" />

      {/* Back Button */}
      <div className="absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px]">
        <Link to="/">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-50 text-red-600 border-red-600 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] text-sm sm:text-base"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            <span className="font-medium">Back Home</span>
          </Button>
        </Link>
      </div>

      {/* Header Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-red-600 mx-auto" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              BeHorseSavvy
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-white">
              BHS Theory Stage 2 - Quiz 5
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Test your knowledge of horse health and welfare.
            </p>
            
            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-3 mb-6 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-white/80 text-sm">
              {completedQuestions.size} of {questions.length} questions completed
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quiz Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {!quizCompleted ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Question {currentQuestion + 1} of {questions.length}</p>
                    <p className="text-gray-900 font-medium">BeHorseSavvy</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="text-gray-600 text-sm">Multiple Choice</span>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                    } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedAnswer === index
                            ? showResult
                              ? index === questions[currentQuestion].correctAnswer
                                ? 'border-green-500 bg-green-500'
                                : 'border-red-500 bg-red-500'
                              : 'border-red-600 bg-red-600'
                            : 'border-gray-300 bg-white'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                          )}
                        </div>
                      </div>
                      <span className="text-gray-900 font-medium leading-relaxed">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {!showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Result */}
                    <div className={`p-6 rounded-xl border-2 ${
                      selectedAnswer === questions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                        <h4 className={`text-lg font-semibold ${
                          selectedAnswer === questions[currentQuestion].correctAnswer
                            ? 'text-green-800'
                            : 'text-red-800'
                        }`}>
                          {selectedAnswer === questions[currentQuestion].correctAnswer ? 'Correct!' : 'Incorrect'}
                        </h4>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {questions[currentQuestion].explanation}
                      </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl transition-all duration-300"
                      >
                        Previous Question
                      </Button>
                      
                      <Button
                        onClick={handleNextQuestion}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Quiz Completion Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Congratulations! You've completed all {questions.length} questions in the BeHorseSavvy BHS Theory Stage 2 Quiz 5. You can now return to the course.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-gray-600 text-sm">Questions Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <p className="text-gray-600 text-sm">Your Score</p>
                  <p className="text-2xl font-bold text-red-600">{score}/{questions.length}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleResetQuiz}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

    </div>
  );
} 