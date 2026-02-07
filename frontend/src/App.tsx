import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import OutletMenu from '@/pages/OutletMenu'
import Cart from '@/pages/Cart'
import Orders from '@/pages/Orders'
import StaffDashboard from '@/pages/StaffDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['Student', 'Faculty']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/outlet/:outletId"
          element={
            <ProtectedRoute allowedRoles={['Student', 'Faculty']}>
              <OutletMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={['Student', 'Faculty']}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={['Student', 'Faculty']}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

