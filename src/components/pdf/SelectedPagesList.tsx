import React, { useState } from 'react';
import { GripVertical, X, FileText } from 'lucide-react';
import { SelectedPage } from '../../types/pdf';
import { Button } from '../ui/button';

interface SelectedPagesListProps {
  selectedPages: SelectedPage[];
  onReorder: (pages: SelectedPage[]) => void;
  onRemovePage: (pageIndex: number) => void;
}

export const SelectedPagesList: React.FC<SelectedPagesListProps> = ({
  selectedPages,
  onReorder,
  onRemovePage,
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedItem === null) return;

    if (draggedItem === dropIndex) return;

    const newPages = [...selectedPages];
    const [removed] = newPages.splice(draggedItem, 1);
    newPages.splice(dropIndex, 0, removed);

    onReorder(newPages);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  if (selectedPages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Selected Pages ({selectedPages.length})
        </h3>
        <p className="text-sm text-muted-foreground">
          Drag to reorder
        </p>
      </div>

      <div className="space-y-2">
        {selectedPages.map((page, index) => (
          <div
            key={`${page.fileId}-${page.pageNumber}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`
              bg-card border border-border rounded-lg p-3 transition-all hover:shadow-sm
              ${dragOverIndex === index ? 'border-t-2 border-primary' : ''}
              ${draggedItem === index ? 'opacity-50' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              {/* Drag Handle */}
              <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors">
                <GripVertical className="h-4 w-4" />
              </div>

              {/* Page Icon */}
              <div className="flex-shrink-0">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Page Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    #{index + 1}
                  </span>
                  <h4 className="font-medium text-foreground">
                    {page.fileName} - Page {page.pageNumber}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  From {page.fileName}
                </p>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemovePage(index)}
                className="flex-shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
        💡 <strong>Tip:</strong> The pages will be merged in the order shown above. 
        Drag and drop to reorder them before merging.
      </div>
    </div>
  );
};