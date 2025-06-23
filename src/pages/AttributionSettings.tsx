
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

type AttributionModel = 'last-click' | 'first-click' | 'custom';

const AttributionSettings = () => {
  const [selectedAttribution, setSelectedAttribution] = useState<AttributionModel>('last-click');
  const [tempSelection, setTempSelection] = useState<AttributionModel>('last-click');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const attributionOptions = [
    {
      id: 'last-click' as const,
      title: 'Last Click Attribution',
      description: 'Only fires conversion events if the most recent gclid exists',
      badge: 'Applied',
      badgeColor: 'bg-blue-100 text-blue-800',
      borderColor: 'border-blue-300',
      isSelected: true,
      revenueChart: {
        googleAds: 85,
        facebook: 0,
        tiktok: 0,
        other: 15
      },
      audienceSize: 85,
      audienceDescription: 'Maximizes audience size for Google Ads remarketing.',
      benefits: [
        'Google\'s recommended attribution model',
        'Recognizes the final touchpoint that led to conversion',
        'Simplifies attribution for multi-channel marketing',
        'Works with Enhanced Conversions and Offline Conversion Tracking'
      ],
      importantNote: 'If a user clicks on Google Ads, then Facebook, and then makes a purchase, Google Ads will NOT receive credit unless you use advanced techniques like Enhanced Conversions.'
    },
    {
      id: 'first-click' as const,
      title: 'First Click Attribution',
      description: 'Stores the first gclid per user and only sends conversions with that ID',
      badge: null,
      badgeColor: '',
      borderColor: 'border-gray-300',
      isSelected: false,
      revenueChart: {
        googleAds: 55,
        facebook: 25,
        tiktok: 10,
        other: 10
      },
      audienceSize: 65,
      audienceDescription: 'Moderate audience size focused on initial touchpoints.',
      benefits: [
        'Recognizes the channel that initiated the customer journey',
        'Better for measuring brand awareness campaigns',
        'Rewards channels that bring in new customers',
        'Stored in cookies or database for consistent tracking'
      ],
      implementationTip: 'First click attribution requires persistent storage of the initial gclid, either in cookies or your database, to ensure proper tracking across multiple sessions.'
    },
    {
      id: 'custom' as const,
      title: 'Custom Attribution',
      description: 'Define your own logic like "prioritize Google Ads if not from Facebook, TikTok..."',
      badge: null,
      badgeColor: '',
      borderColor: 'border-gray-300',
      isSelected: false,
      revenueChart: {
        googleAds: 65,
        facebook: 15,
        tiktok: 10,
        other: 10
      },
      audienceSize: 75,
      audienceDescription: 'Customizable attribution based on your business priorities and marketing strategy.',
      benefits: [
        'Flexible attribution rules based on business needs',
        'Can exclude specific channels from attribution',
        'Supports complex multi-touch attribution models',
        'Integrates with advanced tracking methods'
      ],
      configuration: {
        modelType: 'Position Based',
        channelPriorities: {
          googleAds: 70,
          facebook: 15,
          tiktok: 10,
          others: 5
        },
        timeWindow: '30 Days'
      }
    }
  ];

  const handleModelChange = (value: AttributionModel) => {
    if (value !== selectedAttribution) {
      setTempSelection(value);
      setShowConfirmDialog(true);
    }
  };

  const confirmChange = () => {
    setSelectedAttribution(tempSelection);
    setShowConfirmDialog(false);
    toast.success('Attribution model updated successfully!');
  };

  const cancelChange = () => {
    setShowConfirmDialog(false);
    setTempSelection(selectedAttribution);
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const getMaxChartValue = (chart: any) => {
    return Math.max(chart.googleAds, chart.facebook, chart.tiktok, chart.other);
  };

  const renderRevenueChart = (chart: any) => {
    const maxValue = getMaxChartValue(chart);
    const channels = [
      { name: 'Google Ads', value: chart.googleAds, color: 'bg-blue-500' },
      { name: 'Facebook', value: chart.facebook, color: 'bg-green-500' },
      { name: 'TikTok', value: chart.tiktok, color: 'bg-purple-500' },
      { name: 'Other', value: chart.other, color: 'bg-gray-400' }
    ];

    return (
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Revenue Attribution</span>
          <span>100</span>
        </div>
        <div className="space-y-2">
          {channels.map((channel) => (
            <div key={channel.name} className="flex items-center gap-3">
              <span className="text-xs w-16 text-gray-600">{channel.name}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div
                  className={`${channel.color} h-6 rounded-full transition-all duration-300`}
                  style={{ width: `${(channel.value / 100) * 100}%` }}
                />
                {channel.value > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {channel.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const selectedOption = attributionOptions.find(opt => opt.id === selectedAttribution);

  return (
    <Layout title="Attribution Settings" subtitle="Configure your attribution model">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Attribution Models Grid */}
        <RadioGroup 
          value={selectedAttribution} 
          onValueChange={handleModelChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {attributionOptions.map((option) => {
            const isSelected = selectedAttribution === option.id;
            const isExpanded = expandedCard === option.id;
            
            return (
              <Card 
                key={option.id} 
                className={`
                  transition-all duration-200 cursor-pointer
                  ${isSelected 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <Collapsible open={isExpanded} onOpenChange={() => toggleCard(option.id)}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem 
                          value={option.id} 
                          id={option.id}
                          className="data-[state=checked]:border-blue-500 data-[state=checked]:text-blue-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Label htmlFor={option.id} className="font-semibold text-gray-900 cursor-pointer">
                              {option.title}
                            </Label>
                            {isSelected && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                Applied
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </CardHeader>

                  <CollapsibleContent>
                    <CardContent className="pt-0 space-y-6">
                      {/* Revenue Impact Chart */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Revenue Impact</h4>
                        {renderRevenueChart(option.revenueChart)}
                        <p className="text-xs text-gray-600 mt-2">
                          {option.id === 'last-click' && 'Highest revenue attribution to Google Ads when it\'s the last touchpoint before conversion.'}
                          {option.id === 'first-click' && 'Attributes revenue to the channel that first introduced the customer to your brand.'}
                          {option.id === 'custom' && 'Customizable attribution based on your business priorities and marketing strategy.'}
                        </p>
                      </div>

                      {/* Audience Size */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Audience Size</h4>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div 
                            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${option.audienceSize}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          {option.audienceDescription}
                        </p>
                      </div>

                      {/* Key Benefits */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Key Benefits</h4>
                        <ul className="space-y-1">
                          {option.benefits.map((benefit, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Custom Configuration */}
                      {option.id === 'custom' && option.configuration && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Attribution Configuration</h4>
                          <div className="space-y-3 bg-gray-50 rounded-lg p-3">
                            <div>
                              <span className="text-xs font-medium text-gray-700">Attribution Model Type</span>
                              <p className="text-xs text-gray-600">{option.configuration.modelType}</p>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-700">Channel Priority</span>
                              <div className="space-y-1 mt-1">
                                {Object.entries(option.configuration.channelPriorities).map(([channel, priority]) => (
                                  <div key={channel} className="flex justify-between text-xs">
                                    <span className="text-gray-600 capitalize">{channel}</span>
                                    <span className="text-gray-900 font-medium">{priority}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-700">Time Window</span>
                              <p className="text-xs text-gray-600">{option.configuration.timeWindow}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Important Note/Implementation Tip */}
                      {(option.importantNote || option.implementationTip) && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="text-xs font-medium text-amber-900 mb-1">
                                {option.importantNote ? 'Important Note' : 'Implementation Tip'}
                              </h5>
                              <p className="text-xs text-amber-800">
                                {option.importantNote || option.implementationTip}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </RadioGroup>

        {/* Understanding Attribution Models */}
        <Card>
          <CardHeader>
            <CardTitle>Understanding Attribution Models</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Attribution models determine how credit for conversions is assigned to touchpoints in the customer journey. 
              Choosing the right model impacts how you measure campaign performance and allocate your marketing budget.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Last Click
                </h4>
                <p className="text-sm text-gray-600">
                  100% of the conversion value is attributed to the last Google Ads click before the conversion.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  First Click
                </h4>
                <p className="text-sm text-gray-600">
                  100% of the conversion value is attributed to the first Google Ads click in the customer journey.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  Custom
                </h4>
                <p className="text-sm text-gray-600">
                  Attribution is based on your defined rules, allowing for flexible credit assignment across channels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 text-sm">
          You can change your attribution model settings at any time.
        </p>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Change Attribution Model?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to change your attribution model? This will affect how future conversions are tracked and attributed to your campaigns.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelChange}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmChange}>
                Yes, Change Model
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default AttributionSettings;
