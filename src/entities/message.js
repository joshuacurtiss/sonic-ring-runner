import k from "../kaplayCtx";

export function makeMessage(pos, msg) {
   const txt = k.add([
      k.text(msg, { size: 40, font: 'mania' }),
      k.color(255, 255, 0),
      k.anchor('center'),
      k.pos(pos),
      k.opacity(1),
   ]);
   txt.onUpdate(()=>{
      txt.move(0, -25);
      txt.opacity -= 0.008;
      if (txt.opacity<=0) txt.destroy();
   });
   return txt;
};
