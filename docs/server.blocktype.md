<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [BlockType](./server.blocktype.md)

## BlockType class

Represents a block type.

**Signature:**

```typescript
export default class BlockType extends EventRouter implements protocol.Serializable 
```
**Extends:** [EventRouter](./server.eventrouter.md)

**Implements:** protocol.Serializable

## Remarks

Block types are created directly as instances. They support a variety of configuration options through the [BlockTypeOptions](./server.blocktypeoptions.md) constructor argument. Block types are registered with a [BlockTypeRegistry](./server.blocktyperegistry.md) instance, allowing you to create custom blocks with unique visual representations and behaviors.

<h2>Events</h2>

This class is an EventRouter, and instances of it emit events with payloads listed under [BlockTypeEventPayloads](./server.blocktypeeventpayloads.md)

## Example


```typescript
const stoneBlockTypeId = 10;
world.blockTypeRegistry.registerBlockType(stoneBlockTypeId, new BlockType({
  id: stoneBlockTypeId,
  textureUri: 'textures/stone.png',
  name: 'Stone',
}));

// Create a stone block at coordinate 0, 1, 0
world.chunkLattice.setBlock({ x: 0, y: 1, z: 0 }, stoneBlockTypeId);
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

[(constructor)(blockTypeRegistry, options)](./server.blocktype._constructor_.md)


</td><td>


</td><td>

Creates a new block type instance.


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

[blockTypeRegistry](./server.blocktype.blocktyperegistry.md)


</td><td>

`readonly`


</td><td>

[BlockTypeRegistry](./server.blocktyperegistry.md)


</td><td>

The block type registry that the block type belongs to.


</td></tr>
<tr><td>

[colliderOptions](./server.blocktype.collideroptions.md)


</td><td>

`readonly`


</td><td>

[VoxelsColliderOptions](./server.voxelscollideroptions.md)


</td><td>

The collider options for the block type.


</td></tr>
<tr><td>

[halfExtents](./server.blocktype.halfextents.md)


</td><td>

`readonly`


</td><td>

[Vector3Like](./server.vector3like.md)


</td><td>

The half extents size of the block type.


</td></tr>
<tr><td>

[id](./server.blocktype.id.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The unique identifier for the block type.


</td></tr>
<tr><td>

[isLiquid](./server.blocktype.isliquid.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the block type is a liquid.


</td></tr>
<tr><td>

[isMeshable](./server.blocktype.ismeshable.md)


</td><td>

`readonly`


</td><td>

boolean


</td><td>

Whether the block type is meshable.


</td></tr>
<tr><td>

[name](./server.blocktype.name.md)


</td><td>

`readonly`


</td><td>

string


</td><td>

The name of the block type.


</td></tr>
<tr><td>

[size](./server.blocktype.size.md)


</td><td>

`readonly`


</td><td>

[Vector3Like](./server.vector3like.md)


</td><td>

The size of the block type.


</td></tr>
<tr><td>

[textureUri](./server.blocktype.textureuri.md)


</td><td>

`readonly`


</td><td>

string


</td><td>

The URI of the texture for the block type.


</td></tr>
</tbody></table>
