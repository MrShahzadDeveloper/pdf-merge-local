import React from 'react';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent terms for using our PDF merger tool.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="bg-card border border-border rounded-xl p-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Quick Summary</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground">Free to Use</p>
                <p className="text-muted-foreground">No cost, no accounts</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground">No Warranty</p>
                <p className="text-muted-foreground">Use at your own risk</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground">Your Content</p>
                <p className="text-muted-foreground">You own your files</p>
              </div>
            </div>
          </div>

          {/* Detailed Terms */}
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By accessing and using our PDF merger tool, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
                <p>
                  If you do not agree to these terms, please do not use our service.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Service Description</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our service provides a free, client-side PDF merging tool that allows users to:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Upload multiple PDF files</li>
                  <li>Reorder files before merging</li>
                  <li>Merge PDFs into a single document</li>
                  <li>Download the merged result</li>
                </ul>
                <p>
                  All processing occurs locally in your browser without uploading files to our servers.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You are responsible for:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Ensuring you have the right to use and modify the PDF files you upload</li>
                  <li>Not using our service for illegal or unauthorized purposes</li>
                  <li>Not attempting to circumvent any technical limitations of the service</li>
                  <li>Respecting the intellectual property rights of others</li>
                  <li>Using the service in compliance with all applicable laws and regulations</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Prohibited Uses</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive mb-2">You may not use our service to:</p>
                    <ul className="space-y-1 text-sm list-disc ml-4">
                      <li>Process copyrighted material without permission</li>
                      <li>Merge documents containing illegal content</li>
                      <li>Attempt to overload or disrupt the service</li>
                      <li>Reverse engineer or copy our technology</li>
                      <li>Use automated tools to abuse the service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Service Limitations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our service has the following technical limitations:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Maximum file size: 50MB per PDF</li>
                  <li>Maximum files per merge: 20 PDFs</li>
                  <li>Browser compatibility requirements</li>
                  <li>JavaScript must be enabled</li>
                </ul>
                <p>
                  We reserve the right to modify these limitations at any time without notice.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Disclaimer of Warranties</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our service is provided "as is" without any warranties, express or implied. We do not guarantee:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Uninterrupted or error-free service</li>
                  <li>Perfect quality of merged PDFs</li>
                  <li>Compatibility with all PDF formats</li>
                  <li>Availability at all times</li>
                  <li>Security against all possible threats</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We shall not be liable for any direct, indirect, incidental, special, or consequential damages 
                  resulting from the use or inability to use our service, including but not limited to:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Loss of data or files</li>
                  <li>Business interruption</li>
                  <li>Loss of profits or revenue</li>
                  <li>Damage to reputation</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting to this page. Your continued use of the service after any changes constitutes 
                  acceptance of the new terms.
                </p>
                <p className="text-sm">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about these Terms of Service, please contact us through our website.
                </p>
                <p>
                  We will make our best effort to respond to inquiries in a timely manner.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <Button asChild className="btn-gradient">
              <Link to="/">
                <FileText className="h-4 w-4 mr-2" />
                Start Using PDF Merger
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;