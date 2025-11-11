import { useState } from "react";
import { Card } from "@/components/ui/card";
import CalculatorForm, { type CalculatorFormValues } from "@/components/CalculatorForm";
import ScoreDisplay from "@/components/ScoreDisplay";
import MetricsBreakdown from "@/components/MetricsBreakdown";
import { calculatePCC } from "@/lib/calculator";
import type { CalculatorResult } from "@shared/schema";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CalculatorPage() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = (values: CalculatorFormValues) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const calculatedResult = calculatePCC(values);
      setResult(calculatedResult);
      setIsCalculating(false);
      
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-primary"
            >
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-semibold tracking-wide uppercase">PIXIgroup.ai</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Travel Content Health Score
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-muted-foreground max-w-2xl mx-auto"
            >
              Calculate your Travel Content Health Score - a diagnostic measure of your content
              management efficiency. Discover hidden costs and revenue opportunities with PIXI.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-semibold">Enter Your Details</h2>
                <p className="text-sm text-muted-foreground">
                  Provide your property information for an accurate health score assessment
                </p>
              </div>
              <CalculatorForm onSubmit={handleSubmit} isCalculating={isCalculating} />
            </Card>
          </motion.div>

          {result && (
            <div id="results" className="space-y-8 scroll-mt-8">
              <ScoreDisplay score={result.pccScore} />
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2 className="text-2xl font-semibold">Your Detailed Breakdown</h2>
                  <p className="text-sm text-muted-foreground">
                    Understanding the financial impact on your business
                  </p>
                </motion.div>
                
                <MetricsBreakdown
                  laborCostDrain={result.laborCostDrain}
                  totalOpportunity={result.totalOpportunity}
                  contentAtRisk={result.contentAtRisk}
                  bookingValue={result.bookingValue}
                  roiPotential={result.roiPotential}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Card className="p-8 text-center bg-card">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Ready to Improve Your Score?</h3>
                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                      PIXI eliminates content friction, maximizes your reach, and protects your brand
                      consistency. Transform these insights into action.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <button
                        onClick={() => console.log('Schedule demo clicked')}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover-elevate active-elevate-2"
                        data-testid="button-demo"
                      >
                        Schedule a Demo
                      </button>
                      <button
                        onClick={() => console.log('Learn more clicked')}
                        className="px-6 py-3 border border-border rounded-md font-medium hover-elevate active-elevate-2"
                        data-testid="button-learn"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
