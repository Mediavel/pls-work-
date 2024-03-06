let gameMap = {
   name: "gameMap",
   id: "curectMap",
   values: [],
};
function generateRandomMap() {
   const TILE_SIZE = 20;

   //noise.seed(Math.random());
   const seed = Math.random();
   noise.seed(seed);
   //noise.seed(45);

   const numTilesX = Math.ceil(canvas.width / TILE_SIZE);
   const numTilesY = Math.ceil(canvas.height / TILE_SIZE);

   var creeks = 0.0001;
   var plains = 0.35;
   var forests = 0.55;
   var mountains = 0.65;
   var moutainForests = 0.725;
   var lakes = 0.85;

   for (var y = 0; y < numTilesY; y++) {
      for (var x = 0; x < numTilesX; x++) {
         // Generate Perlin noise value for the tile
         var value = Math.abs(noise.perlin2(x / 30, y / 30)); // Adjust scale as needed

         // Assign terrain type based on noise value
         if (value < creeks) {
            let creekRandom = getRandomInt(1, 4);
            while (creekRandom != 4) {
               if (gameMap.values.length < mapsize) gameMap.values.push("wB");
               creekRandom++;
            }
         } else if (value < plains) {
            if (gameMap.values.length < mapsize) gameMap.values.push("gG");
         } else if (value < forests) {
            if (gameMap.values.length < mapsize) gameMap.values.push("fG");
         } else if (value < mountains) {
            let moutainRandom = getRandomInt(1, 2);
            while (moutainRandom != 2) {
               if (gameMap.values.length < mapsize) gameMap.values.push("hG");
               moutainRandom++;
            }
         } else if (value < moutainForests) {
            if (gameMap.values.length < mapsize) gameMap.values.push("fG");
         } else if (value < lakes) {
            if (gameMap.values.length < mapsize) gameMap.values.push("wB");
            lakeRandom = 0;
         } else {
            if (gameMap.values.length < mapsize) gameMap.values.push("hG");
         }
      }
   }
   console.log("Seed:", seed);
   //console.log(gameMap.values);
}
function generateMapOfCustomSeed() {
   const TILE_SIZE = 20;

   //noise.seed(Math.random());
   noise.seed(map);

   const numTilesX = Math.ceil(canvas.width / TILE_SIZE);
   const numTilesY = Math.ceil(canvas.height / TILE_SIZE);

   var creeks = 0.0001;
   var plains = 0.35;
   var forests = 0.55;
   var mountains = 0.65;
   var moutainForests = 0.725;
   var lakes = 0.85;

   for (var y = 0; y < numTilesY; y++) {
      for (var x = 0; x < numTilesX; x++) {
         // Generate Perlin noise value for the tile
         var value = Math.abs(noise.perlin2(x / 30, y / 30)); // Adjust scale as needed

         // Assign terrain type based on noise value
         if (value < creeks) {
            let creekRandom = getRandomInt(1, 4);
            while (creekRandom != 4) {
               if (gameMap.values.length < mapsize) gameMap.values.push("wB");
               creekRandom++;
            }
         } else if (value < plains) {
            if (gameMap.values.length < mapsize) gameMap.values.push("gG");
         } else if (value < forests) {
            if (gameMap.values.length < mapsize) gameMap.values.push("fG");
         } else if (value < mountains) {
            let moutainRandom = getRandomInt(1, 2);
            while (moutainRandom != 2) {
               if (gameMap.values.length < mapsize) gameMap.values.push("hG");
               moutainRandom++;
            }
         } else if (value < moutainForests) {
            if (gameMap.values.length < mapsize) gameMap.values.push("fG");
         } else if (value < lakes) {
            if (gameMap.values.length < mapsize) gameMap.values.push("wB");
            lakeRandom = 0;
         } else {
            if (gameMap.values.length < mapsize) gameMap.values.push("hG");
         }
      }
   }
   console.log("Seed:", map);
   //console.log(gameMap.values);
}
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}
