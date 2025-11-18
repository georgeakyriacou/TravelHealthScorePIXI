import type { CalculatorFormValues } from "@/components/CalculatorForm";
import type { CalculatorResult } from "@shared/schema";

const CONSTANTS = {
  WORKING_DAYS_PER_YEAR: 220,
  AVG_SM_ANNUAL_SALARY: 82500,
  ANNUAL_WORKING_HOURS: 1760,
  CONSERVATIVE_RISK_FACTOR: 0.1,
  AVERAGE_LENGTH_OF_STAY: 5,
  INCREMENTAL_BOOKINGS_PER_PROPERTY: 20,
  MAX_OPPORTUNITY_BENCHMARK: 500000,
};

const PIXI_PRICING = {
  SMALL: 2040,
  MEDIUM: 5100,
  LARGE: 7140,
  ENTERPRISE: 5100,
};

function getPropertyCount(portfolioSize: string): number {
  switch (portfolioSize) {
    case "single":
      return 1;
    case "small":
      return 3;
    case "large":
      return 8;
    default:
      return 2;
  }
}

function getPixiCost(portfolioSize: string, roomKeys?: number): number {
  if (portfolioSize === "small" || portfolioSize === "large") {
    return PIXI_PRICING.ENTERPRISE;
  }
  
  if (portfolioSize === "single" && roomKeys !== undefined && roomKeys !== null) {
    if (roomKeys <= 25) {
      return PIXI_PRICING.SMALL;
    } else if (roomKeys <= 80) {
      return PIXI_PRICING.MEDIUM;
    } else {
      return PIXI_PRICING.LARGE;
    }
  }
  
  return PIXI_PRICING.MEDIUM;
}

export function calculatePCC(input: CalculatorFormValues): CalculatorResult {
  const properties = getPropertyCount(input.portfolioSize);
  
  const avgHourlyRate = CONSTANTS.AVG_SM_ANNUAL_SALARY / CONSTANTS.ANNUAL_WORKING_HOURS;
  
  const annualWastedHours = input.hoursPerWeek * 52;
  
  const laborCostDrain = avgHourlyRate * annualWastedHours;
  
  const totalContentBudget = input.annualBudget * properties;
  
  const contentAtRisk = totalContentBudget * CONSTANTS.CONSERVATIVE_RISK_FACTOR;
  
  const bookingValue = input.adr * CONSTANTS.AVERAGE_LENGTH_OF_STAY;
  
  const totalOpportunity = bookingValue * CONSTANTS.INCREMENTAL_BOOKINGS_PER_PROPERTY * properties;
  
  const maxLaborCost = 50000;
  const productivityScore = Math.max(0, 30 * (1 - laborCostDrain / maxLaborCost));
  
  const consistencyIndex = Math.max(0, 35 * (1 - contentAtRisk / (totalContentBudget * 0.23)));
  
  const discoveryValueScore = Math.min(35, 35 * (totalOpportunity / CONSTANTS.MAX_OPPORTUNITY_BENCHMARK));
  
  const pccScore = Math.round(productivityScore + consistencyIndex + discoveryValueScore);
  
  const pixiCost = getPixiCost(input.portfolioSize, input.roomKeys);
  const totalGain = laborCostDrain + totalOpportunity + contentAtRisk;
  const roiPotential = (totalGain / pixiCost) * 100;

  return {
    pccScore,
    productivityScore: Math.round(productivityScore),
    consistencyIndex: Math.round(consistencyIndex),
    discoveryValueScore: Math.round(discoveryValueScore),
    laborCostDrain,
    totalOpportunity,
    contentAtRisk,
    bookingValue,
    roiPotential,
    pixiCost,
  };
}
