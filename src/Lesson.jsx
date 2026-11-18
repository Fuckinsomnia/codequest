import React, {useEffect, useRef, useState} from 'react';
import {ArrowLeft, ArrowRight, Play, Send, RotateCcw, Square, List, X, Check, Bookmark, Lightbulb, ChevronDown, Copy, FileCode, Terminal, Save, Trophy} from 'lucide-react';
import {Logo, ProgressBar, Editor, route, PixelCharacter} from './components';
import {runCode, makePreview, normalizedOutput} from './engine';
import {completeLesson, downloadFile, createId} from './store';

export default function Lesson({course,lesson,state,setState,notify}) {
  const index = course.lessons.findIndex(l=>l.id===lesson.id);
  const [code,setCode] = useState(state.drafts[lesson.id] ?? lesson.starter ?? '');
  const [stdin,setStdin] = useState(lesson.stdin ?? '');
  const [result,setResult] = useState(null);
  const [running,setRunning] = useState(false);
  const [status,setStatus] = useState('');
  const [preview,setPreview] = useState('');
  const [selection,setSelection] = useState(null);
  const [showSuccess,setShowSuccess] = useState(false);
  const [showLessons,setShowLessons] = useState(false);
  const [hintCount,setHintCount] = useState(0);
  const [showSolution,setShowSolution] = useState(false);
  const [tab,setTab] = useState('lesson');
  const [mobileTab,setMobileTab] = useState('learn');
  const [webCheck,setWebCheck] = useState(null);
  const execution = useRef(null);
  const iframe = useRef(null);
  const activePreview = useRef(null);
  const webTimer = useRef(null);
  const saved = state.completed.includes(lesson.id);
  const isWeb = ['html','css'].includes(lesson.language);
  const isQuiz = lesson.type === 'quiz';
  const progress = course.lessons.filter(l=>state.completed.includes(l.id)).length/course.lessons.length*100;
  const extension = {python:'py',javascript:'js',html:'html',css:'html',sql:'sql'}[lesson.language] || 'txt';
  useEffect(()=> {
    setState(s=>({...s,lastLesson:`${course.id}/${lesson.id}`}));
    return ()=>{execution.current?.cancel();clearTimeout(webTimer.current);};
  },[lesson.id]);
  const award = () => {setState(s=>completeLesson(s,lesson.id));setShowSuccess(true);};
  useEffect(()=> {
    const onMessage = e => {
      if(e.source!==iframe.current?.contentWindow || e.data?.kind!=='preview-result' || e.data.token!==activePreview.current?.token) return;
      clearTimeout(webTimer.current);
      const failures = e.data.failures;
      if(!Array.isArray(failures)) return;
      const shouldAward = activePreview.current.submit;
      activePreview.current = null;
      setRunning(false);setWebCheck(failures);
      setResult({output:failures.length?failures.join('\n'):'Semua pemeriksaan tampilan berhasil.',passed:!failures.length,submitted:shouldAward});
      if(shouldAward && !failures.length) award();
    };
    window.addEventListener('message',onMessage);
    return ()=>window.removeEventListener('message',onMessage);
  },[lesson.id]);
  function changeCode(value) {setCode(value);setResult(null);setWebCheck(null);setState(s=>({...s,drafts:{...s.drafts,[lesson.id]:value}}));}
  async function execute(submit=false) {
    if(running)return;
    setResult(null);setMobileTab('code');
    if(isQuiz) {
      if(selection===null) {notify('Pilih satu jawaban terlebih dahulu.');return;}
      const passed=selection===lesson.answer;
      setResult({passed,submitted:true,output:passed?lesson.explanation:'Belum tepat. Baca konsep dan petunjuk, lalu coba lagi.'});
      if(passed)award();return;
    }
    setRunning(true);
    if(isWeb) {
      const token=createId();
      activePreview.current={token,submit};
      setStatus('Merender preview terisolasi…');
      setPreview(makePreview(code,lesson.assertions || [],token));
      webTimer.current=setTimeout(()=>{activePreview.current=null;setRunning(false);setResult({error:'Preview tidak selesai dalam 5 detik. Periksa kode HTML.'});},5000);
      return;
    }
    execution.current=runCode(lesson.language,code,stdin,setStatus);
    const response=await execution.current.promise;
    execution.current=null;
    setRunning(false);
    const passed=!response.error && normalizedOutput(response.output)===normalizedOutput(lesson.expected);
    setResult({...response,passed,submitted:submit});
    if(submit && passed)award();
  }
  function stop() {execution.current?.cancel();clearTimeout(webTimer.current);activePreview.current=null;setRunning(false);setStatus('');}
  function reset() {if(window.confirm('Kembalikan kode latihan ini ke kode awal?')){changeCode(lesson.starter || '');setPreview('');setStdin(lesson.stdin || '');}}
  function move(offset){const next=course.lessons[index+offset];if(next)route(`/lesson/${course.id}/${next.id}`);}
  useEffect(()=>{
    const shortcut=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();execute(e.shiftKey);}};
    window.addEventListener('keydown',shortcut);return()=>window.removeEventListener('keydown',shortcut);
  });
  return <div className="lesson-shell">
    <header className="lesson-header"><Logo/><a className="lesson-breadcrumb" href={`#/course/${course.id}`}>{course.title}<span>/</span><strong>{course.chapters[lesson.chapter]?.title}</strong></a><div className="lesson-progress"><ProgressBar value={progress}/><span>{Math.round(progress)}%</span></div><span className="local-indicator"><span/>Tersimpan lokal</span><button className="icon-btn" title="Simpan pelajaran" aria-label="Simpan pelajaran" aria-pressed={state.bookmarks.includes(lesson.id)} onClick={()=>setState(s=>({...s,bookmarks:s.bookmarks.includes(lesson.id)?s.bookmarks.filter(x=>x!==lesson.id):[...s.bookmarks,lesson.id]}))}><Bookmark size={19} fill={state.bookmarks.includes(lesson.id)?'currentColor':'none'}/></button><a className="button yellow small" href="#/progress">{state.completed.length*15} XP</a></header>
    <div className="mobile-lesson-tabs">{[['learn','Learn'],['code',isQuiz?'Quiz':'Code']].map(([id,title])=><button key={id} className={mobileTab===id?'active':''} onClick={()=>setMobileTab(id)}>{title}</button>)}</div>
    <main className={`lesson-workspace mobile-${mobileTab}`}>
      <section className="lesson-instructions"><div className="panel-toolbar"><button className={tab==='lesson'?'selected':''} onClick={()=>setTab('lesson')}>Exercise</button><button className={tab==='notes'?'selected':''} onClick={()=>setTab('notes')}>Catatan pribadi</button><span>{isQuiz?'KONSEP':'PRAKTIK'} · {lesson.xp} XP</span></div>
        <div className="lesson-copy">{tab==='notes'?<><h2>Catatan petualangan</h2><p>Catatan hanya disimpan di browser ini. Ekspor progresmu untuk membuat cadangan.</p><textarea className="notes" aria-label="Catatan pribadi" placeholder="Hal baru yang kupelajari hari ini…" value={state.notes[lesson.id] || ''} onChange={e=>setState(s=>({...s,notes:{...s.notes,[lesson.id]:e.target.value}}))}/></>:<>
          <p className="eyebrow muted">BAB {lesson.chapter+1} · {course.chapters[lesson.chapter]?.title}</p><h1>{String(index+1).padStart(2,'0')}. {lesson.title}</h1><h2><span className="accent">#</span> {course.title}</h2>
          {lesson.intro.map((p,i)=><p key={i}>{p}</p>)}
          {lesson.example && <div className="code-example"><div><span>CONTOH</span><button className="icon-btn" aria-label="Salin contoh" onClick={async()=>{try{await navigator.clipboard.writeText(lesson.example);notify('Contoh disalin.');}catch{notify('Pilih teks contoh untuk menyalinnya.');}}}><Copy size={14}/></button></div><pre><code>{lesson.example}</code></pre></div>}
          <h3 className="instruction-title">Instructions</h3><ol className="instruction-list">{lesson.task.map((t,i)=><li key={i}>{t}</li>)}</ol>
          {!isQuiz && !isWeb && <details className="expected"><summary>Output yang diharapkan <ChevronDown size={14}/></summary><pre>{lesson.expected}</pre></details>}
          {lesson.language==='sql'&&<details className="help-item"><summary>Dataset latihan</summary><p>Tabel learners: id, name, xp, track. Lima data awal: Ayu / 120 / Python; Bima / 80 / HTML; Citra / 200 / Python; Danu / 50 / SQL; Eka / 150 / HTML. Setiap Run menggunakan database baru.</p></details>}
          <h3 className="help-heading">Butuh petunjuk?</h3><button className="help-button" onClick={()=>setHintCount(n=>Math.min(n+1,lesson.hints.length))}><Lightbulb size={18}/> {hintCount>=lesson.hints.length?'Semua petunjuk terbuka':'Buka petunjuk'}<span>{hintCount}/{lesson.hints.length}</span></button>
          {lesson.hints.slice(0,hintCount).map((hint,i)=><div className="hint" key={i}><strong>Petunjuk {i+1}</strong><p>{hint}</p></div>)}
          <button className="help-button" onClick={()=>setShowSolution(v=>!v)}><FileCode size={18}/> {showSolution?'Tutup pembahasan':'Lihat pembahasan'}<ChevronDown size={16}/></button>
          {showSolution && <div className="solution"><p>Coba sendiri terlebih dahulu. Membaca solusi tidak otomatis menyelesaikan latihan.</p>{isQuiz?<p>{lesson.explanation}</p>:<pre>{lesson.solution}</pre>}</div>}
          <div className="privacy-note"><Save size={16}/>Progres, kode, dan catatan tersimpan di perangkatmu. Tanpa akun.</div>
        </>}</div>
      </section>
      <section className="coding-side"><details className="mobile-task-summary"><summary>Instruksi latihan<ChevronDown size={16}/></summary><ol>{lesson.task.map((task,i)=><li key={i}>{task}</li>)}</ol></details>{isQuiz?<div className="quiz-panel"><div className="panel-toolbar"><span>Knowledge check</span><span>{lesson.options.length} PILIHAN</span></div><div className="quiz-content"><PixelCharacter size={84}/><p className="eyebrow accent">UJI PEMAHAMANMU</p><h2>{lesson.task.join(' ')}</h2><div className="quiz-options">{lesson.options.map((o,i)=><button key={i} className={`quiz-option ${selection===i?'chosen':''}`} aria-pressed={selection===i} onClick={()=>{setSelection(i);setResult(null);}}><span>{String.fromCharCode(65+i)}</span>{o}{selection===i&&<Check size={18}/>}</button>)}</div><button className="button blue" onClick={()=>execute(true)}><Send size={17}/>Periksa jawaban</button>{result&&<div className={`result-box ${result.passed?'success':'failure'}`} role="status">{result.output}</div>}<p className="quiz-note">Latihan konsep. Compiler {course.title} tidak dijalankan di sini.</p></div></div>:<>
        <div className="editor-pane"><div className="panel-toolbar"><span className="file-tab"><FileCode size={17}/>script.{extension}</span><span>{lesson.language.toUpperCase()}</span></div><Editor value={code} onChange={changeCode} language={lesson.language} height="100%"/><div className="editor-actions"><div><button className="icon-btn" title="Reset kode" aria-label="Reset kode" onClick={reset}><RotateCcw size={17}/></button><button className="icon-btn" title="Unduh kode" aria-label="Unduh kode" onClick={()=>downloadFile(`${lesson.id}.${extension}`,code)}><Save size={17}/></button><span className="keyboard-hint">Ctrl + Enter</span></div><div>{running?<button className="button small" onClick={stop}><Square size={14}/>Stop</button>:<button className="button small" onClick={()=>execute(false)}><Play size={15} fill="currentColor"/>Run</button>}<button className="button blue small" disabled={running} onClick={()=>execute(true)}>Submit answer</button></div></div></div>
        <div className="terminal-pane"><div className="panel-toolbar"><span><Terminal size={16}/>{isWeb?'Live preview':'Terminal'}</span><span>{running?status:result?.error?'ERROR':result?'SELESAI':'SIAP'}</span></div>
          {isWeb?<><iframe ref={iframe} title="Preview hasil kode" sandbox="allow-scripts" srcDoc={preview || '<body style="font-family:system-ui;color:#64748b;padding:30px">Tekan Run untuk melihat halamanmu.</body>'}/>{result&&<div className={`web-feedback ${result.passed?'success':'failure'}`} role="status">{result.error || result.output}</div>}</>:<div className="terminal-output" aria-live="polite">{running?<div className="runtime-loading"><span className="spinner"/>{status}<small>Pemuatan Python pertama bisa membutuhkan beberapa detik.</small></div>:result?<><pre className={result.error?'error-text':''}>{result.error || result.output || '(Tidak ada output)'}</pre>{result.submitted&&!result.error&&<div className={`result-box ${result.passed?'success':'failure'}`}>{result.passed?'Jawaban benar. Kerja bagus!':'Output belum sesuai. Bandingkan dengan output yang diharapkan dan coba lagi.'}</div>}</>:<div className="terminal-empty"><Terminal size={33}/><p>Klik <strong>Run</strong> untuk melihat hasil kodemu.</p><small>Kode berjalan lokal di browser. Maksimal 5 detik.</small></div>}</div>}
          {lesson.language==='python'&&<label className="stdin-input"><span>Input (satu nilai per baris)</span><textarea aria-label="Input program" rows={1} value={stdin} onChange={e=>{setStdin(e.target.value);setResult(null);}} placeholder="Jika program memakai input()"/></label>}
        </div>
      </> }</section>
    </main>
    <footer className="lesson-footer"><button className="button small icon-square" onClick={()=>setShowLessons(true)} aria-label="Daftar pelajaran"><List size={20}/></button><div className="lesson-position"><strong>{lesson.title}</strong><span>Exercise {index+1} / {course.lessons.length} <b>{saved?'SELESAI':`${lesson.xp} XP`}</b></span></div><div className="footer-nav"><button className="button small" disabled={index===0} onClick={()=>move(-1)}><ArrowLeft size={16}/>Back</button>{index===course.lessons.length-1?<a className="button blue small" href={`#/course/${course.id}`}>Kembali ke kursus</a>:<button className="button small" disabled={!saved} onClick={()=>move(1)}>Next<ArrowRight size={16}/></button>}</div></footer>
    {showSuccess&&<div className="modal-backdrop"><div className="modal success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title"><button className="close-modal icon-btn" aria-label="Tutup" onClick={()=>setShowSuccess(false)}><X/></button><div className="trophy-orb"><Trophy size={46}/></div><p className="eyebrow accent">QUEST COMPLETE</p><h2 id="success-title">Kerja bagus!</h2><p>{lesson.title} selesai. Satu langkah lebih dekat ke tujuanmu.</p><div className="xp-reward">+{lesson.xp} XP <span>tersimpan otomatis</span></div><button className="button blue" autoFocus onClick={()=>{setShowSuccess(false);if(index<course.lessons.length-1)move(1);else route(`/course/${course.id}`);}}>Lanjutkan petualangan<ArrowRight size={17}/></button><small>Latihan ulang tidak menambah XP dua kali.</small></div></div>}
    {showLessons&&<div className="modal-backdrop" onClick={()=>setShowLessons(false)}><aside className="lesson-drawer" role="dialog" aria-modal="true" aria-label="Daftar pelajaran" onClick={e=>e.stopPropagation()}><div className="drawer-heading"><h3>{course.title}</h3><button className="icon-btn" aria-label="Tutup daftar pelajaran" onClick={()=>setShowLessons(false)}><X/></button></div>{course.chapters.map((chapter,i)=><div key={i}><p className="eyebrow accent">{i+1}. {chapter.title}</p>{course.lessons.filter(l=>l.chapter===i).map(l=><a className={l.id===lesson.id?'current':''} href={`#/lesson/${course.id}/${l.id}`} key={l.id} onClick={()=>setShowLessons(false)}>{state.completed.includes(l.id)?<Check size={16}/>:<span className="small-circle"/>}{l.title}</a>)}</div>)}</aside></div>}
  </div>;
}
