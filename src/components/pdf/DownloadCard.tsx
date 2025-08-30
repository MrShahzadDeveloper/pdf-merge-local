import React from 'react';
import { Download, FileCheck, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { downloadFile } from '../../utils/pdfUtils';

interface DownloadCardProps {
  blob: Blob;
  fileName: string;
  onReset: () => void;
}

export const DownloadCard: React.FC<DownloadCardProps> = ({
  blob,
  fileName,
  onReset,
}) => {
  const handleDownload = () => {
    downloadFile(blob, fileName);
  };

  const fileSizeFormatted = (blob.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="bg-gradient-card border border-border rounded-xl p-6 animate-bounce-in">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-accent/10">
            <FileCheck className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              PDF Merge Complete!
            </h3>
            <p className="text-muted-foreground">
              Your merged PDF is ready for download
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{fileName}</p>
              <p className="text-sm text-muted-foreground">
                {fileSizeFormatted} MB
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            className="btn-success flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          
          <Button
            variant="outline"
            onClick={onReset}
            className="flex-shrink-0"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Merge More
          </Button>
        </div>

        <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
          🔒 <strong>Privacy Protected:</strong> Your files were processed entirely in your browser. 
          No data was uploaded to any server.
        </div>
      </div>
    </div>
  );
};