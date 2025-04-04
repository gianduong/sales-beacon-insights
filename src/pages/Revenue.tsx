
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { generateSalesData, SalesMetrics } from '@/services/mockData';
import { formatCurrency, formatPercent, formatNumber } from '@/utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircleDollarSign, TrendingUp, ShoppingCart, Users, BarChart3 } from 'lucide-react';

const Revenue = () => {
  const { data: salesData, isLoading } = useQuery<SalesMetrics[]>({
    queryKey: ['salesMetrics'],
    queryFn: () => generateSalesData(30)
  });

  const revenueMetricsCards = [
    {
      title: 'Total Revenue',
      value: isLoading ? '...' : formatCurrency(salesData?.reduce((sum, item) => sum + item.revenue, 0) || 0),
      icon: <CircleDollarSign className="h-5 w-5 text-green-500" />,
      description: 'Total sales revenue before deductions'
    },
    {
      title: 'Net Revenue',
      value: isLoading ? '...' : formatCurrency(salesData?.reduce((sum, item) => sum + (item.revenue - (item.revenue * 0.1)), 0) || 0),
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      description: 'Revenue after discounts and refunds'
    },
    {
      title: 'Average Order Value',
      value: isLoading ? '...' : formatCurrency(
        salesData ? 
        salesData.reduce((sum, item) => sum + item.revenue, 0) / 
        salesData.reduce((sum, item) => sum + item.totalOrders, 0) : 0
      ),
      icon: <ShoppingCart className="h-5 w-5 text-indigo-500" />,
      description: 'Revenue per order'
    },
    {
      title: 'Customer Lifetime Value',
      value: isLoading ? '...' : formatCurrency(salesData ? 
        (salesData.reduce((sum, item) => sum + item.revenue, 0) / 
         salesData.reduce((sum, item) => sum + item.totalCustomers, 0)) * 3 : 0),
      icon: <Users className="h-5 w-5 text-purple-500" />,
      description: 'Estimated value per customer'
    }
  ];

  const formattedData = salesData?.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Revenue: item.revenue,
    'Net Revenue': item.revenue * 0.9,
    'Cost of Goods': item.revenue * 0.4
  }));

  const colorPalette = {
    Revenue: '#8884d8',
    'Net Revenue': '#82ca9d',
    'Cost of Goods': '#ffc658'
  };

  return (
    <Layout title="Revenue Analytics" subtitle="Track your sales performance and revenue metrics">
      <div className="grid gap-6">
        {/* Revenue KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {revenueMetricsCards.map((metric, i) => (
            <Card key={i} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-700">{metric.title}</CardTitle>
                  <span className="p-1 rounded-full bg-blue-50">{metric.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <CardDescription>{metric.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Trends */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Trends</CardTitle>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <CardDescription>Compare revenue, net revenue, and costs over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80 w-full">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">Loading chart data...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formattedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Revenue"
                      stroke={colorPalette.Revenue}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Net Revenue"
                      stroke={colorPalette['Net Revenue']}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Cost of Goods"
                      stroke={colorPalette['Cost of Goods']}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profit Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gross Profit</CardTitle>
              <CardDescription>Revenue minus cost of goods sold</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-green-600">
                {isLoading ? '...' : formatCurrency(salesData?.reduce((sum, item) => sum + (item.revenue * 0.6), 0) || 0)}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {isLoading ? '' : formatPercent(0.6)} profit margin
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Net Profit</CardTitle>
              <CardDescription>After all expenses and taxes</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-green-600">
                {isLoading ? '...' : formatCurrency(salesData?.reduce((sum, item) => sum + (item.revenue * 0.3), 0) || 0)}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {isLoading ? '' : formatPercent(0.3)} profit margin
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Revenue;
