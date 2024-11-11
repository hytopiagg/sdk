<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [Simulation](./server.simulation.md)

## Simulation class

**Signature:**

```typescript
export default class Simulation 
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

[(constructor)(world, tickRate, gravity)](./server.simulation._constructor_.md)


</td><td>


</td><td>

Constructs a new instance of the `Simulation` class


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

[colliderMap](./server.simulation.collidermap.md)


</td><td>

`readonly`


</td><td>

[ColliderMap](./server.collidermap.md)


</td><td>


</td></tr>
<tr><td>

[gravity](./server.simulation.gravity.md)


</td><td>

`readonly`


</td><td>

RAPIER.Vector3


</td><td>


</td></tr>
<tr><td>

[step](./server.simulation.step.md)


</td><td>


</td><td>

(tickDeltaMs: number) =&gt; void


</td><td>


</td></tr>
<tr><td>

[timestepS](./server.simulation.timesteps.md)


</td><td>

`readonly`


</td><td>

number


</td><td>


</td></tr>
<tr><td>

[world](./server.simulation.world.md)


</td><td>

`readonly`


</td><td>

[World](./server.world.md)


</td><td>


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

[castRay(origin, direction, length, options)](./server.simulation.castray.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[createRawCollider(rawColliderDesc, rawParent)](./server.simulation.createrawcollider.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[createRawRigidBody(rawRigidBodyDesc)](./server.simulation.createrawrigidbody.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[removeRawCollider(rawCollider)](./server.simulation.removerawcollider.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[removeRawRigidBody(rawRigidBody)](./server.simulation.removerawrigidbody.md)


</td><td>


</td><td>


</td></tr>
</tbody></table>