
import { Unit, UnitCategory, UnitInfo } from '../types';

export const UNIT_DATA: Record<Unit, UnitInfo> = {
  // Mass units (Base: gram)
  gram: { name: 'Gram (g)', category: UnitCategory.MASS, toBase: 1 },
  kilogram: { name: 'Kilogram (kg)', category: UnitCategory.MASS, toBase: 1000 },
  ounce: { name: 'Ounce (oz)', category: UnitCategory.MASS, toBase: 28.3495 },
  pound: { name: 'Pound (lb)', category: UnitCategory.MASS, toBase: 453.592 },

  // Volume units (Base: milliliter)
  milliliter: { name: 'Milliliter (ml)', category: UnitCategory.VOLUME, toBase: 1 },
  liter: { name: 'Liter (l)', category: UnitCategory.VOLUME, toBase: 1000 },
  fluid_ounce_us: { name: 'Fluid Ounce (fl oz)', category: UnitCategory.VOLUME, toBase: 29.5735 },
  cup_us: { name: 'Cup (US)', category: UnitCategory.VOLUME, toBase: 236.588 },
  pint_us: { name: 'Pint (US)', category: UnitCategory.VOLUME, toBase: 473.176 },
  quart_us: { name: 'Quart (US)', category: UnitCategory.VOLUME, toBase: 946.353 },
  gallon_us: { name: 'Gallon (US)', category: UnitCategory.VOLUME, toBase: 3785.41 },
  tablespoon_us: { name: 'Tablespoon (tbsp)', category: UnitCategory.VOLUME, toBase: 14.7868 },
  teaspoon_us: { name: 'Teaspoon (tsp)', category: UnitCategory.VOLUME, toBase: 4.92892 },
};

export const UNITS_BY_CATEGORY = Object.entries(UNIT_DATA).reduce((acc, [key, value]) => {
  if (!acc[value.category]) {
    acc[value.category] = [];
  }
  acc[value.category].push(key as Unit);
  return acc;
}, {} as Record<UnitCategory, Unit[]>);
