import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);



const SaleStatistics = () => {

    const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
    const accessToken = localStorage.getItem('jwtToken')
    useEffect(() => {
        axios.get('https://localhost:7241/api/Shop/Revenue_month', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                console.log(res.data);
                setMonthlyRevenueData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [accessToken]
    )
    // const monthlyRevenueData = [12000, 8000, 15000, 10000, 18000, 13000, 16000, 14000, 17000, 9000, 11000, 19000];

    const data = {
        labels: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ],
        datasets: [
            {
                label: 'Doanh Thu',
                data: monthlyRevenueData,
                backgroundColor: '#FF6384',
                hoverBackgroundColor: '#FF6384',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5000,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Doanh Thu: đ ${context.formattedValue}`,
                },
            },
        },
    };
    return (
        <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <div className="card-title" style={{ fontSize: "18px" }}>Thống kê Doanh Thu Theo Tháng</div>
                    {/* <iframe
                        style={{
                            background: "#FFFFFF",
                            border: "none",
                            borderRadius: "2px",
                            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                            width: "100%",
                            height: "350px",
                        }}
                        src="https://charts.mongodb.com/charts-project-0-eckjn/dashboards/64941e1d-b94d-4867-8d2d-21c2bd5af5ea?view=64941e1d-b94d-4f0c-871c-21c2bd5af5f1"
                    ></iframe> */}
                    <div style={{
                        background: "#FFFFFF",
                        border: "none",
                        width: "100%",
                        height: "350px",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Bar data={data} options={options} />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default SaleStatistics;
