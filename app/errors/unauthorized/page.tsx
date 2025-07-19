'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX, Home, ArrowLeft, Mail, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UnauthorizedPage = ({ 
  title = "403 - Access Denied",
  message = "You don't have permission to access this resource",
  showContactSupport = true,
  showRefresh = true,
  onContactSupport = () => window.location.href = 'mailto:harmanpreetsingh@programmer.net'
}) => {
  const navigate = useRouter();

  const handleGoBack = () => {
    navigate.back();
  };

  const handleGoHome = () => {
    navigate.push('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-6 pb-4">
            <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center ring-8 ring-red-100">
              <ShieldX className="w-10 h-10 text-red-500" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                {title}
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                {message}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Alert className="border-amber-200 bg-amber-50">
              <ShieldX className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                This usually happens when you don't have the required permissions or your session has expired.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={handleGoBack} 
                variant="outline" 
                className="flex items-center justify-center gap-2 h-11"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button 
                onClick={handleGoHome} 
                className="flex items-center justify-center gap-2 h-11"
              >
                <Home className="w-4 h-4" />
                Home Page
              </Button>
            </div>
            
            {(showRefresh || showContactSupport) && (
              <div className="pt-2 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {showRefresh && (
                    <Button 
                      onClick={handleRefresh}
                      variant="ghost" 
                      className="flex items-center justify-center gap-2 h-10"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh Page
                    </Button>
                  )}
                  {showContactSupport && (
                    <Button 
                      onClick={onContactSupport}
                      variant="ghost" 
                      className="flex items-center justify-center gap-2 h-10"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Support
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnauthorizedPage;