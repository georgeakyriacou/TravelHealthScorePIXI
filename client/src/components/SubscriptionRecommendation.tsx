import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles, ExternalLink, Check } from "lucide-react";
import { calculateBasicAnnualCost, calculateProAnnualCost } from "@/lib/calculator";

interface SubscriptionRecommendationProps {
  portfolioSize: string;
  roomKeys?: number;
}

function getPropertyCount(portfolioSize: string): number {
  switch (portfolioSize) {
    case "single":
      return 1;
    case "small":
      return 3;
    case "large":
      return 8;
    default:
      return 1;
  }
}

function formatPrice(annual: number): string {
  const monthly = Math.round(annual / 12);
  return `£${monthly.toLocaleString("en-GB")}/mo`;
}

function formatAnnual(annual: number): string {
  return `£${Math.round(annual).toLocaleString("en-GB")}/yr`;
}

const BASIC_FEATURES = [
  "Digital Asset Management",
  "Showcases — shareable live galleries",
  "Listed on the travel advisor network",
  "Search & sort media library",
  "Share links with expiry dates",
  "2GB included storage",
  "Limited analytics",
];

const PRO_FEATURES = [
  "Everything in Basic",
  "Distribution to elite travel advisor network",
  "Personalised branded showcases",
  "Advanced analytics & reporting",
  "Featured exposure on the network",
  "Intelligent search visibility",
  "100GB included storage",
];

export default function SubscriptionRecommendation({
  portfolioSize,
}: SubscriptionRecommendationProps) {
  const hotels = getPropertyCount(portfolioSize);
  const basicAnnual = calculateBasicAnnualCost(hotels);
  const proAnnual = calculateProAnnualCost(hotels);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="p-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Your Recommended PIXI Subscription</h3>
            <p className="text-sm text-muted-foreground">
              Pricing for {hotels} {hotels === 1 ? "hotel" : "hotels"} — annual billing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-6 space-y-4 flex flex-col">
              <div className="space-y-1">
                <Badge variant="secondary" className="mb-2">Basic</Badge>
                <p className="text-2xl font-bold" data-testid="text-basic-price">
                  {formatPrice(basicAnnual)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatAnnual(basicAnnual)} billed annually
                </p>
              </div>

              <ul className="space-y-2 flex-1">
                {BASIC_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full gap-2"
                data-testid="button-basic-trial"
                asChild
              >
                <a
                  href="https://www.pixigroup.ai/pricing-plan?utm_source=calculator&utm_medium=referral&utm_campaign=health_score&plan=basic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Free 14-Day Trial
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="border-2 border-primary rounded-md p-6 space-y-4 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3">Recommended</Badge>
              </div>

              <div className="space-y-1">
                <Badge variant="default" className="mb-2">Pro</Badge>
                <p className="text-2xl font-bold" data-testid="text-pro-price">
                  {formatPrice(proAnnual)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatAnnual(proAnnual)} billed annually
                </p>
              </div>

              <ul className="space-y-2 flex-1">
                {PRO_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full gap-2"
                data-testid="button-pro-trial"
                asChild
              >
                <a
                  href="https://www.pixigroup.ai/pricing-plan?utm_source=calculator&utm_medium=referral&utm_campaign=health_score&plan=pro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Free 14-Day Trial
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Pay monthly available at +15%. All plans include a free 14-day trial with no card required.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
