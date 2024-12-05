const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const request = require("../config/database");

const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

async function findUserByEmail(email) {
    const query = "SELECT * FROM User WHERE email = ?";
    const [users] = await request.query(query, [email]);
    return users[0];
}

async function findUserByPassword(password) {
    const query = "SELECT * FROM User WHERE password = ?";
    const [users] = await request.query(query, [password]);
    return users[0];
}

async function createUser(user) {
    const query =
        "INSERT INTO User (email, password, username) VALUES (?, ?, ?)";
    return await request.query(query, [
        user.email,
        user.password,
        user.username,
    ]);
}

async function updateUserInDb(user) {
    const query = "UPDATE User SET password = ?, username = ? WHERE email = ?";
    return await request.query(query, [
        user.password,
        user.username,
        user.email,
    ]);
}

async function deleteUserByEmail(email) {
    const query = "DELETE FROM User WHERE email = ?";
    return await request.query(query, [email]);
}

async function findAllUsers() {
    const query = "SELECT * FROM User";
    const [users] = await request.query(query);
    return users;
}

router.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await findUserByEmail(email);
        const existingPassword = await findUserByPassword(password);

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
            });
        }

        if (existingPassword) {
            return res.status(400).json({
                message: "User already exists with this password",
                email: email,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await createUser({ email, password: hashedPassword, username });

        const token = jwt.sign({ email }, ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await findAllUsers();
        const formattedUsers = users.map((user) => ({
            id: user.id,
            email: user.email,
            username: user.username,
        }));
        res.status(200).json({ users: formattedUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/update", async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        let updatedPassword = existingUser.password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedPassword = await bcrypt.hash(password, salt);
        }

        await updateUserInDb({ email, password: updatedPassword, username });
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        await deleteUserByEmail(email);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/user", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
