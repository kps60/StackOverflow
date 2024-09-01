import mongoose from "mongoose"
import Question from "../modals/Questions.js"
import User from "../modals/users.js"
import Groq from "groq-sdk/index.mjs"
export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const postQuestion = new Question(postQuestionData);
    try {
        await postQuestion.save();
        return res.status(200).json({ message: "Posted a question successfully" })
    } catch (error) {
        return res.status(409).json("Couldn't post a new question")
    }
}
export const AskGroq = async (req, res) => {
    const messags = req.body;
    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
        const chatres = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "you are an problem solver an also a critical thinker and take decisions accordingly to the need of the user and you will recieve inputs in an object converted to String of questionTitle,questionBody, questionTags also suggest if the question is wrong."
                },
                {
                    role: "user",
                    content: JSON.stringify(messags),
                },
            ],
            model: "llama3-8b-8192",
            temperature: 0.5,
            top_p: 0.3
        })
        return res.status(200).json({ chats: chatres?.choices[0]?.message, message: "successfully Answer sent" })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
export const getAllQuestions = async (req, res) => {
    try {
        const questionsList = await Question.find();
        return res.status(200).json(questionsList);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: 'question unavailable...' });
    }
    try {
        await Question.findByIdAndDelete(_id)
        return res.status(200).json({ message: "successfully deleted..." })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
export const deleteAdminQues = async (req, res) => {
    const { id: _id } = req.params;
    const userid = req.userId;
    const email = process.env.ADMIN_EMAIL
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: 'question unavailable...' });
    }
    const adminuser = await User.findOne({ email })
    if (adminuser) {
        // console.log(adminuser._id.toString())
        if (adminuser._id.toString() === userid) {
            try {
                const data = await Question.findByIdAndDelete(_id)
                return res.status(200).json(data)
            } catch (error) {
                return res.status(404).json({ message: error.message })
            }
        } else {
            return res.status(404).json({ message: "you are not authorized to delete this question" });
        }
    }
}
export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ message: 'Not Authenticated' })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: 'question unavailable...' });
    }
    try {
        const question = await Question.findById(_id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId));
        const downIndex = question.downVote.findIndex((id) => id === String(userId));
        if (value === 'upVote') {
            if (downIndex !== -1) {
                question.downVote = question.downVote.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                question.upVote.push(userId);
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
        }
        else if (value === 'downVote') {
            if (upIndex !== -1) {
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                question.downVote.push(userId);
            } else {
                question.downVote = question.downVote.filter((id) => id !== String(userId));
            }
        }
        await Question.findByIdAndUpdate(_id, question);
        return res.status(200).json({ message: "updated succesfully" });
    } catch (error) {
        return res.status(404).json({ message: "id does not match" });
    }
}