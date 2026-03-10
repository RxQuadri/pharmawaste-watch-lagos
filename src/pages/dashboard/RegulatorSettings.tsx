import { Building2, Shield, Bell, Globe, Save, Camera, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function RegulatorSettings() {
  const [aiValidation, setAiValidation] = useState(true);
  const [autoEscalation, setAutoEscalation] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="relative space-y-6">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 duration-300">
           <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-slate-900/20 flex items-center space-x-3 border border-white/10">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                 <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold">Settings updated for LASEPA HQ</span>
           </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agency Settings</h1>
          <p className="text-gray-500 mt-1">Configure LASEPA headquarters profile and operational standards.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20 ${isSaving ? 'opacity-70 scale-95' : ''}`}
        >
          {isSaving ? (
             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-8 flex items-center">
              <Building2 className="w-5 h-5 mr-3 text-primary" />
              Agency Profile
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-6 mb-8">
                 <div className="relative group">
                    <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center font-black text-slate-400 text-2xl group-hover:bg-slate-200 transition-colors">
                       LS
                    </div>
                    <button 
                      onClick={() => alert('Opening media browser to select official agency logo...')}
                      className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-md border border-gray-100 text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                      title="Update Profile Photo"
                    >
                       <Camera className="w-4 h-4" />
                    </button>
                    <input type="file" className="hidden" id="logo-upload" />
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-gray-900">LASEPA HQ</h4>
                    <p className="text-sm text-gray-500 font-medium">Lagos State Environmental Protection Agency</p>
                    <div className="flex items-center mt-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                       <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">System Verified</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Department Name</label>
                   <input 
                     type="text" 
                     placeholder="Chief Inspection Unit" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all focus:bg-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Inquiry Email</label>
                   <input 
                     type="email" 
                     placeholder="inspection@lasepa.gov.ng" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all focus:bg-white"
                   />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-3 text-primary" />
                  Compliance Standards
                </h2>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Global Policies</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-6 rounded-2xl border transition-all ${aiValidation ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/5' : 'bg-gray-50 border-gray-100'}`}>
                   <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${aiValidation ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                         <CheckCircle className="w-4 h-4" />
                      </div>
                      <button 
                        onClick={() => setAiValidation(!aiValidation)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${aiValidation ? 'bg-primary' : 'bg-gray-300'}`}
                      >
                         <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${aiValidation ? 'right-0.75' : 'left-0.75'}`}></div>
                      </button>
                   </div>
                   <h4 className="text-sm font-bold text-gray-900">AI Validation</h4>
                   <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Require AI classification for all retail-level pharma waste submissions.</p>
                </div>
                
                <div className={`p-6 rounded-2xl border transition-all ${autoEscalation ? 'bg-accent/5 border-accent/20 ring-1 ring-accent/5' : 'bg-gray-50 border-gray-100'}`}>
                   <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${autoEscalation ? 'bg-accent text-white' : 'bg-gray-200 text-gray-400'}`}>
                         <Bell className="w-4 h-4" />
                      </div>
                      <button 
                        onClick={() => setAutoEscalation(!autoEscalation)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${autoEscalation ? 'bg-accent' : 'bg-gray-300'}`}
                      >
                         <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${autoEscalation ? 'right-0.75' : 'left-0.75'}`}></div>
                      </button>
                   </div>
                   <h4 className="text-sm font-bold text-gray-900">Auto Escalation</h4>
                   <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Threshold-based alerting for high-risk groundwater contamination markers.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
              <h3 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest pl-1">Region Profile</h3>
              <div className="space-y-4">
                 <div className="group pl-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Jurisdiction</p>
                    <div className="flex items-center justify-between mt-1 group-hover:translate-x-1 transition-transform">
                       <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-primary" />
                          <span className="text-sm font-bold text-gray-700">Lagos Metropolitan</span>
                       </div>
                    </div>
                 </div>
                 <div className="group pl-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">System Sync Level</p>
                    <div className="flex items-center justify-between mt-1 group-hover:translate-x-1 transition-transform">
                       <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-primary" />
                          <span className="text-sm font-bold text-gray-700">Enterprise High</span>
                       </div>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-gray-50 px-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Api Access Key</p>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                       <code className="text-[10px] font-bold text-slate-400">LASEPA-HQ-••••-2026</code>
                       <button 
                         onClick={() => alert(`Generating new Enterprise API key for HQ...`)}
                         className="text-[10px] font-black text-primary hover:underline"
                       >
                         Renew
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] text-center relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-primary">Agency Trust</h4>
                <p className="text-3xl font-black mb-1 group-hover:scale-110 transition-transform cursor-default">SECURE</p>
                <p className="text-[10px] text-white/40 font-bold italic mb-6">Real-time encryption active</p>
                
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                   <div className="w-[85%] h-full bg-primary animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                </div>
                <p className="text-[10px] mt-4 font-black opacity-30 tracking-widest uppercase">Index: 0.85 (Optimized)</p>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
        </div>
      </div>
    </div>
  );
}
