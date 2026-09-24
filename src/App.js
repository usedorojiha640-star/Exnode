import { useReducer } from 'react';
import './App.css';
import {
  Zap as IconZap,
  ShieldCheck as IconShield,
  Percent as IconPercent,
  Eye as IconEye,
  ChevronLeft as IconPrev,
  ChevronRight as IconNext,
  Send as IconSend,
  Star as IconStar,
  Shield as IconShieldSimple,
} from 'lucide-react';

const CHANNEL_LINK = "https://t.me/+riUY9R1NEAUxMzUy";

/* ---------- данные ---------- */

const MERIT_LIST = [
  { Icon: IconZap, headline: 'Быстрый обмен', copy: 'Обрабатываем заявки\nза считанные минуты' },
  { Icon: IconShield, headline: 'Безопасность', copy: 'Ваши средства и данные\nнадежно защищены' },
  { Icon: IconPercent, headline: 'Лучшие курсы', copy: 'Выгодные условия\nи минимальные комиссии' },
  { Icon: IconEye, headline: 'Анонимность', copy: 'Не требуем регистрации\nи верификации' },
];

const PROCESS_LIST = [
  { step: 1, headline: 'Вы оставляете заявку', copy: 'Напишите нам в Telegram\nи укажите детали обмена' },
  { step: 2, headline: 'Мы подтверждаем', copy: 'Согласовываем курс\nи реквизиты' },
  { step: 3, headline: 'Вы отправляете средства', copy: 'Отправляете криптовалюту\nна указанный адрес' },
  { step: 4, headline: 'Получаете результат', copy: 'Получаете средства\nна свой кошелёк' },
];

const FEEDBACK_LIST = [
  { author: 'Александр', date: '12.03.2024', text: 'Быстрый обмен, курс порадовал. Всё прошло чётко и безопасно.' },
  { author: 'Михаил', date: '28.03.2024', text: 'Удобно, что не требуют верификацию. Обменял USDT за пару минут.' },
  { author: 'Дмитрий', date: '05.04.2024', text: 'Лучший курс из всех, что находил. Комиссия минимальная.' },
  { author: 'Игорь', date: '19.04.2024', text: 'Всё честно, быстро и анонимно. Рекомендую.' },
  { author: 'Сергей', date: '02.05.2024', text: 'Первый раз обменивал, помогли с деталями. Спасибо!' },
  { author: 'Андрей', date: '17.05.2024', text: 'Никаких проблем, обмен прошёл за несколько минут.' },
  { author: 'Владимир', date: '30.05.2024', text: 'Приятный сервис, отзывчивые операторы. Всё прозрачно.' },
  { author: 'Павел', date: '14.06.2024', text: 'Работают профессионально. Курс зафиксировали сразу.' },
  { author: 'Никита', date: '28.06.2024', text: 'Хорошая площадка, без скрытых комиссий. Обращусь ещё.' },
];

const CARD_WIDTH = 3;

/* ---------- утилиты ---------- */

function sliderReducer(state, action) {
  const last = FEEDBACK_LIST.length - CARD_WIDTH;
  switch (action.type) {
    case 'next':
      return { position: state.position >= last ? 0 : state.position + 1 };
    case 'prev':
      return { position: state.position <= 0 ? last : state.position - 1 };
    default:
      return state;
  }
}

/* ---------- компоненты ---------- */

function SharedButton({ children, variant = 'md' }) {
  const cls = variant === 'lg' ? 'btn-lg' : variant === 'sm' ? 'btn-sm' : 'btn-md';
  const iconCls = variant === 'sm' ? 'icon-sm' : 'icon-md';
  return (
    <a href={CHANNEL_LINK} target="_blank" rel="noopener noreferrer" className={`telegram-btn ${cls}`}>
      <IconSend className={iconCls} />
      {children}
    </a>
  );
}

