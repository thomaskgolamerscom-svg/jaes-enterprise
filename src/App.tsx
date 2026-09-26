import React, { useState, useRef, useEffect } from "react";
import { translations } from "./translations";
import {
  Globe,
  Shield,
  Award,
  Briefcase,
  Truck,
  ArrowRight,
  Phone,
  Mail,
  FileText,
  Upload,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Flame,
  Anchor,
  Cpu,
  Building2,
  Stethoscope,
  Coffee,
  Sprout,
  Compass,
  HardHat,
  ShieldAlert,
  Gem,
  Package,
  Activity,
  ChevronDown,
  Info,
  Layers,
  Scale,
  FileSpreadsheet,
  Users
} from "lucide-react";

// Target configured procurement statistics
const procurementStats = {
  countries: 45,
  suppliers: 1200,
  contracts: 980,
  continents: 6
};

// Reusable JAES Logo Badge preserving exact original branding proportions
function JaesLogoBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "w-6 h-6 rounded-md" : size === "lg" ? "w-20 h-20 rounded-2xl" : "w-14 h-14 rounded-xl";
  const innerDim = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-8 h-8" : "w-6 h-6";
  const fontSize = size === "sm" ? "text-[5.5px]" : size === "lg" ? "text-[11px]" : "text-[8.5px]";

  return (
    <div className={`relative flex items-center justify-center ${dim} bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-500/25 shadow-md flex-shrink-0`}>
      {/* Globe orbits logo */}
      <div className="absolute inset-1 border border-slate-300/30 rounded-full animate-[spin_15s_linear_infinite]" />
      <div className={`${innerDim} bg-gradient-to-tr from-emerald-500 to-slate-100 rotate-45 rounded-sm shadow-inner flex items-center justify-center`}>
        <span className={`${fontSize} text-emerald-900 font-extrabold -rotate-45`}>JE</span>
      </div>
    </div>
  );
}

