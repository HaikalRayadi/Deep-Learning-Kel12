import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

function ProductCard({ product, result, onPredict, loading }) {
  const cardRef = useRef(null);

  // 1. Setup Motion Values untuk melacak posisi mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Setup Spring agar kemiringannya mulus (tidak patah-patah)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // 3. Transformasi posisi mouse menjadi rotasi derajat (maksimal miring 15 derajat)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Fungsi untuk menangkap gerakan kursor di atas kartu
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Hitung persentase posisi mouse (dari -0.5 sampai 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  // Kembalikan kartu ke posisi datar saat kursor keluar
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const format = (n) => {
    if (!n && n !== 0) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(n);
  };

  return (
    // Pembungkus utama untuk memberikan perspektif jarak kamera 3D
    <div style={{ perspective: 1200 }} className="relative w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d", // Mempertahankan efek 3D untuk elemen anak
        }}
        className="relative backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col justify-between h-full group transition-colors duration-300 hover:border-[#b5ff6d]/30 hover:bg-white/10"
      >
        {/* Lapisan glow samar saat di-hover */}
        <div 
          style={{ transform: "translateZ(0px)" }}
          className="absolute inset-0 bg-gradient-to-br from-[#b5ff6d]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" 
        />

        {/* --- KONTEN KARTU (Diberi translateZ agar melayang di atas background) --- */}
        <div style={{ transform: "translateZ(50px)" }} className="flex flex-col flex-grow">
          
          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-white/5">
            <img
              src={product.image}
              alt={product.name}
              className="h-44 w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-bold mt-4 text-white tracking-tight">
            {product.name}
          </h2>

          {/* ORIGINAL PRICE */}
          <p className="text-gray-400 line-through text-sm mt-1">
            {format(product.price)}
          </p>

          <div className="flex-grow mt-4">
            {/* RESULT SECTION */}
            {result && result.success ? (
              <div className="space-y-3">
                {/* FINAL PRICE (Diberi translateZ lebih tinggi agar paling menonjol) */}
                <div style={{ transform: "translateZ(30px)" }}>
                  <p className="text-[#b5ff6d] text-2xl font-extrabold tracking-tight drop-shadow-[0_0_8px_rgba(181,255,109,0.4)]">
                    {format(result.final_price)}
                  </p>
                </div>

                {/* DISCOUNT & STATUS */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-[#b5ff6d]/15 text-[#b5ff6d] px-2 py-1 rounded-md font-semibold border border-[#b5ff6d]/30">
                    Diskon {result.discount}%
                  </span>
                  <span className="text-gray-400">
                    Status: <b className="text-gray-200">{result.status}</b>
                  </span>
                </div>

                {/* INFO LABEL WITH PULSE */}
                <div className="p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-gray-300 flex items-center gap-2 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b5ff6d] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b5ff6d]"></span>
                  </span>
                  <span className="font-medium">AI Pricing aktif</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic mt-2">
                Belum diproses AI
              </p>
            )}
          </div>

          {/* BUTTON (Melayang dengan translateZ) */}
          <div style={{ transform: "translateZ(40px)" }} className="mt-5">
            <button
              onClick={onPredict}
              disabled={loading}
              className={`w-full p-3 rounded-xl font-bold text-sm transition-all duration-300 flex justify-center items-center gap-2
                ${loading
                  ? "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
                  : "bg-white text-black hover:bg-[#b5ff6d] hover:shadow-[0_0_15px_rgba(181,255,109,0.5)] border border-transparent"
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menghitung...
                </>
              ) : (
                "Gunakan AI Pricing"
              )}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default ProductCard;