import k from '../kaplayCtx';
import score from '../abilities/score';
import { makeMessage } from '../entities/message';
import { makeSonic } from '../entities/sonic';
import { makeMotobug } from '../entities/motobug';
import { makeRing } from '../entities/ring';
import { makeSideScroller } from '../entities/side-scroller';

export default function game() {
   k.setGravity(3100);
   let scoreMultiplier = 0;
   const scoreText = k.add([
      k.text('Score: ', { size: 72, font: 'mania' }),
      k.pos(20, 20),
      score(0),
   ]);
   k.add([
      k.text('m', { size: 72, font: 'mania' }),
      k.pos(1900, 20),
      k.anchor('topright'),
   ])
   const distanceText = k.add([
      k.text('Distance: ', { size: 72, font: 'mania' }),
      k.pos(1850, 20),
      k.anchor('topright'),
      score(0),
   ]);
   const citySfx = k.play('city', { volume: 0.2, loop: true });
   const bg = makeSideScroller([0,0].map(_=>k.add([k.sprite('chemical-bg'), k.pos(0), k.scale(2), k.opacity(0.8)])));
   const platform = makeSideScroller([0,0].map(_=>k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(4)])), -350);
   const sonic = makeSonic(k.vec2(200, 745));
   sonic.onCollide('enemy', (e)=>{
      if (!sonic.isGrounded()) {
         k.play('destroy', { volume: 0.5 });
         k.play('hyper-ring', { volume: 0.5 });
         k.destroy(e);
         sonic.play('jump');
         // Consider the variable jump done since this is a bounce off enemy
         sonic.endVariableJump();
         sonic.jump();
         const scoreInc = 25 * ++scoreMultiplier;
         scoreText.score += scoreInc;
         makeMessage(sonic.pos.sub(0, 80), `+${scoreInc}`);
         return;
      }
      k.play('hurt', { volume: 0.5 });
      k.setData('current-score', Math.ceil(scoreText.score));
      k.setData('current-distance', Math.ceil(distanceText.score));
      k.go('gameover', citySfx);
   });
   sonic.onCollide('ring', (r)=>{
      k.play('ring', { volume: 0.5 });
      k.destroy(r);
      scoreText.score += 5;
      makeMessage(sonic.pos.sub(0, 80), '+5');
   });
   sonic.onGround(()=>{
      scoreMultiplier = 0;
   });
   k.add([
      k.rect(k.width(), 100),
      k.opacity(0),
      k.area(),
      k.pos(0, 832),
      k.body({ isStatic: true }),
   ]);
   k.loop(1, ()=>{
      platform.speed -= 50;
      bg.speed = platform.speed / 20;
   });
   k.onUpdate(()=>{
      // Update score/distance based on distance traveled
      scoreText.score += -platform.speed/1000 * k.dt();
      distanceText.score += -platform.speed/500 * k.dt();
   });
   const spawnMotobug = ()=>{
      const motobug = makeMotobug(k.vec2(1950, 773));
      motobug.onUpdate(()=>{
         motobug.move(platform.speed > -3000 ? platform.speed - 300 : platform.speed, 0);
      });
      k.wait(k.rand(0.5, 2.5), spawnMotobug);
   }
   spawnMotobug();
   const spawnRing = ()=>{
      const ring = makeRing(k.vec2(1950, 745));
      ring.onUpdate(()=>{ ring.move(platform.speed, 0) });
      k.wait(k.rand(0.5, 3), spawnRing);
   }
   spawnRing();
}
