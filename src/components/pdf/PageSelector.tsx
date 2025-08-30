import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFFile, PDFPage } from '../../types/pdf';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';

// Set worker path for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PageSelectorProps {
  file: PDFFile;
  isOpen: boolean;
  onClose: () => void;
  onPageSelectionChange: (fileId: string, pages: PDFPage[]) => void;
}

export const PageSelector: React.FC<PageSelectorProps> = ({
  file,
  isOpen,
  onClose,
  onPageSelectionChange,
}) => {
  const [pages, setPages] = useState<PDFPage[]>(file.pages);
  const [loading, setLoading] = useState(false);
  const [thumbnailsGenerated, setThumbnailsGenerated] = useState(false);

  const generateThumbnails = useCallback(async () => {
    if (thumbnailsGenerated || loading) return;
    
    setLoading(true);
    try {
      const arrayBuffer = await file.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      const updatedPages: PDFPage[] = [];
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        if (context) {
          await page.render({ 
            canvasContext: context, 
            viewport,
            canvas 
          }).promise;
          const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
          
          updatedPages.push({
            pageNumber: i,
            selected: file.pages.find(p => p.pageNumber === i)?.selected || false,
            thumbnail,
          });
        }
      }
      
      setPages(updatedPages);
      setThumbnailsGenerated(true);
    } catch (error) {
      console.error('Error generating thumbnails:', error);
    } finally {
      setLoading(false);
    }
  }, [file, thumbnailsGenerated, loading]);

  useEffect(() => {
    if (isOpen && !thumbnailsGenerated) {
      generateThumbnails();
    }
  }, [isOpen, generateThumbnails, thumbnailsGenerated]);

  const togglePage = (pageNumber: number) => {
    const updatedPages = pages.map(page =>
      page.pageNumber === pageNumber
        ? { ...page, selected: !page.selected }
        : page
    );
    setPages(updatedPages);
  };

  const selectAll = () => {
    const updatedPages = pages.map(page => ({ ...page, selected: true }));
    setPages(updatedPages);
  };

  const selectNone = () => {
    const updatedPages = pages.map(page => ({ ...page, selected: false }));
    setPages(updatedPages);
  };

  const handleSave = () => {
    onPageSelectionChange(file.id, pages);
    onClose();
  };

  const selectedCount = pages.filter(p => p.selected).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Select Pages from {file.name}
          </DialogTitle>
          <DialogDescription>
            Choose which pages to include in the merge. {selectedCount} of {pages.length} pages selected.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={selectNone}>
            Select None
          </Button>
        </div>

        <ScrollArea className="flex-1 pr-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Generating thumbnails...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-4">
              {pages.map((page) => (
                <div
                  key={page.pageNumber}
                  className={`relative cursor-pointer border-2 rounded-lg p-2 transition-all hover:shadow-md ${
                    page.selected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => togglePage(page.pageNumber)}
                >
                  <div className="aspect-[3/4] bg-muted rounded flex items-center justify-center relative overflow-hidden">
                    {page.thumbnail ? (
                      <img
                        src={page.thumbnail}
                        alt={`Page ${page.pageNumber}`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    )}
                    
                    {/* Selection overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                      page.selected ? 'opacity-100' : 'opacity-0 hover:opacity-30'
                    } bg-primary/20`}>
                      <div className={`rounded-full p-1 ${
                        page.selected ? 'bg-primary text-primary-foreground' : 'bg-background/80'
                      }`}>
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">Page {page.pageNumber}</p>
                  </div>
                  
                  {/* Checkbox */}
                  <div className="absolute top-1 left-1">
                    <Checkbox
                      checked={page.selected}
                      className="bg-background border-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedCount} page{selectedCount !== 1 ? 's' : ''} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Selection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};