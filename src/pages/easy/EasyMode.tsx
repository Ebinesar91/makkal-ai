import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  HomeIndicator,
  Icon,
  LangPill,
  PhoneShell,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'

export function EasyMode() {
  const navigate = useNavigate()

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-6 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.CITIZEN.DASHBOARD} />
          <p className="font-manrope text-[14px] font-bold text-teal">எளிய முறை / Easy Mode</p>
          <LangPill />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-manrope text-[24px] font-extrabold text-navy">வணக்கம்!</h1>
          <p className="font-manrope text-[15px] font-semibold text-muted">
            உங்களுக்கு தேவையான சேவையை தேர்ந்தெடுக்கவும்
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(ROUTES.EASY.VOICE)}
          className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-amber p-8 text-center shadow-lg hover:bg-amber/90"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-md">
            <Icon name="mic.svg" className="size-8 text-gold" />
          </div>
          <div>
            <p className="font-manrope text-[22px] font-extrabold text-gold">தமிழில் பேசுங்கள்</p>
            <p className="font-manrope text-[14px] font-bold text-gold/80">Speak in Tamil to Find Schemes</p>
          </div>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.CITIZEN.SCHEMES)}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-teal bg-white p-6 text-center shadow-sm"
          >
            <span className="text-[36px]">📜</span>
            <span className="font-manrope text-[16px] font-extrabold text-navy">அரசு உதவிகள்</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.CITIZEN.APPLICATIONS)}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-teal bg-white p-6 text-center shadow-sm"
          >
            <span className="text-[36px]">📋</span>
            <span className="font-manrope text-[16px] font-extrabold text-navy">விண்ணப்ப நிலை</span>
          </button>
        </div>
      </div>

      <HomeIndicator />
    </PhoneShell>
  )
}

export function EasyVoice() {
  const navigate = useNavigate()

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col items-center justify-between px-6 py-6 pb-20">
        <StatusBar />

        <div className="flex w-full items-center justify-between">
          <BackButton to={ROUTES.EASY.MODE} />
          <p className="font-manrope text-[14px] font-bold text-teal">குரல் வழி தேடல்</p>
          <LangPill />
        </div>

        <div className="flex flex-col items-center gap-8 py-12 text-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-amber shadow-xl animate-pulse">
            <Icon name="mic.svg" className="size-12 text-gold" />
          </div>
          <div>
            <h2 className="font-manrope text-[24px] font-extrabold text-navy">பேசுங்கள்... கேட்கிறேன்</h2>
            <p className="mt-2 font-manrope text-[14px] font-medium text-muted">
              &quot;எனக்கு மாதம் 1000 ரூபாய் மகளிர் உரிமைத் தொகை கிடைக்குமா?&quot;
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop'))}
          className="w-full rounded-2xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90"
        >
          பதிலை பார்க்க / View Results →
        </button>
      </div>

      <HomeIndicator />
    </PhoneShell>
  )
}
