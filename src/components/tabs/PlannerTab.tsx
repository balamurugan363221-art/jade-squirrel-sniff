import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, Goal, BellRing, Brain } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

interface StudyReminder {
  id: string;
  message: string;
  time: string; // e.g., "10:00 AM"
  date: Date;
}

const PlannerTab: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [reminders, setReminders] = useState<StudyReminder[]>([]);
  const [newReminderMessage, setNewReminderMessage] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('09:00');
  const [loading, setLoading] = useState(false);

  const handleAddGoal = () => {
    if (newGoalTitle && date) {
      const newGoal: StudyGoal = {
        id: Date.now().toString(),
        title: newGoalTitle,
        description: newGoalDescription,
        date: date,
        completed: false,
      };
      setGoals((prev) => [...prev, newGoal]);
      setNewGoalTitle('');
      setNewGoalDescription('');
      showSuccess('Study goal added!');
    } else {
      showError('Please enter a goal title and select a date.');
    }
  };

  const handleToggleGoalCompletion = (id: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
    showSuccess('Goal status updated!');
  };

  const handleAddReminder = () => {
    if (newReminderMessage && newReminderTime && date) {
      const newReminder: StudyReminder = {
        id: Date.now().toString(),
        message: newReminderMessage,
        time: newReminderTime,
        date: date,
      };
      setReminders((prev) => [...prev, newReminder]);
      setNewReminderMessage('');
      setNewReminderTime('09:00');
      showSuccess('Study reminder added!');
    } else {
      showError('Please enter a reminder message, time, and select a date.');
    }
  };

  const handleAIRecSchedule = async () => {
    setLoading(true);
    showSuccess('Generating revision schedule...');
    try {
      // Placeholder for AI recommendation API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccess('AI revision schedule recommended!');
      // In a real app, this would update goals/reminders or display a recommendation
    } catch (error) {
      console.error('AI schedule error:', error);
      showError('Failed to generate AI schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredGoals = goals.filter(goal => date && goal.date.toDateString() === date.toDateString());
  const filteredReminders = reminders.filter(reminder => date && reminder.date.toDateString() === date.toDateString());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Study Calendar</CardTitle>
          <CardDescription>Select a date to view and add plans.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Goal className="h-5 w-5" /> Study Goals for {date?.toDateString() || 'Selected Date'}</CardTitle>
            <CardDescription>Set your learning objectives.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Input
                placeholder="Goal Title (e.g., Finish Chapter 3)"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
              />
              <Textarea
                placeholder="Goal Description (optional)"
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
                rows={2}
              />
              <Button onClick={handleAddGoal} className="w-full">Add Goal</Button>
            </div>
            <div className="space-y-2">
              {filteredGoals.length === 0 ? (
                <p className="text-muted-foreground">No goals for this date.</p>
              ) : (
                filteredGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {goal.title}
                      </p>
                      {goal.description && <p className="text-sm text-muted-foreground">{goal.description}</p>}
                    </div>
                    <Button
                      variant={goal.completed ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => handleToggleGoalCompletion(goal.id)}
                    >
                      {goal.completed ? 'Undo' : 'Complete'}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5" /> Study Reminders for {date?.toDateString() || 'Selected Date'}</CardTitle>
            <CardDescription>Get timely notifications for your study sessions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="Reminder Message (e.g., Review AI concepts)"
                value={newReminderMessage}
                onChange={(e) => setNewReminderMessage(e.target.value)}
                className="flex-grow"
              />
              <Input
                type="time"
                value={newReminderTime}
                onChange={(e) => setNewReminderTime(e.target.value)}
                className="w-auto"
              />
              <Button onClick={handleAddReminder}>Add Reminder</Button>
            </div>
            <div className="space-y-2">
              {filteredReminders.length === 0 ? (
                <p className="text-muted-foreground">No reminders for this date.</p>
              ) : (
                filteredReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{reminder.message}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5" /> Smart Revision</CardTitle>
            <CardDescription>AI-powered recommendations for your study schedule.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleAIRecSchedule} disabled={loading} className="w-full">
              {loading ? 'Generating...' : 'Recommend Revision Schedule'}
            </Button>
            {/* Display AI recommendations here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlannerTab;