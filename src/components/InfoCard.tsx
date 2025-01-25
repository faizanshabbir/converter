interface InfoCardProps {
  title: string;
  conversions: { from: string; to: string; ratio: string }[];
}

export default function InfoCard({ title, conversions }: InfoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
      <ul className="space-y-2">
        {conversions.map((conversion, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            1 {conversion.from} = {conversion.ratio} {conversion.to}
          </li>
        ))}
      </ul>
    </div>
  );
} 