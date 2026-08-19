import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/chrome'
import { ROUTES } from '../config/routes'
import { useApp } from '../state/AppState'

const HERO = '/assets/hero.png'

const content = {
  en: {
    home: 'Home',
    services: 'Services',
    howItWorks: 'How it works',
    help: 'Help',
    langToggle: 'English / தமிழ்',
    signIn: 'Sign In',
    badge: '✨ New Tamil Nadu - AI Guide',
    heroTitle: "Don't search through government opportunities. Let AI find what matters to you.",
    heroSubtitle: 'Personalized benefits, education, and career matching for citizens of Tamil Nadu.',
    btnStart: 'Start My Journey',
    btnTry: 'Try Without Account',
    btnSpeak: 'Speak in Tamil',
    ourFeatures: 'OUR FEATURES',
    designedForYou: 'Designed For You',
    trustedTitle: 'TRUSTED BY MILLIONS',
    trustedBody: 'Proud to serve the citizens of Tamil Nadu',
    stats: [
      ['45 Lakhs+', 'Citizens Benefitted'],
      ['120+', 'Active Schemes'],
      ['98%', 'Match Accuracy'],
    ],
    howTitle: 'HOW IT WORKS',
    howSub: '3 Steps to Claim Your Benefits',
    steps: [
      ['01', 'Create Profile', 'Select your demographics, education, and specific needs in under 2 minutes.'],
      ['02', 'Instant AI Match', 'Our smart engine scans all state opportunities to calculate what benefits you match.'],
      ['03', 'Claim Opportunity', 'Get direct personalized assistance guidance to smoothly apply online.'],
    ],
    reviewsTitle: 'CITIZEN VOICES',
    reviewsSub: 'Real User Experiences',
    reviews: [
      ['“Scholarship matching saved my son\'s college year. Makkal AI found the exact minority support scheme we didn\'t know about.”', 'Arulmozhi S.', 'Trichy District'],
      ['“I simply spoke in Tamil to get my agricultural solar pump subsidy cleared. Exceptional approach for senior citizens.”', 'K. Rengasamy', 'Thanjavur District'],
    ],
    footerDesc: 'A progressive citizen-empowerment initiative by State Government. Built securely with open standards and privacy first.',
    portals: 'Portals',
    governance: 'Governance',
    citizenDash: 'Citizen Dashboard',
    studentPortal: 'Student Portal',
    operatorConsole: 'Operator Console',
    officerPortal: 'Officer Portal',
    adminConsole: 'Admin Console',
    superAdmin: 'Super Admin',
    features: [
      { icon: 'briefcase.svg', bg: 'bg-[rgba(16,107,126,0.08)]', title: 'Government Services', body: 'Find personal services, welfare schemes, and civil benefits dynamically.', to: '/schemes' },
      { icon: 'book-open.svg', bg: 'bg-[rgba(11,76,95,0.08)]', title: 'Education & Skills', body: 'Access scholarships, special courses, and university free coaching paths.', to: '/scholarships' },
      { icon: 'user.svg', bg: 'bg-[rgba(217,119,6,0.08)]', title: 'Career Opportunities', body: 'Matched internships, specialized state jobs, and local opportunities.', to: '/jobs' },
      { icon: 'cpu-teal.svg', bg: 'bg-[rgba(16,107,126,0.08)]', title: 'AI Guide Chatbot', body: 'Ask queries in Tamil or English. Conversational intelligence built for all.', to: '/ai-guide' },
    ],
  },
  ta: {
    home: 'முகப்பு',
    services: 'சேவைகள்',
    howItWorks: 'திட்டங்கள்',
    help: 'உதவி',
    langToggle: 'தமிழ் / English',
    signIn: 'உள்நுழையவும்',
    badge: '✨ புதிய தமிழகம் - AI-வழிகாட்டி',
    heroTitle: 'உங்களுக்கு கிடைக்கக்கூடிய வாய்ப்புகளை நீங்கள் தேட வேண்டியதில்லை. நாங்கள் கண்டுபிடித்து தருகிறோம்.',
    heroSubtitle: 'அரசு வாய்ப்புகளை தேடி அலைய வேண்டாம். உங்களின் கல்வி, வேலைவாய்ப்பு மற்றும் நலத்திட்டங்களை AI கண்டுபிடித்து வழங்கும்.',
    btnStart: 'தொடங்கு',
    btnTry: 'கணக்கு இன்றி முயற்சிக்கவும்',
    btnSpeak: 'தமிழில் பேசுங்கள்',
    ourFeatures: 'எங்கள் சேவைகள்',
    designedForYou: 'துரித மற்றும் எளிய அணுகல்',
    trustedTitle: 'நம்பகத்தன்மை',
    trustedBody: 'மக்களுக்கு சேவை செய்வதில் பெருமை கொள்கிறோம்',
    stats: [
      ['45 லட்சம்+', 'பயனாளிகள்'],
      ['120+', 'இணைக்கப்பட்ட திட்டங்கள்'],
      ['98%', 'துல்லியமான பொருத்தம்'],
    ],
    howTitle: 'எளிமையான 3 படிகள்',
    howSub: 'உங்கள் பலன்களைப் பெற 3 படிகள்',
    steps: [
      ['01', 'விவரங்களை பதிவிடவும்', 'உங்கள் விவரங்கள் மற்றும் தேவைகளை 2 நிமிடங்களில் பதிவிடுங்கள்.'],
      ['02', 'AI தேடல்', 'எங்கள் AI அமைப்பானது உங்களுக்காக பொருந்தும் அனைத்து திட்டங்களையும் கண்டறியும்.'],
      ['03', 'விண்ணப்பிக்கவும்', 'நேரடி வழிகாட்டுதலுடன் இணைய வழியில் எளிதாக விண்ணப்பிக்கலாம்.'],
    ],
    reviewsTitle: 'மக்களின் குரல்',
    reviewsSub: 'உண்மை பயனர் அனுபவங்கள்',
    reviews: [
      ['“கல்வி உதவித்தொகை என் மகனின் கல்லூரி படிப்பை காப்பாற்றியது. எங்களுக்கு தெரியாத சிறுபான்மையினர் உதவி திட்டத்தை Makkal AI கண்டுபிடித்தது.”', 'அருள்மொழி S.', 'திருச்சி மாவட்டம்'],
      ['“விவசாய சூரிய பம்ப் மானியம் பெற நான் தமிழில் மட்டுமே பேசினேன். முதியவர்களுக்கு மிகச்சிறந்த அணுகுமுறை.”', 'K. ரெங்கசாமி', 'தஞ்சாவூர் மாவட்டம்'],
    ],
    footerDesc: 'மாநில அரசின் மக்களுக்கான முன்னேற்றத் திட்டம். பாதுகாப்பு மற்றும் தனியுரிமைக்கு முன்னுரிமை அளிக்கப்பட்டு உருவாக்கப்பட்டது.',
    portals: 'துறைகள்',
    governance: 'நிர்வாகம்',
    citizenDash: 'குடிமகன் தளம்',
    studentPortal: 'மாணவர் தளம்',
    operatorConsole: 'இயக்குனர் தளம்',
    officerPortal: 'அதிகாரி தளம்',
    adminConsole: 'நிர்வாகி தளம்',
    superAdmin: 'உயர் நிர்வாகி',
    features: [
      { icon: 'briefcase.svg', bg: 'bg-[rgba(16,107,126,0.08)]', title: 'அரசு சேவைகள்', body: 'தனிப்பட்ட சேவைகள், நலத்திட்டங்கள் மற்றும் பலன்களை உடனடியாக கண்டறியவும்.', to: '/schemes' },
      { icon: 'book-open.svg', bg: 'bg-[rgba(11,76,95,0.08)]', title: 'கல்வி உதவி', body: 'கல்வி உதவித்தொகை, சிறப்பு வகுப்புகள் மற்றும் கட்டணமில்லா பயிற்சி நெறிகள்.', to: '/scholarships' },
      { icon: 'user.svg', bg: 'bg-[rgba(217,119,6,0.08)]', title: 'வேலைவாய்ப்பு', body: 'பொருத்தமான பயிற்சி வேலைகள், அரசு பணிகள் மற்றும் உள்ளூர் வேலை வாய்ப்புகள்.', to: '/jobs' },
      { icon: 'cpu-teal.svg', bg: 'bg-[rgba(16,107,126,0.08)]', title: 'AI வழிகாட்டி', body: 'தமிழ் அல்லது ஆங்கிலத்தில் கேள்விகளை கேளுங்கள். அனைவருக்குமான அறிவார்ந்த வழிகாட்டி.', to: '/ai-guide' },
    ],
  },
}

