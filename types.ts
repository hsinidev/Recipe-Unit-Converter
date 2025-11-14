
export enum UnitCategory {
  MASS = 'Mass (Weight)',
  VOLUME = 'Volume',
}

export type Unit =
  // Mass
  | 'gram'
  | 'kilogram'
  | 'ounce'
  | 'pound'
  // Volume
  | 'milliliter'
  | 'liter'
  | 'fluid_ounce_us'
  | 'cup_us'
  | 'pint_us'
  | 'quart_us'
  | 'gallon_us'
  | 'tablespoon_us'
  | 'teaspoon_us';

export interface UnitInfo {
  name: string;
  category: UnitCategory;
  toBase: number; // Factor to convert this unit to its category's base unit (gram or milliliter)
}
