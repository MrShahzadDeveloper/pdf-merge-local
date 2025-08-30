import React from 'react';
import { FileText, X, GripVertical } from 'lucide-react';
import { PDFFile } from '../../types/pdf';
import { Button } from '../ui/button';

interface FileItemProps {
  file: PDFFile;
  index: number;
  onRemove: (id: string) => void;
  isDragging?: boolean;
  dragHandleProps?: any;
}

export const FileItem: React.FC<FileItemProps> = ({
  file,
  index,
  onRemove,
  isDragging = false,
  dragHandleProps,
}) => {
  return (
    <div className={`file-item ${isDragging ? 'dragging' : ''} animate-slide-up`}>
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <div
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
        >
          <GripVertical className="h-4 w-4" />
        </div>

        {/* File Icon */}
        <div className="flex-shrink-0">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              #{index + 1}
            </span>
            <h4 className="font-medium text-foreground truncate">
              {file.name}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {file.sizeFormatted}
          </p>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(file.id)}
          className="flex-shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};