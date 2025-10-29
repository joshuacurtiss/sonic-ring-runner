import k from "../kaplayCtx";

export function makeSideScroller(objectArray, initialSpeed=0) {
   let _speed = initialSpeed;
   const objects = objectArray;
   k.onUpdate(()=>{
      const [ a, b ] = objects;
      if (b.pos.x<0) {
         const { scale, width } = b;
         a.moveTo(b.pos.x + width * scale.x, b.pos.y);
         objects.push(objects.shift());
      }
      objects.forEach(obj=>obj.move(_speed, 0));
   });
   return {
      set speed(value) { _speed = value },
      get speed() { return _speed },
   };
};
