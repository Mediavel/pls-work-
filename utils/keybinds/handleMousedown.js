function handleMousedown(event,dragData) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  side1.map((unit) => {
    if (
      x >= unit.positionx &&
      x <= unit.positionx + unit.width &&
      y >= unit.positiony &&
      y <= unit.positiony + unit.height
    ) {
      unit.selected = true;
    } else {
      if (unit.selected && !event.ctrlKey) {
        
        dragData.startx=x;
        dragData.starty=y
        dragData.active = true;

      } else if(!event.ctrlKey){
        //unselect a unit if it is not selecting another unit
        unit.selected=false
      }
    }
  });
}