export default function LandingPage() {
  const navigate = useNavigate()
  const { session, setLang, logout } = useApp()

  const t = content[session.lang === 'ta' ? 'ta' : 'en']

  return (
    <div className="min-h-svh bg-cream">
      {/* Header matching original Figma design */}
      <header className="flex h-20 items-center justify-between border-b border-line bg-white px-6 sm:px-12 lg:px-[120px]">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-navy text-white font-extrabold text-[16px]">
            <Icon name="cpu.svg" className="size-6" />
          </div>
          <div className="leading-normal">
            <p className="font-manrope text-[18px] font-extrabold text-navy">மக்கள AI</p>
            <p className="font-inter text-[12px] font-bold text-gold">MAKKAL AI</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-[15px] lg:flex">
          <button type="button" onClick={() => navigate(ROUTES.CITIZEN.DASHBOARD)} className="font-manrope font-semibold text-navy">
            {t.home}
          </button>
          <a href="#features" className="font-manrope font-medium text-muted hover:text-navy">
            {t.services}
          </a>
          <a href="#how" className="font-manrope font-medium text-muted hover:text-navy">
            {t.howItWorks}
          </a>
          <a href="#footer" className="font-manrope font-medium text-muted hover:text-navy">
            {t.help}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-teal px-3 py-2 font-manrope text-[13px] font-bold text-teal hover:bg-mist sm:px-4"
            onClick={() => setLang(session.lang === 'en' ? 'ta' : 'en')}
          >
            {t.langToggle}
          </button>
          <button
            type="button"
            className="rounded-lg bg-teal px-5 py-2.5 font-manrope text-[14px] font-bold text-white shadow-sm hover:bg-teal/90 transition-all"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            {t.signIn}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center gap-12 bg-white px-6 py-12 sm:px-12 lg:flex-row lg:gap-16 lg:px-[120px] lg:py-20">
        <div className="flex min-w-0 flex-1 flex-col gap-6 lg:gap-8">
          <div className="w-fit rounded-full bg-amber px-4 py-1.5">
            <p className="font-manrope text-[13px] font-bold text-gold">{t.badge}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-manrope text-[28px] font-extrabold leading-[1.25] text-navy sm:text-[36px] lg:text-[40px]">
              {t.heroTitle}
            </h1>
            <p className="font-manrope text-[16px] font-medium leading-[1.6] text-muted sm:text-[18px]">
              {t.heroSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              className="rounded-xl bg-teal px-7 py-4 font-manrope text-[16px] font-bold text-white shadow-[0px_8px_8px_rgba(16,107,126,0.13)] hover:bg-teal/90"
              onClick={() => navigate(ROUTES.REGISTER.STEP(1))}
            >
              {t.btnStart}
            </button>
            <button
              type="button"
              className="rounded-xl border-[1.5px] border-teal px-6 py-4 font-manrope text-[16px] font-bold text-teal hover:bg-mist"
              onClick={() => {
                logout()
                navigate(ROUTES.CITIZEN.DASHBOARD)
              }}
            >
              {t.btnTry}
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-amber px-5 py-4 hover:bg-amber/90"
              onClick={() => navigate(ROUTES.EASY.MODE)}
            >
              <Icon name="mic.svg" className="size-5" />
              <span className="font-manrope text-[16px] font-bold text-gold">{t.btnSpeak}</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Image Showcase */}
        <div className="relative flex h-[340px] w-full max-w-[540px] items-center justify-center overflow-hidden rounded-[28px] border border-line bg-white p-3 shadow-xl sm:h-[440px]">
          <img
            src={HERO}
            alt="Tamil Nadu Citizens using AI Citizen Platform"
            className="size-full object-contain rounded-2xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="flex flex-col items-center gap-12 px-6 py-16 sm:px-12 lg:px-[120px] lg:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-inter text-[14px] font-extrabold uppercase text-gold">{t.ourFeatures}</p>
          <p className="font-manrope text-[24px] font-extrabold text-navy sm:text-[28px]">{t.designedForYou}</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.map((c) => (
            <button
              key={c.title}
              type="button"
              onClick={() => navigate(c.to)}
              className="flex flex-col items-start gap-5 rounded-[20px] border border-line bg-white p-8 text-left shadow-[0px_8px_12px_rgba(18,18,18,0.02)] hover:border-teal transition-all"
            >
              <div className={`flex size-12 items-center justify-center rounded-xl ${c.bg}`}>
                <Icon name={c.icon} className="size-6" />
              </div>
              <div>
                <p className="font-manrope text-[18px] font-extrabold text-ink">{c.title}</p>
              </div>
              <p className="font-manrope text-[14px] font-medium leading-[1.5] text-muted">{c.body}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="flex flex-col items-start justify-between gap-10 bg-navy px-6 py-12 sm:px-12 lg:flex-row lg:items-center lg:px-[120px] lg:py-[60px]">
        <div className="flex w-[400px] max-w-full flex-col gap-2">
          <p className="font-inter text-[14px] font-bold uppercase text-gold">{t.trustedTitle}</p>
          <p className="font-manrope text-[24px] font-extrabold text-white">{t.trustedBody}</p>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          {t.stats.map(([n, label]) => (
            <div key={label} className="flex flex-col gap-1.5">
              <p className="font-manrope text-[36px] font-extrabold text-gold">{n}</p>
              <p className="font-manrope text-[14px] font-bold text-white">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="flex flex-col items-center gap-12 px-6 py-16 sm:px-12 lg:px-[120px] lg:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-inter text-[14px] font-extrabold uppercase text-gold">{t.howTitle}</p>
          <p className="font-manrope text-[24px] font-extrabold text-navy sm:text-[28px]">{t.howSub}</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
          {t.steps.map(([n, stepTitle, body]) => (
            <div key={n} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6">
              <p className="font-manrope text-[48px] font-extrabold text-mist">{n}</p>
              <div>
                <p className="font-manrope text-[18px] font-extrabold text-ink">{stepTitle}</p>
              </div>
              <p className="font-manrope text-[14px] font-medium leading-[1.5] text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="flex flex-col gap-12 bg-white px-6 py-16 sm:px-12 lg:px-[120px] lg:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-inter text-[14px] font-extrabold uppercase text-gold">{t.reviewsTitle}</p>
          <p className="font-manrope text-[24px] font-extrabold text-navy sm:text-[28px]">{t.reviewsSub}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {t.reviews.map(([q, name, loc]) => (
            <div key={name} className="flex flex-col justify-between gap-6 rounded-[24px] bg-cream p-8 sm:p-10">
              <p className="font-manrope text-[15px] font-medium leading-[1.6] text-muted sm:text-[16px]">{q}</p>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-navy text-white font-bold text-[14px]">
                  {name[0]}
                </div>
                <div>
                  <p className="font-manrope text-[14px] font-bold text-ink">{name}</p>
                  <p className="font-inter text-[12px] font-medium text-teal">{loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer with Role Portals */}
      <footer id="footer" className="flex flex-col gap-10 bg-navy px-6 py-12 sm:px-12 lg:px-[120px] lg:py-[60px]">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="flex w-[300px] max-w-full flex-col gap-4">
            <p className="font-manrope text-[20px] font-extrabold text-white">மக்கள AI • MAKKAL AI</p>
            <p className="font-manrope text-[13px] font-medium leading-[1.5] text-mist">
              {t.footerDesc}
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col gap-3">
              <p className="font-manrope text-[14px] font-bold text-gold">{t.portals}</p>
              <button type="button" onClick={() => navigate('/home')} className="font-inter text-[13px] text-white text-left hover:text-gold">{t.citizenDash}</button>
              <button type="button" onClick={() => navigate('/student')} className="font-inter text-[13px] text-white text-left hover:text-gold">{t.studentPortal}</button>
              <button type="button" onClick={() => navigate('/operator')} className="font-inter text-[13px] text-white text-left hover:text-gold">{t.operatorConsole}</button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-manrope text-[14px] font-bold text-gold">{t.governance}</p>
              <button type="button" onClick={() => navigate('/officer')} className="font-inter text-[13px] text-white text-left hover:text-gold">{t.officerPortal}</button>
              <button type="button" onClick={() => navigate('/admin')} className="font-inter text-[13px] text-white text-left hover:text-gold">{t.adminConsole}</button>
              <button type="button" onClick={() => navigate('/super-admin')} className="font-inter text-[13px] text-white text-left hover:text-gold">{t.superAdmin}</button>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-white/20" />
        <div className="flex flex-col justify-between gap-4 sm:flex-row text-[12px] text-mist">
          <p className="font-inter font-medium">
            © 2026 Tamil Nadu e-Governance Agency (TNeGA). Built dynamically in bilingual representation.
          </p>
          <div className="flex gap-4">
            <button type="button" onClick={() => navigate('/easy-mode')} className="hover:text-white">Easy Mode (Tamil)</button>
            <button type="button" onClick={() => navigate('/register/1')} className="hover:text-white">Register</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
