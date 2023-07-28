import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductsStatistics = () => {
    const [week, setWeeklyRevenueData] = useState({});
    const accessToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        axios.get('https://birdtradingplatformapi.azurewebsites.net/api/Shop/Revenue_week', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                setWeeklyRevenueData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [accessToken]);

    if (!week.dailyRevenue || !week.weekdays) {
        return null; // or render a loading indicator
    }

    const weeklyRevenueData = week.dailyRevenue;
    const dates = week.weekdays;

    const totalRevenue = weeklyRevenueData.reduce((sum, revenue) => sum + revenue, 0);
    const revenuePercentages = weeklyRevenueData.map(revenue => (revenue / totalRevenue) * 100);

    // Function to get the Vietnamese day of the week
    const getVietnameseDayOfWeek = (dayOfWeek) => {
        const vietnameseDays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        return vietnameseDays[dayOfWeek];
    };

    const formattedDates = dates.map(dateString => {
        const date = new Date(dateString);
        const dayOfWeek = getVietnameseDayOfWeek(date.getDay());
        const day = date.getDate();
        const month = date.toLocaleDateString('vi-VN', { month: 'long' });
        const year = date.getFullYear();
        const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;
        return formattedDate;
    });

    const formattedDatesWithDay = dates.map(dateString => {
        const date = new Date(dateString);
        const dayOfWeek = date.toLocaleDateString('vi-VN', { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleDateString('vi-VN', { month: 'long' });
        const year = date.getFullYear();
        const formattedDateWithDay = `${dayOfWeek}, ${day} ${month} ${year}`;
        return formattedDateWithDay;
    });

    const data = {
        labels: formattedDatesWithDay,
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
                    return `${formattedDates[tooltipItem.index]}: ${percentage.toFixed(2)}%`;
                },
            },
        },
    };

    return (
        <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <div className="card-title" style={{ fontSize: "18px" }}>Thống Kê Doanh Thu Tuần</div>
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
                </article>
            </div>
        </div>
    );
};

export default ProductsStatistics;
