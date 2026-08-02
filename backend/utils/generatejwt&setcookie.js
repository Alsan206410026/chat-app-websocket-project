const jwt = require("jsonwebtoken");

const generateToken = (id, res) => {
    const token = jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "15d",
        }
    );

    res.cookie("jwt", token, {
        httpOnly: true, //prevent client-side JavaScript from accessing the cookie
        secure: false, //set to true if using HTTPS
        sameSite: "strict", //prevent CSRF attacks
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return token;

};

module.exports = { generateToken };