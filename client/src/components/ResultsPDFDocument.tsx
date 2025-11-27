import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { CalculatorResult } from "@shared/schema";

const primaryColor = "#8B7355";
const mutedColor = "#666666";
const backgroundColor = "#F2EDE9";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
    borderBottom: `2px solid ${primaryColor}`,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 10,
    color: mutedColor,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333333",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: backgroundColor,
    borderRadius: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: primaryColor,
  },
  scoreLabel: {
    fontSize: 12,
    color: mutedColor,
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    backgroundColor: backgroundColor,
    borderRadius: 6,
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 10,
    color: mutedColor,
    marginBottom: 6,
    textAlign: "center",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: primaryColor,
    textAlign: "center",
  },
  roiCard: {
    padding: 20,
    backgroundColor: primaryColor,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  roiLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  roiValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  roiDescription: {
    fontSize: 9,
    color: "#FFFFFF",
    marginTop: 8,
    textAlign: "center",
    opacity: 0.9,
  },
  recommendationCard: {
    padding: 20,
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  recommendationTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 8,
  },
  tierName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  tierPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 4,
  },
  tierDescription: {
    fontSize: 9,
    color: mutedColor,
    textAlign: "center",
    maxWidth: 300,
  },
  assumptionsContainer: {
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 6,
  },
  assumptionRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: primaryColor,
    marginRight: 8,
    marginTop: 4,
  },
  assumptionText: {
    fontSize: 9,
    color: mutedColor,
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTop: `1px solid #EEEEEE`,
    paddingTop: 12,
  },
  footerText: {
    fontSize: 8,
    color: mutedColor,
  },
  ctaSection: {
    padding: 20,
    backgroundColor: backgroundColor,
    borderRadius: 8,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 10,
    color: mutedColor,
    textAlign: "center",
    marginBottom: 12,
  },
  ctaUrl: {
    fontSize: 10,
    color: primaryColor,
    fontWeight: "bold",
  },
});

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRatio(percentage: number): string {
  const ratio = percentage / 100;
  return `${Math.ceil(ratio).toLocaleString("en-GB")}:1`;
}

function getScoreStatus(score: number): string {
  if (score >= 81) return "Excellent";
  if (score >= 61) return "Good";
  if (score >= 41) return "Fair";
  return "Poor";
}

function getTierInfo(roomKeys: number, isEnterprise: boolean): { name: string; price: string; description: string } | null {
  if (isEnterprise) {
    return {
      name: "Enterprise",
      price: "Custom Pricing",
      description: "Bespoke solution for property groups. Contact our Sales team for a tailored demo.",
    };
  }
  
  if (roomKeys <= 25) {
    return {
      name: "Small Plan",
      price: "£2,040/year",
      description: "Starter package for smaller hotels looking to improve their content strategy.",
    };
  } else if (roomKeys <= 80) {
    return {
      name: "Medium Plan",
      price: "£5,100/year",
      description: "Designed for hotels with growing content libraries, looking to power up their distribution.",
    };
  } else {
    return {
      name: "Large Plan",
      price: "£7,140/year",
      description: "Perfect for larger hotels with established content libraries and a strong social presence.",
    };
  }
}

interface ResultsPDFDocumentProps {
  result: CalculatorResult;
  portfolioSize: string;
  roomKeys: number;
}

export default function ResultsPDFDocument({
  result,
  portfolioSize,
  roomKeys,
}: ResultsPDFDocumentProps) {
  const isEnterprise = portfolioSize === "small" || portfolioSize === "large";
  const tierInfo = getTierInfo(roomKeys, isEnterprise);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Travel Content Health Report</Text>
          <Text style={styles.subtitle}>
            Powered by PIXI Group | Generated on {new Date().toLocaleDateString("en-GB")}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Travel Content Health Score</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreValue}>{result.pccScore}/100</Text>
            <Text style={styles.scoreLabel}>
              Status: {getScoreStatus(result.pccScore)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Detailed Breakdown</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Productivity Loss</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(result.laborCostDrain)}
              </Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Revenue at Stake per Booking</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(result.bookingValue)}
              </Text>
            </View>
          </View>

          <View style={styles.roiCard}>
            <Text style={styles.roiLabel}>Total ROI Potential</Text>
            <Text style={styles.roiValue}>{formatRatio(result.roiPotential)}</Text>
            <Text style={styles.roiDescription}>
              For every £1 invested in PIXI, you gain this much in combined productivity savings, revenue opportunities, and risk mitigation
            </Text>
          </View>
        </View>

        {tierInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended PIXI Subscription</Text>
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>Based on Your Profile</Text>
              <Text style={styles.tierName}>{tierInfo.name}</Text>
              <Text style={styles.tierPrice}>{tierInfo.price}</Text>
              <Text style={styles.tierDescription}>{tierInfo.description}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Assumptions</Text>
          <View style={styles.assumptionsContainer}>
            <View style={styles.assumptionRow}>
              <View style={styles.bullet} />
              <Text style={styles.assumptionText}>
                Average Sales & Marketing Director salary: £82,500/year
              </Text>
            </View>
            <View style={styles.assumptionRow}>
              <View style={styles.bullet} />
              <Text style={styles.assumptionText}>Working days per year: 220</Text>
            </View>
            <View style={styles.assumptionRow}>
              <View style={styles.bullet} />
              <Text style={styles.assumptionText}>Annual working hours: 1,760</Text>
            </View>
            <View style={styles.assumptionRow}>
              <View style={styles.bullet} />
              <Text style={styles.assumptionText}>Average length of stay: 5 days</Text>
            </View>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Improve Your Score?</Text>
          <Text style={styles.ctaText}>
            Elevate your story, expand your audience, and protect the integrity of your brand with PIXI.
          </Text>
          <Text style={styles.ctaUrl}>www.pixigroup.ai/book-a-demo</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} PIXI Group | www.pixigroup.ai
          </Text>
        </View>
      </Page>
    </Document>
  );
}
