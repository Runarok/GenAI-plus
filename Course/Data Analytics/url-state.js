// ── URL Hash State Persistence ───────────────────────────────────────────────
//
// Hash format:
//
//   #ch2
//   #ch1-qz3-m
//   #ch1-qz3-t
//   #ch1-qz3-l
//
// ─────────────────────────────────────────────────────────────────────────────

(function () {

  // Save initial hash
  const initialHash = location.hash;


  // ── Parse Hash ────────────────────────────────────────────────────────────

  function parseHash(hashStr) {

    const h = (hashStr || '')
      .replace('#', '')
      .trim();

    if (!h) return null;

    const parts = h.split('-');

    // Chapter
    const chMatch = parts[0].match(/^ch(\d+)$/i);

    if (!chMatch) return null;

    const chIndex = parseInt(chMatch[1], 10) - 1;

    const chapter =
      chapters.internship.chapters[chIndex];

    if (!chapter) return null;


    // Only chapter
    if (parts.length === 1) {

      return {
        chapterId: chapter.id,
        quizId: null,
        mode: null
      };
    }


    // Quiz
    const qzMatch = parts[1].match(/^qz(\d+)$/i);

    if (!qzMatch) return null;

    const qzIndex = parseInt(qzMatch[1], 10) - 1;

    const quiz = chapter.quizzes[qzIndex];

    if (!quiz) return null;


    // Mode
    const modeCode = (parts[2] || 'm')
      .toLowerCase();

    let mode = 'mode-select';

    if (modeCode === 't') {
      mode = 'take';
    }

    if (modeCode === 'l') {
      mode = 'learn';
    }

    return {
      chapterId: chapter.id,
      quizId: quiz.id,
      mode
    };
  }


  // ── Restore App State ────────────────────────────────────────────────────

  function restoreFromHash(hashStr) {

    const parsed = parseHash(hashStr);

    // No valid hash
    if (!parsed) {

      showChapters();

      return;
    }

    const {
      chapterId,
      quizId,
      mode
    } = parsed;


    // Open chapter
    if (!quizId) {

      selectChapter(chapterId);

      return;
    }


    // Open quiz mode selection
    selectChapter(chapterId);

    selectQuiz(quizId);


    // Learn mode
    if (mode === 'learn') {

      startLearnMode();

      return;
    }


    // Take quiz
    if (mode === 'take') {

      startQuiz();

      return;
    }
  }


  // ── Initial Restore ──────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', () => {

    if (initialHash) {

      restoreFromHash(initialHash);
    }
  });


  // ── Browser Back / Forward ───────────────────────────────────────────────

  window.addEventListener('hashchange', () => {

    restoreFromHash(location.hash);
  });

})();