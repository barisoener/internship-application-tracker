import { Application } from "../types/Application";

const applications: Application[] = [
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

export const getAllApplications = () => {
    return applications;
};

export const addApplication = (
    company: string,
    position: string,
    status: string
) => {

    const newApplication: Application = {
        id: applications.length + 1,
        company,
        position,
        status
    };

    applications.push(newApplication);

    return newApplication;
};