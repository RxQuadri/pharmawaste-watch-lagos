import { Search, Filter, Download, FileText, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';

const mockHistory = [
  { id: 'INT-2044', date: 'Mar 10, 2026', type: 'Solid Medications', qty: '1.2kg', status: 'Verified', points: '+15' },
  { id: 'INT-2043', date: 'Mar 09, 2026', type: 'Empty Packaging', qty: '0.8kg', status: 'Pending', points: '+8' },
  { id: 'INT-2042', date: 'Mar 08, 2026', type: 'Solid Medications', qty: '2.5kg', status: 'Verified', points: '+25' },
  { id: 'INT-2041', date: 'Mar 07, 2026', type: 'Empty Packaging', qty: '0.4kg', status: 'Verified', points: '+5' },
  { id: 'INT-2040', date: 'Mar 06, 2026', type: 'Mixed Waste', qty: '3.1kg', status: 'Verified', points: '+30' },
  { id: 'INT-2039', date: 'Mar 05, 2026', type: 'Solid Medications', qty: '1.8kg', status: 'Verified', points: '+18' },
];

export default function CollectionHistory() {
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredHistory = mockHistory.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Solid') return item.type === 'Solid Medications';
    if (filter === 'Packaging') return item.type === 'Empty Packaging';
    return true;
  });

  const totalItems = filter === 'All' ? 156 : filter === 'Solid' ? 92 : 64;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collection History</h1>
          <p className="text-gray-500 mt-1">Review and manage all past waste intake records.</p>
        </div>
        <button 
          onClick={() => alert('Exporting collection history to CSV...')}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all flex items-center"
        >
          <Download className="w-4 h-4 mr-2 text-primary" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Intake ID..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl p-1">
                {['All', 'Solid', 'Packaging'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => {
                      setFilter(t);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === t ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
             <button className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 hover:text-primary transition-all">
                <Filter className="w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4">Intake ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                       <FileText className="w-4 h-4 text-gray-400 mr-2" />
                       <span className="text-sm font-bold text-gray-900">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{item.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-gray-900">{item.qty} weights</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                       {item.status === 'Verified' ? (
                         <CheckCircle2 className="w-4 h-4 text-primary mr-1.5" />
                       ) : (
                         <Clock className="w-4 h-4 text-amber-500 mr-1.5" />
                       )}
                       <span className={`text-xs font-bold ${item.status === 'Verified' ? 'text-primary' : 'text-amber-600'}`}>
                         {item.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-primary">{item.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-gray-100 flex items-center justify-between text-sm">
          <p className="text-gray-500 font-medium">Showing {filteredHistory.length} of {totalItems} collections</p>
          <div className="flex space-x-2">
             <button 
               onClick={() => currentPage > 1 && setCurrentPage(p => p - 1)}
               disabled={currentPage === 1}
               className={`px-4 py-2 border border-gray-100 rounded-xl font-bold transition-all ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-primary hover:bg-primary/5'}`}
             >
               Previous
             </button>
             <button 
               onClick={() => setCurrentPage(p => p + 1)}
               className="px-4 py-2 border border-gray-100 rounded-xl font-bold text-primary hover:bg-primary/5 transition-all"
             >
               Next
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
