// Jae's Enterprise Multilingual Dictionary (English & Arabic)
// Simplified and optimized for advanced/senior citizens with warm, gentle, and clear language.
export interface TranslationMap {
  [key: string]: {
    [lang: string]: string;
  };
}

export const translations: TranslationMap = {
  // Navigation
  navHome: { en: "Home Screen", ar: "الصفحة الرئيسية" },
  navAbout: { en: "Our Story", ar: "قصتنا البسيطة" },
  navServices: { en: "How We Help", ar: "كيف نساعدك" },
  navIndustries: { en: "Things We Find", ar: "أشياء نجدها لك" },
  navProjects: { en: "Our Successes", ar: "أعمالنا السابقة" },
  navNetwork: { en: "Global Trading Network", ar: "شبكة التجارة العالمية" },
  navRFQ: { en: "Order Products", ar: "اطلب بضاعة" },
  navContact: { en: "Call/Write Us", ar: "اطلب المساعدة" },

  // Slogans
  mainTitle: { en: "Simple Global Buying & Product Sourcing", ar: "مساعدتك في شراء المنتجات الطبية والصناعية بسهولة" },
  subTitle: { en: "We help public organizations and buyers get quality goods without any worry", ar: "نحن نساعدك في جلب بضائع عالية الجودة دون تعقيد أو وسطاء" },

  // Hero Section
  heroHeadline: { en: "We Help You Find & Buy Goods Safely From Around the World", ar: "نساعدك في شراء وجلب البضائع الأصلية من الخارج بكل أمان وسهولة" },
  heroSubheading: { en: "We talk directly to the best factories, check their quality, and deliver the goods straight to your address in Dubai and beyond.", ar: "نحن نتحدث مباشرة مع أفضل المصانع، ونفحص جودة المنتجات، ثم نوصلها لك حتى باب منزلك أو شركتك." },
  btnSubmitRFQ: { en: "Submit Order Request", ar: "اطلب بضاعة الآن" },
  btnContactTeam: { en: "Ask For Help", ar: "اسأل فريقنا المساعد" },

  // Trust Statistics
  statsTitle: { en: "Safe & Simple Sourcing", ar: "أمان كامل وبساطة تامة" },
  statHQ: { en: "Our Dubai Office", ar: "مكتبنا في دبي" },
  statHQDesc: { en: "Rolex Tower, Dubai", ar: "برج رولكس، دبي" },
  statGlobalOps: { en: "Global Help", ar: "نساعد الجميع" },
  statGlobalDesc: { en: "Serving 45+ countries", ar: "نخدم أكثر من ٤٥ بلداً" },
  statSuppliers: { en: "1,200+ Checked Factories", ar: "١٢٠٠ مصنع قمنا بزيارته فحصناه" },
  statSuppliersDesc: { en: "We visit them in person", ar: "نحن نزورهم ونفحص جودتهم بأنفسنا" },
  statProjects: { en: "980+ Happy Deliveries", ar: "أكثر من ٩٨٠ شحنة ناجحة" },
  statProjectsDesc: { en: "Delivered safe & complete", ar: "وصلت آمنة وسليمة بالكامل" },
  statCoverage: { en: "World Logistics Corridor", ar: "شحن سريع وعالمي" },
  statCoverageDesc: { en: "By ship or airplane", ar: "عن طريق السفن الموثوقة أو الطائرات" },

  // Services
  servicesTitle: { en: "How We Make Sourcing Easy for You", ar: "كيف نجعل عملية الشراء سهلة ومريحة بالنسبة لك" },
  servicesSub: { en: "We do all the hard work - from quality checking to customs papers.", ar: "نحن نقوم بكل المجهود الصعب - من فحص جودة المنتج إلى إنهاء أوراق الجمارك." },
  serviceGlobalSourcing: { en: "Finding Best Suppliers", ar: "البحث عن أفضل المصانع" },
  serviceGlobalSourcingDesc: { en: "We find the safest, most affordable factories worldwide that make exactly what you need.", ar: "نبحث لك عن أفضل المصانع الأمنة وأنسبها سعراً حول العالم لنوفر لك طلبك." },
  serviceDirectProcurement: { en: "Direct Buying", ar: "الشراء المباشر والآمن" },
  serviceDirectProcurementDesc: { en: "We buy directly from the manufacturer to avoid extra fees from middlemen.", ar: "نشتري مباشرة من المصنع لتجنب أي زيادات أو عمولات في الأسعار من الوسطاء." },
  serviceVendorVerification: { en: "Checking Reliability", ar: "فحص أمان المصانع" },
  serviceVendorVerificationDesc: { en: "We check the factory's safety, finances, and official certificates so you sleep soundly.", ar: "نفحص سجلات المصنع وسلامته وشهاداته الرسمية حتى تشتري وأنت مطمئن البال." },
  serviceProcurementConsulting: { en: "Friendly Sourcing Advice", ar: "نصائح وإرشادات ودية" },
  serviceProcurementConsultingDesc: { en: "We talk you through the options, helping you save money while keeping things completely safe.", ar: "نتحدث معك لنشرح خطوتنا بخطوة، ونساعدك في توفير المال بشكل مضمون." },
  serviceProjectProcurement: { en: "Big Building Materials", ar: "مواد ومستلزمات المشاريع" },
  serviceProjectProcurementDesc: { en: "We source heavy materials for bulk public buildings and large road projects with full care.", ar: "نوفر المواد الثقيلة ومواد البناء للمشاريع الكبيرة والبلديات برعاية تامة." },
  serviceLogisticsCoordination: { en: "Careful Shipping", ar: "شحن وتوصيل فائق العناية" },
  serviceLogisticsCoordinationDesc: { en: "We organize safe transport by land, sea, or air, matching any temperature requirements.", ar: "ننسق الشحن البحري والجوي والبري الآمن، وبأفضل درجات حرارة الحفظ المطلوبة." },
  serviceCustomsClearance: { en: "Easy Customs & Documents", ar: "أوراق الجمارك بكل سهولة" },
  serviceCustomsClearanceDesc: { en: "We handles all the government forms, taxes, and custom clearances for a smooth delivery.", ar: "نتولى كافة الأوراق الحكومية، والجمارك للتأكد من المرور السلس للبضاعة." },
  serviceTenderSupport: { en: "Technical Bids Help", ar: "مساعدتك في تقديم العروض" },
  serviceTenderSupportDesc: { en: "We package all specifications beautifully to make sure you win your official contracts.", ar: "نجهز كل الأوراق والمواصفات الفنية بشكل ممتاز لمساعدتك على النجاح." },
  serviceIntTrade: { en: "Safe International Paying", ar: "تسهيل المعاملات والدفع الآمن" },
  serviceIntTradeDesc: { en: "We guide you on banking terms, bank letters, and trade terms to prevent any money loss.", ar: "نرشدك بأساليب الدفع المؤمنة لضمان أمان أموالك وحفظ حقوقك بالكامل." },

  // Workflow (Procurement Process)
  processTitle: { en: "Our Simple Step-by-Step Way", ar: "طريقتنا البسيطة والسهلة خطوة بخطوة" },
  processSub: { en: "We guide you directly, from writing your request to signing for your boxes", ar: "نرافقك طوال الطريق، من كتابة طلبك وحتى استلام صناديق البضائع بيدك" },
  step1: { en: "Tell Us What You Need", ar: "١. أخبرنا بالمواد التي تطلبها" },
  step1Desc: { en: "Just fill out a simple request with your product name, how many, and when you need it.", ar: "ما عليك سوى ملء طلب بسيط باسم المنتج، والكمية، والوقت المفضل لديك." },
  step2: { en: "We Read and Plan", ar: "٢. نقرأ طلبك ونخطط لك" },
  step2Desc: { en: "Our friendly experts check the details, looking out for rules and customs to keep it smooth.", ar: "يقوم خبراؤنا بمراجعة التفاصيل لتجنب أي مشاكل بالجمارك لضمان طريق ممهد." },
  step3: { en: "We Find the Right Maker", ar: "٣. نجد المصنع المناسب لك" },
  step3Desc: { en: "We choose from our trusted list of friends and manufacturers who make the best products.", ar: "نختار من مستودع المصانع الموثوقة لدينا والذين يصنعون أفضل جودة دائماً." },
  step4: { en: "We Ask for Best Prices", ar: "٤. نحصل على أفضل سعر لك" },
  step4Desc: { en: "We gather clear, direct, and fair prices so you get the best value for your hard-earned money.", ar: "نجمع لك عروض أسعار واضحة ومباشرة لتوفير المال دون تنازل عن الجودة." },
  step5: { en: "We Do Quality Inspection", ar: "٥. نفحص البضاعة بأنفسنا" },
  step5Desc: { en: "We check the products in person at the factory to make sure they are exactly right before shipping.", ar: "نزور خط الإنتاج لنفحص المنتجات بأيدينا للتأكد من مطابقتها التامة قبل الشحن." },
  step6: { en: "Safe Arrival at Your Door", ar: "٦. التوصيل الآمن لباب بيتك" },
  step6Desc: { en: "We handle all the borders, bring the boxes, and deliver them straight to you with a warm smile.", ar: "نهتم بأمور الجمارك، ونشحن الصناديق ونوصلها لك مباشرة مع تمنياتنا الطيبة." },

  // Certifications
  certsTitle: { en: "We Hold Ourselves to Safe and Honest Standards", ar: "نحن نلتزم بأعلى معايير الصدق والأمان" },
  certsSub: { en: "Friendly, fully authorized trade representation that respects local law and elders", ar: "تمثيل تجاري رسمي وودود يحترم القوانين المحلية ويحمي تعاملاتك بالكامل" },
  certISO: { en: "Official Quality Badges", ar: "شهادات الجودة الرسمية" },
  certISODesc: { en: "We operate matching general international quality methods (ISO 9001 and ISO 14001) for safety.", ar: "نعمل بموجب أسس إدارة الجودة العالمية لضمان سلامة التعاملات وجودة المنتج." },
  certLicense: { en: "Dubai Government Approved", ar: "مرخص معتمد من حكومة دبي" },
  certLicenseDesc: { en: "We are proudly licensed by the Dubai Department of Economy and Tourism to help you buy products.", ar: "نحن مرخصون رسمياً من دائرة الاقتصاد والسياحة في دبي لتقديم مساعدة شراء البضائع." },
  certVerify: { en: "Factories We Visit & Trust", ar: "مصانع نزورها ونثق بها" },
  certVerifyDesc: { en: "We make sure factories are healthy places with fair pay, clean conditions, and no child labor.", ar: "نتأكد من أن المصانع التي نشتري منها تعامل العمال بعدل ونظافة وترفض عمالة الأطفال." },
  certProcure: { en: "Honest and Clean Rules", ar: "قوانين شراء تتسم بالنزاهة والصدق" },
  certProcureDesc: { en: "Zero bribery, clean agreements, and complete respect for UAE government security protocols.", ar: "نرفض الرشوة تماماً، ونتبع خطوات نظيفة ومثالية تحترم شروط دولة الإمارات الحبيبة." },
  certQA: { en: "Pre-Shipment Inspections", ar: "فحص البضائع قبل المغادرة" },
  certQADesc: { en: "We inspect every single batch before it goes on the ship, ensuring there are zero errors.", ar: "نقوم بفحص الشحنات قبل صعودها على ظهر السفينة لإنهاء أي احتمال للمشاكل." },
  certAudit: { en: "Yearly Friendly Visits", ar: "زيارات المصانع السنوية الودية" },
  certAuditDesc: { en: "We fly to meet the factories every single year to check on safety and correct machine working.", ar: "نسافر للمصانع سنوياً لمصافحة شركائنا والتأكد من صيانة الآلات ومستويات النظافة." },

  // Industries
  indTitle: { en: "Things We Frequently Sourcing", ar: "أشياء نساعد في شرائها بشكل متكرر" },
  indSub: { en: "Simple and essential goods made exactly to target measurements without stress", ar: "بضائع أساسية ومفهومة تُصنّع خصيصاً بمقاسات دقيقة ومطمئنة" },
  indOilGas: { en: "Safe Pipes & Pipeline Fittings", ar: "أنابيب النفط صمامات الأمان" },
  indOilGasDesc: { en: "Drill pipes, safety control valves, and durable hoses compiled with certified factory badges.", ar: "أنابيب حفر متينة، وصمامات تحكم، وخراطيم قوية تحمل معايير السلامة الرسمية." },
  indMarine: { en: "Boat & Harbour Chains", ar: "سلاسل المراكب والموانئ" },
  indMarineDesc: { en: "Thick mooring chains, ship parts, direction sensors, and heavy steel ropes for docks.", ar: "سلاسل إرساء سميكة، قطع غيار للقوارب، مستشعرات توجيه، وحبال الفولاذ الثقيلة." },
  indIndustrial: { en: "Reliable Factory Machinery", ar: "مكابس وآلات المصانع الموثوقة" },
  indIndustrialDesc: { en: "Easy to use mill hubs, quiet hydraulic pumps, air compressors, and traditional printing press equipment.", ar: "محاور طحن، مضخات هيدروليكية، ضواغط هواء، وآلات كبس ثقيلة سهلة التشغيل." },
  indConstruction: { en: "Sturdy Building Steel & Materials", ar: "حديد البناء والأسمنت والرخام" },
  indConstructionDesc: { en: "High grade rebar, clear double glazed glass panels, building cement, and organic cream marble blocks.", ar: "حديد تسليح عالي القوة، ألواح زجاجية مزدوجة، أسمنت للبناء، ورخام طبيعي فاخر." },
  indMedical: { en: "Hospital Beds & Doctor Tools", ar: "أسرّة المستشفيات وأدوات الأطباء" },
  indMedicalDesc: { en: "Comfortable clinical beds, general protective masks, medical gloves, and diagnostic sound waves devices.", ar: "أسرّة مريحة للمرضى، ألبسة وقاية، أقنعة حماية، وأجهزة تشخيص الرنين والموجات." },
  indHospitality: { en: "Hotel Furniture & Blankets", ar: "أثاث الفنادق والمراتب والمنسوجات" },
  indHospitalityDesc: { en: "Soft beds, beautiful dark wood wardrobes, hotel dining room tables, and soft cotton sheets.", ar: "مراتب فندقية مريحة، أثاث خشبي جميل مخصص، ومفارش مائدة قطنية دافئة." },
  indAgricultural: { en: "Farming Water Pipes & Grain Silos", ar: "أنابيب الري وصوامع حفظ الحبوب" },
  indAgriculturalDesc: { en: "Simple drip watering sets, clean agricultural soil enrichers, and metal grain silos.", ar: "خراطيم الري بالتنقيط البسيط، مغذيات التربة الطبيعية، وصوامع معدنية لحفظ الغلال." },
  indMining: { en: "Stone Crushers & Underground Fans", ar: "كسارات الحجارة ومراوح التهوية" },
  indMiningDesc: { en: "Strong rock mills, ventilation blowers for deep fresh air, and thick rubber belt conveyors.", ar: "طواحين الصخور الصلبة، مراوح لضخ الهواء النقي تحت الأرض، وأحزمة نقل مطاطية." },
  indElectronics: { en: "Simple Green Wires & Computer Cards", ar: "الأسلاك النحاسية وقطع الكمبيوتر الإلكترونية" },
  indElectronicsDesc: { en: "Pure copper fibers, general motherboard cards, clear visual screen grids, and server cables.", ar: "أسلاك نحاسية نقية، لوحات كمبيوتر بسيطة، شاشات عرض، وكابلات شبكة." },
  indAutomotive: { en: "Truck Replacement Spares", ar: "قطع غيار الشاحنات وإطارات السيارات" },
  indAutomotiveDesc: { en: "Heavy truck metal suspensions, clean oil filters, safe brakes, and chassis accessories.", ar: "مساعدين لشاحنات النقل الثقيل، فلاتر زيت، فرامل آمنة، وقطع حماية النقل." },
  indAviation: { en: "Airplane Screws & Engine Washers", ar: "مسامير الطائرات وحشوات المحرك" },
  indAviationDesc: { en: "Precision hardware Screws, durable sheet metals, and quality certified safety gasket pieces.", ar: "مسامير دقيقة للتثبيت، ألواح من خلائط معدنية مرنة، وحشوات إحكام أمنة للمحركات." },
  indGovernment: { en: "Public Area Pipe Networks", ar: "مواسير الصرف الصحي ومستلزمات البلديات" },
  indGovernmentDesc: { en: "Standard public garden pipes, municipal garbage bins, and straightforward water pipeline links.", ar: "أنابيب مخصصة للحدائق العامة، سلال مهملات للبلديات، ومستلزمات المياه والصرف." },
  indSecurity: { en: "Thermal Screen Cameras & Bollards", ar: "كاميرات المراقبة ومصدات مواقف السيارات" },
  indSecurityDesc: { en: "Simple security cameras, metal gate turnstiles, and heavy iron bollards to protect buildings.", ar: "كاميرات حرارية واضحة، بوابات دخول حديدية، وحواجز لتأمين مواقف السيارات." },
  indLuxury: { en: "Genuine Leathers & Officer Desks", ar: "الجلود الطبيعية وأثاث المكاتب المريح" },
  indLuxuryDesc: { en: "High quality soft leathers, organic precious stones, and comfortable office chairs for your back.", ar: "جلود طبيعية ناعمة، أحجار كريمة، وكراسي مكاتب مريحة تحمي عمودك الفقري." },
  indManufacturing: { en: "General Bolts, Screws & Ball Bearings", ar: "المسامير والصواميل وحلقات الماكينات" },
  indManufacturingDesc: { en: "Easy thread bolts, metal machine rings (bearings), rubber air valves, and metal washers.", ar: "مسامير سهلة التثبيت، محامل كروية (رولمان بلي)، أختام سيليكون، وحلقات معدنية." },

  // Projects
  projTitle: { en: "Happy Work We Dispatched", ar: "بعض من أعمالنا وشحناتنا الناجحة" },
  projSub: { en: "A nice record showing our careful transport and safe delivery in detail", ar: "جدول يعرض كيف نقلنا بضائع هامة وسلمناها سالمة لأصحابها بكل دقة" },
  proj1Title: { en: "Delivering Three Steam Turbines", ar: "توصيل ثلاثة توربينات بخارية للمصنع" },
  proj1Location: { en: "Abu Dhabi, UAE", ar: "أبوظبي، الإمارات العربية المتحدة" },
  proj1Desc: { en: "We sourced and carefully delivered three large steam engine turbines designed to run quietly and save coal or electricity.", ar: "وفرنا وجلبنا ثلاثة توربينات بخار ضخمة مصممة للعمل بهدوء لتوفير الطاقة والمال." },
  proj1Stat: { en: "Total Cost: $14.2M", ar: "تكلفة العملية: ١٤.٢ مليون دولار" },

  proj2Title: { en: "Bringing 42 Urgent Clinical Suites", ar: "جلب ٤٢ غرفة فحص جراحي عاجلة" },
  proj2Location: { en: "Dubai Airport", ar: "مطار دبي الدولي" },
  proj2Desc: { en: "We bought and flew hospital operation diagnostic tools in record time to ensure sick patients get treatment fast.", ar: "شحنا أجهزة فحوصات طبية للمستشفى جواً لضمان علاج الأهالي دون انتظار." },
  proj2Stat: { en: "Delivered in: 18 Days Flat", ar: "مدة التوصيل: ١٨ يوماً فقط" },

  proj3Title: { en: "Getting Heavy Anchor Chains for Harbour", ar: "جلب سلاسل حديدية سميكة لرسو السفن" },
  proj3Location: { en: "Port of Fujairah, UAE", ar: "ميناء الفجيرة، الإمارات العربية المتحدة" },
  proj3Desc: { en: "Direct delivery of very strong, heavy grade-3 metal anchor chains and pins to keep big ships locked to the dock safely.", ar: "توصيل سلاسل حديدية ثقيلة للغاية ومثبتات لمنع السفن من الانجراف في البحر." },
  proj3Stat: { en: "Total Weight: 2,400 Tons", ar: "الوزن الكلي: ٢,٤٠٠ طن" },

  proj4Title: { en: "Supplying Window Glass & Rebars", ar: "توصيل زجاج النوافذ وحديد تسليح آمن" },
  proj4Location: { en: "GCC Municipalities", ar: "البلديات المحلية بالخليج" },
  proj4Desc: { en: "We brought high grade window glass and frame steels to set up nine beautiful public administrative spaces.", ar: "أحضرنا ألواح زجاجية ممتازة وحديد تسليح لبناء تسعة مباني خدمات عامة للمواطنين." },
  proj4Stat: { en: "100% Correct Deliveries", ar: "وصلت سليمة ومطابقة تماماً" },

  proj5Title: { en: "Hangar Airplane Repair Blanks", ar: "توفير قطع غيار وسبائك لصيانة الطائرات" },
  proj5Location: { en: "Dubai International Airport (DXB)", ar: "مطار دبي الدولي" },
  proj5Desc: { en: "We safely brought precise hardware spares and composite replacement sheets to keep regional passenger flights safe.", ar: "وفرنا قطع غيار ومسامير أصلية لورش الطيران للحفاظ على أمان المسافرين." },
  proj5Stat: { en: "Our Service Score: 99.9%", ar: "معدل سلامة الخدمة لدينا: ٩٩.٩٪" },

  // Global Trading Network / International Presence
  globalTradingNetworkBadge: { en: "INTERNATIONAL PRESENCE", ar: "التواجد التجاري الدولي" },
  globalTradingNetworkTitle: { en: "Global Trading Network", ar: "شبكة التجارة العالمية" },
  globalTradingNetworkSub: { en: "MIDDLE EAST  •  EUROPE  •  AFRICA  •  ASIA  •  NORTH AMERICA  •  SOUTH AMERICA", ar: "الشرق الأوسط  •  أوروبا  •  إفريقيا  •  آسيا  •  أمريكا الشمالية  •  أمريكا الجنوبية" },
  globalTradingNetworkDesc: { en: "Jae's Enterprise operates internationally, trading and coordinating strategic procurement, supply chain logistics, and cross-border commercial facilitation through strategically positioned regional commercial hubs.", ar: "تعمل شركة جايز انتربرايز دولياً عبر مراكز ومواقع تجارية إقليمية لتنسيق المشتريات وسلاسل التوريد والخدمات اللوجستية للمشترين والمؤسسات حول العالم." },

  // Supplier Network Map & Corporate Meetings
  networkTitle: { en: "Global Trading Network & Commercial Operations", ar: "شبكة التجارة العالمية والعمليات التجارية" },
  networkSub: { en: "International trade facilitation coordinated through strategic regional hubs worldwide", ar: "تسهيل التجارة الدولية والتنسيق من خلال مراكز تجارية إقليمية استراتيجية حول العالم" },
  networkDesc: { en: "Our operations coordinate factory verification, customs compliance documentation, and multi-modal logistics across Europe, the Middle East, Africa, Asia, North America, and South America.", ar: "يقوم فريقنا بتنسيق تدقيق المصانع والتوثيق الجمركي والخدمات اللوجستية عبر أوروبا والشرق الأوسط وإفريقيا وآسيا وأمريكا الشمالية وأمريكا الجنوبية." },

  // RFQ Form
  rfqTitle: { en: "Tell Us What Product We Can Find for You", ar: "اطلب بضاعة أو منتجاً وسنجده لك" },
  rfqSub: { en: "Fill in the simple boxes below, and our helpful experts will write you back with options", ar: "املأ الحقول البسيطة بالأسفل، وسيتواصل معك خبراؤنا الودودون لعرض الإمكانيات" },
  lblProduct: { en: "Product or Material Name", ar: "اسكت أو اكتب اسم البضاعة المطلوبة" },
  holderProduct: { en: "e.g., Simple Grade Rebar or Copper Pipes", ar: "مثال: حديد تسليح عادي أو مواسير نحاسية للسباكة" },
  lblQuantity: { en: "How Many Do You Need?", ar: "الكمية المطلوبة والأعداد" },
  holderQuantity: { en: "e.g., 500 Pieces, or 10 Boxes", ar: "مثال: ٥٠٠ حبة، أو ١٠ صناديق" },
  lblSpecs: { en: "Write Here Any Specific Style or Size", ar: "اكتب هنا المقاس أو الطول أو أي مواصفات خاصة" },
  holderSpecs: { en: "Tell us what color, length, certificate, or details you desire in regular simple words...", ar: "اكتب أي تفاصيل بكلماتك البسيطة الخاصة مثل اللون، الطول، نوع الاستخدام..." },
  lblBudget: { en: "Your Targeted Budget Plan (USD / AED)", ar: "الميزانية المتوقعة التقريبية (دولار / درهم)" },
  holderBudget: { en: "e.g., $15,000", ar: "مثال: ١٥,٠٠٠ دولار" },
  lblDelCountry: { en: "Where Should We Deliver It?", ar: "أين تريد منا أن نوصلها لك؟" },
  holderDelCountry: { en: "e.g., Rolex Tower, Dubai Sheikh Zayed", ar: "مثال: برج رولكس، دبي، الإمارات" },
  lblTimeline: { en: "How Fast Do You Need It?", ar: "متى تفضل أن تصلك؟" },
  holderTimeline: { en: "e.g., within 3 months, or July next year", ar: "مثال: خلال شهرين، أو في الصيف القادم" },
  lblFile: { en: "Attach Any Photo, Drawing or Specification PDF", ar: "أرفق صورة للمنتج، أو أي رسم توضيحي أو ملف مواصفات" },
  lblFileHint: { en: "Drop your file here, or click to find it on your device (Up to 5MB)", ar: "اسحب الملف وأسقطه هنا، أو اضغط للاختيار من جهازك (الحد الأقصى ٥ ميجابايت)" },
  lblNotes: { en: "Any Other Notes For Us?", ar: "هل تود إضافة أي ملاحظة أخرى؟" },
  holderNotes: { en: "Write anything you want us to know to help you better...", ar: "اكتب أي شيء تود أن نعرفه لنساعدك بشكل أفضل..." },
  btnSubmitRFQForm: { en: "Send My Simple Sourcing Request", ar: "أرسل طلبي البسيط الآن" },

  // Contact Form
  contactTitle: { en: "We are Always Ready to Chat with You", ar: "يسعدنا دائماً التحدث معك ومساعدتك" },
  contactSub: { en: "Ask us any simple question or suggest a lovely business venture", ar: "اكتب لنا أي سؤال بسيط وسوف نجيبك بوضح وبكل ترحيب" },
  lblFullName: { en: "Your Full Name", ar: "اسمك الكريم بالكامل" },
  lblCompany: { en: "Your Store or Company Name", ar: "اسم متجرك أو شركتك" },
  lblCountry: { en: "Your Country", ar: "البلد المقيم فيه" },
  lblEmail: { en: "Your Email Address", ar: "عنوان بريدك الإلكتروني" },
  lblPhone: { en: "Your Phone Number (Keep it simple)", ar: "رقم هاتفك المحمول للاتصال بك" },
  lblSubject: { en: "What is this about?", ar: "موضوع رسالتك" },
  lblMessage: { en: "Your Message (Write freely)", ar: "رسالتك (اكتب لنا ما تريده بكلماتك الخاصة)" },
  btnSubmitContact: { en: "Send Message Now", ar: "إرسال رسالتي الآن" },
  contactEmailUs: { en: "Send Us a Direct Email", ar: "عنوان بريدنا الإلكتروني المباشر" },
  contactGlobalCoordination: { en: "Global Office & Coordination Locations", ar: "مواقع المكاتب والتنسيق الإقليمي العالمي" },
  contactHQLocation: { en: "Regional Coordination Office", ar: "مكتب التنسيق الإقليمي" },
  contactHQDetail: { en: "Rolex Tower, Sheikh Zayed Road, Dubai, United Arab Emirates", ar: "برج رولكس، شارع الشيخ زايد، دبي، الإمارات العربية المتحدة" },
  contactCoverageZones: { en: "Port & Airport Shipping Paths", ar: "طرق شحن السفن والمطارات لدينا" },
  contactCoverageDetail: { en: "We safely load and unload boxes via Dubai Port of Jebel Ali, Fujairah Anchor, or Al Maktoum Cargo Port.", ar: "نقوم بتنزيل وتفريغ الصناديق في ميناء جبل علي، ميناء الفجيرة، ومطار آل مكتوم مجاناً." },

  // Legal
  privacyTitle: { en: "Privacy policy in Plain English", ar: "سياسة الخصوصية بكلمات سهلة وواضحة" },
  termsTitle: { en: "Our Simple Cooperation Terms", ar: "شروط التعاون والتعامل البسيطة" },
  disclaimerTitle: { en: "Friendly Legal Information", ar: "معلومات قانونية صديقة تهمك" },
  legalClose: { en: "Close This Window", ar: "إغلاق هذه النافذة" },

  // Success Popups
  successTitle: { en: "Got Your Message Successfully!", ar: "استلمنا رسالتك الطيبة بنجاح!" },
  contactSuccessDesc: { en: "Your details are safe with us. Our friendly staff will read your message and call or email you back within 12 hours.", ar: "معلوماتك في أمان تام. سيقرأ فريقنا اللطيف رسالتك ويتصل بك هاتفياً أو يراسلك بالبريد خلال ١٢ ساعة." },
  rfqSuccessDesc: { en: "We received your product specifications request securely. We are already talking to safe manufacturers to fetch easy prices for you.", ar: "وصلنا طلب صنف البضاعة بأمان. نحن نتحدث بالفعل مع المصانع الآمنة لتوفير أسعار مناسبة من أجلك." },
  btnDismiss: { en: "Understood, Thank You", ar: "فهمت، شكراً لك" },

  // Footer & Miscellaneous
  footerDesc: { en: "Jae's Enterprise is a family-like, trusted Dubai business helping everyone find and buy high-quality products abroad safely and securely.", ar: "جايز إنتربرايز هي جهة يعتمد عليها في دبي مثل عائلتك تماماً، نساعد في شراء البضائع بأمان تام وبدون أي متاعب." },
  footerAddress: { en: "Rolex Tower, Sheikh Zayed Road, Dubai, UAE", ar: "برج رولكس، شارع الشيخ زايد، دبي، الإمارات العربية المتحدة" },
  footerRights: { en: "© 2026 Jae's Enterprise. We respect our elders. All Rights Globally Protected.", ar: "© ٢٠٢٦ جايز إنتربرايز. نحن نحترم عملائنا الكرام. جميع الحقوق محفوظة." },
  legalPrivacy: { en: "Simple Privacy Policy", ar: "سياسة الخصوصية البسيطة" },
  legalTerms: { en: "Simple Terms", ar: "الشروط البسيطة" },
  legalDisclaimer: { en: "Simple Notes", ar: "توضيحات هامة" },
  quickLinks: { en: "Click to Go to Page", ar: "اضغط للانتقال السريع" },
  worldwideCoverage: { en: "Counties we trade with", ar: "بلدان نتعامل معها" },
  worldwideCoverageDesc: { en: "We ship and clear customs everywhere with deep respect and trust.", ar: "نشحن وننهي أوراق الجمارك في كل مكان بالاحترام والتقدير والاعتزاز." }
};
