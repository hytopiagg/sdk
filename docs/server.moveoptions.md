<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [server](./server.md) &gt; [MoveOptions](./server.moveoptions.md)

## MoveOptions type

Options for the [SimpleEntityController.move()](./server.simpleentitycontroller.move.md) method.

**Signature:**

```typescript
export type MoveOptions = {
    moveCallback?: MoveCallback;
    moveCompleteCallback?: MoveCompleteCallback;
    moveIgnoreAxes?: {
        x?: boolean;
        y?: boolean;
        z?: boolean;
    };
    moveStartIdleAnimationsOnCompletion?: boolean;
    moveStoppingDistance?: number;
    moveCompletesWhenStuck?: boolean;
};
```
**References:** [MoveCallback](./server.movecallback.md)<!-- -->, [MoveCompleteCallback](./server.movecompletecallback.md)

