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
let map = 0.6845532763878266;
let mapsize = 5086;

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
   //draw terrain
   renderMap();

   handleHitboxes();

   //render all units for both sides
   side1.map((unit) => {
      unit.draw();
      unit.animate();
   });
   side2.map((unit) => {
      unit.draw();
      unit.animate();
   });

   requestAnimationFrame(animate);
}
animate();

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

//temp code from raice for testing
document.addEventListener("keypress", (event) => {
   if (event.key == "Enter") {
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
   }
   if (event.key == "1") renderHitBoxes = true;
   if (event.key == "2") renderHitBoxes = false;
   if (event.key == " ") buildMap();
});
