import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-main-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Subtle green top border like a medical/health app */}
        <div className="h-2 bg-primary w-full" />
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
