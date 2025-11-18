import { useState } from "react";
import { Card } from "@/components/ui/card";
import CalculatorForm, { type CalculatorFormValues } from "@/components/CalculatorForm";
import ScoreDisplay from "@/components/ScoreDisplay";
import MetricsBreakdown from "@/components/MetricsBreakdown";
import { calculatePCC } from "@/lib/calculator";
import type { CalculatorResult } from "@shared/schema";
import { motion } from "framer-motion";
import { useIframeResize } from "@/hooks/useIframeResize";

export default function CalculatorPage() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  useIframeResize();

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
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Travel Content Health Score
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base text-muted-foreground max-w-2xl mx-auto"
            >
              Discover your Travel Content Health Score - a diagnostic measure that highlights hidden gaps, missed revenue, and the opportunities PIXI can unlock to elevate your story and drive real ROI.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-semibold">Enter Your Details</h2>
                <p className="text-sm text-muted-foreground">
                  Share your property information to receive an accurate, tailored assessment of your Travel Content Health Score.
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
                    Understanding the potential impact a poor Travel Content Health score has on your business
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
                      Your content deserves to be discovered. With PIXI, you elevate your story, expand your audience, and protect the integrity of your brand. Let's bring your content to its full potential.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <a
                        href="https://www.pixigroup.ai/book-a-demo?utm_source=PIXI+website+&utm_medium=website+&utm_campaign=roi_calculator&utm_id=roi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover-elevate active-elevate-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        data-testid="button-demo"
                      >
                        Schedule a Demo
                      </a>
                      <a
                        href="https://www.pixigroup.ai/pricing-plan?utm_source=PIXI+website+&utm_medium=website+&utm_campaign=roi_calculator&utm_id=roi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-border rounded-md font-medium hover-elevate active-elevate-2 outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2"
                        data-testid="button-learn"
                      >
                        Learn More
                      </a>
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
