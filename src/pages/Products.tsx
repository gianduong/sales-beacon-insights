
import React from 'react';
import Layout from '@/components/Layout';
import ProductsTable from '@/components/ProductsTable';
import { generateProductsData } from '@/services/mockData';

const Products = () => {
  const products = generateProductsData();
  
  return (
    <Layout 
      title="Products" 
      subtitle="View and analyze product performance metrics"
    >
      <ProductsTable products={products} />
    </Layout>
  );
};

export default Products;
