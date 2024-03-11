function drawLineDiagonalLeft(width, height, positionx, positiony, ctx) {
   ctx.beginPath();
   ctx.moveTo(positionx + width, positiony);
   ctx.lineTo(positionx, positiony + height);
   ctx.stroke();
}
function drawLineDiagonalRight(width, height, positionx, positiony, ctx) {
   ctx.beginPath();
   ctx.moveTo(positionx, positiony);
   ctx.lineTo(positionx + width, positiony + height);
   ctx.stroke();
}
function drawHorizontalLine(width, positionx, positiony, ctx) {
   ctx.beginPath();
   ctx.moveTo(positionx, positiony);
   ctx.lineTo(positionx + width, positiony);
   ctx.stroke();
}
function drawVerticalLine(height, positionx, positiony, ctx) {
   ctx.beginPath();
   ctx.moveTo(positionx, positiony);
   ctx.lineTo(positionx, positiony + height);
   ctx.stroke();
}
function outlineUnit(width, height, positionx, positiony, ctx) {
   ctx.strokeStyle = "#ffffff";
   //left vertical line
   ctx.beginPath();
   ctx.moveTo(positionx, positiony);
   ctx.lineTo(positionx, positiony + height);
   ctx.stroke();
   // top horizontal line
   ctx.beginPath();
   ctx.moveTo(positionx, positiony);
   ctx.lineTo(positionx + width, positiony);
   ctx.stroke();
   //right vertical line
   ctx.beginPath();
   ctx.moveTo(positionx + width, positiony);
   ctx.lineTo(positionx + width, positiony + height);
   ctx.stroke();
   //bottom horizontal line
   ctx.beginPath();
   ctx.moveTo(positionx + width, positiony + height);
   ctx.lineTo(positionx, positiony + height);
   ctx.stroke();
   ctx.strokeStyle = "#000000";
}
//draws a circle with set arguments
function drawCircle(ctx, x, y, radius) {
   ctx.beginPath();
   ctx.arc(x, y, radius, 0, 2 * Math.PI);
   ctx.strokeStyle = "black"; // Set the outline color to black
   ctx.stroke(); // Draw the outline
   ctx.closePath();
}
