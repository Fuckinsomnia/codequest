import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Code2, ExternalLink, Search, X } from 'lucide-react';
import { Empty } from './components';
import catalog from './data/exercism-tracks.json';

const localTracks = new Set(['python', 'javascript', 'sqlite']);
const pageSize = 24;
const statusLabels = { active: 'Aktif', beta: 'Beta', deprecated: 'Deprecated', wip: 'WIP' };

export default function ExercismCatalog({ initialTrack = 'Semua' }) {
  const [track, setTrack] = useState(catalog.tracks.some(item => item.slug === initialTrack) ? initialTrack : 'Semua');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('available');
  const [page, setPage] = useState(1);
  const term = query.trim().toLocaleLowerCase();
  const availableCount = useMemo(() => catalog.exercises.filter(exercise => !['deprecated', 'wip'].includes(exercise.status)).length, []);

  const visible = useMemo(() => catalog.exercises.filter(exercise => {
    const matchesTrack = track === 'Semua' || exercise.track === track;
    const matchesStatus = status === 'all' || (status === 'available' ? !['deprecated', 'wip'].includes(exercise.status) : exercise.status === status);
    const matchesSearch = `${exercise.name} ${exercise.trackName} ${exercise.concepts.join(' ')}`.toLocaleLowerCase().includes(term);
    return matchesTrack && matchesStatus && matchesSearch;
  }), [track, status, term]);

  useEffect(() => setPage(1), [track, status, term]);
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const items = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const hasFilters = track !== 'Semua' || Boolean(term) || status !== 'available';

  function reset() {
    setTrack('Semua');
    setQuery('');
    setStatus('available');
  }

  return <main className="practice-page exercism-page exercism-catalog-page">
    <header className="practice-intro">
      <div className="practice-inner exercism-inner">
        <a className="practice-back" href="#/practice/exercism"><ArrowLeft size={18} />Materi Exercism pilihan</a>
        <p className="practice-eyebrow">KATALOG LINTAS BAHASA</p>
        <h1>Semua Latihan Bahasa</h1>
        <p>Telusuri seluruh varian latihan Exercism. Editor lokal CodeQuest tersedia untuk Python, JavaScript, dan SQLite; bahasa lain dibuka di Exercism.</p>
        <div className="practice-overview">
          <span><BookOpen size={16} />{catalog.trackCount} bahasa</span>
          <span><Code2 size={16} />{catalog.exerciseCount.toLocaleString('id-ID')} varian latihan</span>
          <span><CheckCircle2 size={16} />{availableCount.toLocaleString('id-ID')} tersedia</span>
        </div>
      </div>
    </header>

    <section className="practice-inner exercism-inner exercism-content" aria-label="Katalog semua latihan Exercism">
      <div className="exercism-source-note">
        <BookOpen size={19} />
        <p><strong>Metadata resmi Exercism dalam satu katalog offline.</strong> Klik kartu untuk membuka instruksi dan test suite di Exercism; editor lokal CodeQuest tersedia untuk tiga bahasa.</p>
        <a href="https://exercism.org/tracks" target="_blank" rel="noreferrer">Daftar track<ExternalLink size={15} /></a>
      </div>

      <div className="practice-tools exercism-catalog-tools">
        <div className="practice-search">
          <Search size={19} />
          <input type="search" aria-label="Cari semua latihan Exercism" placeholder="Cari bahasa, judul, atau konsep…" value={query} onChange={event => setQuery(event.target.value)} />
          {query && <button type="button" aria-label="Hapus pencarian katalog" onClick={() => setQuery('')}><X size={18} /></button>}
        </div>
        <select aria-label="Bahasa Exercism" value={track} onChange={event => setTrack(event.target.value)}>
          <option>Semua</option>
          {catalog.tracks.map(item => <option value={item.slug} key={item.slug}>{item.name} ({item.exerciseCount})</option>)}
        </select>
        <select aria-label="Status latihan Exercism" value={status} onChange={event => setStatus(event.target.value)}>
          <option value="available">Tersedia</option>
          <option value="all">Semua status</option>
          <option value="active">Aktif</option>
          <option value="beta">Beta</option>
          <option value="deprecated">Deprecated</option>
          <option value="wip">WIP</option>
        </select>
      </div>

      <div className="practice-results">
        <p role="status">{visible.length.toLocaleString('id-ID')} latihan ditemukan · halaman {currentPage}/{pageCount}</p>
        {hasFilters && <button className="practice-clear" type="button" onClick={reset}>Hapus filter<X size={14} /></button>}
      </div>

      {!items.length ? <Empty title="Tidak ada latihan yang cocok" description="Coba bahasa, status, atau kata pencarian lain." action={<button className="button blue small" type="button" onClick={reset}>Hapus filter<ArrowRight size={16} /></button>} /> : <>
        <div className="exercism-grid exercism-catalog-grid">
          {items.map(exercise => <a className="exercism-card exercism-catalog-card" href={exercise.url} target="_blank" rel="noreferrer" key={`${exercise.track}-${exercise.slug}`} data-track={exercise.track} data-exercise={exercise.slug} data-exercism-card={exercise.slug}>
            <div className="exercism-card-top"><span>{exercise.difficulty ? `LVL ${String(exercise.difficulty).padStart(2, '0')}` : 'UMUM'}</span><span className={`exercism-status status-${exercise.status}`}>{statusLabels[exercise.status] || exercise.status}</span></div>
            <h2>{exercise.name}</h2>
            <p className="exercism-catalog-track">{exercise.trackName}</p>
            <div className="exercism-card-tracks">
              {localTracks.has(exercise.track) && <span className="exercism-track-badge is-local">Editor lokal</span>}
              {exercise.concepts.slice(0, 2).map(concept => <span className="exercism-concept-badge" key={concept}>{concept}</span>)}
            </div>
            <div className="exercism-card-bottom"><span>Buka di Exercism</span><ExternalLink size={17} /></div>
          </a>)}
        </div>
        <nav className="exercism-pagination" aria-label="Halaman katalog Exercism">
          <button className="button small" type="button" disabled={currentPage === 1} onClick={() => { setPage(value => Math.max(1, value - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ArrowLeft size={16} />Sebelumnya</button>
          <span>Halaman {currentPage} dari {pageCount}</span>
          <button className="button small" type="button" disabled={currentPage === pageCount} onClick={() => { setPage(value => Math.min(pageCount, value + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Berikutnya<ArrowRight size={16} /></button>
        </nav>
      </>}
    </section>
  </main>;
}
