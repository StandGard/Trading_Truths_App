
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function WinRateChart() {
  // Sample data - would be replaced with real data from API
  const data = [
    { name: "Winning Trades", value: 65, color: "#0fb068" },
    { name: "Losing Trades", value: 35, color: "#f43f5e" }
  ];

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const formatTooltip = (value: number, name: string) => {
    return [`${value}%`, name];
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Win Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="border rounded-md p-3 bg-muted/30">
            <div className="text-sm text-muted-foreground">Avg. Winner</div>
            <div className="text-lg font-bold text-tradingGreen-600">+$325.42</div>
          </div>
          <div className="border rounded-md p-3 bg-muted/30">
            <div className="text-sm text-muted-foreground">Avg. Loser</div>
            <div className="text-lg font-bold text-destructive">-$173.25</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
