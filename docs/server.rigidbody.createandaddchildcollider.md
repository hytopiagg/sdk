<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [RigidBody](./server.rigidbody.md) &gt; [createAndAddChildCollider](./server.rigidbody.createandaddchildcollider.md)

## RigidBody.createAndAddChildCollider() method

Creates and adds a child collider to the rigid body for the simulation it belongs to.

**Signature:**

```typescript
createAndAddChildCollider(colliderOptions: ColliderOptions): Collider;
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

[ColliderOptions](./server.collideroptions.md)


</td><td>

The options for the child collider to add.


</td></tr>
</tbody></table>
**Returns:**

[Collider](./server.collider.md)

The child collider that was added to the rigid body.

## Remarks

If the rigid body is not simulated, the collider will be added to the rigid body as a pending child collider and also simulated when the rigid body is simulated.
