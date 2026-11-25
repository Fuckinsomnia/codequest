const courseArt = {
  python: tag => String.raw`
        .---------.
       /    PY     \
      |   .----.   |
      |   \__/  |  |
       '--------'  |
      /\/\/\/\/\  |
     <   snake     > |
      \/\/\/\/\/  |
        ${tag}      |
       /  \  /  \   |
      /____\/____\  |`,
  html: tag => String.raw`
   .----------------------.
   | [o] [o] [o]   HTML   |
   |----------------------|
   | <h1> Halo, dunia!    |
   | <p>  Belajar web     |
   | <button> KLIK        |
   '----------------------'
          ${tag}
      <body> </body>      |`,
  css: tag => String.raw`
     .-------.   .-------.
     | CSS   |   | GRID  |
     | +---+ |   | +---+ |
     '---+---'   '---+---'
         |           |
     [ palette ]  ######
        ${tag}
     .---.---.---.---.
     | A | B | C | D |
     '---'---'---'---' |`,
  javascript: tag => String.raw`
   > node adventure.js
   [ JS ]  const level = 2;
   > run
   true
   > _
        .---.
       /     \
      |  ${tag}  |
       \     /
    ~~~~~ | | ~~~~~
      .-------.
      | 42    |
      '-------' |`,
  sql: tag => String.raw`
       .-------------.
      /  SELECT *    \
     |    _______     |
     |   | users |    |
     |   |_______|    |
     |   | lessons|   |
      \  |________|  /
       '-----------'
         |  |  |
       [ ${tag} ]
        \  |  /
       DATABASE     |`,
  numpy: tag => String.raw`
      [ 1  2  3 ]
      [ 4  5  6 ]     .-.
      [ 7  8  9 ]     |Np|
          \ | /      '-'
           \|/
      +---------+
      | ARRAY   |
      +---------+
        ${tag}
       [ fast ] [ math ] |`,
  pandas: tag => String.raw`
      +------+-------+
      | ID   |  XP   |
      +------+-------+
      | 01   |  120  |
      | 02   |   90  |
      | 03   |  200  |
      +------+-------+
          ${tag}
      (Pd)  tidy data
       \___________/ |`,
  matplotlib: tag => String.raw`
      120 |        *
       90 |     *     *
       60 |   *    *     *
          |----------------
             DATA

      [ ${tag} ]
       /\    /\    /\
      /  \  /  \  /  \ |`,
  'machine-learning': tag => String.raw`
         o           o
          \         /
      o -- o -- o -- o
          / \     / \
         o   o   o   o

      [ ${tag} ]
        train -> predict
       .---------------.
       | accuracy: up  |
       '---------------' |`,
  'gen-ai': tag => String.raw`
          .---------.
         |   AI     |
      o--|   o o   |--o
         |   ___   |
         '---------'
            / | \
          _/  |  \_
        [ ${tag} ]
       prompt -> model
      .---------------.
      |  hello, human |
      '---------------' |`,
  react: tag => String.raw`
           .
       .       .
      .   ${tag}   .
           |
       < App >
      +---------+
      |   UI    |
      +----+----+
           |
       <State>
      +---------+
      | render |
      '---------' |`,
  nodejs: tag => String.raw`
        .-----------.
       |   NODE     |
    .--+-----------+--.
    | []  []  []  []  |
    |  server stack  |
    '----------------'
        |  |  |  |
      [ ${tag} ]
       request -> response
      .---------------.
      |   online      |
      '---------------' |`,
  p5js: tag => String.raw`
     +-----------------+
     |     .      *    |
     |   .     / \     |
     |    /\  /   \    |
     |   /  \ \   /    |
     +-----------------+
          ${tag}
       create -> draw
      .-----------------.
      | imagination ON  |
      '-----------------' |`,
  'command-line': tag => String.raw`
   user@codequest:~$
   > learn --level 2
   [OK] materi dimuat
   > build --offline
   [OK] siap
   > _
       .-----------.
       | ${tag}     |
       '-----------'
      /  |  |  |  \
     [ls][cd][git][run] |`,
  'git-github': tag => String.raw`
         o---o---o  main
        /
   o---o---o---o  feature
        \    |
         o--o
      [ ${tag} ]
       commit -> push
      .---------------.
      | remote: synced|
      '---------------' |`,
  'github-copilot': tag => String.raw`
      .--.        .--.
      |Co|  <-->  |AI|
      '--'        '--'
       \          /
        '--------'
       [ ${tag} ]
      suggest -> accept
     .------------.
     | code assist|
     '------------' |`,
  'ui-ux-design': tag => String.raw`
   +--------------------+
   | [logo]     [nav]   |
   +--------------------+
   | HERO       [image] |
   | [button]  [button] |
   +---------+----------+
   | CARD    | CARD     |
   +---------+----------+
      [ ${tag} ]
      wire -> polish |`,
  cpp: tag => String.raw`
     [ C++ ] -----> [ .exe ]
       / | \
   <io> <stl> <vector>
       \ | /
     [ compile ]
       [ ${tag} ]
      .-------------.
      | speed: high |
      '-------------' |`,
  'c-sharp': tag => String.raw`
       #   .NET
     +---------+
     |   C#    |
     +----+----+
          |
      [ class ]
          |
     +----+----+
     |  ${tag}  |
     '---------'
        sharp
       /  |  \ |`,
  java: tag => String.raw`
        (  )
         ) (   JAVA
        (  )
     .-----------.
     |  { }      |
     |  class    |
     '-----------'
       [ ${tag} ]
      compile once
      run anywhere  |`,
  'data-structures-and-algorithms': tag => String.raw`
           o
          /|\
         o o o
        /| |\
       o o o o
      /| | | \
     o  o o  o
       [ ${tag} ]
      O(n) -> O(log n)
     +-------------+
     | solve fast  |
     '-------------' |`,
  lua: tag => String.raw`
          .-.
        /     \
       |  Lua  |
        \     /
          '-'
       [ ${tag} ]
      script -> magic
     .-------------.
     |  lightweight|
     '-------------' |`,
  phaser: tag => String.raw`
   +-----------------+
   |   ^       []    |
   |  <O>    /_\    |
   |   |     GAME   |
   +-----------------+
       [ ${tag} ]
      player -> world
     .---------------.
     |  LEVEL UP!   |
     '---------------' |`,
};

