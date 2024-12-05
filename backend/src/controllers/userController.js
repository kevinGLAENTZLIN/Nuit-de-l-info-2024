const UserService = require("../services/userService");

class UserController {
    async register(req, res) {
        try {
            const { email, password, username } = req.body;

            if (!email || !password || !username) {
                return res
                    .status(400)
                    .json({ message: "All fields are required" });
            }

            const token = await UserService.register({
                email,
                password,
                username,
            });
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({
                message: "User list retrieved successfully.",
                users,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { password, email, username } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            await UserService.updateUser({ password, email, username });
            res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            await UserService.deleteUser(email);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            const user = await UserService.getUser(email);
            res.status(200).json({
                message: "User retrieved successfully.",
                user,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
