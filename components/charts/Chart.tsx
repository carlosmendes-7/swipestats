import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export function Chart(props: {
  title: string;
  datasets: {
    key: string;
    data: { x: string; y: number }[];
    label: string;
    borderColor: string;
    backgroundColor: string;
  }[];
}) {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState<any>(null);

  const options = {
    // type: 'line' as 'line',
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'month',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: props.title,
      },
    },
  };

  const chartConfig = {
    type: 'line' as const,
    data: {
      datasets: props.datasets,
    },
    options,
  };

  console.log('chart', props.title, props);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      // @ts-ignore
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}
