import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BookOpen, BrainCircuit, CheckCircle, XCircle } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true_false';
  question: string;
  options?: string[]; // For MCQ
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const QuizzesFlashcardsTab: React.FC = () => {
  const [generatedQuizzes, setGeneratedQuizzes] = useState<QuizQuestion[]>([]);
  const [generatedFlashcards, setGeneratedFlashcards] = useState<Flashcard[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuizAnswers, setCurrentQuizAnswers] = useState<{ [key: string]: string }>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Placeholder for text to generate quizzes from (would come from NotesUploadsTab)
  const sampleText = "The capital of France is Paris. The Eiffel Tower is located in Paris. France is in Europe. The currency used in France is the Euro.";

  const handleGenerateQuizzes = async () => {
    if (!sampleText) {
      showError('Please upload and extract text in the Notes & Uploads tab first.');
      return;
    }
    setLoading(true);
    showSuccess('Generating quizzes...');
    try {
      // Placeholder for AI quiz generation API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const dummyQuizzes: QuizQuestion[] = [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is the capital of France?',
          options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
          correctAnswer: 'Paris',
        },
        {
          id: 'q2',
          type: 'true_false',
          question: 'The Eiffel Tower is located in London.',
          correctAnswer: 'False',
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which continent is France located in?',
          options: ['Asia', 'Europe', 'Africa', 'North America'],
          correctAnswer: 'Europe',
        },
      ];
      setGeneratedQuizzes(dummyQuizzes);
      setQuizStarted(false);
      setQuizScore(null);
      setCurrentQuizAnswers({});
      showSuccess('Quizzes generated!');
    } catch (error) {
      console.error('Quiz generation error:', error);
      showError('Failed to generate quizzes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    if (!sampleText) {
      showError('Please upload and extract text in the Notes & Uploads tab first.');
      return;
    }
    setLoading(true);
    showSuccess('Generating flashcards...');
    try {
      // Placeholder for AI flashcard generation API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const dummyFlashcards: Flashcard[] = [
        { id: 'f1', front: 'Capital of France', back: 'Paris' },
        { id: 'f2', front: 'Location of Eiffel Tower', back: 'Paris' },
        { id: 'f3', front: 'Currency of France', back: 'Euro' },
      ];
      setGeneratedFlashcards(dummyFlashcards);
      showSuccess('Flashcards generated!');
    } catch (error) {
      console.error('Flashcard generation error:', error);
      showError('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizScore(null);
    setCurrentQuizAnswers({});
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setCurrentQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const submitQuiz = () => {
    let score = 0;
    const updatedQuizzes = generatedQuizzes.map((q) => {
      const userAnswer = currentQuizAnswers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) {
        score++;
      }
      return { ...q, userAnswer, isCorrect };
    });
    setGeneratedQuizzes(updatedQuizzes);
    setQuizScore(score);
    setQuizStarted(false);
    showSuccess(`Quiz completed! Your score: ${score}/${generatedQuizzes.length}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5" /> Quiz Generator</CardTitle>
          <CardDescription>Generate multiple-choice and true/false questions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGenerateQuizzes} disabled={loading} className="w-full">
            {loading && generatedQuizzes.length === 0 ? 'Generating...' : 'Generate Quizzes'}
          </Button>

          {generatedQuizzes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Quizzes:</h3>
              {!quizStarted && quizScore === null && (
                <Button onClick={startQuiz} className="w-full">Start Quiz</Button>
              )}

              {quizStarted && (
                <div className="space-y-6">
                  {generatedQuizzes.map((q) => (
                    <Card key={q.id} className="p-4">
                      <p className="font-medium mb-2">{q.question}</p>
                      {q.type === 'mcq' && q.options && (
                        <RadioGroup
                          onValueChange={(value) => handleAnswerChange(q.id, value)}
                          value={currentQuizAnswers[q.id] || ''}
                        >
                          {q.options.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                              <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                      {q.type === 'true_false' && (
                        <RadioGroup
                          onValueChange={(value) => handleAnswerChange(q.id, value)}
                          value={currentQuizAnswers[q.id] || ''}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="True" id={`${q.id}-true`} />
                            <Label htmlFor={`${q.id}-true`}>True</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="False" id={`${q.id}-false`} />
                            <Label htmlFor={`${q.id}-false`}>False</Label>
                          </div>
                        </RadioGroup>
                      )}
                    </Card>
                  ))}
                  <Button onClick={submitQuiz} className="w-full">Submit Quiz</Button>
                </div>
              )}

              {quizScore !== null && (
                <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                  <CardTitle className="text-xl mb-2">Your Score: {quizScore}/{generatedQuizzes.length}</CardTitle>
                  <div className="space-y-4">
                    {generatedQuizzes.map((q) => (
                      <div key={q.id} className="border-b pb-2 last:border-b-0">
                        <p className="font-medium">{q.question}</p>
                        <p className="text-sm">Your Answer: <span className={q.isCorrect ? 'text-green-600' : 'text-red-600'}>{q.userAnswer || 'N/A'}</span></p>
                        <p className="text-sm">Correct Answer: <span className="text-green-600">{q.correctAnswer}</span></p>
                        {q.isCorrect ? (
                          <span className="flex items-center text-green-600 text-sm"><CheckCircle className="h-4 w-4 mr-1" /> Correct</span>
                        ) : (
                          <span className="flex items-center text-red-600 text-sm"><XCircle className="h-4 w-4 mr-1" /> Incorrect</span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Flashcard Generator</CardTitle>
          <CardDescription>Create flashcards for quick revision.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGenerateFlashcards} disabled={loading} className="w-full">
            {loading && generatedFlashcards.length === 0 ? 'Generating...' : 'Generate Flashcards'}
          </Button>

          {generatedFlashcards.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Flashcards:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generatedFlashcards.map((card) => (
                  <Card key={card.id} className="p-4 flex flex-col items-center justify-center text-center min-h-[120px]">
                    <p className="font-medium text-lg mb-2">{card.front}</p>
                    <p className="text-muted-foreground">({card.back})</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizzesFlashcardsTab;