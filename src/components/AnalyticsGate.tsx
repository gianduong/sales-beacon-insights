
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const [showModal, setShowModal] = useState(!isOnboardingCompleted);

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
      {/* Show the actual content in the background */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Modal overlay */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Hoàn thành Onboarding
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            <p className="text-gray-600">
              Bạn phải hoàn thành onboarding để sử dụng tính năng này
            </p>

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
              onClick={() => {
                setShowModal(false);
                setShowOnboarding(true);
              }}
              className="w-full"
              size="lg"
            >
              Bắt đầu Onboarding
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AnalyticsOnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={() => {
          completeOnboarding();
          setShowModal(false);
        }}
      />
    </>
  );
};

export default AnalyticsGate;
