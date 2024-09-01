import express from "express";
import { AskQuestion, AskGroq, getAllQuestions, deleteQuestion, voteQuestion, deleteAdminQues } from '../controlers/Questions.js'
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post('/Ask', auth, AskQuestion);
router.post('/Askgroq', auth, AskGroq);
router.get('/get', getAllQuestions)
router.delete('/delete/:id', auth, deleteQuestion);
router.patch('/vote/:id', auth, voteQuestion);
router.delete("/admin/delete/:id", auth, deleteAdminQues)
export default router;