import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, FileText, Map as MapIcon, Users, Settings as SettingsIcon, PlusCircle, Activity, ClipboardList, CheckCircle2 } from 'lucide-react';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Landing from './pages/Landing';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import HouseholdDashboard from './pages/dashboard/HouseholdDashboard';
import ReportWaste from './pages/dashboard/ReportWaste';
import ReportsHistory from './pages/dashboard/ReportsHistory';
import PharmacyLocator from './pages/dashboard/PharmacyLocator';
import ProfileSettings from './pages/dashboard/ProfileSettings';
// Pharmacy Pages
import PharmacyDashboard from './pages/dashboard/PharmacyDashboard';
import PharmacyIntake from './pages/dashboard/PharmacyIntake';
import CollectionHistory from './pages/dashboard/CollectionHistory';
import PickupRequests from './pages/dashboard/PickupRequests';
import RecoveryMetrics from './pages/dashboard/RecoveryMetrics';
import PharmacySettings from './pages/dashboard/PharmacySettings';
import RecordIntake from './pages/dashboard/RecordIntake';

// Regulator Pages
import RegulatorDashboard from './pages/dashboard/RegulatorDashboard';
import RegulatorMap from './pages/dashboard/RegulatorMap';
import ReportsReview from './pages/dashboard/ReportsReview';
import PharmacyNetwork from './pages/dashboard/PharmacyNetwork';
import Analytics from './pages/dashboard/Analytics.tsx';
import UserManagement from './pages/dashboard/UserManagement.tsx';
import RegulatorSettings from './pages/dashboard/RegulatorSettings.tsx';

// User Identities
const householdUser = {
  name: 'Tunde Bakare',
  email: 'tunde.b@example.com',
  avatarLabel: 'TB',
  hubName: 'Lagos Hub'
};

const pharmacyUser = {
  name: 'Pharm. Olamide',
  email: 'olamide@medplusmushin.com',
  avatarLabel: 'PO',
  hubName: 'Medplus Mushin'
};

const regulatorUser = {
  name: 'Dr. Afolabi',
  email: 'Chief Inspector, LASEPA',
  avatarLabel: 'DA',
  hubName: 'LASEPA Headquarters'
};

// Sidebar Configurations
const householdLinks = [
  { label: 'Dashboard', href: '/household/dashboard', icon: <Home className="w-5 h-5" /> },
  { label: 'Report Waste', href: '/household/report', icon: <PlusCircle className="w-5 h-5" /> },
  { label: 'My Reports', href: '/household/reports', icon: <FileText className="w-5 h-5" /> },
  { label: 'Find Pharmacy', href: '/household/pharmacies', icon: <MapIcon className="w-5 h-5" /> },
  { label: 'Settings', href: '/household/settings', icon: <SettingsIcon className="w-5 h-5" /> },
];

const pharmacyLinks = [
  { label: 'Dashboard', href: '/pharmacy/dashboard', icon: <Home className="w-5 h-5" /> },
  { label: 'Verify Drop-off', href: '/pharmacy/intake', icon: <CheckCircle2 className="w-5 h-5" /> },
  { label: 'Collection History', href: '/pharmacy/history', icon: <ClipboardList className="w-5 h-5" /> },
  { label: 'Pickup Requests', href: '/pharmacy/pickups', icon: <Activity className="w-5 h-5" /> },
  { label: 'Recovery Metrics', href: '/pharmacy/metrics', icon: <FileText className="w-5 h-5" /> },
  { label: 'Settings', href: '/pharmacy/settings', icon: <SettingsIcon className="w-5 h-5" /> },
];

const regulatorLinks = [
  { label: 'Dashboard', href: '/regulator/dashboard', icon: <Home className="w-5 h-5" /> },
  { label: 'Hotspot Monitoring', href: '/regulator/map', icon: <MapIcon className="w-5 h-5" /> },
  { label: 'Reports Review', href: '/regulator/reports', icon: <FileText className="w-5 h-5" /> },
  { label: 'Pharmacy Network', href: '/regulator/pharmacies', icon: <Activity className="w-5 h-5" /> },
  { label: 'Analytics', href: '/regulator/analytics', icon: <Activity className="w-5 h-5" /> },
  { label: 'User Management', href: '/regulator/users', icon: <Users className="w-5 h-5" /> },
  { label: 'Settings', href: '/regulator/settings', icon: <SettingsIcon className="w-5 h-5" /> },
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
 
        {/* Household Dashboard Routes */}
        <Route path="/household" element={<DashboardLayout links={householdLinks} role="Household" userData={householdUser} />}>
          <Route index element={<Navigate to="/household/dashboard" replace />} />
          <Route path="dashboard" element={<HouseholdDashboard />} />
          <Route path="report" element={<ReportWaste />} />
          <Route path="reports" element={<ReportsHistory />} />
          <Route path="pharmacies" element={<PharmacyLocator />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* Pharmacy Dashboard Routes */}
        <Route path="/pharmacy" element={<DashboardLayout links={pharmacyLinks} role="Pharmacy" userData={pharmacyUser} />}>
          <Route index element={<Navigate to="/pharmacy/dashboard" replace />} />
          <Route path="dashboard" element={<PharmacyDashboard />} />
          <Route path="intake" element={<PharmacyIntake />} />
          <Route path="record-intake" element={<RecordIntake />} />
          <Route path="history" element={<CollectionHistory />} />
          <Route path="pickups" element={<PickupRequests />} />
          <Route path="metrics" element={<RecoveryMetrics />} />
          <Route path="settings" element={<PharmacySettings />} />
        </Route>

        {/* Regulator Dashboard Routes */}
        <Route path="/regulator" element={<DashboardLayout links={regulatorLinks} role="Regulator" userData={regulatorUser} />}>
          <Route index element={<Navigate to="/regulator/dashboard" replace />} />
          <Route path="dashboard" element={<RegulatorDashboard />} />
          <Route path="map" element={<RegulatorMap />} />
          <Route path="reports" element={<ReportsReview />} />
          <Route path="pharmacies" element={<PharmacyNetwork />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<RegulatorSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
