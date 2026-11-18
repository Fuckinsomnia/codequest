import python from './python.js';
import phaser from './phaser.js';
import { coreCourses } from './core-courses.js';
import { advancedCourses } from './advanced-courses.js';
import { dataAiLevelCourses } from './level-data-ai.js';
import { creativeWebLevelCourses } from './level-creative-web.js';
import { systemsLevelCourses } from './level-systems.js';
import { coreLevelCourses } from './level-core.js';
import { webLevelCourses } from './level-web.js';
export const courseLevels = ['Pemula', 'Menengah', 'Expert'];
export const contentRelease = { version: '2026.11', date: '2026-11-18' };
export const courses = [python, ...coreCourses, ...advancedCourses, phaser, ...dataAiLevelCourses, ...creativeWebLevelCourses, ...systemsLevelCourses, ...coreLevelCourses, ...webLevelCourses].map(course => ({
  ...course,
  trackId: course.trackId || course.id.replace(/^intermediate-/, ''),
}));
export const lessons = courses.flatMap(c => c.lessons.map(l => ({ ...l, courseId: c.id })));
export const journeys = [
  { id: 'web', title: 'Web Development', description: 'Dari halaman pertama sampai aplikasi interaktif.', courses: ['html', 'css', 'javascript', 'intermediate-javascript', 'react', 'nodejs', 'git-github', 'ui-ux-design'], color: 'blue' },
  { id: 'data', title: 'Data Science', description: 'Temukan cerita di balik data, satu langkah demi satu.', courses: ['python', 'intermediate-python', 'sql', 'numpy', 'pandas', 'matplotlib', 'machine-learning'], color: 'purple' },
  { id: 'cs', title: 'Computer Science', description: 'Bangun fondasi berpikir komputasional yang kuat.', courses: ['command-line', 'python', 'java', 'intermediate-java', 'cpp', 'c-sharp', 'data-structures-and-algorithms'], color: 'green' },
  { id: 'ai', title: 'AI & Creative Coding', description: 'Eksplorasi AI, visual, dan dunia game dengan bijak.', courses: ['gen-ai', 'github-copilot', 'p5js', 'lua'], color: 'orange' }
];
export const categories = ['Semua', 'Web Development', 'Data Science', 'Computer Science', 'AI', 'Game Development'];
