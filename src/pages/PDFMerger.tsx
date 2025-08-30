import React, { useState } from 'react';
import { Shield, Zap, Lock } from 'lucide-react';
import { PDFFile, MergeProgress as MergeProgressType, MergeResult } from '../types/pdf';
import { mergePDFs } from '../utils/pdfUtils';
import { FileDropZone } from '../components/pdf/FileDropZone';
import { FileList } from '../components/pdf/FileList';
import { MergeProgress } from '../components/pdf/MergeProgress';
import { DownloadCard } from '../components/pdf/DownloadCard';
import { Button } from '../components/ui/button';
import { Header } from '../components/layout/Header';

const PDFMerger: React.FC = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [mergeProgress, setMergeProgress] = useState<MergeProgressType>({
    isActive: false,
    progress: 0,
  });
  const [mergeResult, setMergeResult] = useState<MergeResult | null>(null);

  const handleFilesAdded = (newFiles: PDFFile[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileRemove = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleFilesReorder = (reorderedFiles: PDFFile[]) => {
    setFiles(reorderedFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;

    setMergeResult(null);
    const result = await mergePDFs(files, setMergeProgress);
    setMergeResult(result);
  };

  const handleReset = () => {
    setFiles([]);
    setMergeProgress({ isActive: false, progress: 0 });
    setMergeResult(null);
  };

  const canMerge = files.length >= 2 && !mergeProgress.isActive;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Merge PDFs Instantly
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Private, Fast & Free
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              All processing happens locally in your browser. Your files never leave your device.
            </p>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground">100% Private</h3>
                <p className="text-sm text-muted-foreground">Files processed locally</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Instant processing</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground">Secure</h3>
                <p className="text-sm text-muted-foreground">No server uploads</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Success/Download State */}
          {mergeResult?.success && mergeResult.blob && (
            <DownloadCard
              blob={mergeResult.blob}
              fileName={mergeResult.fileName || 'merged.pdf'}
              onReset={handleReset}
            />
          )}

          {/* Error State */}
          {mergeResult?.error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 animate-slide-up">
              <h3 className="font-semibold text-destructive mb-2">Error</h3>
              <p className="text-destructive/80">{mergeResult.error}</p>
            </div>
          )}

          {/* Progress State */}
          <MergeProgress progress={mergeProgress} />

          {/* File Upload */}
          {!mergeResult?.success && (
            <FileDropZone
              onFilesAdded={handleFilesAdded}
              existingFilesCount={files.length}
            />
          )}

          {/* File List */}
          {files.length > 0 && !mergeResult?.success && (
            <FileList
              files={files}
              onReorder={handleFilesReorder}
              onRemove={handleFileRemove}
            />
          )}

          {/* Merge Button */}
          {files.length >= 2 && !mergeResult?.success && (
            <div className="text-center animate-bounce-in">
              <Button
                onClick={handleMerge}
                disabled={!canMerge}
                className="btn-gradient text-lg px-8 py-3 h-auto"
              >
                {mergeProgress.isActive ? 'Merging...' : `Merge ${files.length} PDFs`}
              </Button>
              
              {files.length < 2 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Add at least 2 PDF files to merge
                </p>
              )}
            </div>
          )}

          {/* Help Text */}
          {files.length === 0 && (
            <div className="text-center py-8">
              <div className="max-w-md mx-auto space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Get Started
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>1. Upload your PDF files (up to 20 files, 50MB each)</p>
                  <p>2. Drag and drop to reorder them</p>
                  <p>3. Click merge to combine into one PDF</p>
                  <p>4. Download your merged file instantly</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PDFMerger;