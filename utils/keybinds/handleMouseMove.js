function handleMouseMove(event, dragData) {
  // keep track of how many units are in a column
  let rank = 0;
  let file = 0;

  let numSelected = 0;
  side1.map((unit) => {
    if (unit.selected && dragData.active) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      dragData.endx = x;
      dragData.endy = y;

      if (
        Math.abs(dragData.startx - dragData.endx) >
        Math.abs(dragData.starty - dragData.endy)
      ) {
        // if you dragged to the left
        if (dragData.startx > dragData.endx) {
          //handles horizontal drag formatting

          if (dragData.startx - dragData.endx < numSelected * 35) {
            rank++;
            file--;
            unit.destination.x = dragData.startx;
            unit.destination.y = dragData.starty - rank * 20;
          } else {
            unit.destination.x = dragData.startx - file * 35;
            unit.destination.y = dragData.starty;
            file++;
          }
          unit.destination.orientation = "south";
        } else {
          if (dragData.endx - dragData.startx < numSelected * 35) {
            rank++;
            file--;
            unit.destination.x = dragData.startx;
            unit.destination.y = dragData.starty + rank * 20;
          } else {
            unit.destination.x = dragData.startx + file * 35;
            unit.destination.y = dragData.starty;
            file++;
          }
          unit.destination.orientation = "north";
        }
      } else {
        //handles vertical drag formatting

        if (dragData.starty > dragData.endy) {
          if (dragData.starty - dragData.endy < numSelected * 35) {
            rank++;
            file--;
            unit.destination.y = dragData.starty;
            unit.destination.x = dragData.startx + rank * 20;
          } else {
            unit.destination.x = dragData.startx;
            unit.destination.y = dragData.starty - file * 35;
            file++;
          }
          unit.destination.orientation = "west";
        } else {
          if (dragData.endy - dragData.starty < numSelected * 35) {
            rank++;
            file--;
            unit.destination.y = dragData.starty;
            unit.destination.x = dragData.startx - rank * 20;
          } else {
            unit.destination.x = dragData.startx;
            unit.destination.y = dragData.starty + file * 35;
            file++;
          }

          unit.destination.orientation = "east";
        }
      }
      numSelected++;
    }
  });
  numSelected = 0;
}
