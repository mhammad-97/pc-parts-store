import { useState, useMemo, useRef } from "react";

const PARTS_DB = {
  cpu: [
    "Intel Core i3-10100","Intel Core i3-10105","Intel Core i3-12100","Intel Core i3-13100",
    "Intel Core i5-8400","Intel Core i5-8500","Intel Core i5-8600","Intel Core i5-9400",
    "Intel Core i5-9500","Intel Core i5-9600K","Intel Core i5-10400","Intel Core i5-10500",
    "Intel Core i5-10600K","Intel Core i5-11400","Intel Core i5-11600K","Intel Core i5-12400",
    "Intel Core i5-12600K","Intel Core i5-13400","Intel Core i5-13600K",
    "Intel Core i7-8700","Intel Core i7-8700K","Intel Core i7-9700","Intel Core i7-9700K",
    "Intel Core i7-10700","Intel Core i7-10700K","Intel Core i7-11700","Intel Core i7-11700K",
    "Intel Core i7-12700","Intel Core i7-12700K","Intel Core i7-13700","Intel Core i7-13700K",
    "Intel Core i9-9900K","Intel Core i9-10900K","Intel Core i9-11900K","Intel Core i9-12900K","Intel Core i9-13900K",
    "Intel Core 2 Duo E8400","Intel Core 2 Quad Q9400","Intel Core 2 Quad Q9650",
    "Intel Pentium G4560","Intel Pentium G4600","Intel Pentium G5400","Intel Pentium G6400",
    "Intel Celeron G5900","Intel Celeron G6900",
    "AMD Ryzen 3 2200G","AMD Ryzen 3 3200G","AMD Ryzen 3 3300X","AMD Ryzen 3 4100","AMD Ryzen 3 5300G",
    "AMD Ryzen 5 1600","AMD Ryzen 5 2600","AMD Ryzen 5 3400G","AMD Ryzen 5 3600","AMD Ryzen 5 3600X",
    "AMD Ryzen 5 4500","AMD Ryzen 5 4600G","AMD Ryzen 5 5500","AMD Ryzen 5 5600","AMD Ryzen 5 5600G","AMD Ryzen 5 5600X",
    "AMD Ryzen 5 7600","AMD Ryzen 5 7600X",
    "AMD Ryzen 7 1700","AMD Ryzen 7 2700X","AMD Ryzen 7 3700X","AMD Ryzen 7 3800X",
    "AMD Ryzen 7 5700G","AMD Ryzen 7 5700X","AMD Ryzen 7 5800X","AMD Ryzen 7 7700X",
    "AMD Ryzen 9 3900X","AMD Ryzen 9 5900X","AMD Ryzen 9 7900X",
    "AMD FX-8350","AMD FX-6300","AMD A10-9700","AMD A8-9600",
  ],
  gpu: [
    "NVIDIA GTX 750 Ti 2GB","NVIDIA GTX 950 2GB","NVIDIA GTX 960 2GB","NVIDIA GTX 960 4GB",
    "NVIDIA GTX 970 4GB","NVIDIA GTX 980 4GB","NVIDIA GTX 980 Ti 6GB",
    "NVIDIA GTX 1050 2GB","NVIDIA GTX 1050 Ti 4GB","NVIDIA GTX 1060 3GB","NVIDIA GTX 1060 6GB",
    "NVIDIA GTX 1070 8GB","NVIDIA GTX 1070 Ti 8GB","NVIDIA GTX 1080 8GB","NVIDIA GTX 1080 Ti 11GB",
    "NVIDIA RTX 2060 6GB","NVIDIA RTX 2060 Super 8GB","NVIDIA RTX 2070 8GB",
    "NVIDIA RTX 2070 Super 8GB","NVIDIA RTX 2080 8GB","NVIDIA RTX 2080 Super 8GB","NVIDIA RTX 2080 Ti 11GB",
    "NVIDIA RTX 3050 8GB","NVIDIA RTX 3060 12GB","NVIDIA RTX 3060 Ti 8GB",
    "NVIDIA RTX 3070 8GB","NVIDIA RTX 3070 Ti 8GB","NVIDIA RTX 3080 10GB","NVIDIA RTX 3080 Ti 12GB",
    "NVIDIA RTX 3090 24GB","NVIDIA RTX 4060 8GB","NVIDIA RTX 4060 Ti 8GB","NVIDIA RTX 4070 12GB",
    "NVIDIA RTX 4070 Ti 12GB","NVIDIA RTX 4080 16GB","NVIDIA RTX 4090 24GB",
    "AMD RX 470 4GB","AMD RX 470 8GB","AMD RX 480 4GB","AMD RX 480 8GB",
    "AMD RX 570 4GB","AMD RX 570 8GB","AMD RX 580 4GB","AMD RX 580 8GB",
    "AMD RX 590 8GB","AMD RX 5500 XT 8GB","AMD RX 5600 XT 6GB","AMD RX 5700 8GB","AMD RX 5700 XT 8GB",
    "AMD RX 6600 8GB","AMD RX 6600 XT 8GB","AMD RX 6700 XT 12GB","AMD RX 6800 16GB",
    "AMD RX 6800 XT 16GB","AMD RX 6900 XT 16GB","AMD RX 7600 8GB","AMD RX 7700 XT 12GB",
    "AMD RX 7900 XTX 24GB","AMD Radeon R9 380 4GB","AMD Radeon R9 390 8GB","AMD Radeon R9 Fury X 4GB",
  ],
  motherboard: [
    "ASUS PRIME B450M-A","ASUS PRIME B450-PLUS","ASUS PRIME B550M-A","ASUS PRIME B550-PLUS",
    "ASUS PRIME X570-P","ASUS ROG STRIX B450-F","ASUS ROG STRIX B550-F","ASUS ROG STRIX X570-E",
    "ASUS TUF GAMING B450-PLUS","ASUS TUF GAMING B550-PLUS","ASUS TUF GAMING X570-PLUS",
    "ASUS PRIME H310M-E","ASUS PRIME H410M-E","ASUS PRIME H510M-E","ASUS PRIME B365M-A",
    "ASUS PRIME Z390-A","ASUS PRIME Z490-A","ASUS PRIME Z590-A",
    "MSI B450 TOMAHAWK MAX","MSI B450M MORTAR","MSI B550 TOMAHAWK","MSI B550M PRO-VDH",
    "MSI MAG B550 TORPEDO","MSI MPG X570 GAMING EDGE","MSI MPG Z490 GAMING PLUS",
    "MSI PRO B550M-P GEN3","MSI PRO H510M-S01","MSI A320M-A PRO","MSI B350 TOMAHAWK",
    "Gigabyte B450 AORUS ELITE","Gigabyte B450M DS3H","Gigabyte B550 AORUS ELITE",
    "Gigabyte B550M DS3H","Gigabyte X570 AORUS ELITE","Gigabyte H310M S2H",
    "Gigabyte H410M S2H","Gigabyte H510M S2H","Gigabyte Z390 AORUS PRO","Gigabyte Z490 AORUS ELITE",
    "ASRock B450M PRO4","ASRock B550M PRO4","ASRock X570 Phantom Gaming 4",
    "ASRock H310CM-DVS","ASRock H410M-HDV","ASRock Z390 Pro4",
  ],
  ram: [
    "Kingston 4GB DDR3 1333MHz","Kingston 4GB DDR3 1600MHz","Kingston 8GB DDR3 1600MHz",
    "Kingston 4GB DDR4 2400MHz","Kingston 8GB DDR4 2666MHz","Kingston 8GB DDR4 3200MHz",
    "Kingston 16GB DDR4 2666MHz","Kingston 16GB DDR4 3200MHz","Kingston 32GB DDR4 3200MHz",
    "Kingston Fury Beast 8GB DDR4 3200MHz","Kingston Fury Beast 16GB DDR4 3200MHz",
    "Corsair Vengeance 8GB DDR4 3000MHz","Corsair Vengeance 8GB DDR4 3200MHz",
    "Corsair Vengeance 16GB DDR4 3200MHz","Corsair Vengeance LPX 8GB DDR4 2666MHz",
    "Corsair Vengeance RGB 16GB DDR4 3200MHz","Corsair Vengeance RGB 32GB DDR4 3200MHz",
    "G.Skill Ripjaws V 8GB DDR4 3200MHz","G.Skill Ripjaws V 16GB DDR4 3200MHz",
    "G.Skill Ripjaws V 32GB DDR4 3600MHz","G.Skill Trident Z 16GB DDR4 3200MHz",
    "Samsung 4GB DDR3 1600MHz","Samsung 8GB DDR3 1600MHz","Samsung 8GB DDR4 2666MHz",
    "Samsung 16GB DDR4 3200MHz","Team Group 8GB DDR4 3200MHz","Team Group 16GB DDR4 3200MHz",
    "Crucial 8GB DDR4 2666MHz","Crucial 16GB DDR4 3200MHz","Crucial Ballistix 8GB DDR4 3200MHz",
    "Crucial Ballistix 16GB DDR4 3200MHz","HyperX Fury 8GB DDR4 2666MHz",
    "HyperX Fury 16GB DDR4 3200MHz","HyperX Predator 16GB DDR4 3200MHz",
    "Adata XPG 8GB DDR4 3200MHz","Adata XPG 16GB DDR4 3200MHz",
  ],
  hdd: [
    "Western Digital 250GB SATA","Western Digital 320GB SATA","Western Digital 500GB SATA",
    "Western Digital 1TB SATA","Western Digital 2TB SATA","Western Digital 3TB SATA",
    "Western Digital 4TB SATA","Western Digital Blue 500GB","Western Digital Blue 1TB",
    "Western Digital Blue 2TB","Western Digital Black 1TB","Western Digital Black 2TB",
    "Seagate 250GB SATA","Seagate 320GB SATA","Seagate 500GB SATA",
    "Seagate 1TB SATA","Seagate 2TB SATA","Seagate 3TB SATA","Seagate 4TB SATA",
    "Seagate Barracuda 500GB","Seagate Barracuda 1TB","Seagate Barracuda 2TB",
    "Toshiba 500GB SATA","Toshiba 1TB SATA","Toshiba 2TB SATA",
    "Hitachi 250GB SATA","Hitachi 500GB SATA","Hitachi 1TB SATA",
    "Samsung 500GB SATA","Samsung 1TB SATA",
  ],
  ssd: [
    "Samsung 860 EVO 120GB","Samsung 860 EVO 250GB","Samsung 860 EVO 500GB","Samsung 860 EVO 1TB",
    "Samsung 870 EVO 250GB","Samsung 870 EVO 500GB","Samsung 870 EVO 1TB","Samsung 870 EVO 2TB",
    "Samsung 970 EVO 250GB NVMe","Samsung 970 EVO 500GB NVMe","Samsung 970 EVO 1TB NVMe",
    "Samsung 980 250GB NVMe","Samsung 980 500GB NVMe","Samsung 980 1TB NVMe",
    "Kingston A400 120GB","Kingston A400 240GB","Kingston A400 480GB","Kingston A400 960GB",
    "Kingston NV2 250GB NVMe","Kingston NV2 500GB NVMe","Kingston NV2 1TB NVMe",
    "WD Green 120GB","WD Green 240GB","WD Blue 250GB","WD Blue 500GB","WD Blue 1TB",
    "WD Black SN770 500GB NVMe","WD Black SN770 1TB NVMe",
    "Crucial BX500 120GB","Crucial BX500 240GB","Crucial BX500 480GB","Crucial BX500 1TB",
    "Crucial MX500 250GB","Crucial MX500 500GB","Crucial MX500 1TB",
    "Sandisk Ultra 240GB","Sandisk Ultra 480GB","Sandisk Plus 240GB","Sandisk Plus 480GB",
    "Adata SU650 120GB","Adata SU650 240GB","Adata SU650 480GB","Adata XPG SX8200 Pro 512GB NVMe",
    "Seagate Barracuda 120 250GB","Seagate Barracuda 120 500GB","Seagate Barracuda 120 1TB",
    "Team Group GX2 128GB","Team Group GX2 256GB","Team Group GX2 512GB",
  ],
  laptop: [
    "Dell Latitude E5470","Dell Latitude E5480","Dell Latitude E5570","Dell Latitude E7470",
    "Dell Latitude E7480","Dell Inspiron 3567","Dell Inspiron 5567","Dell Inspiron 5570",
    "Dell Inspiron 15 3000","Dell Inspiron 15 5000","Dell XPS 13 9360","Dell XPS 15 9560",
    "HP EliteBook 840 G3","HP EliteBook 840 G4","HP EliteBook 840 G5","HP EliteBook 850 G3",
    "HP ProBook 450 G5","HP ProBook 450 G6","HP ProBook 450 G7","HP ProBook 640 G4",
    "HP Pavilion 15","HP Laptop 15s","HP 250 G6","HP 250 G7","HP 250 G8",
    "Lenovo ThinkPad T460","Lenovo ThinkPad T470","Lenovo ThinkPad T480","Lenovo ThinkPad T490",
    "Lenovo ThinkPad L460","Lenovo ThinkPad L470","Lenovo ThinkPad L480","Lenovo ThinkPad L490",
    "Lenovo ThinkPad E470","Lenovo ThinkPad E480","Lenovo ThinkPad E490","Lenovo ThinkPad E590",
    "Lenovo IdeaPad 330","Lenovo IdeaPad 340","Lenovo IdeaPad 3 15","Lenovo IdeaPad 5 15",
    "Lenovo V15","Lenovo V145","Asus VivoBook 15","Asus VivoBook 14",
    "Asus ZenBook 14","Asus TUF Gaming A15","Asus TUF Gaming F15",
    "Acer Aspire 3","Acer Aspire 5","Acer Nitro 5","Acer Swift 3",
    "Toshiba Satellite Pro","MSI GF63 Thin","MSI Modern 14",
  ],
  psu: [
    "Corsair CV450 450W","Corsair CV550 550W","Corsair CV650 650W",
    "Corsair CX450 450W","Corsair CX550 550W","Corsair CX650 650W","Corsair CX750 750W",
    "Corsair RM650 650W","Corsair RM750 750W","Corsair RM850 850W",
    "EVGA 500 W1 500W","EVGA 600 W1 600W","EVGA 650 GQ 650W","EVGA 750 GQ 750W",
    "Seasonic Focus GX-550 550W","Seasonic Focus GX-650 650W","Seasonic Focus GX-750 750W",
    "be quiet! System Power 9 400W","be quiet! System Power 9 500W","be quiet! System Power 9 600W",
    "Cooler Master MWE 450W","Cooler Master MWE 550W","Cooler Master MWE 650W","Cooler Master MWE 750W",
    "Antec Neo ECO 450W","Antec Neo ECO 550W","Antec Neo ECO 650W",
    "Thermaltake Smart 500W","Thermaltake Smart 600W","Thermaltake Smart 650W",
    "FSP Hyper 500W","FSP Hyper 600W","FSP Hyper 700W",
    "DeepCool PF500 500W","DeepCool PF600 600W","DeepCool PF650 650W",
  ],
  cooling: [
    "Cooler Master Hyper 212 Black Edition","Cooler Master Hyper 212 EVO",
    "Cooler Master Hyper 212 RGB","Cooler Master MasterAir MA410M",
    "Noctua NH-U12S","Noctua NH-D15","Noctua NH-L9i","Noctua NH-U14S",
    "be quiet! Pure Rock 2","be quiet! Dark Rock 4","be quiet! Shadow Rock 3",
    "Arctic Freezer 34 eSports","Arctic Freezer 7 X","Arctic Alpine 12",
    "Deepcool AK400","Deepcool AK620","Deepcool Gammaxx 400",
    "Thermalright Assassin X 120 SE","Thermalright Peerless Assassin 120",
    "ID-Cooling SE-214-XT","ID-Cooling SE-226-XT",
    "Corsair H60 120mm AIO","Corsair H100i 240mm AIO","Corsair H150i 360mm AIO",
    "NZXT Kraken X53 240mm AIO","NZXT Kraken X63 280mm AIO","NZXT Kraken X73 360mm AIO",
    "Cooler Master MasterLiquid ML240L","Cooler Master MasterLiquid ML360L",
    "Intel Stock Cooler LGA1151","Intel Stock Cooler LGA1200","AMD Wraith Stealth","AMD Wraith Prism",
  ],
  cables: [
    "كابل SATA Data","كابل SATA Power","كابل ATX 24 Pin","كابل CPU 8 Pin",
    "كابل PCIe 6 Pin","كابل PCIe 8 Pin","كابل PCIe 6+2 Pin",
    "كابل HDMI 1.4","كابل HDMI 2.0","كابل DisplayPort","كابل VGA",
    "كابل DVI-D","كابل USB 3.0","كابل USB Type-C",
    "كابل Ethernet Cat6","كابل Ethernet Cat5e",
    "كابل Extension ATX","Thermal Paste Arctic MX-4","Thermal Paste Noctua NT-H1",
    "Thermal Paste Cooler Master MasterGel","Thermal Pad",
    "براغي HDD","براغي Motherboard Standoff","Fan Splitter 4-Pin",
  ],
};


