import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [purchaseCount, setPurchaseCount] = useState("");

  const handleLogin = () => {
    if (!name || !purchaseCount) {
      alert("Isi semua field terlebih dahulu!");
      return;
    }

    const user = {
      name,
      purchaseCount: parseInt(purchaseCount),
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/catalog");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-transparent p-4 overflow-hidden">
      
      {/* --- AMBIENT GLOW EFFECTS (Cahaya di belakang kaca) --- */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#b5ff6d] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-[120px] opacity-10" />

      {/* --- FORM CONTAINER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative backdrop-blur-2xl bg-black/40 border border-white/10 p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full max-w-md overflow-hidden"
      >
        {/* Dekorasi Garis Atas */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b5ff6d] to-transparent opacity-50" />

        {/* Header Title */}
        <div className="text-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl mb-4 shadow-inner">
            {/* Ikon User/Person (Menggantikan Ikon Petir) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#b5ff6d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          {/* NAMA WEB Disesuaikan */}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight">
            NeuraShop
          </h1>
          <p className="text-[#b5ff6d] font-medium text-xs tracking-widest uppercase">
            AI Dynamic Pricing System
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-5 mb-8">
          
          {/* Input Nama */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {/* Ikon Input User (Tetap dipertahankan agar match) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-[#b5ff6d] transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              className="w-full pl-12 p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b5ff6d]/50 focus:border-[#b5ff6d] focus:bg-white/10 transition-all shadow-inner"
              placeholder="Nama Lengkap User"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Input Jumlah Pembelian */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {/* Ikon History/Cart */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-[#b5ff6d] transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <input
              type="number"
              className="w-full pl-12 p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b5ff6d]/50 focus:border-[#b5ff6d] focus:bg-white/10 transition-all shadow-inner"
              placeholder="Total Riwayat Transaksi (Angka)"
              value={purchaseCount}
              onChange={(e) => setPurchaseCount(e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleLogin}
          className="relative w-full overflow-hidden bg-[#b5ff6d] hover:bg-[#9ce655] text-black font-extrabold p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-2 group shadow-[0_0_20px_rgba(181,255,109,0.3)]"
        >
          {/* Efek Kilatan pada Tombol (Memakai CSS class "hover-shimmer" dari index.css) */}
          <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] hover-shimmer skew-x-12" />
          
          <span className="relative z-10">AKSES SISTEM</span>
          
          {/* Ikon Panah */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transform group-hover:translate-x-1 transition-transform relative z-10" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Footer / Decor */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-center items-center gap-2">
           <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b5ff6d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b5ff6d]"></span>
            </span>
           <span className="text-gray-500 text-xs font-mono">SECURE CONNECTION ESTABLISHED</span>
        </div>

      </motion.div>
      
    </div>
  );
}

export default Login;