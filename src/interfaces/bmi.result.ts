import { GenderEnum } from "src/dto/bmi.input.dto";

export interface BmiResult {
  Gender: GenderEnum;
  HeightCm: number;
  WeightKg: number;
  BMI: number;
  Category: string;
  HealthRisk: string;
}

export interface BmiCalculatorResult {
  Person: BmiResult[];
  totalOverweight: number;
}