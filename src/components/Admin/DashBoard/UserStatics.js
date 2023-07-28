import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


const UserStatics = () => {
    const [data, setData] = useState([]);
    const accessToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        axios
            .get('https://birdtradingplatformapi.azurewebsites.net/api/Admin/TopUsers', {
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
        labels: data.name,
        datasets: [
            {
                label: 'Sales',
                data: data.totalAmounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y', // Hiển thị dữ liệu theo trục y (ngang)
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1000,
                },
            },
        },
    };
    return (
        <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <div className="card-title">Top 5 Khách Hàng Mua Nhiều Nhất</div>
                    <div>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </article>
            </div>
        </div>
    )
}

export default UserStatics;