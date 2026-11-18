import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import { ArrowRight, BookOpen, Check, Clock, Code2 } from 'lucide-react';
export const route = path => { window.location.hash = path; };
export function Coin() { return <img className="coin" src={`${import.meta.env.BASE_URL}favicon.svg`} alt=""/>; }
export function Logo() { return <a className="logo" href="#/" aria-label="CodeQuest, beranda"><Coin/><span>CodeQuest</span></a>; }
export function PixelCharacter({ variant = 0, size = 56 }) {
  const colors = ['#f39450','#7b9dff','#be80e6','#6bc69d'];
  return <svg width={size} height={size} viewBox="0 0 24 26" shapeRendering="crispEdges" role="img" aria-label="Karakter petualang"><path fill="#332b45" d="M8 2h9v2h3v9h-2v4h3v5h-5v3h-5v-3H6v-5H4v-5h2V5h2z"/><path fill={colors[variant]} d="M8 3h9v2h2v3H6V6h2z"/><path fill="#ffe1b5" d="M8 9h10v6h-2v2h-6v-2H8z"/><path fill="#392f48" d="M10 10h2v2h-2zm5 0h2v2h-2z"/><path fill="#72bddd" d="M8 17h10v5H8z"/><path fill="#ffe1b5" d="M5 17h3v4H5zm13 0h3v4h-3z"/><path fill="#987453" d="M8 22h4v3H7v-2zm6 0h4v3h-5v-2z"/><path fill="#ffe99b" d="M9 4h6v2H9z"/></svg>;
}
export function ProgressBar({ value, label }) { return <div className="progress-track" role="progressbar" aria-label={label || 'Progres'} aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${Math.min(100,Math.max(0,value))}%`}}/></div>; }
export function Editor({ value, onChange, language, height = '360px', readOnly = false }) {
  const extensions = React.useMemo(() => [language === 'python' ? python() : language === 'sql' ? sql() : language === 'html' || language === 'css' ? html() : javascript({jsx:true})], [language]);
  return <CodeMirror value={value} onChange={onChange} extensions={extensions} theme={oneDark} height={height} readOnly={readOnly} basicSetup={{lineNumbers:true,foldGutter:false,highlightActiveLine:true,autocompletion:true}} aria-label="Editor kode"/>;
}
export function CourseArt({ course, large = false }) {
  if (course.trackId === 'python' || course.id === 'python') return <div className={`course-art illustrated ${large ? 'large' : ''}`} aria-hidden="true" style={{backgroundImage:`url('${import.meta.env.BASE_URL}jungle-ruins.webp')`}}/>;
  return <div className={`course-art ${course.theme} ${large ? 'large' : ''}`} aria-hidden="true"><div className="art-cloud cloud-a"/><div className="art-cloud cloud-b"/><div className="art-mountain mountain-a"/><div className="art-mountain mountain-b"/><div className="art-ground"/><div className="art-ruin"><span>{course.symbol}</span></div><div className="art-tree tree-a"/><div className="art-tree tree-b"/><div className="art-spark">+</div></div>;
}
export function CourseCard({course,state,index}) {
  const done = course.lessons.filter(l=>state.completed.includes(l.id)).length;
  return <a className="course-card" href={`#/course/${course.id}`}><CourseArt course={course}/><div className="course-card-body"><div className="eyebrow">{index !== undefined ? `COURSE ${index+1}` : 'COURSE'}<span className="free-tag">GRATIS</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="card-meta"><span><BookOpen size={14}/>{course.lessons.length} pelajaran</span><span>{course.level==='Menengah'?'Intermediate':course.level}</span></div><p className="course-format">{course.lessons.every(lesson=>lesson.type==='quiz')?'Konsep & kuis':'Praktik kode'}</p>{done > 0 && <div className="card-progress"><ProgressBar value={done/course.lessons.length*100}/><span>{done}/{course.lessons.length}</span></div>}</div></a>;
}
export function SectionHeading({eyebrow,title,description,children}) { return <div className="section-heading"><div>{eyebrow && <p className="eyebrow accent">{eyebrow}</p>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</div>; }
export function Empty({title,description,action}) { return <div className="empty"><Code2 size={38}/><h3>{title}</h3><p>{description}</p>{action}</div>; }
export function Stat({icon:Icon,label,value}) { return <div className="stat"><Icon size={23}/><div><strong>{value}</strong><span>{label}</span></div></div>; }
export function ProjectCard({project,done=0}) { return <a className="project-card" href={`#/projects/${project.id}`}><CourseArt course={{theme:project.theme,symbol:project.id==='pomodoro'?'25:00':project.id==='budget'?'Rp':project.id==='data-detective'?'SQL':project.id==='pixel-garden'?'✦':'</>'}}/><div className="project-body"><span className="eyebrow">GUIDED PROJECT · {project.difficulty.toUpperCase()}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="card-meta"><span>{project.course}</span><span><Clock size={14}/>{project.time}</span></div><div className="project-cta">{done === project.steps.length ? <><Check size={17}/>Selesai</> : <>Mulai membangun <ArrowRight size={16}/></>}</div></div></a>; }
