import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

import dayjs from 'dayjs';



ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type Reading = {
  id: string;
  label: string;
  readingValue: number;
  ds_sk: Date | string;
};


export default function ReadingChart() {
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://2oapwpr2f9.execute-api.us-east-1.amazonaws.com/newstage/reading');
      const data = await res.json();
      if (Array.isArray(JSON.parse(data.body)?.items)) setReadings(JSON.parse(data.body)?.items.slice(-20));
      else if (Array.isArray(data.Items)) setReadings(data.Items);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: readings.map((_, i) => `${dayjs(_.ds_sk).format('ddd h:mm A')}`), // simple x-axis
    datasets: [
      {
        label: 'Reading Value',
        data: readings.map(r => r.readingValue),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 20,
      max: 35, 
      ticks: {
        stepSize: 10,
      },
    },
  },
};

  return (
    <div>
      <Line data={chartData} options={chartOptions}/>
    </div>
  );
}
