
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for Google Ads rankings
const mockAdsData = [
  {
    id: 'ad-001',
    name: 'Summer Collection Promotion',
    clicks: 2450,
    cpc: 1.25,
    currentRank: 1,
    previousRank: 3,
    impressions: 15000,
    ctr: 0.163,
    conversions: 122,
    conversionRate: 0.049,
    cost: 3062.50
  },
  {
    id: 'ad-002',
    name: 'Back to School Special',
    clicks: 1875,
    cpc: 0.95,
    currentRank: 2,
    previousRank: 2,
    impressions: 12500,
    ctr: 0.15,
    conversions: 94,
    conversionRate: 0.05,
    cost: 1781.25
  },
  {
    id: 'ad-003',
    name: 'Holiday Gift Guide',
    clicks: 3200,
    cpc: 1.45,
    currentRank: 3,
    previousRank: 1,
    impressions: 18000,
    ctr: 0.178,
    conversions: 160,
    conversionRate: 0.05,
    cost: 4640.00
  },
  {
    id: 'ad-004',
    name: 'New Arrivals Showcase',
    clicks: 1200,
    cpc: 1.10,
    currentRank: 4,
    previousRank: 5,
    impressions: 9500,
    ctr: 0.126,
    conversions: 48,
    conversionRate: 0.04,
    cost: 1320.00
  },
  {
    id: 'ad-005',
    name: 'Clearance Sale',
    clicks: 2100,
    cpc: 0.85,
    currentRank: 5,
    previousRank: 6,
    impressions: 14000,
    ctr: 0.15,
    conversions: 84,
    conversionRate: 0.04,
    cost: 1785.00
  },
  {
    id: 'ad-006',
    name: 'Premium Product Spotlight',
    clicks: 950,
    cpc: 1.75,
    currentRank: 6,
    previousRank: 4,
    impressions: 7800,
    ctr: 0.122,
    conversions: 57,
    conversionRate: 0.06,
    cost: 1662.50
  },
  {
    id: 'ad-007',
    name: 'Flash Sale Weekend',
    clicks: 1680,
    cpc: 1.15,
    currentRank: 7,
    previousRank: 8,
    impressions: 11200,
    ctr: 0.15,
    conversions: 67,
    conversionRate: 0.04,
    cost: 1932.00
  },
  {
    id: 'ad-008',
    name: 'Loyalty Program',
    clicks: 820,
    cpc: 1.05,
    currentRank: 8,
    previousRank: 7,
    impressions: 6500,
    ctr: 0.126,
    conversions: 49,
    conversionRate: 0.06,
    cost: 861.00
  },
  {
    id: 'ad-009',
    name: 'Bundle Deals Promotion',
    clicks: 1450,
    cpc: 1.30,
    currentRank: 9,
    previousRank: 10,
    impressions: 10000,
    ctr: 0.145,
    conversions: 73,
    conversionRate: 0.05,
    cost: 1885.00
  },
  {
    id: 'ad-010',
    name: 'Limited Edition Release',
    clicks: 950,
    cpc: 1.65,
    currentRank: 10,
    previousRank: 9,
    impressions: 7200,
    ctr: 0.132,
    conversions: 62,
    conversionRate: 0.065,
    cost: 1567.50
  }
];

// Time period options
const timePeriods = [
  { value: 'day', label: 'Last 24 hours' },
  { value: 'week', label: 'Last 7 days' },
  { value: 'month', label: 'Last 30 days' },
  { value: 'quarter', label: 'Last 90 days' }
];

const AdsRanking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Get rank change status
  const getRankChangeStatus = (current: number, previous: number) => {
    if (current < previous) return 'improved'; // Lower number is better for ranking
    if (current > previous) return 'declined';
    return 'unchanged';
  };
  
  // Function to render rank change indicator
  const renderRankChange = (current: number, previous: number) => {
    const status = getRankChangeStatus(current, previous);
    const diff = Math.abs(current - previous);
    
    if (status === 'improved') {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+{diff}</span>
        </div>
      );
    } else if (status === 'declined') {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>-{diff}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-500">
          <Minus className="h-4 w-4 mr-1" />
          <span>0</span>
        </div>
      );
    }
  };
  
  return (
    <Layout 
      title="Google Ads Ranking" 
      subtitle="Track your ads performance and ranking changes over time"
    >
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Ads Ranking Analysis</h2>
          <p className="text-sm text-gray-500">
            Monitor rank changes and identify trends in your Google Ads performance
          </p>
        </div>
        
        <div className="flex bg-gray-100 rounded-md p-1">
          {timePeriods.map((period) => (
            <button
              key={period.value}
              className={`px-3 py-1 text-sm rounded-md ${selectedPeriod === period.value ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Improved Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockAdsData.filter(ad => getRankChangeStatus(ad.currentRank, ad.previousRank) === 'improved').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">ads increased in ranking</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Declined Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockAdsData.filter(ad => getRankChangeStatus(ad.currentRank, ad.previousRank) === 'declined').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">ads decreased in ranking</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unchanged Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {mockAdsData.filter(ad => getRankChangeStatus(ad.currentRank, ad.previousRank) === 'unchanged').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">ads maintained ranking</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
          <h3 className="font-medium">Google Ads Rankings</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Export CSV</Button>
            <Button variant="outline" size="sm">Refresh Data</Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Google Ads Rankings Analysis for {selectedPeriod === 'day' ? 'the last 24 hours' : 
              selectedPeriod === 'week' ? 'the last 7 days' : 
              selectedPeriod === 'month' ? 'the last 30 days' : 'the last 90 days'}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Ad Name</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CPC ($)</TableHead>
                <TableHead className="text-right">CTR (%)</TableHead>
                <TableHead className="text-right">Cost ($)</TableHead>
                <TableHead className="text-center">Current Rank</TableHead>
                <TableHead className="text-center">Previous Rank</TableHead>
                <TableHead className="text-center">Rank Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdsData.map((ad) => (
                <TableRow key={ad.id} className={
                  getRankChangeStatus(ad.currentRank, ad.previousRank) === 'improved' ? 'bg-green-50' :
                  getRankChangeStatus(ad.currentRank, ad.previousRank) === 'declined' ? 'bg-red-50' : ''
                }>
                  <TableCell className="font-medium">{ad.id}</TableCell>
                  <TableCell>{ad.name}</TableCell>
                  <TableCell className="text-right">{ad.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${ad.cpc.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{(ad.ctr * 100).toFixed(2)}%</TableCell>
                  <TableCell className="text-right">${ad.cost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                  <TableCell className="text-center">{ad.currentRank}</TableCell>
                  <TableCell className="text-center">{ad.previousRank}</TableCell>
                  <TableCell className="text-center">
                    {renderRankChange(ad.currentRank, ad.previousRank)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        <p><strong>Note:</strong> Rankings are calculated based on a combination of clicks, impressions, CTR, and other performance metrics.</p>
        <p>For improved results, consider optimizing ads with declining rankings by adjusting bids, refining keywords, or improving ad copy.</p>
      </div>
    </Layout>
  );
};

export default AdsRanking;
