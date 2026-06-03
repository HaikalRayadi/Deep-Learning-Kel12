import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CardNav from "../components/CardNav";
import ShinyText from "../components/ShinyText"; 
import ScrollVelocity from "../components/ScrollVelocity"; 

function Catalog() {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

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

  const products = [
    { id: 1, name: "Dompet Kulit", price: 50000, rating: 4.5, image: "https://images.unsplash.com/photo-1627123424574-724758594e93" },
    { id: 2, name: "Sepatu Sneakers", price: 150000, rating: 4.8, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { id: 3, name: "Jam Tangan", price: 300000, rating: 4.7, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49" },
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    setUser(saved);
  }, []);

  const handlePredict = async (product) => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        price: product.price,
        rating: product.rating,
        purchase_count: user.purchaseCount,
      });
      if (!res.data.success) { alert(res.data.error); return; }
      setResults((prev) => ({ ...prev, [product.id]: res.data }));
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Backend tidak bisa diakses");
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="relative bg-transparent min-h-screen overflow-hidden">
      
      {/* --- FIXED NAVBAR --- */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-10 max-w-7xl mx-auto w-full">
        <CardNav
          items={navItems}
          baseColor="rgba(255, 255, 255, 0.05)" 
          menuColor="#ffffff" 
          buttonBgColor="#ffffff"
          buttonTextColor="#000000"
          ease="power3.out"
        />
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pb-20 pt-20">
        <div className="max-w-5xl flex flex-col gap-2"> 
          <ShinyText text="AI Dynamic Pricing" speed={3} delay={0} color="#ffffff" shineColor="#a1a1aa" spread={120} direction="left" className="text-5xl md:text-7xl font-normal tracking-tight leading-tight" />
          <ShinyText text="Sistem Prediksi Cerdas" speed={3} delay={1} color="#b5ff6d" shineColor="#ffedd5" spread={120} direction="left" className="text-4xl md:text-6xl font-bold tracking-tight leading-tight" />
        </div>
        <div className="max-w-2xl mt-8"> 
          <p className="text-gray-300 text-lg md:text-xl font-normal leading-relaxed tracking-wide text-center">
            Platform hadir sebagai solusi modern untuk memprediksi harga secara efisien dan terstruktur. Mulai dari analisis data, pemrosesan algoritma, hingga hasil rekomendasi — semua dalam satu sistem yang cerdas dan terpercaya.
          </p>
        </div>
      </div>

      {/* --- PRODUCT CATALOG SECTION --- */}
      <div className="relative z-10 pb-20">
        <div className="mb-12">
          <ScrollVelocity
            texts={[
              <span key="welcome">Selamat Datang <span className="text-[#b5ff6d]">{user.name}</span> •</span>, 
              `Daftar Produk •`
            ]} 
            velocity={50} 
            className="text-white/80 uppercase font-semibold italic" 
            numCopies={6}
          />
        </div>

        <div className="px-6 md:px-10">
          {/* --- CATEGORY BAR ONLY --- */}
          <div className="max-w-6xl mx-auto mb-12 flex justify-center">
            <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {["Semua", "Fashion", "Aksesoris", "Elektronik"].map((cat, idx) => (
                <button 
                  key={cat}
                  className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${idx === 0 ? "bg-[#b5ff6d] text-black shadow-[0_0_15px_rgba(181,255,109,0.3)]" : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className="text-[#b5ff6d] mb-5 font-medium text-center">AI sedang menghitung...</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} result={results[p.id]} onPredict={() => handlePredict(p)} loading={loading} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;