import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Code2, Search, X, Zap } from 'lucide-react';
import { courses } from './data';
import { CourseArt, Empty } from './components';
import './practice.css';

const challengeCourses = courses.slice(0, 5);
const challengePacks = challengeCourses.flatMap(course => {
  const challenges = course.lessons.filter((lesson, i) => i > 0 && (i + 1) % 3 === 0);
  return course.chapters.map((chapter, chapterIndex) => ({
    id: `${course.id}-${chapterIndex}`,
    course,
    chapter,
    chapterIndex,
    lessons: challenges.filter(lesson => lesson.chapter === chapterIndex),
  })).filter(pack => pack.lessons.length > 0);
});
const challengeCount = challengePacks.reduce((total, pack) => total + pack.lessons.length, 0);

function PackProgress({ pack, completed }) {
  const done = pack.lessons.filter(lesson => completed.has(lesson.id)).length;
  return <div className="practice-pack-progress">
    <div><span>{done === pack.lessons.length ? 'Paket selesai' : 'Progres latihan'}</span><span>{done}/{pack.lessons.length} selesai</span></div>
    <div className="practice-progress-track" role="progressbar" aria-label={`Progres ${pack.course.title}: ${pack.chapter.title}`} aria-valuenow={done} aria-valuemin={0} aria-valuemax={pack.lessons.length}>
      <span style={{ width: `${done / pack.lessons.length * 100}%` }} />
    </div>
  </div>;
}

