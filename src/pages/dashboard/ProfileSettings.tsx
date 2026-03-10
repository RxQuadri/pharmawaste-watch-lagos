import { useState } from 'react';
import { User, Bell, Shield, Lock, CheckCircle2, RefreshCcw } from 'lucide-react';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Explicitly defined Interactive Toggles
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Drop-off Confirmation', desc: 'Receive alert when a pharmacy verifies your PIN.', active: true },
    { id: 2, title: 'Points & Rewards', desc: 'Get notified when you unlock a new environmental badge.', active: true },
    { id: 3, title: 'Nearby Hotspots', desc: 'Alert me to emerging medicine waste hotspots in my area.', active: false },
    { id: 4, title: 'Security Alerts', desc: 'Important updates about your account security.', active: true }
  ]);

  const toggleNotification = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, active: !n.active } : n
    ));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    // Simulate save logic for demo
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { name: 'Profile', icon: <User className="w-4 h-4 mr-2" /> },
    { name: 'Notifications', icon: <Bell className="w-4 h-4 mr-2" /> },
    { name: 'Security', icon: <Shield className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and personal information.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.name
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            {activeTab === 'Profile' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex items-center space-x-6">
                   <div className="w-24 h-24 rounded-full bg-light-green border-4 border-white shadow-md flex items-center justify-center text-primary font-bold text-2xl">TB</div>
                   <div>
                     <h3 className="text-lg font-bold text-gray-900">Tunde Bakare</h3>
                     <p className="text-sm text-gray-500">Member since February 2026</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700 block">Full Name</label>
                     <input type="text" defaultValue="Tunde Bakare" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                     <input type="email" defaultValue="tunde.b@example.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                   </div>
                </div>

                <div className="pt-4 flex items-center justify-end space-x-4">
                    {saveSuccess && (
                      <span className="text-sm font-bold text-primary flex items-center animate-in fade-in slide-in-from-right-4">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" />
                        Changes Saved!
                      </span>
                    )}
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20 disabled:opacity-50 min-w-[140px] flex items-center justify-center"
                    >
                      {isSaving ? (
                        <>
                          <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : 'Save Changes'}
                    </button>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-gray-900">Email & App Alerts</h3>
                <div className="space-y-4">
                   {notifications.map((item) => (
                     <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex-1 pr-4">
                          <p className="text-sm font-bold text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleNotification(item.id)}
                          type="button"
                          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${item.active ? 'bg-primary' : 'bg-gray-300'}`}
                        >
                           <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${item.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-primary" />
                      Password Management
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Update your login credentials to keep your account secure.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Current Password</label>
                       <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white transition-colors" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">New Password</label>
                         <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white transition-colors" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Confirm New Password</label>
                         <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all disabled:opacity-50"
                    >
                      {isSaving ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
