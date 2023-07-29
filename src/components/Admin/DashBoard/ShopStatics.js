import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const ShopStatistics = () => {
    const [data, setData] = useState([]);
    const accessToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        axios
            .get('https://birdtradingplatformapi.azurewebsites.net/api/Admin/TotalAmount/HighShop', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [accessToken]);

    const chartData = {
        labels: data.shopNames,
        datasets: [
            {
                label: 'Sales',
                data: data.totalAmounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1000,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            animation: {
                duration: 1000,
            },
        },
    };

    return (
        <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <div className="card-title">Top 5 Cửa Hàng Doanh Thu Cao Nhất</div>
                    <div>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ShopStatistics;
