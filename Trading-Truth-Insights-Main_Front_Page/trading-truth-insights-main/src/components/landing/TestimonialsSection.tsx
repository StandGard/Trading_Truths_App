
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Trading Truth has completely changed how I approach my trading. The accountability of broker verification means I can't lie to myself anymore about my results.",
    name: "Michael K.",
    role: "Day Trader, 5 years experience",
  },
  {
    quote: "The journal templates have structured my trading process in ways I never imagined. I now understand my emotional triggers and can recognize patterns in my wins and losses.",
    name: "Sarah J.",
    role: "Swing Trader, 3 years experience",
  },
  {
    quote: "Being able to see my compliance with my own trading rules has been eye-opening. I'm now much more disciplined and my results show it.",
    name: "David T.",
    role: "Options Trader, 7 years experience",
  },
];

export function TestimonialsSection() {
  return (
    <div className="py-16 bg-tradingBlue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Trusted by Real Traders</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from traders who have transformed their approach with Trading Truth insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <div className="h-full flex flex-col">
                  <div className="text-lg font-medium mb-4">"{testimonial.quote}"</div>
                  <div className="mt-auto pt-4 border-t">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
