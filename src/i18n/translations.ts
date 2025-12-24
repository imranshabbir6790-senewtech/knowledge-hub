export const translations = {
  en: {
    // Header
    home: "Home",
    details: "Details",
    signIn: "Sign In",
    register: "Register",
    
    // Dashboard
    documentation: "Documentation",
    documentationDesc: "Access our comprehensive PDF documentation with detailed information about our platform and services.",
    viewPdf: "View PDF",
    download: "Download",
    featuredVideo: "Featured Video",
    joinCommunity: "Join Our Community",
    communityDesc: "Connect with our growing community on Discord and Reddit. Share ideas, get support, and stay updated.",
    joinDiscord: "Join Discord",
    joinReddit: "Join Reddit",
    learnMore: "Learn More",
    learnMoreDesc: "Explore detailed information about our platform, features, and how to get started.",
    viewDetails: "View Details",
    
    // Auth
    welcomeBack: "Welcome Back",
    authDesc: "Sign in to your account or create a new one to get started.",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    createAccount: "Create Account",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",
    registerInterest: "I'm interested in learning more",
    volunteerInterest: "I'd like to volunteer",
    
    // Details
    detailsTitle: "Documentation",
    detailsDesc: "View and download our comprehensive documentation.",
    page: "Page",
    of: "of",
    downloadPdf: "Download PDF",
    pdfPlaceholder: "PDF Viewer Placeholder",
    pdfPlaceholderDesc: "Your PDF document will be displayed here once uploaded from the admin panel.",
    
    // Footer
    quickLinks: "Quick Links",
    allRightsReserved: "All rights reserved.",
  },
  ar: {
    // Header
    home: "الرئيسية",
    details: "التفاصيل",
    signIn: "تسجيل الدخول",
    register: "التسجيل",
    
    // Dashboard
    documentation: "الوثائق",
    documentationDesc: "الوصول إلى وثائقنا الشاملة بصيغة PDF مع معلومات تفصيلية حول منصتنا وخدماتنا.",
    viewPdf: "عرض PDF",
    download: "تحميل",
    featuredVideo: "فيديو مميز",
    joinCommunity: "انضم إلى مجتمعنا",
    communityDesc: "تواصل مع مجتمعنا المتنامي على Discord و Reddit. شارك الأفكار واحصل على الدعم وابق على اطلاع.",
    joinDiscord: "انضم إلى Discord",
    joinReddit: "انضم إلى Reddit",
    learnMore: "اعرف المزيد",
    learnMoreDesc: "استكشف معلومات تفصيلية حول منصتنا وميزاتها وكيفية البدء.",
    viewDetails: "عرض التفاصيل",
    
    // Auth
    welcomeBack: "مرحباً بعودتك",
    authDesc: "سجل الدخول إلى حسابك أو أنشئ حساباً جديداً للبدء.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    createAccount: "إنشاء حساب",
    fullName: "الاسم الكامل",
    confirmPassword: "تأكيد كلمة المرور",
    registerInterest: "أنا مهتم بمعرفة المزيد",
    volunteerInterest: "أود التطوع",
    
    // Details
    detailsTitle: "الوثائق",
    detailsDesc: "عرض وتحميل وثائقنا الشاملة.",
    page: "صفحة",
    of: "من",
    downloadPdf: "تحميل PDF",
    pdfPlaceholder: "عنصر نائب لعارض PDF",
    pdfPlaceholderDesc: "سيتم عرض مستند PDF الخاص بك هنا بمجرد تحميله من لوحة الإدارة.",
    
    // Footer
    quickLinks: "روابط سريعة",
    allRightsReserved: "جميع الحقوق محفوظة.",
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
