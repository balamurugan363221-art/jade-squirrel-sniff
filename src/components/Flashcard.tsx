"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      className={cn(
        "relative h-48 w-full cursor-pointer perspective-1000",
        "transform-gpu transition-transform duration-500 ease-in-out",
        isFlipped ? "rotate-y-180" : ""
      )}
      onClick={handleFlip}
    >
      <div className="absolute inset-0 backface-hidden flex items-center justify-center p-4 text-center">
        <CardContent className="flex flex-col items-center justify-center h-full w-full">
          <p className="font-medium text-lg">{front}</p>
          <p className="text-sm text-muted-foreground mt-2">Click to reveal answer</p>
        </CardContent>
      </div>
      <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-4 text-center bg-secondary text-secondary-foreground rounded-lg">
        <CardContent className="flex flex-col items-center justify-center h-full w-full">
          <p className="font-medium text-lg">{back}</p>
          <p className="text-sm text-muted-foreground mt-2">Click to flip back</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default Flashcard;