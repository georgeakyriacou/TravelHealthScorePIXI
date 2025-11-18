import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, AlertTriangle, Target } from "lucide-react";
import { motion } from "framer-motion";

interface MetricsBreakdownProps {
  laborCostDrain: number;
  totalOpportunity: number;
  contentAtRisk: number;
  bookingValue: number;
  roiPotential: number;
  className?: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${Math.ceil(value).toLocaleString('en-GB')}%`;
}

function formatRatio(percentage: number): string {
  const ratio = percentage / 100;
  return `${Math.ceil(ratio).toLocaleString('en-GB')}:1`;
}

export default function MetricsBreakdown({
  laborCostDrain,
  totalOpportunity,
  contentAtRisk,
  bookingValue,
  roiPotential,
  className,
}: MetricsBreakdownProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="p-8" style={{ backgroundColor: '#F2EDE9' }}>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Productivity Loss</h3>
              </div>
              <div className="text-4xl md:text-5xl font-bold font-mono text-primary" data-testid="text-metric-0">
                {formatCurrency(laborCostDrain)}
              </div>
              <p className="text-sm text-muted-foreground">
                The amount of money your team is wasting on admin from high-value labour.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="p-8" style={{ backgroundColor: '#F2EDE9' }}>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Revenue at Stake per Booking</h3>
              </div>
              <div className="text-4xl md:text-5xl font-bold font-mono text-primary" data-testid="text-booking-value">
                {formatCurrency(bookingValue)}
              </div>
              <p className="text-sm text-muted-foreground">
                Every time a Travel Designer waits for content, this revenue is at risk
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold">Total ROI Potential</h3>
            <div className="text-5xl md:text-6xl font-bold text-primary font-mono" data-testid="text-roi">
              {formatRatio(roiPotential)}
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              For every £1 invested in PIXI, you gain this much in combined productivity savings, revenue opportunities, and risk mitigation
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
