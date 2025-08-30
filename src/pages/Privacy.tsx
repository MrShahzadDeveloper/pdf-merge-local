import React from 'react';
import { Shield, Server, Lock, Eye } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is our top priority. Learn how we protect your data.
            </p>
          </div>

          {/* Privacy Features */}
          <div className="grid sm:grid-cols-2 gap-6 my-12">
            <div className="bg-card border border-border rounded-xl p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Local Processing</h3>
              </div>
              <p className="text-muted-foreground">
                All PDF merging happens directly in your browser. Your files are never uploaded to our servers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Server className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">No Data Storage</h3>
              </div>
              <p className="text-muted-foreground">
                We don't store, cache, or keep copies of your PDFs. Once you close the browser tab, everything is gone.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Secure Connection</h3>
              </div>
              <p className="text-muted-foreground">
                Our website uses HTTPS encryption to protect your connection and ensure secure browsing.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">No Tracking</h3>
              </div>
              <p className="text-muted-foreground">
                We don't use cookies, analytics, or tracking scripts to monitor your activity or collect personal data.
              </p>
            </div>
          </div>

          {/* Detailed Policy */}
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Processing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our PDF merger tool is designed with privacy by design principles. Here's exactly what happens to your data:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>PDF files are processed using client-side JavaScript in your browser</li>
                  <li>No files are transmitted to our servers at any point</li>
                  <li>All processing is done using the pdf-lib library running locally</li>
                  <li>Your merged PDF is generated in your browser's memory</li>
                  <li>Files are automatically cleared when you refresh or close the page</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Don't Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We are committed to not collecting any personal information or data about your PDF files:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>We don't collect or store your PDF files</li>
                  <li>We don't track file names, sizes, or content</li>
                  <li>We don't use analytics or tracking cookies</li>
                  <li>We don't require user accounts or personal information</li>
                  <li>We don't log IP addresses or usage patterns</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Security Measures</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement several security measures to protect your experience:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>HTTPS encryption for all connections</li>
                  <li>Client-side processing eliminates server-side vulnerabilities</li>
                  <li>No persistent storage of user data</li>
                  <li>Regular security updates to our codebase</li>
                  <li>Open-source libraries with transparent security practices</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our tool uses minimal third-party services:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>pdf-lib: Open-source PDF processing library (runs locally)</li>
                  <li>CDN services for hosting static assets</li>
                  <li>No advertising or tracking services</li>
                  <li>No social media integrations or widgets</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact & Updates</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This privacy policy may be updated occasionally to reflect changes in our practices or legal requirements. 
                  We will post any updates on this page.
                </p>
                <p>
                  If you have any questions about our privacy practices, please feel free to contact us.
                </p>
                <p className="text-sm">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <Button asChild className="btn-gradient">
              <Link to="/">
                Start Merging PDFs Securely
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;