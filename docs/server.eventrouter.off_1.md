<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [EventRouter](./server.eventrouter.md) &gt; [off](./server.eventrouter.off_1.md)

## EventRouter.off() method

**Signature:**

```typescript
off<TEventType extends string, TPayload = any>(eventType: TEventType & Exclude<TEventType, keyof EventPayloads>, listener: (payload: TPayload) => void): void;
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

TEventType &amp; Exclude&lt;TEventType, keyof [EventPayloads](./server.eventpayloads.md)<!-- -->&gt;


</td><td>


</td></tr>
<tr><td>

listener


</td><td>

(payload: TPayload) =&gt; void


</td><td>


</td></tr>
</tbody></table>
**Returns:**

void

