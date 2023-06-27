import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductsStatistics = () => {

    const weeklyRevenueData = [1200, 800, 1500, 1000, 1800, 1300, 1600];

    const totalRevenue = weeklyRevenueData.reduce((sum, revenue) => sum + revenue, 0);

    const revenuePercentages = weeklyRevenueData.map(revenue => (revenue / totalRevenue) * 100);

    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                data: revenuePercentages,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0', '#E91E63'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0', '#E91E63'],
            },
        ],
    };

    const options = {

        responsive: true,
        maintainAspectRatio: true,
        legend: {
            position: 'right',
            labels: {
                fontColor: '#333',
                fontSize: 12,
            },
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const percentage = dataset.data[tooltipItem.index];
                    return `${data.labels[tooltipItem.index]}: ${percentage.toFixed(2)}%`;
                },
            },
        },
    };

    return (
        <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <h5 className="card-title">Products statistics</h5>
                    <div style={{
                        background: "#FFFFFF",
                        border: "none",
                        width: "100%",
                        height: "350px",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Doughnut data={data} options={options} />
                    </div>

                    {/* <iframe
                        style={{
                            background: "#FFFFFF",
                            border: "none",
                            borderRadius: "2px",
                            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                            width: "100%",
                            height: "350px",
                        }}
                        src="https://charts.mongodb.com/charts-project-0-eckjn/dashboards/64941e1d-b94d-4867-8d2d-21c2bd5af5ea?view=64941e1d-b94d-4138-8f20-21c2bd5af5ef"
                    ></iframe> */}


                </article>
            </div>
        </div>
    );
};

export default ProductsStatistics;