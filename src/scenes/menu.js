import k from '../kaplayCtx'
import { makeSonic } from '../entities/sonic';
import { makeRing } from '../entities/ring';
import { makeSideScroller } from '../entities/side-scroller';

export default function mainMenu() {
   if (!k.getData('best-score')) k.setData('best-score', 0);
   k.onButtonPress('jump', ()=>k.go('game'));
   makeSideScroller([0,0].map(_=>k.add([k.sprite('chemical-bg'), k.pos(0), k.scale(2), k.opacity(0.8)])), -100);
   const platform = makeSideScroller([0,0].map(_=>k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(4)])), -2000);
   const sonic = makeSonic(k.vec2(k.width()*2, 745));
   sonic.onCollide('ring', (r)=>{ k.destroy(r) });
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
      if (sonic.isOffScreen()) sonic.moveTo(-sonic.width*2, sonic.pos.y);
      sonic.move(50, 0);
   });
   const spawnRing = ()=>{
      const ring = makeRing(k.vec2(1950, 745));
      ring.onUpdate(()=>{ ring.move(platform.speed, 0) });
      k.wait(k.rand(0.5, 3), spawnRing);
   }
   spawnRing();
}
