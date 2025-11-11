import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, AlertTriangle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreDisplayProps {
  score: number;
  className?: string;
}

function getScoreStatus(score: number) {
  if (score >= 81) return { label: "Excellent", color: "bg-green-500", icon: CheckCircle2 };
  if (score >= 61) return { label: "Good", color: "bg-blue-500", icon: AlertCircle };
  if (score >= 41) return { label: "Fair", color: "bg-amber-500", icon: AlertTriangle };
  return { label: "Poor", color: "bg-red-500", icon: XCircle };
}

export default function ScoreDisplay({ score, className }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const status = getScoreStatus(score);
  const Icon = status.icon;
  
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 50;
      const counter = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(counter);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, 20);
    }, 300);

    return () => clearTimeout(timer);
  }, [score]);

  return (
    <Card className={`p-10 md:p-12 ${className}`}>
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Your Travel Content Health Score</h2>
          <p className="text-sm text-muted-foreground">
            A diagnostic measure of your travel content health
          </p>
        </div>

        <div className="relative inline-block">
          <svg className="transform -rotate-90" width="280" height="280">
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="hsl(var(--border))"
              strokeWidth="16"
              fill="none"
            />
            <motion.circle
              cx="140"
              cy="140"
              r="120"
              stroke={`hsl(var(--chart-${score >= 81 ? '2' : score >= 61 ? '1' : score >= 41 ? '3' : '5'}))`}
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold font-mono" data-testid="text-score">
                {displayScore}
              </div>
              <div className="text-xl text-muted-foreground font-medium">/100</div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <Icon className={`h-5 w-5 ${status.color.replace('bg-', 'text-')}`} />
          <Badge
            className={`${status.color} text-white text-base px-4 py-1`}
            data-testid="badge-status"
          >
            {status.label}
          </Badge>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-muted-foreground max-w-md mx-auto"
        >
          {score >= 81 && "Your content management is in excellent health. Keep maintaining these strong practices."}
          {score >= 61 && score < 81 && "You're doing well, but there's room for optimization to maximize your content ROI."}
          {score >= 41 && score < 61 && "Your content health needs attention. PIXI can help you improve significantly."}
          {score < 41 && "Your content management has critical inefficiencies. PIXI offers immediate improvement opportunities."}
        </motion.p>
      </div>
    </Card>
  );
}
