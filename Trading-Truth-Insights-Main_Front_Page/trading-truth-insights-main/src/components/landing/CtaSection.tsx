
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <div className="bg-tradingBlue-600 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Ready to Trade with Truth?</h2>
          <p className="mt-4 text-lg text-tradingBlue-100 max-w-2xl mx-auto">
            Join traders who are serious about performance tracking and continuous improvement.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/dashboard">
                Start For Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10 hover:text-white">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