const CATEGORIES = [
  { id: "all", label: "الكل", icon: "◈" },
  { id: "hdd", label: "هارد ديسك HDD", icon: "💾" },
  { id: "ssd", label: "SSD", icon: "⚡" },
  { id: "ram", label: "رام RAM", icon: "🧠" },
  { id: "cpu", label: "معالج CPU", icon: "🔲" },
  { id: "gpu", label: "كارت شاشة GPU", icon: "🖥️" },
  { id: "motherboard", label: "لوحة أم", icon: "🔌" },
  { id: "laptop", label: "لاب توب", icon: "💻" },
  { id: "psu", label: "باور سبلاي", icon: "⚡" },
  { id: "cooling", label: "تبريد", icon: "❄️" },
  { id: "cables", label: "كابلات وإكسسوار", icon: "🔗" },
];

const INITIAL_PRODUCTS = [
  { id: 1, name: "Western Digital 500GB", category: "hdd", price: 90, cost: 60, qty: 3, condition: "ممتاز", specs: "SATA 3 - 7200RPM", img: "💾" },
  { id: 2, name: "Seagate 1TB", category: "hdd", price: 130, cost: 90, qty: 1, condition: "جيد", specs: "SATA 3 - 5400RPM", img: "💾" },
  { id: 3, name: "Samsung 256GB SSD", category: "ssd", price: 170, cost: 130, qty: 2, condition: "ممتاز", specs: "SATA 3 - 550MB/s", img: "⚡" },
  { id: 4, name: "Kingston 8GB DDR4", category: "ram", price: 65, cost: 45, qty: 5, condition: "ممتاز", specs: "2666MHz - DDR4", img: "🧠" },
  { id: 5, name: "Intel Core i5-8400", category: "cpu", price: 280, cost: 200, qty: 1, condition: "جيد جداً", specs: "6 أنوية - 2.8GHz", img: "🔲" },
  { id: 6, name: "GTX 1060 6GB", category: "gpu", price: 450, cost: 320, qty: 1, condition: "جيد", specs: "6GB GDDR5 - 192bit", img: "🖥️" },
  { id: 7, name: "Lenovo ThinkPad L470", category: "laptop", price: 1050, cost: 780, qty: 1, condition: "ممتاز", specs: "i5-7200U - 8GB - 256SSD", img: "💻" },
  { id: 8, name: "Corsair 550W", category: "psu", price: 150, cost: 100, qty: 2, condition: "جيد", specs: "80+ Bronze - ATX", img: "⚡" },
];

