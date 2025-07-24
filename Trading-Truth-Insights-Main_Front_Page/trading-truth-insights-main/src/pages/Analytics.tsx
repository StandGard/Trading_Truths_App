import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ChartLine,
  Calendar,
  Filter
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Sample data - would be replaced with real data from API
const dailyPnlData = [
  { date: "Apr 24", pnl: 450 },
  { date: "Apr 25", pnl: -230 },
  { date: "Apr 26", pnl: 125 },
  { date: "Apr 27", pnl: 780 },
  { date: "Apr 28", pnl: -340 },
  { date: "May 1", pnl: 560 },
  { date: "May 2", pnl: 290 },
];

const symbolPerformanceData = [
  { symbol: "AAPL", winRate: 75, avgPnl: 310 },
  { symbol: "MSFT", winRate: 60, avgPnl: 420 },
  { symbol: "AMZN", winRate: 40, avgPnl: -120 },
  { symbol: "TSLA", winRate: 66, avgPnl: 550 },
  { symbol: "NVDA", winRate: 80, avgPnl: 630 },
];

const dayOfWeekData = [
  { day: "Monday", winRate: 62, volume: 12 },
  { day: "Tuesday", winRate: 58, volume: 15 },
  { day: "Wednesday", winRate: 70, volume: 18 },
  { day: "Thursday", winRate: 45, volume: 14 },
  { day: "Friday", winRate: 52, volume: 10 },
];

const timeOfDayData = [
  { hour: "9-10am", pnl: -350, trades: 6 },
  { hour: "10-11am", pnl: 480, trades: 8 },
  { hour: "11-12pm", pnl: 320, trades: 5 },
  { hour: "12-1pm", pnl: 60, trades: 3 },
  { hour: "1-2pm", pnl: -120, trades: 4 },
  { hour: "2-3pm", pnl: 540, trades: 7 },
  { hour: "3-4pm", pnl: 220, trades: 5 },
];

const Analytics = () => {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Analyze and improve your trading metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button size="sm">
            <BarChart3 className="mr-2 h-4 w-4" /> Generate Report
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="psychology">Psychology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceChart 
              title="Equity Curve"
              description="90-day performance history"
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Daily P&L</CardTitle>
                <CardDescription>Last 7 trading days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dailyPnlData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'P&L']}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                        }}
                      />
                      <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                        {dailyPnlData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#0fb068' : '#f43f5e'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Symbol Performance</CardTitle>
                <CardDescription>Win rate and average P&L by symbol</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={symbolPerformanceData}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 40,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid horizontal strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" axisLine={false} tickLine={false} />
                      <YAxis dataKey="symbol" type="category" axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="winRate" 
                        name="Win Rate %" 
                        fill="#3382ff"
                        radius={[0, 4, 4, 0]}
                      />
                      <Bar 
                        dataKey="avgPnl" 
                        name="Avg P&L ($)" 
                        fill="#0fb068"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Day of Week Analysis</CardTitle>
                <CardDescription>Performance patterns by trading day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dayOfWeekData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="winRate" 
                        name="Win Rate %" 
                        fill="#3382ff"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="volume" 
                        name="# of Trades" 
                        fill="#9ca3af"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Time of Day Performance</CardTitle>
              <CardDescription>P&L distribution by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timeOfDayData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3382ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3382ff" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="pnl" 
                      name="P&L ($)" 
                      stroke="#3382ff" 
                      fillOpacity={1} 
                      fill="url(#colorPnl)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="trades" 
                      name="# of Trades" 
                      stroke="#9ca3af" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trades">
          <Card>
            <CardHeader>
              <CardTitle>Trade Analysis</CardTitle>
              <CardDescription>Detailed trade metrics and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <ChartLine className="h-16 w-16 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-medium mt-4">Trade Analysis Section</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  This section will contain detailed trade analysis including win/loss ratios, average holding times, and trade distribution analytics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle>Trading Patterns</CardTitle>
              <CardDescription>Identify recurring patterns in your trading behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <ChartLine className="h-16 w-16 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-medium mt-4">Pattern Analysis Section</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  This section will reveal patterns in your trading including market conditions correlation, winning streaks analysis, and behavioral tendencies.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="psychology">
          <Card>
            <CardHeader>
              <CardTitle>Trading Psychology</CardTitle>
              <CardDescription>Emotional impact analysis on trading performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <ChartLine className="h-16 w-16 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-medium mt-4">Psychology Analysis Section</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  This section will analyze the psychological aspects of your trading, including emotional state impact on performance, discipline metrics, and mindset patterns.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
