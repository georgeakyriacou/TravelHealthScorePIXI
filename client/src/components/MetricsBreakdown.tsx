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
  return `${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
}

export default function MetricsBreakdown({
  laborCostDrain,
  totalOpportunity,
  contentAtRisk,
  bookingValue,
  roiPotential,
  className,
}: MetricsBreakdownProps) {
  const metrics = [
    {
      title: "Productivity Loss",
      value: formatCurrency(laborCostDrain),
      description: "High-value labor wasted on manual admin tasks",
      icon: AlertTriangle,
      color: "text-red-500",
      delay: 0.2,
    },
    {
      title: "Discovery Opportunity",
      value: formatCurrency(totalOpportunity),
      description: "Incremental revenue PIXI can generate through content reach",
      icon: TrendingUp,
      color: "text-green-500",
      delay: 0.3,
    },
    {
      title: "Content Investment at Risk",
      value: formatCurrency(contentAtRisk),
      description: "Annual exposure from inconsistent branding and slow velocity",
      icon: DollarSign,
      color: "text-amber-500",
      delay: 0.4,
    },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: metric.delay, duration: 0.5 }}
            >
              <Card className="p-6 space-y-3 hover-elevate">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p
                      className="text-2xl font-semibold font-mono"
                      data-testid={`text-metric-${index}`}
                    >
                      {metric.value}
                    </p>
                  </div>
                  <Icon className={`h-5 w-5 ${metric.color} flex-shrink-0`} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="p-8 bg-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Revenue at Stake per Booking</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Every day an advisor waits for content, this revenue is at risk
              </p>
            </div>
            <div className="text-3xl font-bold font-mono text-primary" data-testid="text-booking-value">
              {formatCurrency(bookingValue)}
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold">Total ROI Potential</h3>
            <div className="text-5xl md:text-6xl font-bold text-primary font-mono" data-testid="text-roi">
              {formatPercent(roiPotential)}
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Based on combined productivity savings, revenue opportunities, and risk mitigation,
              compared to PIXI's annual subscription cost
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
