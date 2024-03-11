function generateMapForSeedFinding(seed) {
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
            if (gameMap.values.length < mapsize) gameMap.values.push("wB");
         } else if (value < plains) {
            if (gameMap.values.length < mapsize) gameMap.values.push("gG");
         } else if (value < forests) {
            if (gameMap.values.length < mapsize) gameMap.values.push("fG");
         } else if (value < mountains) {
            if (gameMap.values.length < mapsize) gameMap.values.push("hG");
         } else if (value < moutainForests) {
            if (gameMap.values.length < mapsize) gameMap.values.push("fG");
         } else if (value < lakes) {
            if (gameMap.values.length < mapsize) gameMap.values.push("wB");
         } else {
            if (gameMap.values.length < mapsize) gameMap.values.push("hG");
         }
      }
   }
   //console.log("Seed:", seed);
   //console.log(gameMap.values);
}

//finds good seeds based on the arguments you set
function findGoodSeeds(
   minWater,
   maxWater,
   minForests,
   maxForests,
   minMountains,
   maxMountains,
   wantedSeeds
) {
   foundSeeds = [];
   let trySeed = 10;
   let seedToHard = 0;
   mapLoaded = false;

   while (foundSeeds.length < wantedSeeds) {
      let waterCount = 0;
      let forestCount = 0;
      let mountainCount = 0;
      gameMap.values = [];
      generateMapForSeedFinding(trySeed);
      for (let j = 0; j < gameMap.values.length; j++) {
         if (gameMap.values[j] == "wB") waterCount += 1;
         else if (gameMap.values[j] == "fG") forestCount += 1;
         else if (gameMap.values[j] == "hG") mountainCount += 1;
      }
      if (
         waterCount >= minWater &&
         waterCount <= maxWater &&
         forestCount >= minForests &&
         forestCount <= maxForests &&
         mountainCount >= minMountains &&
         mountainCount <= maxMountains
      ) {
         foundSeeds.push(trySeed);
         console.log(trySeed);
      }

      if (seedToHard > 250000) {
         console.warn(`here are the seeds we did find ${foundSeeds}`);
         console.warn("you seed is to hard to find");
         break;
      }
      seedToHard += 1;
      trySeed += 1;
   }

   mapLoaded = true;
   console.log(foundSeeds);
}
//displays the seeds you find
function displayFoundSeeds() {
   resetValues();
   generateMapOfCustomSeed(foundSeeds[displaySeedNumber]);
   console.log(
      `displaying seed ${foundSeeds[displaySeedNumber]} number ${
         displaySeedNumber + 1
      } in the list`
   );
   placeCollisions();
   firstRenderOfMap();
   setTimeout(optimizeCanvas, 250);
   displaySeedNumber += 1;
   if (displaySeedNumber >= foundSeeds.length) displaySeedNumber = 0;
}
