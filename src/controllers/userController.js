import User from "../models/User.js";


export const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const {password, ...others} = user._doc;
        return res.status(200).json({status: true, ...others});
    }catch(error) {
        return res.status(500).json({status: false, message: 'error retrieving user'});
    }
}


export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        await User.findByIdAndDelete(userId);
        return res.status(200).json({status: true, message: 'User deleted successfully'});
    }catch(error) {
        return res.status(400).json({status: false, message: 'Error occured while deleting user'});
    }
}

export const updateUser = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: data,
        }, {
            new: true
        });
        const { password, ...others } = updatedUser._doc;
        return res.status(200).json({status: true, message: 'Use updated successfully', ...others});
    }catch (error) {
        return res.status(400).json({status: false, message: 'Error occured while updating user'});
    }
}