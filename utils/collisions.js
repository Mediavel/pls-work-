let collisionsMap = [];
let waterBoxes = [];
let forestBoxes = [];
let moutainBoxes = [];
let renderHitBoxes = false;

function makeCollisionBoxesOnMap() {
   1;
   waterBoxes = [];
   forestBoxes = [];
   moutainBoxes = [];
   collisionsMap = [];
   for (let i = 0; i < gameMap.values.length; i += 96) {
      collisionsMap.push(gameMap.values.slice(i, 96 + i));
   }

   //console.log(collisionsMap);
   collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
         if (symbol == "wB") {
            waterBoxes.push(
               new Water({
                  position: {
                     x: j * Water.width,
                     y: i * Water.height,
                  },
               })
            );
         } else if (symbol == "fG") {
            forestBoxes.push(
               new Forest({
                  position: {
                     x: j * Water.width,
                     y: i * Water.height,
                  },
               })
            );
         } else if (symbol == "hG") {
            moutainBoxes.push(
               new Moutain({
                  position: {
                     x: j * Water.width,
                     y: i * Water.height,
                  },
               })
            );
         }
      });
   });
   //console.log(mapHitboxes);
}
function rectangularCollision({ rectangle1, rectangle2 }) {
   return (
      rectangle1.positionx + rectangle1.width >= rectangle2.position.x &&
      rectangle1.positionx <= rectangle2.position.x + rectangle2.width &&
      rectangle1.positiony + rectangle1.height >= rectangle2.position.y &&
      rectangle1.positiony <= rectangle2.position.y + rectangle2.height
   );
}
function handleHitboxes() {
   waterBoxes.forEach((boundary) => {
      if (renderHitBoxes) boundary.draw();
      side1.forEach((unit) => {
         if (
            rectangularCollision({
               rectangle1: unit,
               rectangle2: boundary,
            })
         ) {
            console.log("they are touching water");
         }
      });
   });
   forestBoxes.forEach((boundary) => {
      if (renderHitBoxes) boundary.draw();
      side1.forEach((unit) => {
         if (
            rectangularCollision({
               rectangle1: unit,
               rectangle2: boundary,
            })
         ) {
            console.log("they are touching forests");
         }
      });
   });
   moutainBoxes.forEach((boundary) => {
      if (renderHitBoxes) boundary.draw();
      side1.forEach((unit) => {
         if (
            rectangularCollision({
               rectangle1: unit,
               rectangle2: boundary,
            })
         ) {
            console.log("they are touching moutains");
         }
      });
   });
}
class Water {
   static width = 20.5;
   static height = 20.5;
   constructor({ position }) {
      this.position = position;
      this.width = 20.5;
      this.height = 20.5;
   }
   draw() {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}
class Moutain {
   static width = 20.5;
   static height = 20.5;
   constructor({ position }) {
      this.position = position;
      this.width = 20.5;
      this.height = 20.5;
   }
   draw() {
      ctx.fillStyle = "gray";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}
class Forest {
   static width = 20.5;
   static height = 20.5;
   constructor({ position }) {
      this.position = position;
      this.width = 20.5;
      this.height = 20.5;
   }
   draw() {
      ctx.fillStyle = "green";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}
class Test {
   static width = 20.5;
   static height = 20.5;
   constructor({ position }) {
      this.position = position;
      this.width = 20.5;
      this.height = 20.5;
   }
   draw() {
      ctx.fillStyle = "gold";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}
