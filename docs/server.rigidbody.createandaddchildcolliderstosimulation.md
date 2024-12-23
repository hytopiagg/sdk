<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [RigidBody](./server.rigidbody.md) &gt; [createAndAddChildCollidersToSimulation](./server.rigidbody.createandaddchildcolliderstosimulation.md)

## RigidBody.createAndAddChildCollidersToSimulation() method

Creates and adds multiple child colliders to the rigid body for the simulation it belongs to.

**Signature:**

```typescript
createAndAddChildCollidersToSimulation(colliderOptions: ColliderOptions[]): Collider[];
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

colliderOptions


</td><td>

[ColliderOptions](./server.collideroptions.md)<!-- -->\[\]


</td><td>

The options for the child colliders to add to the rigid body.


</td></tr>
</tbody></table>
**Returns:**

[Collider](./server.collider.md)<!-- -->\[\]

The child colliders that were added to the rigid body.

