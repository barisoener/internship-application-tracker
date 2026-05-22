import express from "express";

import {
    getApplications,
    createApplication,
    getApplication,
    editApplication,
    removeApplication
} from "../controllers/applicationController";

const router = express.Router();

router.get("/", getApplications);

router.post("/", createApplication);

//to take certain application
router.get("/:id", getApplication);

//to edit an application
router.put("/:id", editApplication);

router.delete("/:id", removeApplication);

export default router;