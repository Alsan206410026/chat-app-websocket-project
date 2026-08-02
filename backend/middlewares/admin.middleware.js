const adminProtect = (req, res, next) => {
  if (res.user && res.user.role !== 'admin') {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }
  next();
};

module.exports = { adminProtect };