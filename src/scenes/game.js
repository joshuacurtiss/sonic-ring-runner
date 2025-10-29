import k from '../kaplayCtx';
import { makeSonic } from '../entities/sonic';
import { makeMotobug } from '../entities/motobug';
import { makeRing } from '../entities/ring';

export default function game() {
   k.setGravity(3100);
   let score = 0;
   let scoreMultiplier = 0;
   const scoreText = k.add([
      k.text('Score: 0', { size: 72, font: 'mania' }),
      k.pos(20, 20),
   ]);
   const citySfx = k.play('city', { volume: 0.2, loop: true });
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
   const sonic = makeSonic(k.vec2(200, 745));
   sonic.setControls();
   sonic.setEvents();
   sonic.onCollide('enemy', (e)=>{
      if (!sonic.isGrounded()) {
         k.play('destroy', { volume: 0.5 });
         k.play('hyper-ring', { volume: 0.5 });
         k.destroy(e);
         sonic.play('jump');
         sonic.jump();
         const scoreInc = 10 * ++scoreMultiplier;
         score += scoreInc;
         scoreText.text = `Score: ${score}`;
         sonic.ringCollectUI.text = `+${scoreInc}`;
         k.wait(0.5, ()=>{ sonic.ringCollectUI.text = '' });
         return;
      }
      k.play('hurt', { volume: 0.5 });
      k.setData('current-score', score);
      k.go('gameover', citySfx);
   });
   sonic.onCollide('ring', (r)=>{
      k.play('ring', { volume: 0.5 });
      k.destroy(r);
      score += 1;
      scoreText.text = `Score: ${score}`;
      sonic.ringCollectUI.text = `+1`;
      k.wait(0.5, ()=>{ sonic.ringCollectUI.text = '' });
   });
   k.add([
      k.rect(bgPieceWidth, 100),
      k.opacity(0),
      k.area(),
      k.pos(0, 832),
      k.body({ isStatic: true }),
   ]);
   let gameSpeed = 300;
   k.loop(1, ()=>{
      gameSpeed += 50;
   });
   k.onUpdate(()=>{
      if (sonic.isGrounded()) {
         scoreMultiplier = 0;
      }
      if (bgPieces[1].pos.x<0) {
         bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * bgScale, bgPieces[1].pos.y);
         bgPieces.push(bgPieces.shift());
      }
      if (platforms[1].pos.x<0) {
         platforms[0].moveTo(platforms[1].pos.x + platformWidth * platformScale, platforms[1].pos.y);
         platforms.push(platforms.shift());
      }
      bgPieces.forEach(p=>p.move(-gameSpeed/20, 0));
      platforms.forEach(p=>p.move(-gameSpeed, 0));
   });
   const spawnMotobug = ()=>{
      const motobug = makeMotobug(k.vec2(1950, 773));
      motobug.onUpdate(()=>{
         const speed = gameSpeed<3000 ? gameSpeed + 300 : gameSpeed;
         motobug.move(-speed, 0);
      });
      motobug.onExitScreen(()=>{
         if (motobug.pos.x<0) motobug.destroy();
      });
      k.wait(k.rand(0.5, 2.5), spawnMotobug);
   }
   spawnMotobug();
   const spawnRing = ()=>{
      const ring = makeRing(k.vec2(1950, 745));
      ring.onUpdate(()=>{
         const speed = gameSpeed<3000 ? gameSpeed + 300 : gameSpeed;
         ring.move(-speed, 0);
      });
      ring.onExitScreen(()=>{
         if (ring.pos.x<0) ring.destroy();
      });
      k.wait(k.rand(0.5, 3), spawnRing);
   }
   spawnRing();
}
