import express from "express";

import {
    getApplications,
    createApplication
} from "../controllers/applicationController";

const router = express.Router();

router.get("/", getApplications);

router.post("/", createApplication);

export default router;