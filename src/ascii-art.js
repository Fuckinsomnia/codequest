const center = (text, width) => text.padStart(Math.floor((width + text.length) / 2)).padEnd(width);

const frame = (title, body, tag) => {
  const lines = body.split('\n').filter(line => line.length);
  const width = Math.max(38, title.length + 4, tag.length + 4, ...lines.map(line => line.length));
  const inner = width - 2;
  const border = '-'.repeat(inner);
  return [
    `.${border}.`,
    `| ${center(title.toUpperCase(), inner - 2)} |`,
    `|${border}|`,
    ...lines.map(line => `| ${line.padEnd(inner - 2)} |`),
    `|${border}|`,
    `| ${center(tag, inner - 2)} |`,
    `'${border}'`,
  ].join('\n');
};

const courseArt = {
  html: tag => frame('HTML', String.raw`
<!doctype html>
<html lang="id">
  <head>
    <title>Petualangan Web</title>
  </head>
  <body>
    <main>
      <h1>Halo, dunia!</h1>
      <section id="belajar">
        <p>Struktur yang bermakna.</p>
      </section>
    </main>
  </body>
</html>`, tag),

  css: tag => frame('CSS', String.raw`
+---------+-----------+
| sidebar |  content  |
| [logo]  |  [hero]   |
| [menu]  |  [cards]  |
+---------+-----------+
display: grid;
grid-template-columns: 1fr 3fr;
gap: 1rem;
color: #c4b5fd;
:hover { transform: translateY(-2px); }`, tag),

  javascript: tag => frame('JavaScript', String.raw`
> node adventure.js
const level = 2;
let xp = 0;
for (let day = 0; day < 30; day++) {
  xp += 15;
}
async function learn() {
  await practice();
  return build();
}
> true`, tag),

  sql: tag => frame('SQLite', String.raw`
learners: [id | name | xp]
          [01  | Ayu  | 120]
          [02  | Bima |  80]
SELECT name, xp
FROM learners
WHERE xp >= 100
ORDER BY xp DESC;
-- query complete`, tag),

  numpy: tag => frame('NumPy', String.raw`
[ 1  2  3 ]     .-------.
[ 4  5  6 ] --> | array |
[ 7  8  9 ]     '-------'
      \  |  /
       \ | /
       shape: (3, 3)
dtype: int32
np.mean(data) -> 5.0`, tag),

  pandas: tag => frame('Pandas', String.raw`
+------+--------+-------+
| id   | name   | xp    |
+------+--------+-------+
| 01   | Ayu    | 120   |
| 02   | Bima   |  80   |
| 03   | Citra  | 200   |
+------+--------+-------+
df.groupby('name').sum()
( Pd )  tidy data`, tag),

  matplotlib: tag => frame('Matplotlib', String.raw`
200 |             *
150 |       *     *
100 |  *        *
 50 |    *  *
  0 +------------------
       Jan  Feb  Mar
plt.plot(days, xp)
plt.title("Petualangan")
plt.show()`, tag),

  'machine-learning': tag => frame('Machine Learning', String.raw`
     o           o
      \         /
 o --- o --- o --- o
      / \     / \
     o   o   o   o
       \  |  /
        [ model ]
train -> predict -> evaluate
accuracy: 0.94`, tag),

  'gen-ai': tag => frame('Generative AI', String.raw`
       .---------.
      |  .-------.  |
      |  | o   o |  |
   o--|  |  ___  |  |--o
      |  '-------'  |
      '------+------'
          prompt
            |
       [ model core ]
            |
         response`, tag),

  react: tag => frame('React', String.raw`
<App>
  +---------+
  | Header  |
  +----+----+
       |
  +----+----+
  | Course  |
  +----+----+
       |
  <State /> --> render()
hooks: useState, useEffect`, tag),

  nodejs: tag => frame('Node.js', String.raw`
       .-----------.
      |  NODE API  |
   .--+-----------+--.
   | [] [] [] [] [] |
   | request queue  |
   '---------------'
      |  |  |  |
 GET /courses
 POST /progress
 200 OK`, tag),

  p5js: tag => frame('p5.js', String.raw`
+-------------------+
|     .       *     |
|   .     / \       |
|    /\  /   \  .   |
|   /  \ \   /      |
|  /____V___/       |
+-------------------+
function setup() { createCanvas(); }
function draw()  { imagination(); }`, tag),

  'command-line': tag => frame('Command Line', String.raw`
user@codequest:~$
> ls
courses/  projects/  builds/
> cd courses/python
> learn --offline
[OK] 43 lessons loaded
> git status
On branch main
nothing to commit`, tag),

  'git-github': tag => frame('Git & GitHub', String.raw`
         o---o---o  main
        /
   o---o---o---o  feature
        \    |
         o--o
> git add .
> git commit -m "level up"
> git push origin main
remote: synced`, tag),

  'github-copilot': tag => frame('GitHub Copilot', String.raw`
   .--.        .--.
   |Co|  <-->  |AI|
   '--'        '--'
    \          /
     '--------'
// suggest:
const adventure = () => {
  return learn().then(build);
};
[Tab] accept`, tag),

  'ui-ux-design': tag => frame('UI / UX', String.raw`
+--------------------+
| [logo]     [nav]   |
+--------------------+
| HERO       [image] |
| [button]  [button] |
+---------+----------+
| CARD    | CARD     |
+---------+----------+
wire -> test -> polish
contrast: AA`, tag),

  cpp: tag => frame('C++', String.raw`
[ source.cpp ] --> [ compiler ]
                      |
                  [ binary ]
                   /  |  \
              <vector> <map>
g++ -std=c++20 main.cpp
-O2 -Wall -Wextra
speed: high`, tag),

  'c-sharp': tag => frame('C#', String.raw`
       #   .NET
     +---------+
     |  class  |
     +----+----+
          |
      [ Program ]
          |
     +----+----+
     |  Build  |
     '---------'
dotnet run
namespace CodeQuest`, tag),

  java: tag => frame('Java', String.raw`
        (  )
         ) (
        (  )
     .-----------.
     |   JAVA    |
     |  { class }|
     '-----------'
javac Main.java
java Main
JVM: ready`, tag),

  'data-structures-and-algorithms': tag => frame('Algorithms', String.raw`
           o
          /|\
         o o o
        /| |\
       o o o o
      /| | | \
     o  o o  o
O(n) -> O(log n)
stack | queue | graph
solve fast`, tag),

  lua: tag => frame('Lua', String.raw`
          .-.
        /     \
       |  Lua  |
        \     /
          '-'
> local quest = "coding"
> print(quest)
coding
script -> magic
lightweight`, tag),

  phaser: tag => frame('Phaser', String.raw`
+-------------------+
|   ^       []      |
|  <O>    /_\      |
|   |     GAME     |
+-------------------+
| # # # # # # # # |
| player -> world  |
| LEVEL UP!        |
+-------------------+`, tag),
};

