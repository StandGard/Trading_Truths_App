import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { format, startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek } from "date-fns";

interface DayEntry {
  date: string;
  trades: number;
  pnl: number;
  pnlTag: 'profit' | 'loss' | 'neutral';
}

export const PnLSummary = () => {
  // Load data from localStorage
  const dayEntries: Record<string, DayEntry> = JSON.parse(
    localStorage.getItem('trading-calendar-entries') || '{}'
  );

  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  const thisWeekStart = startOfWeek(now);
  const thisWeekEnd = endOfWeek(now);

  const calculatePeriodPnL = (startDate: Date, endDate: Date) => {
    return Object.values(dayEntries)
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      })
      .reduce((sum, entry) => sum + entry.pnl, 0);
  };

  const totalPnL = Object.values(dayEntries).reduce((sum, entry) => sum + entry.pnl, 0);
  const thisMonthPnL = calculatePeriodPnL(thisMonthStart, thisMonthEnd);
  const lastMonthPnL = calculatePeriodPnL(lastMonthStart, lastMonthEnd);
  const thisWeekPnL = calculatePeriodPnL(thisWeekStart, thisWeekEnd);

  const winningTrades = Object.values(dayEntries).filter(entry => entry.pnl > 0).length;
  const losingTrades = Object.values(dayEntries).filter(entry => entry.pnl < 0).length;
  const totalDays = winningTrades + losingTrades;
  const winRate = totalDays > 0 ? (winningTrades / totalDays) * 100 : 0;

  const monthlyChange = lastMonthPnL !== 0 ? ((thisMonthPnL - lastMonthPnL) / Math.abs(lastMonthPnL)) * 100 : 0;

  const largestWin = Math.max(...Object.values(dayEntries).map(entry => entry.pnl), 0);
  const largestLoss = Math.min(...Object.values(dayEntries).map(entry => entry.pnl), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          P&L Summary
        </CardTitle>
        <CardDescription>Your trading performance overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total P&L */}
        <div className="text-center">
          <div className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground">Total P&L</div>
        </div>

        {/* Period Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className={`text-sm font-semibold ${thisWeekPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
                {thisWeekPnL >= 0 ? '+' : ''}${thisWeekPnL.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className={`text-sm font-semibold ${thisMonthPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
                {thisMonthPnL >= 0 ? '+' : ''}${thisMonthPnL.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Monthly Change</span>
            <div className="flex items-center gap-1">
              {monthlyChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-sm font-semibold ${monthlyChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {monthlyChange >= 0 ? '+' : ''}{monthlyChange.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Win Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Win Rate</span>
            <span className="text-sm font-semibold">{winRate.toFixed(1)}%</span>
          </div>
          <Progress value={winRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{winningTrades} wins</span>
            <span>{losingTrades} losses</span>
          </div>
        </div>

        {/* Best & Worst Days */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Best Day</div>
            <div className="text-sm font-semibold text-success">
              +${largestWin.toFixed(2)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Worst Day</div>
            <div className="text-sm font-semibold text-destructive">
              ${largestLoss.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};