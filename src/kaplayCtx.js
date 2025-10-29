import kaplay from "kaplay";

const params = new URLSearchParams(window.location.search);
const debug = params.has('debug');

const k = kaplay({
   width: 1920,
   height: 1080,
   letterbox: true,
   background: [0, 0, 0],
   global: false,
   buttons: {
      jump: {
         keyboard: ['space'],
         mouse: 'left',
      },
   },
   touchToMouse: true,
   debugKey: '`',
   debug,
});

export default k;
