
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Journal = () => {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trading Journal</h1>
          <p className="text-muted-foreground">
            Document and review your trade execution and strategy
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" /> New Journal Entry
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Recent Journal Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* This would be a map of real journal entries in production */}
            <JournalEntryPreview 
              date="May 3, 2023"
              title="AAPL Earnings Trade Analysis"
              snippet="Pre-market analysis showed strong support at $165. I entered a long position with 25 shares after the earnings dip, following my planned strategy for high-volume reversals..."
              tags={["earnings", "long", "successful", "discipline"]}
            />
            
            <JournalEntryPreview 
              date="May 1, 2023"
              title="SPY Breakdown Trade - Lessons Learned"
              snippet="Market conditions were clearly bearish, but I entered against the trend hoping for a reversal. This violated my own trading rules and resulted in a significant loss..."
              tags={["short", "failure", "psychology", "rules-violation"]}
            />
            
            <JournalEntryPreview 
              date="Apr 28, 2023"
              title="TSLA Position Sizing Success"
              snippet="Implemented my new position sizing rules perfectly on this trade. Limited risk to 2% of account which allowed me to stay in the trade despite volatility..."
              tags={["position-sizing", "long", "volatility", "success"]}
            />
            
            <JournalEntryPreview 
              date="Apr 25, 2023"
              title="Oil Futures Strategy Refinement"
              snippet="Testing a new strategy for trading crude oil futures. Initial results promising but need to work on my entry timing. The pattern recognition seems to work best on the 15-minute timeframe..."
              tags={["futures", "new-strategy", "oil", "testing"]}
            />
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">View All Journal Entries</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Journal Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground">Total Entries</div>
                <div className="text-2xl font-bold mt-1">47</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground">This Month</div>
                <div className="text-2xl font-bold mt-1">12</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground">Avg Length</div>
                <div className="text-2xl font-bold mt-1">485 words</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground">Consistency</div>
                <div className="text-2xl font-bold mt-1">92%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Journal Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/40 p-4 rounded-md border">
                <p className="font-medium">Top Recurring Tags</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">discipline (23)</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">long (18)</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">breakout (15)</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">psychology (14)</span>
                </div>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-md border">
                <p className="font-medium">Trading Psychology Pattern</p>
                <p className="text-sm mt-2 text-muted-foreground">Your entries show a pattern of overtrading after consecutive losses. Consider implementing a "cooling off" period after 2+ losing trades.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper component for journal entries
function JournalEntryPreview({ 
  date, 
  title, 
  snippet, 
  tags 
} : { 
  date: string; 
  title: string; 
  snippet: string; 
  tags: string[]; 
}) {
  return (
    <div className="border p-4 rounded-md hover:bg-muted/20 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{title}</h3>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <p className="text-muted-foreground text-sm mb-3">{snippet}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Journal;