const INITIAL_SALES = [
  { id: 1, date: "2025-03-01", customer: "أبو علي", items: [{ name: "Kingston 8GB DDR4", qty: 2, price: 65 }], total: 130, cost: 90, profit: 40 },
  { id: 2, date: "2025-03-10", customer: "محمد خالد", items: [{ name: "Samsung 256GB SSD", qty: 1, price: 170 }], total: 170, cost: 130, profit: 40 },
  { id: 3, date: "2025-03-20", customer: "سامر ناصر", items: [{ name: "GTX 1060 6GB", qty: 1, price: 450 }, { name: "Intel Core i5-8400", qty: 1, price: 280 }], total: 730, cost: 520, profit: 210 },
];

const CONDITION_COLORS = {
  "ممتاز": { bg: "#00ff8818", border: "#00ff88", text: "#00ff88" },
  "جيد جداً": { bg: "#00cfff18", border: "#00cfff", text: "#00cfff" },
  "جيد": { bg: "#ffaa0018", border: "#ffaa00", text: "#ffaa00" },
};

const DELIVERY_OPTIONS = [
  { label: "بدون توصيل", price: 0 },
  { label: "الضفة الغربية", price: 20 },
  { label: "القدس", price: 30 },
  { label: "الداخل", price: 70 },
];

