let gameMap = {
   name: "gameMap",
   id: "curectMap",
   values: [],
};
function generateRandomMap() {
   const TILE_SIZE = 20;

   // Seed the noise generator with a random value
   noise.seed(Math.random());

   // Define tile size
   const numTilesX = Math.ceil(canvas.width / TILE_SIZE);
   const numTilesY = Math.ceil(canvas.height / TILE_SIZE);

   // Define terrain type thresholds (adjust these as needed)
   var creeks = 0.0001;
   var plains = 0.3;
   var forests = 0.5;
   var mountains = 0.65;
   var lakes = 0.85;

   for (var y = 0; y < numTilesY; y++) {
      for (var x = 0; x < numTilesX; x++) {
         // Generate Perlin noise value for the tile
         var value = Math.abs(noise.perlin2(x / 30, y / 30)); // Adjust scale as needed

         // Assign terrain type based on noise value
         if (value < creeks) {
            let creekRandom = getRandomInt(1, 4);
            while (creekRandom != 4) {
               gameMap.values.push("wB");
               creekRandom++;
            }
            creekRandom = 0;
         } else if (value < plains) {
            gameMap.values.push("gG");
         } else if (value < forests) {
            let forestRandom = getRandomInt(1, 2);
            while (forestRandom != 2) {
               gameMap.values.push("fG");
               forestRandom++;
            }
            forestRandom = 0;
         } else if (value < mountains) {
            let moutainRandom = getRandomInt(1, 2);
            while (moutainRandom != 2) {
               gameMap.values.push("hG");
               moutainRandom++;
            }
            moutainRandom = 0;
         } else if (value < lakes) {
            let lakeRandom = getRandomInt(1, 2);
            while (lakeRandom != 2) {
               gameMap.values.push("wB");
               lakeRandom++;
            }
            lakeRandom = 0;
         } else {
            gameMap.values.push("hG");
         }
      }
   }
}
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}
document.addEventListener("keypress", (event) => {
   if (event.key == " ") {
      buildMap();
   }
});
