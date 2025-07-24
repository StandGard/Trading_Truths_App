
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Trade {
  id: string;
  date: string;
  symbol: string;
  type: "buy" | "sell";
  result: "win" | "loss" | "break-even";
  pnl: number;
  notes?: string;
}

const mockTrades: Trade[] = [
  {
    id: "1",
    date: "2023-04-30",
    symbol: "AAPL",
    type: "buy",
    result: "win",
    pnl: 450.75,
    notes: "Momentum breakout with good volume, followed my plan",
  },
  {
    id: "2",
    date: "2023-04-29",
    symbol: "AMZN",
    type: "sell",
    result: "loss",
    pnl: -320.50,
    notes: "Failed to identify key resistance level",
  },
  {
    id: "3",
    date: "2023-04-28",
    symbol: "MSFT",
    type: "buy",
    result: "win",
    pnl: 275.25,
  },
  {
    id: "4",
    date: "2023-04-27",
    symbol: "TSLA",
    type: "sell",
    result: "break-even",
    pnl: -25.50,
  },
];

export function TradeJournalCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Trades</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTrades.map((trade) => (
            <div
              key={trade.id}
              className="border rounded-md p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className={`w-2 h-8 rounded-sm mr-3 ${
                    trade.result === "win" ? "bg-tradingGreen-500" : 
                    trade.result === "loss" ? "bg-destructive" : 
                    "bg-gray-400"
                  }`} />
                  <div>
                    <h4 className="font-medium">{trade.symbol}</h4>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        trade.type === "buy" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }`}>
                        {trade.type === "buy" ? "Long" : "Short"}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(trade.date).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`text-right ${
                  trade.pnl > 0 ? "text-tradingGreen-600" : 
                  trade.pnl < 0 ? "text-destructive" : "text-gray-500"
                }`}>
                  <div className="font-bold">
                    {trade.pnl > 0 ? "+" : ""}{trade.pnl.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </div>
                </div>
              </div>
              {trade.notes && (
                <div className="text-sm text-muted-foreground mt-2 border-t pt-2">
                  {trade.notes}
                </div>
              )}
            </div>
          ))}
          
        </div>
      </CardContent>
    </Card>
  );
}
