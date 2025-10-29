import k from '../kaplayCtx'
import { makeSonic } from '../entities/sonic';
import { makeRing } from '../entities/ring';

export default function mainMenu() {
   if (!k.getData('best-score')) k.setData('best-score', 0);
   k.onButtonPress('jump', ()=>k.go('game'));
   const gameSpeed = 2000;
   const bgScale = 2;
   const bgPieceWidth = 1920;
   const bgPieces = [
      k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(bgScale), k.opacity(0.8)]),
      k.add([k.sprite('chemical-bg'), k.pos(bgPieceWidth*bgScale, 0), k.scale(bgScale), k.opacity(0.8)]),
   ];
   const platformScale = 4;
   const platformWidth = 1280;
   const platforms = [
      k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(platformScale)]),
      k.add([k.sprite('platforms'), k.pos(platformWidth*platformScale, 450), k.scale(platformScale)]),
   ];
   const sonic = makeSonic(k.vec2(bgPieceWidth*2, 745));
   sonic.onCollide('ring', (r)=>{
      k.destroy(r);
   });
   k.add([
      k.text('SONIC RING RUNNER', { size: 96, font: 'mania' }),
      k.pos(k.center().x, 200),
      k.anchor('center'),
   ]);
   k.add([
      k.text('Press Space/Click/Touch to Play', { size: 32, font: 'mania' }),
      k.pos(k.center().x, 350),
      k.anchor('center'),
   ]);
   k.onUpdate(()=>{
      if (bgPieces[1].pos.x<0) {
         bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * bgScale, bgPieces[1].pos.y);
         bgPieces.push(bgPieces.shift());
      }
      if (platforms[1].pos.x<0) {
         platforms[0].moveTo(platforms[1].pos.x + platformWidth * platformScale, platforms[1].pos.y);
         platforms.push(platforms.shift());
      }
      if (sonic.pos.x>bgPieceWidth+sonic.width*4) sonic.moveTo(-sonic.width*2, sonic.pos.y);
      bgPieces.forEach(p=>p.move(-gameSpeed/20, 0));
      platforms.forEach(p=>p.move(-gameSpeed, 0));
      sonic.move(50, 0);
   });
   const spawnRing = ()=>{
      const ring = makeRing(k.vec2(1950, 745));
      ring.onUpdate(()=>{
         ring.move(-gameSpeed, 0);
      });
      ring.onExitScreen(()=>{
         if (ring.pos.x<0) ring.destroy();
      });
      k.wait(k.rand(0.5, 3), spawnRing);
   }
   spawnRing();
}
