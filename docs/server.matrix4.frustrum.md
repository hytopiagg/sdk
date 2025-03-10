<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [Matrix4](./server.matrix4.md) &gt; [frustrum](./server.matrix4.frustrum.md)

## Matrix4.frustrum() method

Sets the current matrix to a frustrum matrix with the given bounds.

**Signature:**

```typescript
frustrum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;
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

left


</td><td>

number


</td><td>

The left bound of the projection.


</td></tr>
<tr><td>

right


</td><td>

number


</td><td>

The right bound of the projection.


</td></tr>
<tr><td>

bottom


</td><td>

number


</td><td>

The bottom bound of the projection.


</td></tr>
<tr><td>

top


</td><td>

number


</td><td>

The top bound of the projection.


</td></tr>
<tr><td>

near


</td><td>

number


</td><td>

The near bound of the projection.


</td></tr>
<tr><td>

far


</td><td>

number


</td><td>

The far bound of the projection.


</td></tr>
</tbody></table>
**Returns:**

[Matrix4](./server.matrix4.md)

The current matrix.

