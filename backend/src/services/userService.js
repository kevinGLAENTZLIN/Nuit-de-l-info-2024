const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/userRepository");

class UserService {
    async register(userData) {
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        await UserRepository.create(userData);

        const token = jwt.sign(
            { email: userData.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" },
        );

        return token;
    }

    async getAllUsers() {
        const users = await UserRepository.findAll();
        return users.map((user) => ({
            id: user.id,
            email: user.email,
            username: user.username,
        }));
    }

    async updateUser(userData) {
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (!existingUser) {
            throw new Error("User not found");
        }

        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        } else {
            userData.password = existingUser.password;
        }

        await UserRepository.update(userData);
    }

    async deleteUser(email) {
        const existingUser = await UserRepository.findByEmail(email);
        if (!existingUser) {
            throw new Error("User not found");
        }

        await UserRepository.delete(email);
    }

    async getUser(email) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
        };
    }
}

module.exports = new UserService();
