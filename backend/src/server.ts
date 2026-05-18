import express from "express";

const app = express();

const PORT = 3000;

const applications = [
    {
        id: 1,
        company: "BMW",
        position: "Software Engineer Intern",
        status: "Applied"
    },
    {
        id: 2,
        company: "Audi",
        position: "Backend Intern",
        status: "Interview"
    }
];

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.get("/applications", (req, res) => {
    res.json(applications);
});

app.post("/applications", (req, res) => {
    const newApplication = {
        id: 3,
        company: "adesso",
        position: "Frontend Intern",
        status: "Applied"
    };

    applications.push(newApplication);

    res.json({
        message: "Application added successfully",
        application: newApplication
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});