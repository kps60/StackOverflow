import users from "../modals/users.js"
import mongoose from "mongoose";
import Questions from "../modals/Questions.js"
import { updateNoOfQuestions } from "./Answers.js";
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find().select('-password');
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        // this return  the data from database which is updated after this statement because of using 3rd prop called new 
        const updateProfile = await users.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true });
        return res.status(200).json(updateProfile);
    } catch (error) {
        return res.status(405).json({ message: error.message });
    }
}

export const deleteProfile = async (req, res) => {
    const { id: _id } = req.params;
    const userid = req.userId;
    const email = process.env.ADMIN_EMAIL;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('user unavailable...');
    }
    // console.log(userId)
    const adminuser = await users.findOne({ email })
    if (adminuser) {
        // console.log(adminuser._id.toString())
        if (adminuser._id.toString() === userid) {
            try {
                const deleteProfile = await users.findByIdAndDelete(_id)
                const questions = await Questions.find({ userId: _id })
                await questions.map(async (question) => {
                    await Questions.findByIdAndDelete(question._id)
                })
                const ques = await Questions.find({ "answer.userId": _id });
                // console.log(ques)
                if (ques.length !== null) {
                    for (const question of ques) {
                        // Remove all answers from the user
                        const userAnswersCount = question.answer.filter(answer => answer.userId === userid).length;
                        await Questions.findByIdAndUpdate(
                            { _id: question._id },
                            { $pull: { 'answer': { userId: _id } } },
                            { $inc: { noOfAnswers: -userAnswersCount } }
                        );
                    }
                }

                return res.status(200).json(deleteProfile);
            } catch (error) {
                return res.status(404).json({ message: error.message })
            }
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this user" });
        }
    }
    // console.log(adminuser)

}
