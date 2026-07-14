(() => {
  'use strict';

  class QuestionEngine {
    constructor({ generator, onRender, onProgress, onFinish, onFeedback }) {
      this.generator = generator;
      this.onRender = onRender;
      this.onProgress = onProgress;
      this.onFinish = onFinish;
      this.onFeedback = onFeedback;
      this.reset();
    }

    reset() {
      this.total = 0;
      this.index = 0;
      this.correct = 0;
      this.level = 1;
      this.answers = [];
      this.current = null;
      this.startedAt = 0;
      this.questionStartedAt = 0;
      this.locked = false;
    }

    start(total = 20, mode = 'adaptive') {
      this.reset();
      this.total = total;
      this.mode = mode;
      this.startedAt = Date.now();
      this.next();
    }

    next() {
      if (this.index >= this.total) {
        this.onFinish?.(this.summary());
        return;
      }
      this.current = this.generator.generate(this.index, this.level);
      this.questionStartedAt = Date.now();
      this.locked = false;
      this.onProgress?.({
        current: this.index + 1,
        total: this.total,
        level: this.current.level,
        progress: ((this.index + 1) / this.total) * 100
      });
      this.onRender?.(this.current);
    }

    answer(optionIndex) {
      if (this.locked || !this.current) return;
      this.locked = true;
      const correct = optionIndex === this.current.answerIndex;
      const responseMs = Date.now() - this.questionStartedAt;
      if (correct) this.correct += 1;

      this.answers.push({
        id: this.current.id,
        correct,
        responseMs,
        level: this.current.level,
        selected: optionIndex,
        answer: this.current.answerIndex
      });

      if (this.mode === 'adaptive') {
        if (correct && responseMs < 18000) this.level = Math.min(10, this.level + 1);
        if (!correct) this.level = Math.max(1, this.level - 1);
      } else {
        this.level = 1 + Math.floor(((this.index + 1) / Math.max(1, this.total)) * 10);
        this.level = Math.min(10, this.level);
      }

      this.onFeedback?.({ correct, correctIndex: this.current.answerIndex });
      this.index += 1;
      setTimeout(() => this.next(), 520);
    }

    summary() {
      const elapsedMs = Date.now() - this.startedAt;
      return {
        total: this.total,
        correct: this.correct,
        percent: Math.round((this.correct / Math.max(1, this.total)) * 100),
        elapsedMs,
        averageMs: Math.round(elapsedMs / Math.max(1, this.total)),
        answers: [...this.answers]
      };
    }
  }

  window.QuestionEngine = QuestionEngine;
})();