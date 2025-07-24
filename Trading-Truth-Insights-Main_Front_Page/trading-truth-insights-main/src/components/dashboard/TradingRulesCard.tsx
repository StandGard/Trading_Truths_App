
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertCircle } from "lucide-react";

const mockRules = [
  {
    id: "1",
    description: "Wait for confirmation on trend reversals",
    status: "followed",
  },
  {
    id: "2",
    description: "Keep position size under 5% of account",
    status: "followed",
  },
  {
    id: "3",
    description: "Never trade during major economic announcements",
    status: "violated",
  },
  {
    id: "4",
    description: "Always set stop loss before entering a trade",
    status: "followed",
  },
];

export function TradingRulesCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Trading Rules Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockRules.map((rule) => (
            <div
              key={rule.id}
              className={`flex items-center p-3 rounded-md ${
                rule.status === "followed" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  rule.status === "followed" ? "bg-tradingGreen-100 text-tradingGreen-700" : "bg-red-100 text-red-700"
                }`}
              >
                {rule.status === "followed" ? (
                  <Check size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
              </div>
              <div>
                <p className={`text-sm ${
                  rule.status === "followed" ? "text-tradingGreen-800" : "text-red-800"
                }`}>
                  {rule.description}
                </p>
                <p className="text-xs mt-1">
                  {rule.status === "followed" ? (
                    <span className="text-tradingGreen-600">Followed consistently</span>
                  ) : (
                    <span className="text-red-600">Violated recently</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
