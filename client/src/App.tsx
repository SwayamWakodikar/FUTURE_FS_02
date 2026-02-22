import { useState, useEffect } from "react";
import axios from "axios";
import type { Lead, LeadInput } from "./types";
import { Navbar } from "./components/Navbar";
import { StatsSection } from "./components/StatsSection";
import { LeadList } from "./components/LeadList";
import { LeadFormModal } from "./components/LeadFormModal";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formData, setFormData] = useState<LeadInput>({
    name: "",
    email: "",
    phone: "",
    source: "Website",
    status: "New",
    notes: "",
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const [error, setError] = useState<string | null>(null);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const url = editingLead ? `${API_URL}/${editingLead._id}` : API_URL;
      
      const res = await axios({
        method: editingLead ? "put" : "post",
        url,
        data: formData,
      });

      if (res.status === 200 || res.status === 201) {
        fetchLeads();
        closeModal();
      }
    } catch (error: any) {
      console.error("Error saving lead:", error);
      setError(error.response?.data?.message || "Network error. Please make sure the backend is running.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const openModal = (lead?: Lead) => {
    setError(null);
    if (lead) {
      setEditingLead(lead);
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || "",
        source: lead.source,
        status: lead.status,
        notes: lead.notes || "",
      });
    } else {
      setEditingLead(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        source: "Website",
        status: "New",
        notes: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
    setError(null);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "New").length,
    qualified: leads.filter(l => l.status === "Qualified").length,
    closed: leads.filter(l => l.status === "Closed").length,
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-white to-slate-50 text-slate-900 font-sans relative overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navigation */}
      <Navbar openModal={openModal} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Header Greeting */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, Team! 👋</h1>
          <p className="text-slate-500 mt-2">Here's what's happening with your leads today.</p>
        </div>

        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Filters and List */}
        <LeadList
          loading={loading}
          filteredLeads={filteredLeads}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          openModal={openModal}
          handleDelete={handleDelete}
        />
      </main>

      {/* Modal Backdrop and Content */}
      <LeadFormModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        editingLead={editingLead}
        formData={formData}
        setFormData={setFormData}
        handleCreateOrUpdate={handleCreateOrUpdate}
        error={error}
      />
    </div>
  );
}

export default App;
