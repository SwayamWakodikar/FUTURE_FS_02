
import type { Lead, LeadInput } from '../types';

interface LeadFormModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  editingLead: Lead | null;
  formData: LeadInput;
  setFormData: (data: LeadInput) => void;
  handleCreateOrUpdate: (e: React.FormEvent) => void;
  error: string | null;
}

export function LeadFormModal({
  isModalOpen,
  closeModal,
  editingLead,
  formData,
  setFormData,
  handleCreateOrUpdate,
  error
}: LeadFormModalProps) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" 
        onClick={closeModal}
      ></div>
      
      <div 
        className="relative bg-white rounded-md shadow-xl w-full max-w-lg overflow-hidden border border-zinc-200 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900">{editingLead ? "Edit Lead" : "New Lead"}</h3>
            <p className="text-sm text-zinc-500 mt-0.5">{editingLead ? "Update lead information." : "Create a new lead entry."}</p>
          </div>
          <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleCreateOrUpdate}>
          <div className="px-6 py-5 max-h-[65vh] overflow-y-auto">
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@acme.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Phone <span className="text-zinc-400 font-normal">(Optional)</span></label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Source</label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer pr-8"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2371717a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 50%', backgroundSize: '0.65rem auto' }}
                  >
                    <option value="Website">Website</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer pr-8"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2371717a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 50%', backgroundSize: '0.65rem auto' }}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Closed">Closed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Internal Notes</label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none h-24 resize-none transition-all"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notes, next steps..."
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-zinc-300 text-sm font-medium rounded-md text-zinc-700 bg-white hover:bg-zinc-50 focus:outline-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
            >
              {editingLead ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
