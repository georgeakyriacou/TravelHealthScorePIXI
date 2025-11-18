import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles, ExternalLink } from "lucide-react";

interface SubscriptionRecommendationProps {
  portfolioSize: string;
  roomKeys?: number;
}

function getTierFromRoomKeys(roomKeys: number): {
  name: string;
  description: string;
  price: string;
} {
  if (roomKeys <= 25) {
    return {
      name: "Small",
      description: "Starter package for smaller hotels looking to improve their content strategy.",
      price: "£2,040/year",
    };
  } else if (roomKeys <= 80) {
    return {
      name: "Medium",
      description: "Designed for hotels with growing content libraries, looking to power up their distribution.",
      price: "£5,100/year",
    };
  } else {
    return {
      name: "Large",
      description: "Perfect for larger hotels with established content libraries and a strong social presence.",
      price: "£7,140/year",
    };
  }
}

export default function SubscriptionRecommendation({
  portfolioSize,
  roomKeys,
}: SubscriptionRecommendationProps) {
  const isEnterprise = portfolioSize === "small" || portfolioSize === "large";
  const tier = !isEnterprise && roomKeys !== undefined && roomKeys !== null ? getTierFromRoomKeys(roomKeys) : null;

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
          </div>

          {isEnterprise ? (
            <div className="space-y-4">
              <div className="text-center py-8 space-y-4">
                <div className="text-lg font-semibold text-primary">
                  Enterprise Level
                </div>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Please book a bespoke demo with our Sales team
                </p>
                <div className="pt-4">
                  <Button
                    className="gap-2"
                    data-testid="button-book-demo"
                    asChild
                  >
                    <a
                      href="https://www.pixigroup.ai/enterprise?utm_source=calculator&utm_medium=referral&utm_campaign=health_score"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a Demo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : tier ? (
            <div className="space-y-6 text-center">
              <div className="space-y-3">
                <div className="text-lg font-semibold text-primary" data-testid="text-tier-name">
                  {tier.name} Plan
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">{tier.description}</p>
                <div className="pt-2">
                  <p className="text-2xl font-bold" data-testid="text-tier-price">
                    {tier.price}
                  </p>
                  <p className="text-xs text-muted-foreground">15% off annual billing</p>
                </div>
              </div>

              <div>
                <Button
                  className="gap-2"
                  data-testid="button-start-trial"
                  asChild
                >
                  <a
                    href={`https://www.pixigroup.ai/pricing-plan?utm_source=calculator&utm_medium=referral&utm_campaign=health_score&plan=${tier.name.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Free 14-Day Trial
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Please enter your room keys to see a personalized subscription recommendation.</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
