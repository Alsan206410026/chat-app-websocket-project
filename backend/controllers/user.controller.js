const User = require("../models/User.js");

const getUsersForSidebar = async (req, res) => {
  try {
   const loggedInUserId = req.user._id;

   //all users
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password") //filter out the logged-in user and exclude the password field of the users from the response

    return res.status(200).json({
      message: "Users retrieved successfully",
      data: allUsers,
    });


  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "An error occurred while retrieving users." });
  }
};

module.exports = {
  getUsersForSidebar
};