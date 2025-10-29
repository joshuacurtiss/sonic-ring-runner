import k from '../kaplayCtx'

export default function gameOver(citySfx) {
   citySfx.paused = true;
   const currentScore = k.getData('current-score') || 0;
   let bestScore = k.getData('best-score') || 0;
   if (currentScore>bestScore) {
      k.setData('best-score', currentScore);
      bestScore = currentScore;
   }

   const rankGrades = [ 'F', 'E', 'D', 'C', 'B', 'A', 'S' ];
   const rankValues = [ 50, 80, 100, 200, 300, 400, 500 ];

   let currentRank = 'F';
   let bestRank = 'F';

   rankValues.forEach((val, idx)=>{
      if (currentScore>=val) currentRank = rankGrades[idx];
      if (bestScore>=val) bestRank = rankGrades[idx];
   });

   k.add([
      k.text('GAME OVER', { size: 96, font: 'mania' }),
      k.pos(k.center().x, k.center().y - 300),
      k.anchor('center'),
   ]);
   k.add([
      k.text(`BEST SCORE: ${bestScore}`, { size: 64, font: 'mania' }),
      k.anchor('center'),
      k.pos(k.center().x - 400, k.center().y - 200),
   ]);
   k.add([
      k.text(`CURRENT SCORE: ${currentScore}`, { size: 64, font: 'mania' }),
      k.anchor('center'),
      k.pos(k.center().x + 400, k.center().y - 200),
   ]);
   const bestRankBox = k.add([
      k.rect(400, 400, { radius: 4 }),
      k.color(0, 0, 0),
      k.area(),
      k.anchor('center'),
      k.outline(6, k.Color.fromArray([255, 255, 255])),
      k.pos(k.center().x - 400, k.center().y + 50),
   ]);
   bestRankBox.add([
      k.text(bestRank, { size: 100, font: 'mania' }),
      k.anchor('center'),
   ]);
   const currentRankBox = k.add([
      k.rect(400, 400, { radius: 4 }),
      k.color(0, 0, 0),
      k.area(),
      k.anchor('center'),
      k.outline(6, k.Color.fromArray([255, 255, 255])),
      k.pos(k.center().x + 400, k.center().y + 50),
   ]);
   currentRankBox.add([
      k.text(currentRank, { size: 100, font: 'mania' }),
      k.anchor('center'),
   ]);
   k.wait(1, ()=>{
      k.add([
         k.text('Press Space/Click/Touch to Restart', { size: 64, font: 'mania' }),
         k.pos(k.center().x, k.center().y + 350),
         k.anchor('center'),
      ]);
      k.onButtonPress('jump', ()=>{ k.go('game') });
   });
}