const projectArt = {
  'personal-page': () => frame('Personal Page', String.raw`
.-----------------.
| [@]  Ayu        |
|-----------------|
| HELLO, WORLD    |
| [about] [work]  |
| [contact]       |
'-----------------'
HTML + CSS`, '[ PROJ ]'),

  pomodoro: () => frame('Focus Timer', String.raw`
       .---.
    .-' 25  '-.
   /     :     \
  |     00      |
   \   FOCUS   /
    '-._____.-'
[ start ] [ pause ]
25 menit fokus`, '[ PROJ ]'),

  budget: () => frame('Budget Guard', String.raw`
   .-------------.
  /   Rp150.000  \
 |    _______    |
 |   |  coin  |  |
 |   |_______|  |
  \   SAVE MORE /
   '-----------'
income - expense = balance`, '[ PROJ ]'),

  'quiz-game': () => frame('Quiz Game', String.raw`
+-----------------+
| Q: 2 + 2 = ?    |
| [A] 3  [B] 4    |
| [C] 5  [D] 6    |
+-----------------+
score: 100
streak: 3`, '[ PROJ ]'),

  'data-detective': () => frame('Data Detective', String.raw`
       .---.
      /     \
     |  ?    |
      \     /
       '---'
         |
     +---------+
     | SQL     |
     | 5 clues |
     '---------'
SELECT * FROM mystery`, '[ PROJ ]'),

  'pixel-garden': () => frame('Pixel Garden', String.raw`
+-----------------+
| .  .  *  .  .  . |
| .  /\ *  .  /\ . |
| * /  \  . /  \ *|
| . \__/  . \__/ . |
+-----------------+
plant pixels
watch them grow`, '[ PROJ ]'),
};

const fallbackArt = tag => frame('CodeQuest', String.raw`
      .-----------.
     /             \
    |    CODE      |
     \             /
      '-----------'
learn -> practice -> build
next level unlocked`, tag);

const levelMarks = {
  Pemula: '.  *  .',
  Menengah: '*  .  *',
  Expert: '.  *  .  *  .',
};

export function getCourseArt(course) {
  const label = String(course.symbol || course.id || 'CQ').slice(0, 6);
  const tag = `[ ${label} ]`.slice(0, 9).padEnd(9, ' ');
  const draw = courseArt[course.trackId || course.id] || fallbackArt;
  const marks = levelMarks[course.level] || levelMarks.Pemula;
  return `${marks}  ${tag}  ${marks}\n${draw(tag)}`;
}

export function getProjectArt(projectId) {
  return (projectArt[projectId] || fallbackArt)('[ PROJ ]');
}
