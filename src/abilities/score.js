export default function score(startScore) {
   let baseText = '';
   let _score = startScore;
   let scoreInt;
   return {
      writeScore() {
         const newScoreInt = Math.floor(_score);
         if (newScoreInt !== scoreInt) {
            scoreInt = newScoreInt;
            this.text = baseText + scoreInt;
         }
      },
      set score(val) {
         _score = val;
         this.writeScore();
      },
      get score() {
         return _score;
      },
      add() {
         baseText = this.text;
         this.writeScore();
      },
   }
}
