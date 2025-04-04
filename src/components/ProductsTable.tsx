
import React, { useState } from 'react';
import { Product } from '@/services/mockData';
import { ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';

interface ProductsTableProps {
  products: Product[];
}

type SortDirection = 'asc' | 'desc';
type SortableFields = keyof Product;

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const [sortField, setSortField] = useState<SortableFields>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  
  // Get unique product types for filter
  const productTypes = Array.from(new Set(products.map(p => p.productType)));
  
  // Handle sort
  const handleSort = (field: SortableFields) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterType || product.productType === filterType)
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // String comparison
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      return sortDirection === 'asc' 
        ? aString.localeCompare(bString) 
        : bString.localeCompare(aString);
    });
  
  // Format percentage for display
  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };
  
  return (
    <div className="polaris-card overflow-hidden">
      <div className="mb-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-polaris-indigo-500 focus:border-polaris-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              className="appearance-none pl-8 pr-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-polaris-indigo-500 focus:border-polaris-indigo-500"
              value={filterType || ''}
              onChange={(e) => setFilterType(e.target.value || null)}
            >
              <option value="">All types</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="polaris-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('price')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  {sortField === 'price' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('productType')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>Product Type</span>
                  {sortField === 'productType' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('viewSessions')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>View Sessions</span>
                  {sortField === 'viewSessions' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('cartSessions')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>Cart Sessions</span>
                  {sortField === 'cartSessions' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('checkoutSessions')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>Checkout Sessions</span>
                  {sortField === 'checkoutSessions' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('purchaseSessions')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>Purchase Sessions</span>
                  {sortField === 'purchaseSessions' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('quantityPurchased')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>Quantity Purchased</span>
                  {sortField === 'quantityPurchased' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('viewToCartRate')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>View to Cart Rate</span>
                  {sortField === 'viewToCartRate' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('viewCartToCheckoutRate')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>View Cart to Checkout Rate</span>
                  {sortField === 'viewCartToCheckoutRate' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('viewCheckoutToPurchaseRate')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>View Checkout to Purchase Rate</span>
                  {sortField === 'viewCheckoutToPurchaseRate' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('viewToPurchaseRate')} className="cursor-pointer">
                <div className="flex items-center space-x-1">
                  <span>View to Purchase Rate</span>
                  {sortField === 'viewToPurchaseRate' && (
                    sortDirection === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="font-medium">{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <span className="polaris-badge polaris-badge-default">
                    {product.productType}
                  </span>
                </td>
                <td>{product.viewSessions.toLocaleString()}</td>
                <td>{product.cartSessions.toLocaleString()}</td>
                <td>{product.checkoutSessions.toLocaleString()}</td>
                <td>{product.purchaseSessions.toLocaleString()}</td>
                <td>{product.quantityPurchased.toLocaleString()}</td>
                <td>{formatPercent(product.viewToCartRate)}</td>
                <td>{formatPercent(product.viewCartToCheckoutRate)}</td>
                <td>{formatPercent(product.viewCheckoutToPurchaseRate)}</td>
                <td>{formatPercent(product.viewToPurchaseRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
