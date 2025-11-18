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
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Your Recommended PIXI Subscription</h3>
          </div>

          {isEnterprise ? (
            <div className="space-y-4">
              <div className="text-center py-8 space-y-4">
                <Badge className="text-lg px-6 py-2 bg-primary text-primary-foreground">
                  Enterprise Level
                </Badge>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Please book a bespoke demo with our Sales team
                </p>
                <div className="pt-4">
                  <Button
                    size="lg"
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge
                    className="text-base px-4 py-1 bg-primary text-primary-foreground mb-2"
                    data-testid="badge-tier-name"
                  >
                    {tier.name} Plan
                  </Badge>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" data-testid="text-tier-price">
                    {tier.price}
                  </p>
                  <p className="text-xs text-muted-foreground">15% off annual billing</p>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  className="w-full gap-2"
                  data-testid="button-start-trial"
                  asChild
                >
                  <a
                    href={`https://www.pixigroup.ai/pricing-plan?utm_source=calculator&utm_medium=referral&utm_campaign=health_score&plan=${tier.name.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Free Trial
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
