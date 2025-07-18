<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [ChunkLattice](./server.chunklattice.md)

## ChunkLattice class

A lattice of chunks that represent a world's terrain.

**Signature:**

```typescript
export default class ChunkLattice extends EventRouter 
```
**Extends:** [EventRouter](./server.eventrouter.md)

## Remarks

The ChunkLattice lattice tracks the current terrain of a world, comprised of [Chunk](./server.chunk.md) instances.

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(world)](./server.chunklattice._constructor_.md)


</td><td>


</td><td>

Creates a new chunk lattice instance.


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

[chunkCount](./server.chunklattice.chunkcount.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The number of chunks in the lattice.


</td></tr>
<tr><td>

[world](./server.chunklattice.world.md)


</td><td>

`readonly`


</td><td>

[World](./server.world.md)


</td><td>

The world that the chunk lattice belongs to.


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

[clear()](./server.chunklattice.clear.md)


</td><td>


</td><td>

Removes and clears all chunks and their blocks from the lattice.


</td></tr>
<tr><td>

[getAllChunks(tickAllocated)](./server.chunklattice.getallchunks.md)


</td><td>


</td><td>

Get all chunks in the lattice.


</td></tr>
<tr><td>

[getBlockId(globalCoordinate)](./server.chunklattice.getblockid.md)


</td><td>


</td><td>

Get the block type id at a specific global coordinate.


</td></tr>
<tr><td>

[getBlockType(globalCoordinate)](./server.chunklattice.getblocktype.md)


</td><td>


</td><td>

Get the block type at a specific global coordinate.


</td></tr>
<tr><td>

[getBlockTypeCount(blockTypeId)](./server.chunklattice.getblocktypecount.md)


</td><td>


</td><td>

Get the number of blocks of a specific block type in the lattice.


</td></tr>
<tr><td>

[getChunk(globalCoordinate)](./server.chunklattice.getchunk.md)


</td><td>


</td><td>

Get the chunk that contains the given global coordinate.


</td></tr>
<tr><td>

[getOrCreateChunk(globalCoordinate)](./server.chunklattice.getorcreatechunk.md)


</td><td>


</td><td>

Get the chunk for a given global coordinate.


</td></tr>
<tr><td>

[hasBlock(globalCoordinate)](./server.chunklattice.hasblock.md)


</td><td>


</td><td>

Check if a block exists at a specific global coordinate.


</td></tr>
<tr><td>

[hasChunk(globalCoordinate)](./server.chunklattice.haschunk.md)


</td><td>


</td><td>

Check if a chunk exists for a given global coordinate.


</td></tr>
<tr><td>

[setBlock(globalCoordinate, blockTypeId)](./server.chunklattice.setblock.md)


</td><td>


</td><td>

Set the block at a global coordinate by block type id, automatically creating a chunk if it doesn't exist. Use block type id 0 for air (to remove a block).


</td></tr>
</tbody></table>
