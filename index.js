const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 1920);
const CANVAS_HEIGHT = (canvas.height = 1080);

const TILE_SIZE = 20.5;

let side1 = [];
let side2 = [];
let side1Unit = null;
let side2Unit = null;

let mapLoaded = false;
//map/seed //0.5256069194573787
let map = 0;
let mapsize = 5086;
let renderHitBoxes = false;
let renderStats = false;
let renderVisibleStats = false;
let dragData = {
   active: false,
   startx: 0,
   starty: 0,
   endx: 0,
   endy: 0,
};

buildMap();

function animate() {
   ctx.fillStyle = "black";

   if (renderHitBoxes) renderBoxes(); //render hitboxes
   else if (!renderHitBoxes) renderMap(); //or render map art
   side1.map((unit) => {
      unit.draw();
      unit.animate();
      if (renderVisibleStats) unit.drawStats();
      logStats(unit);
   });
   side2.map((unit) => {
      unit.draw();
      unit.animate();
      if (renderVisibleStats) unit.drawStats();
   });
   handleHitBoxes();

   requestAnimationFrame(animate);
}
animate();

//calls every function in the right order to build a map based on the map number'
//(0 = random map)(anyknown map number is = that map)(and not known map number is = that seed)
function buildMap() {
   if (map == 0) {
      resetValues();
      generateRandomMap();
      placeCollisions();
      firstRenderOfMap();
      setTimeout(optimizeCanvas, 250);
   } else if (map == 1) {
      resetValues();
      savedMaps();
      placeCollisions();
      firstRenderOfMap();
      setTimeout(optimizeCanvas, 250);
   } else if (map == 2) {
      resetValues();
      savedMaps();
      placeCollisions();
      firstRenderOfMap();
      setTimeout(optimizeCanvas, 250);
   } else if (map == 3) {
      resetValues();
      savedMaps();
      placeCollisions();
      firstRenderOfMap();
      setTimeout(optimizeCanvas, 250);
   } else {
      resetValues();
      generateMapOfCustomSeed(map);
      placeCollisions();
      firstRenderOfMap();
      setTimeout(optimizeCanvas, 250);
   }
}
canvas.addEventListener("mousedown", (event) =>
   handleMousedown(event, dragData)
);

document.addEventListener("keypress", (event) => {
   handleKeypress(event);
});

//drag event listeners
document.addEventListener("mousemove", (event) => {
   handleMouseMove(event, dragData);
});
//on a regular click this will be done imediatly
document.addEventListener("mouseup", () => {
   //reset values after finishing dragging an item
   handleMouseUp(dragData, side1);
});

//keyboard actions
document.addEventListener("keypress", (event) => {
   if (event.key == "1") {
      let coordsX = getRandomInt(100, 1000);
      let coordsY = getRandomInt(100, 1000);
      side1.push(
         new Infantry(
            ctx,
            (color = "red"),
            (positionx = coordsX),
            (positiony = coordsY)
         )
      );
   } else if (event.key == "2") {
      let coordsX = getRandomInt(100, 1000);
      let coordsY = getRandomInt(100, 1000);
      side1.push(
         new Calvary(
            ctx,
            (color = "red"),
            (positionx = coordsX),
            (positiony = coordsY)
         )
      );
   } else if (event.key == "3") {
      let coordsX = getRandomInt(100, 1000);
      let coordsY = getRandomInt(100, 1000);
      side1.push(
         new Cannon(
            ctx,
            (color = "red"),
            (positionx = coordsX),
            (positiony = coordsY)
         )
      );
   } else if (event.key == "4") {
      let coordsX = getRandomInt(100, 1000);
      let coordsY = getRandomInt(100, 1000);
      side1.push(
         new General(
            ctx,
            (color = "red"),
            (positionx = coordsX),
            (positiony = coordsY)
         )
      );
   } else if (event.key == "h" && renderHitBoxes == true)
      renderHitBoxes = false;
   else if (event.key == "h" && renderHitBoxes == false) renderHitBoxes = true;
   else if (event.key == "r" && renderVisibleStats == true)
      renderVisibleStats = false;
   else if (event.key == "r" && renderVisibleStats == false)
      renderVisibleStats = true;
   else if (event.key == "c" && renderStats == true) renderStats = false;
   else if (event.key == "c" && renderStats == false) renderStats = true;
   else if (event.key == "=") findGoodSeeds(0, 175, 1000, 5000, 100, 750, 100);
   else if (event.key == "-") displayFoundSeeds();
   else if (event.key == " ") buildMap();
});
//findGoodSeeds(0, 175, 1250, 5000, 300, 750, 100);
//468 is the max moutains you can have
//2188 is the max forests you can have and 0 is the min
//337 is the max waters you can have and 8 is the min
