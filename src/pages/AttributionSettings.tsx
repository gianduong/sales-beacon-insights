
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, Info } from 'lucide-react';

type AttributionModel = 'last-click' | 'first-click' | 'custom';

const AttributionSettings = () => {
  const [selectedAttribution, setSelectedAttribution] = useState<AttributionModel>('last-click');

  const attributionOptions = [
    {
      id: 'last-click' as const,
      title: 'Last Click Attribution',
      subtitle: 'Default Google Ads',
      description: 'Only fires conversion event if the most recent gclid still exists. This is the standard Google Ads attribution model.',
      isDefault: true
    },
    {
      id: 'first-click' as const,
      title: 'First Click Attribution',
      subtitle: 'First Touch Model',
      description: 'Stores the first gclid per user (in cookie or database) and only sends conversions with that initial gclid.',
      isDefault: false
    },
    {
      id: 'custom' as const,
      title: 'Custom Attribution',
      subtitle: 'Custom Logic',
      description: 'Define your own attribution logic. For example: "Prioritize Google Ads unless traffic comes from Facebook, TikTok, or other specified sources."',
      isDefault: false
    }
  ];

  const handleSave = () => {
    // Here you would typically save the selection to your backend or state management
    console.log('Selected attribution model:', selectedAttribution);
    toast.success('Attribution settings saved successfully!');
  };

  return (
    <Layout title="Attribution Settings" subtitle="Configure your click tracking attribution model">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Click Tracking Attribution
            </CardTitle>
            <CardDescription>
              Choose how you want to attribute conversions to your advertising clicks. 
              This setting determines which click gets credit when a customer converts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={selectedAttribution} 
              onValueChange={(value) => setSelectedAttribution(value as AttributionModel)}
              className="space-y-6"
            >
              {attributionOptions.map((option) => (
                <div key={option.id} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={option.id} className="text-base font-medium cursor-pointer">
                          {option.title}
                        </Label>
                        {option.isDefault && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        {option.subtitle}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  
                  {option.id === selectedAttribution && (
                    <div className="ml-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Configuration Details:</h4>
                      {option.id === 'last-click' && (
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Tracks the most recent gclid parameter</li>
                          <li>• Fires conversion only if gclid is still valid</li>
                          <li>• Standard Google Ads attribution window applies</li>
                        </ul>
                      )}
                      {option.id === 'first-click' && (
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Stores first gclid in browser cookie or database</li>
                          <li>• All subsequent conversions attributed to first click</li>
                          <li>• Useful for long customer journey analysis</li>
                        </ul>
                      )}
                      {option.id === 'custom' && (
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Define custom attribution rules and priorities</li>
                          <li>• Set source exclusions (Facebook, TikTok, etc.)</li>
                          <li>• Advanced configuration options available</li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>

            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Changes will apply to all future conversion tracking
                </div>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Attribution Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Guide</CardTitle>
            <CardDescription>
              Technical details for implementing your selected attribution model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Current Selection: {attributionOptions.find(opt => opt.id === selectedAttribution)?.title}</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  {selectedAttribution === 'last-click' && (
                    <>
                      <p>• Use standard Google Ads conversion tracking code</p>
                      <p>• Ensure gclid parameter is captured and stored</p>
                      <p>• Fire conversion events only when gclid is present and valid</p>
                    </>
                  )}
                  {selectedAttribution === 'first-click' && (
                    <>
                      <p>• Implement first-party cookie or database storage for initial gclid</p>
                      <p>• Track user sessions and store first gclid on initial visit</p>
                      <p>• Use stored first gclid for all conversion events for that user</p>
                    </>
                  )}
                  {selectedAttribution === 'custom' && (
                    <>
                      <p>• Define custom logic based on traffic source and campaign parameters</p>
                      <p>• Implement source priority rules (Google Ads vs. Facebook, TikTok, etc.)</p>
                      <p>• Create conditional conversion firing based on your business rules</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AttributionSettings;
