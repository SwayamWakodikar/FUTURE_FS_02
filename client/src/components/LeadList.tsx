
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
    <div className="bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden text-zinc-800">
      <div className="p-4 md:p-5 border-b border-zinc-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-50/50">
        <h2 className="text-base font-semibold text-zinc-900">Pipeline</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-white border border-zinc-300 rounded-md w-full md:w-64 text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-zinc-300 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none font-medium text-zinc-700 transition-all appearance-none cursor-pointer pr-8 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2371717a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 50%', backgroundSize: '0.65rem auto' }}
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
          <div className="flex flex-col items-center justify-center p-20 text-zinc-500 h-full">
            <div className="w-6 h-6 border-2 border-zinc-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium">Loading...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-zinc-500 h-full bg-zinc-50/30">
            <svg className="w-8 h-8 text-zinc-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-sm font-medium text-zinc-700">No leads found</h3>
            <p className="text-xs mt-1">Try adjusting filters or add a new lead.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Lead Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Added On</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-zinc-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-9 w-9 bg-blue-50 text-blue-700 border border-blue-100 rounded-md flex items-center justify-center font-semibold text-sm">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-zinc-900">{lead.name}</div>
                        <div className="text-sm text-zinc-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center text-sm text-zinc-600">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                      lead.status === "Qualified" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      lead.status === "New" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      lead.status === "Closed" ? "bg-zinc-100 text-zinc-800 border-zinc-300" :
                      lead.status === "Rejected" ? "bg-red-50 text-red-700 border-red-200" :
                      "bg-zinc-50 text-zinc-700 border-zinc-200"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                    {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button 
                      onClick={() => openModal(lead)}
                      className="text-zinc-500 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <span className="text-zinc-300">|</span>
                    <button 
                      onClick={() => handleDelete(lead._id)}
                      className="text-zinc-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
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
