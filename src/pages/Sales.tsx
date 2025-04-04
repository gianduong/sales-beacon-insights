
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SalesChart from '@/components/SalesChart';
import SalesMetricsCard from '@/components/SalesMetricsCard';
import { generateSalesData } from '@/services/mockData';
import { 
  CircleDollarSign, 
  CreditCard, 
  BarChart3, 
  TrendingUp, 
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingBag
} from 'lucide-react';

const Sales = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');
  
  const daysMapping = {
    'week': 7,
    'month': 30,
    'quarter': 90
  };
  
  const salesData = generateSalesData(daysMapping[timeRange]);
  
  // Calculate totals for the selected time range
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.totalOrders, 0);
  const totalCustomers = salesData.reduce((sum, item) => sum + item.totalCustomers, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  const totalGrossProfit = salesData.reduce((sum, item) => sum + item.grossProfit, 0);
  const totalNetProfit = salesData.reduce((sum, item) => sum + item.netProfit, 0);
  const averageROAS = salesData.reduce((sum, item) => sum + item.returnOnAdSpend, 0) / salesData.length;
  const averageROI = salesData.reduce((sum, item) => sum + item.returnOnInvestment, 0) / salesData.length;
  
  // Get averages for rate metrics
  const avgCTR = salesData.reduce((sum, item) => sum + item.clickThroughRate, 0) / salesData.length;
  const avgRefundRate = salesData.reduce((sum, item) => sum + item.refundRate, 0) / salesData.length;
  const avgBounceRate = salesData.reduce((sum, item) => sum + item.bounceRate, 0) / salesData.length;
  const avgRetentionRate = salesData.reduce((sum, item) => sum + item.customerRetentionRate, 0) / salesData.length;
  
  return (
    <Layout 
      title="Sales Analytics" 
      subtitle="Detailed metrics and trends for your sales performance"
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Key Metrics</h2>
        <div className="flex bg-gray-100 rounded-md p-1">
          <button
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'quarter' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setTimeRange('quarter')}
          >
            Quarter
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SalesMetricsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          icon={<CircleDollarSign className="h-5 w-5 text-polaris-indigo-600" />}
        />
        
        <SalesMetricsCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          icon={<ShoppingBag className="h-5 w-5 text-polaris-indigo-600" />}
        />
        
        <SalesMetricsCard
          title="Total Customers"
          value={totalCustomers.toLocaleString()}
          icon={<Users className="h-5 w-5 text-polaris-indigo-600" />}
        />
        
        <SalesMetricsCard
          title="Average Order Value"
          value={`$${averageOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          icon={<CreditCard className="h-5 w-5 text-polaris-indigo-600" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SalesMetricsCard
          title="Return on Ad Spend (ROAS)"
          value={averageROAS.toFixed(2)}
          icon={<ArrowUpRight className="h-5 w-5 text-polaris-indigo-600" />}
        />
        
        <SalesMetricsCard
          title="Return on Investment (ROI)"
          value={`${(averageROI * 100).toFixed(1)}%`}
          icon={<TrendingUp className="h-5 w-5 text-polaris-indigo-600" />}
        />
        
        <SalesMetricsCard
          title="Customer Retention Rate"
          value={`${(avgRetentionRate * 100).toFixed(1)}%`}
          icon={<RefreshCcw className="h-5 w-5 text-polaris-indigo-600" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SalesChart
          data={salesData}
          metric="revenue"
          title="Revenue Over Time"
          type="area"
        />
        
        <SalesChart
          data={salesData}
          metric="totalOrders"
          title="Orders Over Time"
          type="bar"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SalesChart
          data={salesData}
          metric="grossProfit"
          secondaryMetric="netProfit"
          title="Profit Analysis"
          type="line"
        />
        
        <SalesChart
          data={salesData}
          metric="customerRetentionRate"
          secondaryMetric="churnRate"
          title="Customer Retention vs Churn"
          type="line"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="polaris-card">
          <h3 className="polaris-heading">Sales Analytics Metrics</h3>
          <div className="overflow-x-auto">
            <table className="polaris-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>CPA</th>
                  <th>AOV</th>
                  <th>CLV</th>
                  <th>Refund Rate</th>
                  <th>CTR</th>
                  <th>Bounce Rate</th>
                  <th>Profit Margin</th>
                </tr>
              </thead>
              <tbody>
                {salesData
                  .slice(0, 10)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(day => (
                    <tr key={day.id}>
                      <td>{new Date(day.date).toLocaleDateString()}</td>
                      <td>{day.totalOrders}</td>
                      <td>${day.revenue.toFixed(2)}</td>
                      <td>${day.costPerAcquisition.toFixed(2)}</td>
                      <td>${day.averageOrderValue.toFixed(2)}</td>
                      <td>${day.customerLifetimeValue.toFixed(2)}</td>
                      <td>{(day.refundRate * 100).toFixed(1)}%</td>
                      <td>{(day.clickThroughRate * 100).toFixed(1)}%</td>
                      <td>{(day.bounceRate * 100).toFixed(1)}%</td>
                      <td>{(day.profitMargin * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default Sales;
