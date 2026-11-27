import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Code2, Download, ExternalLink, Play, RotateCcw, Search, Terminal, X } from 'lucide-react';
import { Editor, Empty } from './components';
import { runCode } from './engine';
import { completeLesson, downloadFile } from './store';
import library from './data/exercism-library.json';

const trackLabels = { python: 'Python', javascript: 'JavaScript', sqlite: 'SQLite' };
const extensions = { python: 'py', javascript: 'js', sqlite: 'sql' };
const progressId = (language, slug) => `exercism-${language}-${slug}`;

function InlineText({ text }) {
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\((https?:\/\/[^)]+)\))/g;
  const parts = String(text).split(pattern);
  return parts.map((part, index) => {
    if (typeof part !== 'string') return null;
    if (part.startsWith('`') && part.endsWith('`')) return <code className="exercism-inline-code" key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('_') && part.endsWith('_')) return <em key={index}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) return <a href={link[2]} target="_blank" rel="noreferrer" key={index}>{link[1]}</a>;
    return part;
  });
}

function MarkdownBlocks({ blocks }) {
  if (!blocks?.length) return null;
  return <div className="exercism-instructions">{blocks.map((block, index) => {
    if (block.type === 'heading') {
      const Heading = `h${Math.min(block.level + 1, 4)}`;
      return <Heading key={index}><InlineText text={block.text} /></Heading>;
    }
    if (block.type === 'list') {
      const List = block.ordered ? 'ol' : 'ul';
      return <List key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item} /></li>)}</List>;
    }
    if (block.type === 'code') return <pre key={index}><code>{block.text.trimEnd()}</code></pre>;
    if (block.type === 'quote') return <blockquote key={index}><InlineText text={block.text} /></blockquote>;
    return <p key={index}><InlineText text={block.text} /></p>;
  })}</div>;
}

function TrackBadges({ exercise }) {
  const tracks = Object.keys(exercise.tracks);
  if (!tracks.length) return <span className="exercism-track-badge is-general">Materi umum</span>;
  return tracks.map(track => <span className="exercism-track-badge" key={track}>{trackLabels[track]}</span>);
}

