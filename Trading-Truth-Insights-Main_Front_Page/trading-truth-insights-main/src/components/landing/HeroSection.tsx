
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-tradingBlue-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="text-center lg:text-left md:max-w-2xl md:mx-auto lg:mx-0">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-tradingBlue-600">Trading Truth</span>
                <span className="block mt-2">The Trader's Platform for Verified Performance</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Move beyond screenshots and claims. Trade with transparency, journal with purpose, and grow with validated metrics. Built for traders who value accountability and results.
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start space-x-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Get Started Free
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  How It Works
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <div className="shadow-xl rounded-lg overflow-hidden bg-white">
                <div className="relative">
                  {/* Sample dashboard image - replace with actual screenshot in production */}
                  <div className="bg-tradingBlue-600 h-10 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-white text-xs ml-4">Trading Performance Dashboard</div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-muted h-20 rounded animate-pulse-gentle"></div>
                      <div className="bg-muted h-20 rounded animate-pulse-gentle"></div>
                    </div>
                    <div className="bg-muted h-40 rounded mb-4 animate-pulse-gentle"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-muted h-24 rounded animate-pulse-gentle"></div>
                      <div className="bg-muted h-24 rounded animate-pulse-gentle"></div>
                      <div className="bg-muted h-24 rounded animate-pulse-gentle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
