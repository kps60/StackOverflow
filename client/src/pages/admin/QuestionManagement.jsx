import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllQuestions } from "../../actions/question";
import QuestionsTable from "./components/QuestionsTable"
import "./styles.css"
const QuestionManagement = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questionsReducer);
  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  if (!questions?.data || !Array.isArray(questions?.data)) {
    return <div>Loading...</div>;
  }
  return (
    <div className="user-management">
      <h2>Questions Management</h2>
      {questions?.data?.length !== 0 && <QuestionsTable dt={questions?.data} />}
    </div>
  );
};

export default QuestionManagement;

