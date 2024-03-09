let gameMap = {
   name: "gameMap",
   id: "curectMap",
   values: [],
};
//generats a random map using perlin noise based on a random seed
//every time
function generateRandomMap() {
   const TILE_SIZE = 20;

   //setting a seed randomly
   let seed = Math.random();
   noise.seed(seed);

   //getting the total about of tiles for the height and width of the map
   //based on how many would fit for the given tile size
   const numTilesX = Math.ceil(canvas.width / TILE_SIZE);
   const numTilesY = Math.ceil(canvas.height / TILE_SIZE);

   //the heights wich we generate different types of terrian
   var creeks = 0.0001;
   var plains = 0.35;
   var forests = 0.55;
   var mountains = 0.65;
   var moutainForests = 0.725;
   var lakes = 0.85;

   //looping adding terrian tilesin the correct location based on the
   //width and height also based on height of the perlin noise
   //also adding a little more randomness to make it look better
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
//generats a random map based using perlin noise based on a set seed
//picked by the user every time
function generateMapOfCustomSeed(seed) {
   const TILE_SIZE = 20;

   //setting seed that the user picked
   noise.seed(seed);

   //getting the total about of tiles for the height and width of the map
   //based on how many would fit for the given tile size
   const numTilesX = Math.ceil(canvas.width / TILE_SIZE);
   const numTilesY = Math.ceil(canvas.height / TILE_SIZE);

   //the heights wich we generate different types of terrian
   var creeks = 0.0001;
   var plains = 0.35;
   var forests = 0.55;
   var mountains = 0.65;
   var moutainForests = 0.725;
   var lakes = 0.85;

   //looping adding terrian tilesin the correct location based on the
   //width and height also based on height of the perlin noise
   //also adding a little more randomness to make it look better
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
//this get is a handy funtion written by chat gpt
//that get a random number between min and max
//i use this everywhere for randomization
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}
