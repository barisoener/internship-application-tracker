
import { Request, Response } from "express";
import {
    getAllApplications,
    addApplication
} from "../services/applicationService";


export const getApplications = async (req: Request, res: Response)=> {
    const applications = await getAllApplications();

    res.json(applications);
};

export const createApplication = async (req: Request, res: Response) => {

    if (!req.body.company || !req.body.position || !req.body.status) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newApplication =  await addApplication(
    req.body.company,
    req.body.position,
    req.body.status
  );

    
    res.status(201).json({
        message: "Application added successfully",
        application: newApplication
    });
};