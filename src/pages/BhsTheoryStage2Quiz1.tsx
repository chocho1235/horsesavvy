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
    question: "Why is it important to groom a horse in the correct order under supervision?",
    options: [
      "To save time and finish quickly",
      "To ensure the horse is comfortable and safe, and to avoid missing important grooming steps",
      "To make the horse look better",
      "To follow stable rules"
    ],
    correctAnswer: 1,
    explanation: "To ensure the horse is comfortable and safe, and to avoid missing important grooming steps."
  },
  {
    id: 2,
    question: "What safety checks must be carried out before turning a horse out to the field?",
    options: [
      "Just check the gate is closed",
      "Check the field is secure, horse has a headcollar on, correct turnout rug, and no injuries",
      "Make sure the horse is clean",
      "Check the weather forecast"
    ],
    correctAnswer: 1,
    explanation: "Check the field is secure, horse has a headcollar on, correct turnout rug, and no injuries."
  },
  {
    id: 3,
    question: "Describe three signs that a horse may be uncomfortable or in distress while being groomed.",
    options: [
      "Eating hay, drinking water, lying down",
      "Tail swishing, pinned ears, flinching, stomping feet, or moving away from the brush",
      "Looking around, sniffing the air, yawning",
      "Standing still, ears forward, relaxed tail"
    ],
    correctAnswer: 1,
    explanation: "Tail swishing, pinned ears, flinching, stomping feet, or moving away from the brush."
  },
  {
    id: 4,
    question: "Why must you follow the school's feeding instructions exactly?",
    options: [
      "Because the instructor said so",
      "Each horse has different dietary needs; the wrong feed can cause illness or behavior issues",
      "To save money on feed",
      "To make the horses eat faster"
    ],
    correctAnswer: 1,
    explanation: "Each horse has different dietary needs; the wrong feed can cause illness or behavior issues."
  },
  {
    id: 5,
    question: "Explain how a supervisor might help if a horse becomes spooked while being led.",
    options: [
      "They should shout at the horse",
      "They can take control calmly, use voice commands, and guide the groom through the correct response",
      "They should run away",
      "They should ignore the situation"
    ],
    correctAnswer: 1,
    explanation: "They can take control calmly, use voice commands, and guide the groom through the correct response."
  },
  {
    id: 6,
    question: "List four common mistakes a beginner might make while tacking up a horse.",
    options: [
      "Using the wrong colour saddle pad",
      "Placing saddle too far forward/back, girth too tight/loose, twisted reins, or incorrect bridle fitting",
      "Not brushing the horse first",
      "Using the wrong size horse"
    ],
    correctAnswer: 1,
    explanation: "Placing saddle too far forward/back, girth too tight/loose, twisted reins, or incorrect bridle fitting."
  },
  {
    id: 7,
    question: "What role does supervision play in preventing cross-contamination between horses?",
    options: [
      "Supervision ensures grooming tools and tack are cleaned or separated between horses to avoid spreading disease",
      "Supervision makes sure horses don't fight",
      "Supervision checks the weather",
      "Supervision counts the horses"
    ],
    correctAnswer: 0,
    explanation: "Supervision ensures grooming tools and tack are cleaned or separated between horses to avoid spreading disease."
  },
  {
    id: 8,
    question: "How can following instructions protect the long-term health of a horse's hooves?",
    options: [
      "Proper hoof care under guidance ensures cleaning, checking for cracks/injury, and avoiding thrush or lameness",
      "By using expensive hoof products",
      "By trimming hooves every day",
      "By painting hooves with oil"
    ],
    correctAnswer: 0,
    explanation: "Proper hoof care under guidance ensures cleaning, checking for cracks/injury, and avoiding thrush or lameness."
  },
  {
    id: 9,
    question: "Why should you report even small incidents or injuries to your supervisor immediately?",
    options: [
      "Small problems can turn serious quickly—supervisors can act early to treat or monitor the issue",
      "To get the supervisor in trouble",
      "To avoid doing work",
      "To make the supervisor busy"
    ],
    correctAnswer: 0,
    explanation: "Small problems can turn serious quickly—supervisors can act early to treat or monitor the issue."
  },
  {
    id: 10,
    question: "Give two examples of how a supervisor might assess your progress as a horse groom.",
    options: [
      "Through observation, feedback, giving new responsibilities, or practical skill tests",
      "By giving you a written test",
      "By watching you ride",
      "By asking your friends"
    ],
    correctAnswer: 0,
    explanation: "Through observation, feedback, giving new responsibilities, or practical skill tests."
  }
];

export default function BhsTheoryStage2Quiz1() {
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
              BHS Theory Stage 2 - Quiz 1
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Test your knowledge of essential horse care principles and safety procedures.
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
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? showResult
                            ? index === questions[currentQuestion].correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-red-500 bg-red-500'
                            : 'border-red-600 bg-red-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-gray-900 font-medium">{option}</span>
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
                Congratulations! You've completed all {questions.length} questions in the BeHorseSavvy BHS Theory Stage 2 Quiz 1. You can now return to the course.
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