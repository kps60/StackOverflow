import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Container, Grid } from '@mui/material';

import { fetchAllQuestions } from "../../../actions/question"
import BarChart from './BarChart';
import { fetchAllUsers } from '../../../actions/users';

const QuestionsChart = () => {
    const questions = useSelector(state => state.questionsReducer.data) || []
    const users = useSelector(state => state.usersReducer) || []
    const dispatch = useDispatch();

    const currentDate = moment();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        dispatch(fetchAllQuestions());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // Filter data for specific timeframes
    const questionsLastWeek = questions.filter(q => moment(q.askedOn).isAfter(currentDate.clone().subtract(7, 'days')));
    const questionsLastMonth = questions.filter(q => moment(q.askedOn).isAfter(currentDate.clone().subtract(1, 'months')));
    const questionsLastYear = questions.filter(q => moment(q.askedOn).isAfter(currentDate.clone().subtract(1, 'years')));

    const usersLastWeek = users.filter(u => moment(u.joinedOn).isAfter(currentDate.clone().subtract(7, 'days')));
    const usersLastMonth = users.filter(u => moment(u.joinedOn).isAfter(currentDate.clone().subtract(1, 'months')));
    const usersLastYear = users.filter(u => moment(u.joinedOn).isAfter(currentDate.clone().subtract(1, 'years')));

    // Function to group data by day of the week
    const groupByDayOfWeek = (data) => {
        const grouped = Array(7).fill(0); // Initialize array with 7 days (Mon-Sun)
        data.forEach(item => {
            const day = moment(item.askedOn || item.joinedOn).weekday();
            grouped[day]++;
        });
        return grouped;
    };

    // Function to group data by weeks of the month
    const groupByWeekOfMonth = (data) => {
        const grouped = Array(4).fill(0); // Initialize array with 4 weeks
        data.forEach(item => {
            const week = Math.floor(moment(item.askedOn || item.joinedOn).date() / 7);
            grouped[week]++;
        });
        return grouped;
    };

    // Function to group data by month
    const groupByMonth = (data) => {
        const grouped = Array(12).fill(0); // Initialize array with 12 months
        data.forEach(item => {
            const month = moment(item.askedOn || item.joinedOn).month();
            grouped[month]++;
        });
        return grouped;
    };

    const dataWeek = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Questions',
                data: groupByDayOfWeek(questionsLastWeek),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const userWeek = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Users',
                data: groupByDayOfWeek(usersLastWeek),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const dataMonth = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Questions',
                data: groupByWeekOfMonth(questionsLastMonth),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const userMonth = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Users',
                data: groupByWeekOfMonth(usersLastMonth),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const dataYear = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Questions',
                data: groupByMonth(questionsLastYear),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const userYear = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Users',
                data: groupByMonth(usersLastYear),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Container>
            <Grid container spacing={3} marginTop={'2rem'}>
                <Grid item xs={12} sm={6} md={4}>
                    <BarChart data={dataWeek} options={options} title="Questions Last Week" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BarChart data={dataMonth} options={options} title="Questions Last Month" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BarChart data={dataYear} options={options} title="Questions Last Year" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BarChart data={userWeek} options={options} title="Users Last Week" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BarChart data={userMonth} options={options} title="Users Last Month" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BarChart data={userYear} options={options} title="Users Last Year" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default QuestionsChart;
