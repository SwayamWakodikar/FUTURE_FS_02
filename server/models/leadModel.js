import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    source: {
      type: String,
      enum: ["Website", "LinkedIn", "Referral", "Cold Call"],
      default: "Website"
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Closed", "Rejected"],
      default: "New"
    },
    notes: String
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;