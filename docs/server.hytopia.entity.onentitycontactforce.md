<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [HYTOPIA](./server.hytopia.md) &gt; [Entity](./server.hytopia.entity.md) &gt; [onEntityContactForce](./server.hytopia.entity.onentitycontactforce.md)

## HYTOPIA.Entity.onEntityContactForce property

A function that is called when the entity contacts another entity.

**Signature:**

```typescript
onEntityContactForce?: (entity: Entity, otherEntity: Entity, contactForceData: ContactForceData) => void;
```

## Remarks

This must be set before the entity is spawned.

