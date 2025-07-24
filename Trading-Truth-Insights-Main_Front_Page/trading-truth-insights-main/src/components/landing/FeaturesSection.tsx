
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileText, Database, Search } from "lucide-react";

const features = [
  {
    title: "Verified Trading Performance",
    description: "Connect your brokerage account for automatic trade verification, removing all subjectivity from your results.",
    icon: <Database className="h-6 w-6" />,
  },
  {
    title: "Structured Trade Journaling",
    description: "Document your trades with standardized templates focused on strategy, emotions, and lessons learned.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: "Advanced Analytics Dashboard",
    description: "Visualize your performance metrics, equity curves, and win rates with interactive charts and filters.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    title: "Trading Rules Accountability",
    description: "Set and track your trading rules compliance with automated monitoring of your execution patterns.",
    icon: <Search className="h-6 w-6" />,
  },
];

export function FeaturesSection() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Features Designed for Serious Traders</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Trading Truth provides the tools you need to measure, analyze, and improve your trading performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
