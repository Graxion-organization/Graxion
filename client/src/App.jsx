import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ContactPage from "./pages/ContactPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Verify from "./pages/Verify";
import StudentLogin from "./pages/StudentPortal/StudentLogin";
import StudentDashboard from "./pages/StudentPortal/StudentDashboard";

// Ecosystem pages
import ArtificialIntelligence from "./pages/ArtificialIntelligence";
import BusinessSoftware from "./pages/BusinessSoftware";
import CloudComputing from "./pages/CloudComputing";
import CyberSecurity from "./pages/CyberSecurity";
import DeveloperPlatforms from "./pages/DeveloperPlatforms";
import Education from "./pages/Education";

// Company pages
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Blog from "./pages/Blog";

// Resources pages
import Documentation from "./pages/Documentation";
import ApiReference from "./pages/ApiReference";
import Status from "./pages/Status";
import Community from "./pages/Community";

// Legal pages
import CookiePolicy from "./pages/CookiePolicy";
import Security from "./pages/Security";

import { AuthProvider } from "./admin/AdminAuthContext";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import InternshipDashboard from "./admin/modules/internships/InternshipDashboard";
import InternshipList from "./admin/modules/internships/InternshipList";
import InternshipForm from "./admin/modules/internships/InternshipForm";
import InternshipDetail from "./admin/modules/internships/InternshipDetail";
import FlowAdminApp from "./admin/modules/flow/FlowAdminApp";
import AdminProductSwitcher from "./admin/components/AdminProductSwitcher";
import "./App.css";

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "gx-ctrl-a7f3b2c1";

export default function App() {
  return (
    <div className="app noise-overlay">
      <ScrollToTop />
      <Routes>
        {/* ── Public Routes (with Navbar + Footer) ── */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/internship/verify" element={<Verify />} />
                  <Route path="/internship/verify/:certificateId" element={<Verify />} />
                  <Route path="/student/login" element={<StudentLogin />} />
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                  
                  {/* Ecosystem Routes */}
                  <Route path="/ecosystem/ai" element={<ArtificialIntelligence />} />
                  <Route path="/ecosystem/business" element={<BusinessSoftware />} />
                  <Route path="/ecosystem/cloud" element={<CloudComputing />} />
                  <Route path="/ecosystem/security" element={<CyberSecurity />} />
                  <Route path="/ecosystem/developer" element={<DeveloperPlatforms />} />
                  <Route path="/ecosystem/education" element={<Education />} />

                  {/* Company Routes */}
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/press" element={<Press />} />
                  <Route path="/blog" element={<Blog />} />

                  {/* Resources Routes */}
                  <Route path="/resources/documentation" element={<Documentation />} />
                  <Route path="/resources/api-reference" element={<ApiReference />} />
                  <Route path="/resources/status" element={<Status />} />
                  <Route path="/resources/community" element={<Community />} />

                  {/* Legal/Security Routes */}
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/security" element={<Security />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* ── Admin Routes (separate layout, no Navbar/Footer) ── */}
        <Route
          path={`/${ADMIN_PATH}/*`}
          element={
            <AuthProvider>
              <Routes>
                <Route path="login" element={<AdminLogin />} />
                <Route path="settings/*" element={<Navigate to={`/${ADMIN_PATH}/flow/settings`} replace />} />
                <Route path="students/*" element={
                  <Routes>
                    <Route element={<AdminLayout />}>
                      <Route path="dashboard" element={<InternshipDashboard />} />
                      <Route path="internships" element={<InternshipList />} />
                      <Route path="internships/new" element={<InternshipForm />} />
                      <Route path="internships/:id" element={<InternshipDetail />} />
                      <Route path="internships/:id/edit" element={<InternshipForm />} />
                    </Route>
                  </Routes>
                } />
                <Route path="flow/*" element={<FlowAdminApp />} />
              </Routes>
              <AdminProductSwitcher />
            </AuthProvider>
          }
        />
      </Routes>
    </div>
  );
}

