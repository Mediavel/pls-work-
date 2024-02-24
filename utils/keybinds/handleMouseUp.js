function handleMouseUp(dragData, side1){
    if (dragData.active) {
        side1.map((unit) => {
          //trigger the predefined movement
          if (unit.selected) {
            //in case of a normal click
            //since we only set dragData.endx, or endy are only set in the move function when move is active
            //and move is activated at a click
            if( dragData.endx === 0 && dragData.endy===0){
              unit.destination.x=dragData.startx;
              unit.destination.y=dragData.starty;
              unit.destination.orientation=unit.orientation;
            }
            unit.destination.isMoving = true;
            unit.selected = false;
          }
        });
        //reset drag data
        dragData.active=false;
        dragData.startx=0;
        dragData.starty=0;
        dragData.endx=0;
        dragData.endy=0
      }
}