function ExerciseDetail({ exercise, state, setState, notify }) {
  const available = Object.keys(exercise.tracks);
  const requested = new URLSearchParams(window.location.hash.includes('?') ? window.location.hash.slice(window.location.hash.indexOf('?') + 1) : '').get('lang');
  const [language, setLanguage] = useState(available.includes(requested) ? requested : available[0] || '');
  const track = exercise.tracks[language];
  const id = language ? progressId(language, exercise.slug) : '';
  const [code, setCode] = useState(track ? state.drafts[id] ?? track.starter : '');
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const execution = useRef(null);
  const completed = id ? state.completed.includes(id) : false;

  useEffect(() => () => execution.current?.cancel(), []);

  function chooseLanguage(next) {
    if (next === language) return;
    execution.current?.cancel();
    const nextId = progressId(next, exercise.slug);
    setLanguage(next);
    setCode(state.drafts[nextId] ?? exercise.tracks[next].starter);
    setResult(null);
    setRunning(false);
    setStatus('');
    setConfirmed(false);
  }

  function changeCode(value) {
    setCode(value);
    setResult(null);
    setConfirmed(false);
    setState(current => ({ ...current, drafts: { ...current.drafts, [id]: value } }));
  }

  async function run() {
    if (!track || running) return;
    execution.current?.cancel();
    setResult(null);
    setRunning(true);
    setStatus('Menyiapkan runtime lokal…');
    const javascriptCode = code.replace(/^export\s+(default\s+)?/gm, '');
    const runnable = language === 'javascript' && track.prelude ? `${track.prelude}\n${javascriptCode.replace(/^import\s+.*?;\s*$/gm, '')}` : language === 'javascript' ? javascriptCode : code;
    execution.current = runCode(language === 'sqlite' ? 'sql' : language, runnable, '', setStatus, track.setup);
    const response = await execution.current.promise;
    execution.current = null;
    setRunning(false);
    setResult(response);
  }

  function reset() {
    if (!window.confirm('Kembalikan kode latihan ini ke kode awal?')) return;
    execution.current?.cancel();
    setCode(track.starter);
    setResult(null);
    setRunning(false);
    setConfirmed(false);
    setState(current => ({ ...current, drafts: { ...current.drafts, [id]: track.starter } }));
  }

  function finish() {
    if (!confirmed) {
      notify('Centang pemeriksaan mandiri terlebih dahulu.');
      return;
    }
    setState(current => completeLesson(current, id));
    notify('Progres latihan tersimpan di perangkat ini.');
  }

  return <main className="practice-page exercism-page">
    <header className="practice-intro">
      <div className="practice-inner exercism-inner">
        <a className="practice-back" href="#/practice/exercism"><ArrowLeft size={18} />Semua materi Exercism</a>
        <p className="practice-eyebrow">EXERCISM · LATIHAN MANDIRI</p>
        <h1>{exercise.title}</h1>
        <p>{exercise.blurb}</p>
        <div className="practice-overview">
          <span><BookOpen size={16} />{exercise.difficulty ? `Tingkat ${exercise.difficulty}/10` : 'Tingkat umum'}</span>
          <span><Code2 size={16} />{available.length ? `${available.length} track lokal` : 'Materi umum'}</span>
          {completed && <span><CheckCircle2 size={16} />Selesai di {trackLabels[language]}</span>}
        </div>
      </div>
    </header>

    <section className="practice-inner exercism-inner exercism-content">
      <div className="exercism-source-note">
        <BookOpen size={19} />
        <p><strong>Adaptasi latihan Exercism berlisensi MIT.</strong> Instruksi sumber berbahasa Inggris dan dapat dibaca tanpa login. CodeQuest menyediakan editor lokal; suite tes dan mentoring tetap tersedia di sumber asli.</p>
        <a href={exercise.url} target="_blank" rel="noreferrer">Buka sumber<ExternalLink size={15} /></a>
      </div>

      {available.length > 0 && <div className="exercism-track-tabs" role="group" aria-label="Pilih bahasa latihan">
        {available.map(trackName => <button type="button" key={trackName} aria-pressed={language === trackName} onClick={() => chooseLanguage(trackName)}>
          {trackLabels[trackName]}
          {state.completed.includes(progressId(trackName, exercise.slug)) && <CheckCircle2 size={15} />}
        </button>)}
      </div>}

      <div className="exercism-detail-grid">
        <article className="exercism-brief">
          <p className="practice-eyebrow">BRIEF LATIHAN</p>
          <MarkdownBlocks blocks={track?.introduction || exercise.introduction} />
          <MarkdownBlocks blocks={track?.instructions || exercise.instructions} />
          {exercise.source && <div className="exercism-attribution"><strong>Sumber masalah</strong><span>{exercise.source}</span></div>}
        </article>

        <aside className="exercism-workspace">
          {track ? <>
            <div className="panel-toolbar"><span className="file-tab"><Code2 size={17} />latihan.{extensions[language]}</span><span>{trackLabels[language].toUpperCase()}</span></div>
            <Editor value={code} onChange={changeCode} language={language === 'sqlite' ? 'sql' : language} height="430px" />
            <div className="exercism-editor-actions">
              <div>
                <button className="icon-btn" type="button" title="Unduh kode" aria-label="Unduh kode latihan" onClick={() => downloadFile(`${exercise.slug}.${extensions[language]}`, code)}><Download size={17} /></button>
                <button className="icon-btn" type="button" title="Reset kode" aria-label="Reset kode latihan" onClick={reset}><RotateCcw size={17} /></button>
              </div>
              <button className="button blue small" type="button" disabled={running} onClick={run}><Play size={15} />{running ? 'Menjalankan…' : 'Run'}</button>
            </div>
            <div className="exercism-terminal">
              <div className="panel-toolbar"><span><Terminal size={16} />Terminal lokal</span><span>{running ? 'BERJALAN' : result?.error ? 'ERROR' : 'SIAP'}</span></div>
              <div className="exercism-output" aria-live="polite">
                {running ? <><span className="spinner" />{status}</> : result ? <pre className={result.error ? 'error-text' : ''}>{result.error || result.output || '(Tidak ada output)'}</pre> : <p>Jalankan kode untuk melihat output. Untuk Python/JavaScript, tambahkan <code>print()</code> atau <code>console.log()</code> bila perlu.</p>}
              </div>
            </div>
            {language === 'sqlite' && <p className="exercism-dataset-note">Database dan data latihan disiapkan otomatis setiap Run. Query dapat mengubah tabel yang tersedia.</p>}
            <div className="exercism-manual-check">
              <label><input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} />Saya sudah memeriksa hasil dengan instruksi dan tes sumber.</label>
              <button className="button yellow small" type="button" disabled={!confirmed || completed} onClick={finish}><CheckCircle2 size={16} />{completed ? 'Sudah selesai' : 'Tandai selesai'}</button>
            </div>
            <p className="exercism-test-note">Mode ini tidak menjalankan test suite Exercism secara otomatis. Gunakan tautan sumber untuk pemeriksaan lengkap.</p>
          </> : <div className="exercism-general">
            <Code2 size={34} />
            <h2>Materi umum lintas bahasa</h2>
            <p>Masalah ini belum memiliki track Python, JavaScript, atau SQLite di CodeQuest. Instruksinya tetap tersedia, dan implementasi dapat dikerjakan melalui Exercism.</p>
            <a className="button blue small" href={exercise.url} target="_blank" rel="noreferrer">Pilih bahasa di Exercism<ExternalLink size={16} /></a>
          </div>}
        </aside>
      </div>
    </section>
  </main>;
}

