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

//places art
function firstRenderOfMap() {
   let x = 0;
   let y = 0;
   let direction;
   for (let i = 0; i + 1 <= gameMap.values.length; i++) {
      //set terrain images
      switch (gameMap.values[i]) {
         //places grass art on plains biome
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

         //places forest art on forest biome
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

         //places mouitain art on moutain biome
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

         //places water art on water biome
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
   //places a image with a random rotation
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
   //places a image with a rotation of NESW
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
   //get a set direction for layImgStrict of NESW
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
//renders map art on canvas every game loop
function renderMap() {
   // if the canvas is optimized render the map as one big image
   if (mapLoaded == true) {
      let map = new Image();
      map.onload = () => {
         ctx.drawImage(map, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      };
      map.src = currentMap;
   }
}
//renders hitboxes on canvas ever game loop
function renderBoxes() {
   waterBoxes.forEach((bound) => {
      bound.draw();
   });
   forestBoxes.forEach((bound) => {
      bound.draw();
   });
   moutainBoxes.forEach((bound) => {
      bound.draw();
   });
   plainsBoxes.forEach((bound) => {
      bound.draw();
   });
}

//takes the thousands of little images when first rendering map and
//making them all into one image for renderMap()
function optimizeCanvas() {
   //setting everything on the canvas to a single image
   currentMap = canvas.toDataURL();
   //clears canvas
   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
   console.log("optimized");
   //allows rendering of the whole map image to begin
   mapLoaded = true;
}
//resets all values for every new build of a map
function resetValues() {
   gameMap.values = [];
   side1 = [];
   side2 = [];
   mapLoaded = false;
   renderHitBoxes = false;
}
//if the map you want has no values it instead generates a map based on
//that maps seed if the map you have has values it will use those
function savedMaps() {
   if (map == 0) gameMap.values = [];
   else if (map == 1 && mapOne.values.length != 0) {
      gameMap.values = mapOne.values;
   } else if (map == 1 && mapOne.values.length == 0) {
      generateMapOfCustomSeed(mapOne.seed);
   } else if (map == 2 && mapTwo.values.length != 0) {
      gameMap.values = mapTwo.values;
   } else if (map == 2 && mapTwo.values.length == 0) {
      generateMapOfCustomSeed(mapTwo.seed);
   } else if (map == 3 && mapThree.values.length != 0) {
      gameMap.values = mapThree.values;
   } else if (map == 3 && mapThree.values.length == 0) {
      generateMapOfCustomSeed(mapThree.seed);
   } else {
      gameMap.values = [];
   }
}
