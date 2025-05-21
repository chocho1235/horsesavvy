import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

type Goal = 'basics' | 'hands-on' | 'qualification' | 'career' | null;
type LearningStyle = 'online' | 'in-person' | null;
type TimeCommitment = 'flexible' | 'part-time' | 'intensive' | null;

interface CourseRecommendation {
  title: string;
  description: string;
  path: string;
  additionalCourses?: CourseRecommendation[];
}

const getCourseRecommendation = (
  goal: Goal,
  learningStyle: LearningStyle,
  timeCommitment: TimeCommitment
): CourseRecommendation => {
  // Hands-on experience with intensive in-person training
  if (goal === 'hands-on' && learningStyle === 'in-person' && timeCommitment === 'intensive') {
    return {
      title: 'BHS Stage 2 Practical',
      description: 'Intensive hands-on training for serious equestrians looking to advance their practical skills.',
      path: '/bhs-stage-2-practical',
      additionalCourses: [
        {
          title: 'BHS Stage 2 Theory',
          description: 'Complement your practical training with advanced theoretical knowledge.',
          path: '/bhs-stage-2-theory'
        },
        {
          title: 'BHS Stage 1 Practical',
          description: 'Build a strong foundation before advancing to Stage 2.',
          path: '/bhs-stage-1-practical'
        }
      ]
    };
  }

  // Hands-on experience with part-time in-person training
  if (goal === 'hands-on' && learningStyle === 'in-person' && timeCommitment === 'part-time') {
    return {
      title: 'BHS Stage 1 Practical',
      description: 'Regular weekly sessions to develop your practical skills with expert guidance.',
      path: '/bhs-stage-1-practical',
      additionalCourses: [
        {
          title: 'Bronze Challenge Award',
          description: 'Perfect for beginners looking to develop practical skills.',
          path: '/bronze'
        },
        {
          title: 'BHS Stage 1 Theory',
          description: 'Complement your practical training with theoretical knowledge.',
          path: '/bhs-stage-1-theory'
        }
      ]
    };
  }

  // Career development with intensive training
  if (goal === 'career' && timeCommitment === 'intensive') {
    return {
      title: 'BHS Stage 2 Theory',
      description: 'Intensive preparation for professional qualifications and career advancement.',
      path: '/bhs-stage-2-theory',
      additionalCourses: [
        {
          title: 'BHS Stage 2 Practical',
          description: 'Combine with practical training for comprehensive professional development.',
          path: '/bhs-stage-2-practical'
        },
        {
          title: 'BHS Stage 1 Theory',
          description: 'Ensure you have a solid foundation before advancing.',
          path: '/bhs-stage-1-theory'
        }
      ]
    };
  }

  // Qualification with online learning
  if (goal === 'qualification' && learningStyle === 'online') {
    return {
      title: 'BHS Stage 1 Theory',
      description: 'Prepare for your BHS qualification with our comprehensive online course.',
      path: '/bhs-stage-1-theory',
      additionalCourses: [
        {
          title: 'BHS Stage 2 Theory',
          description: 'Advance your theoretical knowledge for higher qualifications.',
          path: '/bhs-stage-2-theory'
        },
        {
          title: 'BHS Stage 1 Practical',
          description: 'Consider adding practical training to complement your theory.',
          path: '/bhs-stage-1-practical'
        }
      ]
    };
  }

  // Basics with flexible online learning
  if (goal === 'basics' && learningStyle === 'online' && timeCommitment === 'flexible') {
    return {
      title: 'Horse Knowledge Part One',
      description: 'Learn essential horse care theory and knowledge at your own pace through our comprehensive online course.',
      path: '/horse-knowledge',
      additionalCourses: [
        {
          title: 'Horse Knowledge Part Two',
          description: 'Continue building your theoretical knowledge with more advanced horse care topics.',
          path: '/horse-knowledge-2'
        },
        {
          title: 'BHS Stage 1 Theory',
          description: "Progress to formal qualifications when you're ready.",
          path: '/bhs-stage-1-theory'
        }
      ]
    };
  }

  // Basics with part-time online learning
  if (goal === 'basics' && learningStyle === 'online' && timeCommitment === 'part-time') {
    return {
      title: 'Horse Knowledge Part Two',
      description: 'Build on your foundation with more advanced horse care theory and knowledge.',
      path: '/horse-knowledge-2',
      additionalCourses: [
        {
          title: 'BHS Stage 1 Theory',
          description: 'Progress to formal qualifications with our comprehensive theory course.',
          path: '/bhs-stage-1-theory'
        }
      ]
    };
  }

  // Default recommendations based on goal
  if (goal === 'basics') {
    return {
      title: 'Horse Knowledge Part One',
      description: 'Start with essential horse care theory and knowledge through our comprehensive online course.',
      path: '/horse-knowledge',
      additionalCourses: [
        {
          title: 'Horse Knowledge Part Two',
          description: 'Continue building your theoretical knowledge with more advanced topics.',
          path: '/horse-knowledge-2'
        },
        {
          title: 'BHS Stage 1 Theory',
          description: "Progress to formal qualifications when you're ready.",
          path: '/bhs-stage-1-theory'
        }
      ]
    };
  }
  
  if (goal === 'hands-on') {
    return {
      title: 'BHS Stage 1 Practical',
      description: 'Get hands-on experience with expert guidance from Penny.',
      path: '/bhs-stage-1-practical',
      additionalCourses: [
        {
          title: 'Bronze Challenge Award',
          description: 'Perfect for beginners looking to develop practical skills.',
          path: '/bronze'
        }
      ]
    };
  }
  
  if (goal === 'qualification') {
    return {
      title: 'BHS Stage 1 Theory',
      description: 'Prepare for your BHS qualification with our comprehensive course.',
      path: '/bhs-stage-1-theory',
      additionalCourses: [
        {
          title: 'BHS Stage 2 Theory',
          description: 'Advance your theoretical knowledge for higher qualifications.',
          path: '/bhs-stage-2-theory'
        }
      ]
    };
  }
  
  if (goal === 'career') {
    return {
      title: 'BHS Stage 2 Theory',
      description: 'Advance your career with professional-level training and qualification preparation.',
      path: '/bhs-stage-2-theory',
      additionalCourses: [
        {
          title: 'BHS Stage 1 Theory',
          description: 'Build a strong foundation before advancing to Stage 2.',
          path: '/bhs-stage-1-theory'
        },
        {
          title: 'BHS Stage 1 Practical',
          description: 'Develop practical skills alongside your theoretical knowledge.',
          path: '/bhs-stage-1-practical'
        }
      ]
    };
  }
  
  // Default recommendation
  return {
    title: 'Horse Knowledge Part One',
    description: 'Start with essential horse care theory and knowledge through our comprehensive online course.',
    path: '/horse-knowledge',
    additionalCourses: [
      {
        title: 'Horse Knowledge Part Two',
        description: 'Continue building your theoretical knowledge with more advanced topics.',
        path: '/horse-knowledge-2'
      },
      {
        title: 'BHS Stage 1 Theory',
        description: "Progress to formal qualifications when you're ready.",
        path: '/bhs-stage-1-theory'
      }
    ]
  };
};

