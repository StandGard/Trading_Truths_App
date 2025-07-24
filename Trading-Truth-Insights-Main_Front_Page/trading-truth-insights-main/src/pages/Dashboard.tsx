
import { StatCard } from "@/components/dashboard/StatCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { TradeJournalCard } from "@/components/dashboard/TradeJournalCard";
import { TradingRulesCard } from "@/components/dashboard/TradingRulesCard";
import { WinRateChart } from "@/components/dashboard/WinRateChart";
import { CalendarOverview } from "@/components/dashboard/CalendarOverview";
import { PnLSummary } from "@/components/dashboard/PnLSummary";
import { Database, ChartLine, User, TrendingUp, DollarSign, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCalendarData, useApiStatus } from "@/hooks/useApi";

const Dashboard = () => {
  // Use API hooks for data fetching
  const { data: calendarData, isLoading: isLoadingCalendar, error: calendarError } = useCalendarData();
  const { isOnline, status, message } = useApiStatus();
  
  // Calculate stats from calendar data
  const entries = calendarData ? Object.values(calendarData) : [];
  const totalPnL = entries.reduce((sum: number, entry: any) => sum + (Number(entry.pnl) || 0), 0);
  const totalTrades = entries.reduce((sum: number, entry: any) => sum + (Number(entry.trades) || 0), 0);
  const winningDays = entries.filter((entry: any) => Number(entry.pnl) > 0).length;
  const totalTradingDays = entries.filter((entry: any) => Number(entry.trades) > 0).length;
  const winRate = totalTradingDays > 0 ? (winningDays / totalTradingDays) * 100 : 65;

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">Trading Dashboard</h1>
            <Badge variant={isOnline ? "default" : "secondary"} className="flex items-center gap-1">
              {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              {status}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            View your verified trading performance metrics • {message}
          </p>
          {calendarError && (
            <p className="text-sm text-red-500 mt-1">
              Warning: {calendarError.message}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={!isOnline}>
            <Database className="mr-2 h-4 w-4" /> Test Backend
          </Button>
          <Button>
            <Database className="mr-2 h-4 w-4" /> Connect Broker
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-6">
        <StatCard
          title="Total P&L"
          value={isLoadingCalendar ? "Loading..." : `$${totalPnL.toFixed(2)}`}
          trend={totalPnL >= 0 ? "up" : "down"}
          trendValue={isLoadingCalendar ? "..." : totalPnL >= 0 ? "Profitable" : "Needs Improvement"}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Account Balance"
          value="$12,450.75"
          trend="up"
          trendValue="+8.3% this month"
          icon={<ChartLine className="h-4 w-4" />}
        />
        <StatCard
          title="Win Rate"
          value={isLoadingCalendar ? "Loading..." : `${winRate.toFixed(1)}%`}
          trend={winRate >= 60 ? "up" : winRate >= 50 ? "neutral" : "down"}
          trendValue={isLoadingCalendar ? "..." : `${winningDays}/${totalTradingDays} days`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Total Trades"
          value={isLoadingCalendar ? "Loading..." : totalTrades.toString()}
          trend="neutral"
          trendValue={isLoadingCalendar ? "..." : `From ${isOnline ? 'backend' : 'local'} data`}
          icon={<ChartLine className="h-4 w-4" />}
        />
        <StatCard
          title="Active Trade Plans"
          value="3"
          description="2 profitable plans"
          icon={<User className="h-4 w-4" />}
        />
      </div>

      {/* Calendar and P&L Overview Row */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2">
          <CalendarOverview />
        </div>
        <PnLSummary />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2">
          <PerformanceChart 
            title="Account Equity"
            description="90-day performance history"
          />
        </div>
        <WinRateChart />
      </div>

      {/* Journal and Rules Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <TradeJournalCard />
        <TradingRulesCard />
      </div>
    </div>
  );
};

export default Dashboard;
