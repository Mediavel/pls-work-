function handleKeypress(event){
    switch (event.key) {
        case "a":
          side1.map((unit) => {
            if (unit.selected) {
              unit.changeOrientation("west");
            }
          });
          break;
        case "w":
          side1.map((unit) => {
            if (unit.selected) {
              unit.changeOrientation("north");
            }
          });
          break;
        case "s":
          side1.map((unit) => {
            if (unit.selected) {
              unit.changeOrientation("south");
            }
          });
          break;
        case "d":
          side1.map((unit) => {
            if (unit.selected) {
              unit.changeOrientation("east");
            }
          });
          break;
      }
}