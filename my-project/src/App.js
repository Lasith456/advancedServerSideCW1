import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import RoleProtectedRoute from './routes/RoleProtectedRoute';
import DashboardLayout from './pages/admin/DashboardLayout';
import AllCountries from './pages/admin/AllCountries';
import SingleCountry from './pages/admin/SingleCountry';
import GenerateApiKey from './pages/admin/GenerateApiKey';
import UserManagement from './pages/admin/UserManagement';
import ApiUsageStatus from './pages/admin/ApiUsageStatus'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user-dashboard"
          element={
            <RoleProtectedRoute role="user">
              <UserDashboard />
            </RoleProtectedRoute>
          }
        >
          <Route path="all-countries" element={<AllCountries />} />
          <Route path="single-country" element={<SingleCountry />} />
        </Route>

        <Route
          path="/admin-dashboard/"
          element={
            <RoleProtectedRoute role="admin">
              <DashboardLayout />
            </RoleProtectedRoute>
          }
        >
          <Route path="all-countries" element={<AllCountries />} />
          <Route path="single-country" element={<SingleCountry />} />
          <Route path="generate-key" element={<GenerateApiKey />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="api-usage" element={<ApiUsageStatus />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
