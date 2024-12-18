<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [EventRouter](./server.eventrouter.md) &gt; [off](./server.eventrouter.off.md)

## EventRouter.off() method

Remove a listener for a specific event type.

**Signature:**

```typescript
off<TPayload>(eventType: string, listener: (payload: TPayload) => void): void;
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

eventType


</td><td>

string


</td><td>

The type of event to remove the listener from.


</td></tr>
<tr><td>

listener


</td><td>

(payload: TPayload) =&gt; void


</td><td>

The listener function to remove.


</td></tr>
</tbody></table>
**Returns:**

void

