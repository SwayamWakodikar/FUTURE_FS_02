export interface Lead {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    source: "Website" | "LinkedIn" | "Referral" | "Cold Call";
    status: "New" | "Contacted" | "Qualified" | "Closed" | "Rejected";
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export type LeadInput = Omit<Lead, "_id" | "createdAt" | "updatedAt">;
