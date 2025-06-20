<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [Simulation](./server.simulation.md)

## Simulation class

Represents the physics simulation for a world.

**Signature:**

```typescript
export default class Simulation extends EventRouter 
```
**Extends:** [EventRouter](./server.eventrouter.md)

## Remarks

The simulation internally and automatically handles the physical interactions, collisions, contact forces, and events for all aspects of the world. Most methods are not often used directly, but are provided for advanced usage.

<h2>Events</h2>

This class is an EventRouter, and instances of it emit events with payloads listed under [SimulationEventPayloads](./server.simulationeventpayloads.md)

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Simulation` class.

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

[gravity](./server.simulation.gravity.md)


</td><td>

`readonly`


</td><td>

RAPIER.Vector3


</td><td>

The gravity vector for the simulation.


</td></tr>
<tr><td>

[isDebugRaycastingEnabled](./server.simulation.isdebugraycastingenabled.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the simulation has debug raycasting enabled


</td></tr>
<tr><td>

[isDebugRenderingEnabled](./server.simulation.isdebugrenderingenabled.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the simulation has debug rendering enabled.


</td></tr>
<tr><td>

[timestepS](./server.simulation.timesteps.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The fixed timestep for the simulation.


</td></tr>
<tr><td>

[world](./server.simulation.world.md)


</td><td>

`readonly`


</td><td>

[World](./server.world.md)


</td><td>

The world the simulation is for.


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

[enableDebugRaycasting(enabled)](./server.simulation.enabledebugraycasting.md)


</td><td>


</td><td>

Enables or disables debug raycasting for the simulation. This will render lines for the raycast that disappear after a few seconds.


</td></tr>
<tr><td>

[enableDebugRendering(enabled, filterFlags)](./server.simulation.enabledebugrendering.md)


</td><td>


</td><td>

Enables or disables debug rendering for the simulation. When enabled, all colliders and rigid body outlines will be rendered in the world. Do not enable this in production. In large worlds enabling this can cause noticable lag and RTT spikes.


</td></tr>
<tr><td>

[getContactManifolds(colliderHandleA, colliderHandleB)](./server.simulation.getcontactmanifolds.md)


</td><td>


</td><td>

Gets the contact manifolds for a pair of colliders.


</td></tr>
<tr><td>

[intersectionsWithRawShape(rawShape, position, rotation, options)](./server.simulation.intersectionswithrawshape.md)


</td><td>


</td><td>

Gets the intersections with a raw shape.


</td></tr>
<tr><td>

[raycast(origin, direction, length, options)](./server.simulation.raycast.md)


</td><td>


</td><td>

Casts a ray through the simulation.


</td></tr>
<tr><td>

[setGravity(gravity)](./server.simulation.setgravity.md)


</td><td>


</td><td>

Sets the gravity vector for the simulation.


</td></tr>
</tbody></table>
