
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, TrendingUp, BarChart3, Heart, Droplet, Utensils, Moon, Brain, Newspaper, Target } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";

interface DayEntry {
  date: string;
  trades: number;
  emotionalState: {
    before: string;
    during: string;
    after: string;
  };
  sleep: number;
  meals: string;
  water: number;
  newsEvents: string;
  marketImpact: string;
  reflection: string;
  pnl: number;
  pnlTag: 'profit' | 'loss' | 'neutral';
  tradeDetails: Array<{
    setup: string;
    entry: string;
    exit: string;
    result: number;
    notes: string;
  }>;
}

const Calendar2025 = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dayEntries, setDayEntries] = useState<Record<string, DayEntry>>(() => {
    const saved = localStorage.getItem('trading-calendar-entries');
    return saved ? JSON.parse(saved) : {};
  });
  const [viewType, setViewType] = useState<"calendar" | "table">("calendar");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emotionalStates = ["Calm", "Focused", "Fearful", "Overconfident", "FOMO", "Hesitant", "Anxious", "Confident"];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEntryForDate = (date: Date): DayEntry => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return dayEntries[dateKey] || {
      date: dateKey,
      trades: 0,
      emotionalState: { before: "", during: "", after: "" },
      sleep: 8,
      meals: "Breakfast: \nLunch: \nDinner: ",
      water: 2.0,
      newsEvents: "",
      marketImpact: "",
      reflection: "What went well?\n\nWhat didn't go well?\n\nWhat did I learn?\n\nHow did this affect my mindset?",
      pnl: 0,
      pnlTag: 'neutral',
      tradeDetails: []
    };
  };

  const updateDayEntry = (date: Date, updates: Partial<DayEntry>) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const currentEntry = getEntryForDate(date);
    
    // Auto-calculate P&L and tag from trade details
    if (updates.tradeDetails) {
      const totalPnl = updates.tradeDetails.reduce((sum, trade) => sum + (trade.result || 0), 0);
      updates.pnl = totalPnl;
      updates.pnlTag = totalPnl > 0 ? 'profit' : totalPnl < 0 ? 'loss' : 'neutral';
    }
    
    const updatedEntry = { ...currentEntry, ...updates };
    
    // Save to localStorage
    setDayEntries(prev => {
      const newEntries = { ...prev, [dateKey]: updatedEntry };
      localStorage.setItem('trading-calendar-entries', JSON.stringify(newEntries));
      return newEntries;
    });
  };

  const DayEntryDialog = ({ date }: { date: Date }) => {
    const entry = getEntryForDate(date);
    
    return (
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {format(date, 'EEEE, MMMM d, yyyy')}
          </DialogTitle>
          <DialogDescription>
            Track your trading performance and wellness for this day
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Trading Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trading Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Trades</label>
                  <Input 
                    type="number"
                    value={entry.trades}
                    onChange={(e) => updateDayEntry(date, { trades: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Day P&L ($)</label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={entry.pnl}
                    onChange={(e) => {
                      const pnl = Number(e.target.value);
                      updateDayEntry(date, { 
                        pnl,
                        pnlTag: pnl > 0 ? 'profit' : pnl < 0 ? 'loss' : 'neutral'
                      });
                    }}
                    placeholder="0.00"
                    className={`${
                      entry.pnl > 0 ? 'border-success text-success' : 
                      entry.pnl < 0 ? 'border-destructive text-destructive' : 
                      'border-muted'
                    }`}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Trade Details</label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newTrade = { setup: "", entry: "", exit: "", result: 0, notes: "" };
                    updateDayEntry(date, { 
                      tradeDetails: [...entry.tradeDetails, newTrade] 
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Trade
                </Button>
                {entry.tradeDetails.map((trade, index) => (
                  <div key={index} className="border rounded p-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Setup"
                        value={trade.setup}
                        onChange={(e) => {
                          const newTrades = [...entry.tradeDetails];
                          newTrades[index] = { ...trade, setup: e.target.value };
                          updateDayEntry(date, { tradeDetails: newTrades });
                        }}
                      />
                      <Input 
                        placeholder="Entry"
                        value={trade.entry}
                        onChange={(e) => {
                          const newTrades = [...entry.tradeDetails];
                          newTrades[index] = { ...trade, entry: e.target.value };
                          updateDayEntry(date, { tradeDetails: newTrades });
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Exit"
                        value={trade.exit}
                        onChange={(e) => {
                          const newTrades = [...entry.tradeDetails];
                          newTrades[index] = { ...trade, exit: e.target.value };
                          updateDayEntry(date, { tradeDetails: newTrades });
                        }}
                      />
                      <Input 
                        placeholder="Result ($)"
                        type="number"
                        step="0.01"
                        value={trade.result}
                        onChange={(e) => {
                          const newTrades = [...entry.tradeDetails];
                          newTrades[index] = { ...trade, result: Number(e.target.value) };
                          updateDayEntry(date, { tradeDetails: newTrades });
                        }}
                        className={`${
                          trade.result > 0 ? 'border-success text-success' : 
                          trade.result < 0 ? 'border-destructive text-destructive' : 
                          ''
                        }`}
                      />
                    </div>
                    <Textarea 
                      placeholder="Personal Notes"
                      value={trade.notes}
                      onChange={(e) => {
                        const newTrades = [...entry.tradeDetails];
                        newTrades[index] = { ...trade, notes: e.target.value };
                        updateDayEntry(date, { tradeDetails: newTrades });
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emotional State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Emotional State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Before Trading</label>
                  <Select 
                    value={entry.emotionalState.before}
                    onValueChange={(value) => updateDayEntry(date, { 
                      emotionalState: { ...entry.emotionalState, before: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {emotionalStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">During Trading</label>
                  <Select 
                    value={entry.emotionalState.during}
                    onValueChange={(value) => updateDayEntry(date, { 
                      emotionalState: { ...entry.emotionalState, during: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {emotionalStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">After Trading</label>
                  <Select 
                    value={entry.emotionalState.after}
                    onValueChange={(value) => updateDayEntry(date, { 
                      emotionalState: { ...entry.emotionalState, after: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {emotionalStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Wellness Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Sleep (hours)
                  </label>
                  <Input 
                    type="number"
                    step="0.5"
                    value={entry.sleep}
                    onChange={(e) => updateDayEntry(date, { sleep: Number(e.target.value) })}
                    placeholder="8.0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Droplet className="h-4 w-4" />
                    Water Intake (L)
                  </label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={entry.water}
                    onChange={(e) => updateDayEntry(date, { water: Number(e.target.value) })}
                    placeholder="2.0"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Meals
                </label>
                <Textarea 
                  value={entry.meals}
                  onChange={(e) => updateDayEntry(date, { meals: e.target.value })}
                  placeholder="Brief meal log..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Market Context */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                Market Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">News Events</label>
                <Textarea 
                  value={entry.newsEvents}
                  onChange={(e) => updateDayEntry(date, { newsEvents: e.target.value })}
                  placeholder="Major economic or political news..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Market Impact Summary</label>
                <Textarea 
                  value={entry.marketImpact}
                  onChange={(e) => updateDayEntry(date, { marketImpact: e.target.value })}
                  placeholder="How news affected markets..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Daily Reflection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Daily Reflection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mindset Notes & Insights</label>
                <Textarea 
                  value={entry.reflection}
                  onChange={(e) => updateDayEntry(date, { reflection: e.target.value })}
                  placeholder="What I learned, personal insights, thoughts about the day..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">🗓️ Trader Performance + Wellness Calendar 2025</h1>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
          Track your daily trading performance, emotional state, and wellness habits in one comprehensive calendar.
        </p>
      </div>

      <Tabs value={viewType} onValueChange={(value) => setViewType(value as "calendar" | "table")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <h2 className="text-2xl font-bold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-sm p-2">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {monthDays.map(day => {
              const entry = getEntryForDate(day);
              const hasData = entry.trades > 0 || entry.reflection !== "What went well?\n\nWhat didn't go well?\n\nWhat did I learn?\n\nHow did this affect my mindset?" || entry.sleep !== 8;
              
              const getPnlColor = () => {
                if (entry.pnl > 0) return 'bg-success/10 border-success/30 text-success-foreground';
                if (entry.pnl < 0) return 'bg-destructive/10 border-destructive/30 text-destructive-foreground';
                return hasData ? 'bg-primary/5 border-primary/20' : 'bg-background';
              };
              
              return (
                <Dialog key={day.toISOString()}>
                  <DialogTrigger asChild>
                    <Card 
                      className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 min-h-[120px] touch-manipulation ${
                        isToday(day) ? 'ring-2 ring-primary' : ''
                      } ${getPnlColor()}`}
                    >
                      <CardContent className="p-3">
                        <div className="text-sm font-medium mb-2">
                          {format(day, 'd')}
                        </div>
                        <div className="space-y-1">
                          {entry.pnl !== 0 && (
                            <Badge 
                              variant={entry.pnl > 0 ? "default" : "destructive"} 
                              className="text-xs font-bold"
                            >
                              {entry.pnl > 0 ? '+' : ''}${entry.pnl.toFixed(2)}
                            </Badge>
                          )}
                          {entry.trades > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {entry.trades} trades
                            </Badge>
                          )}
                          {entry.emotionalState.before && (
                            <Badge variant="outline" className="text-xs">
                              {entry.emotionalState.before}
                            </Badge>
                          )}
                          {entry.sleep !== 8 && entry.sleep > 0 && (
                            <div className="text-xs text-muted-foreground">
                              😴 {entry.sleep}h
                            </div>
                          )}
                          {entry.water !== 2.0 && entry.water > 0 && (
                            <div className="text-xs text-muted-foreground">
                              💧 {entry.water}L
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DayEntryDialog date={day} />
                </Dialog>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="table" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary - {format(currentDate, 'MMMM yyyy')}</CardTitle>
              <CardDescription>Overview of your trading and wellness data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-2 text-left">Date</th>
                      <th className="border border-border p-2 text-left">P&L</th>
                      <th className="border border-border p-2 text-left">Trades</th>
                      <th className="border border-border p-2 text-left">Emotion</th>
                      <th className="border border-border p-2 text-left">Sleep</th>
                      <th className="border border-border p-2 text-left">Water</th>
                      <th className="border border-border p-2 text-left">Reflection</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthDays.map(day => {
                      const entry = getEntryForDate(day);
                      const pnlColor = entry.pnl > 0 ? 'text-success' : entry.pnl < 0 ? 'text-destructive' : '';
                      return (
                        <tr key={day.toISOString()} className={isToday(day) ? 'bg-primary/5' : ''}>
                          <td className="border border-border p-2">
                            {format(day, 'MMM d')}
                          </td>
                          <td className={`border border-border p-2 font-semibold ${pnlColor}`}>
                            {entry.pnl !== 0 ? `$${entry.pnl.toFixed(2)}` : '-'}
                          </td>
                          <td className="border border-border p-2">
                            {entry.trades || '-'}
                          </td>
                          <td className="border border-border p-2">
                            {entry.emotionalState.before || '-'}
                          </td>
                          <td className="border border-border p-2">
                            {entry.sleep !== 8 ? `${entry.sleep}h` : '-'}
                          </td>
                          <td className="border border-border p-2">
                            {entry.water !== 2.0 ? `${entry.water}L` : '-'}
                          </td>
                          <td className="border border-border p-2 max-w-xs">
                            <div className="truncate">
                              {entry.reflection !== "What went well?\n\nWhat didn't go well?\n\nWhat did I learn?\n\nHow did this affect my mindset?" ? entry.reflection : '-'}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">
                  ${Object.values(dayEntries).reduce((sum, entry) => sum + entry.pnl, 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total P&L</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {Object.values(dayEntries).reduce((sum, entry) => sum + entry.trades, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Trades</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {(Object.values(dayEntries).reduce((sum, entry) => sum + entry.sleep, 0) / 
                    Object.values(dayEntries).filter(entry => entry.sleep > 0).length || 0).toFixed(1)}h
                </div>
                <div className="text-sm text-muted-foreground">Avg Sleep</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {(Object.values(dayEntries).reduce((sum, entry) => sum + entry.water, 0) / 
                    Object.values(dayEntries).filter(entry => entry.water > 0).length || 0).toFixed(1)}L
                </div>
                <div className="text-sm text-muted-foreground">Avg Water</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">
                  {Object.values(dayEntries).filter(entry => 
                    entry.reflection !== "What went well?\n\nWhat didn't go well?\n\nWhat did I learn?\n\nHow did this affect my mindset?"
                  ).length}
                </div>
                <div className="text-sm text-muted-foreground">Days Journaled</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar2025;
