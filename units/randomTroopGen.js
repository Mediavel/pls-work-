// function generateRandomTroops(Gold) {
//   const troopTypes = ["Infantry"];
//   const troopTypesKeepTrack = ["Cavalry", "Artillery", "General"];
//   let remainingMoney = Gold;
//   let troops = [];
//   while (remainingMoney > 0) {
//     let randomTroop = troopTypes[Math.floor(Math.random() * troopTypes.length)];
//     let troopCost = getTroopCost(randomTroop);
//     if (troopCost <= remainingMoney) {
//       troops[randomTroop] = (troops[randomTroop] || 0) + 1;
//       remainingMoney -= troopCost;
//     }
//   }
//   return troops;
// }

// function getTroopCost(troopType) {
//   const troopCosts = {
//     Infantry: 100,
//     Cavalry: 200,
//     Artillery: 300,
//     General: 400,
//   };

//   return troopCosts[troopType] || 0;
// }

// // Example usage
// let Gold = 5000;
// let randomTroops = generateRandomTroops(Gold);
// c(randomTroops);

// function pushTroopsToMap() {
//   c(`this is random troops length ${randomTroops.length}`);
//   for (let i = 0; i < troops.length; i++) {
//     c(randomTroops);
//     if (randomTroops) {
//       side1.push(
//         new Infantry(
//           ctx,
//           (color = "red"),
//           (positionx = getRandomInt(100, 1000)),
//           (positiony = getRandomInt(100, 1000))
//         )
//       );
//     }
//   }
// }
// pushTroopsToMap();
