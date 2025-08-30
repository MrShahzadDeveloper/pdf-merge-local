import { PDFDocument } from 'pdf-lib';
import { PDFFile, MergeProgress, MergeResult, MAX_FILE_SIZE } from '../types/pdf';

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

export const createPDFFileObject = (file: File): PDFFile => {
  return {
    id: generateId(),
    file,
    name: file.name,
    size: file.size,
    sizeFormatted: formatFileSize(file.size),
  };
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