export default function destroyOffscreenLeft() {
   return {
      add() {
         this.onExitScreen(() => { if (this.pos.x<0) this.destroy() });
      },
   };
}
