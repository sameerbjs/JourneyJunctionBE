import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { JWTService } from "../services/JWTservice.js";
import { userDTO } from "../dto/user.js";

export const authController = {
    async register(req, res, next) {
        const { full_name, email, password, country, state, profile_img } = req.body;

        try {
            const emailExsist = await User.exists({ email });
            if (emailExsist) {
                const error = {
                    status: 409,
                    message: "Email already registered, use another email!",
                };
                return next(error);
            }
        } catch (error) {
            return next(error);
        }

        const hashedPass = await bcrypt.hash(password, 10);
        let user;

        try {
            const userToRegister = new User({
                full_name: full_name,
                email: email,
                password: hashedPass,
                country: country,
                state: state,
                profile_img: profile_img
            });

            user = await userToRegister.save();
        } catch (error) {
            return next(error);
        }

        const userDto = new userDTO(user);

        return res.status(200).send({ user: userDto, auth: true });
    },

    async login(req, res, next) {
        const { email, password } = req.body;
        let user;
        try {
            user = await User.findOne({ email: email });

            if (!user) {
                const error = {
                    status: 401,
                    message: "User dose not exsist.",
                };
                return next(error);
            }

            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                const error = {
                    status: 401,
                    message: "Invalid email or password",
                };
                return next(error);
            }
        } catch (error) {
            return next(error);
        }

        // update refresh token in db
        const accessToken = JWTService.signAccessToken(
            { _id: user._id },
            "604800s"
        );

        const userDto = new userDTO(user);
        return res
            .status(200)
            .send({ user: userDto, token: accessToken, auth: true });
    },

    async updatePassword(req, res, next) {
        const { id } = req.params;

        try {
            const { current_password, new_password } = req.body;
            const user = await User.findById(id);

            // Verify the current password
            const passwordMatch = await bcrypt.compare(
                current_password,
                user.password
            );

            if (!passwordMatch) {
                const error = {
                    status: 401,
                    message: "Incorrect current password",
                };
                return next(error);
            }

            const hashedNewPassword = await bcrypt.hash(new_password, 10);

            user.password = hashedNewPassword;
            await user.save();
            return res
                .status(200)
                .json({ message: "Password updated successfully" });
        } catch (error) {
            return next(error);
        }
    },

    async updateProfileImage(req, res, next) {
        const { id } = req.params;

        try {
            const { profile_image } = req.body;
            const user = await User.findById(id);

            if (!profile_image) {
                const error = {
                    status: 401,
                    message: "Please change image first",
                };
                return next(error);
            }

            user.profile_img = profile_image;
            await user.save();
            const userDto = new userDTO(user);

            return res.status(200).send({
                user: userDto,
                message: "Profile image update successfully",
            });
        } catch (error) {
            return next(error);
        }
    },

    async updateProfile(req, res, next) {
        const { id } = req.params;

        try {
            const { full_name, email } = req.body;
            const user = await User.findById(id);

            user.full_name = full_name;
            user.email = email;
            await user.save();
            const userDto = new userDTO(user);

            return res.status(200).send({
                user: userDto,
                message: "Profile update successfully",
            });
        } catch (error) {
            return next(error);
        }
    },
};