const projectArt = {
  'personal-page': () => String.raw`
     .-----------------.
     | [@]  Ayu        |
     |-----------------|
     | HELLO, WORLD    |
     | [about] [work]  |
     '-----------------'
        personal web`,
  pomodoro: () => String.raw`
          .---.
       .-' 25  '-.
      /     :     \
     |     00      |
      \    FOCUS   /
       '-.______.-'
        [ start ]`,
  budget: () => String.raw`
      .-------------.
     /   Rp150.000  \
    |    _______    |
    |   |  coin  |  |
    |   |_______|  |
     \   SAVE MORE /
      '-----------'
       [ budget ]`,
  'quiz-game': () => String.raw`
     +-----------------+
     | Q: 2 + 2 = ?    |
     | [A] 3  [B] 4    |
     | [C] 5  [D] 6    |
     +-----------------+
        score: 100
       [ quiz game ]`,
  'data-detective': () => String.raw`
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
      [ detective ]`,
  'pixel-garden': () => String.raw`
     +-----------------+
     | .  .  *  .  .  . |
     | .  /\ *  .  /\ . |
     | * /  \  . /  \ *|
     | . \__/  . \__/ .|
     +-----------------+
       plant pixels`,
};

const fallbackArt = tag => String.raw`
      .-----------.
     /             \
    |    ${tag}      |
     \             /
      '-----------'
     [ code quest ]
      /  |  |  \\`;

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
