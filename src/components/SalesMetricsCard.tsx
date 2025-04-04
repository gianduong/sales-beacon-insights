
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface SalesMetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

const SalesMetricsCard: React.FC<SalesMetricsCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon
}) => {
  const isPositiveChange = change !== undefined && change > 0;
  
  return (
    <div className="polaris-card">
      <div className="flex items-center justify-between mb-2">
        <span className="polaris-stat-label">{title}</span>
        {icon && (
          <div className="bg-polaris-indigo-100 p-2 rounded-md">
            {icon}
          </div>
        )}
      </div>
      <div className="polaris-stat">{value}</div>
      {change !== undefined && (
        <div className="flex items-center mt-2">
          <div className={`flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveChange ? (
              <ArrowUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
          {changeLabel && (
            <span className="text-gray-500 text-sm ml-2">
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesMetricsCard;
