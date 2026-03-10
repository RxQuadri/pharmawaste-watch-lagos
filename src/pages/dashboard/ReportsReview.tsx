import { Search, Filter, ChevronRight, AlertCircle, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function ReportsReview() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const mockReports = [
    { id: 'REP-001', resident: 'Adeola Johnson', type: 'Expired Antibiotics', status: 'Pending Review', risk: 'Medium', date: '2026-03-08', location: 'Surulere' },
    { id: 'REP-002', resident: 'Chidi Okafor', type: 'Liquid Waste Cluster', status: 'In Review', risk: 'High', date: '2026-03-09', location: 'Mushin' },
    { id: 'REP-003', resident: 'Fatima Musa', type: 'Packaging Waste', status: 'Closed', risk: 'Low', date: '2026-03-07', location: 'Ikeja' },
  ];

  const filteredReports = mockReports.filter(r => 
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.resident.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports Review</h1>
            <p className="text-gray-500 mt-1">Review and validate pharmaceutical waste reports from residents.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Reports</h2>
            <div className="flex space-x-2">
              <div className="relative flex-1 md:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search reports..." 
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => alert('Advanced filters for date, location, and waste type coming soon.')}
                className="p-2 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Report ID</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Resident</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Waste Type</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Risk Level</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.resident}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                        report.risk === 'High' ? 'bg-red-50 text-red-600' : 
                        report.risk === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                      }`}>
                        {report.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          report.status === 'Pending Review' ? 'bg-amber-400' : 
                          report.status === 'In Review' ? 'bg-blue-400' : 'bg-green-400'
                        }`} />
                        <span className="text-sm text-gray-600">{report.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedReport(report)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-gray-400 hover:text-primary"
                        title="View Details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                      No reports found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50/50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-medium">End of report review queue</p>
          </div>
        </div>
        
        <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start">
          <AlertCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-primary">Regulator Note</h4>
            <p className="text-sm text-primary/70 mt-1">High-risk reports are automatically prioritized for LASEPA field agent dispatch.</p>
          </div>
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedReport(null)} />
          <div className="absolute inset-y-0 right-0 max-w-lg w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Report Details</h3>
                <p className="text-sm text-gray-500">{selectedReport.id}</p>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      selectedReport.risk === 'High' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {selectedReport.risk} Risk Report
                    </span>
                    <span className="text-xs font-bold text-gray-400">{selectedReport.date}</span>
                  </div>
                  <h4 className="text-xl font-black text-gray-900">{selectedReport.type}</h4>
                  <p className="text-sm text-gray-600 mt-2">Reported by: <span className="font-bold">{selectedReport.resident}</span></p>
                  <p className="text-sm text-gray-600">Location: <span className="font-bold">{selectedReport.location}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Status</p>
                      <p className="text-sm font-bold text-primary mt-1">{selectedReport.status}</p>
                   </div>
                   <div className="p-4 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Waste Class</p>
                      <p className="text-sm font-bold text-gray-700 mt-1 italic">Hazardous</p>
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest">Evidence Snapshot</h5>
                <div className="aspect-video bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200">
                   <div className="text-center">
                     <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                     <p className="text-xs font-bold text-slate-400 italic">User-submitted image will render here</p>
                   </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-4">
                <button 
                  onClick={() => alert(`Dispatching agent to ${selectedReport.location}...`)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm hover:bg-accent transition-all shadow-lg shadow-primary/20 flex items-center justify-center"
                >
                  Dispatch Field Agent
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="w-full py-4 bg-gray-50 text-gray-700 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all border border-gray-100"
                >
                  Close Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
