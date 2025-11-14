import React, { useState, useMemo, useCallback } from 'react';
import { Unit } from '../types';
import { UNIT_DATA, UNITS_BY_CATEGORY } from '../lib/UnitRatios';
import { convertUnits } from '../lib/ConversionLogic';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';

const UnitSelector: React.FC<{
  value: Unit;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  label: string;
}> = ({ value, onChange, id, label }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
        <label htmlFor={id} className="text-sm font-medium text-gray-300 text-left">{label}</label>
        <div className="relative">
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg py-3 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            >
                {Object.entries(UNITS_BY_CATEGORY).map(([category, units]) => (
                <optgroup key={category} label={category} className="bg-gray-800 text-gray-300">
                    {units.map((unitKey) => (
                    <option key={unitKey} value={unitKey}>
                        {UNIT_DATA[unitKey].name}
                    </option>
                    ))}
                </optgroup>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDownIcon />
            </div>
        </div>
    </div>
  );
};


const UnitConverterTool: React.FC = () => {
    const [amount, setAmount] = useState<string>('1');
    const [fromUnit, setFromUnit] = useState<Unit>('cup_us');
    const [toUnit, setToUnit] = useState<Unit>('milliliter');
    
    const conversionResult = useMemo(() => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount < 0) return null;
        return convertUnits(numericAmount, fromUnit, toUnit);
    }, [amount, fromUnit, toUnit]);

    const handleFromUnitChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFromUnit = e.target.value as Unit;
        setFromUnit(newFromUnit);
        
        const fromCategory = UNIT_DATA[newFromUnit].category;
        const toCategory = UNIT_DATA[toUnit].category;
        
        if (fromCategory !== toCategory) {
            const defaultTarget = UNITS_BY_CATEGORY[fromCategory].find(u => u !== newFromUnit) || UNITS_BY_CATEGORY[fromCategory][0];
            setToUnit(defaultTarget);
        }
    }, [toUnit]);

    const handleToUnitChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newToUnit = e.target.value as Unit;
        const fromCategory = UNIT_DATA[fromUnit].category;
        const toCategory = UNIT_DATA[newToUnit].category;

        if (fromCategory !== toCategory) {
            // This case should ideally not happen due to the logic in handleFromUnitChange,
            // but as a fallback, we keep them compatible.
             const defaultSource = UNITS_BY_CATEGORY[toCategory].find(u => u !== newToUnit) || UNITS_BY_CATEGORY[toCategory][0];
             setFromUnit(defaultSource);
        }
        setToUnit(newToUnit);
    }, [fromUnit]);

    const handleSwapUnits = useCallback(() => {
        const fromCategory = UNIT_DATA[fromUnit].category;
        const toCategory = UNIT_DATA[toUnit].category;
        if(fromCategory === toCategory) {
            setFromUnit(toUnit);
            setToUnit(fromUnit);
        }
    }, [fromUnit, toUnit]);
    
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-sky-500/10">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="amount" className="text-sm font-medium text-gray-300">Amount to Convert</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g., 1.5"
                        min="0"
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-lg"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                    <UnitSelector id="from-unit" label="From" value={fromUnit} onChange={handleFromUnitChange} />
                    <button onClick={handleSwapUnits} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200" aria-label="Swap units">
                        <ArrowPathIcon />
                    </button>
                    <UnitSelector id="to-unit" label="To" value={toUnit} onChange={handleToUnitChange} />
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
                {conversionResult ? (
                    <div className="text-center">
                        <p className="text-gray-400 text-lg">
                           {amount || 0} {UNIT_DATA[fromUnit].name} is
                        </p>
                        <p className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-purple-400 my-2 drop-shadow-lg">
                            {conversionResult.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                        </p>
                        <p className="text-gray-400 text-lg">
                            {UNIT_DATA[toUnit].name}
                        </p>
                        <p className="mt-6 text-sm text-gray-500 bg-white/5 rounded-full px-4 py-1.5 inline-block">
                            1 {UNIT_DATA[fromUnit].name.split(' ')[0]} ≈ {conversionResult.ratio.toPrecision(4)} {UNIT_DATA[toUnit].name.replace(/s\)$/,')').replace(/\(s\)/,'') + 's'}
                        </p>
                    </div>
                ) : (
                    <div className="text-center text-yellow-400 bg-yellow-900/50 border border-yellow-400/30 rounded-lg py-4 px-2">
                        <p className="font-semibold">Invalid Conversion</p>
                        <p className="text-sm">Please select units of the same type (e.g., Mass to Mass).</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UnitConverterTool;
