import express from "express";
import { createLead,getLeadById,updateLead,deleteLead,getLeads } from "../controllers/lead.controller.js";

const router=express.Router();

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;