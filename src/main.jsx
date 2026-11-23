import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QUESTIONS, CATEGORIES, SOURCES } from './questions';
import zones from './molecule-zones.json';
import './styles.css';
import './dark.css';

const shuffle = (items) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const STORAGE_KEY = 'moxifloxacin-detective-v1';
const THEME_KEY = 'moxifloxacin-theme-v1';
function preferredTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
const DEFAULT_STATE = () => ({ order: shuffle(QUESTIONS.map(q => q.id)), answers: {}, score: 0, streak: 0, bestStreak: 0 });
function restoreState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !Array.isArray(stored.order) || typeof stored.answers !== 'object' || !stored.answers) return DEFAULT_STATE();
    const all = QUESTIONS.map(q => q.id);
    const known = new Set(all);
    const order = [...new Set(stored.order.filter(id => known.has(id)))];
    all.forEach(id => { if (!order.includes(id)) order.push(id); });
    const answers = Object.fromEntries(Object.entries(stored.answers).filter(([id, value]) => known.has(id) && typeof value === 'boolean'));
    return { order, answers, score: Number(stored.score) || 0, streak: Number(stored.streak) || 0, bestStreak: Number(stored.bestStreak) || 0 };
  } catch { return DEFAULT_STATE(); }
}
const categoryOf = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
const icons = { molecule: '⬡', choice: '✳', matching: '⧉' };

// Credits transcribed from the supplied Moxifloxacin brochure.
const PROJECT_STUDENTS = [
  'Ahmed Samir', 'Ahmed Mowafy', 'Hamed Osama', 'Habiba Mahmoud',
  'Rahiq Mohamed', 'Razan Mohamed', 'Rana Ebrahim',
  'Rohayem Mohsen', 'Renad Ahmed', 'Ziad Ahmed'
];
const PROJECT_SUPERVISORS = [
  'Prof. Magdy Geinenah',
  'Assoc. Prof. Sherin M. Efeky',
  'Assoc. Prof. Wafaa Ewis',
  'Ass. Lec. Samira Nashaat',
  'Ass. Lec. Aya Ebrahim Sully',
  'Dem. Noura M. Alhamaki',
  'Dem. Nada Lotft'
];

function Credits() {
  return <section className="credits-section" id="credits" aria-labelledby="credits-title">
    <div className="container">
      <div className="credits-heading">
        <div>
          <div className="credits-kicker"><span className="credits-spark">✦</span> THE PEOPLE BEHIND THE PROJECT <span className="credits-kicker-line"/></div>
          <h2 id="credits-title">Made by <em>curious minds.</em></h2>
          <p>الناس اللى كانت وراء فكرة المشروع، والمحتوى العلمى، والتجربة التعليمية.</p>
        </div>
        <div className="credits-university"><span className="credits-uni-mark">✳</span><div><strong>MANSOURA UNIVERSITY</strong><small>FACULTY OF PHARMACY</small></div></div>
      </div>
      <div className="credits-columns">
        <article className="credits-panel credits-panel-students">
          <div className="credits-panel-head">
            <div className="credits-icon" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="11" r="4"/><path d="M5 29v-4a9 9 0 0 1 18 0v4M27 13a3.5 3.5 0 0 0-1-6.8M26 20a7 7 0 0 1 5 7v2"/></svg></div>
            <div className="credits-panel-heading"><span>PROJECT CONTRIBUTORS</span><h3>Prepared by</h3></div>
            <span className="credits-count">10 STUDENTS</span>
          </div>
          <ol className="credits-people credits-student-list">{PROJECT_STUDENTS.map((name, i) => <li key={name}><span className="credits-number">{String(i+1).padStart(2,'0')}</span><span>{name}</span></li>)}</ol>
        </article>
        <article className="credits-panel credits-panel-supervisors">
          <div className="credits-panel-head">
            <div className="credits-icon" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 15-7 15 7-15 7L3 11Z"/><path d="M9 16v9c5 5 13 5 18 0v-9M33 11v13"/><circle cx="33" cy="27" r="2"/></svg></div>
            <div className="credits-panel-heading"><span>ACADEMIC GUIDANCE</span><h3>Supervised by</h3></div>
            <span className="credits-count">7 MENTORS</span>
          </div>
          <ol className="credits-people credits-supervisor-list">{PROJECT_SUPERVISORS.map((name, i) => <li key={name}><span className="credits-number">{String(i+1).padStart(2,'0')}</span><span>{name}</span></li>)}</ol>
        </article>
      </div>
      <div className="credits-signoff"><span>✦</span><p>GOOD SCIENCE. GREAT TEAMWORK.</p><span>✦</span></div>
    </div>
  </section>;
}


