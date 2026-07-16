import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import type { CalculatorResult } from "@shared/schema";
import pixiLogo from "@assets/PIXI Logos_PIXI Logo Colour_1764243448135.png";
import { calculateBasicAnnualCost, calculateProAnnualCost } from "@/lib/calculator";

const primaryColor = "#E91E8C";
const mutedColor = "#666666";
const backgroundColor = "#FDF2F8";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 40,
    objectFit: "contain",
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
  plansRow: {
    flexDirection: "row",
    gap: 10,
  },
  planCard: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
  },
  planCardPro: {
    flex: 1,
    padding: 14,
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: 8,
  },
  planBadge: {
    fontSize: 8,
    fontWeight: "bold",
    color: mutedColor,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  planBadgePro: {
    fontSize: 8,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  planPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 2,
  },
  planPriceAnnual: {
    fontSize: 9,
    color: mutedColor,
    marginBottom: 8,
  },
  planFeature: {
    fontSize: 8,
    color: "#444444",
    marginBottom: 3,
  },
  planCta: {
    marginTop: 8,
    padding: 6,
    backgroundColor: primaryColor,
    borderRadius: 4,
    alignItems: "center",
  },
  planCtaOutline: {
    marginTop: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 4,
    alignItems: "center",
  },
  planCtaText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  planCtaTextOutline: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#555555",
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
  metricDescription: {
    fontSize: 8,
    color: mutedColor,
    textAlign: "center",
    marginTop: 6,
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

function getPropertyCount(portfolioSize: string): number {
  switch (portfolioSize) {
    case "single": return 1;
    case "small": return 3;
    case "large": return 8;
    default: return 1;
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
}: ResultsPDFDocumentProps) {
  const hotels = getPropertyCount(portfolioSize);
  const basicAnnual = calculateBasicAnnualCost(hotels);
  const proAnnual = calculateProAnnualCost(hotels);
  const basicMonthly = Math.round(basicAnnual / 12);
  const proMonthly = Math.round(proAnnual / 12);

  const BASIC_FEATURES = [
    "Digital Asset Management",
    "Showcases — shareable galleries",
    "Listed on travel advisor network",
    "Share links with expiry dates",
    "2GB included storage",
    "Limited analytics",
  ];

  const PRO_FEATURES = [
    "Everything in Basic",
    "Elite travel advisor distribution",
    "Personalised branded showcases",
    "Advanced analytics & reporting",
    "Featured exposure on the network",
    "100GB included storage",
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={pixiLogo} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Travel Content Health Report</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString("en-GB")}
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
              <Text style={styles.metricDescription}>
                The amount of money your team wastes on high-value staff manually sending links and files
              </Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Revenue at Stake per Booking</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(result.bookingValue)}
              </Text>
              <Text style={styles.metricDescription}>
                Revenue value of each booking based on your ADR and average length of stay
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended PIXI Subscription ({hotels} {hotels === 1 ? "hotel" : "hotels"}, annual billing)</Text>
          <View style={styles.plansRow}>
            <View style={styles.planCard}>
              <Text style={styles.planBadge}>Basic</Text>
              <Text style={styles.planPrice}>£{basicMonthly.toLocaleString("en-GB")}/mo</Text>
              <Text style={styles.planPriceAnnual}>{formatCurrency(basicAnnual)}/yr billed annually</Text>
              {BASIC_FEATURES.map((f) => (
                <Text key={f} style={styles.planFeature}>• {f}</Text>
              ))}
              <View style={styles.planCtaOutline}>
                <Text style={styles.planCtaTextOutline}>Start Free 14-Day Trial</Text>
              </View>
            </View>

            <View style={styles.planCardPro}>
              <Text style={styles.planBadgePro}>Pro — Recommended</Text>
              <Text style={styles.planPrice}>£{proMonthly.toLocaleString("en-GB")}/mo</Text>
              <Text style={styles.planPriceAnnual}>{formatCurrency(proAnnual)}/yr billed annually</Text>
              {PRO_FEATURES.map((f) => (
                <Text key={f} style={styles.planFeature}>• {f}</Text>
              ))}
              <View style={styles.planCta}>
                <Text style={styles.planCtaText}>Start Free 14-Day Trial</Text>
              </View>
            </View>
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
