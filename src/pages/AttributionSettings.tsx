import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

type AttributionModel = 'last-click' | 'first-click' | 'custom';

const AttributionSettings = () => {
  const [selectedAttribution, setSelectedAttribution] = useState<AttributionModel>('last-click');
  const [tempSelection, setTempSelection] = useState<AttributionModel>('last-click');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const attributionOptions = [
    {
      id: 'last-click' as const,
      title: 'Last Click Attribution',
      description: 'Only fires conversion events if the most recent gclid exists',
      borderColor: '#B8B5F5',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
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
      borderColor: '#9DDEAD',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
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
      borderColor: '#F2CC8F',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
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

  const renderRevenueChart = (chart: any) => {
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
          <span>100%</span>
        </div>
        <div className="space-y-2">
          {channels.map((channel) => (
            <div key={channel.name} className="flex items-center gap-3">
              <span className="text-xs w-16 text-gray-600">{channel.name}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div
                  className={`${channel.color} h-6 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${channel.value}%` }}
                />
                {channel.value > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {channel.value}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
            
            return (
              <Card 
                key={option.id} 
                className={`
                  transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg
                  ${isSelected 
                    ? 'border-2 shadow-lg' 
                    : 'border-2 hover:border-gray-400'
                  }
                `}
                style={{ 
                  borderColor: isSelected ? option.borderColor : '#e5e7eb',
                  boxShadow: isSelected ? `0 10px 25px -5px ${option.borderColor}30` : undefined
                }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center gap-2 mt-1">
                        <RadioGroupItem 
                          value={option.id} 
                          id={option.id}
                          className="data-[state=checked]:border-2"
                          style={{ 
                            borderColor: isSelected ? option.borderColor : undefined,
                            color: isSelected ? option.borderColor : undefined
                          }}
                        />
                        <div className={`w-2 h-2 rounded-full ${option.iconBg} transition-all duration-300`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor={option.id} className="font-semibold text-gray-900 cursor-pointer text-sm">
                            {option.title}
                          </Label>
                          {isSelected && (
                            <Badge 
                              className="text-xs font-medium transition-all duration-300"
                              style={{ 
                                backgroundColor: `${option.borderColor}20`,
                                color: option.borderColor,
                                border: `1px solid ${option.borderColor}`
                              }}
                            >
                              Applied
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </RadioGroup>

        {/* Show More Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => setShowDetails(!showDetails)}
            className="transition-all duration-300 hover:scale-105 border-2 border-gray-300 hover:border-blue-400"
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show more
              </>
            )}
          </Button>
        </div>

        {/* Detailed Cards */}
        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {attributionOptions.map((option) => (
              <Card 
                key={`${option.id}-details`}
                className="transition-all duration-500 ease-out animate-scale-in"
                style={{ 
                  borderColor: option.borderColor,
                  borderWidth: '2px'
                }}
              >
                <CardContent className="pt-6 space-y-6">
                  {/* Revenue Impact Chart */}
                  <div className="animate-fade-in">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${option.iconBg}`} />
                      Revenue Impact
                    </h4>
                    {renderRevenueChart(option.revenueChart)}
                    <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                      {option.id === 'last-click' && 'Highest revenue attribution to Google Ads when it\'s the last touchpoint before conversion.'}
                      {option.id === 'first-click' && 'Attributes revenue to the channel that first introduced the customer to your brand.'}
                      {option.id === 'custom' && 'Customizable attribution based on your business priorities and marketing strategy.'}
                    </p>
                  </div>

                  {/* Audience Size */}
                  <div className="animate-fade-in">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${option.iconBg}`} />
                      Audience Size
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
                      <div 
                        className="h-4 rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: `${option.audienceSize}%`,
                          backgroundColor: option.borderColor
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium" style={{ color: option.borderColor }}>
                        {option.audienceSize}%
                      </span>
                      <span className="text-xs text-gray-500">Potential reach</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {option.audienceDescription}
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <div className="animate-fade-in">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${option.iconBg}`} />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {option.benefits.map((benefit, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: option.borderColor }} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Custom Configuration */}
                  {option.id === 'custom' && option.configuration && (
                    <div className="animate-fade-in">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${option.iconBg}`} />
                        Attribution Configuration
                      </h4>
                      <div className="space-y-3 rounded-lg p-4" style={{ backgroundColor: `${option.borderColor}10` }}>
                        <div>
                          <span className="text-xs font-medium text-gray-700">Attribution Model Type</span>
                          <p className="text-xs text-gray-600 mt-1">{option.configuration.modelType}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-700">Channel Priority</span>
                          <div className="space-y-1 mt-2">
                            {Object.entries(option.configuration.channelPriorities).map(([channel, priority]) => (
                              <div key={channel} className="flex justify-between items-center text-xs">
                                <span className="text-gray-600 capitalize">{channel}</span>
                                <span className="font-medium px-2 py-1 rounded" style={{ 
                                  backgroundColor: `${option.borderColor}20`,
                                  color: option.borderColor
                                }}>
                                  {priority}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-700">Time Window</span>
                          <p className="text-xs text-gray-600 mt-1">{option.configuration.timeWindow}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Important Note/Implementation Tip */}
                  {(option.importantNote || option.implementationTip) && (
                    <div className="animate-fade-in">
                      <div className="rounded-lg p-4" style={{ backgroundColor: `${option.borderColor}15`, border: `1px solid ${option.borderColor}30` }}>
                        <div className="flex items-start gap-3">
                          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: option.borderColor }} />
                          <div>
                            <h5 className="text-xs font-medium mb-2" style={{ color: option.borderColor }}>
                              {option.importantNote ? 'Important Note' : 'Implementation Tip'}
                            </h5>
                            <p className="text-xs text-gray-700 leading-relaxed">
                              {option.importantNote || option.implementationTip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Combined Understanding Attribution Models */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 via-green-500 to-orange-500 rounded-full" />
              Understanding Attribution Models
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              Attribution models determine how credit for conversions is assigned to touchpoints in the customer journey. 
              Choosing the right model impacts how you measure campaign performance and allocate your marketing budget.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 p-4 rounded-lg bg-blue-50 border border-blue-200 transition-all duration-300 hover:shadow-md">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Last Click
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  100% of the conversion value is attributed to the last Google Ads click before the conversion.
                </p>
              </div>
              
              <div className="space-y-3 p-4 rounded-lg bg-green-50 border border-green-200 transition-all duration-300 hover:shadow-md">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  First Click
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  100% of the conversion value is attributed to the first Google Ads click in the customer journey.
                </p>
              </div>
              
              <div className="space-y-3 p-4 rounded-lg bg-orange-50 border border-orange-200 transition-all duration-300 hover:shadow-md">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  Custom
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Attribution is based on your defined rules, allowing for flexible credit assignment across channels.
                </p>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm">
              You can change your attribution model settings at any time.
            </p>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Change Attribution Model?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 leading-relaxed">
                Are you sure you want to change your attribution model? This will affect how future conversions are tracked and attributed to your campaigns.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelChange} className="transition-all duration-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmChange} className="transition-all duration-200">
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
