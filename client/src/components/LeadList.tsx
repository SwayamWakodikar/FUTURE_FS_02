
import type { Lead } from '../types';

interface LeadListProps {
  loading: boolean;
  filteredLeads: Lead[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  openModal: (lead?: Lead) => void;
  handleDelete: (id: string) => void;
}

export function LeadList({
  loading,
  filteredLeads,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  openModal,
  handleDelete
}: LeadListProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/40 border border-white overflow-hidden text-slate-800">
      <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50">
        <h2 className="text-xl font-bold">Pipeline</h2>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl w-full md:w-72 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all focus:bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none font-medium text-slate-700 transition-all focus:bg-white appearance-none cursor-pointer pr-10 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem top 50%', backgroundSize: '0.65rem auto' }}
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Closed">Closed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 text-slate-500 h-full">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="font-medium animate-pulse">Fetching your pipeline...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-slate-500 h-full">
            <div className="mb-6 w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-20"></div>
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No leads found</h3>
            <p>Try adjusting your filters or add a fresh lead to the pipeline.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Lead Details</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Source</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Added On</th>
                <th className="px-8 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/30">
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-white transition-colors duration-200 group cursor-default">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-700 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:shadow-md transition-shadow">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-5">
                        <div className="text-sm font-bold text-slate-900">{lead.name}</div>
                        <div className="text-sm text-slate-500 flex items-center mt-0.5">
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          {lead.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                        lead.status === "Qualified" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
                        lead.status === "New" ? "bg-amber-100 text-amber-800 border border-amber-200" :
                        lead.status === "Closed" ? "bg-purple-100 text-purple-800 border border-purple-200" :
                        lead.status === "Rejected" ? "bg-rose-100 text-rose-800 border border-rose-200" :
                        "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                          lead.status === "Qualified" ? "bg-emerald-500" :
                          lead.status === "New" ? "bg-amber-500" :
                          lead.status === "Closed" ? "bg-purple-500" :
                          lead.status === "Rejected" ? "bg-rose-500" :
                          "bg-blue-500"
                        }`}></span>
                        {lead.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                    {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button 
                      onClick={() => openModal(lead)}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(lead._id)}
                      className="inline-flex items-center text-rose-600 hover:text-rose-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-50"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
