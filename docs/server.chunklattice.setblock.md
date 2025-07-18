<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [ChunkLattice](./server.chunklattice.md) &gt; [setBlock](./server.chunklattice.setblock.md)

## ChunkLattice.setBlock() method

Set the block at a global coordinate by block type id, automatically creating a chunk if it doesn't exist. Use block type id 0 for air (to remove a block).

**Signature:**

```typescript
setBlock(globalCoordinate: Vector3Like, blockTypeId: number): void;
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

globalCoordinate


</td><td>

[Vector3Like](./server.vector3like.md)


</td><td>

The global coordinate of the block to set.


</td></tr>
<tr><td>

blockTypeId


</td><td>

number


</td><td>

The block type id to set. Use 0 to remove the block and replace with air.


</td></tr>
</tbody></table>
**Returns:**

void

