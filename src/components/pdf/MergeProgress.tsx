import React from 'react';
import { Loader2, FileCheck } from 'lucide-react';
import { MergeProgress as MergeProgressType } from '../../types/pdf';
import { Progress } from '../ui/progress';

interface MergeProgressProps {
  progress: MergeProgressType;
}

export const MergeProgress: React.FC<MergeProgressProps> = ({ progress }) => {
  if (!progress.isActive) {
    return null;
  }

  const isComplete = progress.progress === 100;

  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-bounce-in">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {isComplete ? (
            <div className="p-2 rounded-full bg-accent/10">
              <FileCheck className="h-5 w-5 text-accent" />
            </div>
          ) : (
            <div className="p-2 rounded-full bg-primary/10">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              {isComplete ? 'Merge Complete!' : 'Merging PDFs...'}
            </h3>
            {progress.currentFile && (
              <p className="text-sm text-muted-foreground">
                {progress.currentFile}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {Math.round(progress.progress)}%
            </span>
          </div>
          <Progress 
            value={progress.progress} 
            className="h-2"
          />
        </div>

        {isComplete && (
          <div className="text-sm text-accent font-medium">
            ✨ Your PDFs have been successfully merged!
          </div>
        )}
      </div>
    </div>
  );
};