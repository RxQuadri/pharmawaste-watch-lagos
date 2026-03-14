import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, Bell, CheckCircle2, Clock, AlertTriangle, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface UserData {
  name: string;
  email: string;
  avatarLabel: string;
  hubName?: string;
}

interface DashboardLayoutProps {
  links: SidebarLink[];
  role: string;
  userData: UserData;
}

export default function DashboardLayout({ links, role, userData }: DashboardLayoutProps) {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const householdNotifications = [
    { id: 1, title: 'Drop-off Verified', message: 'Your medication drop-off at Medplus was verified.', time: '2 mins ago', type: 'success' },
    { id: 2, title: 'Badge Unlocked!', message: 'You reached Eco-Warrior tier! Check your points.', time: '1 hour ago', type: 'reward' },
    { id: 3, title: 'New Hotspot Detected', message: 'A new medicine waste hotspot was reported in Ikeja.', time: '3 hours ago', type: 'warning' },
  ];

  const pharmacyNotifications = [
    { id: 1, title: 'Pickup Scheduled', message: 'Pickup scheduled for tomorrow at 10:00 AM by Lagos Waste Management.', time: '10 mins ago', type: 'warning' },
    { id: 2, title: 'Drop-off Verified', message: 'Household Drop-off PIN 4829 successfully verified.', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'Threshold Reached', message: 'Weekly threshold reached: 5kg of empty packaging collected!', time: '4 hours ago', type: 'reward' },
  ];

  const regulatorNotifications = [
    { id: 1, title: 'Critical Alert', message: 'Critical: Unregistered waste disposal detected near public drainage in Surulere.', time: '5 mins ago', type: 'warning' },
    { id: 2, title: 'System Alert', message: '5 new pharmacies registered for the take-back program this week.', time: '2 hours ago', type: 'success' },
    { id: 3, title: 'Compliance Drop', message: 'Compliance Drop: 3 pharmacies missed their scheduled waste pickup.', time: '5 hours ago', type: 'warning' },
  ];

  const notifications = role === 'Pharmacy' ? pharmacyNotifications : role === 'Regulator' ? regulatorNotifications : householdNotifications;

  // Close notifications on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-main-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col h-screen sticky top-0 overflow-hidden">
        {/* Top Content: Logo and Nav */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="h-16 flex flex-col justify-center px-6 border-b border-gray-100 shrink-0">
            <Link to="/" className="flex flex-col items-start leading-tight mt-1">
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                PharmaWaste<span className="text-primary">Watch</span>
              </span>
              <span className="text-[10px] font-medium text-gray-900 mt-0.5">
                An Innovation of PharmaEco
              </span>
            </Link>
          </div>
          
          <div className="px-6 py-4 shrink-0">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {role} Portal
            </div>
          </div>

          <nav className="px-4 space-y-1 pb-4">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-light-green text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className={`mr-3 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                    {link.icon}
                  </div>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Content: Profile Block */}
        <div className="p-4 border-t border-gray-100 space-y-4 shrink-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          <div className="flex items-center px-3 py-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
              {userData.avatarLabel}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{userData.name}</p>
              <p className="text-xs text-gray-500 truncate">{userData.email}</p>
            </div>
          </div>
          <Link
            to="/signin"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400 flex-shrink-0" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sm:px-8 relative">
          <div className="flex items-center flex-1">
             <h2 className="text-lg font-bold text-gray-900 tracking-tight hidden sm:block">
               {links.find((l) => l.href === location.pathname)?.label || 'Dashboard'}
             </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`flex items-center justify-center h-10 w-10 rounded-xl transition-all ${
                  showNotifications ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <span className="text-[10px] font-bold text-primary bg-light-green px-2 py-0.5 rounded-full uppercase tracking-wider">{notifications.length} New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                            n.type === 'success' ? 'bg-green-100 text-green-600' : 
                            n.type === 'reward' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : 
                             n.type === 'reward' ? <Clock className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{n.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-gray-400 mt-2 font-medium">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      setShowNotifications(false);
                      setShowAllNotifications(true);
                    }}
                    className="w-full py-3 text-xs font-bold text-primary bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>

            <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

            <div className="flex items-center space-x-3 pl-2">
               <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-gray-900">{userData.name}</p>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{userData.hubName || 'Lagos Hub'}</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-light-green border-2 border-white shadow-sm flex items-center justify-center text-primary font-bold text-sm">
                  {userData.avatarLabel}
               </div>
            </div>
          </div>
        </header>

        {/* All Notifications Side Panel */}
        <AnimatePresence>
          {showAllNotifications && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAllNotifications(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
              >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
                   <div>
                     <h2 className="text-xl font-black text-gray-900">All Notifications</h2>
                     <p className="text-sm text-gray-500">Your recent activity and alerts</p>
                   </div>
                   <button 
                     onClick={() => setShowAllNotifications(false)}
                     className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                   >
                     <X className="w-6 h-6" />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                   {[...notifications, 
                     { id: 4, title: 'Network Update', message: 'New sustainability standards released by the board.', time: '1 day ago', type: 'reward' },
                     { id: 5, title: 'Logistics Alert', message: 'A logistics partner will be at your area tomorrow.', time: '2 days ago', type: 'success' },
                     { id: 6, title: 'Security Alert', message: 'New login detected from a Chrome browser on Mac.', time: '3 days ago', type: 'warning' }
                   ].map((n) => (
                     <div key={n.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                       <div className="flex items-start">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shrink-0 ${
                           n.type === 'success' ? 'bg-green-50 text-green-600' : 
                           n.type === 'reward' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                         }`}>
                           {n.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 
                            n.type === 'reward' ? <Clock className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                         </div>
                         <div>
                           <h4 className="font-bold text-gray-900">{n.title}</h4>
                           <p className="text-sm text-gray-500 mt-1 leading-relaxed">{n.message}</p>
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4 block">{n.time}</span>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
                <div className="p-6 border-t border-gray-100 bg-white">
                   <button 
                     onClick={() => setShowAllNotifications(false)}
                     className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
                   >
                     Close Panel
                   </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 sm:p-8 bg-main-bg">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
