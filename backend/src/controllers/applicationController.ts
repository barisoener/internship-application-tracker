
import { Request, Response } from "express";
import {
    getAllApplications,
    addApplication,
    getApplicationById,
    updateApplication,
    deleteApplication
} from "../services/applicationService";


export const getApplications = async (req: Request, res: Response)=> {
    const applications = await getAllApplications();

    res.json(applications);
};


export const getApplication = async (req: Request, res: Response) => {

    //to change url coming string into number
    const id = Number(req.params.id);

    if (isNaN(id)) {
    return res.status(400).json({
        message: "Invalid ID"
    });
}

    const application = await getApplicationById(id);

    if (!application) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    res.json(application);
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


export const editApplication = async (req: Request, res: Response) => {

    const id = Number(req.params.id);
    
    //to check whether the id is incorrect
    if (isNaN(id)) {
    return res.status(400).json({
        message: "Invalid ID"
    });
}

    const { company, position, status } = req.body;

    if (!company || !position || !status) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const updatedApplication = await updateApplication(
        id,
        company,
        position,
        status
    );

    //that id can not be exist in database
    if (!updatedApplication) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    res.json(updatedApplication);
};



export const removeApplication = async ( req: Request, res: Response) => {

    const id = Number(req.params.id);

    //to check whether id is incorrect
    if (isNaN(id)) {
    return res.status(400).json({
        message: "Invalid ID"
    });
}
    const deletedApplication = await deleteApplication(id);

    if (!deletedApplication) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    res.json({
        message: "Application deleted successfully",
        application: deletedApplication
    });
};