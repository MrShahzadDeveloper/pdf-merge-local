import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { PDFFile, MAX_FILES } from '../../types/pdf';
import { validatePDFFile, createPDFFileObject } from '../../utils/pdfUtils';
import { Alert, AlertDescription } from '../ui/alert';

interface FileDropZoneProps {
  onFilesAdded: (files: PDFFile[]) => void;
  existingFilesCount: number;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesAdded,
  existingFilesCount,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: FileList) => {
    setError(null);
    
    const fileArray = Array.from(files);
    const totalFiles = existingFilesCount + fileArray.length;
    
    if (totalFiles > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed. You're trying to add ${fileArray.length} more files to ${existingFilesCount} existing files.`);
      return;
    }

    const validFiles: PDFFile[] = [];
    const errors: string[] = [];

    fileArray.forEach((file) => {
      const validation = validatePDFFile(file);
      if (validation.valid) {
        validFiles.push(createPDFFileObject(file));
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
    }

    if (validFiles.length > 0) {
      onFilesAdded(validFiles);
    }
  }, [onFilesAdded, existingFilesCount]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    // Reset input value to allow selecting the same files again
    e.target.value = '';
  }, [handleFiles]);

  return (
    <div className="space-y-4">
      <div
        className={`pdf-upload-zone ${isDragOver ? 'drag-over' : ''} animate-bounce-in`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              {isDragOver ? (
                <FileText className="h-8 w-8 text-primary animate-pulse" />
              ) : (
                <Upload className="h-8 w-8 text-primary" />
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isDragOver ? 'Drop your PDFs here!' : 'Upload PDF Files'}
            </h3>
            <p className="text-muted-foreground">
              Drag and drop your PDF files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Maximum {MAX_FILES} files, 50MB each • All processing happens locally
            </p>
          </div>

          <div className="space-y-3">
            <label htmlFor="pdf-upload" className="btn-gradient cursor-pointer inline-block">
              Choose PDF Files
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {error && (
        <Alert className="border-destructive/50 text-destructive animate-slide-up">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};