import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import { ArrowRight, BookOpen, Check, Clock } from 'lucide-react';
import { getCourseArt, getProjectArt } from './ascii-art';
import RealisticAscii from './RealisticAscii';
export const route = path => { window.location.hash = path; };

const asciiScenes = {
  hero: String.raw`
             .        *        .
        .           /|\           .
               .   / | \   .
        .        . /  |  \ .        .
  ______________/___|___\________________
  \    .    .  /   /   \   \  .    .    /
   \    /\   /___/-----\___\   /\    /
    \  /  \_/                 \_/  \  /
     \/    ||     [ CQ ]      ||    \/
      /\   ||   _________    ||   /\
     /  \__||__/         \__||__/  \
 ___/_________________________________\___
        .      .       .       .      .`,
  map: String.raw`
        .----------------------------.
       /        .            .       \
      /     .        ^             .  \
     /              / \    N            \
    |        .    /   \        .        |
    |            / [X] \    .---.       |
     \    .     /       \  /     \     /
      \        /         ><       \   /
       '---.  '---. .---'        '--'
            \     .       .      /
             '---._________.---'`,
};

export function AsciiScene({ variant = 'hero', className = '' }) {
  return <pre className={`ascii-scene ascii-scene-${variant} ${className}`} aria-hidden="true">{asciiScenes[variant] || asciiScenes.hero}</pre>;
}

export function AsciiMark({ children = '</>' }) {
  return <span className="ascii-mark" aria-hidden="true">{children}</span>;
}

export function Coin() { return <span className="coin" aria-hidden="true">{'</>'}</span>; }
export function Logo() { return <a className="logo" href="#/" aria-label="CodeQuest, beranda"><Coin/><span>CodeQuest</span></a>; }
export function PixelCharacter({ variant = 0, size = 56 }) {
  const eyes = ['o o', '> <', '^ ^', '- -'][variant % 4];
  const art = `  .--------.\n  |  ${eyes}  |\n  |   ^   |\n  '--------'\n    /|  |\\\n   /_|__|_\\\n     |  |\n    _|  |_`;
  return <pre className={`ascii-character variant-${variant % 4}`} style={{fontSize:`${Math.max(6, Math.round(size / 9))}px`, width:size, height:size}} role="img" aria-label="Karakter petualang">{art}</pre>;
}
export function ProgressBar({ value, label }) { return <div className="progress-track" role="progressbar" aria-label={label || 'Progres'} aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${Math.min(100,Math.max(0,value))}%`}}/></div>; }
export function Editor({ value, onChange, language, height = '360px', readOnly = false }) {
  const extensions = React.useMemo(() => [language === 'python' ? python() : language === 'sql' ? sql() : language === 'html' || language === 'css' ? html() : javascript({jsx:true})], [language]);
  return <CodeMirror value={value} onChange={onChange} extensions={extensions} theme={oneDark} height={height} readOnly={readOnly} basicSetup={{lineNumbers:true,foldGutter:false,highlightActiveLine:true,autocompletion:true}} aria-label="Editor kode"/>;
}
export function CourseArt({ course, large = false }) {
  const artKey = course.artId || course.trackId || course.id || 'codequest';
  const levelClass = course.level ? `level-${course.level.toLowerCase()}` : '';
  const classes = `course-art ${course.theme || 'blue'} ${levelClass} ${large ? 'large' : ''}`;
  if (course.trackId === 'python' || course.id === 'python') {
    return <div className={`${classes} python-realistic`} data-art="python-realistic" data-course-id={course.id}><RealisticAscii src={`${import.meta.env.BASE_URL}python-face-v2.jpg`} alt="Wajah ular Python hijau dengan mata dan sisik jelas, dirender sebagai ASCII art berwarna" rows={large ? 56 : 34} contrast={1.36} brightness={course.level === 'Expert' ? 0.12 : course.level === 'Menengah' ? 0.1 : 0.08} photoOpacity={0.025} dotOpacity={0.96} focusY={0.53}/></div>;
  }
  const art = course.artId ? getProjectArt(course.artId) : getCourseArt(course);
  return <div className={classes} data-art={artKey} data-course-id={course.id} aria-hidden="true"><pre className="ascii-scene ascii-scene-course">{art}</pre></div>;
}
export function CourseCard({course,state,index}) {
  const done = course.lessons.filter(l=>state.completed.includes(l.id)).length;
  return <a className="course-card" href={`#/course/${course.id}`}><CourseArt course={course}/><div className="course-card-body"><div className="eyebrow">{index !== undefined ? `COURSE ${index+1}` : 'COURSE'}<span className="free-tag">GRATIS</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="card-meta"><span><BookOpen size={14}/>{course.lessons.length} pelajaran</span><span>{course.level==='Menengah'?'Intermediate':course.level}</span></div><p className="course-format">{course.lessons.every(lesson=>lesson.type==='quiz')?'Konsep & kuis':'Praktik kode'}</p>{done > 0 && <div className="card-progress"><ProgressBar value={done/course.lessons.length*100}/><span>{done}/{course.lessons.length}</span></div>}</div></a>;
}
export function SectionHeading({eyebrow,title,description,children}) { return <div className="section-heading"><div>{eyebrow && <p className="eyebrow accent">{eyebrow}</p>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</div>; }
export function Empty({title,description,action}) { return <div className="empty"><AsciiMark>{'</>'}</AsciiMark><h3>{title}</h3><p>{description}</p>{action}</div>; }
export function Stat({icon:Icon,label,value}) { return <div className="stat"><Icon size={23}/><div><strong>{value}</strong><span>{label}</span></div></div>; }
export function ProjectCard({project,done=0}) { return <a className="project-card" href={`#/projects/${project.id}`}><CourseArt course={{artId:project.id,theme:project.theme}}/><div className="project-body"><span className="eyebrow">GUIDED PROJECT · {project.difficulty.toUpperCase()}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="card-meta"><span>{project.course}</span><span><Clock size={14}/>{project.time}</span></div><div className="project-cta">{done === project.steps.length ? <><Check size={17}/>Selesai</> : <>Mulai membangun <ArrowRight size={16}/></>}</div></div></a>; }
