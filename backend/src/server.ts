import express from "express";
import applicationRoutes from "./routes/applicationRoutes";
import "./config/db";


const app = express();

app.use(express.json());

app.use("/applications", applicationRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});