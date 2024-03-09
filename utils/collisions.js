let collisionsMap = [];
let waterBoxes = [];
let forestBoxes = [];
let moutainBoxes = [];
let plainsBoxes = [];
let collisionSize = 20.5;
class Water {
   static width = collisionSize;
   static height = collisionSize;
   constructor({ position }) {
      this.position = position;
      this.width = collisionSize;
      this.height = collisionSize;
   }
   draw() {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}
class Moutain {
   static width = collisionSize;
   static height = collisionSize;
   constructor({ position }) {
      this.position = position;
      this.width = collisionSize;
      this.height = collisionSize;
   }
   draw() {
      ctx.fillStyle = "gray";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}
class Forest {
   static width = collisionSize;
   static height = collisionSize;
   constructor({ position }) {
      this.position = position;
      this.width = collisionSize;
      this.height = collisionSize;
   }
   draw() {
      ctx.fillStyle = "darkgreen";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}
class Plain {
   static width = collisionSize;
   static height = collisionSize;
   constructor({ position }) {
      this.position = position;
      this.width = collisionSize;
      this.height = collisionSize;
   }
   draw() {
      ctx.fillStyle = "green";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}

//places hitboxes where they need to be when building a map
function placeCollisions() {
   //resets values
   waterBoxes = [];
   forestBoxes = [];
   moutainBoxes = [];
   plainsBoxes = [];
   collisionsMap = [];
   for (let i = 0; i < gameMap.values.length; i += 96) {
      collisionsMap.push(gameMap.values.slice(i, 96 + i));
   }

   collisionsMap.forEach((row, i) => {
      //for every collision on map
      row.forEach((symbol, j) => {
         //detect what kind of collision
         if (symbol == "wB") {
            //and sort them into there own arrays
            waterBoxes.push(
               //then place them in there correct position
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
                     x: j * Forest.width,
                     y: i * Forest.height,
                  },
               })
            );
         } else if (symbol == "hG") {
            moutainBoxes.push(
               new Moutain({
                  position: {
                     x: j * Moutain.width,
                     y: i * Moutain.height,
                  },
               })
            );
         } else if (symbol == "gG") {
            plainsBoxes.push(
               new Plain({
                  position: {
                     x: j * Plain.width,
                     y: i * Plain.height,
                  },
               })
            );
         }
      });
   });
   //console.log(mapHitboxes);
}
//calculates rect collisions
function rectangularCollision({ rectangle1, rectangle2 }) {
   return (
      rectangle1.positionx + rectangle1.width >= rectangle2.position.x &&
      rectangle1.positionx <= rectangle2.position.x + rectangle2.width &&
      rectangle1.positiony + rectangle1.height >= rectangle2.position.y &&
      rectangle1.positiony <= rectangle2.position.y + rectangle2.height
   );
}
//runs calculations for hitboxes of every unit every game loop
function handleHitBoxes() {
   //plains
   for (let i = 0; i < side1.length; i++) {
      for (let j = 0; j < plainsBoxes.length; j++) {
         if (
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: plainsBoxes[j],
            })
         ) {
            side1[i].speed = side1[i].baseSpeed;
            side1[i].range = side1[i].baseRange;
            side1[i].accuracy = side1[i].baseAccuracy;
            side1[i].cover = side1[i].baseCover;
            if (renderStats)
               console.log(
                  `Plain S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         }
      }
   }
   //forests
   for (let i = 0; i < side1.length; i++) {
      for (let j = 0; j < forestBoxes.length; j++) {
         if (
            //if unit is colliding and unit is type "Infantry"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: forestBoxes[j],
            }) &&
            side1[i].unitType == "Infantry"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.5;
            side1[i].range = side1[i].baseRange * 0.9;
            side1[i].accuracy = side1[i].baseAccuracy + 10;
            side1[i].cover = side1[i].baseCover + 20;
            if (renderStats)
               console.log(
                  `Forest S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         } else if (
            //if unit is colliding and unit is type Calvery
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: forestBoxes[j],
            }) &&
            side1[i].unitType == "Calvary"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.33;
            side1[i].range = side1[i].baseRange * 0.75;
            side1[i].accuracy = side1[i].baseAccuracy - 10;
            side1[i].cover = side1[i].baseCover + 5;
            if (renderStats)
               console.log(
                  `Forest S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
         } else if (
            //if unit is colliding and unit is type Cannon
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: forestBoxes[j],
            }) &&
            side1[i].unitType == "Cannon"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.15;
            side1[i].range = side1[i].baseRange * 0.5;
            side1[i].accuracy = side1[i].baseAccuracy - 15;
            side1[i].cover = side1[i].baseCover + 10;
            if (renderStats)
               console.log(
                  `Forest S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         } else if (
            //if unit is colliding and unit is type General
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: forestBoxes[j],
            }) &&
            side1[i].unitType == "General"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.6;
            side1[i].range = side1[i].baseRange;
            side1[i].accuracy = side1[i].baseAccuracy = 15;
            side1[i].cover = side1[i].baseCover + 25;
            if (renderStats)
               console.log(
                  `Forest S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         }
      }
   }
   //moutains
   for (let i = 0; i < side1.length; i++) {
      for (let j = 0; j < moutainBoxes.length; j++) {
         if (
            //if unit is colliding and unit is type "Infantry"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: moutainBoxes[j],
            }) &&
            side1[i].unitType == "Infantry"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.25;
            side1[i].range = side1[i].baseRange * 1.5;
            side1[i].accuracy = side1[i].baseAccuracy + 5;
            side1[i].cover = side1[i].baseCover + 10;
            if (renderStats)
               console.log(
                  `Moutain S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         } else if (
            //if unit is colliding and unit is type "Calvary"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: moutainBoxes[j],
            }) &&
            side1[i].unitType == "Calvary"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.2;
            side1[i].range = side1[i].baseRange * 1.5;
            side1[i].accuracy = side1[i].baseAccuracy;
            side1[i].cover = side1[i].baseCover - 5;
            if (renderStats)
               console.log(
                  `Moutain S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         } else if (
            //if unit is colliding and unit is type "Cannon"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: moutainBoxes[j],
            }) &&
            side1[i].unitType == "Cannon"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.15;
            side1[i].range = side1[i].baseRange * 1.5;
            side1[i].accuracy = side1[i].baseAccuracy + 5;
            side1[i].cover = side1[i].baseCover + 5;
            if (renderStats)
               console.log(
                  `Moutain S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         } else if (
            //if unit is colliding and unit is type "General"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: moutainBoxes[j],
            }) &&
            side1[i].unitType == "General"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.35;
            side1[i].range = side1[i].baseRange * 1.5;
            side1[i].accuracy = side1[i].baseAccuracy + 10;
            side1[i].cover = side1[i].baseCover + 15;
            if (renderStats)
               console.log(
                  `Moutain S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         }
      }
   }
   //water
   for (let i = 0; i < side1.length; i++) {
      for (let j = 0; j < waterBoxes.length; j++) {
         if (
            //if unit is colliding and unit is type "Infantry"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: waterBoxes[j],
            }) &&
            side1[i].unitType == "Infantry"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.15;
            side1[i].range = side1[i].baseRange * 0.5;
            side1[i].accuracy = side1[i].baseAccuracy - 15;
            side1[i].cover = side1[i].baseCover - 15;
            if (renderStats)
               console.log(
                  `Water S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         } else if (
            //if unit is colliding and unit is type "Calvary"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: waterBoxes[j],
            }) &&
            side1[i].unitType == "Calvary"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.1;
            side1[i].range = side1[i].baseRange;
            side1[i].accuracy = side1[i].baseAccuracy;
            side1[i].cover = side1[i].baseCover + 25;
            if (renderStats)
               console.log(
                  `Water S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         } else if (
            //if unit is colliding and unit is type "Cannon"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: waterBoxes[j],
            }) &&
            side1[i].unitType == "Cannon"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.075;
            side1[i].range = side1[i].baseRange * 0.75;
            side1[i].accuracy = side1[i].baseAccuracy - 15;
            side1[i].cover = side1[i].baseCover - 10;
            if (renderStats)
               console.log(
                  `Water S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         } else if (
            //if unit is colliding and unit is type "General"
            rectangularCollision({
               rectangle1: side1[i],
               rectangle2: waterBoxes[j],
            }) &&
            side1[i].unitType == "General"
         ) {
            side1[i].speed = side1[i].baseSpeed * 0.25;
            side1[i].range = side1[i].baseRange * 0.9;
            side1[i].accuracy = side1[i].baseAccuracy - 5;
            side1[i].cover = side1[i].baseCover - 5;
            if (renderStats)
               console.log(
                  `Water S${side1[i].speed} R${side1[i].range} A${side1[i].accuracy} C${side1[i].cover}`
               );
            break;
         }
      }
   }
}

//old way of runing calculations for hitboxes of every unit every game loop
function OldhandleHitboxes() {
   waterBoxes.forEach((boundary) => {
      if (renderHitBoxes) boundary.draw();
      side1.forEach((unit) => {
         if (
            rectangularCollision({
               rectangle1: unit,
               rectangle2: boundary,
            })
         ) {
            console.log("WATER");
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
