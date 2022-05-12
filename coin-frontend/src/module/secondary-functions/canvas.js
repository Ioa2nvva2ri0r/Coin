export function drawingAGraph(
  canvas,
  { rectBox: container, rectWidth: width, rectIndent: [indent1, indent2] },
  arrayAmount,
  maxAmount,
  column,
  color,
  clear = true
) {
  if (clear === true) container.clearRect(0, 0, canvas.width, canvas.height);
  container.fillStyle = color;

  arrayAmount.forEach((amount, id) => {
    const percent = ((amount * 100) / maxAmount).toFixed(2);
    const columnHeigth = ((canvas.height * percent) / 100).toFixed(2);
    const x = parseInt(indent1 + id * indent2);
    const y = parseInt(canvas.height - columnHeigth);
    const height = amount * column;
    container.fillRect(x, y, width, height);
  });
}
