import k from '../kaplayCtx';

export function makeMotobug(pos) {
   return k.add([
      k.sprite('motobug', { anim: 'run' }),
      k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }),
      k.scale(4),
      k.pos(pos),
      k.anchor('center'),
      k.offscreen(),
      'enemy',
   ]);
}
