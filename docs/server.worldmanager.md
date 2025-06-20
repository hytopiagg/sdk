<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [WorldManager](./server.worldmanager.md)

## WorldManager class

Manages all worlds in a game server.

**Signature:**

```typescript
export default class WorldManager 
```

## Remarks

The WorldManager is created internally as a global singleton accessible with the static property `WorldManager.instance`<!-- -->.

<h2>Events</h2>

This class emits global events with payloads listed under [WorldManagerEventPayloads](./server.worldmanagereventpayloads.md)

## Example


```typescript
import { WorldManager } from 'hytopia';

const worldManager = WorldManager.instance;
const newWorld = worldManager.createWorld({
  name: 'My New World',
  skyboxUri: 'skyboxes/partly-cloudy',
});
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

[instance](./server.worldmanager.instance.md)


</td><td>

`static`

`readonly`


</td><td>

[WorldManager](./server.worldmanager.md)


</td><td>

The global WorldManager instance as a singleton.


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

[createWorld(options)](./server.worldmanager.createworld.md)


</td><td>


</td><td>

Creates a new world.


</td></tr>
<tr><td>

[getAllWorlds()](./server.worldmanager.getallworlds.md)


</td><td>


</td><td>

Gets all worlds.


</td></tr>
<tr><td>

[getDefaultWorld()](./server.worldmanager.getdefaultworld.md)


</td><td>


</td><td>

Gets the default world.


</td></tr>
<tr><td>

[getWorld(id)](./server.worldmanager.getworld.md)


</td><td>


</td><td>

Gets a world by its id.


</td></tr>
<tr><td>

[getWorldsByTag(tag)](./server.worldmanager.getworldsbytag.md)


</td><td>


</td><td>

Gets all worlds with a specific tag.


</td></tr>
<tr><td>

[setDefaultWorld(world)](./server.worldmanager.setdefaultworld.md)


</td><td>


</td><td>

Sets the default world. This is the world players automatically join when they connect to the game.


</td></tr>
</tbody></table>
