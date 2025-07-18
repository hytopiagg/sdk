<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [ChunkLatticeEventPayloads](./server.chunklatticeeventpayloads.md)

## ChunkLatticeEventPayloads interface

Event payloads for ChunkLattice emitted events.

**Signature:**

```typescript
export interface ChunkLatticeEventPayloads 
```

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

["CHUNK\_LATTICE.REMOVE\_CHUNK"](./server.chunklatticeeventpayloads._chunk_lattice.remove_chunk_.md)


</td><td>


</td><td>

{ chunkLattice: [ChunkLattice](./server.chunklattice.md)<!-- -->; chunk: [Chunk](./server.chunk.md)<!-- -->; }


</td><td>

Emitted when a chunk is removed from the lattice.


</td></tr>
<tr><td>

["CHUNK\_LATTICE.SET\_BLOCK"](./server.chunklatticeeventpayloads._chunk_lattice.set_block_.md)


</td><td>


</td><td>

{ chunkLattice: [ChunkLattice](./server.chunklattice.md)<!-- -->; chunk: [Chunk](./server.chunk.md)<!-- -->; globalCoordinate: [Vector3Like](./server.vector3like.md)<!-- -->; localCoordinate: [Vector3Like](./server.vector3like.md)<!-- -->; blockTypeId: number; }


</td><td>

Emitted when a block is set in the lattice.


</td></tr>
</tbody></table>
