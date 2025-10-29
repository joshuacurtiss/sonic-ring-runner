import k from "../kaplayCtx";

export function makeSonic(pos) {
   return k.add([
      k.sprite('sonic', { anim: 'run' }),
      k.scale(4),
      k.area(),
      k.anchor('center'),
      k.pos(pos),
      k.body({ jumpForce: 1700 }),
      {
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
      }, {
         pointIndicator(msg) {
            const txt = k.add([
               k.text(msg, { size: 40, font: 'mania' }),
               k.color(255, 255, 0),
               k.anchor('center'),
               k.pos(this.pos.x, this.pos.y - 80),
               k.opacity(1),
            ]);
            txt.onUpdate(()=>{
               txt.move(0, -25);
               txt.opacity -= 0.008;
               if (txt.opacity<=0) txt.destroy();
            });
         },
      },
   ]);
}
