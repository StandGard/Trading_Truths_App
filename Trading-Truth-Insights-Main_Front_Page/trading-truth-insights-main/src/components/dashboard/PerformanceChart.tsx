
import { useEffect, useMemo, useState } from "react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface PerformanceChartProps {
  title: string;
  description?: string;
  className?: string;
}

// Sample data - would be replaced with real data in production
const generateChartData = () => {
  const data = [];
  const startDate = new Date('2023-01-01');
  let balance = 10000;
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // Generate some random performance data with overall positive trend
    const change = (Math.random() * 300) - 100;
    balance += change;
    
    data.push({
      date: date.toISOString().split('T')[0],
      balance: Math.max(balance, 8000).toFixed(2),
    });
  }
  
  return data;
};

export function PerformanceChart({ title, description, className }: PerformanceChartProps) {
  const [data, setData] = useState<any[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // In a real app, this would be an API call
    setData(generateChartData());
  }, []);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Calculate statistics
  const stats = useMemo(() => {
    if (data.length === 0) return { start: 0, end: 0, change: 0, percentChange: 0 };
    
    const start = parseFloat(data[0].balance);
    const end = parseFloat(data[data.length - 1].balance);
    const change = end - start;
    const percentChange = (change / start) * 100;
    
    return { start, end, change, percentChange };
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        
        {data.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 space-y-2 sm:space-y-0">
            <div>
              <div className="text-2xl font-bold">
                {formatCurrency(parseFloat(data[data.length - 1].balance))}
              </div>
              <div className="text-xs text-muted-foreground">
                Current Balance
              </div>
            </div>
            
            <div className={`flex items-center px-2 py-1 rounded-md ${stats.change >= 0 ? 'bg-tradingGreen-50 text-tradingGreen-700' : 'bg-red-50 text-red-700'}`}>
              <span className="text-sm font-medium">
                {stats.change >= 0 ? '+' : ''}{formatCurrency(stats.change)} ({stats.percentChange.toFixed(2)}%)
              </span>
              {stats.change >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m6 12 6-6 6 6"/>
                  <path d="M6 18h12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M6 6h12"/>
                  <path d="m6 12 6 6 6-6"/>
                </svg>
              )}
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: isMobile ? 0 : 10,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3382ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3382ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date"
                  tickFormatter={formatDate}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={30}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
                  axisLine={false}
                  tickLine={false}
                  width={isMobile ? 40 : 60}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(parseFloat(value as string))}
                  labelFormatter={formatDate}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3382ff" 
                  strokeWidth={2}
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-pulse h-4 w-32 bg-muted rounded mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading chart data...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
