import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = ({ stockData, stockName, isPredicted = false }) => {
    if (!stockData || stockData.length === 0) {
        return <p className="text-center text-gray-500">No stock data available.</p>;
    }

    const labels = Array.from({ length: stockData.length }, (_, i) => `Day ${i + 1}`);

    const data = {
        labels,
        datasets: [
            {
                label: isPredicted ? `Predicted Prices for ${stockName}` : `Actual Prices for ${stockName}`,
                data: stockData,
                borderColor: isPredicted ? "#FF5733" : "#1E90FF", 
                backgroundColor: isPredicted ? "rgba(255, 87, 51, 0.2)" : "rgba(30, 144, 255, 0.2)",
                fill: true,
                tension: 0.3,
                borderWidth: 3, 
                pointRadius: 5,
                pointBackgroundColor: isPredicted ? "#FF5733" : "#1E90FF",
                pointBorderColor: "#fff",
                pointHoverRadius: 8,
                pointHoverBorderColor: "#333",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: { size: 14 },
                    color: "#333",
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return `$${context.raw.toFixed(2)}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Days",
                    font: { size: 14 },
                    color: "#666",
                },
                grid: { color: "rgba(200,200,200,0.3)" },
            },
            y: {
                title: {
                    display: true,
                    text: "Stock Price ($)",
                    font: { size: 14 },
                    color: "#666",
                },
                grid: { color: "rgba(200,200,200,0.3)" },
            },
        },
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-center text-lg font-semibold mb-3">
                {isPredicted ? "Predicted Price Trend" : "Actual Price Trend"}
            </h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default StockChart;
