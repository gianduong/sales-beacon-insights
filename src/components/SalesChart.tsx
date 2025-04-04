
import React from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SalesMetrics } from '@/services/mockData';
import { formatCurrency, formatPercent, formatNumber } from '@/utils/formatters';

type ChartType = 'line' | 'area' | 'bar';

interface SalesChartProps {
  data: SalesMetrics[];
  metric: keyof SalesMetrics;
  secondaryMetric?: keyof SalesMetrics;
  title: string;
  type?: ChartType;
  color?: string;
  secondaryColor?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({
  data,
  metric,
  secondaryMetric,
  title,
  type = 'line',
  color = '#5c6ac4',
  secondaryColor = '#47c1bf'
}) => {
  // Format the data to have readable values and dates
  const chartData = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
  
  // Format y-axis values based on metric type - ensure it always returns a string
  const formatYAxis = (value: number): string => {
    if (typeof value === 'number') {
      if (
        metric === 'revenue' || 
        metric === 'grossProfit' || 
        metric === 'netProfit' || 
        metric === 'netRevenue'
      ) {
        return `$${value.toFixed(0)}`;
      } else if (
        metric === 'refundRate' || 
        metric === 'clickThroughRate' || 
        metric === 'bounceRate' || 
        metric === 'profitMargin' || 
        metric === 'customerRetentionRate' || 
        metric === 'churnRate' || 
        metric === 'repeatCustomerRate'
      ) {
        return `${(value * 100).toFixed(0)}%`;
      }
    }
    return value.toString(); // Ensure we always return a string
  };
  
  // Format tooltip values
  const formatTooltipValue = (value: number, name: string) => {
    if (
      name === 'revenue' || 
      name === 'grossProfit' || 
      name === 'netProfit' || 
      name === 'netRevenue' ||
      name === 'costPerAcquisition' || 
      name === 'customerLifetimeValue' ||
      name === 'averageOrderValue'
    ) {
      return `$${value.toFixed(2)}`;
    } else if (
      name === 'refundRate' || 
      name === 'clickThroughRate' || 
      name === 'bounceRate' || 
      name === 'profitMargin' || 
      name === 'customerRetentionRate' || 
      name === 'churnRate' || 
      name === 'repeatCustomerRate'
    ) {
      return `${(value * 100).toFixed(2)}%`;
    } else if (
      name === 'returnOnInvestment' ||
      name === 'returnOnAdSpend'
    ) {
      return value.toFixed(2);
    }
    return value.toLocaleString();
  };
  
  // Label formatter for tooltip
  const labelFormatter = (name: string) => {
    const labels: {[key: string]: string} = {
      'revenue': 'Revenue',
      'totalOrders': 'Total Orders',
      'grossProfit': 'Gross Profit',
      'netProfit': 'Net Profit',
      'refundRate': 'Refund Rate',
      'clickThroughRate': 'CTR',
      'bounceRate': 'Bounce Rate',
      'profitMargin': 'Profit Margin',
      'customerRetentionRate': 'Customer Retention',
      'churnRate': 'Churn Rate',
      'repeatCustomerRate': 'Repeat Rate',
      'costPerAcquisition': 'CPA',
      'customerLifetimeValue': 'CLV',
      'averageOrderValue': 'AOV',
      'returnOnInvestment': 'ROI',
      'returnOnAdSpend': 'ROAS',
      'totalCustomers': 'Total Customers',
      'repeatCustomers': 'Repeat Customers',
      'refundOrders': 'Refund Orders',
      'netRevenue': 'Net Revenue'
    };
    
    return labels[name] || name;
  };
  
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
              {secondaryMetric && (
                <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.1}/>
                </linearGradient>
              )}
            </defs>
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={{stroke: '#E5E7EB'}}
              tick={{fill: '#6B7280', fontSize: 12}}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={{stroke: '#E5E7EB'}}
              tick={{fill: '#6B7280', fontSize: 12}}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(value) => `Date: ${value}`}
            />
            <Legend formatter={labelFormatter} />
            <Area 
              type="monotone" 
              dataKey={metric}
              name={String(metric)} 
              stroke={color} 
              fillOpacity={1} 
              fill="url(#colorPrimary)" 
            />
            {secondaryMetric && (
              <Area 
                type="monotone" 
                dataKey={secondaryMetric}
                name={String(secondaryMetric)} 
                stroke={secondaryColor} 
                fillOpacity={1} 
                fill="url(#colorSecondary)" 
              />
            )}
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart data={chartData}>
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={{stroke: '#E5E7EB'}}
              tick={{fill: '#6B7280', fontSize: 12}} 
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={{stroke: '#E5E7EB'}}
              tick={{fill: '#6B7280', fontSize: 12}}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(value) => `Date: ${value}`}
            />
            <Legend formatter={labelFormatter} />
            <Bar 
              dataKey={metric} 
              name={String(metric)} 
              fill={color} 
              barSize={20} 
            />
            {secondaryMetric && (
              <Bar 
                dataKey={secondaryMetric} 
                name={String(secondaryMetric)}
                fill={secondaryColor} 
                barSize={20} 
              />
            )}
          </BarChart>
        );
      
      default:
        return (
          <LineChart data={chartData}>
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={{stroke: '#E5E7EB'}}
              tick={{fill: '#6B7280', fontSize: 12}}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={{stroke: '#E5E7EB'}}
              tick={{fill: '#6B7280', fontSize: 12}}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(value) => `Date: ${value}`}
            />
            <Legend formatter={labelFormatter} />
            <Line 
              type="monotone" 
              dataKey={metric} 
              name={String(metric)}
              stroke={color} 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            {secondaryMetric && (
              <Line 
                type="monotone" 
                dataKey={secondaryMetric} 
                name={String(secondaryMetric)}
                stroke={secondaryColor} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        );
    }
  };
  
  return (
    <div className="polaris-card">
      <h3 className="polaris-heading">{title}</h3>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
