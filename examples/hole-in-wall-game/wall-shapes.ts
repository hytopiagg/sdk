const GAME_WALL_SHAPES = [
  // lol shape
  [
    [0, 1, 0, 1, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 1, 0, 1],
  ],
  // stairs
  [
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  // horizontal bar
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  // vertical bars
  [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ],
  // lattice
  [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ],
  // platforming hole
  [
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 2, 2, 1, 1, 1],
    [1, 1, 2, 1, 1, 2, 1, 1],
    [1, 2, 1, 1, 1, 1, 2, 1],
    [2, 1, 1, 1, 1, 1, 1, 2],
  ],
  // 3d stairs
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 2, 1, 1, 2, 1, 2],
    [2, 3, 2, 3, 3, 2, 3, 2],
    [3, 3, 3, 3, 3, 3, 3, 3],
  ],
  // 3d lattice
  [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [1, 0, 2, 0, 2, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [1, 0, 3, 0, 3, 0, 1, 0],
  ],
  // full wall
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  // zig zag challenge
  [
    [1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1],
  ],
  // triple jump
  [
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 1, 1, 1],
  ],
  // layered tunnel
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 2, 0, 0, 1],
    [1, 0, 0, 3, 3, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  // diagonal dash
  [
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0],
  ],
  // wave rider
  [
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
  ],
  // forward momentum
  [
    [1, 1, 2, 2, 3, 3, 3, 3],
    [1, 1, 2, 2, 3, 3, 3, 3],
    [1, 1, 2, 2, 3, 3, 3, 3],
  ],
  // spiral staircase
  [
    [1, 1, 1, 1, 2, 2, 3, 3],
    [3, 3, 1, 1, 1, 2, 2, 2],
    [2, 3, 3, 1, 1, 1, 1, 2],
    [2, 2, 2, 3, 3, 1, 1, 1],
  ],
  // hopscotch
  [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ],
  // snake path
  [
    [1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3],
  ],
  // diamond gate
  [
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 2, 0, 0, 2, 0, 1],
    [0, 0, 0, 3, 3, 0, 0, 0],
    [1, 0, 2, 0, 0, 2, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
  ],
];

export default GAME_WALL_SHAPES;