<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [Collider](./server.collider.md)

## Collider class

Represents a collider in a world's physics simulation.

**Signature:**

```typescript
export default class Collider extends EventRouter 
```
**Extends:** [EventRouter](./server.eventrouter.md)

## Remarks

Colliders make up the foundation of the physical interactions in a world. They are highly configurable and have many aspects that can be adjusted both before simulation and while simulated. Colliders will most often be used through passing [ColliderOptions](./server.collideroptions.md) to a [RigidBody](./server.rigidbody.md) or an entity's [EntityOptions](./server.entityoptions.md)<!-- -->.

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(colliderOptions)](./server.collider._constructor_.md)


</td><td>


</td><td>

Constructs a new instance of the `Collider` class


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

[bounciness](./server.collider.bounciness.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The bounciness of the collider.


</td></tr>
<tr><td>

[bouncinessCombineRule](./server.collider.bouncinesscombinerule.md)


</td><td>

`readonly`


</td><td>

[CoefficientCombineRule](./server.coefficientcombinerule.md)


</td><td>

The bounciness combine rule of the collider.


</td></tr>
<tr><td>

[collisionGroups](./server.collider.collisiongroups.md)


</td><td>

`readonly`


</td><td>

[CollisionGroups](./server.collisiongroups.md)


</td><td>

The collision groups the collider belongs to.


</td></tr>
<tr><td>

[friction](./server.collider.friction.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The friction of the collider.


</td></tr>
<tr><td>

[frictionCombineRule](./server.collider.frictioncombinerule.md)


</td><td>

`readonly`


</td><td>

[CoefficientCombineRule](./server.coefficientcombinerule.md)


</td><td>

The friction combine rule of the collider.


</td></tr>
<tr><td>

[isEnabled](./server.collider.isenabled.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the collider is enabled.


</td></tr>
<tr><td>

[isRemoved](./server.collider.isremoved.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the collider has been removed from the simulation.


</td></tr>
<tr><td>

[isSensor](./server.collider.issensor.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the collider is a sensor.


</td></tr>
<tr><td>

[isSimulated](./server.collider.issimulated.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the collider is simulated.


</td></tr>
<tr><td>

[parentRigidBody](./server.collider.parentrigidbody.md)


</td><td>

`readonly`


</td><td>

[RigidBody](./server.rigidbody.md) \| undefined


</td><td>

The parent rigid body of the collider.


</td></tr>
<tr><td>

[rawCollider](./server.collider.rawcollider.md)


</td><td>

`readonly`


</td><td>

[RawCollider](./server.rawcollider.md) \| undefined


</td><td>

The raw collider object from the Rapier physics engine.


</td></tr>
<tr><td>

[rawShape](./server.collider.rawshape.md)


</td><td>

`readonly`


</td><td>

[RawShape](./server.rawshape.md) \| undefined


</td><td>

The raw shape object from the Rapier physics engine.


</td></tr>
<tr><td>

[relativePosition](./server.collider.relativeposition.md)


</td><td>

`readonly`


</td><td>

[Vector3Like](./server.vector3like.md)


</td><td>

The relative position of the collider to its parent rigid body.


</td></tr>
<tr><td>

[relativeRotation](./server.collider.relativerotation.md)


</td><td>

`readonly`


</td><td>

[QuaternionLike](./server.quaternionlike.md)


</td><td>

The relative rotation of the collider.


</td></tr>
<tr><td>

[shape](./server.collider.shape.md)


</td><td>

`readonly`


</td><td>

[ColliderShape](./server.collidershape.md)


</td><td>

The shape of the collider.


</td></tr>
<tr><td>

[tag](./server.collider.tag.md)


</td><td>

`readonly`


</td><td>

string \| undefined


</td><td>

An arbitrary identifier tag of the collider. Useful for your own logic.


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

[addToSimulation(simulation, parentRigidBody)](./server.collider.addtosimulation.md)


</td><td>


</td><td>

Adds the collider to the simulation.


</td></tr>
<tr><td>

[enableCollisionEvents(enabled)](./server.collider.enablecollisionevents.md)


</td><td>


</td><td>

Enables or disables collision events for the collider. This is automatically enabled if an on collision callback is set.


</td></tr>
<tr><td>

[enableContactForceEvents(enabled)](./server.collider.enablecontactforceevents.md)


</td><td>


</td><td>

Enables or disables contact force events for the collider. This is automatically enabled if an on contact force callback is set.


</td></tr>
<tr><td>

[optionsFromBlockHalfExtents(halfExtents)](./server.collider.optionsfromblockhalfextents.md)


</td><td>

`static`


</td><td>

Creates a collider options object from a block's half extents.


</td></tr>
<tr><td>

[optionsFromModelUri(modelUri, scale, preferredShape)](./server.collider.optionsfrommodeluri.md)


</td><td>

`static`


</td><td>

Creates a collider options object from a modelUri with best approximate shape and size.


</td></tr>
<tr><td>

[removeFromSimulation()](./server.collider.removefromsimulation.md)


</td><td>


</td><td>

Removes the collider from the simulation.


</td></tr>
<tr><td>

[scale(scalar)](./server.collider.scale.md)


</td><td>


</td><td>

Scales the collider by the given scalar. Only ball, block, capsule, cone, cylinder, round cylinder are supported.


</td></tr>
<tr><td>

[setBounciness(bounciness)](./server.collider.setbounciness.md)


</td><td>


</td><td>

Sets the bounciness of the collider.


</td></tr>
<tr><td>

[setBouncinessCombineRule(bouncinessCombineRule)](./server.collider.setbouncinesscombinerule.md)


</td><td>


</td><td>

Sets the bounciness combine rule of the collider.


</td></tr>
<tr><td>

[setCollisionGroups(collisionGroups)](./server.collider.setcollisiongroups.md)


</td><td>


</td><td>

Sets the collision groups of the collider.


</td></tr>
<tr><td>

[setEnabled(enabled)](./server.collider.setenabled.md)


</td><td>


</td><td>

Sets whether the collider is enabled.


</td></tr>
<tr><td>

[setFriction(friction)](./server.collider.setfriction.md)


</td><td>


</td><td>

Sets the friction of the collider.


</td></tr>
<tr><td>

[setFrictionCombineRule(frictionCombineRule)](./server.collider.setfrictioncombinerule.md)


</td><td>


</td><td>

Sets the friction combine rule of the collider.


</td></tr>
<tr><td>

[setMass(mass)](./server.collider.setmass.md)


</td><td>


</td><td>

Sets the mass of the collider.


</td></tr>
<tr><td>

[setOnCollision(callback)](./server.collider.setoncollision.md)


</td><td>


</td><td>

Sets the on collision callback for the collider.


</td></tr>
<tr><td>

[setRelativePosition(position)](./server.collider.setrelativeposition.md)


</td><td>


</td><td>

Sets the position of the collider relative to its parent rigid body or the world origin.


</td></tr>
<tr><td>

[setRelativeRotation(rotation)](./server.collider.setrelativerotation.md)


</td><td>


</td><td>

Sets the relative rotation of the collider to its parent rigid body or the world origin.


</td></tr>
<tr><td>

[setSensor(sensor)](./server.collider.setsensor.md)


</td><td>


</td><td>

Sets whether the collider is a sensor.


</td></tr>
<tr><td>

[setTag(tag)](./server.collider.settag.md)


</td><td>


</td><td>

Sets the tag of the collider.


</td></tr>
<tr><td>

[setVoxel(coordinate, filled)](./server.collider.setvoxel.md)


</td><td>


</td><td>

Sets the voxel at the given coordinate as filled or not filled.


</td></tr>
</tbody></table>
