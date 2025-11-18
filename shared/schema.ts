import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const calculatorInputSchema = z.object({
  properties: z.number().min(1).max(100),
  adr: z.number().min(0),
  hoursPerWeek: z.number().min(0).max(168),
  annualBudget: z.number().min(0),
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;

export interface CalculatorResult {
  pccScore: number;
  productivityScore: number;
  consistencyIndex: number;
  discoveryValueScore: number;
  laborCostDrain: number;
  totalOpportunity: number;
  contentAtRisk: number;
  bookingValue: number;
  roiPotential: number;
  pixiCost: number;
}