function Brand({ small = false }) {
  return <div className={'brand ' + (small ? 'brand-small' : '')}>
    <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 50 50"><path d="M25 3 44 14v22L25 47 6 36V14Z"/><circle cx="25" cy="25" r="7"/><path d="M25 8v10M25 32v10M8 25h10M32 25h10"/></svg></span>
    <span className="brand-text"><strong>DRUG<span>DETECTIVE</span></strong><small>MOXIFLOXACIN EDITION</small></span>
  </div>;
}
function ButtonIcon({ name, size = 22 }) {
  const paths = {
    arrow: <><path d="M5 12h14M12 5l7 7-7 7"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    moon: <><path d="M20.5 14.4A8.5 8.5 0 0 1 9.6 3.5 8.5 8.5 0 1 0 20.5 14.4Z"/></>,
    arrowdownleft: <><path d="M17 7 7 17M7 8v9h9"/></>,
    arrowupright: <><path d="M7 17 17 7M8 7h9v9"/></>,
    refresh: <><path d="M20 11a8 8 0 1 0-2.8 6.6"/><path d="M20 4v7h-7"/></>,
    close: <><path d="M6 6 18 18M18 6 6 18"/></>,
    book: <><path d="M3 6.5C6 5 9 5 12 7c3-2 6-2 9-.5v12c-3-1.5-6-1.5-9 .5-3-2-6-2-9-.5z"/><path d="M12 7v13"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    spark: <><path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
    arrowleft: <><path d="M19 12H5m7 7-7-7 7-7"/></>
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Spectrum({ type }) {
  const isIR = type.startsWith('ir');
  let plot = null;
  if (type === 'irOH') plot = <path d="M30 47 H90 C115 47 122 124 150 132 C180 143 188 63 214 48 H550"/>;
  if (type === 'irCO') plot = <path d="M30 47 H264 C281 47 291 164 305 164 C321 164 329 47 344 47 H550"/>;
  const peaks = type === 'nmrMethoxy' ? [ [55,40], [63,46], [228,151], [322,65], [329,55], [484,47] ] : type === 'nmrCyclo' ? [[469,118],[480,143],[490,121],[500,98],[514,62]] : [[64,79],[92,71],[394,91],[408,80],[494,72]];
  return <div className="spectrum-frame" dir="ltr">
    <div className="spectrum-topline"><span>{isIR ? 'INFRARED SPECTRUM' : '¹H NMR SPECTRUM'}</span><span className="schematic-label">SCHEMATIC / NOT EXPERIMENTAL</span></div>
    <svg className="spectral-svg" viewBox="0 0 580 205" role="img" aria-label={isIR ? 'Schematic infrared absorption band' : 'Schematic proton NMR peaks'}>
      <g className="grid-lines"><path d="M30 47 H550M30 92 H550M30 137 H550M30 173 H550"/></g>
      <path className="axis-line" d="M30 23V175H550"/>
      {isIR ? <g className="ir-trace">{plot}</g> : <g className="nmr-trace">{peaks.map(([x,h],i)=><line key={i} x1={x} y1={173} x2={x} y2={173-h}/>)}</g>}
      <g className="axis-labels">{(isIR ? ['4000','3000','2000','1000','600'] : ['10','8','6','4','2','0']).map((t,i,a)=><text key={t} x={30+520*i/(a.length-1)} y="194" textAnchor="middle">{t}</text>)}</g>
    </svg>
    <span className="axis-unit">{isIR ? 'Wavenumber (cm⁻¹)' : 'Chemical shift δ (ppm)'}</span>
  </div>;
}

function MoleculeChallenge({ answer, onAnswer, resolved, selected }) {
  const items = [
    { id:'carboxyl', name:'COOH group' },
    { id:'quinolone', name:'Quinolone fused core' },
    { id:'bicyclic', name:'Bicyclic amine' },
    { id:'cyclopropyl', name:'Cyclopropyl ring' },
    { id:'methoxy', name:'Methoxy (OCH₃)' }
  ];
  return <div className="molecule-frame">
    <div className="molecule-head"><span>INTERACTIVE MOLECULE MAP</span><span>Tap a numbered hotspot</span></div>
    <div className="molecule-canvas">
      <img src="/assets/moxifloxacin.svg" alt="Accurate chemical skeletal structure of moxifloxacin" />
      {items.map((item, i) => <button key={item.id} type="button" aria-label={item.name} title={item.name}
        className={'hotspot ' + (resolved && item.id === answer ? 'hotspot-correct ' : '') + (resolved && selected === item.id && selected !== answer ? 'hotspot-wrong ' : '')}
        style={{left: zones[item.id].x+'%', top: zones[item.id].y+'%'}} disabled={resolved}
        onClick={() => onAnswer(item.id)}>{i+1}</button>)}
    </div>
    <div className="molecule-caption"><span className="legend-dot"/> اضغط على رقم الجزء المطلوب فى الرسم</div>
  </div>;
}

function MatchingChallenge({ question, onComplete, resolved }) {
  const [left, setLeft] = useState(null);
  const [matched, setMatched] = useState([]);
  const [mistake, setMistake] = useState(false);
  const [mistakeText, setMistakeText] = useState('');
  const [rightOrder] = useState(() => shuffle(question.pairs.map((_,i)=>i)));
  const [leftOrder] = useState(() => shuffle(question.pairs.map((_,i)=>i)));
  const pickRight = (idx) => {
    if (left === null || resolved || matched.includes(idx)) return;
    if (left === idx) {
      const next = [...matched, idx]; setMatched(next); setLeft(null); setMistake(false); setMistakeText('');
      if (next.length === question.pairs.length) onComplete(true);
    } else { setMistake(true); setMistakeText(`مش مظبوط! ${question.pairs[left][0]} ⇐ ${question.pairs[left][1]}`); setTimeout(() => setMistake(false), 700); }
  };
  return <div className="match-area">
    <div className="match-instructions">اختار اسم الدواء، وبعده الوصف المناسب <span>{matched.length}/{question.pairs.length} matched</span></div>
    <div className="match-columns">
      <div className="match-column">{leftOrder.map(idx => <button className={'match-tile ' + (matched.includes(idx) ? 'matched' : '') + (left === idx ? ' picked' : '')} key={idx} disabled={resolved || matched.includes(idx)} onClick={() => {setLeft(idx); setMistake(false); setMistakeText('');}}>{question.pairs[idx][0]} {matched.includes(idx) && '✓'}</button>)}</div>
      <div className="match-column">{rightOrder.map(idx => <button className={'match-tile match-description ' + (matched.includes(idx) ? 'matched' : '') + (mistake && left !== null ? 'mistake' : '')} key={idx} disabled={resolved || matched.includes(idx)} onClick={() => pickRight(idx)}>{question.pairs[idx][1]} {matched.includes(idx) && '✓'}</button>)}</div>
    </div>
    <div className="match-help" role="status">{mistakeText || "كل Pair صح بيظهر باللون الأخضر. جرّب تانى لو الوصل مش صحيح."}</div>
  </div>;
}

function QuizDialog({ question, onClose, onResolve, onContinue, result }) {
  const [selected, setSelected] = useState(null);
  const category = categoryOf(question.category);
  const respond = (value) => {
    if (result) return;
    setSelected(value);
    const correct = question.type === 'molecule' ? value === question.answer : question.type === 'matching' ? true : value === question.answer;
    onResolve(correct);
  };
  useEffect(() => { const fn=(e) => { if(e.key==='Escape' && !result) onClose(); }; window.addEventListener('keydown',fn); return ()=>window.removeEventListener('keydown',fn); },[result,onClose]);
  const correctText = question.type === 'choice' ? question.options[question.answer] : question.type === 'molecule' ? {
    quinolone:'نواة Quinolone', bicyclic:'C7 bicyclic amine', cyclopropyl:'Cyclopropyl', carboxyl:'Carboxylic acid', methoxy:'Methoxy'
  }[question.answer] : 'اكتملت كل المطابقات';
  return <div className="dialog-overlay" role="presentation" onMouseDown={e => { if(e.target===e.currentTarget && !result) onClose(); }}>
    <section className="dialog-card" role="dialog" aria-modal="true" aria-labelledby="question-title" style={{'--topic':category.tint}}>
      <div className="dialog-top"><span className="dialog-category"><span className="tiny-pulse"/> CASE FILE <b>{category.short}</b> / {category.label}</span><button className="icon-button" aria-label="إغلاق السؤال" disabled={!!result} onClick={onClose}><ButtonIcon name="close" size={21}/></button></div>
      <div className="dialog-body">
        <div className="case-index"><span>CLASSIFIED EVIDENCE</span><span>{question.id.toUpperCase()}</span></div>
        <h2 id="question-title" className="dialog-title" dir="ltr">{question.title}</h2>
        <p className="dialog-question">{question.question}</p>
        {question.spectrum && <Spectrum type={question.spectrum}/>}
        {question.type === 'molecule' && <MoleculeChallenge answer={question.answer} selected={selected} resolved={!!result} onAnswer={respond}/>}
        {question.type === 'choice' && <div className="answers-grid" dir="auto">{question.options.map((option,i) => <button
          key={i} className={'answer-btn ' + (result && i === question.answer ? 'right-answer ' : '') + (result && selected === i && i !== question.answer ? 'wrong-answer ' : '')}
          disabled={!!result} onClick={()=>respond(i)}><span className="answer-index">{String.fromCharCode(65+i)}</span><span className="answer-copy">{option}</span>{result && i===question.answer && <ButtonIcon name="check" size={21}/>}</button>)}</div>}
        {question.type === 'matching' && <MatchingChallenge question={question} onComplete={respond} resolved={!!result}/>}
        {result && <div className={'answer-feedback ' + (result.correct ? 'feedback-success' : 'feedback-error')} role="status">
          <div className="feedback-heading"><span className="feedback-symbol">{result.correct ? '✓' : '×'}</span><strong>{result.correct ? 'إجابة صحيحة! Case solved.' : 'مش مظبوط — ودى الإجابة الصح'}</strong><span className="feedback-points">{result.correct ? `+${result.points} PTS` : '+0 PTS'}</span></div>
          {!result.correct && <p className="correct-line">الإجابة الصحيحة: <b>{correctText}</b></p>}
          <p>{question.explanation}</p>
        </div>}
      </div>
      <div className="dialog-actions">{result ? <button className="primary-action" onClick={onContinue}>التالي — Shuffle the cards <ButtonIcon name="arrowleft" size={19}/></button> : <span className="action-hint"><ButtonIcon name="info" size={17}/> اختار الإجابة عشان تفتح الدليل التالى</span>}</div>
    </section>
  </div>;
}

function ScoreBadge({ emoji, title, value }) { return <div className="score-badge"><span>{emoji}</span><div><small>{title}</small><strong>{value}</strong></div></div>; }

function App() {
  const [theme, setTheme] = useState(preferredTheme);
  const [game, setGame] = useState(restoreState);
  const [active, setActive] = useState(null);
  const [result, setResult] = useState(null);
  const [shuffleAnimation, setShuffleAnimation] = useState(false);
  const [aboutOpen,setAboutOpen] = useState(false);
  const completedCount = Object.keys(game.answers).length;
  const total = QUESTIONS.length;
  const percent = Math.round(completedCount / total * 100);
  const finished = completedCount === total;
  const current = useMemo(() => QUESTIONS.find(q=>q.id===active),[active]);
  useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(game));},[game]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;},[theme]);
  useEffect(()=>{
    let saved=null;
    try { saved=localStorage.getItem(THEME_KEY); } catch {}
    if(saved==='dark'||saved==='light'||!window.matchMedia)return;
    const media=window.matchMedia('(prefers-color-scheme: dark)');
    const onChange=(event)=>setTheme(event.matches?'dark':'light');
    media.addEventListener?.('change',onChange);
    return ()=>media.removeEventListener?.('change',onChange);
  },[]);
  const toggleTheme=()=>{
    const next=theme==='dark'?'light':'dark';
    try { localStorage.setItem(THEME_KEY,next); } catch {}
    setTheme(next);
  };
  useEffect(()=>{document.body.classList.toggle('modal-open',Boolean(active||aboutOpen));return ()=>document.body.classList.remove('modal-open');},[active,aboutOpen]);
  const startQuestion = (id) => { if (game.answers[id] === undefined) {setActive(id);setResult(null);} };
  const resolveQuestion = (correct) => {
    if (!current || result) return;
    const points = correct ? 10+(game.streak >= 2 ? 5:0) : 0;
    setResult({correct,points});
  };
  const continueQuestion = () => {
    if (!current || !result) return;
    const {correct,points} = result;
    setGame(prev => {
      if (prev.answers[active] !== undefined) return prev;
      const streak=correct?prev.streak+1:0;
      return {...prev, answers:{...prev.answers,[active]:correct}, score:prev.score+points, streak, bestStreak:Math.max(prev.bestStreak,streak), order:shuffle(prev.order)};
    });
    setActive(null);setResult(null);setShuffleAnimation(true);
    setTimeout(()=>setShuffleAnimation(false),850);
  };
  const resetGame = () => { if (!window.confirm('تبدأ تحقيق جديد؟ ده هيمسح النتيجة الحالية.')) return; setGame(DEFAULT_STATE());setActive(null);setResult(null); };
  const entries = useMemo(()=>Object.fromEntries(QUESTIONS.map(q=>[q.id,q])),[]);
  return <div className="app-shell">
    <header className="topbar"><div className="container topbar-inner">
      <Brand/>
      <nav className="topnav"><a href="#cases">The Case Files</a><button onClick={()=>setAboutOpen(true)}>About the Drug</button><a className="nav-reference" href="#references">References <span>↗</span></a></nav>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={toggleTheme} title={theme==='dark'?'Switch to light mode':'Switch to dark mode'} aria-label={theme==='dark'?'Switch to light mode':'Switch to dark mode'} aria-pressed={theme==='dark'}>
          <ButtonIcon name={theme==='dark'?'sun':'moon'} size={20}/>
        </button>
        <a href="#cases" className="top-play">Start exploring <span className="top-play-arrow"><ButtonIcon name="arrowdownleft" size={17}/></span></a>
      </div>
    </div></header>
    <main>
      <div className="hero-wrap"><div className="container">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-star">✦</span> THE INTERACTIVE CHEMISTRY EXPERIENCE <span className="eyebrow-line"/></div>
            <h1 dir="ltr">Every molecule<br/> <em>tells a story<span>.</span></em></h1>
            <p>هل تقدر تحل لغز <strong>Moxifloxacin</strong>؟ افتح الكروت، فك شفرات الأطياف، اكتشف الحلقات الكيميائية، واجمع أكبر عدد من النقط.</p>
            <div className="hero-actions"><a href="#cases" className="hero-cta">ابدأ التحقيق <span className="arrow-disc"><ButtonIcon name="arrowdownleft" size={19}/></span></a><button className="text-cta" onClick={()=>setAboutOpen(true)}><ButtonIcon name="book" size={18}/> اكتشف المركب</button></div>
            <div className="hero-caption"><span className="caption-dots"><b/><b/><b/></span><span>20 CASE FILES</span><i/> <span>5 SCIENCE LABS</span><i/> <span>100% INTERACTIVE</span></div>
          </div>
          <div className="hero-art">
            <div className="molecule-stamp stamp-top">C₂₁H₂₄FN₃O₄ <span>MOLECULAR FORMULA</span></div>
            <div className="hero-orbit"><div className="orbit-ring"/><div className="hero-image"><img src="/assets/moxifloxacin.svg" alt="Chemical structure of moxifloxacin"/></div><span className="orbit-spark spark-one">✦</span><span className="orbit-spark spark-two">✺</span></div>
            <div className="hero-molecule-title"><span>FIG. 01</span><strong>MOXIFLOXACIN</strong><small>Fluoroquinolone antibiotic</small></div>
            <div className="molecule-stamp stamp-bottom"><strong>401.4</strong> <span>g/mol · MW</span></div>
          </div>
        </section>
      </div></div>
      <div className="container"><section className="dashboard" aria-label="Game statistics">
        <div className="dashboard-label"><div className="live-dot"/><span>YOUR INVESTIGATION</span><strong>{finished ? 'CASE CLOSED' : 'IN PROGRESS'}</strong></div>
        <div className="metrics"><ScoreBadge emoji="✦" title="YOUR POINTS" value={game.score}/><ScoreBadge emoji="♨" title="CURRENT STREAK" value={game.streak}/><ScoreBadge emoji="◈" title="CASES SOLVED" value={`${completedCount}/${total}`}/></div>
        <div className="progress-area"><div className="progress-head"><span>CASE COMPLETION</span><strong>{percent}%</strong></div><div className="progress-track"><div className="progress-fill" style={{width:percent+'%'}}/></div></div>
      </section></div>
      <section className="container game-section" id="cases">
        <div className="section-top"><div><div className="section-kicker"><span>01 / THE MISSION</span><div className="dash"/></div><h2>The <em>Evidence Board</em><span className="tiny-star"> ✳</span></h2><p>وراء كل كارت دليل جديد. اختار أى كارت عشوائى، جاوب، وشوف ترتيب الكروت بيتغير قدامك.</p></div>
          <div className="section-tools"><span className="shuffle-label"><ButtonIcon name="refresh" size={17}/> AUTO-SHUFFLE IS ON</span><button onClick={resetGame} className="restart"><ButtonIcon name="refresh" size={18}/> Restart</button></div></div>
        <div className="topic-strip">{CATEGORIES.map(c => {const solved=QUESTIONS.filter(q=>q.category===c.id && game.answers[q.id]!==undefined).length;const count=QUESTIONS.filter(q=>q.category===c.id).length;return <div key={c.id} className="topic"><span className="topic-icon" style={{'--cat':c.tint}}>{c.icon}</span><div><strong>{c.label}</strong><small>{solved}/{count} solved</small></div></div>})}</div>
        {finished ? <div className="final-panel"><div className="final-glow">✦</div><div className="final-trophy">🏆</div><div className="final-label">INVESTIGATION COMPLETE</div><h3 dir="ltr">Case closed. <em>Brilliant work!</em></h3><p>خلصت كل الملفات! نتيجتك النهائية:</p><strong className="final-score">{game.score} <small>PTS</small></strong><div className="final-stats"><span>{Object.values(game.answers).filter(Boolean).length} / {total} correct answers</span><span>Best streak: {game.bestStreak}</span></div><button className="hero-cta" onClick={resetGame}>العب من جديد ↻</button></div> : null}
        <div className={'card-grid ' + (shuffleAnimation ? 'grid-shuffling':'')}>
          {game.order.map((id,index) => {
            const q=entries[id]; if(!q) return null;const c=categoryOf(q.category);const isDone=game.answers[id]!==undefined;const won=game.answers[id]===true;
            return <button key={id} type="button" className={'case-card ' + (isDone ? 'case-done ' : '')} style={{'--card-color':c.tint,'--index':index}} onClick={()=>startQuestion(id)} disabled={isDone} aria-label={isDone ? `Case completed: ${q.title}`:`افتح ملف: ${c.ar}`}>
              <span className="card-top"><span>CASE {String(index+1).padStart(2,'0')}</span><span className="card-dots">•••</span></span>
              <span className="card-center"><span className="card-pattern">{c.icon}</span><span className="card-symbol">{isDone?(won?'✓':'−'):'?'}</span><span className="card-ring"/></span>
              <span className="card-bottom"><span className="card-category">{c.label}</span><span className="card-action">{isDone ? (won?'SOLVED':'REVIEWED') : 'TAP TO REVEAL'} <span className="card-arrow" aria-hidden="true">{isDone?<ButtonIcon name="check" size={14}/>:<ButtonIcon name="arrowupright" size={14}/>}</span></span></span>
            </button>;
          })}
        </div>
        <div className="below-grid"><div><span className="hint-icon">✦</span><span>كل إجابة صحيحة +10 نقط، وBonus +5 لما توصل لـ 3 إجابات صح متتالية.</span></div><span>STAY CURIOUS. KEEP EXPLORING.</span></div>
      </section>
      <section className="container knowledge-banner"><div className="knowledge-copy"><span>THE SCIENCE BEHIND THE GAME</span><h2>Not just a quiz.<br/><em>A chemistry adventure.</em></h2><p>من قراءة الطيف للتركيب الكيميائى للاستخدام الآمن: اللعبة بتربط المعلومات ببعض وتخليك تفكر كمحقق حقيقى.</p><button onClick={()=>setAboutOpen(true)}>Explore the science <ButtonIcon name="arrow" size={18}/></button></div><div className="knowledge-photo"><img src="/assets/brochure.jpg" alt="Original Moxifloxacin educational brochure"/><span>ORIGINAL STUDY BROCHURE ↗</span></div></section>
      <Credits/>
    </main>
    <footer id="references"><div className="container footer-inner"><Brand small/><div className="footer-info"><span>Made for learning. Designed to explore.</span><small>For educational use only — not medical advice. Schematic spectra are illustrative, not actual measured datasets.</small><div className="source-links">{SOURCES.map(s=><a key={s.url} href={s.url} rel="noopener noreferrer" target="_blank">{s.label} ↗</a>)}</div></div><a href="#cases" className="back-top">BACK TO TOP ↑</a></div></footer>
    {current && <QuizDialog key={current.id} question={current} result={result} onResolve={resolveQuestion} onContinue={continueQuestion} onClose={()=>{setActive(null);setResult(null);}}/>}
    {aboutOpen && <div className="dialog-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setAboutOpen(false);}}><section className="about-dialog" role="dialog" aria-modal="true" aria-label="About moxifloxacin"><button className="icon-button about-close" onClick={()=>setAboutOpen(false)} aria-label="إغلاق"><ButtonIcon name="close"/></button><span className="section-kicker">THE MOLECULE DOSSIER</span><h2 dir="ltr">Meet Moxifloxacin<span>.</span></h2><div className="about-structure"><img src="/assets/moxifloxacin.svg" alt="Moxifloxacin chemical structure"/></div><p><b>Moxifloxacin</b> هو مضاد حيوى من مجموعة Fluoroquinolones. الصيغة الجزيئية للـ free base هى C₂₁H₂₄FN₃O₄ والوزن الجزيئى حوالى 401.4 g/mol.</p><p>من أهم علاماته: 8-methoxy، وN1 cyclopropyl، وC7 bicyclic amine. وده غير حلقة piperazine العادية اللى بتظهر فى أدوية تانية زى Ciprofloxacin.</p><p className="about-note">المحتوى تعليمى ومش بديل لاستشارة الطبيب أو النشرة الدوائية. تم تصحيح وصف الحلقة الجانبية مقارنة ببعض الرسومات التعليمية المبسطة.</p><div className="about-sources">{SOURCES.map(s=><a href={s.url} target="_blank" rel="noopener noreferrer" key={s.url}>{s.label} ↗</a>)}</div></section></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
