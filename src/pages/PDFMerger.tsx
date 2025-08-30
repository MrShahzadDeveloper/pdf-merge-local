import React, { useState } from 'react';
import { Shield, Zap, Lock } from 'lucide-react';
import { PDFFile, MergeProgress as MergeProgressType, MergeResult, SelectedPage, PDFPage } from '../types/pdf';
import { mergeSelectedPages } from '../utils/pdfUtils';
import { FileDropZone } from '../components/pdf/FileDropZone';
import { FileList } from '../components/pdf/FileList';
import { PageSelector } from '../components/pdf/PageSelector';
import { SelectedPagesList } from '../components/pdf/SelectedPagesList';
import { MergeProgress } from '../components/pdf/MergeProgress';
import { DownloadCard } from '../components/pdf/DownloadCard';
import { Button } from '../components/ui/button';
import { Header } from '../components/layout/Header';

const PDFMerger: React.FC = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [selectedPages, setSelectedPages] = useState<SelectedPage[]>([]);
  const [pageSelectionFile, setPageSelectionFile] = useState<PDFFile | null>(null);
  const [mergeProgress, setMergeProgress] = useState<MergeProgressType>({
    isActive: false,
    progress: 0,
  });
  const [mergeResult, setMergeResult] = useState<MergeResult | null>(null);

  const handleFilesAdded = (newFiles: PDFFile[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    // Auto-add all pages from new files to selected pages
    const newSelectedPages: SelectedPage[] = [];
    newFiles.forEach(file => {
      file.pages.forEach(page => {
        if (page.selected) {
          newSelectedPages.push({
            fileId: file.id,
            fileName: file.name,
            pageNumber: page.pageNumber,
            originalIndex: selectedPages.length + newSelectedPages.length,
          });
        }
      });
    });
    setSelectedPages(prev => [...prev, ...newSelectedPages]);
  };

  const handleFileRemove = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    // Remove associated pages from selected pages
    setSelectedPages(prev => prev.filter(page => page.fileId !== id));
  };

  const handleFilesReorder = (reorderedFiles: PDFFile[]) => {
    setFiles(reorderedFiles);
  };

  const handleSelectPages = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      setPageSelectionFile(file);
    }
  };

  const handlePageSelectionChange = (fileId: string, pages: PDFPage[]) => {
    // Update file pages
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, pages } : file
    ));

    // Update selected pages
    setSelectedPages(prev => {
      // Remove existing pages from this file
      const filteredPages = prev.filter(p => p.fileId !== fileId);
      
      // Add newly selected pages
      const file = files.find(f => f.id === fileId);
      const newSelectedPages: SelectedPage[] = [];
      pages.forEach(page => {
        if (page.selected) {
          newSelectedPages.push({
            fileId,
            fileName: file?.name || '',
            pageNumber: page.pageNumber,
            originalIndex: filteredPages.length + newSelectedPages.length,
          });
        }
      });
      
      return [...filteredPages, ...newSelectedPages];
    });
  };

  const handleSelectedPagesReorder = (reorderedPages: SelectedPage[]) => {
    setSelectedPages(reorderedPages);
  };

  const handleRemoveSelectedPage = (pageIndex: number) => {
    setSelectedPages(prev => prev.filter((_, index) => index !== pageIndex));
  };

  const handleMerge = async () => {
    if (selectedPages.length === 0) return;

    setMergeResult(null);
    const result = await mergeSelectedPages(selectedPages, files, setMergeProgress);
    setMergeResult(result);
  };

  const handleReset = () => {
    setFiles([]);
    setSelectedPages([]);
    setPageSelectionFile(null);
    setMergeProgress({ isActive: false, progress: 0 });
    setMergeResult(null);
  };

  const canMerge = selectedPages.length >= 1 && !mergeProgress.isActive;

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
              onSelectPages={handleSelectPages}
            />
          )}

          {/* Selected Pages List */}
          {selectedPages.length > 0 && !mergeResult?.success && (
            <SelectedPagesList
              selectedPages={selectedPages}
              onReorder={handleSelectedPagesReorder}
              onRemovePage={handleRemoveSelectedPage}
            />
          )}

          {/* Merge Button */}
          {selectedPages.length >= 1 && !mergeResult?.success && (
            <div className="text-center animate-bounce-in">
              <Button
                onClick={handleMerge}
                disabled={!canMerge}
                className="btn-gradient text-lg px-8 py-3 h-auto"
              >
                {mergeProgress.isActive ? 'Merging...' : `Merge ${selectedPages.length} Page${selectedPages.length !== 1 ? 's' : ''}`}
              </Button>
              
              {selectedPages.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Select at least 1 page to merge
                </p>
              )}
            </div>
          )}

          {/* Page Selector Modal */}
          {pageSelectionFile && (
            <PageSelector
              file={pageSelectionFile}
              isOpen={!!pageSelectionFile}
              onClose={() => setPageSelectionFile(null)}
              onPageSelectionChange={handlePageSelectionChange}
            />
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
                  <p>2. Click "Select Pages" to choose specific pages</p>
                  <p>3. Drag and drop to reorder selected pages</p>
                  <p>4. Click merge to combine into one PDF</p>
                  <p>5. Download your merged file instantly</p>
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