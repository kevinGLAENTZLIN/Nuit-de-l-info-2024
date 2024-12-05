const request = require("../config/database");

class UserRepository {
    async findByEmail(email) {
        const query = "SELECT * FROM User WHERE email = ?";
        const [users] = await request.query(query, [email]);
        return users[0];
    }

    async create(user) {
        const query =
            "INSERT INTO User (email, password, username) VALUES (?, ?, ?)";
        return await request.query(query, [
            user.email,
            user.password,
            user.username,
        ]);
    }

    async findAll() {
        const query = "SELECT * FROM User";
        const [users] = await request.query(query);
        return users;
    }

    async update(user) {
        const query =
            "UPDATE User SET password = ?, username = ? WHERE email = ?";
        return await request.query(query, [
            user.password,
            user.username,
            user.email,
        ]);
    }

    async delete(email) {
        const query = "DELETE FROM User WHERE email = ?";
        return await request.query(query, [email]);
    }
}

module.exports = new UserRepository();
