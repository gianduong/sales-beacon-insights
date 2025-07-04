
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Lock, Settings } from 'lucide-react';
import AnalyticsOnboardingModal from './AnalyticsOnboardingModal';
import { useOnboarding } from '@/hooks/useOnboarding';

interface AnalyticsGateProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AnalyticsGate: React.FC<AnalyticsGateProps> = ({ 
  children, 
  title = "Analytics Dashboard",
  description = "Complete the setup to access advanced analytics features"
}) => {
  const { isOnboardingCompleted, completeOnboarding, resetOnboarding } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (isOnboardingCompleted) {
    return (
      <div className="space-y-4">
        {/* Debug Reset Button - Remove in production */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={resetOnboarding}
            className="text-xs"
          >
            <Settings className="h-3 w-3 mr-1" />
            Reset Setup
          </Button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 className="h-4 w-4" />
                <span>Advanced analytics and insights</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 className="h-4 w-4" />
                <span>Real-time performance tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 className="h-4 w-4" />
                <span>Attribution modeling</span>
              </div>
            </div>

            <Button 
              onClick={() => setShowOnboarding(true)}
              className="w-full"
              size="lg"
            >
              Start Setup
            </Button>
          </CardContent>
        </Card>
      </div>

      <AnalyticsOnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={completeOnboarding}
      />
    </>
  );
};

export default AnalyticsGate;
