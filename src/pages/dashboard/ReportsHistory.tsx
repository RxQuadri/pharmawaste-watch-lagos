import { FileText, Clock, CheckCircle2, AlertCircle, Filter, Download, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ReportsHistory() {
  const [filter, setFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const reports = [
    { id: 'PW-8293', date: 'Mar 10, 2026', items: '2 Bottles (Liquid)', status: 'Pending Approval', type: 'Bottles', points: '--' },
    { id: 'PW-8102', date: 'Mar 02, 2026', items: '5 Blister Packs', status: 'Verified', type: 'Blister packs', points: '50' },
    { id: 'PW-7945', date: 'Feb 15, 2026', items: '15 Mixed Tablets', status: 'Verified', type: 'Mixed', points: '30' },
    { id: 'PW-7821', date: 'Feb 01, 2026', items: '3 Glass Vials', status: 'Picked Up', type: 'Specialty', points: '45' },
  ];

  const filteredReports = filter === 'All' 
    ? reports 
    : reports.filter(r => r.type.toLowerCase().includes(filter.toLowerCase()) || 
                          (filter === 'Solid Medications' && (r.type.toLowerCase().includes('tablet') || r.type.toLowerCase().includes('mixed'))));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExport = () => {
    alert('Downloading Reports CSV...');
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending Approval': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Picked Up': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case 'Pending Approval': return <Clock className="w-3 h-3 mr-1" />;
      case 'Picked Up': return <FileText className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-500 mt-1">Track the status of your medicine drop-offs and earned points.</p>
        </div>
        <div className="flex items-center space-x-2">
           <div className="relative" ref={filterRef}>
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  showFilterDropdown ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {filter}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                   {['All', 'Solid Medications', 'Empty Packaging'].map((option) => (
                     <button
                       key={option}
                       onClick={() => {
                         setFilter(option);
                         setShowFilterDropdown(false);
                       }}
                       className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                     >
                       {option}
                       {filter === option && <Check className="w-4 h-4 text-primary" />}
                     </button>
                   ))}
                </div>
              )}
           </div>
           <button 
             onClick={handleExport}
             className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
           >
             <Download className="w-4 h-4 mr-2" />
             Export
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Report ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Waste Items</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-primary">{report.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.date}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{report.items}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{report.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(report.status)}`}>
                      {getStatusIcon(report.status)}
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-sm font-bold ${report.points === '--' ? 'text-gray-400' : 'text-primary'}`}>
                      {report.points === '--' ? '--' : `+${report.points}`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-light-green/30 rounded-2xl p-6 border border-primary/10 flex items-start">
         <AlertCircle className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
         <div>
           <h4 className="text-sm font-bold text-gray-900">About Verification</h4>
           <p className="text-xs text-gray-600 mt-1 leading-relaxed">
             Points are automatically credited once the pharmacy verifies your drop-off PIN. Verified status indicates that the item has been securely logged into the Lagos pharmaceutical recovery network.
           </p>
         </div>
      </div>
    </div>
  );
}