function FeedbackCard({ entry }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-name">{entry.author}</div>
        <div className="review-date">{entry.date}</div>
      </div>
      <div className="review-text">{entry.text}</div>
      <div className="review-rating">
        {Array.from({ length: 5 }, (_, idx) => <IconStar key={idx} className="star-icon" />)}
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="header">
      <div className="header-inner">
        <img src="/logo1.png" alt="Exnode" className="header-logo" />
        <SharedButton variant="sm">Написать в Telegram</SharedButton>
      </div>
    </header>
  );
}

function HeroBlock() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge">Быстро • Безопасно • Анонимно</div>
          <h1 className="hero-title">
            Обмен криптовалют<br />
            на <span className="blue-text">лучших</span> условиях
          </h1>
          <p className="hero-subtitle">
            Exnode — это надежный и быстрый обмен криптовалют.
            Выгодные курсы, минимальные комиссии и безопасность
            ваших транзакций.
          </p>
          <div className="hero-cta">
            <SharedButton variant="lg">Написать в Telegram</SharedButton>
            <div className="protection-text">
              <IconShieldSimple className="shield-icon" />
              <span>Ваши средства под защитой</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-emblem-wrap">
            <img src="/mogo.png" alt="Exnode" className="hero-emblem" />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MeritsBlock() {
  return (
    <section className="advantages-section">
      <h2 className="section-title">Почему выбирают <span className="blue-text">Exnode?</span></h2>
      <div className="advantages-grid">
        {MERIT_LIST.map(({ Icon, headline, copy }) => (
          <div className="advantage-card" key={headline}>
            <Icon className="advantage-icon" />
            <h3>{headline}</h3>
            <p>{copy.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessBlock() {
  return (
    <section className="steps-section">
      <h2 className="section-title">Как это <span className="blue-text">работает?</span></h2>
      <div className="steps-grid">
        {PROCESS_LIST.map(({ step, headline, copy }) => (
          <div className="step" key={step}>
            <div className="step-num">{step}</div>
            <h3>{headline}</h3>
            <p>{copy.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeedbackSlider() {
  const [{ position }, dispatch] = useReducer(sliderReducer, { position: 0 });
  const visible = FEEDBACK_LIST.slice(position, position + CARD_WIDTH);

  return (
    <section className="reviews-section">
      <h2 className="section-title">Отзывы наших <span className="blue-text">клиентов</span></h2>
      <div className="reviews-slider">
        <button className="slider-arrow" onClick={() => dispatch({ type: 'prev' })}><IconPrev /></button>
        <div className="reviews-grid">
          {visible.map((entry) => <FeedbackCard key={entry.author} entry={entry} />)}
        </div>
        <button className="slider-arrow" onClick={() => dispatch({ type: 'next' })}><IconNext /></button>
      </div>
    </section>
  );
}

function InviteBanner() {
  return (
    <section className="final-cta">
      <div className="final-cta-left">
        <h2>Готовы к обмену?</h2>
        <p>Напишите нам в Telegram и получите<br />лучший курс прямо сейчас!</p>
        <SharedButton variant="lg">Написать в Telegram</SharedButton>
      </div>
      <div className="final-cta-icon">
        <IconSend className="big-send-icon" />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <img src="/logo1.png" alt="Exnode" className="footer-logo" />
          <p>Надёжный обмен криптовалют<br />на лучших условиях</p>
        </div>
        <div className="footer-right">
          <span className="copyright">© 2024 Exnode. Все права защищены.</span>
          <a href={CHANNEL_LINK} target="_blank" rel="noopener noreferrer" className="footer-tg">
            <IconSend className="footer-send-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- приложение ---------- */

export default function ExnodeLanding() {
  return (
    <div className="page">
      <div className="bg-aurora" />
      <div className="bg-stars" />

      <TopBar />
      <HeroBlock />
      <div className="divider" />
      <MeritsBlock />
      <ProcessBlock />
      <FeedbackSlider />
      <InviteBanner />
      <SiteFooter />
    </div>
  );
}