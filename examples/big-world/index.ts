import {
  startServer,
  PlayerEntity,
} from 'hytopia';

import worldMap from './assets/map.json';

/**
 * This example loads and simulates extremely large map that is
 * 750^2 blocks in area. Approximately 2,000,000+ blocks are loaded,
 * resulting in thousands of chunks and a large amount of physics vertices.
 * 
 * This example is meant to showcase the performance of the server.
 * When dealing with large fully simulated worlds, as well as benchmark
 * and test client performance.
 * 
 * Client load times may take a few seconds because batch
 * loading is not yet implemented.
 */

startServer(world => {
  world.loadMap(worldMap);

  // Spawn a player entity when a player joins the game.
  world.onPlayerJoin = player => {
    const playerEntity = new PlayerEntity({
      player,
      name: 'Player',
      modelUri: 'models/player.gltf',
      modelLoopedAnimations: [ 'idle' ],
      modelScale: 0.5,
    });
  
    playerEntity.spawn(world, { x: 0, y: 10, z: 0 });
  };

  // Despawn all player entities when a player leaves the game.
  world.onPlayerLeave = player => {
    world.entityManager.getAllPlayerEntities(player).forEach(entity => entity.despawn());
  };
});