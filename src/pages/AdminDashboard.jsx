import { useEffect, useState } from "react";
import { motion } from "motion/react";
import CardNav from "../components/CardNav";

function AdminDashboard() {
  // Mock data untuk tabel (nantinya bisa kamu ganti dengan data dari axios/backend)
  const [logs, setLogs] = useState([
    { id: "LOG-001", user: "Budi Santoso", product: "Sepatu Sneakers", basePrice: 150000, finalPrice: 135000, discount: 10, time: "10:42 WIB" },
    { id: "LOG-002", user: "Siti Aminah", product: "Jam Tangan", basePrice: 300000, finalPrice: 285000, discount: 5, time: "11:15 WIB" },
    { id: "LOG-003", user: "Haikal", product: "Dompet Kulit", basePrice: 50000, finalPrice: 40000, discount: 20, time: "14:30 WIB" },
    { id: "LOG-004", user: "Andi Darma", product: "Sepatu Sneakers", basePrice: 150000, finalPrice: 142500, discount: 5, time: "15:05 WIB" },
  ]);

  // Konfigurasi Navigasi
  const navItems = [
    {
      label: "Pages",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Login Screen", href: "/", ariaLabel: "Go to Login" },
        { label: "Product Catalog", href: "/catalog", ariaLabel: "View Catalog" }
      ]
    },
    {
      label: "System", 
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Admin Dashboard", href: "/admin", ariaLabel: "Admin Panel" },
        { label: "Model Status", href: "#", ariaLabel: "AI Status" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#2F293A", 
      textColor: "#fff",
      links: [
        { label: "Email Support", href: "#", ariaLabel: "Email us" },
        { label: "GitHub", href: "https://github.com", ariaLabel: "GitHub" }
      ]
    }
  ];

  const format = (n) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);
  };

  // Varian animasi untuk framer-motion (efek muncul berurutan)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative bg-transparent min-h-screen pb-20">
      
      {/* --- NAVIGASI --- */}
      <CardNav
        items={navItems}
        baseColor="rgba(255, 255, 255, 0.05)" 
        menuColor="#ffffff" 
        buttonBgColor="#ffffff"
        buttonTextColor="#000000"
        ease="power3.out"
      />

      {/* --- KONTEN UTAMA DASHBOARD --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
        
        {/* Header Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">System Monitor</h1>
            <p className="text-gray-400 mt-1">Mengelola dan memantau performa AI Dynamic Pricing</p>
          </div>

          {/* Indikator Status Server */}
          <div className="flex items-center gap-3 px-4 py-2 bg-[#b5ff6d]/10 border border-[#b5ff6d]/20 rounded-full w-fit backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b5ff6d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#b5ff6d]"></span>
            </span>
            <span className="text-[#b5ff6d] font-semibold text-sm tracking-wide">Model Active</span>
          </div>
        </motion.div>

        {/* --- KARTU STATISTIK --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#b5ff6d]/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Pengguna</h3>
            <p className="text-3xl font-bold text-white">1,204</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Prediksi Hari Ini</h3>
            <p className="text-3xl font-bold text-white">845</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium mb-1">Akurasi Model</h3>
            <p className="text-3xl font-bold text-white">94.2<span className="text-lg text-gray-400">%</span></p>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={itemVariants} className="backdrop-blur-xl bg-[#b5ff6d]/10 border border-[#b5ff6d]/30 p-6 rounded-3xl shadow-[0_0_20px_rgba(181,255,109,0.1)] relative overflow-hidden group">
            <h3 className="text-[#b5ff6d] text-sm font-medium mb-1">Rata-rata Diskon</h3>
            <p className="text-3xl font-bold text-white">12.5<span className="text-lg text-[#b5ff6d]">%</span></p>
          </motion.div>
        </motion.div>

        {/* --- TABEL LOG PREDIKSI --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h2 className="text-xl font-bold text-white">Log Prediksi Terbaru</h2>
            <button className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              Refresh Data
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-sm uppercase tracking-wider bg-black/20">
                  <th className="p-5 font-semibold">ID Transaksi</th>
                  <th className="p-5 font-semibold">Waktu</th>
                  <th className="p-5 font-semibold">Nama User</th>
                  <th className="p-5 font-semibold">Produk</th>
                  <th className="p-5 font-semibold">Harga Final</th>
                  <th className="p-5 font-semibold">Diskon AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                {logs.map((log, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors group cursor-default">
                    <td className="p-5 font-mono text-xs text-gray-500 group-hover:text-gray-300">{log.id}</td>
                    <td className="p-5 text-sm">{log.time}</td>
                    <td className="p-5 font-medium">{log.user}</td>
                    <td className="p-5 text-gray-400">{log.product}</td>
                    <td className="p-5 font-bold text-white">{format(log.finalPrice)}</td>
                    <td className="p-5">
                      <span className="bg-[#b5ff6d]/15 text-[#b5ff6d] px-3 py-1 rounded-full text-xs font-bold border border-[#b5ff6d]/20">
                        {log.discount}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default AdminDashboard;