export const CourseSelector = () => {
  const [goal, setGoal] = useState<Goal>(null);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(null);
  const [timeCommitment, setTimeCommitment] = useState<TimeCommitment>(null);

  const handleGoalSelect = (selectedGoal: Goal) => {
    setGoal(selectedGoal);
    setLearningStyle(null);
    setTimeCommitment(null);
  };

  const handleLearningStyleSelect = (selectedStyle: LearningStyle) => {
    setLearningStyle(selectedStyle);
    setTimeCommitment(null);
  };

  const handleTimeCommitmentSelect = (selectedCommitment: TimeCommitment) => {
    setTimeCommitment(selectedCommitment);
  };

  const recommendation = getCourseRecommendation(goal, learningStyle, timeCommitment);

  return (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Find Your Perfect Course</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Answer a few questions to discover which course best matches your goals
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10"
          >
            <div className="space-y-8">
              {/* Question 1 */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-4">What's your main goal?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleGoalSelect('basics')}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          goal === 'basics' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <h4 className="font-medium text-white mb-2">Learn Horse Care Basics</h4>
                        <p className="text-white/70 text-sm">Start with Horse Knowledge courses</p>
                      </button>
                      <button 
                        onClick={() => handleGoalSelect('hands-on')}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          goal === 'hands-on' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <h4 className="font-medium text-white mb-2">Get Hands-on Experience</h4>
                        <p className="text-white/70 text-sm">Try our Practical Courses</p>
                      </button>
                      <button 
                        onClick={() => handleGoalSelect('qualification')}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          goal === 'qualification' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <h4 className="font-medium text-white mb-2">Professional Qualification</h4>
                        <p className="text-white/70 text-sm">BHS Stage 1 or 2 Theory</p>
                      </button>
                      <button 
                        onClick={() => handleGoalSelect('career')}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          goal === 'career' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <h4 className="font-medium text-white mb-2">Career Development</h4>
                        <p className="text-white/70 text-sm">BHS Stage 2 Theory</p>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute left-4 top-8 bottom-0 w-px bg-white/10 -translate-y-4"></div>
              </div>

              {/* Question 2 - Only show if goal is selected */}
              {goal && (
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-4">How do you prefer to learn?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button 
                          onClick={() => handleLearningStyleSelect('online')}
                          className={`p-4 rounded-lg text-left transition-colors ${
                            learningStyle === 'online' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          <h4 className="font-medium text-white mb-2">Online at Your Pace</h4>
                          <p className="text-white/70 text-sm">Flexible online courses</p>
                        </button>
                        <button 
                          onClick={() => handleLearningStyleSelect('in-person')}
                          className={`p-4 rounded-lg text-left transition-colors ${
                            learningStyle === 'in-person' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          <h4 className="font-medium text-white mb-2">In-Person Training</h4>
                          <p className="text-white/70 text-sm">Practical courses with Penny</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-4 top-8 bottom-0 w-px bg-white/10 -translate-y-4"></div>
                </div>
              )}

              {/* Question 3 - Only show if learning style is selected */}
              {learningStyle && (
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-4">What's your time commitment?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button 
                          onClick={() => handleTimeCommitmentSelect('flexible')}
                          className={`p-4 rounded-lg text-left transition-colors ${
                            timeCommitment === 'flexible' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          <h4 className="font-medium text-white mb-2">Flexible</h4>
                          <p className="text-white/70 text-sm">Learn at your own pace</p>
                        </button>
                        <button 
                          onClick={() => handleTimeCommitmentSelect('part-time')}
                          className={`p-4 rounded-lg text-left transition-colors ${
                            timeCommitment === 'part-time' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          <h4 className="font-medium text-white mb-2">Part-Time</h4>
                          <p className="text-white/70 text-sm">Regular weekly sessions</p>
                        </button>
                        <button 
                          onClick={() => handleTimeCommitmentSelect('intensive')}
                          className={`p-4 rounded-lg text-left transition-colors ${
                            timeCommitment === 'intensive' ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          <h4 className="font-medium text-white mb-2">Intensive</h4>
                          <p className="text-white/70 text-sm">Focused training blocks</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Course Recommendation - Show when all selections are made */}
              {timeCommitment && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12 space-y-6"
                >
                  <div className="p-6 bg-red-500/20 rounded-lg border border-red-500/30">
                    <h3 className="text-xl font-semibold text-white mb-4">Recommended Course</h3>
                    <p className="text-white/90 mb-4">
                      {recommendation.description}
                    </p>
                    <Link 
                      to={recommendation.path}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <span>View {recommendation.title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {recommendation.additionalCourses && recommendation.additionalCourses.length > 0 && (
                    <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">You might also be interested in:</h3>
                      <div className="space-y-4">
                        {recommendation.additionalCourses.map((course, index) => (
                          <div key={index} className="p-4 bg-white/5 rounded-lg">
                            <h4 className="font-medium text-white mb-2">{course.title}</h4>
                            <p className="text-white/70 text-sm mb-3">{course.description}</p>
                            <Link 
                              to={course.path}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                            >
                              <span>View Course</span>
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 