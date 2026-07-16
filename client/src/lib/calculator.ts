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

const BASIC_BRACKETS = [
  { from: 1, to: 3, rate: 99 },
  { from: 4, to: 15, rate: 79 },
  { from: 16, to: 30, rate: 69 },
  { from: 31, to: 50, rate: 59 },
  { from: 51, to: Infinity, rate: 49 },
];

const PRO_BRACKETS = [
  { from: 1, to: 3, rate: 299 },
  { from: 4, to: 15, rate: 238.6 },
  { from: 16, to: 30, rate: 208.39 },
  { from: 31, to: 50, rate: 178.19 },
  { from: 51, to: Infinity, rate: 148.99 },
];

function calculateGraduatedMonthlyTotal(hotels: number, brackets: typeof BASIC_BRACKETS): number {
  let total = 0;
  for (const bracket of brackets) {
    if (hotels < bracket.from) break;
    const cap = bracket.to === Infinity ? hotels : Math.min(hotels, bracket.to);
    total += (cap - bracket.from + 1) * bracket.rate;
  }
  return total;
}

export function calculateBasicAnnualCost(hotels: number): number {
  return calculateGraduatedMonthlyTotal(hotels, BASIC_BRACKETS) * 12;
}

export function calculateProAnnualCost(hotels: number): number {
  return calculateGraduatedMonthlyTotal(hotels, PRO_BRACKETS) * 12;
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
      return 2;
  }
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

  const pixiCost = calculateBasicAnnualCost(properties);
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
