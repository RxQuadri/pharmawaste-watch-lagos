import { Store, MapPin, Clock, Bell, Shield, Save, Mail, Phone, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PharmacySettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [isTfaEnabled, setIsTfaEnabled] = useState(false);
  const [notificationToggles, setNotificationToggles] = useState({
    pickup: true,
    reports: true,
    queries: false,
    updates: true,
  });

  const tabs = [
    { id: 'profile', label: 'Hub Profile', icon: <Store className="w-4 h-4" /> },
    { id: 'operational', label: 'Operations', icon: <Clock className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pharmacy Settings</h1>
        <p className="text-gray-500 mt-1">Manage your pharmacy identity, operational window, and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 shrink-0">
           <div className="bg-white rounded-2xl border border-gray-100 p-2 space-y-1 shadow-sm">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
               >
                 <span className="mr-3">{tab.icon}</span>
                 {tab.label}
               </button>
             ))}
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
           {activeTab === 'profile' && (
             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                   <div>
                      <h3 className="text-lg font-black text-gray-900 tracking-tight">Hub Profile</h3>
                      <p className="text-sm text-gray-500 font-medium">Public information about your collection hub.</p>
                   </div>
                   <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-primary font-black text-xl shadow-sm">
                      PO
                   </div>
                </div>
                <div className="p-8 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pharmacy Name</label>
                         <input type="text" defaultValue="Medplus Mushin" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Professional Title</label>
                         <input type="text" defaultValue="Pharm. Olamide" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                         <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="email" defaultValue="olamide@medplusmushin.com" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold transition-all" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hub Contact No.</label>
                         <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="tel" defaultValue="+234 812 345 6789" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold transition-all" />
                         </div>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hub Location (Verified)</label>
                      <div className="relative">
                         <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                         <input type="text" defaultValue="128 Agege Motor Road, Mushin, Lagos" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary text-sm font-bold" readOnly />
                         <ExternalLink className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 cursor-pointer hover:text-primary transition-colors" />
                      </div>
                   </div>
                </div>
                <div className="p-8 bg-gray-50/30 border-t border-gray-50 flex justify-end">
                   <button 
                     onClick={handleSave}
                     disabled={isSaving}
                     className="px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-accent transition-all flex items-center disabled:opacity-50"
                   >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {isSaving ? 'Saving...' : 'Save Changes'}
                   </button>
                </div>
             </div>
           )}

           {activeTab === 'operational' && (
             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">Operational Window</h3>
                <div className="space-y-6">
                   <p className="text-sm text-gray-500 font-medium leading-relaxed">
                     Define when your pharmacy is active for household waste drop-offs. These hours will be displayed to users on the public search map.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      {['Monday - Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                           <span className="text-sm font-bold text-gray-700">{day}</span>
                           <div className="flex items-center space-x-2">
                              <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-black">
                                 <option>08:00 AM</option>
                                 <option>09:00 AM</option>
                              </select>
                              <span className="text-gray-400">-</span>
                              <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-black">
                                 <option>06:00 PM</option>
                                 <option>08:00 PM</option>
                              </select>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'notifications' && (
             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                   {[
                     { key: 'pickup', title: 'New Pickup Scheduled', desc: 'Alert when logistics partner schedules a collection.' },
                     { key: 'reports', title: 'Waste Intake Reports', desc: 'Weekly summary of all collections at your hub.' },
                     { key: 'queries', title: 'Resident Queries', desc: 'Direct messages from local community members.' },
                     { key: 'updates', title: 'System Updates', desc: 'Alerts for regulatory changes or platform new features.' }
                   ].map((item) => (
                     <div key={item.key} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 group">
                        <div className="max-w-md">
                           <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                           <p className="text-xs text-gray-500 font-medium mt-0.5">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => {
                            const key = item.key as keyof typeof notificationToggles;
                            setNotificationToggles(prev => ({ ...prev, [key]: !prev[key] }));
                          }}
                          className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 ${notificationToggles[item.key as keyof typeof notificationToggles] ? 'bg-primary' : 'bg-gray-200'}`}
                        >
                           <motion.div 
                             animate={{ x: notificationToggles[item.key as keyof typeof notificationToggles] ? 24 : 0 }}
                             className="w-4 h-4 bg-white rounded-full shadow-sm" 
                           />
                        </button>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'security' && (
             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">Security & Authentication</h3>
                <div className="space-y-6">
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center">
                         <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-primary mr-4">
                            <Shield className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-gray-900">Two-Factor Authentication</p>
                            <p className="text-xs text-gray-500 font-medium">Add an extra layer of security to your hub.</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setIsTfaEnabled(!isTfaEnabled)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${isTfaEnabled ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                      >
                        {isTfaEnabled ? 'Disable' : 'Enable'}
                      </button>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                         <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                         <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" />
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Success Toast */}
      {showSavedToast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center z-50 animate-in fade-in slide-in-from-bottom-4">
           <CheckCircle2 className="w-4 h-4 text-primary mr-3" />
           <span className="text-xs font-bold">Settings updated successfully!</span>
        </div>
      )}
    </div>
  );
}
