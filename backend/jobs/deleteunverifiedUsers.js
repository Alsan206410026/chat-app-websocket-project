const User = require('../models/User');

const deleteUnverifiedUsers = async () => {
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: twentyFourHoursAgo }
    });

    console.log(`Deleted ${result.deletedCount} unverified users.`);
  } catch (error) {
    console.error("Error deleting unverified users:", error);
  }
};

module.exports = deleteUnverifiedUsers;