import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, FileQuestion, ArrowLeft } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-8 max-w-md mx-auto">
            {/* 404 Icon */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-primary/10 animate-bounce-in">
                  <FileQuestion className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  404
                </h1>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Page Not Found
                </h2>
                <p className="text-lg text-muted-foreground">
                  Oops! The page you're looking for doesn't exist.
                </p>
              </div>
            </div>

            {/* Error Details */}
            <div className="bg-card border border-border rounded-xl p-6 animate-slide-up">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">What happened?</h3>
                <p className="text-sm text-muted-foreground">
                  The URL <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                    {location.pathname}
                  </code> could not be found on our server.
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>This might have happened because:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>The page was moved or deleted</li>
                    <li>You typed the URL incorrectly</li>
                    <li>You followed a broken link</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Options */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="btn-gradient">
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go to PDF Merger
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="hover:bg-muted"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Or visit our other pages:</p>
                <div className="flex justify-center gap-4 mt-2">
                  <Link 
                    to="/privacy" 
                    className="text-primary hover:text-primary-glow transition-colors underline"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    to="/terms" 
                    className="text-primary hover:text-primary-glow transition-colors underline"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p>
                💡 <strong>Fun fact:</strong> Even though this page doesn't exist, 
                our PDF merger tool still works 100% locally in your browser – 
                no server required!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;