const ADMIN_PASSWORD = "admin123";
const WHATSAPP_NUMBER = "972595179659";
const fmt = (n) => `₪${Number(n).toLocaleString()}`;

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [sales, setSales] = useState(INITIAL_SALES);
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2025-03-05", desc: "إيجار المحل", amount: 800 },
    { id: 2, date: "2025-03-15", desc: "كهرباء", amount: 120 },
  ]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeView, setActiveView] = useState("inventory");
  const [showLogin, setShowLogin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [flashId, setFlashId] = useState(null);
  const [costForm, setCostForm] = useState({ desc: "", amount: "" });
  const [form, setForm] = useState({ name: "", category: "hdd", price: "", cost: "", qty: "", condition: "ممتاز", specs: "", img: "", imgUrl: "" });
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "", notes: "", delivery: 0 });

  const filtered = useMemo(() => products.filter(p => {
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || (p.specs || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [products, selectedCategory, search]);

  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartTotal = cartSubtotal + (orderForm.delivery || 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const totalRevenue = sales.reduce((s, x) => s + x.total, 0);
  const totalCost = sales.reduce((s, x) => s + x.cost, 0);
  const totalExpenses = expenses.reduce((s, x) => s + x.amount, 0);
  const netProfit = totalRevenue - totalCost - totalExpenses;
  const inventoryValue = products.reduce((s, p) => s + (p.cost || 0) * p.qty, 0);

  const addToCart = (p) => {
    const existing = cart.find(i => i.id === p.id);
    if (existing) {
      if (existing.qty >= p.qty) return;
      setCart(cart.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
    setFlashId(p.id);
    setTimeout(() => setFlashId(null), 700);
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    const p = products.find(p => p.id === id);
    if (qty > p.qty) return;
    setCart(cart.map(i => i.id === id ? { ...i, qty } : i));
  };

  const sendWhatsApp = () => {
    const deliveryLabel = DELIVERY_OPTIONS.find(d => d.price === orderForm.delivery)?.label || "بدون توصيل";
    const lines = cart.map(i => `• ${i.name} × ${i.qty} = ${fmt(i.price * i.qty)}`).join("\n");
    const deliveryLine = orderForm.delivery > 0 ? `\n🚚 رسوم التوصيل (${deliveryLabel}): ${fmt(orderForm.delivery)}` : "";
    const msg = `🛒 *طلب شراء جديد*\n\n👤 الاسم: ${orderForm.name}\n📞 الهاتف: ${orderForm.phone}\n📍 العنوان: ${orderForm.address}${orderForm.notes ? `\n📝 ملاحظات: ${orderForm.notes}` : ""}\n\n*القطع المطلوبة:*\n${lines}${deliveryLine}\n\n💰 *الإجمالي: ${fmt(cartTotal)}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false); setShowOrderForm(false); setShowCart(false);
      setCart([]); setOrderForm({ name: "", phone: "", address: "", notes: "", delivery: 0 });
    }, 2500);
  };

  const handleLogin = () => {
    if (loginInput === ADMIN_PASSWORD) { setIsAdmin(true); setShowLogin(false); setLoginInput(""); setLoginError(false); }
    else setLoginError(true);
  };

  const [previewImg, setPreviewImg] = useState(null);

  const downloadImage = (imgUrl, name) => {
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = `${name}.jpg`;
    a.click();
  };

  const [acSuggestions, setAcSuggestions] = useState([]);
  const [showAc, setShowAc] = useState(false);

  const handleNameChange = (val) => {
    setForm(f => ({ ...f, name: val }));
    if (val.length < 2) { setAcSuggestions([]); setShowAc(false); return; }
    const list = PARTS_DB[form.category] || [];
    const filtered = list.filter(s => s.toLowerCase().includes(val.toLowerCase())).slice(0, 6);
    setAcSuggestions(filtered);
    setShowAc(filtered.length > 0);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, imgUrl: ev.target.result, img: "" }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.qty) return;
    const cat = CATEGORIES.find(c => c.id === form.category);
    const data = { ...form, price: +form.price, cost: +form.cost || 0, qty: +form.qty, img: form.imgUrl ? "" : (form.img || cat?.icon || "📦"), imgUrl: form.imgUrl || "" };
    if (editingProduct) setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data } : p));
    else setProducts([...products, { ...data, id: Date.now() }]);
    setForm({ name: "", category: "hdd", price: "", cost: "", qty: "", condition: "ممتاز", specs: "", img: "", imgUrl: "" });
    setShowAddForm(false); setEditingProduct(null);
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: p.price, cost: p.cost || "", qty: p.qty, condition: p.condition, specs: p.specs || "", img: p.img, imgUrl: p.imgUrl || "" });
    setEditingProduct(p); setShowAddForm(true);
  };

  const addExpense = () => {
    if (!costForm.desc || !costForm.amount) return;
    setExpenses([...expenses, { id: Date.now(), date: new Date().toISOString().split("T")[0], desc: costForm.desc, amount: +costForm.amount }]);
    setCostForm({ desc: "", amount: "" });
  };

  const NAV = isAdmin
    ? [{ id: "inventory", icon: "📦", label: "المستودع" }, { id: "accounting", icon: "💰", label: "المحاسبة" }, { id: "stats", icon: "📊", label: "الإحصائيات" }]
    : [];

  const inp = (extra = {}) => ({ style: { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(0,200,255,0.15)", borderRadius: 9, padding: "9px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", ...extra } });

  return (
    <div style={{ minHeight: "100vh", background: "#07070f", fontFamily: "Segoe UI, Tahoma, sans-serif", direction: "rtl", color: "#ddd", paddingBottom: 30 }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(0,180,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,255,0.025) 1px,transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(7,7,15,0.97)", borderBottom: "1px solid rgba(0,200,255,0.12)", backdropFilter: "blur(20px)", padding: "0 14px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 7, background: "linear-gradient(135deg,#00cfff,#0050ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>💻</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>مستودع قطع الكمبيوتر</div>
              <div style={{ fontSize: 9, color: "#00cfff50", letterSpacing: 1 }}>USED PC PARTS</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <button onClick={() => setShowCart(true)} style={{ position: "relative", background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)", color: "#00cfff", borderRadius: 9, padding: "5px 11px", cursor: "pointer", fontSize: 14 }}>
              🛒
              {cartCount > 0 && <span style={{ position: "absolute", top: -7, right: -7, background: "#ff3355", color: "#fff", borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>{cartCount}</span>}
            </button>
            {isAdmin ? (
              <>
                <button onClick={() => { setShowAddForm(true); setEditingProduct(null); setForm({ name: "", category: "hdd", price: "", cost: "", qty: "", condition: "ممتاز", specs: "", img: "", imgUrl: "" }); }} style={{ background: "linear-gradient(135deg,#00cfff,#0050ff)", border: "none", color: "#fff", borderRadius: 8, padding: "5px 11px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>+ إضافة</button>
                <button onClick={() => { setIsAdmin(false); setActiveView("inventory"); }} style={{ background: "rgba(255,50,50,0.12)", border: "1px solid rgba(255,50,50,0.25)", color: "#ff5555", borderRadius: 8, padding: "5px 9px", cursor: "pointer", fontSize: 11 }}>خروج</button>
              </>
            ) : (
              <button onClick={() => setShowLogin(true)} style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)", color: "#00cfff", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 11 }}>🔐 مدير</button>
            )}
          </div>
        </div>
      </header>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "14px" }}>
        {NAV.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "rgba(255,255,255,0.03)", borderRadius: 11, padding: 4 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setActiveView(n.id)} style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11, fontFamily: "inherit", fontWeight: 700, background: activeView === n.id ? "rgba(0,200,255,0.12)" : "transparent", color: activeView === n.id ? "#00cfff" : "#555", borderBottom: activeView === n.id ? "2px solid #00cfff" : "2px solid transparent", transition: "all 0.2s" }}>{n.icon} {n.label}</button>
            ))}
          </div>
        )}

        {/* INVENTORY */}
        {activeView === "inventory" && <>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 ابحث عن قطعة أو مواصفة..." {...inp({ marginBottom: 12, border: "1px solid rgba(0,200,255,0.18)" })} />
          <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 6, marginBottom: 12, scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => {
              const count = cat.id === "all" ? products.length : products.filter(p => p.category === cat.id).length;
              if (!count && cat.id !== "all") return null;
              const active = selectedCategory === cat.id;
              return <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ flexShrink: 0, background: active ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${active ? "#00cfff60" : "rgba(255,255,255,0.07)"}`, color: active ? "#00cfff" : "#777", borderRadius: 18, padding: "4px 11px", cursor: "pointer", fontSize: 10, fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.2s" }}>{cat.icon} {cat.label} ({count})</button>;
            })}
          </div>
          <div style={{ fontSize: 10, color: "#444", marginBottom: 10 }}>{filtered.length} نتيجة</div>
          {!filtered.length ? (
            <div style={{ textAlign: "center", padding: "50px 0", color: "#333" }}><div style={{ fontSize: 36 }}>📭</div><div style={{ marginTop: 6, fontSize: 13 }}>لا توجد منتجات</div></div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {filtered.map(p => {
                const cond = CONDITION_COLORS[p.condition] || CONDITION_COLORS["جيد"];
                const inCart = cart.find(i => i.id === p.id);
                const flashing = flashId === p.id;
                return (
                  <div key={p.id} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 13, overflow: "hidden", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,200,255,0.22)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div onClick={() => p.imgUrl && setPreviewImg(p)} style={{ width: "100%", paddingTop: "100%", position: "relative", background: "rgba(0,200,255,0.035)", borderBottom: "1px solid rgba(255,255,255,0.04)", overflow: "hidden", cursor: p.imgUrl ? "zoom-in" : "default" }}>
                      {p.imgUrl
                        ? <img src={p.imgUrl} alt={p.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>{p.img}</div>
                      }
                    </div>
                    <div style={{ padding: "10px" }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#e8e8e8", marginBottom: 3, lineHeight: 1.3 }}>{p.name}</div>
                      <div style={{ fontSize: 9, color: "#444", marginBottom: 7 }}>{p.specs}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: "#00cfff" }}>{fmt(p.price)}</div>
                        <div style={{ fontSize: 8, padding: "2px 6px", borderRadius: 20, background: cond.bg, border: `1px solid ${cond.border}40`, color: cond.text }}>{p.condition}</div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 7px", background: "rgba(255,255,255,0.03)", borderRadius: 7, marginBottom: 7 }}>
                        <span style={{ fontSize: 9, color: "#555" }}>الكمية</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: p.qty === 0 ? "#ff5555" : p.qty === 1 ? "#ffaa00" : "#00ff88" }}>{p.qty === 0 ? "نفذ ❌" : `${p.qty} متاح`}</span>
                      </div>
                      {p.qty > 0 && (
                        <button onClick={() => addToCart(p)} style={{ width: "100%", padding: "6px", borderRadius: 7, border: `1px solid ${flashing ? "#00ff8860" : "#00cfff30"}`, cursor: "pointer", fontSize: 10, fontFamily: "inherit", fontWeight: 600, background: flashing ? "rgba(0,255,136,0.15)" : inCart ? "rgba(0,200,255,0.1)" : "rgba(0,200,255,0.06)", color: flashing ? "#00ff88" : "#00cfff", transition: "all 0.3s" }}>
                          {flashing ? "✅ أُضيف!" : inCart ? `🛒 في السلة (${inCart.qty})` : "+ أضف للسلة"}
                        </button>
                      )}
                      {p.imgUrl && (
                        <button onClick={() => downloadImage(p.imgUrl, p.name)} style={{ width: "100%", padding: "5px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontSize: 10, fontFamily: "inherit", background: "rgba(255,255,255,0.03)", color: "#666", marginTop: 5, transition: "all 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#00cfff"; e.currentTarget.style.borderColor = "rgba(0,200,255,0.25)"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                          تنزيل الصورة
                        </button>
                      )}
                      {isAdmin && (
                        <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                          <button onClick={() => handleEdit(p)} style={{ flex: 1, background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.12)", color: "#00cfff80", borderRadius: 7, padding: "5px", cursor: "pointer", fontSize: 10, fontFamily: "inherit" }}>✏️ تعديل</button>
                          <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} style={{ background: "rgba(255,50,50,0.06)", border: "1px solid rgba(255,50,50,0.12)", color: "#ff555580", borderRadius: 7, padding: "5px 7px", cursor: "pointer", fontSize: 10 }}>🗑️</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>}

        {/* ACCOUNTING */}
        {activeView === "accounting" && isAdmin && <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { l: "إجمالي المبيعات", v: fmt(totalRevenue), icon: "📈", c: "#00ff88" },
              { l: "تكلفة البضاعة", v: fmt(totalCost), icon: "📦", c: "#ffaa00" },
              { l: "المصاريف", v: fmt(totalExpenses), icon: "🧾", c: "#ff6060" },
              { l: "صافي الربح", v: fmt(netProfit), icon: "💰", c: netProfit >= 0 ? "#00ff88" : "#ff5555" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.c}20`, borderRadius: 12, padding: "13px", textAlign: "center" }}>
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: s.c, marginTop: 4 }}>{s.v}</div>
                <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.15)", borderRadius: 11, padding: "11px 14px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#999" }}>💼 قيمة المخزون (بالتكلفة)</span>
            <span style={{ fontSize: 17, fontWeight: 800, color: "#00cfff" }}>{fmt(inventoryValue)}</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 11 }}>🧾 المصاريف</div>
            <div style={{ display: "flex", gap: 7, marginBottom: 11 }}>
              <input value={costForm.desc} onChange={e => setCostForm({ ...costForm, desc: e.target.value })} placeholder="البيان" {...inp({ flex: 2 })} />
              <input value={costForm.amount} onChange={e => setCostForm({ ...costForm, amount: e.target.value })} type="number" placeholder="₪" {...inp({ flex: 1 })} />
              <button onClick={addExpense} style={{ background: "linear-gradient(135deg,#00cfff,#0050ff)", border: "none", color: "#fff", borderRadius: 8, padding: "0 12px", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
            </div>
            {expenses.map(e => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div><div style={{ fontSize: 12, color: "#ccc" }}>{e.desc}</div><div style={{ fontSize: 9, color: "#444" }}>{e.date}</div></div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#ff6060" }}>{fmt(e.amount)}</span>
                  <button onClick={() => setExpenses(expenses.filter(x => x.id !== e.id))} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 13 }}>✕</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 11 }}>📋 سجل المبيعات</div>
            {sales.map(s => (
              <div key={s.id} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "11px", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <div><div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{s.customer}</div><div style={{ fontSize: 9, color: "#444" }}>{s.date}</div></div>
                  <div style={{ textAlign: "left" }}><div style={{ fontSize: 13, fontWeight: 700, color: "#00cfff" }}>{fmt(s.total)}</div><div style={{ fontSize: 9, color: "#00ff88" }}>ربح: {fmt(s.profit)}</div></div>
                </div>
                <div style={{ fontSize: 9, color: "#555" }}>{s.items.map((it, i) => <span key={i}>{it.name} ×{it.qty}{i < s.items.length - 1 ? " | " : ""}</span>)}</div>
              </div>
            ))}
          </div>
        </>}

        {/* STATS */}
        {activeView === "stats" && isAdmin && <>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 14 }}>📊 إحصائيات المستودع</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { l: "إجمالي الأصناف", v: products.length, icon: "📦", c: "#00cfff" },
              { l: "إجمالي القطع", v: products.reduce((s, p) => s + p.qty, 0), icon: "🔢", c: "#00ff88" },
              { l: "قيمة المخزون", v: fmt(inventoryValue), icon: "💼", c: "#ffaa00" },
              { l: "الفئات النشطة", v: [...new Set(products.map(p => p.category))].length, icon: "🗂️", c: "#ff66cc" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.c}20`, borderRadius: 12, padding: "13px", textAlign: "center" }}>
                <div style={{ fontSize: 24 }}>{s.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: s.c, marginTop: 4 }}>{s.v}</div>
                <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 12 }}>توزيع المخزون بالفئة</div>
            {(() => {
              const maxQty = Math.max(1, ...CATEGORIES.filter(c => c.id !== "all").map(cat => products.filter(p => p.category === cat.id).reduce((s, p) => s + p.qty, 0)));
              return CATEGORIES.filter(c => c.id !== "all").map(cat => {
                const qty = products.filter(p => p.category === cat.id).reduce((s, p) => s + p.qty, 0);
                if (!qty) return null;
                return (
                  <div key={cat.id} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                      <span style={{ color: "#bbb" }}>{cat.icon} {cat.label}</span>
                      <span style={{ color: "#00cfff" }}>{qty}</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 5 }}>
                      <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#00cfff,#0050ff)", width: `${(qty / maxQty) * 100}%`, transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </>}
      </div>

      {/* CART MODAL */}
      {showCart && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowCart(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0b0b16", border: "1px solid rgba(0,200,255,0.18)", borderRadius: "18px 18px 0 0", padding: 20, width: "100%", maxWidth: 500, maxHeight: "78vh", overflowY: "auto" }}>
            <div style={{ width: 38, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2, margin: "0 auto 16px" }} />
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>🛒 السلة</div>
            {!cart.length ? (
              <div style={{ textAlign: "center", padding: "35px 0", color: "#333" }}><div style={{ fontSize: 32 }}>🛒</div><div style={{ marginTop: 6, fontSize: 12 }}>السلة فارغة</div></div>
            ) : <>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: 26 }}>{item.img}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{item.name}</div>
                    <div style={{ fontSize: 10, color: "#00cfff", marginTop: 1 }}>{fmt(item.price)} × {item.qty} = {fmt(item.price * item.qty)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "none", color: "#fff", cursor: "pointer", fontSize: 13 }}>−</button>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,200,255,0.12)", border: "none", color: "#00cfff", cursor: "pointer", fontSize: 13 }}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ff4455", cursor: "pointer", fontSize: 14 }}>🗑️</button>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid rgba(0,200,255,0.15)", marginTop: 6 }}>
                <span style={{ fontSize: 13, color: "#aaa" }}>الإجمالي</span>
                <span style={{ fontSize: 19, fontWeight: 800, color: "#00cfff" }}>{fmt(cartTotal)}</span>
              </div>
              <button onClick={() => setShowOrderForm(true)} style={{ width: "100%", background: "linear-gradient(135deg,#25d366,#128c7e)", border: "none", color: "#fff", borderRadius: 11, padding: "13px", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }}>
                📲 إرسال طلب عبر واتساب
              </button>
            </>}
          </div>
        </div>
      )}

      {/* ORDER FORM */}
      {showOrderForm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowOrderForm(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0b0b16", border: "1px solid rgba(37,211,102,0.25)", borderRadius: "18px 18px 0 0", padding: 22, width: "100%", maxWidth: 500, maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ width: 38, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2, margin: "0 auto 16px" }} />
            {orderSent ? (
              <div style={{ textAlign: "center", padding: "35px 0" }}>
                <div style={{ fontSize: 48 }}>✅</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#25d366", marginTop: 10 }}>تم إرسال الطلب!</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 5 }}>جاري فتح واتساب...</div>
              </div>
            ) : <>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>📋 بيانات الطلب</div>
              <div style={{ fontSize: 10, color: "#555", marginBottom: 14 }}>أكمل البيانات وسيتم فتح واتساب تلقائياً</div>
              <div style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.15)", borderRadius: 9, padding: "10px 12px", marginBottom: 14 }}>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#bbb", marginBottom: 3 }}>
                    <span>{item.name} ×{item.qty}</span>
                    <span style={{ color: "#25d366" }}>{fmt(item.price * item.qty)}</span>
                  </div>
                ))}
                {orderForm.delivery > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#bbb", marginBottom: 3 }}>
                    <span>🚚 رسوم التوصيل</span>
                    <span style={{ color: "#ffaa00" }}>{fmt(orderForm.delivery)}</span>
                  </div>
                )}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 8, paddingTop: 7, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>الإجمالي</span>
                  <span style={{ fontSize: 13, color: "#25d366", fontWeight: 800 }}>{fmt(cartTotal)}</span>
                </div>
              </div>
              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 10, color: "#777", display: "block", marginBottom: 6 }}>🚚 رسوم التوصيل</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {DELIVERY_OPTIONS.map(d => (
                    <button key={d.price} onClick={() => setOrderForm({ ...orderForm, delivery: d.price })} style={{ padding: "8px 6px", borderRadius: 8, border: `1px solid ${orderForm.delivery === d.price ? "#00cfff60" : "rgba(255,255,255,0.07)"}`, background: orderForm.delivery === d.price ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.03)", color: orderForm.delivery === d.price ? "#00cfff" : "#777", cursor: "pointer", fontSize: 11, fontFamily: "inherit", fontWeight: orderForm.delivery === d.price ? 700 : 400, transition: "all 0.2s" }}>
                      {d.label}<br /><span style={{ fontSize: 12, fontWeight: 800 }}>{d.price === 0 ? "مجاني" : fmt(d.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
              {[
                { label: "اسم الزبون *", key: "name", placeholder: "محمد أحمد", type: "text" },
                { label: "رقم الهاتف *", key: "phone", placeholder: "0599123456", type: "tel" },
                { label: "العنوان *", key: "address", placeholder: "المدينة، الحي، الشارع", type: "text" },
                { label: "ملاحظات", key: "notes", placeholder: "أي تفاصيل...", type: "text" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 11 }}>
                  <label style={{ fontSize: 10, color: "#777", display: "block", marginBottom: 4 }}>{f.label}</label>
                  <input type={f.type} value={orderForm[f.key]} onChange={e => setOrderForm({ ...orderForm, [f.key]: e.target.value })} placeholder={f.placeholder} {...inp({})} />
                </div>
              ))}
              <div style={{ display: "flex", gap: 9, marginTop: 16 }}>
                <button onClick={() => setShowOrderForm(false)} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#666", borderRadius: 10, padding: "11px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>رجوع</button>
                <button onClick={sendWhatsApp} disabled={!orderForm.name || !orderForm.phone || !orderForm.address} style={{ flex: 2, background: orderForm.name && orderForm.phone && orderForm.address ? "linear-gradient(135deg,#25d366,#128c7e)" : "rgba(255,255,255,0.04)", border: "none", color: orderForm.name && orderForm.phone && orderForm.address ? "#fff" : "#333", borderRadius: 10, padding: "11px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
                  📲 إرسال عبر واتساب
                </button>
              </div>
            </>}
          </div>
        </div>
      )}

      {/* LOGIN */}
      {showLogin && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowLogin(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0b0b16", border: "1px solid rgba(0,200,255,0.25)", borderRadius: 15, padding: 26, width: "100%", maxWidth: 300 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: 4 }}>🔐 دخول المدير</div>
            <div style={{ fontSize: 10, color: "#444", textAlign: "center", marginBottom: 18 }}>المحاسبة والإحصائيات للمدير فقط</div>
            <input type="password" value={loginInput} onChange={e => { setLoginInput(e.target.value); setLoginError(false); }} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="كلمة المرور" {...inp({ textAlign: "center", border: `1px solid ${loginError ? "#ff5555" : "rgba(0,200,255,0.18)"}`, marginBottom: 8 })} />
            {loginError && <div style={{ color: "#ff5555", fontSize: 10, textAlign: "center", marginBottom: 8 }}>كلمة المرور خاطئة ❌</div>}
            <button onClick={handleLogin} style={{ width: "100%", background: "linear-gradient(135deg,#00cfff,#0050ff)", border: "none", color: "#fff", borderRadius: 9, padding: "11px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>دخول</button>
            <div style={{ fontSize: 9, color: "#2a2a2a", textAlign: "center", marginTop: 10 }}>تجريبي: admin123</div>
          </div>
        </div>
      )}

      {/* ADD/EDIT */}
      {showAddForm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => { setShowAddForm(false); setEditingProduct(null); }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0b0b16", border: "1px solid rgba(0,200,255,0.18)", borderRadius: "18px 18px 0 0", padding: 22, width: "100%", maxWidth: 500, maxHeight: "87vh", overflowY: "auto" }}>
            <div style={{ width: 38, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2, margin: "0 auto 16px" }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{editingProduct ? "✏️ تعديل المنتج" : "➕ إضافة منتج جديد"}</div>
            {[
              { label: "سعر البيع (₪) *", key: "price", type: "number", ph: "170" },
              { label: "سعر الشراء (₪)", key: "cost", type: "number", ph: "130" },
              { label: "الكمية *", key: "qty", type: "number", ph: "1" },
              { label: "المواصفات", key: "specs", type: "text", ph: "SATA 3 - 550MB/s" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 11 }}>
                <label style={{ fontSize: 10, color: "#666", display: "block", marginBottom: 4 }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} {...inp({})} />
              </div>
            ))}
            {/* اسم القطعة مع Autocomplete */}
            <div style={{ marginBottom: 11, position: "relative" }}>
              <label style={{ fontSize: 10, color: "#666", display: "block", marginBottom: 4 }}>اسم القطعة *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
                onFocus={() => form.name.length >= 2 && setShowAc(acSuggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowAc(false), 200)}
                placeholder={PARTS_DB[form.category]?.[0] || "اكتب اسم القطعة..."}
                {...inp({})}
              />
              {showAc && (
                <div style={{ position: "absolute", top: "100%", right: 0, left: 0, zIndex: 100, background: "#0f0f1e", border: "1px solid rgba(0,200,255,0.3)", borderRadius: 9, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.5)", marginTop: 2 }}>
                  {acSuggestions.map((s, i) => (
                    <div key={i} onMouseDown={() => { setForm(f => ({ ...f, name: s })); setShowAc(false); }}
                      style={{ padding: "9px 12px", fontSize: 12, color: "#ccc", cursor: "pointer", borderBottom: i < acSuggestions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(0,200,255,0.1)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      {s.split(new RegExp(`(${form.name})`, "gi")).map((part, j) =>
                        part.toLowerCase() === form.name.toLowerCase()
                          ? <span key={j} style={{ color: "#00cfff", fontWeight: 700 }}>{part}</span>
                          : part
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ marginBottom: 11 }}>
              <label style={{ fontSize: 10, color: "#666", display: "block", marginBottom: 4 }}>📷 صورة المنتج</label>
              <div style={{ border: "1px dashed rgba(0,200,255,0.3)", borderRadius: 9, padding: 10, textAlign: "center", background: "rgba(0,200,255,0.03)", cursor: "pointer", position: "relative" }}
                onClick={() => document.getElementById("imgInput").click()}>
                {form.imgUrl ? (
                  <div style={{ position: "relative" }}>
                    <img src={form.imgUrl} alt="preview" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 7 }} />
                    <button onClick={(e) => { e.stopPropagation(); setForm(f => ({ ...f, imgUrl: "", img: "" })); }} style={{ position: "absolute", top: 4, left: 4, background: "rgba(255,50,50,0.8)", border: "none", color: "#fff", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", fontSize: 12 }}>✕</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 28, marginBottom: 4 }}>📷</div>
                    <div style={{ fontSize: 11, color: "#00cfff" }}>اضغط لرفع صورة</div>
                    <div style={{ fontSize: 9, color: "#444", marginTop: 2 }}>أو التقط صورة بالجوال</div>
                  </div>
                )}
                <input id="imgInput" type="file" accept="image/*" capture="environment" onChange={handleImageUpload} style={{ display: "none" }} />
              </div>
            </div>
            <div style={{ marginBottom: 11 }}>
              <label style={{ fontSize: 10, color: "#666", display: "block", marginBottom: 4 }}>الفئة</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(0,200,255,0.15)", borderRadius: 9, padding: "9px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" }}>
                {CATEGORIES.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id} style={{ background: "#111" }}>{c.icon} {c.label}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 10, color: "#666", display: "block", marginBottom: 4 }}>الحالة</label>
              <div style={{ display: "flex", gap: 6 }}>
                {["ممتاز", "جيد جداً", "جيد"].map(c => {
                  const cd = CONDITION_COLORS[c];
                  return <button key={c} onClick={() => setForm({ ...form, condition: c })} style={{ flex: 1, padding: "7px", borderRadius: 7, cursor: "pointer", fontSize: 10, fontFamily: "inherit", background: form.condition === c ? cd.bg : "rgba(255,255,255,0.03)", border: `1px solid ${form.condition === c ? cd.border + "60" : "rgba(255,255,255,0.06)"}`, color: form.condition === c ? cd.text : "#555", fontWeight: form.condition === c ? 700 : 400 }}>{c}</button>;
                })}
              </div>
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button onClick={() => { setShowAddForm(false); setEditingProduct(null); }} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#555", borderRadius: 9, padding: "10px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>إلغاء</button>
              <button onClick={handleSave} style={{ flex: 2, background: "linear-gradient(135deg,#00cfff,#0050ff)", border: "none", color: "#fff", borderRadius: 9, padding: "10px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>💾 حفظ</button>
            </div>
          </div>
        </div>
      )}
      {/* IMAGE PREVIEW MODAL */}
      {previewImg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.95)", backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setPreviewImg(null)}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
            <img src={previewImg.imgUrl} alt={previewImg.name} style={{ width: "100%", maxHeight: "65vh", objectFit: "contain", borderRadius: 14, marginBottom: 16 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{previewImg.name}</div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 20 }}>{previewImg.specs}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setPreviewImg(null)} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#888", borderRadius: 11, padding: "12px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>إغلاق</button>
              <button onClick={() => downloadImage(previewImg.imgUrl, previewImg.name)} style={{ flex: 2, background: "linear-gradient(135deg,#00cfff,#0050ff)", border: "none", color: "#fff", borderRadius: 11, padding: "12px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
                تنزيل الصورة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
