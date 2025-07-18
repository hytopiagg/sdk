<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [BaseEntityOptions](./server.baseentityoptions.md)

## BaseEntityOptions interface

The base options for an entity.

**Signature:**

```typescript
export interface BaseEntityOptions 
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

[controller?](./server.baseentityoptions.controller.md)


</td><td>


</td><td>

[BaseEntityController](./server.baseentitycontroller.md)


</td><td>

_(Optional)_ The entity controller to use for the entity.


</td></tr>
<tr><td>

[isEnvironmental?](./server.baseentityoptions.isenvironmental.md)


</td><td>


</td><td>

boolean


</td><td>

_(Optional)_ Whether the entity is environmental, if true it will not invoke its tick function or change position. Defaults to false.


</td></tr>
<tr><td>

[name?](./server.baseentityoptions.name.md)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ The name of the entity.


</td></tr>
<tr><td>

[opacity?](./server.baseentityoptions.opacity.md)


</td><td>


</td><td>

number


</td><td>

_(Optional)_ The opacity of the entity between 0 and 1. 0 is fully transparent, 1 is fully opaque.


</td></tr>
<tr><td>

[parent?](./server.baseentityoptions.parent.md)


</td><td>


</td><td>

[Entity](./server.entity.md)


</td><td>

_(Optional)_ The parent entity of the entity, entities with a parent will ignore creating their own colliders.


</td></tr>
<tr><td>

[parentNodeName?](./server.baseentityoptions.parentnodename.md)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ The name of the parent's node (if parent is a model entity) to attach the entity to.


</td></tr>
<tr><td>

[rigidBodyOptions?](./server.baseentityoptions.rigidbodyoptions.md)


</td><td>


</td><td>

[RigidBodyOptions](./server.rigidbodyoptions.md)


</td><td>

_(Optional)_ The rigid body options for the entity.


</td></tr>
<tr><td>

[tag?](./server.baseentityoptions.tag.md)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ An arbitrary identifier tag of the entity. Useful for your own logic.


</td></tr>
<tr><td>

[tintColor?](./server.baseentityoptions.tintcolor.md)


</td><td>


</td><td>

[RgbColor](./server.rgbcolor.md)


</td><td>

_(Optional)_ The tint color of the entity as a hex code.


</td></tr>
</tbody></table>
