
const otpAuth = (req, res, next) => {
    try {
        const user 
        req.user={ userId :  };
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
    next();
};

module.exports = otpAuth;