export default function Practice({ state }) {
  const [language, setLanguage] = useState('Semua');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Semua status');
  const hash = typeof window === 'undefined' ? '' : window.location.hash;
  const packId = new URLSearchParams(hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '').get('pack');
  const selectedPack = challengePacks.find(pack => pack.id === packId);
  const completed = new Set(state.completed);
  const completedCount = challengePacks.reduce((total, pack) => total + pack.lessons.filter(lesson => completed.has(lesson.id)).length, 0);
  const term = query.trim().toLocaleLowerCase();
  const hasFilters = language !== 'Semua' || term !== '' || status !== 'Semua status';

  function resetFilters() {
    setLanguage('Semua');
    setQuery('');
    setStatus('Semua status');
  }

  function matchingLessons(pack) {
    if (language !== 'Semua' && pack.course.id !== language) return [];
    return pack.lessons.filter(lesson => {
      const matchesSearch = `${pack.course.title} ${pack.chapter.title} ${pack.chapter.description} ${lesson.title}`.toLocaleLowerCase().includes(term);
      const matchesStatus = status === 'Semua status' || (status === 'Selesai' ? completed.has(lesson.id) : !completed.has(lesson.id));
      return matchesSearch && matchesStatus;
    });
  }

  const visiblePacks = challengePacks.map(pack => ({ pack, matches: matchingLessons(pack) })).filter(item => item.matches.length > 0);
  const visibleLessons = selectedPack ? matchingLessons(selectedPack) : [];
  const resultCount = selectedPack ? visibleLessons.length : visiblePacks.reduce((total, item) => total + item.matches.length, 0);
  const invalidPack = packId !== null && !selectedPack;

  return <main className="practice-page">
    <header className="practice-intro">
      <div className="practice-inner">
        <p className="practice-eyebrow">PRACTICE MAKES PROGRESS</p>
        <h1>Coding Challenges</h1>
        <p>Asah logikamu, satu tantangan setiap waktu. Pilih paket topik dan kunjungi kembali latihan pilihan dari kursus.</p>
        <div className="practice-overview">
          <span><BookOpen size={16} aria-hidden="true" />{challengePacks.length} paket topik</span>
          <span><Code2 size={16} aria-hidden="true" />{challengeCount} tantangan</span>
          <span><CheckCircle2 size={16} aria-hidden="true" />{completedCount}/{challengeCount} selesai</span>
        </div>
        <a className="button blue small exercism-entry" href="#/practice/exercism">Jelajahi materi Exercism<ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </header>

    <section className="practice-inner practice-content" aria-label="Paket tantangan coding">
      {packId !== null && <a className="practice-back" href="#/practice" onClick={resetFilters}><ArrowLeft size={18} aria-hidden="true" />Semua paket tantangan</a>}

      <div className="practice-shared-note"><BookOpen size={19} aria-hidden="true" /><p><strong>Latihan kursus, dikemas per topik.</strong> Bukan konten baru: latihan, progres, dan XP sama dengan kursus. Mengulang latihan yang sudah selesai tidak menambah XP. Semua gratis, tanpa login.</p></div>

      {invalidPack ? <Empty title="Paket tidak ditemukan" description="Tautan paket ini tidak tersedia. Pilih topik dari daftar tantangan." action={<a className="practice-reset" href="#/practice" onClick={resetFilters}>Lihat semua paket<ArrowRight size={16} aria-hidden="true" /></a>} /> : <>
        {selectedPack && <div className="practice-detail" data-pack-theme={selectedPack.course.theme}>
          <CourseArt course={selectedPack.course} />
          <div className="practice-detail-copy">
            <p className="practice-eyebrow">{selectedPack.course.title} · BAB {selectedPack.chapterIndex + 1}</p>
            <h2>{selectedPack.chapter.title}</h2>
            <p>{selectedPack.chapter.description}</p>
            <PackProgress pack={selectedPack} completed={completed} />
            <a className="practice-course-link" href={`#/course/${selectedPack.course.id}`}>Pelajari materi kursus<ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </div>}

        <div className="practice-language-filters" role="group" aria-label="Bahasa tantangan">
          {[{ id: 'Semua', title: 'Semua' }, ...challengeCourses].map(course => <button type="button" key={course.id} aria-pressed={language === course.id} onClick={() => {
            setLanguage(course.id);
            if (selectedPack && course.id !== 'Semua' && course.id !== selectedPack.course.id) window.location.hash = '#/practice';
          }}>{course.title}</button>)}
        </div>

        <div className="practice-tools">
          <div className="practice-search">
            <Search size={19} aria-hidden="true" />
            <input type="search" aria-label="Cari tantangan" placeholder="Cari topik atau tantangan…" value={query} onChange={event => setQuery(event.target.value)} />
            {query && <button type="button" aria-label="Hapus pencarian" onClick={() => setQuery('')}><X size={18} aria-hidden="true" /></button>}
          </div>
          <select aria-label="Status tantangan" value={status} onChange={event => setStatus(event.target.value)}>
            <option>Semua status</option><option>Belum selesai</option><option>Selesai</option>
          </select>
        </div>

        <div className="practice-results">
          <p role="status">{selectedPack ? `${resultCount} dari ${selectedPack.lessons.length} tantangan ditampilkan` : `${visiblePacks.length} paket · ${resultCount} tantangan${hasFilters ? ' cocok' : ' untuk dijelajahi'}`}</p>
          {hasFilters && <button type="button" className="practice-clear" onClick={resetFilters}>Hapus filter<X size={14} aria-hidden="true" /></button>}
        </div>

        {!resultCount ? <Empty title="Tidak ada tantangan yang cocok" description="Coba topik lain, hapus kata pencarian, atau ubah status tantangan." action={<button type="button" className="practice-reset" onClick={resetFilters}>Hapus filter<ArrowRight size={16} aria-hidden="true" /></button>} /> : selectedPack ? <ul className="practice-lesson-list" aria-label={`Tantangan ${selectedPack.chapter.title}`}>
          {visibleLessons.map(lesson => {
            const done = completed.has(lesson.id);
            return <li key={lesson.id}><a className="practice-lesson" href={`#/lesson/${selectedPack.course.id}/${lesson.id}`}>
              <span className={`practice-lesson-icon${done ? ' is-complete' : ''}`}>{done ? <CheckCircle2 size={24} aria-hidden="true" /> : <Circle size={24} aria-hidden="true" />}</span>
              <span className="practice-lesson-title"><strong>{lesson.title}</strong><small>{done ? 'Selesai · ulangi latihan' : 'Belum selesai · mulai latihan'}</small></span>
              <span className="practice-lesson-xp"><span><Zap size={14} aria-hidden="true" />{lesson.xp} XP</span><small>{done ? 'Sudah tercatat' : 'XP kursus'}</small></span>
              <ArrowRight size={18} aria-hidden="true" />
            </a></li>;
          })}
        </ul> : <div className="practice-packs">
          {visiblePacks.map(({ pack, matches }) => <a className="practice-pack" href={`#/practice?pack=${pack.id}`} key={pack.id} data-pack-theme={pack.course.theme} aria-label={`Buka paket ${pack.course.title}: ${pack.chapter.title}`}>
            <div className="practice-pack-art">
              <CourseArt course={pack.course} />
              <div className="practice-art-labels"><span>{pack.course.title}</span><span>BAB {String(pack.chapterIndex + 1).padStart(2, '0')}</span></div>
            </div>
            <div className="practice-pack-copy">
              <p className="practice-pack-kicker">CHALLENGE PACK</p>
              <h2>{pack.chapter.title}</h2>
              <p className="practice-pack-description">{pack.chapter.description}</p>
              <div className="practice-pack-meta"><span>{pack.lessons.length} tantangan</span><span>{pack.lessons.reduce((total, lesson) => total + lesson.xp, 0)} XP kursus</span></div>
              <PackProgress pack={pack} completed={completed} />
              <div className="practice-pack-cta"><span>{matches.length < pack.lessons.length ? `${matches.length} tantangan cocok` : 'Buka paket'}</span><ArrowRight size={18} aria-hidden="true" /></div>
            </div>
          </a>)}
        </div>}
      </>}
    </section>
  </main>;
}
