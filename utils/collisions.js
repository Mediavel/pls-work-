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
      this.type = "water";
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
      this.type = "moutain";
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
      this.type = "forest";
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
      this.type = "plain";
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
function rectangularCollision({ rect1, rect2 }) {
   return (
      rect1.positionx + rect1.width >= rect2.position.x &&
      rect1.positionx <= rect2.position.x + rect2.width &&
      rect1.positiony + rect1.height >= rect2.position.y &&
      rect1.positiony <= rect2.position.y + rect2.height
   );
}
//runs calculations for hitboxes of every unit every game loop
function handleHitBoxes() {
   //plains
   for (let u = 0; u < side1.length; u++) {
      for (let b = 0; b < plainsBoxes.length; b++) {
         unitsOnTerrain(side1[u], plainsBoxes[b]);
         if (unitsOnTerrain(side1[u], plainsBoxes[b])) break;
      }
   }
   //forests
   for (let u = 0; u < side1.length; u++) {
      for (let b = 0; b < forestBoxes.length; b++) {
         unitsOnTerrain(side1[u], forestBoxes[b]);
         if (unitsOnTerrain(side1[u], forestBoxes[b])) break;
      }
   }
   //moutains
   for (let u = 0; u < side1.length; u++) {
      for (let b = 0; b < moutainBoxes.length; b++) {
         unitsOnTerrain(side1[u], moutainBoxes[b]);
         if (unitsOnTerrain(side1[u], moutainBoxes[b])) break;
      }
   }
   //water
   for (let u = 0; u < side1.length; u++) {
      for (let b = 0; b < waterBoxes.length; b++) {
         unitsOnTerrain(side1[u], waterBoxes[b]);
         if (unitsOnTerrain(side1[u], waterBoxes[b])) break;
      }
   }
}
