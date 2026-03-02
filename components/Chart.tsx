"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale, LinearScale, BarElement, LineElement, PointElement,
    ArcElement, Title, Tooltip, Legend, Filler
);

interface ChartProps {
    type?: "bar" | "line" | "pie";
    title?: string;
    // Accept data as JSON string for MDX compatibility
    chartData?: string;
    // Or as individual simple props
    labels?: string;  // comma-separated
    values?: string;  // comma-separated numbers
    datasetLabel?: string;
}

export default function Chart({
    type = "bar",
    title,
    chartData,
    labels,
    values,
    datasetLabel = "Data",
}: ChartProps) {
    let parsedData;

    try {
        if (chartData) {
            parsedData = JSON.parse(chartData);
        } else if (labels && values) {
            const labelArr = labels.split(",").map((l) => l.trim());
            const valueArr = values.split(",").map((v) => parseFloat(v.trim()));
            parsedData = {
                labels: labelArr,
                datasets: [{
                    label: datasetLabel,
                    data: valueArr,
                    backgroundColor: labelArr.map((_, i) => {
                        const opacity = 0.3 + (i / labelArr.length) * 0.5;
                        return `rgba(0, 255, 136, ${opacity.toFixed(1)})`;
                    }),
                    borderColor: "#00ff88",
                    borderWidth: 1,
                }],
            };
        }
    } catch {
        // JSON parse failed
    }

    if (!parsedData || !parsedData.labels || !parsedData.datasets) {
        return (
            <div className="my-8 p-6 rounded-xl border border-border bg-card text-muted-foreground text-center text-sm">
                📊 Chart data unavailable
            </div>
        );
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { labels: { color: "#a3a3a3", font: { size: 12 } } },
            title: title
                ? { display: true, text: title, color: "#ededed", font: { size: 16, weight: "bold" as const } }
                : undefined,
        },
        scales: type !== "pie"
            ? {
                x: { ticks: { color: "#a3a3a3" }, grid: { color: "rgba(255,255,255,0.06)" } },
                y: { ticks: { color: "#a3a3a3" }, grid: { color: "rgba(255,255,255,0.06)" } },
            }
            : undefined,
    };

    const ChartComponent = { bar: Bar, line: Line, pie: Pie }[type] || Bar;

    return (
        <div className="my-8 p-6 rounded-xl border border-border bg-card">
            <ChartComponent data={parsedData} options={options} />
        </div>
    );
}
