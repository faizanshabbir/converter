import { useState } from 'react';

export default function NetworkSpeedConverter() {
  const [value, setValue] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<string>('Mbps');
  const [toUnit, setToUnit] = useState<string>('MBps');

  const units = [
    'Mbps', // Megabits per second
    'MBps', // Megabytes per second
    'Gbps', // Gigabits per second
    'GBps', // Gigabytes per second
  ];

  const convert = (value: number, from: string, to: string): number => {
    // Convert everything to bits per second first
    let bps = value;
    switch (from) {
      case 'MBps': bps = value * 8 * 1000000; break;
      case 'Mbps': bps = value * 1000000; break;
      case 'GBps': bps = value * 8 * 1000000000; break;
      case 'Gbps': bps = value * 1000000000; break;
    }

    // Convert from bps to target unit
    switch (to) {
      case 'MBps': return bps / (8 * 1000000);
      case 'Mbps': return bps / 1000000;
      case 'GBps': return bps / (8 * 1000000000);
      case 'Gbps': return bps / 1000000000;
      default: return bps;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Network Speed Converter</h2>
      
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
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

      <div className="text-center mb-8">
        <h3 className="text-xl text-gray-600 dark:text-gray-300">Result:</h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {convert(value, fromUnit, toUnit).toFixed(2)} {toUnit}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Quick Reference:</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• <strong>Mbps</strong> = Megabits per second (lowercase &apos;b&apos;)</li>
          <li>• <strong>MBps</strong> = Megabytes per second (uppercase &apos;B&apos;)</li>
          <li>• 1 MBps = 8 Mbps (1 byte = 8 bits)</li>
          <li>• Example: 100 Mbps internet = 12.5 MBps download speed</li>
        </ul>
      </div>
    </div>
  );
} 