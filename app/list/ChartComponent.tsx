import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { subDays, isAfter, parseISO, compareAsc } from 'date-fns';

interface ChartComponentProps {
  sleepData: Array<{ date: string; duration: number }>;
}

const chartConfig = {
  duration: {
    label: 'Duration',
    color: '#2563eb',
  },
};

export const ChartComponent: React.FC<ChartComponentProps> = ({
  sleepData,
}) => {
  const sevenDaysAgo = subDays(new Date(), 7);

  const filteredAndSortedData = sleepData
    .filter((entry) => isAfter(parseISO(entry.date), sevenDaysAgo))
    .sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));

  if (filteredAndSortedData.length === 0)
    return <div>There is no sleep entry for this user in the last 7 days</div>;

  const chartData = filteredAndSortedData.map((entry) => ({
    date: entry.date.slice(0, 10),
    duration: entry.duration,
  }));

  return (
    <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="duration" fill="var(--color-duration)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
