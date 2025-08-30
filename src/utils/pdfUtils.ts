import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFFile, MergeProgress, MergeResult, MAX_FILE_SIZE, PDFPage, SelectedPage } from '../types/pdf';

// Set worker path for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const validatePDFFile = (file: File): { valid: boolean; error?: string } => {
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'File must be a PDF' };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size must be less than ${formatFileSize(MAX_FILE_SIZE)}` };
  }
  
  return { valid: true };
};

export const createPDFFileObject = async (file: File): Promise<PDFFile> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const totalPages = pdf.numPages;
    
    const pages: PDFPage[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push({
        pageNumber: i,
        selected: true, // Default: select all pages
      });
    }
    
    return {
      id: generateId(),
      file,
      name: file.name,
      size: file.size,
      sizeFormatted: formatFileSize(file.size),
      pages,
      totalPages,
    };
  } catch (error) {
    console.error('Error reading PDF:', error);
    throw new Error('Failed to read PDF file. Please ensure it\'s a valid PDF.');
  }
};

export const mergePDFs = async (
  pdfFiles: PDFFile[],
  onProgress?: (progress: MergeProgress) => void
): Promise<MergeResult> => {
  try {
    if (pdfFiles.length < 2) {
      return { success: false, error: 'At least 2 PDF files are required for merging' };
    }

    onProgress?.({ isActive: true, progress: 0 });

    const mergedPdf = await PDFDocument.create();
    
    for (let i = 0; i < pdfFiles.length; i++) {
      const pdfFile = pdfFiles[i];
      
      onProgress?.({
        isActive: true,
        progress: (i / pdfFiles.length) * 90, // Reserve 10% for final processing
        currentFile: pdfFile.name
      });

      try {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      } catch (error) {
        console.error(`Error processing ${pdfFile.name}:`, error);
        return { 
          success: false, 
          error: `Failed to process ${pdfFile.name}. Please ensure it's a valid PDF file.` 
        };
      }
    }

    onProgress?.({ isActive: true, progress: 95, currentFile: 'Finalizing merge...' });

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    onProgress?.({ isActive: true, progress: 100, currentFile: 'Complete!' });
    
    // Brief delay to show completion
    setTimeout(() => {
      onProgress?.({ isActive: false, progress: 0 });
    }, 1000);

    return {
      success: true,
      blob,
      fileName: 'merged.pdf'
    };
  } catch (error) {
    console.error('Error merging PDFs:', error);
    onProgress?.({ isActive: false, progress: 0 });
    return {
      success: false,
      error: 'An unexpected error occurred while merging PDFs. Please try again.'
    };
  }
};

export const mergeSelectedPages = async (
  selectedPages: SelectedPage[],
  pdfFiles: PDFFile[],
  onProgress?: (progress: MergeProgress) => void
): Promise<MergeResult> => {
  try {
    if (selectedPages.length === 0) {
      return { success: false, error: 'No pages selected for merging' };
    }

    onProgress?.({ isActive: true, progress: 0 });

    const mergedPdf = await PDFDocument.create();
    const fileMap = new Map<string, PDFDocument>();
    
    // Load all PDFs first
    const uniqueFileIds = [...new Set(selectedPages.map(p => p.fileId))];
    for (const fileId of uniqueFileIds) {
      const pdfFile = pdfFiles.find(f => f.id === fileId);
      if (pdfFile) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        fileMap.set(fileId, pdf);
      }
    }
    
    // Merge selected pages in order
    for (let i = 0; i < selectedPages.length; i++) {
      const selectedPage = selectedPages[i];
      
      onProgress?.({
        isActive: true,
        progress: (i / selectedPages.length) * 90,
        currentFile: `${selectedPage.fileName} - Page ${selectedPage.pageNumber}`
      });

      const pdf = fileMap.get(selectedPage.fileId);
      if (pdf) {
        try {
          const [copiedPage] = await mergedPdf.copyPages(pdf, [selectedPage.pageNumber - 1]);
          mergedPdf.addPage(copiedPage);
        } catch (error) {
          console.error(`Error processing page ${selectedPage.pageNumber} from ${selectedPage.fileName}:`, error);
          return { 
            success: false, 
            error: `Failed to process page ${selectedPage.pageNumber} from ${selectedPage.fileName}` 
          };
        }
      }
    }

    onProgress?.({ isActive: true, progress: 95, currentFile: 'Finalizing merge...' });

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    onProgress?.({ isActive: true, progress: 100, currentFile: 'Complete!' });
    
    // Brief delay to show completion
    setTimeout(() => {
      onProgress?.({ isActive: false, progress: 0 });
    }, 1000);

    return {
      success: true,
      blob,
      fileName: 'merged.pdf'
    };
  } catch (error) {
    console.error('Error merging selected pages:', error);
    onProgress?.({ isActive: false, progress: 0 });
    return {
      success: false,
      error: 'An unexpected error occurred while merging selected pages. Please try again.'
    };
  }
};

export const downloadFile = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};