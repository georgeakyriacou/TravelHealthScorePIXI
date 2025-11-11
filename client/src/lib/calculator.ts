import type { CalculatorFormValues } from "@/components/CalculatorForm";
import type { CalculatorResult } from "@shared/schema";

const CONSTANTS = {
  WORKING_DAYS_PER_YEAR: 220,
  AVG_SM_ANNUAL_SALARY: 82500,
  ANNUAL_WORKING_HOURS: 1760,
  AVG_ANNUAL_PIXI_COST: 5100,
  CONSERVATIVE_RISK_FACTOR: 0.1,
  AVERAGE_LENGTH_OF_STAY: 5,
  INCREMENTAL_BOOKINGS_PER_PROPERTY: 20,
  MAX_OPPORTUNITY_BENCHMARK: 500000,
};

export function calculatePCC(input: CalculatorFormValues): CalculatorResult {
  const avgHourlyRate = CONSTANTS.AVG_SM_ANNUAL_SALARY / CONSTANTS.ANNUAL_WORKING_HOURS;
  
  const annualWastedHours = input.hoursPerWeek * 52;
  
  const laborCostDrain = avgHourlyRate * annualWastedHours;
  
  const totalContentBudget = input.annualBudget * input.properties;
  
  const contentAtRisk = totalContentBudget * CONSTANTS.CONSERVATIVE_RISK_FACTOR;
  
  const bookingValue = input.adr * CONSTANTS.AVERAGE_LENGTH_OF_STAY;
  
  const totalOpportunity = bookingValue * CONSTANTS.INCREMENTAL_BOOKINGS_PER_PROPERTY * input.properties;
  
  const maxLaborCost = 50000;
  const productivityScore = Math.max(0, 30 * (1 - laborCostDrain / maxLaborCost));
  
  const consistencyIndex = Math.max(0, 35 * (1 - contentAtRisk / (totalContentBudget * 0.23)));
  
  const discoveryValueScore = Math.min(35, 35 * (totalOpportunity / CONSTANTS.MAX_OPPORTUNITY_BENCHMARK));
  
  const pccScore = Math.round(productivityScore + consistencyIndex + discoveryValueScore);
  
  const totalGain = laborCostDrain + totalOpportunity + contentAtRisk;
  const roiPotential = (totalGain / CONSTANTS.AVG_ANNUAL_PIXI_COST) * 100;

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
  };
}
