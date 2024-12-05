const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./道/任天堂");

const app = express();
const PORT = process.env.PORT;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
