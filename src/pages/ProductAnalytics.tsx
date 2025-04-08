
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { generateProductsData, Product } from '@/services/mockData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { formatNumber, formatPercent } from '@/utils/formatters';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const tooltips = {
  name: "Product name",
  price: "Product price",
  productType: "Category of the product",
  viewSessions: "The sessions where the product was viewed",
  cartSessions: "The sessions where the product was added to cart",
  checkoutSessions: "The sessions where the product reached checkout",
  purchaseSessions: "The sessions where the product was purchased",
  quantityPurchased: "The number of items added to the cart from online store sessions",
  viewToCartRate: "The ratio of sessions added to cart after viewing. Formula: SUM(view_and_cart_sessions)/SUM(view_sessions)",
  viewCartToCheckoutRate: "The ratio of sessions which reached checkout after viewing and adding to cart. Formula: SUM(view_cart_checkout_sessions)/SUM(view_cart_sessions))",
  viewCheckoutToPurchaseRate: "The ratio of sessions purchased after viewing, adding to cart and reaching checkout. Formula: SUM(view_cart_checkout_purchase_sessions)/SUM(view_cart_checkout_sessions)",
  viewToPurchaseRate: "The ratio of sessions purchased after viewing. Formula: SUM(view_purchase_sessions)/SUM(view_sessions)"
};

const ProductAnalytics = () => {
  const [products] = useState<Product[]>(generateProductsData());
  
  return (
    <Layout 
      title="Product Analytics" 
      subtitle="Detailed analytics on product performance and conversion rates"
    >
      <TooltipProvider>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Analytics Overview</CardTitle>
            <CardDescription>
              View detailed metrics on how your products are performing across the customer journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Name
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.name}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Price
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.price}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Type
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.productType}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        View Sessions
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.viewSessions}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        Cart Sessions
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.cartSessions}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        Checkout Sessions
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.checkoutSessions}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        Purchase Sessions
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.purchaseSessions}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        Qty Purchased
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.quantityPurchased}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.slice(0, 10).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.productType}</TableCell>
                      <TableCell className="text-right">{formatNumber(product.viewSessions)}</TableCell>
                      <TableCell className="text-right">{formatNumber(product.cartSessions)}</TableCell>
                      <TableCell className="text-right">{formatNumber(product.checkoutSessions)}</TableCell>
                      <TableCell className="text-right">{formatNumber(product.purchaseSessions)}</TableCell>
                      <TableCell className="text-right">{formatNumber(product.quantityPurchased)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Analytics</CardTitle>
            <CardDescription>
              View conversion metrics and funnel performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Product
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.name}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        View to Cart
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.viewToCartRate}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        Cart to Checkout
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.viewCartToCheckoutRate}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        Checkout to Purchase
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.viewCheckoutToPurchaseRate}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        View to Purchase
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>{tooltips.viewToPurchaseRate}</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.slice(0, 10).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right">{formatPercent(product.viewToCartRate)}</TableCell>
                      <TableCell className="text-right">{formatPercent(product.viewCartToCheckoutRate)}</TableCell>
                      <TableCell className="text-right">{formatPercent(product.viewCheckoutToPurchaseRate)}</TableCell>
                      <TableCell className="text-right">{formatPercent(product.viewToPurchaseRate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    </Layout>
  );
};

export default ProductAnalytics;
