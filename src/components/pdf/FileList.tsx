import React, { useState } from 'react';
import { PDFFile } from '../../types/pdf';
import { FileItem } from './FileItem';

interface FileListProps {
  files: PDFFile[];
  onReorder: (files: PDFFile[]) => void;
  onRemove: (id: string) => void;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onReorder,
  onRemove,
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
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
    
    if (!draggedItem) return;

    const dragIndex = files.findIndex(file => file.id === draggedItem);
    if (dragIndex === -1 || dragIndex === dropIndex) return;

    const newFiles = [...files];
    const [removed] = newFiles.splice(dragIndex, 1);
    newFiles.splice(dropIndex, 0, removed);

    onReorder(newFiles);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Files to Merge ({files.length})
        </h3>
        <p className="text-sm text-muted-foreground">
          Drag to reorder
        </p>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={file.id}
            draggable
            onDragStart={(e) => handleDragStart(e, file.id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`
              ${dragOverIndex === index ? 'border-t-2 border-primary' : ''}
              ${draggedItem === file.id ? 'opacity-50' : ''}
            `}
          >
            <FileItem
              file={file}
              index={index}
              onRemove={onRemove}
              isDragging={draggedItem === file.id}
              dragHandleProps={{
                onMouseDown: (e: React.MouseEvent) => {
                  // Prevent text selection while dragging
                  e.preventDefault();
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
        💡 <strong>Tip:</strong> The files will be merged in the order shown above. 
        Drag and drop to reorder them before merging.
      </div>
    </div>
  );
};