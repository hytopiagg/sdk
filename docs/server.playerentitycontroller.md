<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [PlayerEntityController](./server.playerentitycontroller.md)

## PlayerEntityController class

The player entity controller implementation.

**Signature:**

```typescript
export default class PlayerEntityController extends BaseEntityController 
```
**Extends:** [BaseEntityController](./server.baseentitycontroller.md)

## Remarks

This class extends [BaseEntityController](./server.baseentitycontroller.md) and implements the default movement logic for a entity. This is used as the default for players when they join your game. This class may be extended if you'd like to implement additional logic on top of the PlayerEntityController implementation.

## Example


```typescript
// Create a custom entity controller for myEntity, prior to spawning it.
myEntity.setController(new PlayerEntityController(myEntity, {
  jumpVelocity: 10,
  runVelocity: 8,
  walkVelocity: 4,
}));

// Spawn the entity in the world.
myEntity.spawn(world, { x: 53, y: 10, z: 23 });
```

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(options)](./server.playerentitycontroller._constructor_.md)


</td><td>


</td><td>

Constructs a new instance of the `PlayerEntityController` class


</td></tr>
</tbody></table>

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[canJump](./server.playerentitycontroller.canjump.md)


</td><td>


</td><td>

(playerEntityController: [PlayerEntityController](./server.playerentitycontroller.md)<!-- -->) =&gt; boolean


</td><td>

A function allowing custom logic to determine if the entity can jump.


</td></tr>
<tr><td>

[canRun](./server.playerentitycontroller.canrun.md)


</td><td>


</td><td>

(playerEntityController: [PlayerEntityController](./server.playerentitycontroller.md)<!-- -->) =&gt; boolean


</td><td>

A function allowing custom logic to determine if the entity can run.


</td></tr>
<tr><td>

[canWalk](./server.playerentitycontroller.canwalk.md)


</td><td>


</td><td>

(playerEntityController: [PlayerEntityController](./server.playerentitycontroller.md)<!-- -->) =&gt; boolean


</td><td>

A function allowing custom logic to determine if the entity can walk.


</td></tr>
<tr><td>

[isGrounded](./server.playerentitycontroller.isgrounded.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the entity is grounded.


</td></tr>
<tr><td>

[isOnPlatform](./server.playerentitycontroller.isonplatform.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the entity is on a platform, a platform is any entity with a kinematic rigid body.


</td></tr>
<tr><td>

[jumpVelocity](./server.playerentitycontroller.jumpvelocity.md)


</td><td>


</td><td>

number


</td><td>

The upward velocity applied to the entity when it jumps.


</td></tr>
<tr><td>

[platform](./server.playerentitycontroller.platform.md)


</td><td>

`readonly`


</td><td>

[Entity](./server.entity.md) \| undefined


</td><td>

The platform the entity is on, if any.


</td></tr>
<tr><td>

[runVelocity](./server.playerentitycontroller.runvelocity.md)


</td><td>


</td><td>

number


</td><td>

The normalized horizontal velocity applied to the entity when it runs.


</td></tr>
<tr><td>

[walkVelocity](./server.playerentitycontroller.walkvelocity.md)


</td><td>


</td><td>

number


</td><td>

The normalized horizontal velocity applied to the entity when it walks.


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[attach(entity)](./server.playerentitycontroller.attach.md)


</td><td>


</td><td>

Called when the controller is attached to an entity.


</td></tr>
<tr><td>

[spawn(entity)](./server.playerentitycontroller.spawn.md)


</td><td>


</td><td>

Called when the controlled entity is spawned. In PlayerEntityController, this function is used to create the colliders for the entity for wall and ground detection.


</td></tr>
<tr><td>

[tickWithPlayerInput(entity, input, cameraOrientation, deltaTimeMs)](./server.playerentitycontroller.tickwithplayerinput.md)


</td><td>


</td><td>

Ticks the player movement for the entity controller, overriding the default implementation.


</td></tr>
</tbody></table>