import k from "../kaplayCtx";

export function makeSonic(pos) {
   const sonic = k.add([
      k.sprite('sonic', { anim: 'run' }),
      k.scale(4),
      k.area(),
      k.anchor('center'),
      k.pos(pos),
      k.body({ jumpForce: 1700 }),
      {
         ringCollectUI: null,
         jumping: false,
         customJump() {
            if (this.isGrounded()) {
               this.play('jump');
               this.jumping = true;
               this.jump();
               k.play('jump', { volume: 0.5 });
            }
         },
         setControls() {
            k.onButtonPress('jump', this.customJump.bind(this));
         },
         setEvents() {
            this.onGround(()=>{
               this.play('run');
               this.jumping = false;
            });
         },
      }
   ]);
   sonic.ringCollectUI = sonic.add([
      k.text('', { size: 24, font: 'mania' }),
      k.color(255, 255, 0),
      k.anchor('center'),
      k.pos(30, -10),
   ]);
   return sonic;
}
