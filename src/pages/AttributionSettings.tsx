
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { Save, Info, Target, TrendingUp, Zap, CheckCircle, ArrowRight, Sparkles, ChevronDown, DollarSign, Users, AlertTriangle, TrendingDown } from 'lucide-react';

type AttributionModel = 'last-click' | 'first-click' | 'custom';

const AttributionSettings = () => {
  const [selectedAttribution, setSelectedAttribution] = useState<AttributionModel>('last-click');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'last-click': true,
    'first-click': false,
    'custom': false
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const attributionOptions = [
    {
      id: 'last-click' as const,
      title: 'Last Click Attribution',
      subtitle: 'Google Ads Standard',
      icon: Target,
      description: 'Credits the final touchpoint before conversion. Only fires conversion events when the most recent gclid parameter is still valid and trackable.',
      benefits: [
        'Industry standard for Google Ads campaigns',
        'Simple implementation and maintenance',
        'Direct correlation with immediate conversion drivers',
        'Optimal for short sales cycles'
      ],
      useCase: 'Perfect for businesses with quick decision cycles where the last interaction typically drives the purchase.',
      gradient: 'from-blue-500 to-purple-600',
      isDefault: true
    },
    {
      id: 'first-click' as const,
      title: 'First Click Attribution',
      subtitle: 'Brand Awareness Focus',
      icon: Sparkles,
      description: 'Credits the initial touchpoint that introduced the customer. Stores the first gclid per user and attributes all conversions to that original interaction.',
      benefits: [
        'Rewards top-of-funnel marketing efforts',
        'Better understanding of customer journey origins',
        'Optimal for brand awareness campaigns',
        'Long-term customer acquisition insights'
      ],
      useCase: 'Ideal for businesses with long sales cycles where initial brand exposure significantly influences final purchase decisions.',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'custom' as const,
      title: 'Custom Attribution',
      subtitle: 'AI-Powered Intelligence',
      icon: Zap,
      description: 'Advanced attribution logic that adapts to your business needs. Define custom rules, channel priorities, and sophisticated conversion paths.',
      benefits: [
        'Tailored to your specific business model',
        'Multi-channel attribution intelligence',
        'Advanced exclusion rules (Facebook, TikTok, etc.)',
        'Future-proof scalability'
      ],
      useCase: 'Best for sophisticated marketers running complex multi-channel campaigns who need granular control over attribution logic.',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const comparisonData = {
    'last-click': {
      revenue: { value: 85, trend: 'up', label: 'Nhiều conversion credit' },
      audience: { value: 65, trend: 'down', label: 'Ít lookalike audiences' },
      scenarios: [
        'User click Google Ads → click Facebook → mua hàng = KHÔNG tính conversion',
        'User click Facebook → click Google Ads → mua hàng = Tính conversion',
        'Chỉ credit cho touchpoint cuối cùng từ Google Ads'
      ]
    },
    'first-click': {
      revenue: { value: 45, trend: 'down', label: 'Ít conversion credit' },
      audience: { value: 90, trend: 'up', label: 'Nhiều top-funnel data' },
      scenarios: [
        'User click Google Ads → click Facebook → mua hàng = Tính conversion',
        'Credit cho lần click đầu tiên từ Google Ads',
        'Tốt cho brand awareness và customer journey dài'
      ]
    },
    'custom': {
      revenue: { value: 75, trend: 'up', label: 'Balanced attribution' },
      audience: { value: 85, trend: 'up', label: 'Smart audience building' },
      scenarios: [
        'Phân chia credit theo rules tùy chỉnh',
        'Có thể loại trừ Facebook/TikTok traffic',
        'Sử dụng Enhanced Conversions và Server-to-Server'
      ]
    }
  };

  const handleSave = () => {
    console.log('Selected attribution model:', selectedAttribution);
    toast.success('Attribution settings saved successfully!');
  };

  const selectedOption = attributionOptions.find(opt => opt.id === selectedAttribution);
  const selectedComparison = comparisonData[selectedAttribution];

  return (
    <Layout title="Attribution Intelligence" subtitle="Configure your advanced click tracking attribution model">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Smart Attribution Models</h2>
                <p className="text-purple-200">Choose how you want to track and attribute your conversions</p>
              </div>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl">
              Advanced attribution intelligence that adapts to your business model. Track customer journeys with precision and optimize your marketing spend with confidence.
            </p>
          </div>
        </div>

        {/* Attribution Comparison */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              Revenue & Audience Impact Comparison
            </CardTitle>
            <CardDescription className="text-lg">
              See how different attribution models affect your revenue tracking and audience building
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {attributionOptions.map((option) => {
                const comparison = comparisonData[option.id];
                const isSelected = selectedAttribution === option.id;
                
                return (
                  <div 
                    key={option.id} 
                    className={`
                      p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                      ${isSelected 
                        ? `border-transparent bg-gradient-to-r ${option.gradient} p-[2px]`
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => setSelectedAttribution(option.id)}
                  >
                    <div className={`
                      rounded-2xl p-6 h-full transition-all duration-300
                      ${isSelected ? 'bg-white' : 'bg-white hover:bg-gray-50'}
                    `}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`
                          p-2 rounded-lg transition-all duration-300
                          ${isSelected 
                            ? `bg-gradient-to-r ${option.gradient} text-white`
                            : 'bg-gray-100 text-gray-600'
                          }
                        `}>
                          <option.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{option.title}</h3>
                          <p className="text-sm text-gray-600">{option.subtitle}</p>
                        </div>
                      </div>

                      {/* Revenue Impact */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">Revenue Tracking</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-900">{comparison.revenue.value}%</span>
                            {comparison.revenue.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">{comparison.revenue.label}</p>

                        {/* Audience Impact */}
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Audience Building</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-blue-900">{comparison.audience.value}%</span>
                            {comparison.audience.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">{comparison.audience.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Scenario Explanation */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-900 text-lg">
                    {selectedOption?.title} - Chi tiết hoạt động
                  </h4>
                  <p className="text-amber-700 text-sm">
                    Cách model này xử lý customer journey phức tạp
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {selectedComparison.scenarios.map((scenario, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-amber-800 text-sm">{scenario}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attribution Selection */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-8">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              Attribution Model Selection
            </CardTitle>
            <CardDescription className="text-lg">
              Select the attribution model that best fits your business strategy and customer journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={selectedAttribution} 
              onValueChange={(value) => setSelectedAttribution(value as AttributionModel)}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {attributionOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = selectedAttribution === option.id;
                const isOpen = openSections[option.id];
                
                return (
                  <div key={option.id} className="relative">
                    <Collapsible open={isOpen} onOpenChange={() => toggleSection(option.id)}>
                      <div className={`
                        relative overflow-hidden rounded-2xl border-2 transition-all duration-300 h-full
                        ${isSelected 
                          ? `border-transparent bg-gradient-to-r ${option.gradient} p-[2px]`
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}>
                        <div className={`
                          rounded-2xl transition-all duration-300 h-full flex flex-col
                          ${isSelected ? 'bg-white' : 'bg-white hover:bg-gray-50'}
                        `}>
                          <CollapsibleTrigger className="w-full p-4 text-left flex-1">
                            <div className="flex flex-col space-y-4 h-full">
                              <div className="flex items-start justify-between">
                                <RadioGroupItem 
                                  value={option.id} 
                                  id={option.id} 
                                  className="data-[state=checked]:border-current"
                                  style={isSelected ? { color: option.gradient.includes('blue') ? '#3b82f6' : option.gradient.includes('emerald') ? '#059669' : '#ea580c' } : {}}
                                />
                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className={`
                                    p-2 rounded-lg transition-all duration-300
                                    ${isSelected 
                                      ? `bg-gradient-to-r ${option.gradient} text-white`
                                      : 'bg-gray-100 text-gray-600'
                                    }
                                  `}>
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <Label htmlFor={option.id} className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                                      {option.title}
                                      {option.isDefault && (
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                          Recommended
                                        </span>
                                      )}
                                    </Label>
                                    <p className="text-xs font-medium text-gray-600">
                                      {option.subtitle}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                          </CollapsibleTrigger>

                          <CollapsibleContent className="px-4 pb-4">
                            <div className="space-y-4">
                              {/* Benefits Grid */}
                              <div className="grid grid-cols-1 gap-2">
                                {option.benefits.map((benefit, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className={`
                                      h-3 w-3 flex-shrink-0
                                      ${isSelected ? 'text-green-600' : 'text-gray-400'}
                                    `} />
                                    <span className="text-xs text-gray-600">{benefit}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Use Case */}
                              <div className={`
                                p-3 rounded-xl border transition-all duration-300
                                ${isSelected 
                                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' 
                                  : 'bg-gray-50 border-gray-200'
                                }
                              `}>
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                                  <ArrowRight className="h-3 w-3" />
                                  Best Use Case
                                </h4>
                                <p className="text-xs text-gray-700">
                                  {option.useCase}
                                </p>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </div>
                    </Collapsible>
                  </div>
                );
              })}
            </RadioGroup>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    Ready to optimize your attribution?
                  </p>
                  <p className="text-sm text-gray-500">
                    Changes will apply to all future conversion tracking
                  </p>
                </div>
                <Button 
                  onClick={handleSave} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Attribution Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Preview */}
        {selectedOption && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedOption.gradient} text-white`}>
                  <selectedOption.icon className="h-5 w-5" />
                </div>
                Implementation Preview: {selectedOption.title}
              </CardTitle>
              <CardDescription>
                Technical overview and next steps for your selected attribution model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className={`p-6 rounded-xl bg-gradient-to-r ${selectedOption.gradient} text-white`}>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Key Implementation Points
                  </h4>
                  <div className="space-y-2 text-sm opacity-90">
                    {selectedAttribution === 'last-click' && (
                      <>
                        <p>• Standard Google Ads conversion tracking implementation</p>
                        <p>• Automatic gclid parameter capture and validation</p>
                        <p>• Real-time conversion event firing with attribution window</p>
                        <p>• Seamless integration with existing Google Ads campaigns</p>
                      </>
                    )}
                    {selectedAttribution === 'first-click' && (
                      <>
                        <p>• First-party cookie or database storage for initial gclid tracking</p>
                        <p>• User session management with persistent attribution data</p>
                        <p>• Conversion events tied to original traffic source identification</p>
                        <p>• Enhanced customer journey analysis and reporting</p>
                      </>
                    )}
                    {selectedAttribution === 'custom' && (
                      <>
                        <p>• Advanced rule engine for multi-channel attribution logic</p>
                        <p>• Configurable source prioritization (Google Ads, Facebook, TikTok, etc.)</p>
                        <p>• Custom conversion firing based on sophisticated business rules</p>
                        <p>• Machine learning integration for adaptive attribution models</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <h5 className="font-semibold text-green-900 mb-2">Setup Complexity</h5>
                    <div className="flex items-center gap-2">
                      {selectedAttribution === 'last-click' && (
                        <>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          </div>
                          <span className="text-sm text-green-700">Simple</span>
                        </>
                      )}
                      {selectedAttribution === 'first-click' && (
                        <>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          </div>
                          <span className="text-sm text-yellow-700">Moderate</span>
                        </>
                      )}
                      {selectedAttribution === 'custom' && (
                        <>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          </div>
                          <span className="text-sm text-red-700">Advanced</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2">Data Accuracy</h5>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className={selectedAttribution === 'custom' ? 'w-3 h-3 bg-blue-500 rounded-full' : 'w-3 h-3 bg-gray-300 rounded-full'}></div>
                      </div>
                      <span className="text-sm text-blue-700">
                        {selectedAttribution === 'custom' ? 'Highest' : 'High'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <h5 className="font-semibold text-purple-900 mb-2">Maintenance</h5>
                    <div className="flex items-center gap-2">
                      {selectedAttribution === 'last-click' && (
                        <>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          </div>
                          <span className="text-sm text-green-700">Minimal</span>
                        </>
                      )}
                      {selectedAttribution === 'first-click' && (
                        <>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          </div>
                          <span className="text-sm text-yellow-700">Regular</span>
                        </>
                      )}
                      {selectedAttribution === 'custom' && (
                        <>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          </div>
                          <span className="text-sm text-purple-700">Ongoing</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AttributionSettings;
