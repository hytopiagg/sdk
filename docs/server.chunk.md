<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [Chunk](./server.chunk.md)

## Chunk class

A 16^3 chunk of blocks. Used to represent a world's terrain.

**Signature:**

```typescript
export default class Chunk implements protocol.Serializable 
```
**Implements:** protocol.Serializable

## Remarks

Chunks make up the bulk of the terrain in a world. Chunks are fixed size, each containing 16^3 possible blocks as a 16x16x16 cube. Chunks are primarily a data structure used by [ChunkLattice](./server.chunklattice.md) to represent a world's terrain. Chunks store their internal block coordinates in local space, meaning local coordinates x: 0...15, y: 0...15, z: 0...15.

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(chunkLattice, originCoordinate)](./server.chunk._constructor_.md)


</td><td>


</td><td>

Creates a new chunk instance.


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

[blocks](./server.chunk.blocks.md)


</td><td>

`readonly`


</td><td>

Readonly&lt;Uint8Array&gt;


</td><td>

The blocks in the chunk as a flat Uint8Array\[4096\], each index as 0 or a block type id.


</td></tr>
<tr><td>

[chunkLattice](./server.chunk.chunklattice.md)


</td><td>

`readonly`


</td><td>

[ChunkLattice](./server.chunklattice.md)


</td><td>

The chunk lattice that the chunk belongs to.


</td></tr>
<tr><td>

[originCoordinate](./server.chunk.origincoordinate.md)


</td><td>

`readonly`


</td><td>

[Vector3Like](./server.vector3like.md)


</td><td>

The origin coordinate of the chunk.


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

[blockIndexToLocalCoordinate(index)](./server.chunk.blockindextolocalcoordinate.md)


</td><td>

`static`


</td><td>

Convert a block index to a local coordinate.


</td></tr>
<tr><td>

[getBlockId(localCoordinate)](./server.chunk.getblockid.md)


</td><td>


</td><td>

Get the block type id at a specific local coordinate.


</td></tr>
<tr><td>

[globalCoordinateToLocalCoordinate(globalCoordinate)](./server.chunk.globalcoordinatetolocalcoordinate.md)


</td><td>

`static`


</td><td>

Convert a global coordinate to a local coordinate.


</td></tr>
<tr><td>

[globalCoordinateToOriginCoordinate(globalCoordinate)](./server.chunk.globalcoordinatetoorigincoordinate.md)


</td><td>

`static`


</td><td>

Convert a global coordinate to an origin coordinate.


</td></tr>
<tr><td>

[hasBlock(localCoordinate)](./server.chunk.hasblock.md)


</td><td>


</td><td>

Check if a block exists at a specific local coordinate.


</td></tr>
</tbody></table>
