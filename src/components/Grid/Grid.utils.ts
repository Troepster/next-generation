export function stayingAlive(board: [number][], x: number, y: number): boolean {
  // console.log(board, x, y);
  const size = board.length - 1;
  const alive = !!board[y][x];
  const yMinOne = y === 0 ? size : y - 1;
  const yPlusOne = y === size ? 0 : y + 1;
  const xMinOne = x === 0 ? size : x - 1;
  const xPlusOne = x === size ? 0 : x + 1;
  // console.log(
  //   'yMinOne',
  //   yMinOne,
  //   'yPlusOne',
  //   yPlusOne,
  //   'xMinOne',
  //   xMinOne,
  //   'xPlusOne',
  //   xPlusOne,
  //   size
  // );
  let aliveNeighbourCount = 0;
  aliveNeighbourCount += board[yMinOne][xMinOne] ? 1 : 0;
  aliveNeighbourCount += board[yMinOne][x] ? 1 : 0;
  aliveNeighbourCount += board[yMinOne][xPlusOne] ? 1 : 0;
  aliveNeighbourCount += board[y][xMinOne] ? 1 : 0;
  aliveNeighbourCount += board[y][xPlusOne] ? 1 : 0;
  aliveNeighbourCount += board[yPlusOne][xMinOne] ? 1 : 0;
  aliveNeighbourCount += board[yPlusOne][x] ? 1 : 0;
  aliveNeighbourCount += board[yPlusOne][xPlusOne] ? 1 : 0;
  // aliveNeighbourCount >= 2 &&
  //   aliveNeighbourCount <= 3 &&
  //   console.log('y', y, 'x', x, aliveNeighbourCount);
  // A Cell with fewer than two live neighbours dies of under-population.
  // A Cell with 2 or 3 live neighbours lives on to the next generation.
  // A Cell with more than 3 live neighbours dies of overcrowding.
  // An empty Cell with exactly 3 live neighbours “comes to life”.
  // A Cell who “comes to life” outside the board should wrap at the other side of the board.
  let returnAlive;
  if (alive) {
    returnAlive = aliveNeighbourCount >= 2 && aliveNeighbourCount <= 3;
  } else {
    returnAlive = aliveNeighbourCount === 3;
  }
  return returnAlive;
}
