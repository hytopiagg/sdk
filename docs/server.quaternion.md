<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [Quaternion](./server.quaternion.md)

## Quaternion class

Represents a quaternion.

**Signature:**

```typescript
export default class Quaternion extends Float32Array implements QuaternionLike 
```
**Extends:** Float32Array

**Implements:** [QuaternionLike](./server.quaternionlike.md)

## Remarks

All quaternion methods result in mutation of the quaternion instance. This class extends `Float32Array` to provide an efficient way to create and manipulate a quaternion. Various convenience methods are provided for common quaternion operations.

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(x, y, z, w)](./server.quaternion._constructor_.md)


</td><td>


</td><td>

Constructs a new instance of the `Quaternion` class


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

[length](./server.quaternion.length.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The length of the quaternion.


</td></tr>
<tr><td>

[magnitude](./server.quaternion.magnitude.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The magnitude of the quaternion. Alias for `.length`<!-- -->.


</td></tr>
<tr><td>

[squaredLength](./server.quaternion.squaredlength.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The squared length of the quaternion.


</td></tr>
<tr><td>

[squaredMagnitude](./server.quaternion.squaredmagnitude.md)


</td><td>

`readonly`


</td><td>

number


</td><td>

The squared magnitude of the quaternion. Alias for `.squaredLength`<!-- -->.


</td></tr>
<tr><td>

[w](./server.quaternion.w.md)


</td><td>


</td><td>

number


</td><td>

The w-component of the quaternion.


</td></tr>
<tr><td>

[x](./server.quaternion.x.md)


</td><td>


</td><td>

number


</td><td>

The x-component of the quaternion.


</td></tr>
<tr><td>

[y](./server.quaternion.y.md)


</td><td>


</td><td>

number


</td><td>

The y-component of the quaternion.


</td></tr>
<tr><td>

[z](./server.quaternion.z.md)


</td><td>


</td><td>

number


</td><td>

The z-component of the quaternion.


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

[clone()](./server.quaternion.clone.md)


</td><td>


</td><td>

Creates a clone of the current quaternion.


</td></tr>
<tr><td>

[conjugate()](./server.quaternion.conjugate.md)


</td><td>


</td><td>

Conjugates the current quaternion.


</td></tr>
<tr><td>

[copy(quaternion)](./server.quaternion.copy.md)


</td><td>


</td><td>

Copies the components of a `QuaternionLike` object to the current quaternion.


</td></tr>
<tr><td>

[dot(quaternion)](./server.quaternion.dot.md)


</td><td>


</td><td>

Calculates the dot product of the current quaternion and another quaternion.


</td></tr>
<tr><td>

[equals(quaternion)](./server.quaternion.equals.md)


</td><td>


</td><td>

Checks if the current quaternion is approximately equal to another quaternion.


</td></tr>
<tr><td>

[exactEquals(quaternion)](./server.quaternion.exactequals.md)


</td><td>


</td><td>

Checks if the current quaternion is exactly equal to another quaternion.


</td></tr>
<tr><td>

[exponential()](./server.quaternion.exponential.md)


</td><td>


</td><td>

Calculates and sets the current quaternion to its exponential.


</td></tr>
<tr><td>

[fromEuler(x, y, z)](./server.quaternion.fromeuler.md)


</td><td>

`static`


</td><td>

Creates a quaternion from Euler angles.


</td></tr>
<tr><td>

[fromQuaternionLike(quaternionLike)](./server.quaternion.fromquaternionlike.md)


</td><td>

`static`


</td><td>

Creates a quaternion from a `QuaternionLike` object.


</td></tr>
<tr><td>

[getAngle(quaternion)](./server.quaternion.getangle.md)


</td><td>


</td><td>

Calculates and returns the angle between the current quaternion and another quaternion.


</td></tr>
<tr><td>

[identity()](./server.quaternion.identity.md)


</td><td>


</td><td>

Sets the current quaternion to the identity quaternion.


</td></tr>
<tr><td>

[invert()](./server.quaternion.invert.md)


</td><td>


</td><td>

Inverts each component of the quaternion.


</td></tr>
<tr><td>

[lerp(quaternion, t)](./server.quaternion.lerp.md)


</td><td>


</td><td>

Linearly interpolates between the current quaternion and another quaternion.


</td></tr>
<tr><td>

[logarithm()](./server.quaternion.logarithm.md)


</td><td>


</td><td>

Sets the current quaternion to its natural logarithm.


</td></tr>
<tr><td>

[multiply(quaternion)](./server.quaternion.multiply.md)


</td><td>


</td><td>

Multiplies the quaternion by another quaternion.


</td></tr>
<tr><td>

[normalize()](./server.quaternion.normalize.md)


</td><td>


</td><td>

Normalizes the quaternion.


</td></tr>
<tr><td>

[power(exponent)](./server.quaternion.power.md)


</td><td>


</td><td>

Raises the current quaternion to a power.


</td></tr>
<tr><td>

[randomize()](./server.quaternion.randomize.md)


</td><td>


</td><td>

Randomizes the current quaternion.


</td></tr>
<tr><td>

[rotateX(angle)](./server.quaternion.rotatex.md)


</td><td>


</td><td>

Rotates the quaternion around the x-axis.


</td></tr>
<tr><td>

[rotateY(angle)](./server.quaternion.rotatey.md)


</td><td>


</td><td>

Rotates the quaternion around the y-axis.


</td></tr>
<tr><td>

[rotateZ(angle)](./server.quaternion.rotatez.md)


</td><td>


</td><td>

Rotates the quaternion around the z-axis.


</td></tr>
<tr><td>

[scale(scale)](./server.quaternion.scale.md)


</td><td>


</td><td>

Scales the quaternion by a scalar value.


</td></tr>
<tr><td>

[setAxisAngle(axis, angle)](./server.quaternion.setaxisangle.md)


</td><td>


</td><td>

Sets the current quaternion to the angle and rotation axis.


</td></tr>
<tr><td>

[slerp(quaternion, t)](./server.quaternion.slerp.md)


</td><td>


</td><td>

Spherically interpolates between the current quaternion and another quaternion.


</td></tr>
<tr><td>

[toString()](./server.quaternion.tostring.md)


</td><td>


</td><td>

Returns a string representation of the quaternion in x,y,z,w format.


</td></tr>
<tr><td>

[transformVector(vector)](./server.quaternion.transformvector.md)


</td><td>


</td><td>

Rotates the provided vector by the rotation this quaternion represents. This modifies the vector in-place, but also returns the rotated vector.


</td></tr>
</tbody></table>
