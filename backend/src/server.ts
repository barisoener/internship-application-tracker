import express from "express";

const app = express();

//Gelen request body JSON ise, bunu oku ve req.body içine koy.
app.use(express.json());

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
        id: applications.length+1,
        company: req.body.company,
        position: req.body.position,
        status: req.body.status
    };

    applications.push(newApplication);

    //201 cretated
    res.status(201).json({
        message: "Application added successfully",
        application: newApplication
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});