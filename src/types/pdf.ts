export interface PDFPage {
  pageNumber: number;
  selected: boolean;
  thumbnail?: string;
}

export interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: number;
  sizeFormatted: string;
  pages: PDFPage[];
  totalPages: number;
}

export interface SelectedPage {
  fileId: string;
  fileName: string;
  pageNumber: number;
  originalIndex: number;
}

export interface MergeProgress {
  isActive: boolean;
  progress: number;
  currentFile?: string;
}

export interface MergeResult {
  success: boolean;
  blob?: Blob;
  fileName?: string;
  error?: string;
}

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_FILES = 20;