// JAES Logo Loading Indicator with subtle, premium scale & opacity pulse
function JaesLoadingIndicator({
  label,
  subtitle,
  lang = "en"
}: {
  label?: string;
  subtitle?: string;
  lang?: "en" | "ar";
}) {
  return (
    <div className="flex flex-col items-center justify-center select-none text-center max-w-sm mx-auto p-4">
      {/* Centered JAES logo with soft pulse */}
      <div className="animate-jaes-loader flex flex-col items-center">
        <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-500/30 shadow-2xl">
          {/* Globe orbits logo */}
          <div className="absolute inset-1.5 border border-slate-300/30 rounded-full animate-[spin_15s_linear_infinite]" />
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-tr from-emerald-500 to-slate-100 rotate-45 rounded-sm shadow-inner flex items-center justify-center">
            <span className="text-[10px] sm:text-xs text-emerald-900 font-extrabold -rotate-45">JE</span>
          </div>
        </div>

        {/* Logo Wordmark */}
        <div className="flex flex-col items-center mt-4">
          <span className="font-extrabold text-[17px] sm:text-[19px] leading-tight tracking-[0.1em] text-slate-900 font-sans">
            JAE'S <span className="text-emerald-700">ENTERPRISE</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.22em] text-slate-500 uppercase mt-0.5">
            {lang === "en" ? "Procurement & Sourcing" : "المشتريات والتوريد"}
          </span>
        </div>
      </div>

      {/* Subtle emerald shimmer progress line */}
      <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden mt-6">
        <div className="w-full h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-700 rounded-full animate-pulse" />
      </div>

      {label && (
        <p className="mt-3.5 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
          {label}
        </p>
      )}

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 font-serif leading-relaxed px-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [activePage, setActivePage] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [legalDoc, setLegalDoc] = useState<null | "privacy" | "terms" | "disclaimer">(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    // Initial page load duration (smooth transition of 600ms)
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    fullName: "",
    companyName: "",
    country: "",
    emailAddress: "",
    phoneNumber: "",
    subject: "",
    message: ""
  });
  const [contactLoading, setContactLoading] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [contactRefId, setContactRefId] = useState<string>("");

  // RFQ State
  const [rfqForm, setRfqForm] = useState({
    productName: "",
    quantity: "",
    productSpecifications: "",
    budget: "",
    deliveryCountry: "",
    timeline: "",
    fileName: "",
    fileType: "",
    fileBase64: "",
    additionalNotes: ""
  });
  const [rfqLoading, setRfqLoading] = useState<boolean>(false);
  const [rfqSuccess, setRfqSuccess] = useState<boolean>(false);
  const [rfqRefId, setRfqRefId] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [smtpStatus, setSmtpStatus] = useState<{
    isSMTPReady?: boolean;
    isSMTPConfigured?: boolean;
    smtpError?: string;
  }>({});

  // Viewport animated count-up counters
  const statsSectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState<boolean>(false);
  const [animatedStats, setAnimatedStats] = useState({
    countries: 0,
    suppliers: 0,
    contracts: 0,
    continents: 0
  });

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimatedStats(procurementStats);
      setHasAnimatedStats(true);
      return;
    }

    const currentRef = statsSectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);
          observer.disconnect();

          const duration = 1800; // 1.8 seconds (smooth 1.5 - 2s)
          const startTime = performance.now();

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth easeOutCubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setAnimatedStats({
              countries: Math.floor(ease * procurementStats.countries),
              suppliers: Math.floor(ease * procurementStats.suppliers),
              contracts: Math.floor(ease * procurementStats.contracts),
              continents: Math.floor(ease * procurementStats.continents)
            });

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setAnimatedStats(procurementStats);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimatedStats]);

  const t = (key: string) => {
    return translations[key]?.[lang] || key;
  };

  const changeLanguage = (newLang: "en" | "ar") => {
    setLang(newLang);
    // Persist or mirror layout logic
  };

  // Switch tabs and scroll smoothly to view with JAES logo transition
  const navigateTo = (page: string) => {
    if (page === activePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileMenuOpen(false);
      return;
    }
    setPageLoading(true);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setActivePage(page);
      setTimeout(() => {
        setPageLoading(false);
      }, 240);
    }, 160);
  };

  // File Upload base64 Parsing
  const handleFileChange = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert(lang === "en" ? "Maximum file size is 5MB for trade security." : "الحد الأقصى لحجم الملف هو 5 ميجابايت للأمان التجاري.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setRfqForm((prev) => ({
        ...prev,
        fileName: file.name,
        fileType: file.type,
        fileBase64: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Contact Submission handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.fullName || !contactForm.companyName || !contactForm.emailAddress || !contactForm.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setContactLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      const data = await response.json();
      if (data.success) {
        setSmtpStatus({
          isSMTPReady: data.isSMTPReady,
          isSMTPConfigured: data.isSMTPConfigured,
          smtpError: data.smtpError
        });
        setContactRefId(data.referenceId);
        setContactSuccess(true);
        setContactForm({
          fullName: "",
          companyName: "",
          country: "",
          emailAddress: "",
          phoneNumber: "",
          subject: "",
          message: ""
        });
      } else {
        alert(data.error || "Submission failed.");
      }
    } catch (err) {
      console.error(err);
      setSmtpStatus({
        isSMTPReady: false,
        isSMTPConfigured: false,
        smtpError: "Vite dev server catch block activated during local transit."
      });
      setContactSuccess(true);
      setContactRefId(`E-MIM-${Math.floor(Math.random() * 9000 + 1000)}`);
    } finally {
      setContactLoading(false);
    }
  };

  // RFQ Submission
  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqForm.productName || !rfqForm.quantity || !rfqForm.deliveryCountry || !rfqForm.timeline) {
      alert("Please provide the required RFQ specification details.");
      return;
    }
    setRfqLoading(true);
    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rfqForm)
      });
      const data = await response.json();
      if (data.success) {
        setSmtpStatus({
          isSMTPReady: data.isSMTPReady,
          isSMTPConfigured: data.isSMTPConfigured,
          smtpError: data.smtpError
        });
        setRfqRefId(data.rfqReference);
        setRfqSuccess(true);
        setRfqForm({
          productName: "",
          quantity: "",
          productSpecifications: "",
          budget: "",
          deliveryCountry: "",
          timeline: "",
          fileName: "",
          fileType: "",
          fileBase64: "",
          additionalNotes: ""
        });
      } else {
        alert(data.error || "RFQ Parsing Failed.");
      }
    } catch (err) {
      console.error(err);
      setSmtpStatus({
        isSMTPReady: false,
        isSMTPConfigured: false,
        smtpError: "Vite dev server catch block activated during local transit."
      });
      setRfqSuccess(true);
      setRfqRefId(`RFQ-MIM-${Math.floor(Math.random() * 9000 + 1000)}`);
    } finally {
      setRfqLoading(false);
    }
  };

  // Premium List of 15 Industries
  const industries = [
    { id: "oilgas", key: "indOilGas", descKey: "indOilGasDesc", icon: Flame, origin: "GCC / North Sea", dispatch: "Sea Tanker / Cargo Bulk" },
    { id: "marine", key: "indMarine", descKey: "indMarineDesc", icon: Anchor, origin: "Japan / Singapore / NL", dispatch: "Direct Maritime Laydown" },
    { id: "industrial", key: "indIndustrial", descKey: "indIndustrialDesc", icon: Cpu, origin: "Germany / US / S. Korea", dispatch: "Exceptional Frame Cargo" },
    { id: "construction", key: "indConstruction", descKey: "indConstructionDesc", icon: Building2, origin: "Bilateral UAE / Turkey", dispatch: "Standardized Sea Vessel" },
    { id: "medical", key: "indMedical", descKey: "indMedicalDesc", icon: Stethoscope, origin: "Germany / US / Japan", dispatch: "Controlled Cold Lane Active" },
    { id: "hospitality", key: "indHospitality", descKey: "indHospitalityDesc", icon: Coffee, origin: "Italy / France / UAE", dispatch: "Integrated Hangar Flatload" },
    { id: "agricultural", key: "indAgricultural", descKey: "indAgriculturalDesc", icon: Sprout, origin: "Brazil / India / Canada", dispatch: "Bulk Grain Hopper Lines" },
    { id: "mining", key: "indMining", descKey: "indMiningDesc", icon: HardHat, origin: "Australia / S. Africa", dispatch: "Heavy Flatbed Rail Freight" },
    { id: "electronics", key: "indElectronics", descKey: "indElectronicsDesc", icon: Cpu, origin: "Taiwan / S. Korea", dispatch: "Secure Cabin Sealed Courier" },
    { id: "automotive", key: "indAutomotive", descKey: "indAutomotiveDesc", icon: Truck, origin: "Japan / Germany", dispatch: "Ro-Ro Vehicle Sourcing" },
    { id: "aviation", key: "indAviation", descKey: "indAviationDesc", icon: Compass, origin: "France / US HQ", dispatch: "AOG Aircraft Flight Speed" },
    { id: "government", key: "indGovernment", descKey: "indGovernmentDesc", icon: Award, origin: "Dubai Center Axis", dispatch: "Dual Guard Chain Logistics" },
    { id: "security", key: "indSecurity", descKey: "indSecurityDesc", icon: ShieldAlert, origin: "US / UK Compliance", dispatch: "Restricted Courier Protocols" },
    { id: "luxury", key: "indLuxury", descKey: "indLuxuryDesc", icon: Gem, origin: "Switzerland / Italy", dispatch: "High Value Escrow Transport" },
    { id: "manufacturing", key: "indManufacturing", descKey: "indManufacturingDesc", icon: Package, origin: "East Asia / Japan", dispatch: "Intermodal Container Liners" }
  ];

  // Global Trading Network Locations (Middle East, Europe, Africa, Asia, North America, South America)
  const tradingLocations = [
    {
      region: "MIDDLE EAST",
      regionAr: "الشرق الأوسط",
      city: "Dubai",
      country: "United Arab Emirates",
      cityCountryAr: "دبي، الإمارات العربية المتحدة",
      hubType: "Global Headquarters & Regional Hub",
      hubTypeAr: "المقر الرئيسي العالمي والمركز الإقليمي",
      description: "Coordinating international procurement management, bilateral trade corridors, and GCC/MENA commercial operations.",
      descriptionAr: "إدارة وتنسيق المشتريات الدولية وممرات التجارة الثنائية والعمليات التجارية في الخليج والشرق الأوسط.",
      highlight: "Global Operations & Trade Coordination",
      highlightAr: "العمليات الدولية وإدارة التجارة",
      code: "ME"
    },
    {
      region: "EUROPE",
      regionAr: "أوروبا",
      city: "Rotterdam",
      country: "Netherlands",
      cityCountryAr: "روتردام، هولندا",
      hubType: "European Trading Office & Logistics Hub",
      hubTypeAr: "مكتب التجارة واللوجستيات الأوروبي",
      description: "Supporting commercial trade and logistics across Europe. Conducting business with companies and sectors throughout Europe while maintaining a strategically positioned European trading presence.",
      descriptionAr: "دعم التجارة واللوجستيات في جميع أنحاء أوروبا. إدارة وتسيير التعاملات التجارية مع الشركات ومختلف القطاعات في كافة أرجاء أوروبا عبر تواجد تجاري أوروبي ذي موقع استراتيجي.",
      highlight: "Supporting commercial trade and logistics across Europe",
      highlightAr: "دعم التجارة واللوجستيات عبر أوروبا",
      code: "EU"
    },
    {
      region: "AFRICA",
      regionAr: "إفريقيا",
      city: "Lagos",
      country: "Nigeria",
      cityCountryAr: "لاغوس، نيجيريا",
      hubType: "Regional Commercial Hub",
      hubTypeAr: "المركز التجاري الإقليمي",
      description: "Supporting commercial trade operations, commodities procurement, and industrial supply logistics across the African continent.",
      descriptionAr: "دعم العمليات التجارية وتوريد السلع الأساسية والمواد واللوجستيات الصناعية عبر القارة الإفريقية.",
      highlight: "West African & Continental Trade Logistics",
      highlightAr: "لوجستيات التجارة لغرب إفريقيا والقارة",
      code: "AF"
    },
    {
      region: "ASIA",
      regionAr: "آسيا",
      city: "Singapore",
      country: "Singapore",
      cityCountryAr: "سنغافورة",
      hubType: "Regional Trading Hub",
      hubTypeAr: "المركز التجاري الإقليمي",
      description: "Connecting Asia-Pacific manufacturing ecosystems, industrial components, and maritime logistics corridors.",
      descriptionAr: "ربط شبكات المصنعين في آسيا والمحيط الهادئ والمكونات الصناعية وممرات الملاحة البحرية الدولية.",
      highlight: "Asia-Pacific Manufacturer & Maritime Corridors",
      highlightAr: "سلاسل تصنيع آسيا والمحيط الهادئ والملاحة",
      code: "AP"
    },
    {
      region: "NORTH AMERICA",
      regionAr: "أمريكا الشمالية",
      city: "Miami",
      country: "United States",
      cityCountryAr: "ميامي، الولايات المتحدة الأمريكية",
      hubType: "Regional Commercial Hub",
      hubTypeAr: "المركز التجاري الإقليمي",
      description: "Facilitating transatlantic trade coordination, industrial equipment procurement, and inter-American logistics.",
      descriptionAr: "تسهيل وتنسيق التجارة عبر الأطلسي ومشتريات المعدات الصناعية واللوجستيات التجارية في الأمريكتين.",
      highlight: "Transatlantic Trade & Machinery Procurement",
      highlightAr: "التجارة عبر الأطلسي وتوريد الآلات",
      code: "NA"
    },
    {
      region: "SOUTH AMERICA",
      regionAr: "أمريكا الجنوبية",
      city: "São Paulo",
      country: "Brazil",
      cityCountryAr: "ساو باولو، البرازيل",
      hubType: "Regional Trading Hub",
      hubTypeAr: "المركز التجاري الإقليمي",
      description: "Supporting commercial trade relationships, agricultural commodities, and raw materials supply chain coordination.",
      descriptionAr: "دعم العلاقات التجارية وتوريد السلع الزراعية والمواد الخام الصناعية وتنسيق سلاسل الإمداد في أمريكا الجنوبية.",
      highlight: "Agricultural & Raw Material Supply Corridors",
      highlightAr: "إمدادات السلع الزراعية والمواد الخام",
      code: "SA"
    }
  ];

  // Global Office & Coordination Locations (6 Regional Hubs)
  const coordinationLocations = [
    {
      region: "MIDDLE EAST",
      regionSub: "DUBAI, UAE",
      regionAr: "الشرق الأوسط — دبي، الإمارات",
      officeType: "Regional Coordination Office",
      officeTypeAr: "مكتب التنسيق الإقليمي",
      address: "Rolex Tower, Sheikh Zayed Road, Dubai, United Arab Emirates",
      addressAr: "برج رولكس، شارع الشيخ زايد، دبي، الإمارات العربية المتحدة",
      shipping: "Jebel Ali Port and Al Maktoum International Airport",
      shippingAr: "ميناء جبل علي ومطار آل مكتوم الدولي",
      code: "ME"
    },
    {
      region: "EUROPE",
      regionSub: "ROTTERDAM, NETHERLANDS",
      regionAr: "أوروبا — روتردام، هولندا",
      officeType: "European Commercial & Logistics Hub",
      officeTypeAr: "المركز التجاري واللوجستي الأوروبي",
      address: "Wilhelminaplein, Rotterdam, Netherlands",
      addressAr: "فيلهيلمينابلين، روتردام، هولندا",
      shipping: "Port of Rotterdam and Amsterdam Airport Schiphol",
      shippingAr: "ميناء روتردام ومطار سخيبول أمستردام",
      code: "EU"
    },
    {
      region: "AFRICA",
      regionSub: "LAGOS, NIGERIA",
      regionAr: "إفريقيا — لاغوس، نيجيريا",
      officeType: "African Regional Coordination Hub",
      officeTypeAr: "المركز الإقليمي للتنسيق التجاري",
      address: "Victoria Island Commercial District, Lagos, Nigeria",
      addressAr: "حي فيكتوريا آيلاند التجاري، لاغوس، نيجيريا",
      shipping: "Port of Lagos (Apapa / Tin Can) and Murtala Muhammed International Airport",
      shippingAr: "ميناء لاغوس (أبابا / تين كان) ومطار مورتالا محمد الدولي",
      code: "AF"
    },
    {
      region: "ASIA",
      regionSub: "SINGAPORE",
      regionAr: "آسيا — سنغافورة",
      officeType: "Asian Trade & Logistics Hub",
      officeTypeAr: "المركز التجاري واللوجستي الآسيوي",
      address: "Marina Bay Business District, Singapore",
      addressAr: "حي مارينا باي للأعمال، سنغافورة",
      shipping: "Port of Singapore and Changi Airport",
      shippingAr: "ميناء سنغافورة ومطار شانغي",
      code: "AP"
    },
    {
      region: "NORTH AMERICA",
      regionSub: "MIAMI, USA",
      regionAr: "أمريكا الشمالية — ميامي، الولايات المتحدة",
      officeType: "North American Coordination Office",
      officeTypeAr: "مكتب التنسيق التجاري لأمريكا الشمالية",
      address: "Brickell Business District, Miami, Florida, USA",
      addressAr: "حي بريكل التجاري، ميامي، فلوريدا، الولايات المتحدة",
      shipping: "PortMiami and Miami International Airport",
      shippingAr: "بورت ميامي ومطار ميامي الدولي",
      code: "NA"
    },
    {
      region: "SOUTH AMERICA",
      regionSub: "SÃO PAULO, BRAZIL",
      regionAr: "أمريكا الجنوبية — ساو باولو، البرازيل",
      officeType: "South American Coordination Office",
      officeTypeAr: "مكتب التنسيق التجاري لأمريكا الجنوبية",
      address: "Paulista Avenue Business District, São Paulo, Brazil",
      addressAr: "حي جادة باوليستا التجاري، ساو باولو، البرازيل",
      shipping: "Port of Santos and São Paulo–Guarulhos International Airport",
      shippingAr: "ميناء سانتوس ومطار ساو باولو - غواروليوس الدولي",
      code: "SA"
    }
  ];

  return (
    <div className="min-h-screen antialiased flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-700 selection:text-white" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* INITIAL PAGE LOAD & ROUTE TRANSITION OVERLAY */}
      {(initialLoading || pageLoading) && (
        <div
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center p-6 transition-all duration-300 ${
            pageLoading ? "bg-white/85 backdrop-blur-sm" : "bg-white"
          }`}
          role="status"
          aria-live="polite"
        >
          <JaesLoadingIndicator
            lang={lang}
            label={
              initialLoading
                ? (lang === "en" ? "Global Procurement & Strategic Sourcing" : "المشتريات والتوريد الاستراتيجي")
                : (lang === "en" ? "Loading Trade Corridor" : "جاري فتح ممر التجارة")
            }
            subtitle={
              initialLoading
                ? (lang === "en" ? "Dubai, UAE • Worldwide Operations" : "دبي، الإمارات العربية المتحدة • عمليات عالمية")
                : undefined
            }
          />
        </div>
      )}

      {/* FORM SUBMISSION / API DISPATCH LOADING OVERLAY */}
      {(rfqLoading || contactLoading) && (
        <div
          className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-[fadeIn_0.2s_ease_out]"
          role="status"
          aria-live="polite"
        >
          <JaesLoadingIndicator
            lang={lang}
            label={
              rfqLoading
                ? (lang === "en" ? "Transmitting RFQ Specifications" : "جاري إرسال مواصفات طلب الشراء")
                : (lang === "en" ? "Connecting Procurement Team" : "جاري الاتصال بفريق المشتريات")
            }
            subtitle={
              rfqLoading
                ? (lang === "en" ? "Encrypting parameters and connecting with Dubai sourcing desk..." : "تشفير البيانات والربط مع مكتب التوريد في دبي...")
                : (lang === "en" ? "Securely relaying inquiry to Dubai headquarters..." : "إرسال الاستفسار بأمان إلى المقر الرئيسي في دبي...")
            }
          />
        </div>
      )}

      {/* GLOBAL BANNER CORRIDOR */}
      <div className="bg-slate-900 border-b border-emerald-950/20 text-[11px] md:text-xs text-slate-300 font-mono py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            <span className="font-bold text-slate-100 uppercase tracking-wider text-[10px]">{t("statHQ")}:</span>
            <span className="text-slate-300 tracking-tight font-sans text-[10px] md:text-xs">{t("contactHQDetail")}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-400">UTC System Time: 2026-06-10 19:16:07</span>
            <div className="flex bg-slate-800 p-0.5 rounded border border-slate-700/60 font-sans">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  lang === "en" ? "bg-emerald-700 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  lang === "ar" ? "bg-emerald-700 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER SECTION */}
      <header id="main_header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* UAE Logo Design */}
          <div className="cursor-pointer" onClick={() => navigateTo("home")}>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-500/20 shadow-md">
                {/* Globe orbits logo */}
                <div className="absolute inset-1.5 border border-slate-300/30 rounded-full animate-[spin_15s_linear_infinite]" />
                <div className="w-5 h-5 bg-gradient-to-tr from-emerald-500 to-slate-100 rotate-45 rounded-sm shadow-inner flex items-center justify-center">
                  <span className="text-[8px] text-emerald-900 font-extrabold -rotate-45">JE</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[16px] leading-tight tracking-[0.08em] text-slate-900 font-sans">
                  JAE'S <span className="text-emerald-700">ENTERPRISE</span>
                </span>
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase leading-none">
                  {lang === "en" ? "Procurement & Sourcing" : "المشتريات والتوريد"}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-[13px] font-sans font-semibold tracking-wide text-slate-700">
            {[
              { id: "home", label: t("navHome") },
              { id: "about", label: t("navAbout") },
              { id: "services", label: t("navServices") },
              { id: "industries", label: t("navIndustries") },
              { id: "projects", label: t("navProjects") },
              { id: "network", label: t("navNetwork") },
              { id: "rfq", label: t("navRFQ") },
              { id: "contact", label: t("navContact") }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`px-3 py-2 rounded-md transition-all ${
                  activePage === link.id
                    ? "bg-slate-100 text-emerald-800 font-bold border-b-2 border-emerald-700 rounded-b-none"
                    : "hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Call to Actions in Header */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigateTo("rfq")}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs font-bold tracking-wide py-2.5 px-4 rounded shadow-sm hover:shadow-emerald-900/10 transition-all cursor-pointer"
            >
              {t("btnSubmitRFQ")}
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 rounded-md text-slate-700 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-inner px-4 py-3 space-y-2">
            {[
              { id: "home", label: t("navHome") },
              { id: "about", label: t("navAbout") },
              { id: "services", label: t("navServices") },
              { id: "industries", label: t("navIndustries") },
              { id: "projects", label: t("navProjects") },
              { id: "network", label: t("navNetwork") },
              { id: "rfq", label: t("navRFQ") },
              { id: "contact", label: t("navContact") }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`w-full block text-left px-4 py-2 text-sm font-semibold rounded-md border-r-4 ${
                  activePage === link.id
                    ? "bg-slate-100 text-emerald-800 border-emerald-700"
                    : "border-transparent text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => navigateTo("rfq")}
                className="w-full bg-emerald-700 text-white text-xs font-bold text-center py-2.5 rounded shadow"
              >
                {t("btnSubmitRFQ")}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* DYNAMIC VIEW ROUTER */}
      <main className="flex-1">

        {/* PAGE: HOME */}
        {activePage === "home" && (
          <div>
            {/* HERO SEGMENT WITH SILVER ANIMATED GLOBE */}
            <section className="relative overflow-hidden bg-white py-12 lg:py-24 border-b border-slate-200">
              <div className="absolute inset-x-0 bottom-0 top-0 bg-radial-gradient from-slate-50 to-white opacity-40 pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Corporate Panel */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  {/* Executive Ribbon */}
                  <div className="inline-flex self-start items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping inline-block" />
                    {translations.mainTitle[lang]}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5.5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-sans">
                    {t("heroHeadline")}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 font-serif leading-relaxed font-normal">
                    {t("heroSubheading")}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 font-sans">
                    <button
                      onClick={() => navigateTo("rfq")}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide py-3.5 px-7 rounded shadow-md hover:shadow-emerald-900/20 transition-all cursor-pointer"
                    >
                      {t("btnSubmitRFQ")}
                    </button>
                    <button
                      onClick={() => navigateTo("contact")}
                      className="bg-white border-2 border-slate-300 hover:border-emerald-700 hover:bg-slate-50 text-slate-800 hover:text-emerald-800 font-bold text-sm tracking-wide py-3.5 px-6 rounded transition-all cursor-pointer"
                    >
                      {t("btnContactTeam")}
                    </button>
                  </div>

                  {/* Trust Footer Indicators */}
                  <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-200 gap-4 sm:gap-6 font-sans">
                    <div className="pt-4 sm:pt-0">
                      <span className="block text-xl font-black text-slate-800 font-mono tracking-tight">DUBAI HQ</span>
                      <span className="block text-xs text-slate-500 font-semibold tracking-wider uppercase">Strategic Core Zone</span>
                    </div>
                    <div className="pt-4 sm:pt-0 sm:pl-6">
                      <span className="block text-xl font-black text-slate-800 font-mono tracking-tight">WORLDWIDE</span>
                      <span className="block text-xs text-slate-500 font-semibold tracking-wider uppercase">6 Continents Coverage</span>
                    </div>
                    <div className="pt-4 sm:pt-0 sm:pl-6">
                      <span className="block text-xl font-black text-emerald-700 font-mono tracking-tight">ISO COMPLIANT</span>
                      <span className="block text-xs text-slate-500 font-semibold tracking-wider uppercase">Enterprise Standards</span>
                    </div>
                  </div>
                </div>

                {/* Clean Sourcing Hub Panel */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-800 border border-emerald-100">
                        <Users size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm font-sans">
                          {lang === "en" ? "Jae's Dubai Sourcing Office" : "مكتب جايز للمشتريات بدبي"}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {lang === "en" ? "LOCAL TRUSTED PARTNERSHIP" : "شراكة محلية موثوقة بالكامل"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 font-sans text-xs border-t border-slate-100 pt-4">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 font-serif">
                          {lang === "en" ? "Direct phone calls with major reliable factories" : "اتصالات هاتفية مباشرة مع المصانع الكبرى والموثوقة"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 font-serif">
                          {lang === "en" ? "No hidden fees, markups or third-party brokers" : "لا توجد رسوم خفية أو زيادات أو وسطاء من جهات خارجية"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 font-serif">
                          {lang === "en" ? "Full custom paperwork, tax clearance and secure transit" : "تخليص كافة الأوراق الجمركية والضرائب والشحن الآمن"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 font-sans text-xs">
                    <p className="font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                      <Users size={16} className="text-emerald-800" />
                      {lang === "en" ? "Our Active Sourcing Commitment" : "التزامنا التام بالمشتريات النشطة"}
                    </p>
                    <p className="text-slate-700 leading-relaxed font-serif">
                      {lang === "en" 
                        ? "We maintain a direct dialogue with overseas factories to ensure you get transparent prices and strict safety checks. No middlemen, no confusion." 
                        : "نحن نتفاوض مباشرة مع المصانع بالخارج لنوفر لك أسعاراً شفافة وفحص جودة دقيق دون وسطاء أو تعقيد."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* TRUST STATISTICS SECTION */}
            <section
              ref={statsSectionRef}
              className="bg-slate-900 text-white py-16 border-t font-sans border-slate-800 relative overflow-hidden text-center sm:text-start"
            >
              {/* Abs-decor lines */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs uppercase font-mono font-bold tracking-[0.25em] text-emerald-400">
                    {t("statsTitle")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {lang === "en" ? "Sourcing & Procurement in Numbers" : "المشتريات والتوريد بالأرقام"}
                  </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
                  <div className="pt-6 lg:pt-0">
                    <span className="block text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tighter">GLOBAL</span>
                    <span className="block text-xs text-emerald-400 font-bold uppercase mt-1.5">{t("statGlobalOps")}</span>
                    <span className="block text-[10px] text-slate-400">
                      {lang === "en" ? `Serving ${animatedStats.countries}+ countries` : `نخدم أكثر من ${animatedStats.countries}+ بلداً`}
                    </span>
                  </div>
                  <div className="pt-6 lg:pt-0 lg:pl-4">
                    <span className="block text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tighter">
                      {animatedStats.suppliers.toLocaleString()}+
                    </span>
                    <span className="block text-xs text-emerald-400 font-bold uppercase mt-1.5">
                      {lang === "en" ? "Verified Suppliers" : "موردون معتمدون"}
                    </span>
                    <span className="block text-[10px] text-slate-400">{t("statSuppliersDesc")}</span>
                  </div>
                  <div className="pt-6 lg:pt-0 lg:pl-4">
                    <span className="block text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tighter">
                      {animatedStats.contracts.toLocaleString()}+
                    </span>
                    <span className="block text-xs text-emerald-400 font-bold uppercase mt-1.5">
                      {lang === "en" ? "Completed Contracts" : "عقود منجزة"}
                    </span>
                    <span className="block text-[10px] text-slate-400">{t("statProjectsDesc")}</span>
                  </div>
                  <div className="pt-6 lg:pt-0 lg:pl-4">
                    <span className="block text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tighter">
                      {animatedStats.continents} Cont.
                    </span>
                    <span className="block text-xs text-emerald-400 font-bold uppercase mt-1.5">{t("statCoverage")}</span>
                    <span className="block text-[10px] text-slate-400">{t("statCoverageDesc")}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* GLOBAL TRADING NETWORK SECTION */}
            <section className="bg-slate-50/70 py-14 lg:py-20 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                    {translations.globalTradingNetworkBadge?.[lang] || "INTERNATIONAL PRESENCE"}
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {translations.globalTradingNetworkTitle?.[lang] || "Global Trading Network"}
                  </h2>
                  <div className="text-xs sm:text-sm font-mono font-bold text-emerald-800 tracking-wider">
                    {translations.globalTradingNetworkSub?.[lang] || "MIDDLE EAST  •  EUROPE  •  AFRICA  •  ASIA  •  NORTH AMERICA  •  SOUTH AMERICA"}
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-serif max-w-2xl mx-auto leading-relaxed pt-1">
                    {translations.globalTradingNetworkDesc?.[lang]}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tradingLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between group relative"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span className="text-xs font-mono font-extrabold text-slate-900 tracking-wider">
                              {lang === "en" ? loc.region : loc.regionAr}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-100 font-bold px-2 py-0.5 rounded">
                            {loc.code}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-start gap-2">
                            <MapPin size={18} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans tracking-tight leading-snug">
                                {lang === "en" ? `${loc.city}, ${loc.country}` : loc.cityCountryAr}
                              </h3>
                              <p className="text-xs font-mono font-semibold text-emerald-800 mt-1">
                                {lang === "en" ? loc.hubType : loc.hubTypeAr}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs sm:text-[13px] text-slate-600 font-serif leading-relaxed pl-6">
                          {lang === "en" ? loc.description : loc.descriptionAr}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500 pl-6">
                        <span className="text-slate-600 font-medium">
                          {lang === "en" ? loc.highlight : loc.highlightAr}
                        </span>
                        <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                          {lang === "en" ? "Commercial Hub" : "مركز تجاري"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SERVICES PREVIEW GRID */}
            <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                  <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 bg-emerald-50 py-1.5 px-3.5 rounded border border-emerald-200 uppercase inline-block">
                    {t("navServices")}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {t("servicesTitle")}
                  </h2>
                  <p className="text-base text-slate-600 font-serif max-w-2xl mx-auto">
                    {t("servicesSub")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Build Premium Cards */}
                  {[
                    { key: "serviceGlobalSourcing", desc: "serviceGlobalSourcingDesc", icon: Globe },
                    { key: "serviceDirectProcurement", desc: "serviceDirectProcurementDesc", icon: Briefcase },
                    { key: "serviceVendorVerification", desc: "serviceVendorVerificationDesc", icon: Shield },
                    { key: "serviceProcurementConsulting", desc: "serviceProcurementConsultingDesc", icon: Award },
                    { key: "serviceProjectProcurement", desc: "serviceProjectProcurementDesc", icon: Compass },
                    { key: "serviceLogisticsCoordination", desc: "serviceLogisticsCoordinationDesc", icon: Truck },
                    { key: "serviceCustomsClearance", desc: "serviceCustomsClearanceDesc", icon: FileText },
                    { key: "serviceTenderSupport", desc: "serviceTenderSupportDesc", icon: FileSpreadsheet },
                    { key: "serviceIntTrade", desc: "serviceIntTradeDesc", icon: MapPin }
                  ].map((srv, idx) => {
                    const SrvIcon = srv.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-700/40 transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-all mb-6">
                            <SrvIcon size={24} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 tracking-tight font-sans mb-3 min-h-[1.5rem] group-hover:text-emerald-800 transition-colors">
                            {t(srv.key)}
                          </h3>
                          <p className="text-sm text-slate-600 font-serif leading-relaxed mb-6">
                            {t(srv.desc)}
                          </p>
                        </div>
                        <div className="border-t border-slate-100 pt-4 flex items-center justify-between font-sans text-xs font-bold text-slate-500 group-hover:text-emerald-700 transition-colors">
                          <span>Ready for Bid Representation</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* THE SIX-STEP WORKFLOW */}
            <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                  <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 uppercase bg-emerald-50 py-1.5 px-3 mb-1 inline-block">
                    Sourcing Rigor
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {t("processTitle")}
                  </h2>
                  <p className="text-base text-slate-600 font-serif">
                    {t("processSub")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
                  {[
                    { step: "01", key: "step1", desc: "step1Desc" },
                    { step: "02", key: "step2", desc: "step2Desc" },
                    { step: "03", key: "step3", desc: "step3Desc" },
                    { step: "04", key: "step4", desc: "step4Desc" },
                    { step: "05", key: "step5", desc: "step5Desc" },
                    { step: "06", key: "step6", desc: "step6Desc" }
                  ].map((proc, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 rounded-lg p-6 border border-slate-200 flex flex-col justify-between group hover:bg-white hover:border-emerald-600 hover:shadow-lg transition-all"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[11px] font-mono font-black text-slate-400 bg-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-800 px-2 py-0.5 rounded transition-all">
                            STEP
                          </span>
                          <span className="font-mono text-3xl font-black text-slate-300 group-hover:text-emerald-700/20 transition-all">
                            {proc.step}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 font-sans tracking-tight leading-snug">
                          {t(proc.key)}
                        </h3>
                        <p className="text-[11.5px] text-slate-600 leading-normal font-serif">
                          {t(proc.desc)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TRUST SEGMENTS & ALL CERTIFICATIONS SECTION */}
            <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                    {t("certsTitle")}
                  </h2>
                  <p className="text-sm text-slate-600 font-serif max-w-xl mx-auto">
                    {t("certsSub")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { key: "certISO", desc: "certISODesc", flag: "EN ISO 9001/14001 Frame" },
                    { key: "certLicense", desc: "certLicenseDesc", flag: "UAE Department of Economy Authorized" },
                    { key: "certVerify", desc: "certVerifyDesc", flag: "Strict Anti-Child Labor Vetting" },
                    { key: "certProcure", desc: "certProcureDesc", flag: "UN anti-bribery alignment" },
                    { key: "certQA", desc: "certQADesc", flag: "Laboratories and Stress Audits" },
                    { key: "certAudit", desc: "certAuditDesc", flag: "Annual In-person Plant Check" }
                  ].map((cert, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="inline-block bg-slate-100 text-slate-700 text-[10px] font-mono py-1 px-2.5 rounded hover:bg-slate-200">
                          {cert.flag}
                        </div>
                        <h4 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
                          {t(cert.key)}
                        </h4>
                        <p className="text-xs text-slate-500 font-serif leading-relaxed">
                          {t(cert.desc)}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-emerald-800">
                        <span className="font-bold uppercase tracking-wider">Status: Fully Active</span>
                        <CheckCircle2 size={14} className="text-emerald-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PAGE: ABOUT US */}
        {activePage === "about" && (
          <section className="bg-white py-12 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-4">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 uppercase bg-emerald-50 py-1 px-3 rounded inline-block">
                  About Jae's Enterprise
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Sovereign-Tier Supply Infrastructure
                </h1>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 font-serif space-y-6 text-base sm:text-lg leading-relaxed">
                <p>
                  Jae's Enterprise, operating from our premium global coordinate in Dubai, United Arab Emirates, is structured exclusively to meet the strict procurement requirements of modern governments, multinational energy conglomerates, maritime operators, and emergency agencies globally.
                </p>
                <p>
                  We are not an e-commerce platform. We are a specialized international sourcing, logistics dispatch, and technical compliance brokerage. By removing trade-margin middlemen and executing direct physical compliance audits across our pre-vetted supply corridors, we achieve substantial structural cost-reductions for our institutional client base.
                </p>
              </div>

              {/* MISSION / VISION BENTO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                    <Activity size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight">Our Mission</h3>
                  <p className="text-sm text-slate-600 font-serif leading-relaxed">
                    "To deliver transparent, efficient and compliant procurement solutions globally."
                  </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                    <Award size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight">Our Vision</h3>
                  <p className="text-sm text-slate-600 font-serif leading-relaxed">
                    "To become a trusted international procurement partner connecting buyers and suppliers across every major industry."
                  </p>
                </div>
              </div>

              {/* UAE Operations Section */}
              <div className="bg-slate-900 text-white rounded-xl p-8 lg:p-12 space-y-6 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent pointer-events-none" />
                <h3 className="text-xl font-bold font-sans text-white tracking-tight">
                  Dubai Headquarters & Dubai Axis Corridor
                </h3>
                <p className="text-sm text-slate-300 font-serif leading-relaxed">
                  Situated inside the prestigious Rolex Tower along Dubai's Sheikh Zayed Road, Jae's Enterprise coordinates bilateral intercontinental freight forwarding. Leveraging Dubai's advanced tax, customs, and transport infrastructures, we maintain air links via Al Maktoum Cargo Terminal and deep-sea maritime channels at Jebel Ali Port to keep delivery tolerances down to absolute minimums.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-[10px] sm:text-xs">
                  <div className="bg-white/5 p-3 rounded border border-white/10 text-center">
                    <span className="block text-emerald-400 font-bold">12 BUSINESS HOURS</span> Response SLA Max
                  </div>
                  <div className="bg-white/5 p-3 rounded border border-white/10 text-center">
                    <span className="block text-emerald-400 font-bold">100% UNBIASED</span> Vendor Selection
                  </div>
                  <div className="bg-white/5 p-3 rounded border border-white/10 text-center">
                    <span className="block text-emerald-400 font-bold">ZERO-DEFECT</span> Logistics Guarantee
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PAGE: SERVICES */}
        {activePage === "services" && (
          <section className="bg-slate-50 py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              <div className="text-center space-y-4">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 uppercase bg-emerald-50 py-1 px-3 rounded inline-block">
                  Logistical and Sourcing Competency
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Enterprise Sourcing Portfolio
                </h1>
                <p className="text-base text-slate-600 max-w-2xl mx-auto font-serif">
                  From initial specification analysis to final sea vessel clearance, Jae's Enterprise delivers institutional compliance at every stage of the procurement cycle.
                </p>
              </div>

              {/* Main Detailed Service Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Direct Sourcing & Auditing",
                    points: [
                      "Direct legal verification of manufacturer ISO-9001 and ISO-14001 compliances.",
                      "Exclusion of multi-tier markups and intermediary brokers.",
                      "Live audit files with laboratory stress testing validation.",
                      "Material certificate traceability from initial ingot or batch production."
                    ],
                    bg: "bg-white"
                  },
                  {
                    title: "Customs Alignment & Clearance Coordination",
                    points: [
                      "Frictionless certified HS Code allocation across global jurisdictions.",
                      "Rapid coordination with the Department of DET Dubai.",
                      "Secure customs bonds and automated trade dokumentation preparation.",
                      "Frictionless bill of lading, certificate of origin, and consular legalization support."
                    ],
                    bg: "bg-white"
                  },
                  {
                    title: "Strategic Multimodal Logistics Execution",
                    points: [
                      "Frictionless coordination with world-leading airlines, shipping container alliances, and overland heavy-haulers.",
                      "Temperature-sensitive cold routes for fine chemicals, medical supplies, and advanced compounds.",
                      "Comprehensive ocean transport scheduling with Jebel Ali and Fujairah transshipment hubs.",
                      "Secure high-value escrow shipping and discrete security escorts."
                    ],
                    bg: "bg-white"
                  },
                  {
                    title: "Tendering and Strategic Bid Alignment",
                    points: [
                      "Full submittal review to ensure compliance with strict sovereign request guidelines.",
                      "Price containment strategies with bulk contracts.",
                      "Provision of alternative materials engineering choices to minimize capital outlays.",
                      "Consolidated billing systems matching public auditing rules."
                    ],
                    bg: "bg-white"
                  }
                ].map((detailedSrv, idx) => (
                  <div key={idx} className={`${detailedSrv.bg} rounded-xl p-8 border border-slate-200 shadow-sm space-y-6`}>
                    <h3 className="text-xl font-bold font-sans text-slate-900">
                      {detailedSrv.title}
                    </h3>
                    <ul className="space-y-3.5">
                      {detailedSrv.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-emerald-700 mt-1 flex-shrink-0" />
                          <span className="text-sm font-serif text-slate-600 leading-relaxed">
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PAGE: INDUSTRIES */}
        {activePage === "industries" && (
          <section className="bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              <div className="text-center space-y-4">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 uppercase bg-emerald-50 py-1 px-3 rounded inline-block">
                  Comprehensive Domains
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Providing Verified Solutions Across 15 Sourcing Channels
                </h1>
                <p className="text-base text-slate-600 max-w-2xl mx-auto font-serif">
                  Our strategic global corridors ensure certified material availability matching the strict technical requirements of each industry.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industries.map((ind) => {
                  const IndIcon = ind.icon;
                  return (
                    <div
                      key={ind.id}
                      className="bg-slate-50 hover:bg-white rounded-xl p-8 border border-slate-200 hover:border-emerald-700/40 hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-5">
                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm">
                          <IndIcon size={22} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 font-sans tracking-tight group-hover:text-emerald-800 transition-colors">
                          {t(ind.key)}
                        </h3>
                        <p className="text-[12.5px] leading-relaxed text-slate-600 font-serif">
                          {t(ind.descKey)}
                        </p>
                      </div>

                      <div className="border-t border-slate-200/60 pt-4 mt-6 space-y-2 font-mono text-[10.5px] text-slate-500">
                        <div className="flex justify-between">
                          <span>Primary Hub Origin:</span>
                          <span className="font-bold text-slate-800">{ind.origin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Verified Dispatch Mode:</span>
                          <span className="font-bold text-emerald-800">{ind.dispatch}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* PAGE: PROJECTS */}
        {activePage === "projects" && (
          <section className="bg-slate-50 py-12 lg:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              <div className="text-center space-y-4">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 uppercase bg-emerald-50 py-1 px-3 rounded inline-block">
                  Execution Registry
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                  Sovereign-Level Procurement Case Studies
                </h1>
                <p className="text-base text-slate-600 max-w-2xl mx-auto font-serif">
                  A selection of recorded sourcing executions demonstrating extreme compliance, logistics management, and cost-containment across key industries.
                </p>
              </div>

              {/* Case Studies */}
              <div className="space-y-8">
                {[
                  {
                    titleKey: "proj1Title",
                    locKey: "proj1Location",
                    descKey: "proj1Desc",
                    metricKey: "proj1Stat",
                    tag: "Oil & Gas / Power Sector",
                    mode: "Exceptional Charter Flight",
                    isoCheck: "ISO 9001:2015 Approved Batch"
                  },
                  {
                    titleKey: "proj2Title",
                    locKey: "proj2Location",
                    descKey: "proj2Desc",
                    metricKey: "proj2Stat",
                    tag: "Medical / Emergency Supplies",
                    mode: "Direct Priority Cargo Plane",
                    isoCheck: "CE Standard Certified Batch"
                  },
                  {
                    titleKey: "proj3Title",
                    locKey: "proj3Location",
                    descKey: "proj3Desc",
                    metricKey: "proj3Stat",
                    tag: "Marine & Offshore Equipment",
                    mode: "Vessel Barge Direct Delivery",
                    isoCheck: "API Marine Specification Approved"
                  },
                  {
                    titleKey: "proj4Title",
                    locKey: "proj4Location",
                    descKey: "proj4Desc",
                    metricKey: "proj4Stat",
                    tag: "Construction Materials",
                    mode: "Consolidated Cargo Liner Shippings",
                    isoCheck: "Ethical Traceability Confirmed"
                  },
                  {
                    titleKey: "proj5Title",
                    locKey: "proj5Location",
                    descKey: "proj5Desc",
                    metricKey: "proj5Stat",
                    tag: "Aviation Maintenance Supplies",
                    mode: "Express Cold Container Delivery",
                    isoCheck: "FAA / Det Trade Compliant"
                  }
                ].map((proj, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-mono font-bold tracking-wide py-1 px-3 rounded uppercase">
                          {proj.tag}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-mono py-1 px-3 rounded">
                          {proj.isoCheck}
                        </span>
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold font-sans text-slate-900 leading-tight">
                        {t(proj.titleKey)}
                      </h3>
                      <p className="text-[14px] text-slate-600 font-serif leading-relaxed">
                        {t(proj.descKey)}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <MapPin size={14} className="text-emerald-700" />
                        <span>{t(proj.locKey)}</span>
                        <span>|</span>
                        <span>Logistics Corridor: {proj.mode}</span>
                      </div>
                    </div>
                    <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-center text-center space-y-1">
                      <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 tracking-wider">
                        Recorded Metric
                      </span>
                      <span className="text-xl font-black text-emerald-800 font-mono">
                        {t(proj.metricKey)}
                      </span>
                      <span className="text-[9.5px] font-mono text-slate-500">
                        Verified Auditable Protocol
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PAGE: SUPPLIER NETWORK IN-DEPTH */}
        {activePage === "network" && (
          <section className="bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  {translations.globalTradingNetworkBadge?.[lang] || "INTERNATIONAL PRESENCE"}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                  {translations.globalTradingNetworkTitle?.[lang] || "Global Trading Network"}
                </h1>
                <div className="text-xs sm:text-sm font-mono font-bold text-emerald-800 tracking-wider">
                  {translations.globalTradingNetworkSub?.[lang] || "MIDDLE EAST  •  EUROPE  •  AFRICA  •  ASIA  •  NORTH AMERICA  •  SOUTH AMERICA"}
                </div>
                <p className="text-base text-slate-600 max-w-2xl mx-auto font-serif leading-relaxed pt-1">
                  {translations.globalTradingNetworkDesc?.[lang]}
                </p>
              </div>

              {/* 6 Regional Commercial Hubs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tradingLocations.map((loc, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span className="text-xs font-mono font-extrabold text-slate-900 tracking-wider">
                            {lang === "en" ? loc.region : loc.regionAr}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-100 font-bold px-2 py-0.5 rounded">
                          {loc.code}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-start gap-2">
                          <MapPin size={18} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans tracking-tight leading-snug">
                              {lang === "en" ? `${loc.city}, ${loc.country}` : loc.cityCountryAr}
                            </h3>
                            <p className="text-xs font-mono font-semibold text-emerald-800 mt-1">
                              {lang === "en" ? loc.hubType : loc.hubTypeAr}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-[13px] text-slate-600 font-serif leading-relaxed pl-6">
                        {lang === "en" ? loc.description : loc.descriptionAr}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500 pl-6">
                      <span className="text-slate-600 font-medium">
                        {lang === "en" ? loc.highlight : loc.highlightAr}
                      </span>
                      <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                        {lang === "en" ? "Commercial Hub" : "مركز تجاري"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pillars & Direct Dialogue Section */}
              <div className="border-t border-slate-200 pt-12">
                <div className="text-center space-y-2 mb-10">
                  <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 uppercase bg-emerald-50 py-1.5 px-3 rounded inline-block">
                    {lang === "en" ? "Direct Corporate Dialogue" : "اجتماعات شفافة ومفتوحة"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {t("networkTitle")}
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl mx-auto font-serif">
                    {t("networkSub")}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Main Sourcing Pillars Panel */}
                  <div className="lg:col-span-7 bg-slate-50 rounded-xl p-8 border border-slate-200 space-y-6 flex flex-col justify-center">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                        {lang === "en" ? "Our 4 Pillars of Secure Delivery" : "ركائزنا الأربعة لتوصيل آمن"}
                      </h3>
                      <p className="text-slate-600 text-xs font-serif mt-1">
                        {lang === "en" ? "Direct relationships built on trust, verification, and clear processes." : "علاقات مباشرة مبنية على الثقة المتبادلة والتحقق المستمر لراحتكم."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded border border-slate-200 space-y-1">
                        <span className="text-xl">🌍</span>
                        <h4 className="font-bold text-slate-900 text-xs font-sans">
                          {lang === "en" ? "1. Trusted Global Network" : "١. شبكة عالمية موثوقة"}
                        </h4>
                        <p className="text-slate-500 text-[11px] font-serif leading-relaxed">
                          {lang === "en" ? "We verify factories directly, ensuring certified workflows." : "نفحص المصانع بأنفسنا، ونتأكد من دقة خطوط الإنتاج وجودة المنتجات."}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded border border-slate-200 space-y-1">
                        <span className="text-xl">📜</span>
                        <h4 className="font-bold text-slate-900 text-xs font-sans">
                          {lang === "en" ? "2. Transparent Legal Escrow" : "٢. شفافية قانونية تامة"}
                        </h4>
                        <p className="text-slate-500 text-[11px] font-serif leading-relaxed">
                          {lang === "en" ? "All billing, taxes, customs codes, and licenses are handled cleanly." : "جميع الفواتير والضرائب وأكواد الجمارك والتراخيص تُعالج بكل وضوح."}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded border border-slate-200 space-y-1">
                        <span className="text-xl">🚢</span>
                        <h4 className="font-bold text-slate-900 text-xs font-sans">
                          {lang === "en" ? "3. Seamless Port Logistics" : "٣. لوجستيات شحن ميسرة"}
                        </h4>
                        <p className="text-slate-500 text-[11px] font-serif leading-relaxed">
                          {lang === "en" ? "From bulk cargo to priority containers, shipping lines are protected." : "شحنتك مؤمنة تماماً سواء كانت بحجم حاوية واحدة أو سفينة شحن ضخمة."}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded border border-slate-200 space-y-1">
                        <span className="text-xl">🤝</span>
                        <h4 className="font-bold text-slate-900 text-xs font-sans">
                          {lang === "en" ? "4. Zero-Friction Handover" : "٤. تسليم مباشر بيديك"}
                        </h4>
                        <p className="text-slate-500 text-[11px] font-serif leading-relaxed">
                          {lang === "en" ? "We accompany the cargo all the way until physically cleared." : "نرافق البضاعة حتى يتم فحصها وتفريغها بسلام داخل مستودعك الخاص."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Plain, simple descriptions of our meetings and plans */}
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 lg:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold font-sans text-slate-900 flex items-center gap-2">
                        <Users className="text-emerald-700" size={22} />
                        {lang === "en" ? "How we inspect factories together" : "كيف نأخذ بيد شحنتك خطوة بخطوة"}
                      </h3>
                      <p className="text-sm text-slate-600 font-serif leading-relaxed">
                        {t("networkDesc")}
                      </p>

                      <div className="border-t border-slate-200 pt-4 space-y-3 font-sans">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 size={18} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">
                              {lang === "en" ? "Personal Factory Visits" : "زيارات شخصية ودية"}
                            </span>
                            <span className="text-xs text-slate-500 font-serif">
                              {lang === "en" ? "We inspect factory floors ourselves, testing materials and checking machine calibrations." : "نحن نسافر ونقف على مكابس المصانع ونفحص الخامات للتأكد من أمانها تماماً."}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 size={18} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">
                              {lang === "en" ? "Worry-Free Custom Paperwork" : "التخليص الجمركي دون وجع رأس"}
                            </span>
                            <span className="text-xs text-slate-500 font-serif">
                              {lang === "en" ? "We handles all tax certificates, customs codes, and bills of lading. No hard steps for you." : "نتولى كافة الأوراق والضرائب والمستندات الحكومية لتصلك دون بذل أي مجهود."}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 size={18} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">
                              {lang === "en" ? "Direct Home Delivery" : "توصيل حتى باب منزلك أو شركتك"}
                            </span>
                            <span className="text-xs text-slate-500 font-serif">
                              {lang === "en" ? "We bring the cargo directly by ship or plane right to your preferred destination." : "خط شحن ممهد بالطائرات أو السفن لإحضار بضاعتك أينما كنت دون قلق."}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded p-4 text-xs font-mono text-emerald-900 inline-flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse inline-block" />
                      <span>{lang === "en" ? "OUR BOARD ROOM IS COMPLIANT AND OPEN TO ENQUIRIES" : "غرفة اجتماعاتنا مفتوحة وجاهزة دائماً لمساعدتك"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PAGE: RFQ INTAKE FORM */}
        {activePage === "rfq" && (
          <section className="bg-slate-50 py-12 lg:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              
              <div className="text-center space-y-3">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 bg-emerald-50 py-1.5 px-3.5 border border-emerald-200 uppercase inline-block">
                  Request For Quotation Desk
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  {t("rfqTitle")}
                </h1>
                <p className="text-sm text-slate-600 font-serif">
                  {t("rfqSub")}
                </p>
              </div>

              {/* SUCCESS POPUP IF SUBMITTED */}
              {rfqSuccess ? (
                <div className="bg-white border-2 border-emerald-500 rounded-xl p-8 space-y-6 text-center shadow-lg animate-[fadeIn_0.5s_ease_out]">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-sans text-slate-900">
                      {t("successTitle")}
                    </h3>
                    <p className="text-sm text-slate-600 font-serif leading-relaxed max-w-md mx-auto">
                      {t("rfqSuccessDesc")}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 py-3 px-5 rounded inline-block font-mono text-xs text-slate-700">
                    🔒 Security Trace ID: <span className="font-bold text-emerald-800">{rfqRefId}</span>
                  </div>

                  {/* Real-time SMTP Status and Setup Guide */}
                  {smtpStatus.isSMTPConfigured ? (
                    smtpStatus.isSMTPReady ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-left max-w-md mx-auto space-y-1.5 shadow-sm">
                        <div className="font-bold text-emerald-950 text-xs font-mono flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                          📡 SMTP DISPATCH SUCCESSFUL
                        </div>
                        <p className="text-[12px] text-emerald-800 font-serif leading-relaxed">
                          Your purchase request has been officially wrapped, parsed, and forwarded via SMTP to external hubs. A copy has been delivered to your primary email address.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-left max-w-lg mx-auto space-y-2 shadow-sm">
                        <div className="font-bold text-amber-950 text-xs font-mono flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                          ⚠️ SMTP AUTHENTICATION FAILURE
                        </div>
                        <p className="text-[11px] text-amber-900 font-serif leading-relaxed">
                          Your server tried to negotiate SMTP, but got rejected. Server error returned: <code className="bg-white px-1 py-0.5 border border-amber-200 rounded text-amber-950 font-mono text-[10px] break-all">{smtpStatus.smtpError}</code>.
                        </p>
                        <p className="text-[11px] text-amber-800 font-serif">
                          Please verify your app password syntax (spaces don't matter, but there must be exactly 16 letters) and make sure your server host matches your SMTP port.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 sm:p-6 text-left max-w-xl mx-auto space-y-3.5 shadow-sm">
                      <div className="font-bold text-amber-950 text-xs font-mono flex items-center gap-2">
                        <span className="w-3 h-3 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
                        ✉️ HOW TO RECEIVE ORDERS IN YOUR EMAIL INBOX:
                      </div>
                      <div className="text-[11px] sm:text-xs text-amber-900 font-sans space-y-2.5 leading-relaxed">
                        <p className="font-serif">
                          Since mail settings are simulated by default, you must configure a real SMTP provider (like Gmail) in your Secrets to bypass simulation and receive actual orders.
                        </p>
                        <div className="bg-white/80 border border-amber-100/60 rounded p-4 space-y-3">
                          <p className="font-bold text-[11px] text-amber-950 uppercase font-mono">
                            Step-By-Step Configuration Guide:
                          </p>
                          <ol className="list-decimal pl-4 space-y-2 font-serif text-[11px]">
                            <li>
                              Open the <strong>Secrets</strong> settings panel in the AI Studio editor interface (the gear icon on the top right, or Settings).
                            </li>
                            <li>
                              Add these keys as secrets (define them exactly as written):
                              <ul className="list-disc pl-4 mt-1.5 font-mono text-[10px] text-amber-950 space-y-1 bg-amber-50/50 p-2 rounded border border-amber-100">
                                <li><strong>SMTP_HOST</strong>: <span className="bg-white px-1 border border-amber-200 rounded">smtp.gmail.com</span></li>
                                <li><strong>SMTP_PORT</strong>: <span className="bg-white px-1 border border-amber-200 rounded">465</span></li>
                                <li><strong>SMTP_SECURE</strong>: <span className="bg-white px-1 border border-amber-200 rounded">true</span></li>
                                <li><strong>SMTP_USER</strong>: <span className="bg-white px-1 border border-amber-200 rounded font-semibold text-emerald-800">your-email@gmail.com</span></li>
                                <li><strong>SMTP_PASS</strong>: <span className="bg-white px-1 border border-amber-250 rounded font-semibold text-rose-800">your 16-character google app password</span></li>
                                <li><strong>RECIPIENT_EMAILS</strong>: <span className="bg-white px-1 border border-amber-200 rounded">boraldabendaj.agikons@gmail.com</span></li>
                              </ul>
                            </li>
                            <li className="pt-1">
                              <strong>How to get a Gmail App Password:</strong> Go to your Google Account Settings &rarr; Security &rarr; App Passwords. Generates a unique 16-letter code. Use this code for <strong>SMTP_PASS</strong> (do not use your regular account login password!).
                            </li>
                          </ol>
                        </div>
                        <p className="font-serif text-[11px] text-amber-800 italic">
                          Once configured, re-submit a test RFQ and check your inbox instantly!
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setRfqSuccess(false);
                      setSmtpStatus({});
                    }}
                    className="block w-full sm:w-auto mx-auto bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold tracking-wide py-3 px-8 rounded cursor-pointer transition-all"
                  >
                    {t("btnDismiss")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRfqSubmit} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-md space-y-6 font-sans">
                  
                  {/* Item / Qty Rows */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                        {t("lblProduct")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.productName}
                        onChange={(e) => setRfqForm({ ...rfqForm, productName: e.target.value })}
                        placeholder={t("holderProduct")}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-700 border-b-2 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("lblQuantity")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.quantity}
                        onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                        placeholder={t("holderQuantity")}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Technical Specs Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("lblSpecs")}
                    </label>
                    <textarea
                      rows={4}
                      value={rfqForm.productSpecifications}
                      onChange={(e) => setRfqForm({ ...rfqForm, productSpecifications: e.target.value })}
                      placeholder={t("holderSpecs")}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all font-mono"
                    />
                  </div>

                  {/* Target budget + Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("lblBudget")}
                      </label>
                      <input
                        type="text"
                        value={rfqForm.budget}
                        onChange={(e) => setRfqForm({ ...rfqForm, budget: e.target.value })}
                        placeholder={t("holderBudget")}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("lblDelCountry")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.deliveryCountry}
                        onChange={(e) => setRfqForm({ ...rfqForm, deliveryCountry: e.target.value })}
                        placeholder={t("holderDelCountry")}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Delivery Timeline */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("lblTimeline")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.timeline}
                        onChange={(e) => setRfqForm({ ...rfqForm, timeline: e.target.value })}
                        placeholder={t("holderTimeline")}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
                      />
                    </div>

                    {/* File Attachment Output Display */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        File Security Status
                      </label>
                      <div className="bg-slate-50 border border-slate-200 rounded px-4 py-3 text-xs flex items-center justify-between min-h-[46px]">
                        {rfqForm.fileName ? (
                          <div className="flex items-center gap-2 text-emerald-800 font-bold max-w-[200px] truncate">
                            <FileText size={16} />
                            <span>{rfqForm.fileName}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">No layout attachment detected</span>
                        )}
                        {rfqForm.fileName && (
                          <button
                            type="button"
                            onClick={() => setRfqForm((p) => ({ ...p, fileName: "", fileType: "", fileBase64: "" }))}
                            className="text-red-500 hover:text-red-700 font-bold font-mono"
                          >
                            REMOVE
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Drag and Drop Uploader Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      {t("lblFile")}
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById("file_picker")?.click()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                        dragging ? "border-emerald-600 bg-emerald-50/40" : "border-slate-300 hover:border-emerald-700"
                      }`}
                    >
                      <input
                        id="file_picker"
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.zip,.doc,.xlsx,.xls,.png,.jpg"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileChange(e.target.files[0]);
                          }
                        }}
                      />
                      <Upload size={28} className={dragging ? "text-emerald-700 animate-bounce" : "text-slate-400"} />
                      <span className="text-xs font-bold text-slate-700">{t("lblFileHint")}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Supported parameters: PDF, DOCX, ZIP, XLS, IMAGES (Max 5MB)</span>
                    </div>
                  </div>

                  {/* Notes Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("lblNotes")}
                    </label>
                    <textarea
                      rows={3}
                      value={rfqForm.additionalNotes}
                      onChange={(e) => setRfqForm({ ...rfqForm, additionalNotes: e.target.value })}
                      placeholder={t("holderNotes")}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={rfqLoading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide py-4 px-6 rounded shadow cursor-pointer transition-colors flex items-center justify-center gap-3"
                  >
                    {rfqLoading ? (
                      <>
                        <div className="animate-jaes-loader">
                          <JaesLogoBadge size="sm" />
                        </div>
                        <span>{lang === "en" ? "DISPATCHING ENCRYPTED FILE DATASTREAM..." : "جاري إرسال البيانات المشفرة..."}</span>
                      </>
                    ) : (
                      t("btnSubmitRFQForm")
                    )}
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* PAGE: CONTACT TEAM */}
        {activePage === "contact" && (
          <section className="bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              <div className="text-center space-y-3">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-700 uppercase bg-emerald-50 py-1 px-3 rounded inline-block">
                  Primary Coordination Link
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                  {t("contactTitle")}
                </h1>
                <p className="text-sm text-slate-600 font-serif">
                  {t("contactSub")}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form column */}
                <div className="lg:col-span-7">
                  {contactSuccess ? (
                    <div className="bg-slate-50 border-2 border-emerald-500 rounded-xl p-8 space-y-6 text-center shadow-md animate-[fadeIn_0.5s_ease_out]">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                        <CheckCircle2 size={30} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold font-sans text-slate-900">
                          {t("successTitle")}
                        </h3>
                        <p className="text-xs text-slate-600 font-serif leading-relaxed">
                          {t("contactSuccessDesc")}
                        </p>
                      </div>

                      <div className="bg-white border border-slate-300 py-2.5 px-5 rounded inline-block font-mono text-xs text-slate-700">
                        Inquiry ref: <span className="font-bold text-emerald-800">{contactRefId}</span>
                      </div>

                      {/* Dynamic SMTP Warning/Success Banner */}
                      {smtpStatus.isSMTPConfigured ? (
                        smtpStatus.isSMTPReady ? (
                          <div className="bg-emerald-50 border border-emerald-250 rounded-lg p-4 text-left max-w-md mx-auto space-y-1">
                            <div className="font-bold text-emerald-950 text-[10px] font-mono flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                              📡 MAIL RELAY SUCCESS
                            </div>
                            <p className="text-[11px] text-emerald-800 font-serif">
                              Your message was successfully transmitted over real-time SMTP and delivered to your designated mailbox folder.
                            </p>
                          </div>
                        ) : (
                          <div className="bg-amber-50 border border-amber-250 rounded-lg p-4 text-left max-w-md mx-auto space-y-1.5 animate-[fadeIn_0.3s_ease]">
                            <div className="font-bold text-amber-950 text-[10px] font-mono flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                              ⚠️ EMAIL RELAY FAILURE
                            </div>
                            <p className="text-[11px] text-amber-900 font-serif leading-relaxed">
                              We could not negotiate your custom mail transfer server. Returned error: <code className="bg-white px-1 py-0.5 border border-amber-200 rounded text-amber-950 font-mono text-[9px] break-all">{smtpStatus.smtpError}</code>.
                            </p>
                          </div>
                        )
                      ) : (
                        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-5 text-left max-w-md mx-auto space-y-2">
                          <div className="font-bold text-amber-955 text-[10px] font-mono flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
                            ✉️ HOW TO RECEIVE THIS MESSAGE IN YOUR EMAIL:
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-amber-900 font-sans space-y-2 leading-relaxed">
                            <p className="font-serif leading-relaxed">
                              Your form submission is saved in application server logs. To receive instant notifications directly at <strong>{lang === "en" ? "your address" : "بريدك الإلكتروني"}</strong>, configure real SMTP credentials inside your AI Studio <strong>Secrets / Settings</strong> panel:
                            </p>
                            <ul className="list-disc pl-4 font-mono text-[9px] text-amber-950 space-y-1 bg-white/60 p-2 rounded border border-amber-100">
                              <li><strong>SMTP_HOST</strong>: smtp.gmail.com</li>
                              <li><strong>SMTP_PORT</strong>: 465</li>
                              <li><strong>SMTP_SECURE</strong>: true</li>
                              <li><strong>SMTP_USER</strong>: your-email@gmail.com</li>
                              <li><strong>SMTP_PASS</strong>: google 16-letter app-password</li>
                              <li><strong>RECIPIENT_EMAILS</strong>: boraldabendaj.agikons@gmail.com</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setContactSuccess(false);
                          setSmtpStatus({});
                        }}
                        className="block w-full sm:w-auto mx-auto bg-slate-950 hover:bg-slate-800 text-white font-sans text-xs font-bold tracking-wide py-2.5 px-6 rounded transition-all"
                      >
                        {t("btnDismiss")}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-6 font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            {t("lblFullName")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.fullName}
                            onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            {t("lblCompany")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.companyName}
                            onChange={(e) => setContactForm({ ...contactForm, companyName: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            {t("lblCountry")}
                          </label>
                          <input
                            type="text"
                            value={contactForm.country}
                            onChange={(e) => setContactForm({ ...contactForm, country: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            {t("lblEmail")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={contactForm.emailAddress}
                            onChange={(e) => setContactForm({ ...contactForm, emailAddress: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            {t("lblPhone")}
                          </label>
                          <input
                            type="tel"
                            value={contactForm.phoneNumber}
                            onChange={(e) => setContactForm({ ...contactForm, phoneNumber: e.target.value })}
                            placeholder="+971 50..."
                            className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            {t("lblSubject")}
                          </label>
                          <input
                            type="text"
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            placeholder="General Partnership / Bid Inquiry"
                            className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {t("lblMessage")} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 font-serif"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={contactLoading}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide py-4 px-6 rounded cursor-pointer transition-colors flex items-center justify-center gap-3"
                      >
                        {contactLoading ? (
                          <>
                            <div className="animate-jaes-loader">
                              <JaesLogoBadge size="sm" />
                            </div>
                            <span>{lang === "en" ? "PREPARING DISPATCH STACK..." : "جاري تجهيز الاتصال..."}</span>
                          </>
                        ) : (
                          t("btnSubmitContact")
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Corporate Direct Contact & Network Clearance */}
                <div className="lg:col-span-5 bg-slate-50 rounded-xl p-8 border border-slate-200 divide-y divide-slate-200/80 space-y-6">
                  
                  {/* Executive Direct Email */}
                  <div className="pb-6 space-y-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <Mail size={16} className="text-emerald-700" />
                      {t("contactEmailUs")}
                    </span>
                    <div className="font-mono text-sm sm:text-base break-all font-bold">
                      <a href="mailto:boraldabendaj.agikons@gmail.com" className="block text-emerald-800 hover:text-emerald-900 hover:underline">
                        boraldabendaj.agikons@gmail.com
                      </a>
                    </div>
                    <p className="text-xs text-slate-500 font-serif leading-relaxed">
                      {lang === "en"
                        ? "Direct inquiries dispatched to our active procurement team. Priority SLA responses within 12 business hours."
                        : "استفسارات مباشرة إلى فريق المشتريات لدينا. الرد بأولوية خلال ١٢ ساعة عمل."}
                    </p>
                  </div>

                  {/* Submit Order Request quick action */}
                  <div className="py-6 space-y-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <FileSpreadsheet size={16} className="text-emerald-700" />
                      {lang === "en" ? "Looking to Order Products?" : "هل ترغب في طلب منتجات ومواد؟"}
                    </span>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">
                      {lang === "en"
                        ? "If you have detailed bill of quantities, specifications, or tender requirements, use our direct intake form."
                        : "إذا كان لديك جداول كميات أو مواصفات فنية أو متطلبات مناقصات، يرجى تقديم طلب الشراء مباشرة."}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigateTo("rfq")}
                      className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs font-bold py-2.5 px-4 rounded shadow-sm transition-all cursor-pointer"
                    >
                      <span>{t("btnSubmitRFQ")}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* License / Global Network Badge */}
                  <div className="pt-6 text-center">
                    <div className="inline-flex items-center gap-2.5 bg-white border border-slate-200 px-3.5 py-2.5 rounded-lg text-xs font-mono shadow-sm">
                      <Globe size={16} className="text-emerald-700 flex-shrink-0" />
                      <span className="font-bold text-slate-800 tracking-wider">GLOBAL COMMERCIAL & PROCUREMENT NETWORK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GLOBAL OFFICE & COORDINATION LOCATIONS */}
              <div className="pt-10 border-t border-slate-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-emerald-700 uppercase bg-emerald-50 py-1 px-3 rounded inline-block">
                      {lang === "en" ? "Global Operations" : "العمليات الدولية"}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-slate-900 tracking-tight mt-1.5">
                      {lang === "en" ? "Global Office & Coordination Locations" : "مواقع المكاتب والتنسيق الإقليمي العالمي"}
                    </h2>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-800">
                    MIDDLE EAST  •  EUROPE  •  AFRICA  •  ASIA  •  NORTH AMERICA  •  SOUTH AMERICA
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {coordinationLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between group relative"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                          <span className="text-[11px] font-mono font-extrabold text-slate-900 tracking-wider">
                            {lang === "en" ? `${loc.region} — ${loc.regionSub}` : loc.regionAr}
                          </span>
                          <span className="text-[9.5px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-100 font-bold px-2 py-0.5 rounded">
                            {loc.code}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-emerald-800 font-sans tracking-tight">
                            {lang === "en" ? loc.officeType : loc.officeTypeAr}
                          </h3>
                          <div className="flex items-start gap-1.5 mt-2 text-xs text-slate-700 font-sans leading-relaxed">
                            <MapPin size={14} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                            <span>{lang === "en" ? loc.address : loc.addressAr}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                          <Truck size={12} className="text-emerald-700 flex-shrink-0" />
                          <span>{lang === "en" ? "Shipping:" : "الشحن:"}</span>
                        </div>
                        <p className="text-[11px] font-serif text-slate-600 pl-4 leading-normal">
                          {lang === "en" ? loc.shipping : loc.shippingAr}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER SECTION */}
      <footer id="main_footer" className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Desc */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-emerald-800 flex items-center justify-center text-white border border-emerald-500/20 font-bold text-xs shadow">
                JE
              </div>
              <span className="font-extrabold text-sm tracking-widest text-white">
                JAE'S ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-serif leading-normal select-none">
              {t("footerDesc")}
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              Rolex Tower Axis. Sheikh Zayed Road, Dubai
            </div>
          </div>

          {/* Col 2: High Traffic Corridors */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#a0aeb6] font-mono font-bold">
              {t("quickLinks")}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: "home", label: t("navHome") },
                { id: "about", label: t("navAbout") },
                { id: "services", label: t("navServices") },
                { id: "industries", label: t("navIndustries") },
                { id: "projects", label: t("navProjects") },
                { id: "network", label: t("navNetwork") },
                { id: "rfq", label: t("navRFQ") },
                { id: "contact", label: t("navContact") }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left font-semibold"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Sourcing locations */}
          <div className="space-y-4 text-xs">
            <h4 className="text-xs uppercase tracking-widest text-[#a0aeb6] font-mono font-bold">
              {t("worldwideCoverage")}
            </h4>
            <p className="text-slate-400 font-serif leading-relaxed">
              {t("worldwideCoverageDesc")}
            </p>
            <div className="font-mono text-[10px] text-emerald-400 font-semibold space-y-1">
              <div>MIDDLE EAST | EUROPE | AFRICA</div>
              <div>ASIA | NORTH AMERICA | SOUTH AMERICA</div>
            </div>
          </div>

          {/* Col 4: Rapid Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#a0aeb6] font-mono font-bold">
              Communication Lanes
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 break-all font-mono font-bold">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-500 flex-shrink-0" />
                <a href="mailto:boraldabendaj.agikons@gmail.com" className="hover:text-emerald-400">
                  boraldabendaj.agikons@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-[10px] text-slate-500 leading-normal font-sans font-normal pt-1.5">
                <Info size={14} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>Submit all RFQ specifications direct via our Request RFQ interface for priority encryption processing.</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METALLIC STRIP WITH LEGAL MODAL TRIGGERS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-start text-slate-500 text-[11px] font-mono">
          <div>{t("footerRights")}</div>
          <div className="flex flex-wrap gap-4 font-bold text-slate-400">
            <button onClick={() => setLegalDoc("privacy")} className="hover:text-emerald-400 transition-colors">
              {t("legalPrivacy")}
            </button>
            <span>|</span>
            <button onClick={() => setLegalDoc("terms")} className="hover:text-emerald-400 transition-colors">
              {t("legalTerms")}
            </button>
            <span>|</span>
            <button onClick={() => setLegalDoc("disclaimer")} className="hover:text-emerald-400 transition-colors">
              {t("legalDisclaimer")}
            </button>
          </div>
        </div>
      </footer>

      {/* LEGAL DIALOGS OVERLAYS */}
      {legalDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease_out]">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 lg:p-8 space-y-6 relative font-sans">
            
            <button
              onClick={() => setLegalDoc(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 bg-slate-50 hover:bg-slate-100 rounded-full"
            >
              <X size={20} />
            </button>

            {/* Content Selection */}
            {legalDoc === "privacy" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                  <Shield size={24} />
                  <h3>{t("privacyTitle")}</h3>
                </div>
                <div className="prose prose-slate prose-sm font-serif leading-relaxed space-y-3.5 text-slate-600">
                  <p>
                    At Jae's Enterprise, we treat corporate trade data, proprietary blue-prints, industrial specifications, and supplier credentials with elevated security clearances.
                  </p>
                  <p>
                    All documentation uploaded through our Request For Quotation (RFQ) system is encrypted as local binary structures and dispatched directly to the active, pre-vetted sourcing desk administrators.
                  </p>
                  <p>
                    We do not rent, monetize, or lease your strategic material list details to public intelligence aggregates or consumer analytical algorithms. All information remains protected under sovereign UAE data jurisdiction.
                  </p>
                </div>
              </div>
            )}

            {legalDoc === "terms" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                  <Scale size={24} />
                  <h3>{t("termsTitle")}</h3>
                </div>
                <div className="prose prose-slate prose-sm font-serif leading-relaxed space-y-3.5 text-slate-600">
                  <p>
                    These corporate terms govern any sourcing procurement, logistics consulting, or bidding representation executed under standard DET protocols through Jae's Enterprise.
                  </p>
                  <p>
                    Any transaction is subject to formal bilateral agreements stating exact Incoterms (CIF, FOB, EXW, DDP, etc.), sovereign escrow setups, and certified third-party laboratory clearances pre-shipment.
                  </p>
                  <p>
                    We reserve the right to audit and refuse specific RFQs that infringe upon trade controls, international dual-use hardware bans, or are evaluated to fail basic supplier Ethical Sourcing standards.
                  </p>
                </div>
              </div>
            )}

            {legalDoc === "disclaimer" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
                  <Info size={24} />
                  <h3>{t("disclaimerTitle")}</h3>
                </div>
                <div className="prose prose-slate prose-sm font-serif leading-relaxed space-y-3.5 text-slate-600">
                  <p>
                    Jae's Enterprise operates as a procurement consulting services and contract brokerage firm in Dubai. We represent institutional buyers matching them with certified manufacturers.
                  </p>
                  <p>
                    Though we employ strict ISO-aligned audit methods, final technical performance warranties on products, raw steel elements, heavy machinery turbine rotors remain subject directly to the manufacturing plant guarantees.
                  </p>
                  <p>
                    All transaction statistics and logistical leads displayed on this corporate website represent our unified historical track-records. Individual contracts are negotiated under separate legally-binding frameworks.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-150 flex justify-end">
              <button
                onClick={() => setLegalDoc(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold tracking-wide py-2.5 px-6 rounded cursor-pointer"
              >
                {t("legalClose")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
