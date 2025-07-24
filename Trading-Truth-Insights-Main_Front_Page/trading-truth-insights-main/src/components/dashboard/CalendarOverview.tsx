import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths } from "date-fns";
import { useNavigate } from "react-router-dom";

interface DayEntry {
  date: string;
  trades: number;
  pnl: number;
  pnlTag: 'profit' | 'loss' | 'neutral';
  emotionalState: {
    before: string;
    during: string;
    after: string;
  };
}

export const CalendarOverview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  
  // Load data from localStorage
  const dayEntries: Record<string, DayEntry> = JSON.parse(
    localStorage.getItem('trading-calendar-entries') || '{}'
  );

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEntryForDate = (date: Date): DayEntry => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return dayEntries[dateKey] || {
      date: dateKey,
      trades: 0,
      pnl: 0,
      pnlTag: 'neutral',
      emotionalState: { before: "", during: "", after: "" }
    };
  };

  const getPnlColor = (pnl: number) => {
    if (pnl > 0) return 'bg-success/20 border-success/40';
    if (pnl < 0) return 'bg-destructive/20 border-destructive/40';
    return 'bg-muted/20 border-muted/40';
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Trading Calendar
            </CardTitle>
            <CardDescription>Quick overview of your trading days</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/calendar')}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            View Full Calendar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mini Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-xs">
          {/* Day Headers */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center font-medium text-muted-foreground p-1">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {monthDays.map(day => {
            const entry = getEntryForDate(day);
            const hasData = entry.trades > 0 || entry.pnl !== 0;
            
            return (
              <div
                key={day.toISOString()}
                className={`
                  aspect-square p-1 text-center rounded border cursor-pointer
                  transition-colors hover:bg-primary/10
                  ${isToday(day) ? 'ring-1 ring-primary' : ''}
                  ${hasData ? getPnlColor(entry.pnl) : 'border-border'}
                `}
                onClick={() => navigate('/calendar')}
              >
                <div className="text-xs">{format(day, 'd')}</div>
                {hasData && (
                  <div className="text-[10px] mt-1">
                    {entry.pnl !== 0 && (
                      <Badge 
                        variant={entry.pnl > 0 ? "default" : "destructive"} 
                        className="text-[8px] px-1 py-0"
                      >
                        {entry.pnl > 0 ? '+' : ''}${Math.abs(entry.pnl) > 999 ? 
                          `${(entry.pnl / 1000).toFixed(1)}k` : 
                          entry.pnl.toFixed(0)
                        }
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-sm font-semibold">
              {Object.values(dayEntries).reduce((sum, entry) => sum + entry.trades, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Trades</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-success">
              {Object.values(dayEntries).filter(entry => entry.pnl > 0).length}
            </div>
            <div className="text-xs text-muted-foreground">Winning Days</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-destructive">
              {Object.values(dayEntries).filter(entry => entry.pnl < 0).length}
            </div>
            <div className="text-xs text-muted-foreground">Losing Days</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};