export default function ExercismLibrary({ state, setState, notify, slug }) {
  const requestedTrack = new URLSearchParams(window.location.hash.includes('?') ? window.location.hash.slice(window.location.hash.indexOf('?') + 1) : '').get('track');
  const [query, setQuery] = useState('');
  const [track, setTrack] = useState(['python', 'javascript', 'sqlite'].includes(requestedTrack) ? requestedTrack : 'Semua');
  const [difficulty, setDifficulty] = useState('Semua');
  useEffect(() => setTrack(['python', 'javascript', 'sqlite'].includes(requestedTrack) ? requestedTrack : 'Semua'), [requestedTrack]);
  const completed = useMemo(() => new Set(state.completed), [state.completed]);
  const exercise = slug ? library.exercises.find(item => item.slug === slug) : null;

  if (slug && !exercise) return <main className="practice-page exercism-page"><section className="practice-inner exercism-inner exercism-content"><Empty title="Materi tidak ditemukan" description="Latihan Exercism ini tidak tersedia di perpustakaan CodeQuest." action={<a className="button blue small" href="#/practice/exercism">Kembali ke perpustakaan<ArrowRight size={16} /></a>} /></section></main>;
  if (exercise) return <ExerciseDetail key={`${exercise.slug}:${window.location.hash}`} exercise={exercise} state={state} setState={setState} notify={notify} />;

  const term = query.trim().toLocaleLowerCase();
  const visible = library.exercises.filter(item => {
    const tracks = Object.keys(item.tracks);
    const matchesTrack = track === 'Semua' || tracks.includes(track);
    const matchesDifficulty = difficulty === 'Semua' || (difficulty === '1-2' ? item.difficulty >= 1 && item.difficulty <= 2 : difficulty === '3-4' ? item.difficulty >= 3 && item.difficulty <= 4 : item.difficulty >= 5);
    const matchesSearch = `${item.title} ${item.blurb} ${item.source} ${tracks.map(name => trackLabels[name]).join(' ')}`.toLocaleLowerCase().includes(term);
    return matchesTrack && matchesDifficulty && matchesSearch;
  });
  const localVariants = library.exercises.reduce((total, item) => total + Object.keys(item.tracks).length, 0);
  const completedVariants = library.exercises.reduce((total, item) => total + Object.keys(item.tracks).filter(name => completed.has(progressId(name, item.slug))).length, 0);
  const hasFilters = Boolean(term) || track !== 'Semua' || difficulty !== 'Semua';
  const reset = () => {
    setQuery('');
    setTrack('Semua');
    setDifficulty('Semua');
  };

  return <main className="practice-page exercism-page">
    <header className="practice-intro">
      <div className="practice-inner exercism-inner">
        <a className="practice-back" href="#/practice"><ArrowLeft size={18} />Coding Challenges CodeQuest</a>
        <p className="practice-eyebrow">PERPUSTAKAAN LATIHAN</p>
        <h1>Materi Exercism</h1>
        <p>Masalah latihan lintas bahasa yang tersaring agar tidak menambah materi yang sudah ada. Baca instruksi, tulis kode, dan simpan progres tanpa akun.</p>
        <div className="practice-overview">
          <span><BookOpen size={16} />{library.exercises.length} materi unik</span>
          <span><Code2 size={16} />{localVariants} varian editor lokal</span>
          <span><CheckCircle2 size={16} />{completedVariants}/{localVariants} selesai</span>
        </div>
      </div>
    </header>

    <section className="practice-inner exercism-inner exercism-content" aria-label="Perpustakaan materi Exercism">
      <div className="exercism-source-note">
        <BookOpen size={19} />
        <p><strong>{library.sourceCount} masalah sumber → {library.exercises.length} materi aktif.</strong> {library.excluded.length} materi dibuang karena deprecated atau tumpang tindih dengan CodeQuest. Materi berlisensi MIT dan mencantumkan atribusi.</p>
        <a href="https://exercism.org" target="_blank" rel="noreferrer">Exercism<ExternalLink size={15} /></a>
      </div>

      <div className="exercism-language-filters" role="group" aria-label="Filter bahasa Exercism">
        {['Semua', 'python', 'javascript', 'sqlite'].map(name => <button type="button" key={name} aria-pressed={track === name} onClick={() => setTrack(name)}>{name === 'Semua' ? 'Semua' : trackLabels[name]}</button>)}
      </div>

      <div className="practice-tools">
        <div className="practice-search">
          <Search size={19} />
          <input type="search" aria-label="Cari materi Exercism" placeholder="Cari judul, topik, atau sumber…" value={query} onChange={event => setQuery(event.target.value)} />
          {query && <button type="button" aria-label="Hapus pencarian Exercism" onClick={() => setQuery('')}><X size={18} /></button>}
        </div>
        <select aria-label="Tingkat kesulitan Exercism" value={difficulty} onChange={event => setDifficulty(event.target.value)}>
          <option>Semua</option><option value="1-2">Tingkat 1–2</option><option value="3-4">Tingkat 3–4</option><option value="5-10">Tingkat 5–10</option>
        </select>
      </div>

      <div className="practice-results"><p role="status">{visible.length} materi ditampilkan</p>{hasFilters && <button className="practice-clear" type="button" onClick={reset}>Hapus filter<X size={14} /></button>}</div>

      {!visible.length ? <Empty title="Tidak ada materi yang cocok" description="Coba kata lain atau hapus filter bahasa dan tingkat." action={<button className="button blue small" type="button" onClick={reset}>Hapus filter<ArrowRight size={16} /></button>} /> : <div className="exercism-grid">
        {visible.map(item => {
          const tracks = Object.keys(item.tracks);
          const done = tracks.filter(name => completed.has(progressId(name, item.slug))).length;
          const complete = tracks.length > 0 && done === tracks.length;
          return <a className={`exercism-card${complete ? ' is-complete' : ''}`} href={`#/practice/exercism/${item.slug}`} key={item.slug} data-exercism-card={item.slug}>
            <div className="exercism-card-top"><span>{item.difficulty ? `LVL ${String(item.difficulty).padStart(2, '0')}` : 'UMUM'}</span>{complete ? <CheckCircle2 size={20} /> : <Circle size={20} />}</div>
            <h2>{item.title}</h2>
            <p>{item.blurb}</p>
            <div className="exercism-card-tracks"><TrackBadges exercise={item} /></div>
            <div className="exercism-card-bottom"><span>{tracks.length ? `${done}/${tracks.length} track selesai` : 'Buka instruksi'}</span><ArrowRight size={17} /></div>
          </a>;
        })}
      </div>}
    </section>
  </main>;
}
