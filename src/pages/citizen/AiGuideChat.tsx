import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  HomeIndicator,
  LangPill,
  PhoneShell,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { useApp } from '../../state/AppState'

export function AiGuideChat() {
  const navigate = useNavigate()
  const { session } = useApp()
  const isTa = session.lang === 'ta'

  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; cards?: { title: string; desc: string; to: string }[] }[]
  >([
    {
      sender: 'ai',
      text: isTa
        ? `வணக்கம் ${session.profile.name}! நான் உங்கள் AI வழிகாட்டி. கல்வி உதவித்தொகை, அரசு நலத்திட்டங்கள் அல்லது வேலைவாய்ப்புகள் பற்றி எதை வேண்டுமானாலும் கேளுங்கள்.`
        : `Hello ${session.profile.name}! I am your AI Guide. Ask me anything about scholarships, government schemes, or career opportunities.`,
      cards: [
        { title: isTa ? 'புதுமைப் பெண் திட்டம்' : 'Pudhumai Penn Scheme', desc: isTa ? 'மாதம் ₹1,000 கல்வி உதவித்தொகை' : 'Monthly ₹1,000 education support', to: ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop') },
        { title: isTa ? 'இலவச மடிக்கணினி' : 'Free Laptop Scheme', desc: isTa ? 'கல்லூரி மாணவர்களுக்கான சாதனம்' : 'Free laptop for college students', to: ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop') },
      ],
    },
  ])

  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userText = input
    setInput('')
    setMessages((prev) => [...prev, { sender: 'user', text: userText }])

    setTimeout(() => {
      let responseText = isTa ? 'உங்கள் சுயவிவரத்தின்படி பின்வரும் திட்டங்கள் உங்களுக்கு பொருந்துகின்றன:' : 'Based on your profile, the following opportunities match you:'
      let cards = [
        { title: isTa ? 'PM சிறுபான்மையினர் கல்வித்தொகை' : 'PM Minority Scholarship', desc: isTa ? 'கட்டணம் மற்றும் பராமரிப்பு உதவி' : 'Tuition and maintenance support', to: ROUTES.CITIZEN.SCHEME_DETAIL('sch-vidyalaxmi') },
        { title: isTa ? 'நான் முதல்வன் திறன் பயிற்சி' : 'Naan Mudhalvan Skill Training', desc: isTa ? 'இலவச பைத்தான் & டேட்டா அனலிட்டிக்ஸ்' : 'Free Python & Data Analytics courses', to: ROUTES.STUDENT.COURSES },
      ]

      if (userText.toLowerCase().includes('job') || userText.includes('வேலை')) {
        responseText = isTa ? 'உங்களுக்கு பொருத்தமான சமீபத்திய வேலைவாய்ப்புகள்:' : 'Matched career & job opportunities for you:'
        cards = [
          { title: 'Junior Data Analyst', desc: '₹18,000 / month • Madurai', to: ROUTES.STUDENT.INTERNSHIPS },
          { title: isTa ? 'TNPSC இலவச பயிற்சி மைய இடம்' : 'TNPSC Coaching Center', desc: isTa ? 'அரசுத் தேர்வு இலவச பயிற்சி' : 'Free government exam prep seat', to: ROUTES.STUDENT.JOBS },
        ]
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          cards,
        },
      ])
    }, 600)
  }

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.CITIZEN.DASHBOARD} />
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-navy text-white text-[11px] font-black">
              AI
            </div>
            <p className="font-manrope text-[15px] font-extrabold text-navy">
              {isTa ? 'AI வழிகாட்டி' : 'AI Assistant Guide'}
            </p>
          </div>
          <LangPill />
        </div>

        {/* Messages Scroll Area */}
        <div className="flex flex-col gap-4 overflow-y-auto py-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-2 max-w-[85%] ${m.sender === 'user' ? 'self-end' : 'self-start'}`}
            >
              <div
                className={`rounded-2xl p-4 font-manrope text-[14px] leading-[1.5] ${
                  m.sender === 'user'
                    ? 'bg-teal text-white rounded-br-none'
                    : 'bg-white border border-line text-ink rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>

              {m.cards ? (
                <div className="flex flex-col gap-2 pt-1">
                  {m.cards.map((c) => (
                    <button
                      key={c.title}
                      type="button"
                      onClick={() => navigate(c.to)}
                      className="flex items-center justify-between rounded-xl border border-line bg-mist p-3 text-left hover:border-teal"
                    >
                      <div>
                        <p className="font-manrope text-[13px] font-bold text-navy">{c.title}</p>
                        <p className="font-inter text-[11px] text-muted">{c.desc}</p>
                      </div>
                      <span className="text-[14px] font-bold text-teal">
                        {isTa ? 'காண்க →' : 'View →'}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="fixed bottom-6 left-1/2 w-full max-w-[390px] -translate-x-1/2 px-4">
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-2 shadow-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isTa ? 'தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்...' : 'Ask in Tamil or English...'}
              className="flex-1 px-3 font-inter text-[14px] text-ink outline-none"
            />
            <button
              type="submit"
              className="flex size-10 items-center justify-center rounded-xl bg-teal text-white font-bold"
            >
              ↑
            </button>
          </div>
        </form>
      </div>

      <HomeIndicator />
    </PhoneShell>
  )
}
