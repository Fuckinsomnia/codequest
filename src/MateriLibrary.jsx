import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Search, X } from 'lucide-react';
import { Empty } from './components';
import catalog from './data/w3schools-materials.json';
import './materi.css';

const pageSize = 24;

export default function MateriLibrary() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('Semua');
  const [category, setCategory] = useState('Semua');
  const [type, setType] = useState('Semua');
  const [page, setPage] = useState(1);
  const term = query.trim().toLocaleLowerCase();
  const categories = useMemo(() => [...new Set(catalog.materials.map(item => item.category))].sort(), []);

  const visible = useMemo(() => catalog.materials.filter(item => {
    const matchesTopic = topic === 'Semua' || item.topic === topic;
    const matchesCategory = category === 'Semua' || item.category === category;
    const matchesType = type === 'Semua' || item.type === type;
    const matchesSearch = `${item.title} ${item.topicName} ${item.category} ${item.description}`.toLocaleLowerCase().includes(term);
    return matchesTopic && matchesCategory && matchesType && matchesSearch;
  }), [topic, category, type, term]);

  useEffect(() => setPage(1), [topic, category, type, term]);
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const items = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const hasFilters = topic !== 'Semua' || category !== 'Semua' || type !== 'Semua' || Boolean(term);

  function reset() {
    setTopic('Semua');
    setCategory('Semua');
    setType('Semua');
    setQuery('');
  }

  return <main className="materi-page">
    <header className="materi-hero">
      <div className="materi-inner">
        <a className="practice-back" href="#/courses"><ArrowLeft size={18} />Kembali ke kursus</a>
        <p className="practice-eyebrow">RUJUKAN BELAJAR TAMBAHAN</p>
        <h1>Materi W3Schools</h1>
        <p>Telusuri tutorial W3Schools dalam satu katalog. CodeQuest menyediakan ringkasan orisinal berbahasa Indonesia; materi lengkap dan contoh interaktif dibuka di sumber asli.</p>
        <div className="practice-overview">
          <span><BookOpen size={16} />{catalog.topicCount} topik</span>
          <span><BookOpen size={16} />{catalog.materialCount.toLocaleString('id-ID')} materi</span>
          <span><ExternalLink size={16} />Tautan resmi W3Schools</span>
        </div>
      </div>
    </header>

    <section className="materi-inner materi-content" aria-label="Katalog materi W3Schools">
      <div className="exercism-source-note materi-source-note">
        <BookOpen size={19} />
        <p><strong>Katalog, bukan salinan artikel.</strong> Judul, topik, dan tautan diambil dari sitemap resmi W3Schools. Ringkasan dibuat untuk CodeQuest dan tidak menggantikan konten sumber.</p>
        <a href="https://www.w3schools.com/" target="_blank" rel="noreferrer">W3Schools<ExternalLink size={15} /></a>
      </div>

      <div className="materi-tools">
        <div className="practice-search">
          <Search size={19} />
          <input type="search" aria-label="Cari materi W3Schools" placeholder="Cari judul, topik, atau konsep…" value={query} onChange={event => setQuery(event.target.value)} />
          {query && <button type="button" aria-label="Hapus pencarian materi" onClick={() => setQuery('')}><X size={18} /></button>}
        </div>
        <select aria-label="Topik W3Schools" value={topic} onChange={event => setTopic(event.target.value)}>
          <option>Semua</option>
          {catalog.topics.map(item => <option value={item.slug} key={item.slug}>{item.name}</option>)}
        </select>
        <select aria-label="Kategori materi W3Schools" value={category} onChange={event => setCategory(event.target.value)}>
          <option>Semua</option>
          {categories.map(item => <option key={item}>{item}</option>)}
        </select>
        <select aria-label="Jenis materi W3Schools" value={type} onChange={event => setType(event.target.value)}>
          <option>Semua</option><option>Tutorial</option><option>Latihan</option>
        </select>
      </div>

      <div className="practice-results materi-results">
        <p role="status">{visible.length.toLocaleString('id-ID')} materi ditemukan · halaman {currentPage}/{pageCount}</p>
        {hasFilters && <button className="practice-clear" type="button" onClick={reset}>Hapus filter<X size={14} /></button>}
      </div>

      {!items.length ? <Empty title="Tidak ada materi yang cocok" description="Coba topik, kategori, atau kata pencarian lain." action={<button className="button blue small" type="button" onClick={reset}>Hapus filter<ArrowRight size={16} /></button>} /> : <>
        <div className="materi-grid">
          {items.map(item => <a className="materi-card" href={item.url} target="_blank" rel="noreferrer" key={item.id} data-w3-material={item.id} data-w3-type={item.type}>
            <div className="materi-card-top"><span>{item.topicName}</span><span>{item.type} · {item.category}</span></div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="materi-card-bottom"><span>Buka di W3Schools</span><ExternalLink size={17} /></div>
          </a>)}
        </div>
        <nav className="materi-pagination" aria-label="Halaman materi W3Schools">
          <button className="button small" type="button" disabled={currentPage === 1} onClick={() => { setPage(value => Math.max(1, value - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ArrowLeft size={16} />Sebelumnya</button>
          <span>Halaman {currentPage} dari {pageCount}</span>
          <button className="button small" type="button" disabled={currentPage === pageCount} onClick={() => { setPage(value => Math.min(pageCount, value + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Berikutnya<ArrowRight size={16} /></button>
        </nav>
      </>}
    </section>
  </main>;
}
