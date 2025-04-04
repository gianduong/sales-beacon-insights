
/**
 * Utility functions for formatting values in charts and tables
 */

/**
 * Formats a number as currency
 */
export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString(undefined, { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2 
  })}`;
};

/**
 * Formats a number as percentage
 */
export const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

/**
 * Formats a number as integer
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString();
};
