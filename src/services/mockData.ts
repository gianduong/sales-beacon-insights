
// Mock Products Data
export type Product = {
  id: string;
  name: string;
  price: number;
  productType: string;
  viewSessions: number;
  cartSessions: number;
  checkoutSessions: number;
  purchaseSessions: number;
  quantityPurchased: number;
  viewToCartRate: number;
  viewCartToCheckoutRate: number;
  viewCheckoutToPurchaseRate: number;
  viewToPurchaseRate: number;
};

export const generateProductsData = (): Product[] => {
  const productTypes = [
    "T-shirt", 
    "Jeans", 
    "Shoes", 
    "Accessory", 
    "Hoodie", 
    "Dress", 
    "Hat", 
    "Jacket"
  ];
  
  return Array.from({ length: 50 }, (_, i) => {
    const id = `P${(i + 1).toString().padStart(4, '0')}`;
    const viewSessions = Math.floor(Math.random() * 1000) + 100;
    const cartSessions = Math.floor(viewSessions * (Math.random() * 0.5 + 0.1));
    const checkoutSessions = Math.floor(cartSessions * (Math.random() * 0.8 + 0.1));
    const purchaseSessions = Math.floor(checkoutSessions * (Math.random() * 0.9 + 0.1));
    const quantityPurchased = Math.floor(purchaseSessions * (Math.random() + 1));
    
    const viewToCartRate = cartSessions / viewSessions;
    const viewCartToCheckoutRate = checkoutSessions / cartSessions;
    const viewCheckoutToPurchaseRate = purchaseSessions / checkoutSessions;
    const viewToPurchaseRate = purchaseSessions / viewSessions;
    
    return {
      id,
      name: `Product ${id}`,
      price: Math.floor(Math.random() * 100) + 10,
      productType: productTypes[Math.floor(Math.random() * productTypes.length)],
      viewSessions,
      cartSessions,
      checkoutSessions,
      purchaseSessions,
      quantityPurchased,
      viewToCartRate,
      viewCartToCheckoutRate,
      viewCheckoutToPurchaseRate,
      viewToPurchaseRate
    };
  });
};

// Mock Sales Data
export type SalesMetrics = {
  id: string;
  date: string;
  totalOrders: number;
  revenue: number;
  costPerAcquisition: number;
  totalCustomers: number;
  customerLifetimeValue: number;
  averageOrderValue: number;
  repeatCustomers: number;
  repeatCustomerRate: number;
  refundOrders: number;
  grossProfit: number;
  netProfit: number;
  refundRate: number;
  clickThroughRate: number;
  bounceRate: number;
  returnOnInvestment: number;
  returnOnAdSpend: number;
  customerRetentionRate: number;
  churnRate: number;
  netRevenue: number;
  profitMargin: number;
};

export const generateSalesData = (days: number = 30): SalesMetrics[] => {
  const today = new Date();
  const data: SalesMetrics[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const totalOrders = Math.floor(Math.random() * 200) + 50;
    const revenue = totalOrders * (Math.random() * 80 + 20);
    const adSpend = revenue * (Math.random() * 0.2 + 0.1);
    const totalCustomers = Math.floor(totalOrders * (Math.random() * 0.3 + 0.7));
    const repeats = Math.floor(totalCustomers * (Math.random() * 0.4));
    const refunds = Math.floor(totalOrders * (Math.random() * 0.1));
    const cogs = revenue * (Math.random() * 0.4 + 0.3);
    const grossProfit = revenue - cogs;
    const operatingExpenses = grossProfit * (Math.random() * 0.2 + 0.1);
    const netProfit = grossProfit - operatingExpenses - adSpend;
    const impressions = Math.floor(totalOrders * (Math.random() * 10 + 10));
    const clicks = Math.floor(impressions * (Math.random() * 0.2 + 0.05));
    const bounces = Math.floor(clicks * (Math.random() * 0.4 + 0.2));
    const discounts = revenue * (Math.random() * 0.1);
    
    data.push({
      id: `S${i}`,
      date: date.toISOString().split('T')[0],
      totalOrders,
      revenue,
      costPerAcquisition: adSpend / totalCustomers,
      totalCustomers,
      customerLifetimeValue: (revenue / totalCustomers) * (Math.random() + 1) * 2,
      averageOrderValue: revenue / totalOrders,
      repeatCustomers: repeats,
      repeatCustomerRate: repeats / totalCustomers,
      refundOrders: refunds,
      grossProfit,
      netProfit,
      refundRate: refunds / totalOrders,
      clickThroughRate: clicks / impressions,
      bounceRate: bounces / clicks,
      returnOnInvestment: netProfit / (cogs + adSpend + operatingExpenses),
      returnOnAdSpend: revenue / adSpend,
      customerRetentionRate: 0.8 + Math.random() * 0.15,
      churnRate: 0.05 + Math.random() * 0.1,
      netRevenue: revenue - discounts - (refunds * (revenue / totalOrders)),
      profitMargin: netProfit / revenue
    });
  }
  
  return data;
};
