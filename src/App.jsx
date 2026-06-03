import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import AdminDashboard from "./pages/AdminDashboard";
import Beams from "./components/Beams"; // Import Beams di sini

function App() {
  return (
    <BrowserRouter>
      {/* GLOBAL 3D BACKGROUND */}
      <div className="fixed inset-0 z-[-1] bg-black">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* ROUTING HALAMAN */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;