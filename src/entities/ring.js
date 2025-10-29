import k from '../kaplayCtx';
import destroyOffscreenLeft from '../abilities/destroy-offscreen-left'

export function makeRing(pos) {
   return k.add([
      k.sprite('ring', { anim: 'spin' }),
      k.area(),
      k.scale(4),
      k.pos(pos),
      k.anchor('center'),
      k.offscreen(),
      destroyOffscreenLeft(),
      'ring',
   ]);
}
