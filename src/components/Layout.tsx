
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, CircleDollarSign, Settings, Home, Menu, X, ShoppingCart, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <Home className="h-5 w-5" />
  },
  {
    name: 'Products',
    path: '/products',
    icon: <Package className="h-5 w-5" />
  },
  {
    name: 'Product Analytics',
    path: '/product-analytics',
    icon: <ShoppingCart className="h-5 w-5" />
  },
  {
    name: 'Sales Analytics',
    path: '/sales',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    name: 'Ads Ranking',
    path: '/ads-ranking',
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    name: 'Attribution Settings',
    path: '/attribution-settings',
    icon: <Target className="h-5 w-5" />
  },
  {
    name: 'Revenue',
    path: '/revenue',
    icon: <CircleDollarSign className="h-5 w-5" />
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />
  }
];

type LayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <div 
        className={cn(
          "bg-sidebar h-screen fixed z-20 w-64 flex-shrink-0 border-r border-sidebar-border transition-transform duration-200 ease-in-out",
          isMobile ? "transform -translate-x-full" : ""
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="bg-polaris-indigo-600 h-8 w-8 rounded-md flex items-center justify-center">
              <BarChart3 className="text-white h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Trakpilot</span>
          </div>
        </div>
        
        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-sidebar-accent hover:text-gray-900"
            >
              <div className="mr-3 text-gray-500">{item.icon}</div>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Mobile sidebar */}
      {isMobile && (
        <div 
          className={cn(
            "bg-sidebar fixed inset-y-0 left-0 z-20 w-64 flex-shrink-0 border-r border-sidebar-border transition-transform duration-200 ease-in-out",
            sidebarOpen ? "transform translate-x-0" : "transform -translate-x-full"
          )}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className="bg-polaris-indigo-600 h-8 w-8 rounded-md flex items-center justify-center">
                <BarChart3 className="text-white h-5 w-5" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Trakpilot</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="mt-6 px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-sidebar-accent hover:text-gray-900"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="mr-3 text-gray-500">{item.icon}</div>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
      
      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col",
        isMobile ? "ml-0" : "ml-64"
      )}>
        {/* Header */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center px-6 justify-between z-10">
          {isMobile && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <div className="flex items-center">
            <div className="polaris-avatar">SP</div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
