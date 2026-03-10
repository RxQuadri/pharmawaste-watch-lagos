import { Activity, Search, MapPin, CheckCircle2, MoreVertical, Settings2, History, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function PharmacyNetwork() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const mockPharmacies = [
    { name: 'Medplus Mushin', area: 'Mushin', compliance: 98, status: 'Active Hub', lastPickup: '2h ago' },
    { name: 'HealthPlus Surulere', area: 'Surulere', compliance: 94, status: 'Active Hub', lastPickup: 'Yesterday' },
    { name: 'LifeBank Hub Ikeja', area: 'Ikeja', compliance: 89, status: 'Active Hub', lastPickup: '3 days ago' },
    { name: 'Nightingale Yaba', area: 'Yaba', compliance: 76, status: 'Secondary Hub', lastPickup: 'Never' },
  ];

  const filteredPharmacies = mockPharmacies.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Network</h1>
          <p className="text-gray-500 mt-1">Monitor compliance and recovery performance across registered pharmacies.</p>
        </div>
        <button 
          onClick={() => alert('Opening Network Configuration...')}
          className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
        >
          <Settings2 className="w-4 h-4 mr-2" />
          Network Config
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Registered Entities</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filter by name or area..." 
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Pharmacy Name</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Area / Zone</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Compliance Rate</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">System Role</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPharmacies.map((pharmacy, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group relative">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-900 block">{pharmacy.name}</span>
                        <span className="text-[10px] text-gray-400 font-medium">Last pickup: {pharmacy.lastPickup}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                      {pharmacy.area}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`text-sm font-bold mr-2 ${pharmacy.compliance >= 90 ? 'text-primary' : pharmacy.compliance >= 80 ? 'text-amber-500' : 'text-red-500'}`}>
                        {pharmacy.compliance}%
                      </span>
                      <div className="hidden lg:block w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${pharmacy.compliance >= 90 ? 'bg-primary' : 'bg-amber-500'}`} 
                          style={{ width: `${pharmacy.compliance}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                      {pharmacy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeMenu === i && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                        <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          <button onClick={() => alert(`Reviewing statistics for ${pharmacy.name}`)} className="w-full px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center">
                            <History className="w-3.5 h-3.5 mr-2 text-gray-400" />
                            View Pickup History
                          </button>
                          <button onClick={() => alert(`Compliance audit scheduled for ${pharmacy.name}`)} className="w-full px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center">
                            <Settings2 className="w-3.5 h-3.5 mr-2 text-gray-400" />
                            Audit Compliance
                          </button>
                          <div className="border-t border-gray-50 mt-1" />
                          <button onClick={() => alert(`Suspending ${pharmacy.name}...`)} className="w-full px-4 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center">
                            <AlertTriangle className="w-3.5 h-3.5 mr-2" />
                            Suspend Access
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPharmacies.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                    No pharmacies found in this region.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium italic">Active LASEPA monitoring initialized</p>
          <div className="flex items-center text-xs text-primary font-bold">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            All entities online
          </div>
        </div>
      </div>
    </div>
  );
}
