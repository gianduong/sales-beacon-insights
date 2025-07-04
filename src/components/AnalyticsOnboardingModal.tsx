
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, BarChart3, TrendingUp, Users, ShoppingBag, ArrowRight, X } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  action?: string;
}

interface AnalyticsOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const AnalyticsOnboardingModal: React.FC<AnalyticsOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'connect-store',
      title: 'Connect Your Store',
      description: 'Link your e-commerce platform to start collecting data',
      icon: <ShoppingBag className="h-6 w-6" />,
      completed: false,
      action: 'Connect Store'
    },
    {
      id: 'setup-tracking',
      title: 'Setup Tracking Codes',
      description: 'Install tracking pixels for accurate attribution',
      icon: <BarChart3 className="h-6 w-6" />,
      completed: false,
      action: 'Install Tracking'
    },
    {
      id: 'configure-goals',
      title: 'Configure Goals',
      description: 'Define conversion events and key metrics',
      icon: <TrendingUp className="h-6 w-6" />,
      completed: false,
      action: 'Set Goals'
    },
    {
      id: 'verify-data',
      title: 'Verify Data Flow',
      description: 'Ensure data is being collected properly',
      icon: <Users className="h-6 w-6" />,
      completed: false,
      action: 'Verify Setup'
    }
  ]);

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;
  const isAllCompleted = completedSteps === steps.length;

  const handleStepAction = (stepIndex: number) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].completed = true;
    setSteps(updatedSteps);
    
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleCompleteOnboarding = () => {
    onComplete();
    onClose();
  };

  const getCurrentStepContent = () => {
    const step = steps[currentStep];
    
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            {step.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
          <p className="text-gray-600 max-w-md mx-auto">{step.description}</p>
        </div>

        <div className="space-y-4">
          {step.id === 'connect-store' && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h4 className="font-medium text-gray-900">Choose Your Platform</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Shopify', 'WooCommerce', 'Magento', 'Custom API'].map((platform) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className="h-12 justify-start"
                      onClick={() => handleStepAction(currentStep)}
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {step.id === 'setup-tracking' && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h4 className="font-medium text-gray-900">Install Tracking Pixels</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Google Analytics', status: 'required' },
                    { name: 'Facebook Pixel', status: 'recommended' },
                    { name: 'Google Ads', status: 'recommended' },
                    { name: 'TikTok Pixel', status: 'optional' }
                  ].map((tracker) => (
                    <div key={tracker.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{tracker.name}</span>
                      <Badge variant={tracker.status === 'required' ? 'destructive' : tracker.status === 'recommended' ? 'default' : 'secondary'}>
                        {tracker.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => handleStepAction(currentStep)}
                  className="w-full"
                >
                  Install All Trackers
                </Button>
              </CardContent>
            </Card>
          )}

          {step.id === 'configure-goals' && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h4 className="font-medium text-gray-900">Set Your Conversion Goals</h4>
                <div className="space-y-3">
                  {[
                    'Purchase Completed',
                    'Add to Cart',
                    'Newsletter Signup',
                    'Page Views',
                    'Time on Site'
                  ].map((goal, index) => (
                    <div key={goal} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Circle className="h-4 w-4 text-gray-400" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => handleStepAction(currentStep)}
                  className="w-full"
                >
                  Configure Goals
                </Button>
              </CardContent>
            </Card>
          )}

          {step.id === 'verify-data' && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h4 className="font-medium text-gray-900">Data Verification</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Store Connected</span>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Tracking Active</span>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Circle className="h-5 w-5" />
                      <span className="font-medium">Collecting Data...</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleStepAction(currentStep)}
                  className="w-full"
                >
                  Verify & Continue
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to Analytics
              </h2>
              <p className="text-gray-600 font-normal">
                Complete the setup to unlock powerful insights
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Setup Progress</span>
              <span className="font-medium text-blue-600">
                {completedSteps}/{steps.length} completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Overview */}
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                  step.completed
                    ? 'bg-green-50 border-green-200'
                    : index === currentStep
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => !step.completed && setCurrentStep(index)}
              >
                <div className="flex justify-center mb-2">
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700">{step.title}</p>
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          {!isAllCompleted ? (
            getCurrentStepContent()
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Setup Complete!
                </h3>
                <p className="text-gray-600">
                  Your analytics dashboard is ready to use
                </p>
              </div>
              <Button 
                onClick={handleCompleteOnboarding}
                className="px-8"
              >
                Start Using Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Navigation */}
          {!isAllCompleted && (
            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
              >
                Skip Step
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsOnboardingModal;
