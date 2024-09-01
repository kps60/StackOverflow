import React from "react";
import FlexBetween from "./components/FlexBetween";
import {
    Box
} from "@mui/material";
import QuestionManagement from './QuestionManagement';
import QuestionsChart from './components/QuestionsChart';

const Dashboard = () => {

    return (
        <Box m="0vw 2.5rem">
            <FlexBetween>
                {/* <QuestionsList /> */}
                <QuestionsChart />
            </FlexBetween>
        </Box>
    );
};

export default Dashboard;