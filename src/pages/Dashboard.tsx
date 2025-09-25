import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotesUploadsTab from '@/components/tabs/NotesUploadsTab';
import QuizzesFlashcardsTab from '@/components/tabs/QuizzesFlashcardsTab';
import PlannerTab from '@/components/tabs/PlannerTab';
import { FileText, BrainCircuit, CalendarDays } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Polaris AI Dashboard</h1>
      <Tabs defaultValue="notes-uploads" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="notes-uploads" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Notes & Uploads
          </TabsTrigger>
          <TabsTrigger value="quizzes-flashcards" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" /> Quizzes & Flashcards
          </TabsTrigger>
          <TabsTrigger value="planner" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" /> Planner
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notes-uploads" className="mt-6">
          <NotesUploadsTab />
        </TabsContent>
        <TabsContent value="quizzes-flashcards" className="mt-6">
          <QuizzesFlashcardsTab />
        </TabsContent>
        <TabsContent value="planner" className="mt-6">
          <PlannerTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;