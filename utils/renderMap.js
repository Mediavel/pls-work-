let waterArray = [
   "sprites/water/0.png",
   "sprites/water/1.png",
   "sprites/water/2.png",
   "sprites/water/3.png",
   "sprites/water/4.png",
   "sprites/water/5.png",
   "sprites/water/6.png",
   "sprites/water/7.png",
   "sprites/water/8.png",
   "sprites/water/9.png",
   "sprites/water/10.png",
   "sprites/water/11.png",
   "sprites/water/12.png",
];
let plainArray = [
   "sprites/plains/0.png",
   "sprites/plains/1.png",
   "sprites/plains/2.png",
   "sprites/plains/3.png",
   "sprites/plains/4.png",
   "sprites/plains/5.png",
   "sprites/plains/6.png",
   "sprites/plains/7.png",
   "sprites/plains/8.png",
   "sprites/plains/9.png",
   "sprites/plains/10.png",
   "sprites/plains/11.png",
   "sprites/plains/12.png",
   "sprites/plains/13.png",
   "sprites/plains/13.png",
   "sprites/plains/13.png",
   "sprites/plains/14.png",
];
let forestArray = [
   "sprites/forests/0.png",
   "sprites/forests/1.png",
   "sprites/forests/2.png",
   "sprites/forests/3.png",
   "sprites/forests/4.png",
   "sprites/forests/5.png",
   "sprites/forests/6.png",
   "sprites/forests/7.png",
];
let moutainArray = [
   "sprites/highground/0.png",
   "sprites/highground/1.png",
   "sprites/highground/2.png",
   "sprites/highground/3.png",
   "sprites/highground/4.png",
   "sprites/highground/5.png",
   "sprites/highground/6.png",
   "sprites/highground/7.png",
   "sprites/highground/8.png",
   "sprites/highground/9.png",
];
function firstRenderOfMap() {
   let x = 0;
   let y = 0;
   let direction;
   for (let i = 0; i + 1 <= gameMap.values.length; i++) {
      //set terrain images
      switch (gameMap.values[i]) {
         case "gG": //green grass
            direction = getDirection();
            let plain = getRandomInt(0, 750);
            if (plain > 16) {
               plain = 0;
               layImgStrict(plainArray[plain], x, y, direction);
            } else if (plain > 12 && plain < 17) {
               layImgStrict(plainArray[0], x, y, direction);
               direction = "N";
               layImgStrict(plainArray[plain], x, y, direction);
            } else if (plain < 13) {
               layImgStrict(plainArray[0], x, y, direction);
               layImg(plainArray[plain], x, y);
            }

            break;

         case "fG": // forest green
            direction = getDirection();
            let forest = getRandomInt(0, 100);
            if (forest < 86 && forest > 4) {
               direction = "N";
               forest = getRandomInt(4, 8);
               layImgStrict(forestArray[0], x, y, direction);
               layImgStrict(forestArray[forest], x, y, direction);
            } else if (forest > 85) {
               layImgStrict(forestArray[0], x, y, direction);
            } else if (forest < 5) {
               forest = getRandomInt(1, 4);
               layImgStrict(forestArray[0], x, y, direction);
               layImg(forestArray[forest], x, y);
            }

            break;

         case "hG": // hills gray
            direction = getDirection();
            let moutain = getRandomInt(0, 40);
            if (moutain > 7) {
               moutain = getRandomInt(0, 3);
               layImgStrict(moutainArray[moutain], x, y, direction);
            } else if (moutain < 8) {
               moutain = getRandomInt(0, 3);
               layImgStrict(moutainArray[moutain], x, y, direction);
               moutain = getRandomInt(3, 8);
               layImg(moutainArray[moutain], x, y);
            }

            break;

         case "wB": //water blue
            direction = getDirection();
            let water = getRandomInt(0, 100);
            if (water > 12) {
               water = getRandomInt(0, 4);
               layImgStrict(waterArray[water], x, y, direction);
            } else if (water < 13) {
               water = getRandomInt(0, 4);
               layImgStrict(waterArray[water], x, y, direction);
               water = getRandomInt(4, 13);
               layImg(waterArray[water], x, y);
            }
      }
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

      if (x <= CANVAS_WIDTH + TILE_SIZE) {
         x = x + TILE_SIZE;
      } else {
         x = 0;
         y = y + TILE_SIZE;
      }
   }
   function layImg(imageSrc, x, y) {
      let maxAngleInDegrees = 360;
      let minAngleInDegrees = 0;
      let angleInRadians =
         ((Math.random() * (maxAngleInDegrees - minAngleInDegrees) +
            minAngleInDegrees) *
            Math.PI) /
         180;
      let img = new Image();
      img.src = imageSrc;
      img.onload = () => {
         ctx.save(); // Save the current canvas state
         ctx.translate(x + TILE_SIZE / 2, y + TILE_SIZE / 2); // Translate to the center of the image
         ctx.rotate(angleInRadians); // Rotate the canvas by the random angle
         ctx.drawImage(
            img,
            -TILE_SIZE / 2,
            -TILE_SIZE / 2,
            TILE_SIZE,
            TILE_SIZE
         ); // Draw the image
         ctx.restore(); // Restore the canvas state
      };
   }
   function layImgStrict(imageSrc, x, y, direction) {
      let angle = 0;
      switch (direction) {
         case "N":
            angle = 0;
            break;
         case "E":
            angle = Math.PI / 2; // 90 degrees in radians
            break;
         case "S":
            angle = Math.PI; // 180 degrees in radians
            break;
         case "W":
            angle = -Math.PI / 2; // -90 degrees in radians
            break;
         default:
            console.error(
               "Invalid direction. Please use 'N', 'E', 'S', or 'W'."
            );
            return; // Exit the function if direction is invalid
      }
      let img = new Image();
      img.src = imageSrc;
      img.onload = function () {
         ctx.save(); // Save the current canvas state
         ctx.translate(x + TILE_SIZE / 2, y + TILE_SIZE / 2); // Translate to the center of the image
         ctx.rotate(angle); // Rotate the canvas
         ctx.drawImage(
            img,
            -TILE_SIZE / 2,
            -TILE_SIZE / 2,
            TILE_SIZE,
            TILE_SIZE
         ); // Draw the image
         ctx.restore(); // Restore the canvas state
      };
   }
   function getDirection(d) {
      d = getRandomInt(1, 5); // Generate a random direction
      if (d === 1) {
         d = "N";
      } else if (d === 2) {
         d = "E";
      } else if (d === 3) {
         d = "S";
      } else if (d === 4) {
         d = "W";
      }
      return d;
   }
}
function optimizeCanvas() {
   currentMap = canvas.toDataURL();
   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
   console.log("optimized");
   mapLoaded = true;
}
function buildMap() {
   if (map == 0) {
      gameMap.values = [];
      side1 = [];
      side2 = [];
      mapLoaded = false;
      generateRandomMap();
      firstRenderOfMap();
      makeCollisionBoxesOnMap();
      setTimeout(optimizeCanvas, 250);
   } else if (map == 1) {
      gameMap.values = mapOne.values;
      side1 = [];
      side2 = [];
      mapLoaded = false;
      firstRenderOfMap();
      setTimeout(optimizeCanvas, 250);
      console.log(gameMap.values);
   } else if (map == 2) {
      gameMap.values = mapTwo.values;
      side1 = [];
      side2 = [];
      mapLoaded = false;
      firstRenderOfMap();
      setTimeout(optimizeCanvas, 250);
      console.log(gameMap.values);
   } else if (map == 3) {
      gameMap.values = mapThree.values;
      side1 = [];
      side2 = [];
      mapLoaded = false;
      firstRenderOfMap();
      setTimeout(optimizeCanvas, 250);
      console.log(gameMap.values);
   } else {
      gameMap.values = [];
      side1 = [];
      side2 = [];
      mapLoaded = false;
      generateMapOfCustomSeed(map);
      firstRenderOfMap();
      makeCollisionBoxesOnMap();
      setTimeout(optimizeCanvas, 250);
   }
}
function renderMap() {
   if (mapLoaded == true) {
      let map = new Image();
      map.onload = () => {
         ctx.drawImage(map, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      };
      map.src = currentMap;
   }
}
