const User = require("../../model/userSchema");
const jwt = require("jsonwebtoken");

//** this function is for generating token */
function generateToken(id, role) {
  return (token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  }));
}

//** signup controller */
exports.signup = async (req, res, next) => {
  User.findOne({ email: req.body.email }).then(async (emailAlreadyExists) => {
    //exec is outdated and .then and .catch is used now alse  .then only gives one props

    try {
      if (emailAlreadyExists) {
        return res.status(400).json({
          status: "failed",
          message: "This Email already exists..!!!",
        });
      } else {
        const data = await User.create(req.body);  //no codition can be apply in this method

        // const user = new User(req.body);
        // const data = await user.save();

        const {
          _id,
          firstName,
          lastName,
          userName,
          email,
          hash_password,
          profilePicture,
          contactNumber,
          role,
        } = data;

        const token = generateToken(_id, role);

        return res.status(200).send({
          token: token,
          user: {
            firstName,
            lastName,
            userName,
            email,
            hash_password,
            profilePicture,
            contactNumber,
          },
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: "Something went wrong while registering!",
        error: error,
      });
    }
  });
};

//! try catch used for solving server crashing while facing any error

// user sign in controller
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).then(async (emailAlreadyExists) => {
    try {
      if (!emailAlreadyExists) {
        return res.status(400).json({
          status: "failed",
          message: "Please register first to login!!!",
        });
      } else {
        if (req.body.hash_password && emailAlreadyExists.role === "user") {
          const token = generateToken(
            emailAlreadyExists._id,
            emailAlreadyExists.role
          );
          const { _id, firstName, lastName, email, role, fullName } =
            emailAlreadyExists;
          res.status(200).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName },
          });
        } else {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
      }
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: "Something went wrong while login!",
        error: error,
      });
    }
  });
};
