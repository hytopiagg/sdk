<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [SimulationEventPayloads](./server.simulationeventpayloads.md) &gt; ["SIMULATION.DEBUG\_RAYCAST"](./server.simulationeventpayloads._simulation.debug_raycast_.md)

## SimulationEventPayloads."SIMULATION.DEBUG\_RAYCAST" property

Emitted when a debug raycast is performed.

**Signature:**

```typescript
[SimulationEvent.DEBUG_RAYCAST]: {
        simulation: Simulation;
        origin: Vector3Like;
        direction: Vector3Like;
        length: number;
        hit: boolean;
    };
```
