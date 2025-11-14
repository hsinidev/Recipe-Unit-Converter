
import { Unit } from '../types';
import { UNIT_DATA } from './UnitRatios';

interface ConversionResult {
  value: number;
  ratio: number;
}

export function convertUnits(amount: number, fromUnit: Unit, toUnit: Unit): ConversionResult | null {
  const fromUnitInfo = UNIT_DATA[fromUnit];
  const toUnitInfo = UNIT_DATA[toUnit];

  if (!fromUnitInfo || !toUnitInfo || fromUnitInfo.category !== toUnitInfo.category) {
    // Cannot convert between different categories (e.g., mass to volume)
    return null;
  }

  // Convert the input amount to the base unit of its category
  const amountInBase = amount * fromUnitInfo.toBase;

  // Convert from the base unit to the target unit
  const convertedValue = amountInBase / toUnitInfo.toBase;

  // Calculate the direct ratio for display (1 fromUnit = X toUnit)
  const directRatio = fromUnitInfo.toBase / toUnitInfo.toBase;

  return {
    value: convertedValue,
    ratio: directRatio,
  };
}
