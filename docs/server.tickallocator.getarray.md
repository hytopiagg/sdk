<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [TickAllocator](./server.tickallocator.md) &gt; [getArray](./server.tickallocator.getarray.md)

## TickAllocator.getArray() method

Gets a generic array from the pool. Array is reset to empty state and ready for use.

**Signature:**

```typescript
getArray<T extends unknown[] = unknown[]>(copyFromA?: Iterable<unknown>, copyFromB?: Iterable<unknown>): T;
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

copyFromA


</td><td>

Iterable&lt;unknown&gt;


</td><td>

_(Optional)_


</td></tr>
<tr><td>

copyFromB


</td><td>

Iterable&lt;unknown&gt;


</td><td>

_(Optional)_


</td></tr>
</tbody></table>
**Returns:**

T

A reusable array.

