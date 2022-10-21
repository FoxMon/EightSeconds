import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export function chartRegistry() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
}

export function barChartOptions(chartTitle: string) {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Kg",
        },
      },
      x: {
        title: {
          display: true,
          text: "연도",
        },
      },
    },
  };
}

export function lineChartOptions(chartTitle: string) {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "t",
        },
      },
      x: {
        title: {
          display: true,
          text: "연도",
        },
      },
    },
  };
}
