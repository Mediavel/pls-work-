function drawDestination(destination, selected, ctx) {
  //display the destination for the player
  if (destination.x && selected) {
    ctx.fillStyle = "#963e3e";
    let width;
    let height;
    if (
      destination.orientation === "east" ||
      destination.orientation === "west"
    ) {
      width = 15;
      height = 30;
    } else {
      width = 30;
      height = 15;
    }
    ctx.fillRect(
      destination.x - width / 2,
      destination.y - height / 2,
      width,
      height
    );

    drawLineDiagonalRight(
      width,
      height,
      destination.x - width / 2,
      destination.y - height / 2,
      ctx
    );
    drawLineDiagonalLeft(
      width,
      height,
      destination.x - width / 2,
      destination.y - height / 2,
      ctx
    );

    if (destination.orientation === "north") {
      ctx.beginPath();
      ctx.moveTo(destination.x - width / 2, destination.y - height / 2 - 3);
      ctx.lineTo(
        destination.x - width / 2 + width,
        destination.y - height / 2 - 3
      );
      ctx.stroke();
    } else if (destination.orientation === "south") {
      ctx.beginPath();
      ctx.moveTo(destination.x - width / 2, destination.y + height / 2 + 3);
      ctx.lineTo(
        destination.x - width / 2 + width,
        destination.y + height / 2 + 3
      );
      ctx.stroke();
    } else if (destination.orientation === "east") {
      ctx.beginPath();
      ctx.moveTo(destination.x + width / 2 + 3, destination.y - height / 2);
      ctx.lineTo(
        destination.x + width / 2 + 3,
        destination.y - height / 2 + height
      );
      ctx.stroke();
    } else if (destination.orientation === "west") {
      ctx.beginPath();
      ctx.moveTo(destination.x - width / 2 - 3, destination.y - height / 2);
      ctx.lineTo(
        destination.x - width / 2 - 3,
        destination.y - height / 2 + height
      );
      ctx.stroke();
    }
  }
}
