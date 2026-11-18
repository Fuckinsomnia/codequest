import {test} from 'node:test';
import assert from 'node:assert/strict';
import python from '../src/data/python.js';
import phaser from '../src/data/phaser.js';
import {coreCourses} from '../src/data/core-courses.js';
import {advancedCourses} from '../src/data/advanced-courses.js';
import {validateState,freshState,completeLesson,streak,localDate} from '../src/store.js';
import {courses,lessons,courseLevels,contentRelease} from '../src/data/index.js';
const baseline=[python,...coreCourses,...advancedCourses,phaser];
test('61 complete course modules with unique lesson identifiers',()=>{
  assert.equal(courses.length,61);
  assert.equal(lessons.length,427);
  assert.equal(new Set(courses.map(course=>course.id)).size,courses.length);
  assert.deepEqual(courseLevels,['Pemula','Menengah','Expert']);
  assert.match(contentRelease.version,/^\d{4}\.\d{2}$/);
  assert.match(contentRelease.date,/^\d{4}-\d{2}-\d{2}$/);
  const ids=new Set();
  for(const course of courses){
    assert.ok(course.chapters.length>=2);
    assert.ok(course.description.length>30);
    for(const lesson of course.lessons){
      assert.ok(!ids.has(lesson.id),lesson.id);ids.add(lesson.id);
      assert.ok(course.chapters[lesson.chapter],lesson.id);
      assert.ok(lesson.intro.length>=2 && lesson.intro.every(p=>p.length>35),lesson.id);
      assert.ok(lesson.task.length && lesson.hints.length>=2,lesson.id);
      assert.equal(lesson.xp,15);
      if(lesson.type==='quiz'){
        assert.equal(lesson.options.length,4,lesson.id);
        assert.equal(new Set(lesson.options).size,4,lesson.id);
        assert.ok(Number.isInteger(lesson.answer) && lesson.answer>=0 && lesson.answer<4,lesson.id);
        assert.ok(lesson.explanation?.length>15,lesson.id);
      }else{
        assert.equal(typeof lesson.starter,'string',lesson.id);
        assert.equal(typeof lesson.solution,'string',lesson.id);
        if(['html','css'].includes(lesson.language))assert.ok(lesson.assertions?.length>=2,lesson.id);
        else assert.equal(typeof lesson.expected,'string',lesson.id);
      }
    }
  }
  assert.equal(python.lessons.length,43);
  assert.equal(coreCourses.reduce((n,c)=>n+c.lessons.length,0),48);
  assert.equal(advancedCourses.reduce((n,c)=>n+c.lessons.length,0),120);
});
test('existing courses and progress identifiers remain unchanged',()=>{
  assert.deepEqual(courses.slice(0,26).map(({trackId,...course})=>course),baseline.map(({trackId,...course})=>course));
  assert.deepEqual(courses.slice(0,5).map(course=>course.id),['python','html','css','javascript','sql']);
});
test('each subject has one Intermediate and one Expert course without duplicates',()=>{
  const tracks=new Set(courses.map(course=>course.trackId));
  assert.equal(tracks.size,23);
  for(const track of tracks){
    for(const level of ['Menengah','Expert'])assert.equal(courses.filter(course=>course.trackId===track&&course.level===level).length,1,`${track} ${level}`);
  }
  const added=courses.slice(26);
  assert.equal(added.filter(course=>course.level==='Menengah').length,12);
  assert.equal(added.filter(course=>course.level==='Expert').length,23);
  const newLessons=added.flatMap(course=>course.lessons);
  assert.equal(newLessons.length,210);
  assert.equal(newLessons.filter(lesson=>lesson.type==='code').length,48);
  assert.equal(newLessons.filter(lesson=>lesson.type==='quiz').length,162);
  for(const course of added){
    assert.equal(course.chapters.length,2,course.id);
    assert.equal(course.lessons.length,6,course.id);
    course.lessons.forEach((lesson,index)=>{
      assert.equal(lesson.id,`${course.id}-${String(index+1).padStart(2,'0')}`);
      assert.equal(lesson.chapter,Math.floor(index/3));
      assert.ok(lesson.example.length>20,lesson.id);
    });
  }
});
test('completing the same lesson does not duplicate XP or daily activity',()=>{
  const first=completeLesson(freshState(),'python-01');
  const again=completeLesson(first,'python-01');
  assert.equal(again,first);
  assert.equal(again.completed.length,1);
  assert.equal(again.daily[localDate()],1);
});
test('streak counts local calendar dates including year boundaries',()=>{
  assert.equal(streak({'2026-12-31':1,'2027-01-01':2},new Date(2027,0,1,12)),2);
  assert.equal(streak({'2026-12-31':1,'2027-01-01':2},new Date(2027,0,2,12)),2);
  assert.equal(streak({'2026-12-31':1,'2027-01-01':2},new Date(2027,0,3,12)),0);
});
test('import rejects malformed data and sanitizes progress shape',()=>{
  assert.throws(()=>validateState({unexpected:true}));
  const clean=validateState({...freshState(),completed:['python-01','python-01','<script>'],avatar:200,notes:{x:5,y:'valid'},daily:{'2026-11-17':-1,'2026-11-18':2},projectSteps:{safe:[1,1,2,-2,100]}});
  assert.deepEqual(clean.completed,['python-01']);
  assert.equal(clean.avatar,0);
  assert.deepEqual(clean.notes,{y:'valid'});
  assert.deepEqual(clean.daily,{'2026-11-18':2});
  assert.deepEqual(clean.projectSteps,{safe:[1,2]});
});
