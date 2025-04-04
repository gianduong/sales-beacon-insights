
import React from 'react';
import Layout from '@/components/Layout';
import { 
  BarChart3, 
  CircleDollarSign, 
  Users, 
  ShoppingCart,
  RefreshCcw,
  AlertTriangle,
  TrendingUp,
  Repeat
} from 'lucide-react';
import SalesMetricsCard from '@/components/SalesMetricsCard';
import SalesChart from '@/components/SalesChart';
import { generateSalesData, generateProductsData } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Index = () => {
  const { toast } = useToast();
  const salesData = generateSalesData(30);
  const productData = generateProductsData();
  
  // Calculate totals and changes for the metrics cards
  const thisMonth = salesData.slice(0, 7);
  const lastMonth = salesData.slice(7, 14);
  
  const calculateTotal = (data: typeof salesData, key: keyof (typeof salesData)[0]) => {
    return data.reduce((sum, item) => sum + Number(item[key]), 0);
  };
  
  const calculateChange = (current: number, previous: number) => {
    return previous === 0 ? 0 : ((current - previous) / previous) * 100;
  };
  
  // Calculate metrics
  const totalRevenue = calculateTotal(thisMonth, 'revenue');
  const lastRevenue = calculateTotal(lastMonth, 'revenue');
  const revenueChange = calculateChange(totalRevenue, lastRevenue);
  
  const totalOrders = calculateTotal(thisMonth, 'totalOrders');
  const lastOrders = calculateTotal(lastMonth, 'totalOrders');
  const ordersChange = calculateChange(totalOrders, lastOrders);
  
  const totalCustomers = calculateTotal(thisMonth, 'totalCustomers');
  const lastCustomers = calculateTotal(lastMonth, 'totalCustomers');
  const customersChange = calculateChange(totalCustomers, lastCustomers);
  
  const repeatRate = thisMonth.reduce((sum, item) => sum + item.repeatCustomerRate, 0) / thisMonth.length;
  const lastRepeatRate = lastMonth.reduce((sum, item) => sum + item.repeatCustomerRate, 0) / lastMonth.length;
  const repeatRateChange = calculateChange(repeatRate, lastRepeatRate);
  
  // Display welcome toast after 1 second
  React.useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to Sales Beacon Insights",
        description: "Your latest analytics data is ready to review",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  return (
    <Layout 
      title="Dashboard" 
      subtitle="Overview of your sales performance"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SalesMetricsCard
          title="Revenue"
          value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          change={revenueChange}
          changeLabel="vs last week"
          icon={<CircleDollarSign className="h-5 w-5 text-polaris-indigo-600" />}
        />
        
        <SalesMetricsCard
          title="Orders"
          value={totalOrders.toLocaleString()}
          change={ordersChange}
          changeLabel="vs last week"
          icon={<ShoppingCart className="h-5 w-5 text-polaris-indigo-600" />}
        />
        
        <SalesMetricsCard
          title="Customers"
          value={totalCustomers.toLocaleString()}
          change={customersChange}
          changeLabel="vs last week"
          icon={<Users className="h-5 w-5 text-polaris-indigo-600" />}
        />
        
        <SalesMetricsCard
          title="Repeat Customer Rate"
          value={`${(repeatRate * 100).toFixed(1)}%`}
          change={repeatRateChange}
          changeLabel="vs last week"
          icon={<Repeat className="h-5 w-5 text-polaris-indigo-600" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SalesChart
          data={salesData}
          metric="revenue"
          title="Revenue Trend"
          type="area"
          color="#5c6ac4"
        />
        
        <SalesChart
          data={salesData}
          metric="totalOrders"
          title="Orders Trend"
          type="bar"
          color="#47c1bf"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <SalesChart
          data={salesData}
          metric="profitMargin"
          secondaryMetric="grossProfit"
          title="Profit Analysis"
          type="line"
          color="#5c6ac4"
          secondaryColor="#47c1bf"
        />
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Top Products</h2>
          <Link to="/products" className="text-polaris-indigo-600 hover:text-polaris-indigo-700 text-sm font-medium">
            View all products
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="polaris-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Type</th>
                <th>View Sessions</th>
                <th>Purchase Sessions</th>
                <th>View to Purchase Rate</th>
              </tr>
            </thead>
            <tbody>
              {productData
                .sort((a, b) => b.purchaseSessions - a.purchaseSessions)
                .slice(0, 5)
                .map(product => (
                  <tr key={product.id}>
                    <td className="font-medium">{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span className="polaris-badge polaris-badge-default">
                        {product.productType}
                      </span>
                    </td>
                    <td>{product.viewSessions.toLocaleString()}</td>
                    <td>{product.purchaseSessions.toLocaleString()}</td>
                    <td>{(product.viewToPurchaseRate * 100).toFixed(1)}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
