import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-2xl space-y-6">
        <Brain className="h-24 w-24 mx-auto text-primary" />
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
          Welcome to <span className="text-primary">Polaris AI</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Your intelligent study buddy for effortless learning. Upload notes, get summaries, generate quizzes, and plan your revisions with AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;