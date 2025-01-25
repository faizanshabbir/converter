import { useState } from 'react';
import InfoCard from '../components/InfoCard';
import DarkModeToggle from '../components/DarkModeToggle';
import NetworkSpeedConverter from '../components/NetworkSpeedConverter';

export default function ByteConverter() {
  const [value, setValue] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<string>('bits');
  const [toUnit, setToUnit] = useState<string>('bytes');

  const units = [
    'bits',
    'bytes',
    'kilobytes',
    'megabytes',
    'gigabytes',
    'megabits',
    'gigabits'
  ];

  const convert = (value: number, from: string, to: string): number => {
    // Convert everything to bits first
    let bits = value;
    switch (from) {
      case 'bytes': bits *= 8; break;
      case 'kilobytes': bits *= 8 * 1024; break;
      case 'megabytes': bits *= 8 * 1024 * 1024; break;
      case 'gigabytes': bits *= 8 * 1024 * 1024 * 1024; break;
      case 'megabits': bits *= 1024 * 1024; break;
      case 'gigabits': bits *= 1024 * 1024 * 1024; break;
    }

    // Convert from bits to target unit
    switch (to) {
      case 'bytes': return bits / 8;
      case 'kilobytes': return bits / (8 * 1024);
      case 'megabytes': return bits / (8 * 1024 * 1024);
      case 'gigabytes': return bits / (8 * 1024 * 1024 * 1024);
      case 'megabits': return bits / (1024 * 1024);
      case 'gigabits': return bits / (1024 * 1024 * 1024);
      default: return bits;
    }
  };

  return (
    <div className="min-h-screen p-8">
      <DarkModeToggle />
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        ByteWise
        <span className="block text-lg text-gray-600 dark:text-gray-400 mt-2">
          Bits, Bytes & Network Speed Converter
        </span>
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Byte Size Converter</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="border dark:border-gray-600 p-2 rounded w-40 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter value"
            />
            
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="border dark:border-gray-600 p-2 rounded w-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            
            <span className="text-gray-500 dark:text-gray-400">to</span>
            
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="border dark:border-gray-600 p-2 rounded w-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl text-gray-600 dark:text-gray-300">Result:</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {convert(value, fromUnit, toUnit).toFixed(2)} {toUnit}
            </p>
          </div>
        </div>

        <NetworkSpeedConverter />

        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard 
            title="Common Binary Conversions"
            conversions={[
              { from: "Byte", to: "Bits", ratio: "8" },
              { from: "Kilobyte", to: "Bytes", ratio: "1,024" },
              { from: "Megabyte", to: "Kilobytes", ratio: "1,024" },
              { from: "Gigabyte", to: "Megabytes", ratio: "1,024" },
            ]}
          />
          <InfoCard 
            title="Network Speed Examples"
            conversions={[
              { from: "100 Mbps", to: "MBps", ratio: "12.5" },
              { from: "1 Gbps", to: "MBps", ratio: "125" },
              { from: "1 MBps", to: "Mbps", ratio: "8" },
              { from: "1 GBps", to: "Gbps", ratio: "8" },
            ]}
          />
        </div>
      </div>
    </div>
  );
} 