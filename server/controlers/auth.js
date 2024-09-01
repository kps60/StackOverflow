import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../modals/users.js"

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(404).json({ message: "User Already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({ name, email, password: hashedPassword })
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRECT, { expiresIn: '1h' });
        return res.status(200).json({ result: newUser, token })
    } catch (error) {
        return res.status(500).json("something went wrong...")
    }
}
export const login = async (req, res) => {
    const { email } = req.body;
    try {
        const existinguser = await User.findOne({ email });
        if (!existinguser) {
            return res.status(404).json({ message: "User don't Exists" });
        }
        if (existinguser.admin === true) {
            if (req.body.password != existinguser.password) {
                return res.status(400).json({ message: "Invalid password" });
            }
        }else{
            const isPasswordCrt = await bcrypt.compare(req.body.password, existinguser.password);
            if (!isPasswordCrt) {
                return res.status(400).json({ message: "Invalid password" });
            }
        }
        // const nopass=existinguser.filter()
        const { password, ...filteredObject } = existinguser;
        const token = jwt.sign({ email: filteredObject._doc.email, id: filteredObject._doc._id }, process.env.JWT_SECRECT, { expiresIn: '1h' });
        return res.status(200).json({ result: filteredObject._doc, token });
    } catch (error) {
        return res.status(500).json("something went wrong...");
    }
}