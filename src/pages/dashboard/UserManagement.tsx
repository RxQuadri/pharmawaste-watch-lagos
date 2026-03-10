import { UserPlus, Search, UserCheck, Shield, Mail, MoreHorizontal, X, Briefcase, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const mockAgents = [
    { name: 'Olawale Sanwo', role: 'Chief Field Agent', area: 'Mainland Dist.', status: 'On Mission', id: 'FA-102' },
    { name: 'Blessing Egbe', role: 'Inspect Team Lead', area: 'Island Zone', status: 'Available', id: 'FA-105' },
    { name: 'Tosin Lawal', role: 'Compliance Officer', area: 'Industrial Area', status: 'In Training', id: 'FA-110' },
  ];

  const filteredAgents = mockAgents.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleDetails: Record<string, string[]> = {
    'Field Operations': ['Access waste reports', 'Dispatch field teams', 'Update on-site statuses', 'Trigger critical alerts'],
    'Data Analyst': ['Review environmental metrics', 'Export impact reports', 'Manage AI training sets', 'Predict hotspot trends'],
    'Super Admin': ['Full system access', 'User role management', 'Agency settings control', 'Financial oversight'],
  };

  return (
    <div className="relative space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Manage agency staff, field agents, and access permissions.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Field Agents</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Find agents..." 
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
           </div>
           
           <div className="divide-y divide-gray-100">
              {filteredAgents.map((agent, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                         {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-gray-900">{agent.name}</h4>
                         <p className="text-xs text-gray-500 font-medium flex items-center">
                            <Briefcase className="w-3 h-3 mr-1" />
                            {agent.role} • {agent.id}
                         </p>
                      </div>
                   </div>
                   <div className="hidden lg:block text-center px-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-center">
                         <MapPin className="w-2 h-2 mr-1" />
                         Assignment
                      </p>
                      <p className="text-xs font-bold text-gray-700 mt-0.5">{agent.area}</p>
                   </div>
                   <div className="flex items-center space-x-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
                        agent.status === 'On Mission' ? 'bg-primary/5 text-primary border-primary/20' : 
                        agent.status === 'Available' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                         {agent.status}
                      </span>
                      <button 
                        onClick={() => alert(`Reviewing personnel file: ${agent.name}`)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
                      >
                         <MoreHorizontal className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ))}
              {filteredAgents.length === 0 && (
                <div className="p-12 text-center text-gray-400 text-sm">
                   No agents found in the current roster.
                </div>
              )}
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center">
                 <Shield className="w-4 h-4 mr-2 text-primary" />
                 Permission Templates
              </h3>
              <div className="space-y-3">
                 {Object.keys(roleDetails).map((role) => (
                   <div key={role} className="group">
                     <button 
                       onClick={() => setExpandedRole(expandedRole === role ? null : role)}
                       className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                         expandedRole === role ? 'bg-primary/5 border-primary/30' : 'bg-white border-gray-100 hover:border-primary/20 hover:bg-primary/5'
                       }`}
                     >
                        <span className={`text-sm font-bold ${expandedRole === role ? 'text-primary' : 'text-gray-700'}`}>{role}</span>
                        <UserCheck className={`w-4 h-4 transition-colors ${expandedRole === role ? 'text-primary' : 'text-gray-300'}`} />
                     </button>
                     {expandedRole === role && (
                        <div className="mt-2 ml-4 space-y-2 animate-in fade-in duration-300">
                           {roleDetails[role].map((detail, idx) => (
                             <div key={idx} className="flex items-start">
                                <CheckCircle className="w-3 h-3 text-primary/50 mr-2 mt-0.5" />
                                <span className="text-[10px] text-gray-500 font-medium">{detail}</span>
                             </div>
                           ))}
                        </div>
                     )}
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-primary p-6 rounded-3xl text-white shadow-xl shadow-primary/20 group cursor-pointer overflow-hidden relative" onClick={() => alert('Opening LASEPA Academy training portal...')}>
              <div className="relative z-10">
                <h3 className="text-sm font-black mb-2 flex items-center">
                   <Mail className="w-4 h-4 mr-2" />
                   Training Hub
                </h3>
                <p className="text-xs text-white/80 leading-relaxed group-hover:text-white transition-colors">Boost your field agents' accuracy with the latest Waste-Class AI certifications.</p>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
           </div>
        </div>
      </div>

      {/* Basic Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-gray-900">Invite Team Member</h3>
               <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400">
                  <X className="w-5 h-5" />
               </button>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                  <input type="text" placeholder="e.g. Segun Ogunleye" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Agency Email</label>
                  <input type="email" placeholder="s.ogunleye@lasepa.gov.ng" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Assigned Role</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-no-repeat bg-[right_1rem_center]">
                     <option>Field Operations</option>
                     <option>Data Analyst</option>
                     <option>Super Admin</option>
                  </select>
               </div>
               
               <button 
                 onClick={() => {
                   alert('Invitation sent successfully to the agency email.');
                   setShowAddModal(false);
                 }}
                 className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm hover:bg-accent transition-all shadow-lg shadow-primary/20"
               >
                  Generate Invitation Link
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
