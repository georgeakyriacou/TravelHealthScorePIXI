import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { CalculatorResult } from "@shared/schema";

const primaryColor = "#E91E8C";
const mutedColor = "#666666";
const backgroundColor = "#FDF2F8";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 24,
    textAlign: "center",
    borderBottom: `2px solid ${primaryColor}`,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 10,
    color: mutedColor,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: backgroundColor,
    borderRadius: 8,
  },
  scoreValue: {
    fontSize: 42,
    fontWeight: "bold",
    color: primaryColor,
  },
  scoreLabel: {
    fontSize: 11,
    color: mutedColor,
    marginTop: 4,
  },
  recommendationCard: {
    padding: 16,
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: 8,
    alignItems: "center",
  },
  recommendationTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 6,
  },
  tierName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  tierPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 4,
  },
  tierDescription: {
    fontSize: 9,
    color: mutedColor,
    textAlign: "center",
    maxWidth: 280,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  metricCard: {
    flex: 1,
    padding: 14,
    backgroundColor: backgroundColor,
    borderRadius: 6,
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 9,
    color: mutedColor,
    marginBottom: 5,
    textAlign: "center",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: primaryColor,
    textAlign: "center",
  },
  roiCard: {
    padding: 18,
    backgroundColor: primaryColor,
    borderRadius: 8,
    alignItems: "center",
  },
  roiLabel: {
    fontSize: 11,
    color: "#FFFFFF",
    marginBottom: 6,
  },
  roiValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  roiDescription: {
    fontSize: 8,
    color: "#FFFFFF",
    marginTop: 6,
    textAlign: "center",
    opacity: 0.9,
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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} PIXI Group | www.pixigroup.ai
          </Text>
        </View>
      </Page>
    </Document>
  );
}
