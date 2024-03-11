function unitsOnTerrain(unit, terrain) {
   if (
      //if unit is colliding and unit is type "Any" and if terrain is type "plain"
      terrain.type == "plain" &&
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      })
   ) {
      {
         unit.speed = unit.baseSpeed;
         unit.range = unit.baseRange;
         unit.accuracy = unit.baseAccuracy;
         unit.cover = unit.baseCover;
      }
   }

   if (
      //if unit is colliding and unit is type "Infantry" and if terrain is type "forest"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Infantry" &&
      terrain.type == "forest"
   ) {
      unit.speed = unit.baseSpeed * 0.5;
      unit.range = unit.baseRange * 0.9;
      unit.accuracy = unit.baseAccuracy + 10;
      unit.cover = unit.baseCover + 20;
   } else if (
      //if unit is colliding and unit is type Calvery and if terrain is type "forest"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Calvary" &&
      terrain.type == "forest"
   ) {
      unit.speed = unit.baseSpeed * 0.33;
      unit.range = unit.baseRange * 0.75;
      unit.accuracy = unit.baseAccuracy - 10;
      unit.cover = unit.baseCover + 5;
   } else if (
      //if unit is colliding and unit is type Cannon and if terrain is type "forest"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Cannon" &&
      terrain.type == "forest"
   ) {
      unit.speed = unit.baseSpeed * 0.15;
      unit.range = unit.baseRange * 0.5;
      unit.accuracy = unit.baseAccuracy - 15;
      unit.cover = unit.baseCover + 10;
   } else if (
      //if unit is colliding and unit is type General and if terrain is type "forest"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "General" &&
      terrain.type == "forest"
   ) {
      unit.speed = unit.baseSpeed * 0.6;
      unit.range = unit.baseRange;
      unit.accuracy = unit.baseAccuracy = 15;
      unit.cover = unit.baseCover + 25;
   }

   if (
      //if unit is colliding and unit is type "Infantry" and if terrain is type "moutain"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Infantry" &&
      terrain.type == "moutain"
   ) {
      unit.speed = unit.baseSpeed * 0.25;
      unit.range = unit.baseRange * 1.5;
      unit.accuracy = unit.baseAccuracy + 5;
      unit.cover = unit.baseCover + 10;
   } else if (
      //if unit is colliding and unit is type "Calvary" and if terrain is type "moutain"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Calvary" &&
      terrain.type == "moutain"
   ) {
      unit.speed = unit.baseSpeed * 0.2;
      unit.range = unit.baseRange * 1.5;
      unit.accuracy = unit.baseAccuracy;
      unit.cover = unit.baseCover - 5;
   } else if (
      //if unit is colliding and unit is type "Cannon" and if terrain is type "moutain"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Cannon" &&
      terrain.type == "moutain"
   ) {
      unit.speed = unit.baseSpeed * 0.15;
      unit.range = unit.baseRange * 1.5;
      unit.accuracy = unit.baseAccuracy + 5;
      unit.cover = unit.baseCover + 5;
   } else if (
      //if unit is colliding and unit is type "General" and if terrain is type "moutain"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "General" &&
      terrain.type == "moutain"
   ) {
      unit.speed = unit.baseSpeed * 0.35;
      unit.range = unit.baseRange * 1.5;
      unit.accuracy = unit.baseAccuracy + 10;
      unit.cover = unit.baseCover + 15;
   }

   if (
      //if unit is colliding and unit is type "Infantry"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Infantry" &&
      terrain.type == "water"
   ) {
      unit.speed = unit.baseSpeed * 0.15;
      unit.range = unit.baseRange * 0.5;
      unit.accuracy = unit.baseAccuracy - 15;
      unit.cover = unit.baseCover - 15;
   } else if (
      //if unit is colliding and unit is type "Calvary"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Calvary" &&
      terrain.type == "water"
   ) {
      unit.speed = unit.baseSpeed * 0.1;
      unit.range = unit.baseRange;
      unit.accuracy = unit.baseAccuracy;
      unit.cover = unit.baseCover + 25;
   } else if (
      //if unit is colliding and unit is type "Cannon"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "Cannon" &&
      terrain.type == "water"
   ) {
      unit.speed = unit.baseSpeed * 0.075;
      unit.range = unit.baseRange * 0.75;
      unit.accuracy = unit.baseAccuracy - 15;
      unit.cover = unit.baseCover - 10;

      unit;
   } else if (
      //if unit is colliding and unit is type "General"
      rectangularCollision({
         rect1: unit,
         rect2: terrain,
      }) &&
      unit.unitType == "General" &&
      terrain.type == "water"
   ) {
      unit.speed = unit.baseSpeed * 0.25;
      unit.range = unit.baseRange * 0.9;
      unit.accuracy = unit.baseAccuracy - 5;
      unit.cover = unit.baseCover - 5;
   }
}
function logStats(unit) {
   if (renderStats)
      console.log(
         `Speed ${unit.speed}  Range ${unit.range}  Accuracy ${unit.accuracy}  Cover ${unit.cover}`
      );
}
