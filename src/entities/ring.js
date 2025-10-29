import k from '../kaplayCtx';

export function makeRing(pos) {
   return k.add([
      k.sprite('ring', { anim: 'spin' }),
      k.area(),
      k.scale(4),
      k.pos(pos),
      k.anchor('center'),
      k.offscreen(),
      'ring',
   ]);
}
