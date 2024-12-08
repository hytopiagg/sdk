<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [HYTOPIA](./server.hytopia.md) &gt; [BlockType](./server.hytopia.blocktype.md) &gt; [onEntityContactForce](./server.hytopia.blocktype.onentitycontactforce.md)

## HYTOPIA.BlockType.onEntityContactForce property

A callback function that is invoked when an entity contacts a block of this type.

**Signature:**

```typescript
onEntityContactForce?: (blockType: BlockType, entity: Entity, contactForceData: ContactForceData) => void;
```

## Remarks

This must be set before a block of this type is created. If it is set after a block is created, only future created blocks of this type will have the callback set.

