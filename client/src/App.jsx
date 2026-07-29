import { Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "./admin/AdminAuthContext";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import InternshipDashboard from "./admin/modules/internships/InternshipDashboard";
import InternshipList from "./admin/modules/internships/InternshipList";
import InternshipForm from "./admin/modules/internships/InternshipForm";
import InternshipDetail from "./admin/modules/internships/InternshipDetail";
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
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<InternshipDashboard />} />
                  <Route path="internships" element={<InternshipList />} />
                  <Route path="internships/new" element={<InternshipForm />} />
                  <Route path="internships/:id" element={<InternshipDetail />} />
                  <Route path="internships/:id/edit" element={<InternshipForm />} />
                </Route>
              </Routes>
            </AuthProvider>
          }
        />
      </Routes>
    </div>
  );
}

