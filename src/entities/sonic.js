import k from "../kaplayCtx";
import variableJump from "../abilities/variable-jump";

export function makeSonic(pos) {
   return k.add([
      k.sprite('sonic', { anim: 'run' }),
      k.scale(4),
      k.area(),
      k.anchor('center'),
      k.pos(pos),
      k.body({ jumpForce: 1700 }),
      k.offscreen(),
      variableJump(),
      {
         add() {
            k.onButtonPress('jump', ()=>{
               if (this.isGrounded()) k.play('jump', { volume: 0.5 });
               this.variableJump();
            });
         },
      },
   ]);
}
