import users from "../modals/users.js"
import mongoose from "mongoose";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find();
        const allUserDetails = [];
        allUsers.forEach((users) => {
            allUserDetails.push({ _id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn });
        });
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
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
        res.status(200).json(updateProfile);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
}