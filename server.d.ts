import type { AnyPacket } from '@hytopia.com/server-protocol';
import type { ErrorEvent as ErrorEvent_2 } from 'ws';
import EventEmitter from 'eventemitter3';
import http from 'http';
import type { InputSchema } from '@hytopia.com/server-protocol';
import type { LobbyMembershipDto } from '@hytopia.com/creative-lib/dist/impl/getSession';
import protocol from '@hytopia.com/server-protocol';
import RAPIER from '@dimforge/rapier3d-simd-compat';
import { SdpMatrix3 } from '@dimforge/rapier3d-simd-compat';
import * as Sentry from '@sentry/node';
import type { Socket } from 'net';
import { WebSocket as WebSocket_2 } from 'ws';
import type { WebTransportSessionImpl } from '@fails-components/webtransport/dist/lib/types';

/**
 * Manages the assets library and synchronization of assets
 * to the local assets directory in development.
 *
 * When to use: pulling assets from the shared library during local development.
 * Do NOT use for: production asset loading; the library is disabled in production.
 *
 * @remarks
 * The AssetsLibrary is created internally as a global
 * singleton accessible via `AssetsLibrary.instance`.
 *
 * Assets automatically sync to local assets in development mode the first
 * time an asset in the library is requested by the client. You generally do
 * not need to call `AssetsLibrary.syncAsset` unless you have a specific reason to.
 *
 * @example
 * ```typescript
 * import { AssetsLibrary } from 'hytopia';
 *
 * const assetsLibrary = AssetsLibrary.instance;
 * assetsLibrary.syncAsset('assets/models/player.gltf');
 * ```
 *
 * **Category:** Assets
 * @public
 */
export declare class AssetsLibrary {
    /**
     * The global AssetsLibrary instance as a singleton.
     *
     * **Category:** Assets
     */
    static readonly instance: AssetsLibrary;
    /**
     * The path to the assets library package. Null if assets library is not available.
     *
     * **Category:** Assets
     */
    static readonly assetsLibraryPath: string | null;
    /**
     * Synchronizes an asset from the assets library to the local assets directory.
     *
     * @remarks
     * Syncs an asset from the assets library to local assets in development.
     * The assets library is unavailable in production, so assets must be local to the project.
     *
     * @param assetPath - The path of the asset to copy to local assets.
     *
     * **Requires:** Assets library must be available (development only).
     *
     * **Side effects:** Writes files into the local `assets/` directory.
     *
     * **Category:** Assets
     */
    syncAsset(assetPath: string): void;
}

/**
 * Represents a audio playback in a world.
 *
 * @remarks
 * Audio instances are created directly as instances.
 * They support a variety of configuration options through
 * the `AudioOptions` constructor argument.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under `AudioEventPayloads`
 *
 * @example
 * ```typescript
 * (new Audio({
 *   uri: 'music/song.mp3', // relative to the server's assets directory in the project root, resolves to assets/music/song.mp3
 *   loop: true,
 *   volume: 0.5,
 * })).play(world);
 * ```
 *
 * @eventProperty
 *
 * **Category:** Audio
 * @public
 */
export declare class Audio extends EventRouter implements protocol.Serializable {
















    /**
     * @param options - The options for the Audio instance.
     */
    constructor(options: AudioOptions);
    /** The unique identifier for the audio. */
    get id(): number | undefined;
    /** The entity to which the audio is attached if explicitly set. */
    get attachedToEntity(): Entity | undefined;
    /** The cutoff distance where the audio will be reduced to 0 volume. */
    get cutoffDistance(): number;
    /** The duration of the audio in seconds if explicitly set. */
    get duration(): number | undefined;
    /** The detune of the audio in cents if explicitly set. */
    get detune(): number | undefined;
    /** The amount of distortion to apply to the audio if explicitly set. */
    get distortion(): number | undefined;
    /** Whether the audio is looped. */
    get loop(): boolean;
    /** The offset time in seconds from which the audio should start playing if explicitly set. */
    get offset(): number | undefined;
    /** Whether the audio has loaded into the world. Audio is loaded the first time play() is called. */
    get isLoaded(): boolean;
    /** Whether the audio is currently playing. */
    get isPlaying(): boolean;
    /** Whether the audio is positional (Entity or position attached). */
    get isPositional(): boolean;
    /** The position of the audio in the world if explicitly set. */
    get position(): Vector3Like | undefined;
    /** The playback rate of the audio if explicitly set. */
    get playbackRate(): number | undefined;
    /** The reference distance of the audio if explicitly set. */
    get referenceDistance(): number;
    /** The server tick at which the audio started playing. */
    get startTick(): number | undefined;
    /** The URI of the audio asset. */
    get uri(): string;
    /** The volume of the audio if explicitly set. */
    get volume(): number | undefined;
    /** The world the audio is in if already loaded. */
    get world(): World | undefined;
    /**
     * Plays or resumes the audio.
     *
     * @param world - The world to play the audio in.
     * @param restart - If true, the audio will restart from the beginning if it is already playing.
     */
    play(world: World, restart?: boolean): void;
    /**
     * Pauses the audio.
     */
    pause(): void;
    /**
     * Sets the entity to which the audio is attached, following its position.
     *
     * @remarks
     * **Clears position:** Setting an attached entity clears any previously set `position`.
     * Audio can be entity-attached or position-based, not both.
     *
     * @param entity - The entity to attach the Audio to.
     */
    setAttachedToEntity(entity: Entity): void;
    /**
     * Sets the cutoff distance of the audio.
     *
     * @remarks
     * The cutoff distance defines the maximum range at which the audio can be heard.
     * Beyond this distance, the audio volume becomes zero. As the listener moves
     * from the reference distance toward the cutoff distance, the volume decreases
     * linearly, providing a natural spatial audio experience with smooth volume
     * falloff based on distance.
     *
     * @param cutoffDistance - The cutoff distance.
     */
    setCutoffDistance(cutoffDistance: number): void;
    /**
     * Sets the detune of the audio.
     *
     * @param detune - The detune in cents.
     */
    setDetune(detune: number): void;
    /**
     * Sets the distortion of the audio.
     *
     * @param distortion - The distortion amount.
     */
    setDistortion(distortion: number): void;
    /**
     * Sets the position of the audio.
     *
     * @remarks
     * **Detaches from entity:** Setting a position clears any `attachedToEntity`.
     * Audio can be position-based or entity-attached, not both.
     *
     * @param position - The position in the world.
     */
    setPosition(position: Vector3Like): void;
    /**
     * Sets the playback rate of the audio.
     *
     * @param playbackRate - The playback rate.
     */
    setPlaybackRate(playbackRate: number): void;
    /**
     * Sets the reference distance of the audio.
     *
     * @remarks
     * The reference distance defines the range within which the audio plays at
     * full volume. When a listener is within this distance from the audio source,
     * they will hear the sound at its maximum volume. Beyond this distance, the
     * volume decreases linearly until reaching the cutoff distance, where the
     * sound becomes inaudible. This creates a natural spatial audio experience
     * with smooth volume falloff based on distance.
     *
     * @param referenceDistance - The reference distance.
     */
    setReferenceDistance(referenceDistance: number): void;
    /**
     * Sets the volume of the audio.
     *
     * @param volume - The volume level.
     */
    setVolume(volume: number): void;


}

/**
 * Event types an Audio instance can emit.
 *
 * See `AudioEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum AudioEvent {
    PAUSE = "AUDIO.PAUSE",
    PLAY = "AUDIO.PLAY",
    PLAY_RESTART = "AUDIO.PLAY_RESTART",
    SET_ATTACHED_TO_ENTITY = "AUDIO.SET_ATTACHED_TO_ENTITY",
    SET_CUTOFF_DISTANCE = "AUDIO.SET_CUTOFF_DISTANCE",
    SET_DETUNE = "AUDIO.SET_DETUNE",
    SET_DISTORTION = "AUDIO.SET_DISTORTION",
    SET_POSITION = "AUDIO.SET_POSITION",
    SET_PLAYBACK_RATE = "AUDIO.SET_PLAYBACK_RATE",
    SET_REFERENCE_DISTANCE = "AUDIO.SET_REFERENCE_DISTANCE",
    SET_VOLUME = "AUDIO.SET_VOLUME"
}

/**
 * Event payloads for Audio emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface AudioEventPayloads {
    /** Emitted when the audio is paused. */
    [AudioEvent.PAUSE]: {
        audio: Audio;
    };
    /** Emitted when the audio is played. */
    [AudioEvent.PLAY]: {
        audio: Audio;
    };
    /** Emitted when the audio is restarted. */
    [AudioEvent.PLAY_RESTART]: {
        audio: Audio;
    };
    /** Emitted when the audio is attached to an entity. */
    [AudioEvent.SET_ATTACHED_TO_ENTITY]: {
        audio: Audio;
        entity: Entity | undefined;
    };
    /** Emitted when the audio's cutoff distance is set. */
    [AudioEvent.SET_CUTOFF_DISTANCE]: {
        audio: Audio;
        cutoffDistance: number;
    };
    /** Emitted when the audio's detune is set. */
    [AudioEvent.SET_DETUNE]: {
        audio: Audio;
        detune: number;
    };
    /** Emitted when the audio's distortion is set. */
    [AudioEvent.SET_DISTORTION]: {
        audio: Audio;
        distortion: number;
    };
    /** Emitted when the audio's position is set. */
    [AudioEvent.SET_POSITION]: {
        audio: Audio;
        position: Vector3Like;
    };
    /** Emitted when the audio's playback rate is set. */
    [AudioEvent.SET_PLAYBACK_RATE]: {
        audio: Audio;
        playbackRate: number;
    };
    /** Emitted when the audio's reference distance is set. */
    [AudioEvent.SET_REFERENCE_DISTANCE]: {
        audio: Audio;
        referenceDistance: number;
    };
    /** Emitted when the audio's volume is set. */
    [AudioEvent.SET_VOLUME]: {
        audio: Audio;
        volume: number;
    };
}

/**
 * Manages audio instances in a world.
 *
 * When to use: querying or bulk-controlling audio in a specific world.
 * Do NOT use for: individual playback configuration; use `Audio` instances.
 *
 * @remarks
 * The AudioManager is created internally per `World` instance.
 * Audio is loaded on first `Audio.play`; this manager tracks loaded instances.
 * Pattern: call `AudioManager.unregisterEntityAttachedAudios` when despawning entities with positional audio.
 *
 * @example
 * ```typescript
 * // Stop all audio in the world
 * const audioManager = world.audioManager;
 * audioManager.getAllAudios().forEach(audio => audio.pause());
 * ```
 *
 * **Category:** Audio
 * @public
 */
export declare class AudioManager {




    /**
     * The world the audio manager is for.
     *
     * **Category:** Audio
     */
    get world(): World;
    /**
     * Retrieves all loaded audio instances for the world.
     *
     * @returns An array of audio instances.
     *
     * **Category:** Audio
     */
    getAllAudios(): Audio[];
    /**
     * Retrieves all loaded audio instances attached to a specific entity.
     *
     * Use for: cleanup when despawning an entity with positional audio.
     *
     * @param entity - The entity to get attached audio instances for.
     * @returns An array of audio instances.
     *
     * **Requires:** Entity should belong to this world for meaningful results.
     *
     * @see `AudioManager.unregisterEntityAttachedAudios`
     *
     * **Category:** Audio
     */
    getAllEntityAttachedAudios(entity: Entity): Audio[];
    /**
     * Retrieves all looped audio instances for the world.
     *
     * @returns An array of audio instances.
     *
     * @see `AudioManager.getAllOneshotAudios`
     *
     * **Category:** Audio
     */
    getAllLoopedAudios(): Audio[];
    /**
     * Retrieves all oneshot (non-looped) audio instances for the world.
     *
     * @returns An array of audio instances.
     *
     * @see `AudioManager.getAllLoopedAudios`
     *
     * **Category:** Audio
     */
    getAllOneshotAudios(): Audio[];

    /**
     * Unregisters and stops an audio instance from the audio manager.
     *
     * Use for: explicit cleanup of one-shot or temporary sounds.
     * Do NOT use for: pausing/resuming; use `Audio.pause` or `Audio.play` instead.
     *
     * @remarks
     * **Pauses audio:** Calls `audio.pause()` before removing from the manager.
     *
     * @param audio - The audio instance to pause and unregister.
     *
     * **Requires:** Audio must be loaded (have an id) or an error is logged.
     *
     * **Side effects:** Pauses the audio and removes it from manager tracking.
     *
     * @see `AudioManager.unregisterEntityAttachedAudios`
     *
     * **Category:** Audio
     */
    unregisterAudio(audio: Audio): void;
    /**
     * Unregisters and stops all audio instances attached to a specific entity.
     *
     * Use for: entity despawn or cleanup scenarios.
     *
     * @remarks
     * **Pauses all:** Calls `AudioManager.unregisterAudio` for each attached audio, which pauses them.
     *
     * @param entity - The entity to pause and unregister audio instances for.
     *
     * **Requires:** Entity should belong to this world for meaningful results.
     *
     * **Side effects:** Pauses and unregisters any attached audio instances.
     *
     * @see `AudioManager.getAllEntityAttachedAudios`
     *
     * **Category:** Audio
     */
    unregisterEntityAttachedAudios(entity: Entity): void;
}

/**
 * Options for creating an Audio instance.
 *
 * Positional audio can be configured via `AudioOptions.attachedToEntity` or `AudioOptions.position`.
 *
 * Use for: configuring audio before calling `Audio.play`.
 * Do NOT use for: runtime updates after playback starts; use `Audio.set*` methods.
 *
 * **Category:** Audio
 * @public
 */
export declare interface AudioOptions {
    /** If set, audio playback will follow the entity's position. */
    attachedToEntity?: Entity;
    /** The cutoff distance between the audio source and the listener where the audio will be reduced to 0 volume. Must be greater than reference distance. Defaults to reference distance + 10. */
    cutoffDistance?: number;
    /** The duration of the audio in seconds. Defaults to full duration. */
    duration?: number;
    /** The detuning of the audio in cents. */
    detune?: number;
    /** The amount of distortion to apply to the audio. */
    distortion?: number;
    /** Whether the audio should loop when it reaches the end. Defaults to false. */
    loop?: boolean;
    /** The offset time in seconds from which the audio should start playing. */
    offset?: number;
    /** The position in the world where the audio is played. */
    position?: Vector3Like;
    /** The playback speed of the audio. Defaults to 1. */
    playbackRate?: number;
    /** The maximum reference distance between the audio source and the listener where the audio will still be max volume. Defaults to 10. */
    referenceDistance?: number;
    /** The URI or path to the audio asset to be played. */
    uri: string;
    /** The volume level of the audio. Defaults to 0.5. */
    volume?: number;
}

/**
 * The options for a ball collider. @public
 *
 * Use for: sphere-shaped colliders.
 * Do NOT use for: other shapes; use the matching collider option type.
 *
 * **Category:** Physics
 */
export declare interface BallColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.BALL;
    /**
     * The radius of the ball collider.
     *
     * **Category:** Physics
     */
    radius?: number;
}

/**
 * The base options for a collider. @public
 *
 * Use for: configuring colliders when creating entities or rigid bodies.
 * Do NOT use for: runtime changes; use `Collider` methods instead.
 *
 * **Category:** Physics
 */
export declare interface BaseColliderOptions {
    /**
     * The shape of the collider.
     *
     * **Category:** Physics
     */
    shape: ColliderShape;
    /**
     * The bounciness of the collider.
     *
     * **Category:** Physics
     */
    bounciness?: number;
    /**
     * The bounciness combine rule of the collider.
     *
     * **Category:** Physics
     */
    bouncinessCombineRule?: CoefficientCombineRule;
    /**
     * The collision groups the collider belongs to.
     *
     * **Category:** Physics
     */
    collisionGroups?: CollisionGroups;
    /**
     * Whether the collider is enabled.
     *
     * **Category:** Physics
     */
    enabled?: boolean;
    /**
     * The flags of the collider if the shape is a trimesh
     *
     * **Category:** Physics
     */
    flags?: number;
    /**
     * The friction of the collider.
     *
     * **Category:** Physics
     */
    friction?: number;
    /**
     * The friction combine rule of the collider.
     *
     * **Category:** Physics
     */
    frictionCombineRule?: CoefficientCombineRule;
    /**
     * Whether the collider is a sensor.
     *
     * **Category:** Physics
     */
    isSensor?: boolean;
    /**
     * The mass of the collider.
     *
     * **Category:** Physics
     */
    mass?: number;
    /**
     * The on collision callback for the collider.
     *
     * **Category:** Physics
     */
    onCollision?: CollisionCallback;
    /**
     * The parent rigid body of the collider.
     *
     * **Category:** Physics
     */
    parentRigidBody?: RigidBody;
    /**
     * The relative position of the collider. Relative to parent rigid body.
     *
     * **Category:** Physics
     */
    relativePosition?: Vector3Like;
    /**
     * The relative rotation of the collider. Relative to parent rigid body.
     *
     * **Category:** Physics
     */
    relativeRotation?: QuaternionLike;
    /**
     * The simulation the collider is in, if provided the collider will automatically be added to the simulation.
     *
     * **Category:** Physics
     */
    simulation?: Simulation;
    /**
     * An arbitrary identifier tag of the collider. Useful for your own logic.
     *
     * **Category:** Physics
     */
    tag?: string;
}

/**
 * A base class for entity controller implementations.
 *
 * When to use: implementing custom entity behavior and movement logic.
 * Do NOT use for: one-off entity changes; prefer direct entity APIs.
 *
 * @remarks
 * Controllers are typically one instance per entity, but can be shared across
 * entities if you manage state carefully.
 *
 * <h2>Lifecycle</h2>
 *
 * 1) `attach()` — called during `Entity` construction when a controller is provided.
 * 2) `spawn()` — called after the entity is added to the physics simulation.
 * 3) `tickWithPlayerInput()` — called each world tick for `PlayerEntity` before `tick()`.
 * 4) `tick()` — called each world tick before physics stepping.
 * 5) `detach()` → `despawn()` — called during `Entity.despawn`.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `BaseEntityControllerEventPayloads`.
 *
 * **Category:** Controllers
 * @public
 */
export declare abstract class BaseEntityController extends EventRouter {
    /**
     * Override this method to handle the attachment of an entity
     * to your entity controller.
     *
     * @remarks
     * **Called by:** `Entity` constructor when a controller is provided in options.
     *
     * **Super call:** Call `super.attach(entity)` to emit the `ATTACH` event.
     *
     * @param entity - The entity to attach the controller to.
     *
     * **Category:** Controllers
     */
    attach(entity: Entity): void;
    /**
     * Override this method to handle the despawn of an entity
     * from your entity controller.
     *
     * @remarks
     * **Called by:** `Entity.despawn()` after `detach()` is called.
     *
     * **Super call:** Call `super.despawn(entity)` to emit the `DESPAWN` event.
     *
     * @param entity - The entity being despawned.
     *
     * **Category:** Controllers
     */
    despawn(entity: Entity): void;
    /**
     * Override this method to handle the detachment of an entity
     * from your entity controller.
     *
     * @remarks
     * **Called by:** `Entity.despawn()` before `despawn()` is called.
     *
     * **Super call:** Call `super.detach(entity)` to emit the `DETACH` event.
     *
     * @param entity - The entity being detached.
     *
     * **Category:** Controllers
     */
    detach(entity: Entity): void;
    /**
     * Override this method to handle the spawning of an entity
     * to your entity controller.
     *
     * @remarks
     * **Called by:** `Entity.spawn()` after the entity is added to the physics simulation.
     *
     * **Super call:** Call `super.spawn(entity)` to emit the `SPAWN` event.
     *
     * @param entity - The entity being spawned.
     *
     * **Category:** Controllers
     */
    spawn(entity: Entity): void;
    /**
     * Override this method to handle entity movements
     * based on player input for your entity controller.
     *
     * @remarks
     * **Called by:** `PlayerEntity.tick()` every tick when `isTickWithPlayerInputEnabled` is true.
     * Called before `tick()`.
     *
     * **Super call:** Call `super.tickWithPlayerInput(...)` to emit the `TICK_WITH_PLAYER_INPUT` event.
     *
     * @param entity - The player entity being ticked.
     * @param input - The current input state of the player.
     * @param cameraOrientation - The current camera orientation state of the player.
     * @param deltaTimeMs - The delta time in milliseconds since the last tick.
     *
     * **Category:** Controllers
     */
    tickWithPlayerInput(entity: PlayerEntity, input: PlayerInput, cameraOrientation: PlayerCameraOrientation, deltaTimeMs: number): void;
    /**
     * Override this method to handle entity movements
     * based on your entity controller.
     *
     * @remarks
     * **Called by:** `Entity.tick()` every tick for non-environmental entities.
     * For `PlayerEntity`, this is called after `tickWithPlayerInput()`.
     *
     * **Super call:** Call `super.tick(entity, deltaTimeMs)` to emit the `TICK` event.
     *
     * @param entity - The entity being ticked.
     * @param deltaTimeMs - The delta time in milliseconds since the last tick.
     *
     * **Category:** Controllers
     */
    tick(entity: Entity, deltaTimeMs: number): void;
}

/**
 * Event types a BaseEntityController instance can emit.
 *
 * See `BaseEntityControllerEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum BaseEntityControllerEvent {
    ATTACH = "BASE_ENTITY_CONTROLLER.ATTACH",
    DESPAWN = "BASE_ENTITY_CONTROLLER.DESPAWN",
    DETACH = "BASE_ENTITY_CONTROLLER.DETACH",
    SPAWN = "BASE_ENTITY_CONTROLLER.SPAWN",
    TICK = "BASE_ENTITY_CONTROLLER.TICK",
    TICK_WITH_PLAYER_INPUT = "BASE_ENTITY_CONTROLLER.TICK_WITH_PLAYER_INPUT"
}

/**
 * Event payloads for BaseEntityController emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface BaseEntityControllerEventPayloads {
    /** Emitted when an entity is attached to the controller. */
    [BaseEntityControllerEvent.ATTACH]: {
        entity: Entity;
    };
    /** Emitted when an entity is despawned. */
    [BaseEntityControllerEvent.DESPAWN]: {
        entity: Entity;
    };
    /** Emitted when an entity is detached from the controller. */
    [BaseEntityControllerEvent.DETACH]: {
        entity: Entity;
    };
    /** Emitted when an entity is spawned. */
    [BaseEntityControllerEvent.SPAWN]: {
        entity: Entity;
    };
    /** Emitted when an entity is ticked. */
    [BaseEntityControllerEvent.TICK]: {
        entity: Entity;
        deltaTimeMs: number;
    };
    /** Emitted when an entity is ticked with player input. */
    [BaseEntityControllerEvent.TICK_WITH_PLAYER_INPUT]: {
        entity: PlayerEntity;
        input: PlayerInput;
        cameraOrientation: PlayerCameraOrientation;
        deltaTimeMs: number;
    };
}

/**
 * The base options for an entity.
 *
 * Use for: common entity configuration shared by block and model entities.
 * Do NOT use for: runtime changes after spawn; use `Entity` setters instead.
 *
 * **Category:** Entities
 * @public
 */
export declare interface BaseEntityOptions {
    /** The entity controller to use for the entity. */
    controller?: BaseEntityController;
    /** The emissive color of the entity. */
    emissiveColor?: RgbColor;
    /** The emissive intensity of the entity. Use a value over 1 for brighter emissive effects. */
    emissiveIntensity?: number;
    /** The opacity of the entity between 0 and 1. 0 is fully transparent, 1 is fully opaque. */
    opacity?: number;
    /** The outline rendering options for the entity. */
    outline?: Outline;
    /** Whether the entity is environmental, if true it will not invoke its tick function or change position. Defaults to false. */
    isEnvironmental?: boolean;
    /** The parent entity of the entity, entities with a parent will ignore creating their own colliders. */
    parent?: Entity;
    /** The name of the parent's node (if parent is a model entity) to attach the entity to. */
    parentNodeName?: string;
    /** The interpolation time in milliseconds applied to position changes. */
    positionInterpolationMs?: number;
    /** The rigid body options for the entity. */
    rigidBodyOptions?: RigidBodyOptions;
    /** The interpolation time in milliseconds applied to rotation changes. */
    rotationInterpolationMs?: number;
    /** An arbitrary identifier tag of the entity. Useful for your own logic. */
    tag?: string;
    /** The tint color of the entity as a hex code. */
    tintColor?: RgbColor;
    /** The name of the entity. */
    name?: string;
}

/**
 * The base options for a rigid body. @public
 *
 * Use for: initial rigid body configuration when creating entities or bodies.
 * Do NOT use for: runtime changes; use `RigidBody` setter methods instead.
 *
 * **Category:** Physics
 */
export declare interface BaseRigidBodyOptions {
    /**
     * The type of the rigid body, defaults to `RigidBodyType.DYNAMIC`.
     *
     * **Category:** Physics
     */
    type?: RigidBodyType;
    /**
     * The colliders of the rigid body, provided as `ColliderOptions`.
     *
     * **Category:** Physics
     */
    colliders?: ColliderOptions[];
    /**
     * Whether the rigid body is enabled.
     *
     * **Category:** Physics
     */
    enabled?: boolean;
    /**
     * The position of the rigid body.
     *
     * **Category:** Physics
     */
    position?: Vector3Like;
    /**
     * The rotation of the rigid body.
     *
     * **Category:** Physics
     */
    rotation?: QuaternionLike;
    /**
     * The simulation the rigid body is in. If provided, the rigid body will be automatically added to the simulation.
     *
     * **Category:** Physics
     */
    simulation?: Simulation;
}

/**
 * Represents a block in a world.
 *
 * When to use: reading block data from queries like raycasts or chunk lookups.
 * Do NOT use for: creating or placing blocks directly; use `ChunkLattice.setBlock`.
 *
 * @remarks
 * Instances are created internally and surfaced by API methods.
 * Block coordinates are **world coordinates** (global block grid), not local chunk coordinates.
 *
 * **Category:** Blocks
 * @public
 */
export declare class Block {
    /**
     * The global coordinate of the block.
     *
     * **Category:** Blocks
     */
    readonly globalCoordinate: Vector3Like;
    /**
     * The block type of the block.
     *
     * **Category:** Blocks
     */
    readonly blockType: BlockType;


    /**
     * Gets the most adjacent neighbor global coordinate of this block
     * based on a relative hit point, typically from a raycast.
     *
     * Use for: placing a new block on the face that was hit.
     *
     * @param hitPoint - The hit point on this block (global coordinates).
     * @returns The adjacent block coordinate in world space.
     *
     * **Category:** Blocks
     */
    getNeighborGlobalCoordinateFromHitPoint(hitPoint: Vector3Like): Vector3Like;
}

/**
 * All valid block rotations, named as `{face pointing up}_{Y rotation degrees}`.
 *
 * N prefix = negative axis (e.g. `NZ_90` = -Z face up, rotated 90° around global Y).
 *
 * **Category:** Blocks
 * @public
 */
export declare const BLOCK_ROTATIONS: {
    readonly Y_0: {
        readonly enumIndex: 0;
        readonly matrix: readonly [1, 0, 0, 0, 1, 0, 0, 0, 1];
    };
    readonly Y_90: {
        readonly enumIndex: 1;
        readonly matrix: readonly [0, 0, -1, 0, 1, 0, 1, 0, 0];
    };
    readonly Y_180: {
        readonly enumIndex: 2;
        readonly matrix: readonly [-1, 0, 0, 0, 1, 0, 0, 0, -1];
    };
    readonly Y_270: {
        readonly enumIndex: 3;
        readonly matrix: readonly [0, 0, 1, 0, 1, 0, -1, 0, 0];
    };
    readonly NY_0: {
        readonly enumIndex: 4;
        readonly matrix: readonly [-1, 0, 0, 0, -1, 0, 0, 0, 1];
    };
    readonly NY_90: {
        readonly enumIndex: 5;
        readonly matrix: readonly [0, 0, -1, 0, -1, 0, -1, 0, 0];
    };
    readonly NY_180: {
        readonly enumIndex: 6;
        readonly matrix: readonly [1, 0, 0, 0, -1, 0, 0, 0, -1];
    };
    readonly NY_270: {
        readonly enumIndex: 7;
        readonly matrix: readonly [0, 0, 1, 0, -1, 0, 1, 0, 0];
    };
    readonly X_0: {
        readonly enumIndex: 8;
        readonly matrix: readonly [0, -1, 0, 1, 0, 0, 0, 0, 1];
    };
    readonly X_90: {
        readonly enumIndex: 9;
        readonly matrix: readonly [0, 0, -1, 1, 0, 0, 0, -1, 0];
    };
    readonly X_180: {
        readonly enumIndex: 10;
        readonly matrix: readonly [0, 1, 0, 1, 0, 0, 0, 0, -1];
    };
    readonly X_270: {
        readonly enumIndex: 11;
        readonly matrix: readonly [0, 0, 1, 1, 0, 0, 0, 1, 0];
    };
    readonly NX_0: {
        readonly enumIndex: 12;
        readonly matrix: readonly [0, 1, 0, -1, 0, 0, 0, 0, 1];
    };
    readonly NX_90: {
        readonly enumIndex: 13;
        readonly matrix: readonly [0, 0, -1, -1, 0, 0, 0, 1, 0];
    };
    readonly NX_180: {
        readonly enumIndex: 14;
        readonly matrix: readonly [0, -1, 0, -1, 0, 0, 0, 0, -1];
    };
    readonly NX_270: {
        readonly enumIndex: 15;
        readonly matrix: readonly [0, 0, 1, -1, 0, 0, 0, -1, 0];
    };
    readonly Z_0: {
        readonly enumIndex: 16;
        readonly matrix: readonly [1, 0, 0, 0, 0, 1, 0, -1, 0];
    };
    readonly Z_90: {
        readonly enumIndex: 17;
        readonly matrix: readonly [0, 1, 0, 0, 0, 1, 1, 0, 0];
    };
    readonly Z_180: {
        readonly enumIndex: 18;
        readonly matrix: readonly [-1, 0, 0, 0, 0, 1, 0, 1, 0];
    };
    readonly Z_270: {
        readonly enumIndex: 19;
        readonly matrix: readonly [0, -1, 0, 0, 0, 1, -1, 0, 0];
    };
    readonly NZ_0: {
        readonly enumIndex: 20;
        readonly matrix: readonly [1, 0, 0, 0, 0, -1, 0, 1, 0];
    };
    readonly NZ_90: {
        readonly enumIndex: 21;
        readonly matrix: readonly [0, -1, 0, 0, 0, -1, 1, 0, 0];
    };
    readonly NZ_180: {
        readonly enumIndex: 22;
        readonly matrix: readonly [-1, 0, 0, 0, 0, -1, 0, -1, 0];
    };
    readonly NZ_270: {
        readonly enumIndex: 23;
        readonly matrix: readonly [0, 1, 0, 0, 0, -1, -1, 0, 0];
    };
};

/**
 * The options for a block collider. @public
 *
 * Use for: axis-aligned box colliders.
 * Do NOT use for: other shapes; use the matching collider option type.
 *
 * **Category:** Physics
 */
export declare interface BlockColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.BLOCK;
    /**
     * The half extents of the block collider.
     *
     * **Category:** Physics
     */
    halfExtents?: Vector3Like;
}

/**
 * The options for creating a block entity.
 *
 * Use for: entities rendered as blocks with a `BlockType` texture.
 * Do NOT use for: model entities; use `ModelEntityOptions`.
 *
 * **Category:** Entities
 * @public
 */
export declare interface BlockEntityOptions extends BaseEntityOptions {
    /** The half extents of the visual size of the block entity when blockTextureUri is set. If no rigidBodyOptions.colliders are provided, a block collider with the size of the half extents will be created. */
    blockHalfExtents?: Vector3Like;
    /** The texture uri of a entity if the entity is a block entity, if set rigidBodyOptions collider shape [0] must be a block */
    blockTextureUri?: string;
}

/**
 * A block placement in world coordinates.
 *
 * **Category:** Blocks
 * @public
 */
export declare interface BlockPlacement {
    globalCoordinate: Vector3Like;
    blockRotation?: BlockRotation;
}

declare type BlockPlacementEntry = {
    globalCoordinate: Vector3Like;
    blockTypeId: number;
    blockRotation?: BlockRotation;
};

/**
 * A block rotation from `BLOCK_ROTATIONS`.
 *
 * **Category:** Blocks
 * @public
 */
export declare type BlockRotation = typeof BLOCK_ROTATIONS[keyof typeof BLOCK_ROTATIONS];

/**
 * Block texture metadata including UVs and rendering hints.
 *
 * **Category:** Textures
 * @public
 */
export declare type BlockTextureMetadata = {
    u0: number;
    v0: number;
    u1: number;
    v1: number;
    averageRGB: [number, number, number];
    isTransparent: boolean;
    needsAlphaTest: boolean;
    transparencyRatio: number;
};

/**
 * Manages block textures and block texture atlas generation of the game.
 *
 * When to use: querying texture atlas UVs and transparency hints for blocks.
 * Do NOT use for: runtime texture modifications; regenerate atlas offline in dev.
 *
 * @remarks
 * The BlockTextureRegistry is created internally as a global
 * singleton accessible via `BlockTextureRegistry.instance`.
 * The atlas is preloaded during server startup and cached in memory.
 *
 * Pattern: call `BlockTextureRegistry.hasBlockTexture` before lookup to avoid warnings.
 * Anti-pattern: assuming missing textures are silently ignored.
 *
 * @example
 * ```typescript
 * import { BlockTextureRegistry } from 'hytopia';
 *
 * const blockTextureRegistry = BlockTextureRegistry.instance;
 * const metadata = blockTextureRegistry.getBlockTextureMetadata('blocks/stone.png');
 * ```
 *
 * **Category:** Textures
 * @public
 */
export declare class BlockTextureRegistry {
    /**
     * The global BlockTextureRegistry instance as a singleton.
     *
     * **Category:** Textures
     */
    static readonly instance: BlockTextureRegistry;
    /**
     * Whether to generate the atlas if needed.
     *
     * Defaults to `true` in development, `false` in production.
     *
     * **Category:** Textures
     */
    generate: boolean;


    /**
     * Checks if a block texture is registered in the atlas.
     *
     * @param textureUri - The URI of the texture (e.g., 'blocks/stone.png' or 'blocks/grass' for cubemaps).
     * @returns Whether the texture is registered.
     *
     * **Requires:** Atlas must be preloaded (server startup).
     *
     * **Category:** Textures
     */
    hasBlockTexture(textureUri: string): boolean;
    /**
     * Retrieves metadata for a block texture. Returns array for cubemaps (6 faces) or standard textures (1 face).
     *
     * @param textureUri - The URI of the texture (e.g., 'blocks/stone.png' or 'blocks/grass').
     * @returns Array of texture metadata, or undefined if not found.
     *
     * **Requires:** Atlas must be preloaded (server startup).
     *
     * **Category:** Textures
     */
    getBlockTextureMetadata(textureUri: string): BlockTextureMetadata[] | undefined;








}

/**
 * Represents a block type definition.
 *
 * When to use: defining new block types (textures, colliders, liquid behavior).
 * Do NOT use for: placing blocks directly; use `ChunkLattice.setBlock`.
 *
 * @remarks
 * Block types are created as instances and registered with a `BlockTypeRegistry`
 * for a specific world. Liquids are treated as sensors in physics.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `BlockTypeEventPayloads`.
 *
 * @example
 * ```typescript
 * const stoneBlockTypeId = 10;
 * world.blockTypeRegistry.registerBlockType(new BlockType({
 *   id: stoneBlockTypeId,
 *   textureUri: 'textures/stone.png',
 *   name: 'Stone',
 * }));
 *
 * // Create a stone block at coordinate 0, 1, 0
 * world.chunkLattice.setBlock({ x: 0, y: 1, z: 0 }, stoneBlockTypeId);
 * ```
 *
 * **Category:** Blocks
 * @public
 */
export declare class BlockType extends EventRouter implements protocol.Serializable {






    /**
     * Creates a new block type instance.
     *
     * Use for: defining a block type before registering it with a `BlockTypeRegistry`.
     *
     * @param options - The options for the block type.
     *
     * **Category:** Blocks
     */
    constructor(options?: BlockTypeOptions);
    /**
     * The unique identifier for the block type.
     *
     * **Category:** Blocks
     */
    get id(): number;
    /**
     * The collider options for the block type.
     *
     * **Category:** Blocks
     */
    get colliderOptions(): VoxelsColliderOptions | TrimeshColliderOptions;
    /**
     * Whether the block type is a liquid.
     *
     * **Category:** Blocks
     */
    get isLiquid(): boolean;
    /**
     * Whether the block type is meshable (voxel-based).
     *
     * **Category:** Blocks
     */
    get isMeshable(): boolean;
    /**
     * Whether the block type uses a trimesh collider.
     *
     * **Category:** Blocks
     */
    get isTrimesh(): boolean;
    /**
     * Whether the block type uses a voxel collider.
     *
     * **Category:** Blocks
     */
    get isVoxel(): boolean;
    /**
     * The light emission level (0-15).
     *
     * **Category:** Blocks
     */
    get lightLevel(): number;
    /**
     * The name of the block type.
     *
     * **Category:** Blocks
     */
    get name(): string;
    /**
     * The URI of the texture for the block type.
     *
     * **Category:** Blocks
     */
    get textureUri(): string;

    /**
     * Triggers an interaction on the block type from a player.
     *
     * Use for: programmatic interactions that should mimic player clicks.
     *
     * @remarks
     * This is automatically called when a player clicks or taps a block of this block type, but can also be called directly
     * for programmatic interactions. Emits `BlockTypeEvent.INTERACT`.
     *
     * @param player - The player interacting with the block type.
     * @param raycastHit - The raycast hit result, if the interaction was triggered by a client-side click/tap.
     *
     * **Side effects:** Emits `BlockTypeEvent.INTERACT`.
     *
     * **Category:** Blocks
     */
    interact(player: Player, raycastHit?: RaycastHit): void;


}

/**
 * Event types a BlockType instance can emit.
 *
 * See `BlockTypeEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum BlockTypeEvent {
    ENTITY_COLLISION = "BLOCK_TYPE.ENTITY_COLLISION",
    ENTITY_CONTACT_FORCE = "BLOCK_TYPE.ENTITY_CONTACT_FORCE",
    INTERACT = "BLOCK_TYPE.INTERACT"
}

/**
 * Event payloads for BlockType emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface BlockTypeEventPayloads {
    /** Emitted when an entity collides with a block type. */
    [BlockTypeEvent.ENTITY_COLLISION]: {
        blockType: BlockType;
        entity: Entity;
        started: boolean;
        colliderHandleA: number;
        colliderHandleB: number;
    };
    /** Emitted when an entity's contact force is applied to a block type. */
    [BlockTypeEvent.ENTITY_CONTACT_FORCE]: {
        blockType: BlockType;
        entity: Entity;
        contactForceData: ContactForceData;
    };
    /** Emitted when a player interacts with a block type. */
    [BlockTypeEvent.INTERACT]: {
        blockType: BlockType;
        player: Player;
        raycastHit?: RaycastHit;
    };
}

/**
 * Options for creating a block type instance.
 *
 * Use for: defining new block types to register in a `BlockTypeRegistry`.
 * Do NOT use for: placing blocks; use `ChunkLattice.setBlock`.
 *
 * **Category:** Blocks
 * @public
 */
export declare interface BlockTypeOptions {
    /** The unique numeric identifier for the block type. */
    id: number;
    /** The custom collider options for the block type. */
    customColliderOptions?: VoxelsColliderOptions | TrimeshColliderOptions;
    /** Whether the block type is a liquid. */
    isLiquid?: boolean;
    /** The light emission level, between 0 and 15. */
    lightLevel?: number;
    /** The name of the block type. */
    name: string;
    /** The URI of the texture asset for the block type. */
    textureUri: string;
}

/**
 * Manages known block types in a world.
 *
 * When to use: registering and retrieving block types for a specific world.
 * Do NOT use for: placing blocks; use `ChunkLattice.setBlock`.
 *
 * @remarks
 * Each `World` has its own registry. Block type IDs are unique per world.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `BlockTypeRegistryEventPayloads`.
 *
 * @example
 * ```typescript
 * world.blockTypeRegistry.registerGenericBlockType({
 *   id: 15,
 *   textureUri: 'textures/dirt.png',
 *   name: 'Dirt',
 * });
 * ```
 *
 * **Category:** Blocks
 * @public
 */
export declare class BlockTypeRegistry extends EventRouter implements protocol.Serializable {



    /**
     * The world the block type registry is for.
     *
     * **Category:** Blocks
     */
    get world(): World;
    /**
     * Get all registered block types.
     * @returns An array of all registered block types.
     *
     * **Category:** Blocks
     */
    getAllBlockTypes(): BlockType[];
    /**
     * Get a registered block type by its id.
     *
     * @remarks
     * Throws a fatal error if the block type is not registered.
     *
     * @param id - The id of the block type to get.
     * @returns The block type with the given id.
     *
     * **Category:** Blocks
     */
    getBlockType(id: number): BlockType;
    /**
     * Register a generic block type.
     *
     * @remarks
     * **Creates anonymous class:** Internally creates an anonymous class extending `BlockType` with the
     * provided options, then calls `registerBlockType()`.
     *
     * @param blockTypeOptions - The options for the block type.
     * @returns The registered block type.
     *
     * **Side effects:** Emits `BlockTypeRegistryEvent.REGISTER_BLOCK_TYPE`.
     *
     * **Category:** Blocks
     */
    registerGenericBlockType(blockTypeOptions: BlockTypeOptions): BlockType;
    /**
     * Register a block type.
     * @param blockType - The block type to register.
     *
     * **Side effects:** Emits `BlockTypeRegistryEvent.REGISTER_BLOCK_TYPE`.
     *
     * **Category:** Blocks
     */
    registerBlockType(blockType: BlockType): void;

}

/**
 * Event types a BlockTypeRegistry instance can emit.
 *
 * See `BlockTypeRegistryEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum BlockTypeRegistryEvent {
    REGISTER_BLOCK_TYPE = "BLOCK_TYPE_REGISTRY.REGISTER_BLOCK_TYPE"
}

/**
 * Event payloads for BlockTypeRegistry emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface BlockTypeRegistryEventPayloads {
    /** Emitted when a block type is registered. */
    [BlockTypeRegistryEvent.REGISTER_BLOCK_TYPE]: {
        blockTypeRegistry: BlockTypeRegistry;
        id: number;
        blockType: BlockType;
    };
}

/**
 * The options for a capsule collider. @public
 *
 * Use for: capsule-shaped colliders.
 * Do NOT use for: other shapes; use the matching collider option type.
 *
 * **Category:** Physics
 */
export declare interface CapsuleColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.CAPSULE;
    /**
     * The half height of the capsule collider.
     *
     * **Category:** Physics
     */
    halfHeight?: number;
    /**
     * The radius of the capsule collider.
     *
     * **Category:** Physics
     */
    radius?: number;
}

/**
 * Event types a ChatManager instance can emit.
 *
 * See `ChatEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum ChatEvent {
    BROADCAST_MESSAGE = "CHAT.BROADCAST_MESSAGE",
    PLAYER_MESSAGE = "CHAT.PLAYER_MESSAGE"
}

/**
 * Event payloads for ChatManager emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface ChatEventPayloads {
    /** Emitted when a broadcast message is sent. */
    [ChatEvent.BROADCAST_MESSAGE]: {
        player: Player | undefined;
        message: string;
        color?: string;
    };
    /** Emitted when a message is sent to a specific player. */
    [ChatEvent.PLAYER_MESSAGE]: {
        player: Player;
        message: string;
        color?: string;
    };
}

/**
 * Manages chat and commands in a world.
 *
 * When to use: broadcasting chat, sending system messages, or registering chat commands.
 * Do NOT use for: player HUD/menus; use `PlayerUI` for rich UI.
 *
 * @remarks
 * The ChatManager is created internally as a singleton
 * for each `World` instance in a game server.
 * The ChatManager allows you to broadcast messages,
 * send messages to specific players, and register
 * commands that can be used in chat to execute game
 * logic.
 *
 * Pattern: register commands during world initialization and keep callbacks fast.
 * Anti-pattern: assuming commands are permission-checked; always validate access in callbacks.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under `ChatEventPayloads`
 *
 * @example
 * ```typescript
 * world.chatManager.registerCommand('/kick', (player, args, message) => {
 *   const admins = [ 'arkdev', 'testuser123' ];
 *   if (admins.includes(player.username)) {
 *     const targetUsername = args[0];
 *     const targetPlayer = world.playerManager.getConnectedPlayerByUsername(targetUsername);
 *
 *     if (targetPlayer) {
 *       targetPlayer.disconnect();
 *     }
 *   }
 * });
 * ```
 *
 * **Category:** Chat
 * @public
 */
export declare class ChatManager extends EventRouter {



    /**
     * Register a command and its callback.
     *
     * @remarks
     * Commands are matched by exact string equality against the first token in a chat message.
     *
     * @param command - The command to register.
     * @param callback - The callback function to execute when the command is used.
     *
     * **Requires:** Use a consistent command prefix (for example, `/kick`) if you want slash commands.
     *
     * @see `ChatManager.unregisterCommand`
     *
     * **Category:** Chat
     */
    registerCommand(command: string, callback: CommandCallback): void;
    /**
     * Unregister a command.
     *
     * @param command - The command to unregister.
     *
     * @see `ChatManager.registerCommand`
     *
     * **Category:** Chat
     */
    unregisterCommand(command: string): void;
    /**
     * Send a system broadcast message to all players in the world.
     *
     * @param message - The message to send.
     * @param color - The color of the message as a hex color code, excluding #.
     *
     * @example
     * ```typescript
     * chatManager.sendBroadcastMessage('Hello, world!', 'FF00AA');
     * ```
     *
     * **Side effects:** Emits `ChatEvent.BROADCAST_MESSAGE` for network sync.
     *
     * @see `ChatManager.sendPlayerMessage`
     *
     * **Category:** Chat
     */
    sendBroadcastMessage(message: string, color?: string): void;
    /**
     * Handle a command if it exists.
     *
     * @param player - The player that sent the command.
     * @param message - The full message.
     * @returns True if a command was handled, false otherwise.
     *
     * @remarks
     * The command is parsed as the first space-delimited token in the message.
     *
     * **Category:** Chat
     */
    handleCommand(player: Player, message: string): boolean;
    /**
     * Send a system message to a specific player, only visible to them.
     *
     * @param player - The player to send the message to.
     * @param message - The message to send.
     * @param color - The color of the message as a hex color code, excluding #.
     *
     * @example
     * ```typescript
     * chatManager.sendPlayerMessage(player, 'Hello, player!', 'FF00AA');
     * ```
     *
     * **Side effects:** Emits `ChatEvent.PLAYER_MESSAGE` for network sync.
     *
     * @see `ChatManager.sendBroadcastMessage`
     *
     * **Category:** Chat
     */
    sendPlayerMessage(player: Player, message: string, color?: string): void;


}

/**
 * A 16^3 chunk of blocks representing a slice of world terrain.
 *
 * When to use: reading chunk data or working with bulk block operations.
 * Do NOT use for: creating terrain directly; prefer `ChunkLattice`.
 *
 * @remarks
 * Chunks are fixed-size (16×16×16) and store block IDs by local coordinates.
 *
 * <h2>Coordinate System</h2>
 *
 * - **Global (world) coordinates:** integer block positions in world space.
 * - **Chunk origin:** the world coordinate at the chunk's minimum corner (multiples of 16).
 * - **Local coordinates:** 0..15 per axis within the chunk.
 *
 * **Category:** Blocks
 * @public
 */
export declare class Chunk implements protocol.Serializable {



    /**
     * Creates a new chunk instance.
     */
    constructor(originCoordinate: Vector3Like);
    /**
     * The blocks in the chunk as a flat Uint8Array[4096], each index as 0 or a block type ID.
     *
     * **Category:** Blocks
     */
    get blocks(): Readonly<Uint8Array>;
    /**
     * The rotations of the blocks in the chunk as a map of block index to rotation.
     *
     * **Category:** Blocks
     */
    get blockRotations(): Readonly<Map<number, BlockRotation>>;
    /**
     * The origin coordinate of the chunk (world-space, multiples of 16).
     *
     * **Category:** Blocks
     */
    get originCoordinate(): Vector3Like;
    /**
     * Converts a block index to a local coordinate.
     *
     * @param index - The index of the block to convert.
     * @returns The local coordinate of the block.
     *
     * **Category:** Blocks
     */
    static blockIndexToLocalCoordinate(index: number): Vector3Like;

    /**
     * Converts a global coordinate to a local coordinate.
     *
     * @param globalCoordinate - The global coordinate to convert.
     * @returns The local coordinate.
     *
     * **Category:** Blocks
     */
    static globalCoordinateToLocalCoordinate(globalCoordinate: Vector3Like): Vector3Like;
    /**
     * Converts a global coordinate to a chunk origin coordinate.
     *
     * @param globalCoordinate - The global coordinate to convert.
     * @returns The origin coordinate.
     *
     * **Category:** Blocks
     */
    static globalCoordinateToOriginCoordinate(globalCoordinate: Vector3Like): Vector3Like;
    /**
     * Gets the block type ID at a specific local coordinate.
     *
     * @remarks
     * Expects local coordinates in the range 0..15 for each axis.
     *
     * @param localCoordinate - The local coordinate of the block to get.
     * @returns The block type ID.
     *
     * **Category:** Blocks
     */
    getBlockId(localCoordinate: Vector3Like): number;
    /**
     * Gets the rotation of a block at a specific local coordinate.
     *
     * @param localCoordinate - The local coordinate of the block to get the rotation of.
     * @returns The rotation of the block (defaults to identity rotation).
     *
     * **Category:** Blocks
     */
    getBlockRotation(localCoordinate: Vector3Like): BlockRotation;
    /**
     * Checks if a block exists at a specific local coordinate.
     *
     * @param localCoordinate - The local coordinate of the block to check.
     * @returns Whether a block exists.
     *
     * **Category:** Blocks
     */
    hasBlock(localCoordinate: Vector3Like): boolean;




}

/**
 * A lattice of chunks that represent a world's terrain.
 *
 * When to use: reading or mutating blocks in world space.
 * Do NOT use for: per-entity placement logic; prefer higher-level game systems.
 *
 * @remarks
 * The lattice owns all chunks and keeps physics colliders in sync with blocks.
 *
 * <h2>Coordinate System</h2>
 *
 * - **Global (world) coordinates:** integer block positions in world space.
 * - **Chunk origin:** world coordinate at the chunk's minimum corner (multiples of 16).
 * - **Local coordinates:** 0..15 per axis within a chunk.
 * - **Axes:** +X right, +Y up, -Z forward.
 * - **Origin:** (0,0,0) is the world origin.
 *
 * **Category:** Blocks
 * @public
 */
export declare class ChunkLattice extends EventRouter {






    /**
     * Creates a new chunk lattice instance.
     * @param world - The world the chunk lattice is for.
     */
    constructor(world: World);
    /**
     * The number of chunks in the lattice.
     *
     * **Category:** Blocks
     */
    get chunkCount(): number;
    /**
     * Removes and clears all chunks and their blocks from the lattice.
     *
     * Use for: full world resets or map reloads.
     * Do NOT use for: incremental changes; use `ChunkLattice.setBlock`.
     *
     * @remarks
     * **Removes colliders:** All block type colliders are removed from the physics simulation.
     *
     * **Emits events:** Emits `REMOVE_CHUNK` for each chunk before clearing.
     *
     * **Side effects:** Clears all chunks, placements, and block colliders.
     *
     * **Category:** Blocks
     */
    clear(): void;
    /**
     * Gets the block type ID at a specific global coordinate.
     *
     * @param globalCoordinate - The global coordinate of the block to get.
     * @returns The block type ID, or 0 if no block is set.
     *
     * **Category:** Blocks
     */
    getBlockId(globalCoordinate: Vector3Like): number;

    /**
     * Gets the block type at a specific global coordinate.
     *
     * @param globalCoordinate - The global coordinate of the block to get.
     * @returns The block type, or null if no block is set.
     *
     * **Category:** Blocks
     */
    getBlockType(globalCoordinate: Vector3Like): BlockType | null;
    /**
     * Gets the number of blocks of a specific block type in the lattice.
     *
     * @param blockTypeId - The block type ID to count.
     * @returns The number of blocks of the block type.
     *
     * **Category:** Blocks
     */
    getBlockTypeCount(blockTypeId: number): number;
    /**
     * Gets the chunk that contains the given global coordinate.
     *
     * @param globalCoordinate - The global coordinate to get the chunk for.
     * @returns The chunk that contains the given global coordinate or undefined if not found.
     *
     * **Category:** Blocks
     */
    getChunk(globalCoordinate: Vector3Like): Chunk | undefined;

    /**
     * Gets the chunk for a given global coordinate, creating it if it doesn't exist.
     *
     * @remarks
     * Creates a new chunk and emits `ChunkLatticeEvent.ADD_CHUNK` if needed.
     *
     * @param globalCoordinate - The global coordinate of the chunk to get.
     * @returns The chunk at the given global coordinate (created if needed).
     *
     * **Side effects:** May create and register a new chunk.
     *
     * **Category:** Blocks
     */
    getOrCreateChunk(globalCoordinate: Vector3Like): Chunk;
    /**
     * Gets all chunks in the lattice.
     *
     * @returns An array of all chunks in the lattice.
     *
     * **Category:** Blocks
     */
    getAllChunks(): Chunk[];
    /**
     * Checks if a block exists at a specific global coordinate.
     *
     * @param globalCoordinate - The global coordinate of the block to check.
     * @returns Whether a block exists.
     *
     * **Category:** Blocks
     */
    hasBlock(globalCoordinate: Vector3Like): boolean;
    /**
     * Checks if a chunk exists for a given global coordinate.
     *
     * @param globalCoordinate - The global coordinate of the chunk to check.
     * @returns Whether the chunk exists.
     *
     * **Category:** Blocks
     */
    hasChunk(globalCoordinate: Vector3Like): boolean;
    /**
     * Initializes all blocks in the lattice in bulk, replacing existing blocks.
     *
     * Use for: loading maps or generating terrain in one pass.
     * Do NOT use for: incremental edits; use `ChunkLattice.setBlock`.
     *
     * @remarks
     * **Clears first:** Calls `ChunkLattice.clear` before initializing, removing all existing blocks and colliders.
     *
     * **Collider optimization:** Creates one collider per block type with all placements combined.
     * Voxel colliders have their states combined for efficient neighbor collision detection.
     *
     * @param blocks - The blocks to initialize, keyed by block type ID.
     *
     * **Side effects:** Clears existing data, creates colliders, and emits `ChunkLatticeEvent.SET_BLOCK` per block.
     *
     * **Category:** Blocks
     */
    initializeBlocks(blocks: {
        [blockTypeId: number]: BlockPlacement[];
    }): void;

    /**
     * Sets the block at a global coordinate by block type ID.
     *
     * Use for: incremental terrain edits.
     * Do NOT use for: bulk terrain loading; use `ChunkLattice.initializeBlocks`.
     *
     * @remarks
     * **Air:** Use block type ID `0` to remove a block (set to air).
     *
     * **Collider updates:** For voxel block types, updates the existing collider.
     * For trimesh block types, recreates the entire collider.
     *
     * **Removes previous:** If replacing an existing block, removes it from its collider first.
     * If the previous block type has no remaining blocks, its collider is removed from simulation.
     *
     * @param globalCoordinate - The global coordinate of the block to set.
     * @param blockTypeId - The block type ID to set. Use 0 to remove the block and replace with air.
     * @param blockRotation - The rotation of the block.
     *
     * **Side effects:** Emits `ChunkLatticeEvent.SET_BLOCK` and mutates block colliders.
     *
     * **Category:** Blocks
     */
    setBlock(globalCoordinate: Vector3Like, blockTypeId: number, blockRotation?: BlockRotation): void;











}

/**
 * Event types a ChunkLattice instance can emit.
 *
 * See `ChunkLatticeEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum ChunkLatticeEvent {
    ADD_CHUNK = "CHUNK_LATTICE.ADD_CHUNK",
    REMOVE_CHUNK = "CHUNK_LATTICE.REMOVE_CHUNK",
    SET_BLOCK = "CHUNK_LATTICE.SET_BLOCK"
}

/**
 * Event payloads for ChunkLattice emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface ChunkLatticeEventPayloads {
    /** Emitted when a chunk is added to the lattice. */
    [ChunkLatticeEvent.ADD_CHUNK]: {
        chunkLattice: ChunkLattice;
        chunk: Chunk;
    };
    /** Emitted when a chunk is removed from the lattice. */
    [ChunkLatticeEvent.REMOVE_CHUNK]: {
        chunkLattice: ChunkLattice;
        chunk: Chunk;
    };
    /** Emitted when a block is set in the lattice. */
    [ChunkLatticeEvent.SET_BLOCK]: {
        chunkLattice: ChunkLattice;
        chunk: Chunk;
        globalCoordinate: Vector3Like;
        localCoordinate: Vector3Like;
        blockTypeId: number;
        blockRotation?: BlockRotation;
    };
}

/**
 * The coefficient for friction or bounciness combine rule. @public
 *
 * **Category:** Physics
 */
export declare enum CoefficientCombineRule {
    Average = 0,
    Min = 1,
    Multiply = 2,
    Max = 3
}

/**
 * Represents a collider in a world's physics simulation.
 *
 * When to use: defining collision shapes for rigid bodies or entities.
 * Do NOT use for: gameplay queries; use `Simulation.raycast` or intersection APIs instead.
 *
 * @remarks
 * Colliders are usually created via `RigidBody` or `Entity` options.
 * You can also create and manage them directly for advanced use cases.
 *
 * **Category:** Physics
 * @public
 */
export declare class Collider extends EventRouter {










    /**
     * Creates a collider with the provided options.
     *
     * Use for: configuring a collider before adding it to a simulation or rigid body.
     *
     * @param colliderOptions - The options for the collider instance.
     *
     * **Category:** Physics
     */
    constructor(colliderOptions: ColliderOptions);
    /**
     * Creates collider options from a block's half extents.
     *
     * @param halfExtents - The half extents of the block.
     * @returns The collider options object.
     *
     * **Category:** Physics
     */
    static optionsFromBlockHalfExtents(halfExtents: Vector3Like): ColliderOptions;
    /**
     * Creates collider options from a model URI using an approximate shape and size.
     *
     * @remarks
     * Uses model bounds and heuristics unless `preferredShape` is specified.
     *
     * @param modelUri - The URI of the model.
     * @param scale - The scale of the model.
     * @param preferredShape - The preferred shape to use for the collider.
     * @returns The collider options object.
     *
     * **Category:** Physics
     */
    static optionsFromModelUri(modelUri: string, scale?: Vector3Like | number, preferredShape?: ColliderShape): ColliderOptions;
    /**
     * The bounciness of the collider.
     *
     * **Category:** Physics
     */
    get bounciness(): number;
    /**
     * The bounciness combine rule of the collider.
     *
     * **Category:** Physics
     */
    get bouncinessCombineRule(): CoefficientCombineRule;
    /**
     * The collision groups the collider belongs to.
     *
     * **Category:** Physics
     */
    get collisionGroups(): CollisionGroups;
    /**
     * The friction of the collider.
     *
     * **Category:** Physics
     */
    get friction(): number;
    /**
     * The friction combine rule of the collider.
     *
     * **Category:** Physics
     */
    get frictionCombineRule(): CoefficientCombineRule;
    /**
     * Whether the collider is enabled.
     *
     * **Category:** Physics
     */
    get isEnabled(): boolean;
    /**
     * Whether the collider has been removed from the simulation.
     *
     * **Category:** Physics
     */
    get isRemoved(): boolean;
    /**
     * Whether the collider is a sensor.
     *
     * **Category:** Physics
     */
    get isSensor(): boolean;
    /**
     * Whether the collider is simulated.
     *
     * **Category:** Physics
     */
    get isSimulated(): boolean;
    /**
     * Whether the collider is a ball collider.
     *
     * **Category:** Physics
     */
    get isBall(): boolean;
    /**
     * Whether the collider is a block collider.
     *
     * **Category:** Physics
     */
    get isBlock(): boolean;
    /**
     * Whether the collider is a capsule collider.
     *
     * **Category:** Physics
     */
    get isCapsule(): boolean;
    /**
     * Whether the collider is a cone collider.
     *
     * **Category:** Physics
     */
    get isCone(): boolean;
    /**
     * Whether the collider is a cylinder collider.
     *
     * **Category:** Physics
     */
    get isCylinder(): boolean;
    /**
     * Whether the collider is a none collider.
     *
     * **Category:** Physics
     */
    get isNone(): boolean;
    /**
     * Whether the collider is a round cylinder collider.
     *
     * **Category:** Physics
     */
    get isRoundCylinder(): boolean;
    /**
     * Whether the collider is a trimesh collider.
     *
     * **Category:** Physics
     */
    get isTrimesh(): boolean;
    /**
     * Whether the collider is a voxel collider.
     *
     * **Category:** Physics
     */
    get isVoxel(): boolean;
    /**
     * Whether the collider is a wedge collider.
     *
     * **Category:** Physics
     */
    get isWedge(): boolean;
    /**
     * The parent rigid body of the collider.
     *
     * **Category:** Physics
     */
    get parentRigidBody(): RigidBody | undefined;
    /**
     * The raw collider object from the Rapier physics engine.
     *
     * **Category:** Physics
     */
    get rawCollider(): RawCollider | undefined;
    /**
     * The raw shape object from the Rapier physics engine.
     *
     * **Category:** Physics
     */
    get rawShape(): RawShape | undefined;
    /**
     * The relative position of the collider to its parent rigid body.
     *
     * **Category:** Physics
     */
    get relativePosition(): Vector3Like;
    /**
     * The relative rotation of the collider.
     *
     * **Category:** Physics
     */
    get relativeRotation(): QuaternionLike;
    /**
     * The scale of the collider.
     *
     * **Category:** Physics
     */
    get scale(): Vector3Like;
    /**
     * The shape of the collider.
     *
     * **Category:** Physics
     */
    get shape(): ColliderShape;
    /**
     * An arbitrary identifier tag of the collider. Useful for your own logic.
     *
     * **Category:** Physics
     */
    get tag(): string | undefined;
    /**
     * Sets the bounciness of the collider.
     * @param bounciness - The bounciness of the collider.
     *
     *
     * **Category:** Physics
     */
    setBounciness(bounciness: number): void;
    /**
     * Sets the bounciness combine rule of the collider.
     * @param bouncinessCombineRule - The bounciness combine rule of the collider.
     *
     *
     * **Category:** Physics
     */
    setBouncinessCombineRule(bouncinessCombineRule: CoefficientCombineRule): void;
    /**
     * Sets the collision groups of the collider.
     * @param collisionGroups - The collision groups of the collider.
     *
     *
     * **Category:** Physics
     */
    setCollisionGroups(collisionGroups: CollisionGroups): void;
    /**
     * Sets whether the collider is enabled.
     * @param enabled - Whether the collider is enabled.
     *
     *
     * **Category:** Physics
     */
    setEnabled(enabled: boolean): void;
    /**
     * Sets the friction of the collider.
     * @param friction - The friction of the collider.
     *
     *
     * **Category:** Physics
     */
    setFriction(friction: number): void;
    /**
     * Sets the friction combine rule of the collider.
     * @param frictionCombineRule - The friction combine rule of the collider.
     *
     *
     * **Category:** Physics
     */
    setFrictionCombineRule(frictionCombineRule: CoefficientCombineRule): void;
    /**
     * Sets the half extents of a simulated block collider.
     * @param halfExtents - The half extents of the block collider.
     *
     *
     * **Category:** Physics
     */
    setHalfExtents(halfExtents: Vector3Like): void;
    /**
     * Sets the half height of a simulated capsule, cone, cylinder, or round cylinder collider.
     * @param halfHeight - The half height of the capsule, cone, cylinder, or round cylinder collider.
     *
     *
     * **Category:** Physics
     */
    setHalfHeight(halfHeight: number): void;
    /**
     * Sets the mass of the collider.
     * @param mass - The mass of the collider.
     *
     *
     * **Category:** Physics
     */
    setMass(mass: number): void;
    /**
     * Sets the on collision callback for the collider.
     *
     * @remarks
     * **Auto-enables events:** Automatically enables/disables collision events based on whether callback is set.
     *
     * @param callback - The on collision callback for the collider.
     *
     *
     * **Category:** Physics
     */
    setOnCollision(callback: CollisionCallback | undefined): void;
    /**
     * Sets the radius of a simulated ball, capsule, cylinder, or round cylinder collider.
     * @param radius - The radius of the collider.
     *
     *
     * **Category:** Physics
     */
    setRadius(radius: number): void;
    /**
     * Sets the relative rotation of the collider to its parent rigid body or the world origin.
     *
     * @remarks
     * Colliders can be added as a child of a rigid body, or to the world directly. This rotation
     * is relative to the parent rigid body or the world origin.
     *
     * @param rotation - The relative rotation of the collider.
     *
     *
     * **Category:** Physics
     */
    setRelativeRotation(rotation: QuaternionLike): void;
    /**
     * Sets the position of the collider relative to its parent rigid body or the world origin.
     *
     * @remarks
     * Colliders can be added as a child of a rigid body, or to the world directly. This position
     * is relative to the parent rigid body or the world origin.
     *
     * @param position - The relative position of the collider.
     *
     *
     * **Category:** Physics
     */
    setRelativePosition(position: Vector3Like): void;
    /**
     * Sets whether the collider is a sensor.
     * @param sensor - Whether the collider is a sensor.
     *
     *
     * **Category:** Physics
     */
    setSensor(sensor: boolean): void;
    /**
     * Sets the tag of the collider.
     * @param tag - The tag of the collider.
     *
     *
     * **Category:** Physics
     */
    setTag(tag: string): void;
    /**
     * Sets the voxel at the given coordinate as filled or not filled.
     * @param coordinate - The coordinate of the voxel to set.
     * @param filled - True if the voxel at the coordinate should be filled, false if it should be removed.
     *
     *
     * **Category:** Physics
     */
    setVoxel(coordinate: Vector3Like, filled: boolean): void;
    /**
     * Adds the collider to the simulation.
     *
     * @remarks
     * **Parent linking:** Links the collider to the parent rigid body if provided.
     *
     * **Collision callback:** Applies any configured `onCollision` callback.
     *
     * @param simulation - The simulation to add the collider to.
     * @param parentRigidBody - The parent rigid body of the collider.
     *
     * **Category:** Physics
     */
    addToSimulation(simulation: Simulation, parentRigidBody?: RigidBody): void;

    /**
     * Enables or disables collision events for the collider.
     * This is automatically enabled if an on collision callback is set.
     * @param enabled - Whether collision events are enabled.
     *
     *
     * **Category:** Physics
     */
    enableCollisionEvents(enabled: boolean): void;
    /**
     * Enables or disables contact force events for the collider.
     * This is automatically enabled if an on contact force callback is set.
     * @param enabled - Whether contact force events are enabled.
     *
     *
     * **Category:** Physics
     */
    enableContactForceEvents(enabled: boolean): void;

    /**
     * Removes the collider from the simulation.
     *
     * @remarks
     * **Parent unlinking:** Unlinks from parent rigid body if attached.
     *
     * **Side effects:** Removes the collider from the simulation and unlinks it from any parent rigid body.
     *
     * **Category:** Physics
     */
    removeFromSimulation(): void;
    /**
     * Scales the collider by the given scalar. Only
     * ball, block, capsule, cone, cylinder, round cylinder
     * are supported.
     *
     * @remarks
     * **Ratio-based:** Uses ratio-based scaling relative to current scale, not absolute dimensions.
     * Also scales `relativePosition` proportionally.
     *
     * @param scalar - The scalar to scale the collider by.
     *
     *
     * **Category:** Physics
     */
    setScale(scale: Vector3Like): void;


    private _buildWedgeConvexHullVertices;






}

/**
 * The options for a collider. @public
 *
 * Use for: providing collider definitions when creating rigid bodies or entities.
 * Do NOT use for: runtime changes; use `Collider` APIs instead.
 *
 * **Category:** Physics
 */
export declare type ColliderOptions = BallColliderOptions | BlockColliderOptions | CapsuleColliderOptions | ConeColliderOptions | CylinderColliderOptions | RoundCylinderColliderOptions | TrimeshColliderOptions | VoxelsColliderOptions | WedgeColliderOptions | NoneColliderOptions;

/**
 * The shapes a collider can be. @public
 *
 * **Category:** Physics
 */
export declare enum ColliderShape {
    NONE = "none",
    BALL = "ball",
    BLOCK = "block",
    CAPSULE = "capsule",
    CONE = "cone",
    CYLINDER = "cylinder",
    ROUND_CYLINDER = "round-cylinder",
    TRIMESH = "trimesh",
    VOXELS = "voxels",
    WEDGE = "wedge"
}

/**
 * A callback function that is called when a collision occurs.
 *
 * @param other - The other object involved in the collision, a block or entity.
 * @param started - Whether the collision has started or ended.
 *
 * **Category:** Physics
 * @public
 */
export declare type CollisionCallback = ((other: BlockType | Entity, started: boolean) => void) | ((other: BlockType | Entity, started: boolean, colliderHandleA: number, colliderHandleB: number) => void);

/**
 * The default collision groups.
 *
 * @remarks
 * Collision groups determine which objects collide and generate events. Up to 15 groups
 * can be registered. Filtering uses pairwise bit masks:
 *
 * - The belongsTo groups (the 16 left-most bits of `self.0`)
 * - The collidesWith mask (the 16 right-most bits of `self.0`)
 *
 * An interaction is allowed between two filters `a` and `b` if:
 *
 * ```
 * ((a >> 16) & b) != 0 && ((b >> 16) & a) != 0
 * ```
 *
 * **Category:** Physics
 * @public
 */
export declare enum CollisionGroup {
    BLOCK = 1,
    ENTITY = 2,
    ENTITY_SENSOR = 4,
    ENVIRONMENT_ENTITY = 8,
    PLAYER = 16,
    GROUP_1 = 32,
    GROUP_2 = 64,
    GROUP_3 = 128,
    GROUP_4 = 256,
    GROUP_5 = 512,
    GROUP_6 = 1024,
    GROUP_7 = 2048,
    GROUP_8 = 4096,
    GROUP_9 = 8192,
    GROUP_10 = 16384,
    GROUP_11 = 32768,
    ALL = 65535
}

/**
 * A set of collision groups.
 *
 * **Category:** Physics
 * @public
 */
export declare type CollisionGroups = {
    belongsTo: CollisionGroup[];
    collidesWith: CollisionGroup[];
};

/**
 * A helper class for building and decoding collision groups.
 *
 * When to use: creating custom collision filters for colliders and rigid bodies.
 * Do NOT use for: per-frame changes; collision group changes are usually infrequent.
 *
 * @remarks
 * Use the static methods directly to encode or decode collision group masks.
 *
 * **Category:** Physics
 * @public
 */
export declare class CollisionGroupsBuilder {
    private static readonly BELONGS_TO_SHIFT;
    private static readonly COLLIDES_WITH_MASK;
    /**
     * Builds a raw collision group mask from a set of collision groups.
     *
     * @param collisionGroups - The set of collision groups to build.
     * @returns A raw set of collision groups represented as a 32-bit number.
     *
     * **Category:** Physics
     */
    static buildRawCollisionGroups(collisionGroups: CollisionGroups): RawCollisionGroups;
    /**
     * Decodes a raw collision group mask into a set of collision groups.
     *
     * @param groups - The raw set of collision groups to decode.
     * @returns A set of collision groups.
     *
     * **Category:** Physics
     */
    static decodeRawCollisionGroups(groups: RawCollisionGroups): CollisionGroups;
    /**
     * Decodes collision groups into their string equivalents.
     *
     * @param collisionGroups - The set of collision groups to decode.
     * @returns A set of collision groups represented as their string equivalents.
     *
     * **Category:** Physics
     */
    static decodeCollisionGroups(collisionGroups: CollisionGroups): DecodedCollisionGroups;
    /**
     * Checks if the collision groups are the default collision groups.
     *
     * @param collisionGroups - The set of collision groups to check.
     * @returns Whether the collision groups are the default collision groups.
     *
     * **Category:** Physics
     */
    static isDefaultCollisionGroups(collisionGroups: CollisionGroups): boolean;
    /**
     * Combines an array of collision groups into a raw set of collision groups.
     * @param groups - The array of collision groups to combine.
     * @returns A raw set of collision groups represented as a 32-bit number.
     */
    private static combineGroups;


}

/**
 * A callback function for a chat command.
 * @param player - The player that sent the command.
 * @param args - An array of arguments, comprised of all space separated text after the command.
 * @param message - The full message of the command.
 * **Category:** Chat
 * @public
 */
export declare type CommandCallback = (player: Player, args: string[], message: string) => void;

/**
 * The options for a cone collider. @public
 *
 * Use for: cone-shaped colliders.
 * Do NOT use for: other shapes; use the matching collider option type.
 *
 * **Category:** Physics
 */
export declare interface ConeColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.CONE;
    /**
     * The half height of the cone collider.
     *
     * **Category:** Physics
     */
    halfHeight?: number;
    /**
     * The radius of the cone collider.
     *
     * **Category:** Physics
     */
    radius?: number;
}

/**
 * Data for contact forces.
 *
 * **Category:** Physics
 * @public
 */
export declare type ContactForceData = {
    /** The total force vector. */
    totalForce: RAPIER.Vector;
    /** The magnitude of the total force. */
    totalForceMagnitude: number;
    /** The direction of the maximum force. */
    maxForceDirection: RAPIER.Vector;
    /** The magnitude of the maximum force. */
    maxForceMagnitude: number;
};

/**
 * A contact manifold.
 *
 * **Category:** Physics
 * @public
 */
export declare type ContactManifold = {
    /** The contact points as global coordinates. */
    contactPoints: Vector3Like[];
    /** The local normal vector of the first collider. */
    localNormalA: Vector3Like;
    /** The local normal vector of the second collider. */
    localNormalB: Vector3Like;
    /** The normal vector of the contact. */
    normal: Vector3Like;
};

/**
 * The options for a cylinder collider. @public
 *
 * Use for: cylinder-shaped colliders.
 * Do NOT use for: other shapes; use the matching collider option type.
 *
 * **Category:** Physics
 */
export declare interface CylinderColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.CYLINDER;
    /**
     * The half height of the cylinder collider.
     *
     * **Category:** Physics
     */
    halfHeight?: number;
    /**
     * The radius of the cylinder collider.
     *
     * **Category:** Physics
     */
    radius?: number;
}

/**
 * A decoded set of collision groups represented as their string equivalents.
 *
 * **Category:** Physics
 * @public
 */
export declare type DecodedCollisionGroups = {
    belongsTo: string[];
    collidesWith: string[];
};

/**
 * The default rigid body options for a model entity when `EntityOptions.rigidBodyOptions` is not provided.
 *
 * **Category:** Entities
 * @public
 */
export declare const DEFAULT_ENTITY_RIGID_BODY_OPTIONS: RigidBodyOptions;

/**
 * Represents the default player model entity.
 *
 * When to use: standard player avatars with built-in cosmetics and default controls.
 * Do NOT use for: fully custom player rigs that don't match the default model's anchors/animations.
 *
 * @remarks
 * Extends `PlayerEntity`, uses the default player model, and assigns
 * `DefaultPlayerEntityController`. You can override defaults, but if you
 * change `modelUri`, ensure the model has the same animation names and anchor points.
 *
 * @example
 * ```typescript
 * const playerEntity = new DefaultPlayerEntity({ player });
 *
 * playerEntity.spawn(world, { x: 0, y: 10, z: 0 });
 * ```
 *
 * **Category:** Entities
 * @public
 */
export declare class DefaultPlayerEntity extends PlayerEntity {
    private _cosmeticHiddenSlots;
    /**
     * Creates a new DefaultPlayerEntity instance.
     *
     * @remarks
     * **Auto-assigned defaults:** A `DefaultPlayerEntityController` is automatically created and assigned.
     * Default idle animations are initialized as looped and playing.
     *
     * **Cosmetics on spawn:** When spawned, player cosmetics (hair, skin, equipped items) are fetched asynchronously
     * and applied. Child entities are created for hair and equipped cosmetic items.
     *
     * @param options - The options for the default player entity.
     *
     * **Category:** Entities
     */
    constructor(options: DefaultPlayerEntityOptions);
    /**
     * The cosmetic slots that are hidden.
     *
     * **Category:** Entities
     * @public
     */
    get cosmeticHiddenSlots(): PlayerCosmeticSlot[];

}

/**
 * The default player entity controller implementation.
 *
 * When to use: player-controlled avatars using `DefaultPlayerEntity`.
 * Do NOT use for: NPCs or non-player entities; use `SimpleEntityController` or
 * `PathfindingEntityController` instead.
 *
 * @remarks
 * Extends `BaseEntityController` and implements default movement, platforming,
 * jumping, and swimming. You can extend this class to add custom logic.
 *
 * <h2>Coordinate System & Model Orientation</h2>
 *
 * HYTOPIA uses **-Z as forward**. Models must be authored with their front facing -Z.
 * A yaw of 0 means facing -Z. The controller rotates the entity based on camera yaw and
 * movement direction, always orienting the entity's -Z axis in the intended facing direction.
 *
 * @example
 * ```typescript
 * // Create a custom entity controller for myEntity, prior to spawning it.
 * myEntity.setController(new DefaultPlayerEntityController({
 *   jumpVelocity: 10,
 *   runVelocity: 8,
 *   walkVelocity: 4,
 * }));
 *
 * // Spawn the entity in the world.
 * myEntity.spawn(world, { x: 53, y: 10, z: 23 });
 * ```
 *
 * **Category:** Controllers
 * @public
 */
export declare class DefaultPlayerEntityController extends BaseEntityController {
    private static readonly BASE_ENTITY_HEIGHT;
    private static readonly GROUND_SENSOR_HEIGHT_SCALE;
    private static readonly GROUND_SENSOR_RADIUS_SCALE;
    private static readonly JUMP_LAND_HEAVY_VELOCITY_THRESHOLD;
    private static readonly WALL_COLLIDER_HEIGHT_SCALE;
    private static readonly WALL_COLLIDER_RADIUS_SCALE;
    private static readonly MOVEMENT_ROTATIONS;
    private static readonly EXTERNAL_IMPULSE_DECAY_RATE;
    private static readonly SWIM_UPWARD_COOLDOWN_MS;
    private static readonly SWIMMING_DRAG_FACTOR;
    private static readonly WATER_ENTRY_SINKING_FACTOR;
    private static readonly WATER_ENTRY_SINKING_MS;
    /** Whether to apply directional rotations to the entity while moving, defaults to true. */
    applyDirectionalMovementRotations: boolean;
    /** Whether to automatically cancel left click input after first processed tick, defaults to true. */
    autoCancelMouseLeftClick: boolean;
    /**
     * A function allowing custom logic to determine if the entity can jump.
     * @param controller - The default player entity controller instance.
     * @returns Whether the entity of the entity controller can jump.
     */
    canJump: (controller: DefaultPlayerEntityController) => boolean;
    /**
     * A function allowing custom logic to determine if the entity can run.
     * @param controller - The default player entity controller instance.
     * @returns Whether the entity of the entity controller can run.
     */
    canRun: (controller: DefaultPlayerEntityController) => boolean;
    /**
     * A function allowing custom logic to determine if the entity can swim.
     * @param controller - The default player entity controller instance.
     * @returns Whether the entity of the entity controller can swim.
     */
    canSwim: (controller: DefaultPlayerEntityController) => boolean;
    /**
     * A function allowing custom logic to determine if the entity can walk.
     * @param controller - The default player entity controller instance.
     * @returns Whether the entity of the entity controller can walk.
     */
    canWalk: (controller: DefaultPlayerEntityController) => boolean;
    /** Whether the entity rotates to face the camera direction when idle. When `true`, the entity always faces the camera direction. When `false`, the entity only rotates while actively moving. */
    facesCameraWhenIdle: boolean;
    /** The looped animation(s) that will play when the entity is idle. */
    idleLoopedAnimations: string[];
    /** The oneshot animation(s) that will play when the entity interacts (left click) */
    interactOneshotAnimations: string[];
    /** The oneshot animation(s) that will play when the entity lands with a high velocity. */
    jumpLandHeavyOneshotAnimations: string[];
    /** The oneshot animation(s) that will play when the entity lands after jumping or being airborne. */
    jumpLandLightOneshotAnimations: string[];
    /** The oneshot animation(s) that will play when the entity is jumping. */
    jumpOneshotAnimations: string[];
    /** The upward velocity applied to the entity when it jumps. */
    jumpVelocity: number;
    /** The looped animation(s) that will play when the entity is running. */
    runLoopedAnimations: string[];
    /** The normalized horizontal velocity applied to the entity when it runs. */
    runVelocity: number;
    /** Whether the entity sticks to platforms. */
    sticksToPlatforms: boolean;
    /** The normalized horizontal velocity applied to the entity when it swims fast (equivalent to running). */
    swimFastVelocity: number;
    /** The gravity modifier applied to the entity when swimming. */
    swimGravity: number;
    /** The looped animation(s) that will play when the entity is not moving while swimming. */
    swimIdleLoopedAnimations: string[];
    /** The looped animation(s) that will play when the entity is swimming in any direction. */
    swimLoopedAnimations: string[];
    /** The maximum downward velocity that the entity can reach when affected by gravity while swimming. */
    swimMaxGravityVelocity: number;
    /** The normalized horizontal velocity applied to the entity when it swims slowly (equivalent to walking). */
    swimSlowVelocity: number;
    /** The upward velocity applied to the entity when swimming. */
    swimUpwardVelocity: number;
    /** The looped animation(s) that will play when the entity is walking. */
    walkLoopedAnimations: string[];
    /** The normalized horizontal velocity applied to the entity when it walks. */
    walkVelocity: number;















    /**
     * @param options - Options for the controller.
     *
     * **Category:** Controllers
     */
    constructor(options?: DefaultPlayerEntityControllerOptions);
    /**
     * Whether the entity is moving from player inputs.
     *
     * **Category:** Controllers
     */
    get isActivelyMoving(): boolean;
    /**
     * Whether the entity is grounded.
     *
     * **Category:** Controllers
     */
    get isGrounded(): boolean;
    /**
     * Whether the entity is on a platform.
     *
     * @remarks
     * A platform is any entity with a kinematic rigid body.
     *
     * **Category:** Controllers
     */
    get isOnPlatform(): boolean;
    /**
     * Whether the entity is swimming.
     *
     * @remarks
     * Determined by whether the entity is in contact with a liquid block.
     *
     * **Category:** Controllers
     */
    get isSwimming(): boolean;
    /**
     * The platform the entity is on, if any.
     *
     * **Category:** Controllers
     */
    get platform(): Entity | undefined;
    /**
     * Called when the controller is attached to an entity.
     *
     * @remarks
     * **Wraps `applyImpulse`:** The entity's `applyImpulse` method is wrapped to track external velocities
     * separately from internal movement. External impulses decay over time when grounded.
     *
     * **Locks rotations:** Calls `entity.lockAllRotations()` to prevent physics from rotating the entity.
     * Rotation is set explicitly by the controller based on camera orientation.
     *
     * **Enables CCD:** Enables continuous collision detection on the entity.
     *
     * **Swimming detection:** Registers a `BLOCK_COLLISION` listener to detect liquid blocks and manage
     * swimming state, gravity scale, and animations.
     *
     * @param entity - The entity to attach the controller to.
     *
     * **Category:** Controllers
     */
    attach(entity: Entity): void;
    /**
     * Called when the controlled entity is spawned.
     * In DefaultPlayerEntityController, this function is used to create
     * the colliders for the entity for wall and ground detection.
     *
     * @remarks
     * **Creates colliders:** Adds two child colliders to the entity:
     * - `groundSensor`: Cylinder sensor below entity for ground/platform detection and landing animations
     * - `wallCollider`: Capsule collider for wall collision with zero friction
     *
     * **Collider sizes scale:** Collider dimensions scale proportionally with `entity.height`.
     *
     * @param entity - The entity that is spawned.
     *
     * **Category:** Controllers
     */
    spawn(entity: Entity): void;
    /**
     * Ticks the player movement for the entity controller,
     * overriding the default implementation. If the entity to tick
     * is a child entity, only the event will be emitted but the default
     * movement logic will not be applied.
     *
     * @remarks
     * **Rotation (-Z forward):** Sets entity rotation based on camera yaw. A yaw of 0 faces -Z.
     * Movement direction offsets (WASD/joystick) are added to camera yaw to determine facing.
     * Models must be authored with their front facing -Z.
     *
     * **Child entities:** If `entity.parent` is set, only emits the event and returns early.
     * Movement logic is skipped for child entities.
     *
     * **Input cancellation:** If `autoCancelMouseLeftClick` is true (default), `input.ml` is set to
     * `false` after processing to prevent repeated triggers.
     *
     * **Animations:** Automatically manages idle, walk, run, jump, swim, and interact animations
     * based on movement state and input.
     *
     * @param entity - The entity to tick.
     * @param input - The current input state of the player.
     * @param cameraOrientation - The current camera orientation state of the player.
     * @param deltaTimeMs - The delta time in milliseconds since the last tick.
     *
     * **Category:** Controllers
     */
    tickWithPlayerInput(entity: PlayerEntity, input: PlayerInput, cameraOrientation: PlayerCameraOrientation, deltaTimeMs: number): void;
}

/**
 * Options for creating a DefaultPlayerEntityController instance.
 *
 * Use for: configuring default player movement and animation behavior at construction time.
 * Do NOT use for: per-frame changes; override methods or adjust controller state instead.
 *
 * **Category:** Controllers
 * @public
 */
export declare interface DefaultPlayerEntityControllerOptions {
    /** Whether to apply directional rotations to the entity while moving, defaults to true. */
    applyDirectionalMovementRotations?: boolean;
    /** Whether to automatically cancel left click input after first processed tick, defaults to true. */
    autoCancelMouseLeftClick?: boolean;
    /** A function allowing custom logic to determine if the entity can jump. */
    canJump?: () => boolean;
    /** A function allowing custom logic to determine if the entity can run. */
    canRun?: () => boolean;
    /** A function allowing custom logic to determine if the entity can swim. */
    canSwim?: () => boolean;
    /** A function allowing custom logic to determine if the entity can walk. */
    canWalk?: () => boolean;
    /** Whether the entity rotates to face the camera direction when idle. */
    facesCameraWhenIdle?: boolean;
    /** Overrides the animation(s) that will play when the entity is idle. */
    idleLoopedAnimations?: string[];
    /** Overrides the animation(s) that will play when the entity interacts (left click) */
    interactOneshotAnimations?: string[];
    /** Overrides the animation(s) that will play when the entity is jumping. */
    jumpOneshotAnimations?: string[];
    /** Overrides the animation(s) that will play when the entity lands with a high velocity. */
    jumpLandHeavyOneshotAnimations?: string[];
    /** Overrides the animation(s) that will play when the entity lands after jumping or being airborne. */
    jumpLandLightOneshotAnimations?: string[];
    /** The upward velocity applied to the entity when it jumps. */
    jumpVelocity?: number;
    /** The normalized horizontal velocity applied to the entity when it runs. */
    runVelocity?: number;
    /** Overrides the animation(s) that will play when the entity is running. */
    runLoopedAnimations?: string[];
    /** Whether the entity sticks to platforms, defaults to true. */
    sticksToPlatforms?: boolean;
    /** The normalized horizontal velocity applied to the entity when it swims fast (equivalent to running). */
    swimFastVelocity?: number;
    /** The gravity modifier applied to the entity when swimming. */
    swimGravity?: number;
    /** The maximum downward velocity that the entity can reach when affected by gravity while swimming. */
    swimMaxGravityVelocity?: number;
    /** The looped animation(s) that will play when the entity is swimming in any direction. */
    swimLoopedAnimations?: string[];
    /** The looped animation(s) that will play when the entity is not moving while swimming. */
    swimIdleLoopedAnimations?: string[];
    /** The normalized horizontal velocity applied to the entity when it swims slowly (equivalent to walking). */
    swimSlowVelocity?: number;
    /** The upward velocity applied to the entity when swimming. */
    swimUpwardVelocity?: number;
    /** Overrides the animation(s) that will play when the entity is walking. */
    walkLoopedAnimations?: string[];
    /** The normalized horizontal velocity applied to the entity when it walks. */
    walkVelocity?: number;
}

/**
 * Options for creating a DefaultPlayerEntity instance.
 *
 * Use for: customizing the default player avatar (for example cosmetic visibility).
 * Do NOT use for: changing movement behavior; use `DefaultPlayerEntityControllerOptions`.
 *
 * **Category:** Entities
 * @public
 */
export declare type DefaultPlayerEntityOptions = {
    /** Cosmetic slots to hide. Use 'ALL' to hide all cosmetics. */
    cosmeticHiddenSlots?: PlayerCosmeticSlot[];
} & PlayerEntityOptions;

/**
 * The options for a dynamic rigid body, also the default type. @public
 *
 * Use for: physics-driven bodies affected by forces and collisions.
 * Do NOT use for: kinematic bodies; use the kinematic option types instead.
 *
 * **Category:** Physics
 */
export declare interface DynamicRigidBodyOptions extends BaseRigidBodyOptions {
    type: RigidBodyType.DYNAMIC;
    /**
     * The additional mass of the rigid body.
     *
     * **Category:** Physics
     */
    additionalMass?: number;
    /**
     * The additional mass properties of the rigid body.
     *
     * **Category:** Physics
     */
    additionalMassProperties?: RigidBodyAdditionalMassProperties;
    /**
     * The additional solver iterations of the rigid body.
     *
     * **Category:** Physics
     */
    additionalSolverIterations?: number;
    /**
     * The angular damping of the rigid body.
     *
     * **Category:** Physics
     */
    angularDamping?: number;
    /**
     * The angular velocity of the rigid body.
     *
     * **Category:** Physics
     */
    angularVelocity?: Vector3Like;
    /**
     * Whether the rigid body has continuous collision detection enabled.
     *
     * **Category:** Physics
     */
    ccdEnabled?: boolean;
    /**
     * The dominance group of the rigid body.
     *
     * **Category:** Physics
     */
    dominanceGroup?: number;
    /**
     * The enabled axes of positional movement of the rigid body.
     *
     * **Category:** Physics
     */
    enabledPositions?: Vector3Boolean;
    /**
     * The enabled rotations of the rigid body.
     *
     * **Category:** Physics
     */
    enabledRotations?: Vector3Boolean;
    /**
     * The gravity scale of the rigid body.
     *
     * **Category:** Physics
     */
    gravityScale?: number;
    /**
     * The linear damping of the rigid body.
     *
     * **Category:** Physics
     */
    linearDamping?: number;
    /**
     * The linear velocity of the rigid body.
     *
     * **Category:** Physics
     */
    linearVelocity?: Vector3Like;
    /**
     * Whether the rigid body is sleeping.
     *
     * **Category:** Physics
     */
    sleeping?: boolean;
    /**
     * The soft continuous collision detection prediction of the rigid body.
     *
     * **Category:** Physics
     */
    softCcdPrediction?: number;
}

/**
 * Represents a dynamic or static object in a world.
 *
 * When to use: any non-player object that needs physics, visuals, or interactions.
 * Do NOT use for: player-controlled avatars (use `PlayerEntity` / `DefaultPlayerEntity`).
 * Do NOT use for: voxel blocks (use block APIs on `ChunkLattice`).
 *
 * @remarks
 * Entities are created from a block texture or a `.gltf` model and can have rigid bodies,
 * colliders, animations, and controllers.
 *
 * <h2>Coordinate System</h2>
 *
 * HYTOPIA uses a right-handed coordinate system where:
 * - **+X** is right
 * - **+Y** is up
 * - **-Z** is forward (identity orientation)
 *
 * Models should be authored with their front/forward facing the **-Z axis**.
 * When an entity has identity rotation (0,0,0,1 quaternion or yaw=0), it faces -Z.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `EntityEventPayloads`.
 *
 * @example
 * ```typescript
 * const spider = new Entity({
 *   name: 'Spider',
 *   modelUri: 'models/spider.gltf',
 *   rigidBodyOptions: {
 *     type: RigidBodyType.DYNAMIC,
 *     enabledRotations: { x: false, y: true, z: false },
 *     colliders: [
 *       {
 *         shape: ColliderShape.ROUND_CYLINDER,
 *         borderRadius: 0.1,
 *         halfHeight: 0.225,
 *         radius: 0.5,
 *         tag: 'body',
 *       }
 *     ],
 *   },
 * });
 *
 * spider.spawn(world, { x: 20, y: 6, z: 10 });
 * ```
 *
 * **Category:** Entities
 * @public
 */
export declare class Entity extends RigidBody implements protocol.Serializable {





























    /**
     * Creates a new Entity instance.
     *
     * Use for: defining a new entity before spawning it into a world.
     * Do NOT use for: player-controlled avatars (use `PlayerEntity` or `DefaultPlayerEntity`).
     *
     * @remarks
     * Exactly one of `blockTextureUri` or `modelUri` must be provided.
     * If `controller` is provided, `controller.attach(this)` is called during construction (before spawn).
     *
     * @param options - The options for the entity.
     *
     * **Requires:** If `parent` is provided, it must already be spawned.
     *
     * **Side effects:** May attach the provided controller.
     *
     * **Category:** Entities
     */
    constructor(options: EntityOptions);
    /**
     * The unique identifier for the entity.
     *
     * @remarks
     * Assigned when the entity is spawned.
     *
     * **Category:** Entities
     */
    get id(): number | undefined;
    /**
     * The names of the animations available in the entity's model.
     *
     * **Category:** Entities
     */
    get availableModelAnimationNames(): Readonly<string[]>;
    /**
     * The names of the nodes available in the entity's model.
     *
     * **Category:** Entities
     */
    get availableModelNodeNames(): Readonly<string[]>;
    /**
     * The half extents of the block entity's visual size.
     *
     * @remarks
     * Only set for block entities.
     *
     * **Category:** Entities
     */
    get blockHalfExtents(): Vector3Like | undefined;
    /**
     * The texture URI for block entities.
     *
     * @remarks
     * When set, this entity is treated as a block entity.
     *
     * **Category:** Entities
     */
    get blockTextureUri(): string | undefined;
    /**
     * The controller for the entity.
     *
     * **Category:** Entities
     */
    get controller(): BaseEntityController | undefined;
    /**
     * The emissive color of the entity.
     *
     * **Category:** Entities
     */
    get emissiveColor(): RgbColor | undefined;
    /**
     * The emissive intensity of the entity.
     *
     * **Category:** Entities
     */
    get emissiveIntensity(): number | undefined;
    /**
     * The depth (Z-axis) of the entity's model or block size.
     *
     * **Category:** Entities
     */
    get depth(): number;
    /**
     * The height (Y-axis) of the entity's model or block size.
     *
     * **Category:** Entities
     */
    get height(): number;
    /**
     * The animations of the entity's model that have been accessed or configured.
     *
     * @remarks
     * Animations are lazily created on first access via `getModelAnimation()`.
     * This array only contains animations that have been explicitly used, not every
     * clip in the model.
     *
     * **Category:** Entities
     */
    get modelAnimations(): Readonly<EntityModelAnimation[]>;
    /**
     * The node overrides of the entity's model that have been accessed or configured.
     *
     * @remarks
     * Node overrides are lazily created on first access via `getModelNodeOverride()`.
     * This array only contains overrides that have been explicitly used.
     *
     * **Category:** Entities
     */
    get modelNodeOverrides(): Readonly<EntityModelNodeOverride[]>;
    /**
     * The preferred collider shape when auto-generating colliders from the model.
     *
     * **Category:** Entities
     */
    get modelPreferredShape(): ColliderShape | undefined;
    /**
     * The scale of the entity's model.
     *
     * **Category:** Entities
     */
    get modelScale(): Vector3Like;
    /**
     * The interpolation time in milliseconds applied to model scale changes.
     *
     * **Category:** Entities
     */
    get modelScaleInterpolationMs(): number | undefined;
    /**
     * The texture URI that overrides the model entity's default texture.
     *
     * **Category:** Entities
     */
    get modelTextureUri(): string | undefined;
    /**
     * The URI or path to the `.gltf` model asset.
     *
     * **Category:** Entities
     */
    get modelUri(): string | undefined;
    /**
     * The name of the entity.
     *
     * **Category:** Entities
     */
    get name(): string;
    /**
     * The opacity of the entity between 0 and 1.
     *
     * **Category:** Entities
     */
    get opacity(): number;
    /**
     * The outline rendering options for the entity.
     *
     * **Category:** Entities
     */
    get outline(): Outline | undefined;
    /**
     * The parent entity, if attached.
     *
     * **Category:** Entities
     */
    get parent(): Entity | undefined;
    /**
     * The parent model node name, if attached.
     *
     * **Category:** Entities
     */
    get parentNodeName(): string | undefined;
    /**
     * The interpolation time in milliseconds applied to position changes.
     *
     * **Category:** Entities
     */
    get positionInterpolationMs(): number | undefined;
    /**
     * The interpolation time in milliseconds applied to rotation changes.
     *
     * **Category:** Entities
     */
    get rotationInterpolationMs(): number | undefined;
    /**
     * An arbitrary identifier tag for your own logic.
     *
     * **Category:** Entities
     */
    get tag(): string | undefined;
    /**
     * The tint color of the entity.
     *
     * **Category:** Entities
     */
    get tintColor(): RgbColor | undefined;
    /**
     * Whether this entity is a block entity.
     *
     * **Category:** Entities
     */
    get isBlockEntity(): boolean;
    /**
     * Whether the entity is environmental.
     *
     * @remarks
     * Environmental entities are excluded from per-tick controller updates and update emission.
     *
     * **Category:** Entities
     */
    get isEnvironmental(): boolean;
    /**
     * Whether this entity is a model entity.
     *
     * **Category:** Entities
     */
    get isModelEntity(): boolean;
    /**
     * Whether the entity is spawned in a world.
     *
     * **Category:** Entities
     */
    get isSpawned(): boolean;
    /**
     * The width (X-axis) of the entity's model or block size.
     *
     * **Category:** Entities
     */
    get width(): number;
    /**
     * The world the entity is in, if spawned.
     *
     * **Category:** Entities
     */
    get world(): World | undefined;
    /**
     * Clears all model node overrides from the entity's model.
     *
     * **Category:** Entities
     */
    clearModelNodeOverrides(): void;
    /**
     * Despawns the entity and all children from the world.
     *
     * Use for: removing entities from the world.
     * Do NOT use for: temporary hiding; consider visibility or animations instead.
     *
     * @remarks
     * **Cascading:** Recursively despawns all child entities first (depth-first).
     *
     * **Controller:** Calls `controller.detach()` then `controller.despawn()` if attached.
     *
     * **Cleanup:** Automatically unregisters attached audios, despawns attached particle emitters,
     * and unloads attached scene UIs from their respective managers.
     *
     * **Simulation:** Removes from physics simulation.
     *
     * **Side effects:** Emits `EntityEvent.DESPAWN` and unregisters from world managers.
     *
     * **Category:** Entities
     */
    despawn(): void;
    /**
     * Gets or lazily creates a model animation for the entity's model by name.
     *
     * @remarks
     * Model entities only; returns `undefined` for block entities.
     * If the animation does not yet exist, a new instance with default settings is created
     * and added to `modelAnimations`. Use `availableModelAnimationNames` to discover
     * which animation names exist in the model.
     *
     * @param name - The name of the animation to get or create.
     * @returns The model animation instance, or `undefined` for block entities.
     *
     * **Category:** Entities
     */
    getModelAnimation(name: string): EntityModelAnimation | undefined;
    /**
     * Gets or lazily creates a model node override for the entity's model.
     *
     * @remarks
     * Model entities only; returns `undefined` for block entities.
     * If the override does not yet exist, a new instance with default settings is created
     * and added to `modelNodeOverrides`. Use `availableModelNodeNames` to discover
     * which node names exist in the model.
     *
     * @param nameMatch - The node selector for the model node override to get or create.
     * Case-insensitive exact match by default, with optional edge wildcard (`head*`, `*head`, `*head*`).
     *
     * @returns The model node override instance, or `undefined` for block entities.
     *
     * **Category:** Entities
     */
    getModelNodeOverride(nameMatch: string): EntityModelNodeOverride | undefined;
    /**
     * Triggers an interaction on the entity from a player.
     *
     * Use for: programmatic interactions that should mimic a player click/tap.
     * Do NOT use for: server-only effects without player context.
     *
     * @remarks
     * This is automatically called when a player clicks or taps the entity, but can also be called directly
     * for programmatic interactions. Emits `EntityEvent.INTERACT`.
     *
     * @param player - The player interacting with the entity.
     * @param raycastHit - The raycast hit result, if the interaction was triggered by a client-side click/tap.
     *
     * **Requires:** Entity must be spawned.
     *
     * **Side effects:** Emits `EntityEvent.INTERACT`.
     *
     * **Category:** Entities
     */
    interact(player: Player, raycastHit?: RaycastHit): void;
    setBlockTextureUri(blockTextureUri: string | undefined): void;
    /**
     * Removes a model node override from the entity's model.
     *
     * @param nameMatch - The name match of the model node override to remove.
     *
     * **Category:** Entities
     */
    removeModelNodeOverride(nameMatch: string): void;
    /**
     * Removes multiple model node overrides from the entity's model.
     *
     * @param nameMatches - The name matches of the model node overrides to remove.
     *
     * **Category:** Entities
     */
    removeModelNodeOverrides(nameMatches: string[]): void;
    /**
     * Sets the emissive color of the entity.
     *
     * Use for: glow effects or highlighted states.
     *
     * @param emissiveColor - The emissive color of the entity.
     *
     * **Side effects:** Emits `EntityEvent.SET_EMISSIVE_COLOR` when spawned.
     *
     * **Category:** Entities
     */
    setEmissiveColor(emissiveColor: RgbColor | undefined): void;
    /**
     * Sets the emissive intensity of the entity.
     *
     * @param emissiveIntensity - The emissive intensity of the entity. Use a value over 1 for brighter emissive effects.
     *
     * **Side effects:** Emits `EntityEvent.SET_EMISSIVE_INTENSITY` when spawned.
     *
     * **Category:** Entities
     */
    setEmissiveIntensity(emissiveIntensity: number | undefined): void;
    /**
     * Sets the scale of the entity's model and proportionally
     * scales its colliders.
     *
     * @remarks
     * Model entities only; no effect for block entities.
     *
     * **Collider scaling is relative:** Colliders are scaled by the ratio of new/old scale, not set to absolute values.
     * Example: scaling from 1 to 2 doubles collider size; scaling from 2 to 4 also doubles it.
     *
     * **Reference equality check:** Uses `===` to compare with current scale, so passing the same
     * object reference will early return even if values changed. Always pass a new object.
     *
     * @param modelScale - The scale of the entity's model. Can be a vector or a number for uniform scaling.
     *
     * **Side effects:** Scales existing colliders and emits `EntityEvent.SET_MODEL_SCALE` when spawned.
     *
     * **Category:** Entities
     */
    setModelScale(modelScale: Vector3Like | number): void;
    /**
     * Sets the interpolation time in milliseconds applied to model scale changes.
     *
     * @param interpolationMs - The interpolation time in milliseconds to set.
     *
     * **Side effects:** Emits `EntityEvent.SET_MODEL_SCALE_INTERPOLATION_MS` when spawned.
     *
     * **Category:** Entities
     */
    setModelScaleInterpolationMs(interpolationMs: number | undefined): void;
    /**
     * Sets the texture uri of the entity's model. Setting
     * this overrides the model's default texture.
     *
     * @remarks
     * Model entities only; no effect for block entities.
     *
     * @param modelTextureUri - The texture uri of the entity's model.
     *
     * **Side effects:** Emits `EntityEvent.SET_MODEL_TEXTURE_URI` when spawned.
     *
     * **Category:** Entities
     */
    setModelTextureUri(modelTextureUri: string | undefined): void;
    /**
     * Sets the opacity of the entity.
     * @param opacity - The opacity of the entity between 0 and 1. 0 is fully transparent, 1 is fully opaque.
     *
     * **Side effects:** Emits `EntityEvent.SET_OPACITY` when spawned.
     *
     * **Category:** Entities
     */
    setOpacity(opacity: number): void;
    /**
     * Sets the outline rendering options for the entity.
     * @param outline - The outline options, or undefined to remove the outline.
     * @param forPlayer - The player to set the outline for, if undefined the outline will be set for all players.
     *
     * **Side effects:** Emits `EntityEvent.SET_OUTLINE` when spawned.
     *
     * **Category:** Entities
     */
    setOutline(outline: Outline | undefined, forPlayer?: Player): void;
    /**
     * Sets the parent of the entity and resets this entity's position and rotation.
     *
     * @remarks
     * When setting the parent, all forces, torques and velocities of this entity are reset.
     * Additionally, this entity's type will be set to `KINEMATIC_VELOCITY` if it is not already.
     * All colliders of this entity will be disabled when parent is not undefined. If the provided parent
     * is undefined, this entity will be removed from its parent and all colliders will be re-enabled.
     * When setting an undefined parent to remove this entity from its parent, this entity's type
     * will be set to the last type it was set to before being a child.
     *
     * @param parent - The parent entity to set, or undefined to remove from an existing parent.
     * @param parentNodeName - The name of the parent's node (if parent is a model entity) this entity will attach to.
     * @param position - The position to set for the entity. If parent is provided, this is relative to the parent's attachment point.
     * @param rotation - The rotation to set for the entity. If parent is provided, this is relative to the parent's rotation.
     *
     * **Requires:** If `parent` is provided, it must be spawned.
     *
     * **Side effects:** Disables/enables colliders, changes rigid body type, and emits `EntityEvent.SET_PARENT`.
     *
     * **Category:** Entities
     */
    setParent(parent: Entity | undefined, parentNodeName?: string, position?: Vector3Like, rotation?: QuaternionLike): void;
    /**
     * Sets the interpolation time in milliseconds applied to position changes.
     *
     * @param interpolationMs - The interpolation time in milliseconds to set.
     *
     * **Side effects:** Emits `EntityEvent.SET_POSITION_INTERPOLATION_MS` when spawned.
     *
     * **Category:** Entities
     */
    setPositionInterpolationMs(interpolationMs: number | undefined): void;
    /**
     * Sets the interpolation time in milliseconds applied to rotation changes.
     *
     * @param interpolationMs - The interpolation time in milliseconds to set.
     *
     * **Side effects:** Emits `EntityEvent.SET_ROTATION_INTERPOLATION_MS` when spawned.
     *
     * **Category:** Entities
     */
    setRotationInterpolationMs(interpolationMs: number | undefined): void;
    /**
     * Sets the tint color of the entity.
     * @param tintColor - The tint color of the entity.
     *
     * **Side effects:** Emits `EntityEvent.SET_TINT_COLOR` when spawned.
     *
     * **Category:** Entities
     */
    setTintColor(tintColor: RgbColor | undefined): void;
    /**
     * Spawns the entity in the world.
     *
     * Use for: placing the entity into a world so it simulates and syncs to clients.
     * Do NOT use for: reusing a single entity instance across multiple worlds.
     *
     * @remarks
     * **Rotation default:** If no rotation is provided, entity spawns with identity rotation facing -Z.
     * For Y-axis rotation (yaw): `{ x: 0, y: sin(yaw/2), z: 0, w: cos(yaw/2) }`. Yaw 0 = facing -Z.
     *
     * **Auto-collider creation:** If no colliders are provided, a default collider is auto-generated
     * from the model bounds (or block half extents). Set `modelPreferredShape` to `ColliderShape.NONE` to disable.
     *
     * **Collision groups:** Colliders with default collision groups are auto-assigned based on `isEnvironmental`
     * and `isSensor` flags. Environmental entities don't collide with blocks or other environmental entities.
     *
     * **Event enabling:** Collision/contact force events are auto-enabled on colliders if listeners
     * are registered for `BLOCK_COLLISION`, `ENTITY_COLLISION`, `BLOCK_CONTACT_FORCE`, or `ENTITY_CONTACT_FORCE` prior to spawning.
     *
     * **Controller:** If a controller is attached, `controller.spawn()` is called after the entity is added to the physics simulation.
     *
     * **Parent handling:** If `parent` was set in options, `setParent()` is called after spawn with the provided position/rotation.
     *
     * @param world - The world to spawn the entity in.
     * @param position - The position to spawn the entity at.
     * @param rotation - The optional rotation to spawn the entity with.
     *
     * **Requires:** Entity must not already be spawned.
     *
     * **Side effects:** Registers the entity, adds it to the simulation, and emits `EntityEvent.SPAWN`.
     *
     * **Category:** Entities
     */
    spawn(world: World, position: Vector3Like, rotation?: QuaternionLike): void;
    /**
     * Stops all model animations for the entity, optionally excluding the provided animations from stopping.
     *
     * @param exclusionFilter - The filter to determine if a model animation should be excluded from being stopped.
     *
     * **Side effects:** May emit `EntityModelAnimationEvent.STOP` for each stopped animation.
     *
     * **Category:** Entities
     */
    stopAllModelAnimations(exclusionFilter?: (modelAnimation: Readonly<EntityModelAnimation>) => boolean): void;
    /**
     * Stops the provided model animations for the entity.
     *
     * @param modelAnimationNames - The model animation names to stop.
     *
     * **Side effects:** May emit `EntityModelAnimationEvent.STOP` for each stopped animation.
     *
     * **Category:** Entities
     */
    stopModelAnimations(modelAnimationNames: readonly string[]): void;






}

/**
 * Event types an Entity instance can emit.
 *
 * See `EntityEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum EntityEvent {
    BLOCK_COLLISION = "ENTITY.BLOCK_COLLISION",
    BLOCK_CONTACT_FORCE = "ENTITY.BLOCK_CONTACT_FORCE",
    DESPAWN = "ENTITY.DESPAWN",
    ENTITY_COLLISION = "ENTITY.ENTITY_COLLISION",
    ENTITY_CONTACT_FORCE = "ENTITY.ENTITY_CONTACT_FORCE",
    INTERACT = "ENTITY.INTERACT",
    REMOVE_MODEL_NODE_OVERRIDE = "ENTITY.REMOVE_MODEL_NODE_OVERRIDE",
    SET_BLOCK_TEXTURE_URI = "ENTITY.SET_BLOCK_TEXTURE_URI",
    SET_EMISSIVE_COLOR = "ENTITY.SET_EMISSIVE_COLOR",
    SET_EMISSIVE_INTENSITY = "ENTITY.SET_EMISSIVE_INTENSITY",
    SET_MODEL_SCALE = "ENTITY.SET_MODEL_SCALE",
    SET_MODEL_SCALE_INTERPOLATION_MS = "ENTITY.SET_MODEL_SCALE_INTERPOLATION_MS",
    SET_MODEL_TEXTURE_URI = "ENTITY.SET_MODEL_TEXTURE_URI",
    SET_OPACITY = "ENTITY.SET_OPACITY",
    SET_OUTLINE = "ENTITY.SET_OUTLINE",
    SET_PARENT = "ENTITY.SET_PARENT",
    SET_POSITION_INTERPOLATION_MS = "ENTITY.SET_POSITION_INTERPOLATION_MS",
    SET_ROTATION_INTERPOLATION_MS = "ENTITY.SET_ROTATION_INTERPOLATION_MS",
    SET_TINT_COLOR = "ENTITY.SET_TINT_COLOR",
    SPAWN = "ENTITY.SPAWN",
    TICK = "ENTITY.TICK",
    UPDATE_POSITION = "ENTITY.UPDATE_POSITION",
    UPDATE_ROTATION = "ENTITY.UPDATE_ROTATION"
}

/**
 * Event payloads for Entity emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface EntityEventPayloads {
    /** Emitted when an entity collides with a block type. */
    [EntityEvent.BLOCK_COLLISION]: {
        entity: Entity;
        blockType: BlockType;
        started: boolean;
        colliderHandleA: number;
        colliderHandleB: number;
    };
    /** Emitted when an entity's contact force is applied to a block type. */
    [EntityEvent.BLOCK_CONTACT_FORCE]: {
        entity: Entity;
        blockType: BlockType;
        contactForceData: ContactForceData;
    };
    /** Emitted when an entity is despawned. */
    [EntityEvent.DESPAWN]: {
        entity: Entity;
    };
    /** Emitted when an entity collides with another entity. */
    [EntityEvent.ENTITY_COLLISION]: {
        entity: Entity;
        otherEntity: Entity;
        started: boolean;
        colliderHandleA: number;
        colliderHandleB: number;
    };
    /** Emitted when an entity's contact force is applied to another entity. */
    [EntityEvent.ENTITY_CONTACT_FORCE]: {
        entity: Entity;
        otherEntity: Entity;
        contactForceData: ContactForceData;
    };
    /** Emitted when a player interacts with the entity by clicking or tapping it. */
    [EntityEvent.INTERACT]: {
        entity: Entity;
        player: Player;
        raycastHit?: RaycastHit;
    };
    /** Emitted when a model node override is removed from the entity's model. */
    [EntityEvent.REMOVE_MODEL_NODE_OVERRIDE]: {
        entity: Entity;
        entityModelNodeOverride: EntityModelNodeOverride;
    };
    /** Emitted when the texture uri of a block entity is set. */
    [EntityEvent.SET_BLOCK_TEXTURE_URI]: {
        entity: Entity;
        blockTextureUri: string | undefined;
    };
    /** Emitted when the emissive color is set. */
    [EntityEvent.SET_EMISSIVE_COLOR]: {
        entity: Entity;
        emissiveColor: RgbColor | undefined;
    };
    /** Emitted when the emissive intensity is set. */
    [EntityEvent.SET_EMISSIVE_INTENSITY]: {
        entity: Entity;
        emissiveIntensity: number | undefined;
    };
    /** Emitted when the scale of the entity's model is set. */
    [EntityEvent.SET_MODEL_SCALE]: {
        entity: Entity;
        modelScale: Vector3Like;
    };
    /** Emitted when the interpolation time in milliseconds applied to model scale changes is set. */
    [EntityEvent.SET_MODEL_SCALE_INTERPOLATION_MS]: {
        entity: Entity;
        interpolationMs: number | undefined;
    };
    /** Emitted when the texture uri of the entity's model is set. */
    [EntityEvent.SET_MODEL_TEXTURE_URI]: {
        entity: Entity;
        modelTextureUri: string | undefined;
    };
    /** Emitted when the opacity of the entity is set. */
    [EntityEvent.SET_OPACITY]: {
        entity: Entity;
        opacity: number;
    };
    /** Emitted when the outline of the entity is set. */
    [EntityEvent.SET_OUTLINE]: {
        entity: Entity;
        outline: Outline | undefined;
        forPlayer?: Player;
    };
    /** Emitted when the parent of the entity is set. */
    [EntityEvent.SET_PARENT]: {
        entity: Entity;
        parent: Entity | undefined;
        parentNodeName: string | undefined;
    };
    /** Emitted when the interpolation time in milliseconds applied to position changes is set. */
    [EntityEvent.SET_POSITION_INTERPOLATION_MS]: {
        entity: Entity;
        interpolationMs: number | undefined;
    };
    /** Emitted when the interpolation time in milliseconds applied to rotation changes is set. */
    [EntityEvent.SET_ROTATION_INTERPOLATION_MS]: {
        entity: Entity;
        interpolationMs: number | undefined;
    };
    /** Emitted when the tint color of the entity is set. */
    [EntityEvent.SET_TINT_COLOR]: {
        entity: Entity;
        tintColor: RgbColor | undefined;
    };
    /** Emitted when the entity is spawned. */
    [EntityEvent.SPAWN]: {
        entity: Entity;
    };
    /** Emitted when the entity is ticked. */
    [EntityEvent.TICK]: {
        entity: Entity;
        tickDeltaMs: number;
    };
    /** Emitted when the position of the entity is updated at the end of the tick, either directly or by physics. */
    [EntityEvent.UPDATE_POSITION]: {
        entity: Entity;
        position: Vector3Like;
    };
    /** Emitted when the rotation of the entity is updated at the end of the tick, either directly or by physics. */
    [EntityEvent.UPDATE_ROTATION]: {
        entity: Entity;
        rotation: QuaternionLike;
    };
}

/**
 * Manages entities in a world.
 *
 * When to use: querying and filtering entities within a specific world.
 * Do NOT use for: cross-world queries; access each world's manager separately.
 *
 * @remarks
 * The EntityManager is created internally per `World` instance.
 *
 * @example
 * ```typescript
 * // Get all entities in the world
 * const entityManager = world.entityManager;
 * const entities = entityManager.getAllEntities();
 * ```
 *
 * **Category:** Entities
 * @public
 */
export declare class EntityManager {





    /**
     * The number of spawned entities in the world.
     *
     * **Category:** Entities
     */
    get entityCount(): number;
    /**
     * The world this manager is for.
     *
     * **Category:** Entities
     */
    get world(): World;


    /**
     * Gets all spawned entities in the world.
     *
     * @returns All spawned entities in the world.
     *
     * **Category:** Entities
     */
    getAllEntities(): Entity[];
    /**
     * Gets all spawned player entities in the world.
     *
     * @returns All spawned player entities in the world.
     *
     * **Category:** Entities
     */
    getAllPlayerEntities(): PlayerEntity[];
    /**
     * Gets all spawned player entities in the world assigned to the provided player.
     *
     * @param player - The player to get the entities for.
     * @returns All spawned player entities in the world assigned to the player.
     *
     * **Category:** Entities
     */
    getPlayerEntitiesByPlayer(player: Player): PlayerEntity[];
    /**
     * Gets a spawned entity in the world by its ID.
     *
     * @param id - The ID of the entity to get.
     * @returns The spawned entity with the provided ID, or undefined if no entity is found.
     *
     * **Category:** Entities
     */
    getEntity<T extends Entity>(id: number): T | undefined;
    /**
     * Gets all spawned entities in the world with a specific tag.
     *
     * @param tag - The tag to get the entities for.
     * @returns All spawned entities in the world with the provided tag.
     *
     * **Category:** Entities
     */
    getEntitiesByTag(tag: string): Entity[];
    /**
     * Gets all spawned entities in the world with a tag that includes a specific substring.
     *
     * @param tagSubstring - The tag substring to get the entities for.
     * @returns All spawned entities in the world with a tag that includes the provided substring.
     *
     * **Category:** Entities
     */
    getEntitiesByTagSubstring(tagSubstring: string): Entity[];
    /**
     * Gets all child entities of an entity.
     *
     * @remarks
     * Direct children only; does not include recursive descendants.
     *
     * @param entity - The entity to get the children for.
     * @returns All direct child entities of the entity.
     *
     * **Category:** Entities
     */
    getEntityChildren(entity: Entity): Entity[];


}

/**
 * Represents a single animation of the model used for an Entity.
 *
 * When to use: controlling individual animation playback, blending, and looping on model entities.
 * Do NOT use for: block entities (they have no model animations).
 *
 * @remarks
 * EntityModelAnimation instances are composed by an Entity and represent a single
 * animation clip from the entity's model. Events are emitted through the parent
 * Entity's event router and its world.
 *
 * <h2>Events</h2>
 *
 * Events emitted by this class are listed under `EntityModelAnimationEventPayloads`.
 * They are emitted via the parent entity's event router.
 *
 * @example
 * ```typescript
 * const walkAnimation = entity.getModelAnimation('walk');
 * walkAnimation.setLoopMode(EntityModelAnimationLoopMode.LOOP);
 * walkAnimation.play();
 * walkAnimation.setPlaybackRate(2);
 * ```
 *
 * **Category:** Entities
 * @public
 */
export declare class EntityModelAnimation implements protocol.Serializable {










    /**
     * Creates a new EntityModelAnimation instance.
     *
     * @param options - The options for the entity model animation.
     *
     * **Category:** Entities
     */
    constructor(options: EntityModelAnimationOptions);
    /**
     * The name of the entity model animation.
     *
     * @remarks
     * This is the name of the animation as defined in the model.
     *
     * **Category:** Entities
     */
    get name(): string;
    /**
     * The blend mode of the entity model animation.
     *
     * **Category:** Entities
     */
    get blendMode(): EntityModelAnimationBlendMode;
    /**
     * Whether the animation should clamp when finished, holding the last frame.
     *
     * **Category:** Entities
     */
    get clampWhenFinished(): boolean;
    /**
     * The entity that the entity model animation belongs to.
     *
     * **Category:** Entities
     */
    get entity(): Entity;
    /**
     * Whether the animation fades in when played or restarted.
     *
     * **Category:** Entities
     */
    get fadesIn(): boolean;
    /**
     * Whether the animation fades out when paused or stopped.
     *
     * **Category:** Entities
     */
    get fadesOut(): boolean;
    /**
     * Whether the animation is currently playing.
     *
     * **Category:** Entities
     */
    get isPlaying(): boolean;
    /**
     * Whether the animation is currently paused.
     *
     * **Category:** Entities
     */
    get isPaused(): boolean;
    /**
     * Whether the animation is currently stopped.
     *
     * **Category:** Entities
     */
    get isStopped(): boolean;
    /**
     * The loop mode of the entity model animation.
     *
     * **Category:** Entities
     */
    get loopMode(): EntityModelAnimationLoopMode;
    /**
     * The playback rate of the entity model animation.
     *
     * **Category:** Entities
     */
    get playbackRate(): number;
    /**
     * The weight of the entity model animation.
     *
     * **Category:** Entities
     */
    get weight(): number;
    /**
     * Pauses the entity model animation, does nothing if already paused.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.PAUSE` when spawned.
     *
     * **Category:** Entities
     */
    pause(): void;
    /**
     * Plays the entity model animation, does nothing if already playing.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.PLAY` when spawned.
     *
     * **Category:** Entities
     */
    play(): void;
    /**
     * Restarts the entity model animation from the beginning.
     *
     * @remarks
     * Unlike `play()`, this always emits even if the animation is already playing,
     * allowing the animation to restart from the beginning.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.RESTART` when spawned.
     *
     * **Category:** Entities
     */
    restart(): void;
    /**
     * Sets the blend mode of the entity model animation.
     *
     * @param blendMode - The blend mode of the entity model animation.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.SET_BLEND_MODE` when spawned.
     *
     * **Category:** Entities
     */
    setBlendMode(blendMode: EntityModelAnimationBlendMode): void;
    /**
     * Sets whether the animation should clamp when finished, holding the last frame.
     *
     * @param clampWhenFinished - Whether to clamp when finished.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.SET_CLAMP_WHEN_FINISHED` when spawned.
     *
     * **Category:** Entities
     */
    setClampWhenFinished(clampWhenFinished: boolean): void;
    /**
     * Sets whether the animation fades in when played or restarted.
     *
     * @param fadesIn - Whether the animation should fade in when played or restarted.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.SET_FADES_IN` when spawned.
     *
     * **Category:** Entities
     */
    setFadesIn(fadesIn: boolean): void;
    /**
     * Sets whether the animation fades out when paused or stopped.
     *
     * @param fadesOut - Whether the animation should fade out when paused or stopped.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.SET_FADES_OUT` when spawned.
     *
     * **Category:** Entities
     */
    setFadesOut(fadesOut: boolean): void;
    /**
     * Sets the loop mode of the entity model animation.
     *
     * @param loopMode - The loop mode of the entity model animation.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.SET_LOOP_MODE` when spawned.
     *
     * **Category:** Entities
     */
    setLoopMode(loopMode: EntityModelAnimationLoopMode): void;
    /**
     * Sets the playback rate of the entity model animation.
     *
     * @remarks
     * A positive value plays the animation forward, a negative value plays it in reverse.
     * Defaults to 1.
     *
     * @param playbackRate - The playback rate of the entity model animation.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.SET_PLAYBACK_RATE` when spawned.
     *
     * **Category:** Entities
     */
    setPlaybackRate(playbackRate: number): void;
    /**
     * Sets the weight of the entity model animation for blending
     * with other playing animations.
     *
     * @param weight - The weight of the entity model animation.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.SET_WEIGHT` when spawned.
     *
     * **Category:** Entities
     */
    setWeight(weight: number): void;
    /**
     * Stops the entity model animation, does nothing if already stopped.
     *
     * **Side effects:** Emits `EntityModelAnimationEvent.STOP` when spawned.
     *
     * **Category:** Entities
     */
    stop(): void;

}

/**
 * The blend mode of an entity model animation.
 *
 * **Category:** Entities
 * @public
 */
export declare enum EntityModelAnimationBlendMode {
    ADDITIVE = 0,
    NORMAL = 1
}

/**
 * Event types an EntityModelAnimation instance can emit.
 *
 * See `EntityModelAnimationEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum EntityModelAnimationEvent {
    PAUSE = "ENTITY_MODEL_ANIMATION.PAUSE",
    PLAY = "ENTITY_MODEL_ANIMATION.PLAY",
    RESTART = "ENTITY_MODEL_ANIMATION.RESTART",
    SET_BLEND_MODE = "ENTITY_MODEL_ANIMATION.SET_BLEND_MODE",
    SET_CLAMP_WHEN_FINISHED = "ENTITY_MODEL_ANIMATION.SET_CLAMP_WHEN_FINISHED",
    SET_FADES_IN = "ENTITY_MODEL_ANIMATION.SET_FADES_IN",
    SET_FADES_OUT = "ENTITY_MODEL_ANIMATION.SET_FADES_OUT",
    SET_LOOP_MODE = "ENTITY_MODEL_ANIMATION.SET_LOOP_MODE",
    SET_PLAYBACK_RATE = "ENTITY_MODEL_ANIMATION.SET_PLAYBACK_RATE",
    SET_WEIGHT = "ENTITY_MODEL_ANIMATION.SET_WEIGHT",
    STOP = "ENTITY_MODEL_ANIMATION.STOP"
}

/**
 * Event payloads for EntityModelAnimation emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface EntityModelAnimationEventPayloads {
    /** Emitted when an entity model animation is paused. */
    [EntityModelAnimationEvent.PAUSE]: {
        entityModelAnimation: EntityModelAnimation;
    };
    /** Emitted when an entity model animation is played. */
    [EntityModelAnimationEvent.PLAY]: {
        entityModelAnimation: EntityModelAnimation;
    };
    /** Emitted when an entity model animation is restarted. */
    [EntityModelAnimationEvent.RESTART]: {
        entityModelAnimation: EntityModelAnimation;
    };
    /** Emitted when the blend mode of an entity model animation is set. */
    [EntityModelAnimationEvent.SET_BLEND_MODE]: {
        entityModelAnimation: EntityModelAnimation;
        blendMode: EntityModelAnimationBlendMode;
    };
    /** Emitted when the clamp when finished setting of an entity model animation is set. */
    [EntityModelAnimationEvent.SET_CLAMP_WHEN_FINISHED]: {
        entityModelAnimation: EntityModelAnimation;
        clampWhenFinished: boolean;
    };
    /** Emitted when the fade in behavior of an entity model animation is set. */
    [EntityModelAnimationEvent.SET_FADES_IN]: {
        entityModelAnimation: EntityModelAnimation;
        fadesIn: boolean;
    };
    /** Emitted when the fade out behavior of an entity model animation is set. */
    [EntityModelAnimationEvent.SET_FADES_OUT]: {
        entityModelAnimation: EntityModelAnimation;
        fadesOut: boolean;
    };
    /** Emitted when the loop mode of an entity model animation is set. */
    [EntityModelAnimationEvent.SET_LOOP_MODE]: {
        entityModelAnimation: EntityModelAnimation;
        loopMode: EntityModelAnimationLoopMode;
    };
    /** Emitted when the playback rate of an entity model animation is set. */
    [EntityModelAnimationEvent.SET_PLAYBACK_RATE]: {
        entityModelAnimation: EntityModelAnimation;
        playbackRate: number;
    };
    /** Emitted when the weight of an entity model animation is set. */
    [EntityModelAnimationEvent.SET_WEIGHT]: {
        entityModelAnimation: EntityModelAnimation;
        weight: number;
    };
    /** Emitted when an entity model animation is stopped. */
    [EntityModelAnimationEvent.STOP]: {
        entityModelAnimation: EntityModelAnimation;
    };
}

/**
 * The loop mode of an entity model animation.
 *
 * **Category:** Entities
 * @public
 */
export declare enum EntityModelAnimationLoopMode {
    ONCE = 0,
    LOOP = 1,
    PING_PONG = 2
}

/**
 * The options for creating an EntityModelAnimation instance.
 *
 * **Category:** Entities
 * @public
 */
export declare interface EntityModelAnimationOptions {
    /** The name of the entity model animation. */
    name: string;
    /** The entity that the entity model animation belongs to. */
    entity: Entity;
    /** The initial blend mode of the entity model animation. */
    blendMode?: EntityModelAnimationBlendMode;
    /** Whether the animation should clamp when finished, holding the last frame. */
    clampWhenFinished?: boolean;
    /** Whether the animation fades in when played or restarted. */
    fadesIn?: boolean;
    /** Whether the animation fades out when paused or stopped. */
    fadesOut?: boolean;
    /** The initial loop mode of the entity model animation. */
    loopMode?: EntityModelAnimationLoopMode;
    /** Whether the animation should start playing on construction. */
    play?: boolean;
    /** The initial playback rate of the entity model animation. */
    playbackRate?: number;
    /** The initial blend weight of the entity model animation. */
    weight?: number;
}

/**
 * The state of an entity model animation.
 *
 * **Category:** Entities
 * @public
 */
export declare enum EntityModelAnimationState {
    PLAYING = 0,
    PAUSED = 1,
    STOPPED = 2
}

/**
 * Represents a name-match model node override rule for an Entity.
 *
 * When to use: configuring visual and transform overrides for one or more
 * model nodes selected by name match.
 *
 * @remarks
 * Node overrides are match-rule based and may target multiple nodes.
 * Matching is case-insensitive. Exact match is used by default; wildcard
 * matching is only enabled when `*` is used at the start and/or end of
 * `nameMatch` (`head*`, `*head`, `*head*`).
 * Supported override settings include emissive color/intensity, hidden state,
 * and local position/rotation/scale.
 *
 * **Category:** Entities
 * @public
 */
export declare class EntityModelNodeOverride implements protocol.Serializable {












    /**
     * Creates a new EntityModelNodeOverride instance.
     *
     * @param options - The options for the model node override.
     *
     * **Category:** Entities
     */
    constructor(options: EntityModelNodeOverrideOptions);
    /**
     * The node name match selector for this override.
     * Exact match by default, with optional edge wildcard (`head*`, `*head`, `*head*`).
     *
     * **Category:** Entities
     */
    get nameMatch(): string;
    /**
     * Alias used by networking serializer and protocol schema (`n`).
     *
     * **Category:** Entities
     */
    get name(): string;
    /**
     * The entity that the model node override belongs to.
     *
     * **Category:** Entities
     */
    get entity(): Entity;
    /**
     * The emissive color for matching nodes.
     *
     * **Category:** Entities
     */
    get emissiveColor(): RgbColor | undefined;
    /**
     * The emissive intensity for matching nodes.
     *
     * **Category:** Entities
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Whether the matched node(s) are hidden.
     *
     * **Category:** Entities
     */
    get isHidden(): boolean;
    /**
     * The local position set for matching nodes.
     *
     * **Category:** Entities
     */
    get localPosition(): Vector3Like | undefined;
    /**
     * The interpolation time in milliseconds applied to local position changes.
     *
     * **Category:** Entities
     */
    get localPositionInterpolationMs(): number | undefined;
    /**
     * The local rotation set for matching nodes.
     *
     * **Category:** Entities
     */
    get localRotation(): QuaternionLike | undefined;
    /**
     * The interpolation time in milliseconds applied to local rotation changes.
     *
     * **Category:** Entities
     */
    get localRotationInterpolationMs(): number | undefined;
    /**
     * The local scale set for matching nodes.
     *
     * **Category:** Entities
     */
    get localScale(): Vector3Like | undefined;
    /**
     * The interpolation time in milliseconds applied to local scale changes.
     *
     * **Category:** Entities
     */
    get localScaleInterpolationMs(): number | undefined;
    /**
     * Removes this model node override from its parent entity.
     *
     * @remarks
     * This delegates to `Entity.removeModelNodeOverride()` so that map mutation
     * and related event emission remain centralized on the entity.
     *
     * **Category:** Entities
     */
    remove(): void;
    /**
     * Sets the emissive color for matching nodes.
     *
     * @param emissiveColor - The emissive color to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_EMISSIVE_COLOR` when spawned.
     *
     * **Category:** Entities
     */
    setEmissiveColor(emissiveColor: RgbColor | undefined): void;
    /**
     * Sets the emissive intensity for matching nodes.
     *
     * @param emissiveIntensity - The emissive intensity to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_EMISSIVE_INTENSITY` when spawned.
     *
     * **Category:** Entities
     */
    setEmissiveIntensity(emissiveIntensity: number | undefined): void;
    /**
     * Sets the hidden state for matching nodes.
     *
     * @param hidden - The hidden state to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_HIDDEN` when spawned.
     *
     * **Category:** Entities
     */
    setHidden(hidden: boolean): void;
    /**
     * Sets the local position for matching nodes.
     *
     * @param localPosition - The local position to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_LOCAL_POSITION` when spawned.
     *
     * **Category:** Entities
     */
    setLocalPosition(localPosition: Vector3Like | undefined): void;
    /**
     * Sets the interpolation time in milliseconds applied to local position changes.
     *
     * @param interpolationMs - The interpolation time in milliseconds to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_LOCAL_POSITION_INTERPOLATION_MS` when spawned.
     *
     * **Category:** Entities
     */
    setLocalPositionInterpolationMs(interpolationMs: number | undefined): void;
    /**
     * Sets the local rotation for matching nodes.
     *
     * @param localRotation - The local rotation to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_LOCAL_ROTATION` when spawned.
     *
     * **Category:** Entities
     */
    setLocalRotation(localRotation: QuaternionLike | undefined): void;
    /**
     * Sets the interpolation time in milliseconds applied to local rotation changes.
     *
     * @param interpolationMs - The interpolation time in milliseconds to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_LOCAL_ROTATION_INTERPOLATION_MS` when spawned.
     *
     * **Category:** Entities
     */
    setLocalRotationInterpolationMs(interpolationMs: number | undefined): void;
    /**
     * Sets the local scale for matching nodes.
     *
     * @param localScale - The local scale to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_LOCAL_SCALE` when spawned.
     *
     * **Category:** Entities
     */
    setLocalScale(localScale: Vector3Like | number | undefined): void;
    /**
     * Sets the interpolation time in milliseconds applied to local scale changes.
     *
     * @param interpolationMs - The interpolation time in milliseconds to set.
     *
     * **Side effects:** Emits `EntityModelNodeOverrideEvent.SET_LOCAL_SCALE_INTERPOLATION_MS` when spawned.
     *
     * **Category:** Entities
     */
    setLocalScaleInterpolationMs(interpolationMs: number | undefined): void;


}

/**
 * Event types an EntityModelNodeOverride instance can emit.
 *
 * See `EntityModelNodeOverrideEventPayloads` for payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum EntityModelNodeOverrideEvent {
    SET_EMISSIVE_COLOR = "ENTITY_MODEL_NODE_OVERRIDE.SET_EMISSIVE_COLOR",
    SET_EMISSIVE_INTENSITY = "ENTITY_MODEL_NODE_OVERRIDE.SET_EMISSIVE_INTENSITY",
    SET_HIDDEN = "ENTITY_MODEL_NODE_OVERRIDE.SET_HIDDEN",
    SET_LOCAL_POSITION = "ENTITY_MODEL_NODE_OVERRIDE.SET_LOCAL_POSITION",
    SET_LOCAL_POSITION_INTERPOLATION_MS = "ENTITY_MODEL_NODE_OVERRIDE.SET_LOCAL_POSITION_INTERPOLATION_MS",
    SET_LOCAL_ROTATION = "ENTITY_MODEL_NODE_OVERRIDE.SET_LOCAL_ROTATION",
    SET_LOCAL_ROTATION_INTERPOLATION_MS = "ENTITY_MODEL_NODE_OVERRIDE.SET_LOCAL_ROTATION_INTERPOLATION_MS",
    SET_LOCAL_SCALE = "ENTITY_MODEL_NODE_OVERRIDE.SET_LOCAL_SCALE",
    SET_LOCAL_SCALE_INTERPOLATION_MS = "ENTITY_MODEL_NODE_OVERRIDE.SET_LOCAL_SCALE_INTERPOLATION_MS"
}

/**
 * Event payloads for EntityModelNodeOverride emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface EntityModelNodeOverrideEventPayloads {
    /** Emitted when the emissive color for matching nodes is set. */
    [EntityModelNodeOverrideEvent.SET_EMISSIVE_COLOR]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        emissiveColor: RgbColor | undefined;
    };
    /** Emitted when the emissive intensity for matching nodes is set. */
    [EntityModelNodeOverrideEvent.SET_EMISSIVE_INTENSITY]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        emissiveIntensity: number | undefined;
    };
    /** Emitted when the hidden state for matching nodes is set. */
    [EntityModelNodeOverrideEvent.SET_HIDDEN]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        hidden: boolean;
    };
    /** Emitted when the position for matching nodes is set. */
    [EntityModelNodeOverrideEvent.SET_LOCAL_POSITION]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        localPosition: Vector3Like | undefined;
    };
    /** Emitted when the interpolation time in milliseconds applied to local position changes is set. */
    [EntityModelNodeOverrideEvent.SET_LOCAL_POSITION_INTERPOLATION_MS]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        interpolationMs: number | undefined;
    };
    /** Emitted when the rotation for matching nodes is set. */
    [EntityModelNodeOverrideEvent.SET_LOCAL_ROTATION]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        localRotation: QuaternionLike | undefined;
    };
    /** Emitted when the interpolation time in milliseconds applied to local rotation changes is set. */
    [EntityModelNodeOverrideEvent.SET_LOCAL_ROTATION_INTERPOLATION_MS]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        interpolationMs: number | undefined;
    };
    /** Emitted when the scale for matching nodes is set. */
    [EntityModelNodeOverrideEvent.SET_LOCAL_SCALE]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        localScale: Vector3Like | undefined;
    };
    /** Emitted when the interpolation time in milliseconds applied to local scale changes is set. */
    [EntityModelNodeOverrideEvent.SET_LOCAL_SCALE_INTERPOLATION_MS]: {
        entityModelNodeOverride: EntityModelNodeOverride;
        interpolationMs: number | undefined;
    };
}

/**
 * The options for creating an EntityModelNodeOverride instance.
 *
 * **Category:** Entities
 * @public
 */
export declare interface EntityModelNodeOverrideOptions {
    /** The node name match selector. Case-insensitive exact match by default, with optional edge wildcard (`head*`, `*head`, `*head*`). */
    nameMatch: string;
    /** The entity that the model node override belongs to. */
    entity: Entity;
    /** The emissive color for matching nodes. */
    emissiveColor?: RgbColor;
    /** The emissive intensity for matching nodes. */
    emissiveIntensity?: number;
    /** The hidden state for matching nodes. */
    hidden?: boolean;
    /** The local position for matching nodes. */
    localPosition?: Vector3Like;
    /** The interpolation time in milliseconds applied to local position changes. */
    localPositionInterpolationMs?: number;
    /** The local rotation for matching nodes. */
    localRotation?: QuaternionLike;
    /** The interpolation time in milliseconds applied to local rotation changes. */
    localRotationInterpolationMs?: number;
    /** The local scale for matching nodes. */
    localScale?: Vector3Like | number;
    /** The interpolation time in milliseconds applied to local scale changes. */
    localScaleInterpolationMs?: number;
}

/**
 * The options for creating an `Entity` instance.
 *
 * Use for: constructing an entity; choose `BlockEntityOptions` or `ModelEntityOptions`.
 * Do NOT use for: mutating entity state after spawn; use entity setters and methods.
 *
 * **Category:** Entities
 * @public
 */
export declare type EntityOptions = BlockEntityOptions | ModelEntityOptions;

/**
 * Manages error and warning logging.
 *
 * When to use: reporting recoverable issues or fatal errors with consistent formatting.
 * Do NOT use for: normal control flow; prefer explicit return values or exceptions.
 *
 * @remarks
 * In production, `console.log` is disabled to reduce log spam; use `console.info` instead.
 * Pattern: log warnings for recoverable issues and use `ErrorHandler.fatalError` for unrecoverable state.
 * Anti-pattern: swallowing exceptions without logging context.
 *
 * **Category:** Utilities
 * @public
 */
export declare class ErrorHandler {
    private static errorCount;
    private static warningCount;
    /**
     * Logs a formatted warning message to alert about potential issues
     * @param message - The warning message to display
     * @param context - Optional context information about the warning
     *
     * **Side effects:** Writes to stderr and increments the warning count.
     *
     * **Category:** Utilities
     */
    static warning(message: string, context?: string): void;
    /**
     * Logs a formatted error message with stack trace to help debug issues
     * @param message - The error message to display
     * @param context - Optional context information about the error
     *
     * **Side effects:** Writes to stderr and increments the error count.
     *
     * **Category:** Utilities
     */
    static error(message: string, context?: string): void;
    /**
     * Logs a formatted fatal error message with stack trace and throws the error
     * @param message - The error message to display
     * @param context - Optional context information about the error
     * @throws The created Error object
     *
     * **Side effects:** Writes to stderr and throws, terminating the current execution path.
     *
     * **Category:** Utilities
     */
    static fatalError(message: string, context?: string): never;


}

/**
 * The payloads for all events in the game server.
 *
 * **Category:** Events
 * @public
 */
export declare interface EventPayloads extends AudioEventPayloads, BaseEntityControllerEventPayloads, BlockTypeEventPayloads, BlockTypeRegistryEventPayloads, ChatEventPayloads, ChunkLatticeEventPayloads, ConnectionEventPayloads, EntityEventPayloads, EntityModelAnimationEventPayloads, EntityModelNodeOverrideEventPayloads, GameServerEventPayloads, ParticleEmitterEventPayloads, PlayerCameraEventPayloads, PlayerEventPayloads, PlayerManagerEventPayloads, PlayerUIEventPayloads, SceneUIEventPayloads, SimulationEventPayloads, WebServerEventPayloads, WorldEventPayloads, WorldLoopEventPayloads, WorldManagerEventPayloads {
}

/**
 * Routes events to listeners in local, world, or global scope.
 *
 * When to use: event-driven hooks within server subsystems.
 * Do NOT use for: high-frequency per-entity updates; prefer direct method calls for hot paths.
 *
 * @remarks
 * Provides local emission, world-scoped emission, and a shared global instance.
 * Pattern: use `EventRouter.emitWithWorld()` for world-scoped events and `final()` to install a single terminal listener.
 * Anti-pattern: installing multiple final listeners for the same event type; only one is supported.
 *
 * **Category:** Events
 * @public
 */
export declare class EventRouter {
    /**
     * The global event router instance.
     *
     * **Category:** Events
     */
    static readonly globalInstance: EventRouter;

    private _finalListeners;
    /**
     * Emit an event, invoking all registered listeners for the event type.
     *
     * @param eventType - The type of event to emit.
     * @param payload - The payload to emit.
     *
     * @returns `true` if any listeners were found and invoked, `false` otherwise.
     *
     * **Side effects:** Invokes listeners registered for the event type.
     *
     * **Category:** Events
     */
    emit<TEventType extends keyof EventPayloads>(eventType: TEventType, payload: EventPayloads[TEventType]): boolean;
    emit(eventType: string, payload: any): boolean;
    /**
     * Emits an event to the local and global server instance event routers.
     *
     * @param eventType - The type of event to emit.
     * @param payload - The payload to emit.
     *
     * **Side effects:** Invokes local listeners and `EventRouter.globalInstance` listeners.
     *
     * @see `EventRouter.emit()`
     *
     * **Category:** Events
     */
    emitWithGlobal<TEventType extends keyof EventPayloads>(eventType: TEventType, payload: EventPayloads[TEventType]): void;
    emitWithGlobal(eventType: string, payload: any): void;
    /**
     * Emits an event to local and provided world event routers.
     *
     * @param world - The world to broadcast the event to.
     * @param eventType - The type of event to broadcast.
     * @param payload - The payload to broadcast.
     *
     * **Requires:** The provided world must be active and using the same event payload types.
     *
     * **Side effects:** Invokes local listeners and listeners registered on the world instance.
     *
     * @see `EventRouter.emit()`
     *
     * **Category:** Events
     */
    emitWithWorld<TEventType extends keyof EventPayloads>(world: World, eventType: TEventType, payload: EventPayloads[TEventType]): void;
    emitWithWorld(world: World, eventType: string, payload: any): void;

    final(eventType: string, listener: (payload: any) => void): void;
    /**
     * Check if there are listeners for a specific event type.
     *
     * @param eventType - The type of event to check for listeners.
     *
     * @returns `true` if listeners are found, `false` otherwise.
     *
     * **Category:** Events
     */
    hasListeners<TEventType extends keyof EventPayloads>(eventType: TEventType): boolean;
    hasListeners(eventType: string): boolean;
    /**
     * Get all listeners for a specific event type.
     *
     * @param eventType - The type of event to get listeners for.
     *
     * @returns All listeners for the event type.
     *
     * **Category:** Events
     */
    listeners<TEventType extends keyof EventPayloads>(eventType: TEventType): EventEmitter.EventListener<any, string>[];
    listeners(eventType: string): EventEmitter.EventListener<any, string>[];
    /**
     * Get the number of listeners for a specific event type.
     *
     * @param eventType - The type of event to get the listener count for.
     *
     * @returns The number of listeners for the event type.
     *
     * **Category:** Events
     */
    listenerCount<TEventType extends keyof EventPayloads>(eventType: TEventType): number;
    listenerCount(eventType: string): number;
    /**
     * Remove a listener for a specific event type.
     *
     * @param eventType - The type of event to remove the listener from.
     * @param listener - The listener function to remove.
     *
     * **Category:** Events
     */
    off<TEventType extends keyof EventPayloads>(eventType: TEventType, listener: (payload: EventPayloads[TEventType]) => void): void;
    off(eventType: string, listener: (payload: any) => void): void;
    /**
     * Remove all listeners or all listeners for a provided event type.
     *
     * @param eventType - The type of event to remove all listeners from.
     *
     * **Side effects:** Clears listeners and final listeners for the event type.
     *
     * **Category:** Events
     */
    offAll<TEventType extends keyof EventPayloads>(eventType?: TEventType): void;
    offAll(eventType?: string): void;
    /**
     * Register a listener for a specific event type.
     *
     * @remarks
     * Listeners are invoked in the order they are registered.
     *
     * @param eventType - The type of event to listen for.
     * @param listener - The listener function to invoke when the event is emitted.
     *
     * **Category:** Events
     */
    on<TEventType extends keyof EventPayloads>(eventType: TEventType, listener: (payload: EventPayloads[TEventType]) => void): void;
    on(eventType: string, listener: (payload: any) => void): void;
    /**
     * Register a listener for a specific event type that will be invoked once.
     *
     * @param eventType - The type of event to listen for.
     * @param listener - The listener function to invoke when the event is emitted.
     *
     * **Category:** Events
     */
    once<TEventType extends keyof EventPayloads>(eventType: TEventType, listener: (payload: EventPayloads[TEventType]) => void): void;
    once(eventType: string, listener: (payload: any) => void): void;
}

/**
 * Callback invoked as the entity rotates toward a target.
 *
 * @param currentRotation - The current rotation of the entity.
 * @param targetRotation - The target rotation of the entity.
 *
 * **Category:** Controllers
 * @public
 */
export declare type FaceCallback = (currentRotation: QuaternionLike, targetRotation: QuaternionLike) => void;

/**
 * Callback invoked when the entity finishes rotating to face a target.
 *
 * @param endRotation - The rotation of the entity after it has finished rotating.
 *
 * **Category:** Controllers
 * @public
 */
export declare type FaceCompleteCallback = (endRotation: QuaternionLike) => void;

/**
 * Options for `SimpleEntityController.face`.
 *
 * Use for: customizing a single `face()` call (callbacks, completion).
 * Do NOT use for: persistent defaults; use `SimpleEntityControllerOptions`.
 *
 * **Category:** Controllers
 * @public
 */
export declare type FaceOptions = {
    faceCallback?: FaceCallback;
    faceCompleteCallback?: FaceCompleteCallback;
};

/**
 * Filter options for raycasting and intersection queries.
 *
 * Use for: scoping physics queries to specific colliders or groups.
 * Do NOT use for: persistent collision configuration; use `CollisionGroupsBuilder`.
 *
 * **Category:** Physics
 * @public
 */
export declare type FilterOptions = {
    /** The query filter flags. */
    filterFlags?: RAPIER.QueryFilterFlags;
    /** The collision group to filter by. */
    filterGroups?: number;
    /** The collider to exclude. */
    filterExcludeCollider?: RawCollider;
    /** The rigid body to exclude. */
    filterExcludeRigidBody?: RAPIER.RigidBody;
    /** The predicate to filter by. */
    filterPredicate?: (collider: RawCollider) => boolean;
};

/**
 * The options for a fixed rigid body. @public
 *
 * Use for: immovable bodies (world geometry, static platforms).
 * Do NOT use for: moving objects; use dynamic or kinematic options.
 *
 * **Category:** Physics
 */
export declare interface FixedRigidBodyOptions extends BaseRigidBodyOptions {
    type: RigidBodyType.FIXED;
}

/**
 * Global entry point for server systems (players, worlds, assets).
 *
 * When to use: accessing global managers and registries after startup.
 * Do NOT use for: constructing your own server instance.
 *
 * @remarks
 * Access via `GameServer.instance` — do not construct directly.
 * Initialize with `startServer` to ensure physics and assets are ready.
 *
 * **Category:** Core
 * @public
 */
export declare class GameServer {








    /**
     * The singleton instance of the game server.
     *
     * @remarks
     * Access this after calling `startServer`.
     *
     * **Category:** Core
     */
    static get instance(): GameServer;
    /**
     * The block texture registry for the game server.
     *
     * **Category:** Core
     */
    get blockTextureRegistry(): BlockTextureRegistry;
    /**
     * The model registry for the game server.
     *
     * **Category:** Core
     */
    get modelRegistry(): ModelRegistry;
    /**
     * The player manager for the game server.
     *
     * **Category:** Core
     */
    get playerManager(): PlayerManager;

    /**
     * The web server for the game server.
     *
     * **Category:** Core
     */
    get webServer(): WebServer;
    /**
     * The world manager for the game server.
     *
     * **Category:** Core
     */
    get worldManager(): WorldManager;

}

/**
 * Event types a GameServer instance can emit to the global event router.
 *
 * See `GameServerEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum GameServerEvent {
    START = "GAMESERVER.START",
    STOP = "GAMESERVER.STOP"
}

/**
 * Event payloads for GameServer emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface GameServerEventPayloads {
    /** Emitted when the game server starts. */
    [GameServerEvent.START]: {
        startedAtMs: number;
    };
    /** Emitted when the game server stops. */
    [GameServerEvent.STOP]: {
        stoppedAtMs: number;
    };
}

/**
 * An intersection result.
 *
 * **Category:** Physics
 * @public
 */
export declare type IntersectionResult = {
    /** The block type that was intersected. */
    intersectedBlockType?: BlockType;
    /** The entity that was intersected. */
    intersectedEntity?: Entity;
};

/**
 * A high-performance Map-like data structure optimized for frequent iteration.
 *
 * When to use: per-tick collections that are built, iterated, and cleared each frame.
 * Do NOT use for: long-lived maps with rare iteration; a standard Map is simpler.
 *
 * @remarks
 * IterationMap maintains both a Map for O(1) lookups and an Array for fast iteration,
 * eliminating the need for Array.from() calls and providing ~2x faster iteration
 * than Map.values(). Optimized for "build up, iterate, clear" usage patterns
 * common in game loops.
 *
 * Pattern: update via `IterationMap.set`, iterate with `IterationMap.valuesArray`, then `IterationMap.clear`.
 * Anti-pattern: mutating the map during `IterationMap.valuesArray` iteration.
 *
 * @example
 * ```typescript
 * const iterationMap = new IterationMap<number, string>();
 * iterationMap.set(1, 'hello');
 * iterationMap.set(2, 'world');
 *
 * // Fast O(1) lookup
 * const value = iterationMap.get(1);
 *
 * // Fast array iteration (no Map.values() overhead)
 * for (const item of iterationMap.valuesArray) {
 *   console.log(item);
 * }
 *
 * // Efficient bulk clear
 * iterationMap.clear();
 * ```
 *
 * **Category:** Utilities
 * @public
 */
export declare class IterationMap<K, V> {



    /**
     * Returns the number of key-value pairs in the IterationMap.
     *
     * **Category:** Utilities
     */
    get size(): number;
    /**
     * Returns a readonly array of all values for fast iteration.
     * This is the key performance feature - use this instead of .values() for iteration.
     *
     * **Side effects:** Rebuilds the backing array when the map has changed.
     *
     * **Category:** Utilities
     */
    get valuesArray(): readonly V[];
    /**
     * Returns the value associated with the key, or undefined if the key doesn't exist.
     * @param key - The key to look up.
     * @returns The value associated with the key, or undefined.
     *
     * **Category:** Utilities
     */
    get(key: K): V | undefined;
    /**
     * Sets the value for the key in the IterationMap.
     * @param key - The key to set.
     * @param value - The value to set.
     * @returns The IterationMap instance for chaining.
     *
     * **Side effects:** May mark the internal array as dirty.
     *
     * **Category:** Utilities
     */
    set(key: K, value: V): this;
    /**
     * Returns true if the key exists in the IterationMap.
     * @param key - The key to check.
     * @returns True if the key exists, false otherwise.
     *
     * **Category:** Utilities
     */
    has(key: K): boolean;
    /**
     * Removes the key-value pair from the IterationMap.
     * @param key - The key to delete.
     * @returns True if the key existed and was deleted, false otherwise.
     *
     * **Side effects:** Marks the internal array as dirty.
     *
     * **Category:** Utilities
     */
    delete(key: K): boolean;
    /**
     * Removes all key-value pairs from the IterationMap.
     * Highly optimized for the common "build up, iterate, clear" pattern.
     *
     * **Side effects:** Clears the backing map and value array.
     *
     * **Category:** Utilities
     */
    clear(): void;
    /**
     * Executes a provided function once for each key-value pair.
     * @param callbackfn - Function to execute for each element.
     * @param thisArg - Value to use as this when executing callback.
     *
     * **Category:** Utilities
     */
    forEach(callbackfn: (value: V, key: K, map: IterationMap<K, V>) => void, thisArg?: any): void;
    /**
     * Returns an iterator for the keys in the IterationMap.
     * @returns An iterator for the keys.
     *
     * **Category:** Utilities
     */
    keys(): IterableIterator<K>;
    /**
     * Returns an iterator for the values in the IterationMap.
     * Note: For performance-critical iteration, use .valuesArray instead.
     * @returns An iterator for the values.
     *
     * **Category:** Utilities
     */
    values(): IterableIterator<V>;
    /**
     * Returns an iterator for the key-value pairs in the IterationMap.
     * @returns An iterator for the entries.
     *
     * **Category:** Utilities
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * Returns an iterator for the key-value pairs in the IterationMap.
     * @returns An iterator for the entries.
     *
     * **Category:** Utilities
     */
    [Symbol.iterator](): IterableIterator<[K, V]>;

}

/**
 * The options for a kinematic position rigid body. @public
 *
 * Use for: moving bodies by setting target positions each tick.
 * Do NOT use for: physics-driven motion; use dynamic bodies instead.
 *
 * **Category:** Physics
 */
export declare interface KinematicPositionRigidBodyOptions extends BaseRigidBodyOptions {
    type: RigidBodyType.KINEMATIC_POSITION;
}

/**
 * The options for a kinematic velocity rigid body. @public
 *
 * Use for: moving bodies by setting velocities each tick.
 * Do NOT use for: physics-driven motion; use dynamic bodies instead.
 *
 * **Category:** Physics
 */
export declare interface KinematicVelocityRigidBodyOptions extends BaseRigidBodyOptions {
    type: RigidBodyType.KINEMATIC_VELOCITY;
    /**
     * The angular velocity of the rigid body.
     *
     * **Category:** Physics
     */
    angularVelocity?: Vector3Like;
    /**
     * The linear velocity of the rigid body.
     *
     * **Category:** Physics
     */
    linearVelocity?: Vector3Like;
}

/**
 * Represents a 2x2 matrix.
 *
 * When to use: 2D transforms or linear algebra utilities.
 * Do NOT use for: immutable math; most methods mutate the instance.
 *
 * @remarks
 * All matrix methods result in mutation of the matrix instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 2x2 matrix.
 *
 * Pattern: reuse instances to reduce allocations.
 * Anti-pattern: treating matrices as immutable values.
 *
 * **Category:** Math
 * @public
 */
export declare class Matrix2 extends Float32Array {
    constructor(m00: number, m01: number, m10: number, m11: number);
    /** The determinant of the matrix. */
    get determinant(): number;
    /** The frobenius normal of the matrix. */
    get frobeniusNorm(): number;
    /**
     * Creates a new `Matrix2` instance.
     *
     * @returns A new `Matrix2` instance.
     */
    static create(): Matrix2;
    /**
     * Creates a new `Matrix2` instance from a rotation of identity matrix.
     *
     * @param angle - The angle in radians to rotate the matrix by.
     * @returns A new `Matrix2` instance.
     */
    static fromRotation(angle: number): Matrix2;
    /**
     * Creates a new `Matrix2` instance from a scale of identity matrix.
     *
     * @param scale - The scale of the matrix.
     * @returns A new `Matrix2` instance.
     */
    static fromScaling(scale: Vector2): Matrix2;
    /**
     * Adds a matrix to the current matrix.
     *
     * @param matrix2 - The matrix to add to the current matrix.
     * @returns The current matrix.
     */
    add(matrix2: Matrix2): Matrix2;
    /**
     * Sets the adjugate of the current matrix.
     *
     * @returns The current matrix.
     */
    adjoint(): Matrix2;
    /**
     * Clones the current matrix.
     *
     * @returns A clone of the current matrix.
     */
    clone(): Matrix2;
    /**
     * Copies a matrix to the current matrix.
     *
     * @param matrix2 - The matrix2 to copy to the current matrix.
     * @returns The current matrix.
     */
    copy(matrix2: Matrix2): Matrix2;
    /**
     * Checks if the current matrix is approximately equal to another matrix.
     *
     * @param matrix2 - The matrix to compare to the current matrix.
     * @returns `true` if the current matrix is equal to the provided matrix, `false` otherwise.
     */
    equals(matrix2: Matrix2): boolean;
    /**
     * Checks if the current matrix is exactly equal to another matrix.
     *
     * @param matrix2 - The matrix to compare to the current matrix.
     * @returns `true` if the current matrix is equal to the provided matrix, `false` otherwise.
     */
    exactEquals(matrix2: Matrix2): boolean;
    /**
     * Sets the current matrix to the identity matrix.
     *
     * @returns The current matrix.
     */
    identity(): Matrix2;
    /**
     * Inverts the current matrix.
     *
     * @returns The current matrix.
     */
    invert(): Matrix2;
    /**
     * Multiplies the current matrix by another matrix.
     *
     * @param matrix2 - The matrix to multiply the current matrix by.
     * @returns The current matrix.
     */
    multiply(matrix2: Matrix2): Matrix2;
    /**
     * Multiplies each element of the current matrix by a scalar value.
     *
     * @param scalar - The scalar value to multiply the current matrix elements by.
     * @returns The current matrix.
     */
    multiplyScalar(scalar: number): Matrix2;
    /**
     * Rotates the current matrix by an angle in radians.
     *
     * @param angle - The angle in radians to rotate the current matrix by.
     * @returns The current matrix.
     */
    rotate(angle: number): Matrix2;
    /**
     * Subtracts a matrix from the current matrix.
     *
     * @param matrix2 - The matrix to subtract from the current matrix.
     * @returns The current matrix.
     */
    subtract(matrix2: Matrix2): Matrix2;
    /**
     * Returns a string representation of the current matrix.
     *
     * @returns A string representation of the current matrix.
     */
    toString(): string;
    /**
     * Transposes the current matrix.
     *
     * @returns The current matrix.
     */
    transpose(): Matrix2;
}

/**
 * Represents a 3x3 matrix.
 *
 * When to use: 2D homogeneous transforms or normal matrix math.
 * Do NOT use for: immutable math; most methods mutate the instance.
 *
 * @remarks
 * All matrix methods result in mutation of the matrix instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 3x3 matrix.
 *
 * Pattern: reuse instances to reduce allocations.
 * Anti-pattern: treating matrices as immutable values.
 *
 * **Category:** Math
 * @public
 */
export declare class Matrix3 extends Float32Array {
    constructor(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number);
    /** The determinant of the matrix. */
    get determinant(): number;
    /** The frobenius norm of the matrix. */
    get frobeniusNorm(): number;
    /**
     * Creates a new `Matrix3` instance.
     *
     * @returns A new `Matrix3` instance.
     */
    static create(): Matrix3;
    /**
     * Creates a new `Matrix3` instance from a `Matrix4` instance.
     *
     * @param matrix4 - The `Matrix4` instance to create the `Matrix3` instance from.
     * @returns A new `Matrix3` instance.
     */
    static fromMatrix4(matrix4: Matrix4): Matrix3;
    /**
     * Creates a new `Matrix3` instance from a `Quaternion` instance.
     *
     * @param quaternion - The `Quaternion` instance to create the `Matrix3` instance from.
     * @returns A new `Matrix3` instance.
     */
    static fromQuaternion(quaternion: Quaternion): Matrix3;
    /**
     * Creates a new `Matrix3` instance from a rotation of identity matrix.
     *
     * @param angle - The angle in radians to rotate the matrix by.
     * @returns A new `Matrix3` instance.
     */
    static fromRotation(angle: number): Matrix3;
    /**
     * Creates a new `Matrix3` instance from a scale of identity matrix.
     *
     * @param scale - The scale of the matrix.
     * @returns A new `Matrix3` instance.
     */
    static fromScaling(scale: Vector3): Matrix3;
    /**
     * Creates a new `Matrix3` instance from a translation of identity matrix.
     * This is used only when working with two-dimensional homogeneous coordinates,
     * which is why the `translation` parameter is a `Vector2`.
     *
     * @param translation - The translation of the matrix.
     * @returns A new `Matrix3` instance.
     */
    static fromTranslation(translation: Vector2): Matrix3;
    /**
     * Adds a matrix to the current matrix.
     *
     * @param matrix3 - The matrix to add to the current matrix.
     * @returns The current matrix.
     */
    add(matrix3: Matrix3): Matrix3;
    /**
     * Sets the adjugate of the current matrix.
     *
     * @returns The current matrix.
     */
    adjoint(): Matrix3;
    /**
     * Clones the current matrix.
     *
     * @returns A clone of the current matrix.
     */
    clone(): Matrix3;
    /**
     * Copies a matrix to the current matrix.
     *
     * @param matrix3 - The matrix to copy to the current matrix.
     * @returns The current matrix.
     */
    copy(matrix3: Matrix3): Matrix3;
    /**
     * Checks if the current matrix is approximately equal to another matrix.
     *
     * @param matrix3 - The matrix to compare to the current matrix.
     * @returns `true` if the current matrix is equal to the provided matrix, `false` otherwise.
     */
    equals(matrix3: Matrix3): boolean;
    /**
     * Checks if the current matrix is exactly equal to another matrix.
     *
     * @param matrix3 - The matrix to compare to the current matrix.
     * @returns `true` if the current matrix is equal to the provided matrix, `false` otherwise.
     */
    exactEquals(matrix3: Matrix3): boolean;
    /**
     * Sets the current matrix to the identity matrix.
     *
     * @returns The current matrix.
     */
    identity(): Matrix3;
    /**
     * Inverts the current matrix.
     *
     * @returns The current matrix.
     */
    invert(): Matrix3;
    /**
     * Multiplies the current matrix by another matrix.
     *
     * @param matrix3 - The matrix to multiply the current matrix by.
     * @returns The current matrix.
     */
    multiply(matrix3: Matrix3): Matrix3;
    /**
     * Multiplies each element of the current matrix by a scalar value.
     *
     * @param scalar - The scalar value to multiply the current matrix elements by.
     * @returns The current matrix.
     */
    multiplyScalar(scalar: number): Matrix3;
    /**
     * Multiplies the provided vector3 by this matrix. This modifies
     * the vector in-place, but also returns the transformed vector.
     *
     * @param vector - The vector to multiply by this.
     * @returns The transformed vector.
     */
    transformVector(vector: Vector3): Vector3;
    /**
     * Sets the current matrix to a orthographic projection matrix with the given bounds.
     *
     * @param width - The width of the projection.
     * @param height - The height of the projection.
     * @returns The current matrix.
     */
    projection(width: number, height: number): Matrix3;
    /**
     * Rotates the current matrix by an angle in radians.
     *
     * @param angle - The angle in radians to rotate the current matrix by.
     * @returns The current matrix.
     */
    rotate(angle: number): Matrix3;
    /**
     * Subtracts a matrix from the current matrix.
     *
     * @param matrix3 - The matrix to subtract from the current matrix.
     * @returns The current matrix.
     */
    subtract(matrix3: Matrix3): Matrix3;
    /**
     * Returns a string representation of the current matrix.
     *
     * @returns A string representation of the current matrix.
     */
    toString(): string;
    /**
     * Transposes the current matrix.
     *
     * @returns The current matrix.
     */
    transpose(): Matrix3;
}

/**
 * Represents a 4x4 matrix.
 *
 * When to use: 3D transforms (translation, rotation, scale) and camera math.
 * Do NOT use for: immutable math; most methods mutate the instance.
 *
 * @remarks
 * All matrix methods result in mutation of the matrix instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 4x4 matrix.
 *
 * Pattern: reuse instances to reduce allocations.
 * Anti-pattern: treating matrices as immutable values.
 *
 * **Category:** Math
 * @public
 */
export declare class Matrix4 extends Float32Array {
    constructor(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number);
    /** The determinant of the matrix. */
    get determinant(): number;
    /** The frobenius norm of the matrix. */
    get frobeniusNorm(): number;
    /**
     * Creates a new `Matrix4` instance.
     *
     * @returns A new `Matrix4` instance.
     */
    static create(): Matrix4;
    /**
     * Creates a new `Matrix4` instance from a `Quaternion` object.
     *
     * @param quaternion - The `Quaternion` object to create the `Matrix4` instance from.
     * @returns A new `Matrix4` instance.
     */
    static fromQuaternion(quaternion: Quaternion): Matrix4;
    /**
     * Creates a new `Matrix4` instance from an angle and axis.
     *
     * @param angle - The angle in radians to rotate the matrix by.
     * @param axis - The axis to rotate the matrix around.
     * @returns A new `Matrix4` instance.
     */
    static fromRotation(angle: number, axis: Vector3): Matrix4;
    /**
     * Creates a new `Matrix4` instance from a rotation and translation.
     *
     * @param rotation - The rotation of the matrix.
     * @param translation - The translation of the matrix.
     * @returns A new `Matrix4` instance.
     */
    static fromRotationTranslation(rotation: Quaternion, translation: Vector3): Matrix4;
    /**
     * Creates a new `Matrix4` instance from a rotation, translation, and scale.
     *
     * @param rotation - The rotation of the matrix.
     * @param translation - The translation of the matrix.
     * @param scale - The scale of the matrix.
     * @returns A new `Matrix4` instance.
     */
    static fromRotationTranslationScale(rotation: Quaternion, translation: Vector3, scale: Vector3): Matrix4;
    /**
     * Creates a new `Matrix4` instance from a rotation, translation, scale, and origin.
     *
     * @param rotation - The rotation of the matrix.
     * @param translation - The translation of the matrix.
     * @param scale - The scale of the matrix.
     * @param origin - The origin of the matrix.
     * @returns A new `Matrix4` instance.
     */
    static fromRotationTranslationScaleOrigin(rotation: Quaternion, translation: Vector3, scale: Vector3, origin: Vector3): Matrix4;
    /**
     * Creates a new `Matrix4` instance from a scale of identity matrix.
     *
     * @param scale - The scale of the matrix.
     * @returns A new `Matrix4` instance.
     */
    static fromScaling(scale: Vector3): Matrix4;
    /**
     * Creates a new `Matrix4` instance from a translation of identity matrix.
     *
     * @param translation - The translation of the matrix.
     * @returns A new `Matrix4` instance.
     */
    static fromTranslation(translation: Vector3): Matrix4;
    /**
     * Creates a new `Matrix4` instance from an x-rotation of identity matrix.
     *
     * @param angle - The angle in radians to rotate the matrix by.
     * @returns A new `Matrix4` instance.
     */
    static fromXRotation(angle: number): Matrix4;
    /**
     * Creates a new `Matrix4` instance from a y-rotation of identity matrix.
     *
     * @param angle - The angle in radians to rotate the matrix by.
     * @returns A new `Matrix4` instance.
     */
    static fromYRotation(angle: number): Matrix4;
    /**
     * Creates a new `Matrix4` instance from a z-rotation of identity matrix.
     *
     * @param angle - The angle in radians to rotate the matrix by.
     * @returns A new `Matrix4` instance.
     */
    static fromZRotation(angle: number): Matrix4;
    /**
     * Adds a matrix to the current matrix.
     *
     * @param matrix4 - The matrix to add to the current matrix.
     * @returns The current matrix.
     */
    add(matrix4: Matrix4): Matrix4;
    /**
     * Sets the adjugate of the current matrix.
     *
     * @returns The current matrix.
     */
    adjoint(): Matrix4;
    /**
     * Clones the current matrix.
     *
     * @returns A clone of the current matrix.
     */
    clone(): Matrix4;
    /**
     * Copies a matrix to the current matrix.
     *
     * @param matrix4 - The matrix to copy to the current matrix.
     * @returns The current matrix.
     */
    copy(matrix4: Matrix4): Matrix4;
    /**
     * Checks if the current matrix is approximately equal to another matrix.
     *
     * @param matrix4 - The matrix to compare to the current matrix.
     * @returns `true` if the current matrix is equal to the provided matrix, `false` otherwise.
     */
    equals(matrix4: Matrix4): boolean;
    /**
     * Checks if the current matrix is exactly equal to another matrix.
     *
     * @param matrix4 - The matrix to compare to the current matrix.
     * @returns `true` if the current matrix is equal to the provided matrix, `false` otherwise.
     */
    exactEquals(matrix4: Matrix4): boolean;
    /**
     * Sets the current matrix to a frustrum matrix with the given bounds.
     *
     * @param left - The left bound of the projection.
     * @param right - The right bound of the projection.
     * @param bottom - The bottom bound of the projection.
     * @param top - The top bound of the projection.
     * @param near - The near bound of the projection.
     * @param far - The far bound of the projection.
     * @returns The current matrix.
     */
    frustrum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;
    /**
     * Sets the current matrix to the identity matrix.
     *
     * @returns The current matrix.
     */
    identity(): Matrix4;
    /**
     * Inverts the current matrix.
     *
     * @returns The current matrix.
     */
    invert(): Matrix4;
    /**
     * Sets the current matrix to a look-at matrix with the given eye, center, and up vectors.
     *
     * @param eye - The eye vector of the camera.
     * @param center - The center vector of the camera.
     * @param up - The up vector of the camera.
     * @returns The current matrix.
     */
    lookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix4;
    /**
     * Multiplies the current matrix by another matrix.
     *
     * @param matrix4 - The matrix to multiply the current matrix by.
     * @returns The current matrix.
     */
    multiply(matrix4: Matrix4): Matrix4;
    /**
     * Multiplies each element of the current matrix by a scalar value.
     *
     * @param scalar - The scalar value to multiply the current matrix elements by.
     * @returns The current matrix.
     */
    multiplyScalar(scalar: number): Matrix4;
    /**
     * Sets the current matrix to an orthographic projection matrix with the given bounds.
     *
     * @param left - The left bound of the frustum.
     * @param right - The right bound of the frustum.
     * @param bottom - The bottom bound of the frustum.
     * @param top - The top bound of the frustum.
     * @param near - The near bound of the frustum.
     * @param far - The far bound of the frustum.
     * @returns The current matrix.
     */
    orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;
    /**
     * Sets the current matrix to a perspective matrix with the given field of view, aspect ratio, and near and far bounds.
     *
     * @param fovy - The field of view of the projection.
     * @param aspect - The aspect ratio of the projection.
     * @param near - The near bound of the projection.
     * @param far - The far bound of the projection.
     * @returns The current matrix.
     */
    perspective(fovy: number, aspect: number, near: number, far: number): Matrix4;
    /**
     * Rotates the current matrix by an angle in radians around an axis.
     *
     * @param angle - The angle in radians to rotate the current matrix by.
     * @param axis - The axis to rotate the current matrix around.
     * @returns The current matrix.
     */
    rotate(angle: number, axis: Vector3): Matrix4;
    /**
     * Rotates the current matrix by an angle in radians around the x-axis.
     *
     * @param angle - The angle in radians to rotate the current matrix by.
     * @returns The current matrix.
     */
    rotateX(angle: number): Matrix4;
    /**
     * Rotates the current matrix by an angle in radians around the y-axis.
     *
     * @param angle - The angle in radians to rotate the current matrix by.
     * @returns The current matrix.
     */
    rotateY(angle: number): Matrix4;
    /**
     * Rotates the current matrix by an angle in radians around the z-axis.
     *
     * @param angle - The angle in radians to rotate the current matrix by.
     * @returns The current matrix.
     */
    rotateZ(angle: number): Matrix4;
    /**
     * Scales the current matrix by a vector.
     *
     * @param vector3 - The vector to scale the current matrix by.
     * @returns The current matrix.
     */
    scale(vector3: Vector3): Matrix4;
    /**
     * Subtracts a matrix from the current matrix.
     *
     * @param matrix4 - The matrix to subtract from the current matrix.
     * @returns The current matrix.
     */
    subtract(matrix4: Matrix4): Matrix4;
    /**
     * Sets the current matrix to a matrix that looks at a target.
     *
     * @param eye - The eye vector of the camera.
     * @param center - The center vector of the camera.
     * @param up - The up vector of the camera.
     * @returns The current matrix.
     */
    targetTo(eye: Vector3, center: Vector3, up: Vector3): Matrix4;
    /**
     * Returns a string representation of the current matrix.
     *
     * @returns A string representation of the current matrix.
     */
    toString(): string;
    /**
     * Translates the current matrix by a vector.
     *
     * @param vector3 - The vector to translate the current matrix by.
     * @returns The current matrix.
     */
    translate(vector3: Vector3): Matrix4;
    /**
     * Transposes the current matrix.
     *
     * @returns The current matrix.
     */
    transpose(): Matrix4;
}

/**
 * A bounding box for a model.
 *
 * **Category:** Models
 * @public
 */
export declare type ModelBoundingBox = {
    min: Vector3Like;
    max: Vector3Like;
};

/**
 * The options for creating a model entity.
 *
 * Use for: entities rendered from a glTF model.
 * Do NOT use for: block entities; use `BlockEntityOptions`.
 *
 * **Category:** Entities
 * @public
 */
export declare interface ModelEntityOptions extends BaseEntityOptions {
    /** The model animation options for animations to configure immediately. */
    modelAnimations?: Omit<EntityModelAnimationOptions, 'entity'>[];
    /** The node overrides for the entity's model. `nameMatch` is exact by default, with optional edge wildcard (`head*`, `*head`, `*head*`). */
    modelNodeOverrides?: Omit<EntityModelNodeOverrideOptions, 'entity'>[];
    /** The preferred shape of the entity's model when automatically generating its collider when no explicit colliders are provided. */
    modelPreferredShape?: ColliderShape;
    /** The scale of the entity's model. Can be a vector3 for per-axis scaling, or a number for uniform scaling. */
    modelScale?: Vector3Like | number;
    /** The interpolation time in milliseconds applied to model scale changes. */
    modelScaleInterpolationMs?: number;
    /** The texture uri of the entity's model. Setting this overrides the model's default texture. */
    modelTextureUri?: string;
    /** The URI or path to the .gltf model asset to be used for the entity. */
    modelUri?: string;
}

/**
 * Manages model data for all known models of the game.
 *
 * When to use: querying model metadata (bounds, node names, animations, trimesh).
 * Do NOT use for: runtime mesh editing; use dedicated tooling or physics colliders.
 *
 * @remarks
 * The ModelRegistry is created internally as a global
 * singleton accessible via `ModelRegistry.instance`.
 * Model data is preloaded during server startup and cached in memory.
 *
 * Pattern: call `ModelRegistry.hasModel` before accessing metadata to avoid warnings.
 * Anti-pattern: calling `ModelRegistry.getTrimesh` every tick; it may allocate arrays.
 *
 * @example
 * ```typescript
 * import { ModelRegistry } from 'hytopia';
 *
 * const modelRegistry = ModelRegistry.instance;
 * const boundingBox = modelRegistry.getBoundingBox('models/player.gltf');
 * ```
 *
 * **Category:** Models
 * @public
 */
export declare class ModelRegistry {
    /**
     * The global ModelRegistry instance as a singleton.
     *
     * **Category:** Models
     */
    static readonly instance: ModelRegistry;
    /**
     * Whether to generate optimized models if needed.
     *
     * Defaults to `true` in development, `false` in production.
     *
     * **Category:** Models
     */
    optimize: boolean;






    /**
     * Retrieves an array of all available model URIs.
     *
     * @returns An array of all available model URIs.
     *
     * **Category:** Models
     */
    getAllModelUris(): string[];
    /**
     * Retrieves an array of all known animation names for a model.
     *
     * @param modelUri - The URI of the model to retrieve the animation names for.
     * @returns An array of all known animation names for the model.
     *
     * **Requires:** Model data must be loaded (server startup).
     *
     * **Category:** Models
     */
    getAnimationNames(modelUri: string): Readonly<string[]>;
    /**
     * Retrieves the bounding box of a model.
     *
     * @param modelUri - The URI of the model to retrieve the bounding box for.
     * @returns The bounding box of the model.
     *
     * **Requires:** Model data must be loaded (server startup).
     *
     * **Category:** Models
     */
    getBoundingBox(modelUri: string): ModelBoundingBox;
    /**
     * Retrieves the Z-axis depth of a model for a scale of 1.
     *
     * @param modelUri - The URI of the model to retrieve the depth for.
     * @returns The depth of the model.
     *
     * @see `ModelRegistry.getBoundingBox`
     *
     * **Category:** Models
     */
    getDepth(modelUri: string): number;
    /**
     * Retrieves the Y-axis height of a model for a scale of 1.
     *
     * @param modelUri - The URI of the model to retrieve the height for.
     * @returns The height of the model.
     *
     * @see `ModelRegistry.getBoundingBox`
     *
     * **Category:** Models
     */
    getHeight(modelUri: string): number;
    /**
     * Retrieves the names of all nodes in a model.
     *
     * @param modelUri - The URI of the model to retrieve the node names for.
     * @returns The names of all nodes in the model.
     *
     * **Requires:** Model data must be loaded (server startup).
     *
     * **Category:** Models
     */
    getNodeNames(modelUri: string): string[];
    /**
     * Retrieves the trimesh of a model.
     *
     * @param modelUri - The URI of the model to retrieve the trimesh for.
     * @param scale - Optional scaling to apply to the trimesh. Defaults to 1 for all axes (no scaling).
     * @returns The trimesh of the model.
     *
     * **Requires:** Model data must be loaded (server startup).
     *
     * **Category:** Models
     */
    getTrimesh(modelUri: string, scale?: Vector3Like): ModelTrimesh | undefined;
    /**
     * Retrieves the X-axis width of a model for a scale of 1.
     *
     * @param modelUri - The URI of the model to retrieve the width for.
     * @returns The width of the model.
     *
     * @see `ModelRegistry.getBoundingBox`
     *
     * **Category:** Models
     */
    getWidth(modelUri: string): number;
    /**
     * Checks if a model is registered in the model registry.
     *
     * @param modelUri - The URI of the model to check.
     * @returns Whether the model is registered.
     *
     * **Category:** Models
     */
    hasModel(modelUri: string): boolean;
    /**
     * Checks if a model has a node with the given name.
     *
     * @param modelUri - The URI of the model to check.
     * @param nodeName - The name of the node to check for.
     * @returns Whether the model has a node with the given name.
     *
     * **Requires:** Model data must be loaded (server startup).
     *
     * **Category:** Models
     */
    modelHasNode(modelUri: string, nodeName: string): boolean;












}

/**
 * A trimesh for a model.
 *
 * **Category:** Models
 * @public
 */
export declare type ModelTrimesh = {
    vertices: Float32Array;
    indices: Uint32Array;
};

/**
 * Callback invoked as the entity moves toward a target coordinate.
 *
 * @param currentPosition - The current position of the entity.
 * @param targetPosition - The target position of the entity.
 *
 * **Category:** Controllers
 * @public
 */
export declare type MoveCallback = (currentPosition: Vector3Like, targetPosition: Vector3Like) => void;

/**
 * Callback invoked when the entity reaches the target coordinate.
 *
 * @param endPosition - The position of the entity after it has finished moving.
 *
 * **Category:** Controllers
 * @public
 */
export declare type MoveCompleteCallback = (endPosition: Vector3Like) => void;

/**
 * Options for `SimpleEntityController.move`.
 *
 * Use for: customizing a single `move()` call.
 * Do NOT use for: persistent defaults; use `SimpleEntityControllerOptions`.
 *
 * **Category:** Controllers
 * @public
 */
export declare type MoveOptions = {
    /** Callback called each tick movement of the entity controller's entity. */
    moveCallback?: MoveCallback;
    /** Callback called when the entity controller's entity has finished moving. */
    moveCompleteCallback?: MoveCompleteCallback;
    /** Axes to ignore when moving the entity controller's entity. Also ignored for determining completion. */
    moveIgnoreAxes?: {
        x?: boolean;
        y?: boolean;
        z?: boolean;
    };
    /** Whether to start the idle animations when the entity finishes moving. Defaults to true. */
    moveStartIdleAnimationsOnCompletion?: boolean;
    /** The distance from the target at which the entity will stop moving and consider movement complete. Defaults to 0.316~ blocks away from target. */
    moveStoppingDistance?: number;
    /** Whether to stop moving and consider movement complete when the entity is stuck, such as pushing into a block. Defaults to false. */
    moveCompletesWhenStuck?: boolean;
};

/**
 * The options for an error type "none" collider. @public
 *
 * Use for: explicitly disabling collider creation.
 * Do NOT use for: physical interactions; no collider will be created.
 *
 * **Category:** Physics
 */
export declare interface NoneColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.NONE;
}

/**
 * The options for rendering an outline.
 *
 * **Category:** Types
 * @public
 */
export declare interface Outline {
    /** The color of the outline. Defaults to black. */
    color?: RgbColor;
    /** The intensity multiplier for the outline color. Use values over 1 for brighter/glowing outlines. Defaults to 1.0. */
    colorIntensity?: number;
    /** The thickness of the outline in world units. Defaults to 0.03. */
    thickness?: number;
    /** The opacity of the outline between 0 and 1. Defaults to 1.0. */
    opacity?: number;
    /** Whether the outline should be hidden when the entity is occluded by other objects. If false, the outline is always visible (shows through walls). Defaults to true. */
    occluded?: boolean;
}

/**
 * Represents a particle emitter in the world. Emit 2D
 * particles that always face the camera.
 *
 * @remarks
 * Particle emitters are created directly as instances. They support a
 * variety of configuration options through the `ParticleEmitterOptions`
 * constructor argument.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instance of it emit
 * events with payloads listed under `ParticleEmitterEventPayloads`.
 *
 * @example
 * ```typescript
 * const particleEmitter = new ParticleEmitter({
 *   textureUri: 'textures/particles/smoke.png',
 * });
 *
 * particleEmitter.spawn(world);
 * ```
 *
 * **Category:** Particles
 * @public
 */
export declare class ParticleEmitter extends EventRouter implements protocol.Serializable {







































    constructor(options: ParticleEmitterOptions);
    /** The unique identifier for the ParticlEmitter. */
    get id(): number | undefined;
    /** The alpha test value, discards particle texture pixels with alpha opacity less than this value. */
    get alphaTest(): number | undefined;
    /** The entity to which the ParticleEmitter is attached if explicitly set. */
    get attachedToEntity(): Entity | undefined;
    /** The name of the node of the attached entity (if the attached entity is a model entity) to attach the particle emitter to. */
    get attachedToEntityNodeName(): string | undefined;
    /** The color of an emitted particle at the end of its lifetime. */
    get colorEnd(): RgbColor | undefined;
    /** The color variance of an emitted particle at the end of its lifetime. */
    get colorEndVariance(): RgbColor | undefined;
    /** The color intensity of an emitted particle at the end of its lifetime. */
    get colorIntensityEnd(): number | undefined;
    /** The color intensity variance of an emitted particle at the end of its lifetime. */
    get colorIntensityEndVariance(): number | undefined;
    /** The color intensity of an emitted particle at the start of its lifetime. */
    get colorIntensityStart(): number | undefined;
    /** The color intensity variance of an emitted particle at the start of its lifetime. */
    get colorIntensityStartVariance(): number | undefined;
    /** The color of an emitted particle at the start of its lifetime. */
    get colorStart(): RgbColor | undefined;
    /** The color variance of an emitted particle at the start of its lifetime. */
    get colorStartVariance(): RgbColor | undefined;
    /** The gravity vector for an emitted particle. */
    get gravity(): Vector3Like | undefined;
    /** Whether the ParticleEmitter is spawned in the world. */
    get isSpawned(): boolean;
    /** The lifetime of an emitted particle in seconds. */
    get lifetime(): number | undefined;
    /** The lifetime variance of an emitted particle in seconds. */
    get lifetimeVariance(): number | undefined;
    /** Whether emitted particles follow the emitter's world position. Cannot be changed after construction. */
    get lockToEmitter(): boolean;
    /** The maximum number of live particles. */
    get maxParticles(): number | undefined;
    /** The offset of the particle emitter from the attached entity or position. */
    get offset(): Vector3Like | undefined;
    /** The orientation mode of emitted particles. */
    get orientation(): ParticleEmitterOrientation | undefined;
    /** The fixed rotation of emitted particles in degrees when orientation is 'fixed'. */
    get orientationFixedRotation(): Vector3Like | undefined;
    /** The opacity of an emitted particle at the end of its lifetime. */
    get opacityEnd(): number | undefined;
    /** The opacity variance of an emitted particle at the end of its lifetime. */
    get opacityEndVariance(): number | undefined;
    /** The opacity of an emitted particle at the start of its lifetime. */
    get opacityStart(): number | undefined;
    /** The opacity variance of an emitted particle at the start of its lifetime. */
    get opacityStartVariance(): number | undefined;
    /** Whether an emitted particle is being paused. */
    get paused(): boolean | undefined;
    /** The position of the particle emitter in the world if explicitly set. */
    get position(): Vector3Like | undefined;
    /** The position variance of an emitted particle. */
    get positionVariance(): Vector3Like | undefined;
    /** The rate per second at which particles are emitted. */
    get rate(): number | undefined;
    /** The rate per second variance of the particle emission rate. */
    get rateVariance(): number | undefined;
    /** The size at the end of an emitted particle's lifetime. */
    get sizeEnd(): number | undefined;
    /** The size variance at the end of an emitted particle's lifetime. */
    get sizeEndVariance(): number | undefined;
    /** The size at the start of an emitted particle's lifetime. */
    get sizeStart(): number | undefined;
    /** The size variance at the start of an emitted particle's lifetime. */
    get sizeStartVariance(): number | undefined;
    /** The size variance of an emitted particle. */
    get sizeVariance(): number | undefined;
    /** The URI or path to the texture to be used for the particles. */
    get textureUri(): string;
    /** Whether an emitted particle is transparent, resulting in smoother transparency blending. */
    get transparent(): boolean | undefined;
    /** The velocity of an emitted particle. */
    get velocity(): Vector3Like | undefined;
    /** The velocity variance of an emitted particle. */
    get velocityVariance(): Vector3Like | undefined;
    /** The world the ParticleEmitter is in. */
    get world(): World | undefined;
    /**
     * Sets the alpha test value, discards particle texture pixels with alpha opacity less than this value.
     *
     * @param alphaTest - The alpha test value, discards particle texture pixels with alpha opacity less than this value.
     */
    setAlphaTest(alphaTest: number): void;
    /**
     * Sets the entity to which the ParticleEmitter is attached.
     *
     * @remarks
     * Clears any set position (mutual exclusivity).
     *
     * @param entity - The entity to attach the ParticleEmitter to.
     */
    setAttachedToEntity(entity: Entity): void;
    /**
     * Sets the name of the node of the attached entity (if the attached entity is a model entity) to attach the particle emitter to.
     *
     * @param attachedToEntityNodeName - The name of the node of the attached entity (if the attached entity is a model entity) to attach the particle emitter to.
     */
    setAttachedToEntityNodeName(attachedToEntityNodeName: string): void;
    /**
     * Sets the color of an emitted particle at the end of its lifetime.
     *
     * @param colorEnd - The color of an emitted particle at the end of its lifetime.
     */
    setColorEnd(colorEnd: RgbColor): void;
    /**
     * Sets the color variance of an emitted particle at the end of its lifetime.
     *
     * @param colorEndVariance - The color variance of an emitted particle at the end of its lifetime.
     */
    setColorEndVariance(colorEndVariance: RgbColor): void;
    /**
     * Sets the color intensity of an emitted particle at the end of its lifetime.
     *
     * @param colorIntensityEnd - The color intensity at the end of lifetime. Values greater than 1 create HDR/bloom effects.
     */
    setColorIntensityEnd(colorIntensityEnd: number): void;
    /**
     * Sets the color intensity variance of an emitted particle at the end of its lifetime.
     *
     * @param colorIntensityEndVariance - The color intensity variance at the end of lifetime.
     */
    setColorIntensityEndVariance(colorIntensityEndVariance: number): void;
    /**
     * Sets the color intensity of an emitted particle at the start of its lifetime.
     *
     * @param colorIntensityStart - The color intensity at the start of lifetime. Values greater than 1 create HDR/bloom effects.
     */
    setColorIntensityStart(colorIntensityStart: number): void;
    /**
     * Sets the color intensity variance of an emitted particle at the start of its lifetime.
     *
     * @param colorIntensityStartVariance - The color intensity variance at the start of lifetime.
     */
    setColorIntensityStartVariance(colorIntensityStartVariance: number): void;
    /**
     * Sets the color of an emitted particle at the start of its lifetime.
     *
     * @param colorStart - The color of an emitted particle at the start of its lifetime.
     */
    setColorStart(colorStart: RgbColor): void;
    /**
     * Sets the color variance of an emitted particle at the start of its lifetime.
     *
     * @param colorStartVariance - The color variance of an emitted particle at the start of its lifetime.
     */
    setColorStartVariance(colorStartVariance: RgbColor): void;
    /**
     * Sets the gravity vector for an emitted particle.
     *
     * @param gravity - The gravity vector for an emitted particle.
     */
    setGravity(gravity: Vector3Like): void;
    /**
     * Sets the lifetime of an emitted particle in seconds.
     *
     * @param lifetime - The lifetime of an emitted particle in seconds.
     */
    setLifetime(lifetime: number): void;
    /**
     * Sets the lifetime variance of an emitted particle in seconds.
     *
     * @param lifetimeVariance - The lifetime variance of an emitted particle in seconds.
     */
    setLifetimeVariance(lifetimeVariance: number): void;
    /**
     * Sets the maximum number of live particles.
     *
     * @param maxParticles - The maximum number of live particles.
     */
    setMaxParticles(maxParticles: number): void;
    /**
     * Sets the offset of the particle emitter from the attached entity or position.
     *
     * @param offset - The offset of the particle emitter from the attached entity or position.
     */
    setOffset(offset: Vector3Like): void;
    /**
     * Sets the orientation mode of emitted particles.
     *
     * @param orientation - The orientation mode. 'billboard' faces the camera, 'billboardY' faces the camera but keeps Y-axis upward, 'fixed' uses a fixed rotation.
     */
    setOrientation(orientation: ParticleEmitterOrientation): void;
    /**
     * Sets the fixed rotation of emitted particles when orientation is 'fixed'.
     *
     * @param orientationFixedRotation - The fixed rotation in degrees (x, y, z).
     */
    setOrientationFixedRotation(orientationFixedRotation: Vector3Like): void;
    /**
     * Sets the opacity of an emitted particle at the end of its lifetime.
     *
     * @param opacityEnd - The opacity of an emitted particle at the end of its lifetime.
     */
    setOpacityEnd(opacityEnd: number): void;
    /**
     * Sets the opacity variance of an emitted particle at the end of its lifetime.
     *
     * @param opacityEndVariance - The opacity variance of an emitted particle at the end of its lifetime.
     */
    setOpacityEndVariance(opacityEndVariance: number): void;
    /**
     * Sets the opacity of an emitted particle at the start of its lifetime.
     *
     * @param opacityStart - The opacity of an emitted particle at the start of its lifetime.
     */
    setOpacityStart(opacityStart: number): void;
    /**
     * Sets the opacity variance of an emitted particle at the start of its lifetime.
     *
     * @param opacityStartVariance - The opacity variance of an emitted particle at the start of its lifetime.
     */
    setOpacityStartVariance(opacityStartVariance: number): void;
    /**
     * Sets the position of the particle emitter.
     *
     * @param position - The position of the particle emitter.
     */
    setPosition(position: Vector3Like): void;
    /**
     * Sets the position variance of an emitted particle.
     *
     * @param positionVariance - The position variance of an emitted particle.
     */
    setPositionVariance(positionVariance: Vector3Like): void;
    /**
     * Sets the rate per second at which particles are emitted.
     *
     * @param rate - The rate per second at which particles are emitted.
     */
    setRate(rate: number): void;
    /**
     * Sets the rate variance of the particle emission rate.
     *
     * @param rateVariance - The rate variance of the particle emission rate.
     */
    setRateVariance(rateVariance: number): void;
    /**
     * Sets the size at the end of an emitted particle's lifetime.
     *
     * @param sizeEnd - The size at the end of an emitted particle's lifetime.
     */
    setSizeEnd(sizeEnd: number): void;
    /**
     * Sets the size variance at the end of an emitted particle's lifetime.
     *
     * @param sizeEndVariance - The size variance at the end of an emitted particle's lifetime.
     */
    setSizeEndVariance(sizeEndVariance: number): void;
    /**
     * Sets the size at the start of an emitted particle's lifetime.
     *
     * @param sizeStart - The size at the start of an emitted particle's lifetime.
     */
    setSizeStart(sizeStart: number): void;
    /**
     * Sets the size variance at the start of an emitted particle's lifetime.
     *
     * @param sizeStartVariance - The size variance at the start of an emitted particle's lifetime.
     */
    setSizeStartVariance(sizeStartVariance: number): void;
    /**
     * Sets the texture URI of the particles emitted.
     *
     * @param textureUri - The texture URI of the particles emitted.
     */
    setTextureUri(textureUri: string): void;
    /**
     * Sets the transparency of the particle emitter.
     *
     * @param transparent - The transparency of the particle emitter.
     */
    setTransparent(transparent: boolean): void;
    /**
     * Sets the velocity of an emitted particle.
     *
     * @param velocity - The velocity of an emitted particle.
     */
    setVelocity(velocity: Vector3Like): void;
    /**
     * Sets the velocity variance of an emitted particle.
     *
     * @param velocityVariance - The velocity variance of an emitted particle.
     */
    setVelocityVariance(velocityVariance: Vector3Like): void;
    /**
     * Creates a burst of particles, regardless of pause state.
     *
     * @param count - The number of particles to burst.
     */
    burst(count: number): void;
    /**
     * Despawns the ParticleEmitter from the world.
     */
    despawn(): void;
    /**
     * Restarts the particle emission if it was previously stopped.
     */
    restart(): void;
    /**
     * Stops the particle emission.
     */
    stop(): void;
    /**
     * Spawns the ParticleEmitter in the world.
     *
     * @remarks
     * **Requires spawned entity:** If attached to an entity, the entity must be spawned first.
     *
     * @param world - The world to spawn the ParticleEmitter in.
     */
    spawn(world: World): void;

}

/**
 * Event types a ParticleEmitter instance can emit.
 *
 * See `ParticleEmitterEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum ParticleEmitterEvent {
    BURST = "PARTICLE_EMITTER.BURST",
    DESPAWN = "PARTICLE_EMITTER.DESPAWN",
    SET_ALPHA_TEST = "PARTICLE_EMITTER.SET_ALPHA_TEST",
    SET_ATTACHED_TO_ENTITY = "PARTICLE_EMITTER.SET_ATTACHED_TO_ENTITY",
    SET_ATTACHED_TO_ENTITY_NODE_NAME = "PARTICLE_EMITTER.SET_ATTACHED_TO_ENTITY_NODE_NAME",
    SET_COLOR_END = "PARTICLE_EMITTER.SET_COLOR_END",
    SET_COLOR_END_VARIANCE = "PARTICLE_EMITTER.SET_COLOR_END_VARIANCE",
    SET_COLOR_INTENSITY_END = "PARTICLE_EMITTER.SET_COLOR_INTENSITY_END",
    SET_COLOR_INTENSITY_END_VARIANCE = "PARTICLE_EMITTER.SET_COLOR_INTENSITY_END_VARIANCE",
    SET_COLOR_INTENSITY_START = "PARTICLE_EMITTER.SET_COLOR_INTENSITY_START",
    SET_COLOR_INTENSITY_START_VARIANCE = "PARTICLE_EMITTER.SET_COLOR_INTENSITY_START_VARIANCE",
    SET_COLOR_START = "PARTICLE_EMITTER.SET_COLOR_START",
    SET_COLOR_START_VARIANCE = "PARTICLE_EMITTER.SET_COLOR_START_VARIANCE",
    SET_GRAVITY = "PARTICLE_EMITTER.SET_GRAVITY",
    SET_LIFETIME = "PARTICLE_EMITTER.SET_LIFETIME",
    SET_LIFETIME_VARIANCE = "PARTICLE_EMITTER.SET_LIFETIME_VARIANCE",
    SET_MAX_PARTICLES = "PARTICLE_EMITTER.SET_MAX_PARTICLES",
    SET_OFFSET = "PARTICLE_EMITTER.SET_OFFSET",
    SET_ORIENTATION = "PARTICLE_EMITTER.SET_ORIENTATION",
    SET_ORIENTATION_FIXED_ROTATION = "PARTICLE_EMITTER.SET_ORIENTATION_FIXED_ROTATION",
    SET_OPACITY_END = "PARTICLE_EMITTER.SET_OPACITY_END",
    SET_OPACITY_END_VARIANCE = "PARTICLE_EMITTER.SET_OPACITY_END_VARIANCE",
    SET_OPACITY_START = "PARTICLE_EMITTER.SET_OPACITY_START",
    SET_OPACITY_START_VARIANCE = "PARTICLE_EMITTER.SET_OPACITY_START_VARIANCE",
    SET_PAUSED = "PARTICLE_EMITTER.SET_PAUSED",
    SET_POSITION = "PARTICLE_EMITTER.SET_POSITION",
    SET_POSITION_VARIANCE = "PARTICLE_EMITTER.SET_POSITION_VARIANCE",
    SET_RATE = "PARTICLE_EMITTER.SET_RATE",
    SET_RATE_VARIANCE = "PARTICLE_EMITTER.SET_RATE_VARIANCE",
    SET_SIZE_END = "PARTICLE_EMITTER.SET_SIZE_END",
    SET_SIZE_END_VARIANCE = "PARTICLE_EMITTER.SET_SIZE_END_VARIANCE",
    SET_SIZE_START = "PARTICLE_EMITTER.SET_SIZE_START",
    SET_SIZE_START_VARIANCE = "PARTICLE_EMITTER.SET_SIZE_START_VARIANCE",
    SET_TEXTURE_URI = "PARTICLE_EMITTER.SET_TEXTURE_URI",
    SET_TRANSPARENT = "PARTICLE_EMITTER.SET_TRANSPARENT",
    SET_VELOCITY = "PARTICLE_EMITTER.SET_VELOCITY",
    SET_VELOCITY_VARIANCE = "PARTICLE_EMITTER.SET_VELOCITY_VARIANCE",
    SPAWN = "PARTICLE_EMITTER.SPAWN"
}

/**
 * Event payloads for ParticleEmitter emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface ParticleEmitterEventPayloads {
    /** Emitted when a ParticleEmitter bursts the specified number of particles. */
    [ParticleEmitterEvent.BURST]: {
        particleEmitter: ParticleEmitter;
        count: number;
    };
    /** Emitted when a ParticleEmitter is despawned. */
    [ParticleEmitterEvent.DESPAWN]: {
        particleEmitter: ParticleEmitter;
    };
    /** Emitted when the alpha test value is set. */
    [ParticleEmitterEvent.SET_ALPHA_TEST]: {
        particleEmitter: ParticleEmitter;
        alphaTest: number;
    };
    /** Emitted when the ParticleEmitter is attached to an entity. */
    [ParticleEmitterEvent.SET_ATTACHED_TO_ENTITY]: {
        particleEmitter: ParticleEmitter;
        entity: Entity;
    };
    /** Emitted when the name of the node of the attached entity the particle emitter is attached to is set. */
    [ParticleEmitterEvent.SET_ATTACHED_TO_ENTITY_NODE_NAME]: {
        particleEmitter: ParticleEmitter;
        attachedToEntityNodeName: string;
    };
    /** Emitted when the color of an emitted particle at the end of its lifetime is set. */
    [ParticleEmitterEvent.SET_COLOR_END]: {
        particleEmitter: ParticleEmitter;
        colorEnd: RgbColor;
    };
    /** Emitted when the color variance of an emitted particle at the end of its lifetime is set. */
    [ParticleEmitterEvent.SET_COLOR_END_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        colorEndVariance: RgbColor;
    };
    /** Emitted when the color intensity of an emitted particle at the end of its lifetime is set. */
    [ParticleEmitterEvent.SET_COLOR_INTENSITY_END]: {
        particleEmitter: ParticleEmitter;
        colorIntensityEnd: number;
    };
    /** Emitted when the color intensity variance of an emitted particle at the end of its lifetime is set. */
    [ParticleEmitterEvent.SET_COLOR_INTENSITY_END_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        colorIntensityEndVariance: number;
    };
    /** Emitted when the color intensity of an emitted particle at the start of its lifetime is set. */
    [ParticleEmitterEvent.SET_COLOR_INTENSITY_START]: {
        particleEmitter: ParticleEmitter;
        colorIntensityStart: number;
    };
    /** Emitted when the color intensity variance of an emitted particle at the start of its lifetime is set. */
    [ParticleEmitterEvent.SET_COLOR_INTENSITY_START_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        colorIntensityStartVariance: number;
    };
    /** Emitted when the color of an emitted particle at the start of its lifetime is set. */
    [ParticleEmitterEvent.SET_COLOR_START]: {
        particleEmitter: ParticleEmitter;
        colorStart: RgbColor;
    };
    /** Emitted when the color variance of an emitted particle at the start of its lifetime is set. */
    [ParticleEmitterEvent.SET_COLOR_START_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        colorStartVariance: RgbColor;
    };
    /** Emitted when the gravity vector for an emitted particle is set. */
    [ParticleEmitterEvent.SET_GRAVITY]: {
        particleEmitter: ParticleEmitter;
        gravity: Vector3Like;
    };
    /** Emitted when the lifetime of an emitted particle is set. */
    [ParticleEmitterEvent.SET_LIFETIME]: {
        particleEmitter: ParticleEmitter;
        lifetime: number;
    };
    /** Emitted when the lifetime variance of an emitted particle is set. */
    [ParticleEmitterEvent.SET_LIFETIME_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        lifetimeVariance: number;
    };
    /** Emitted when the maximum number of live particles is set. */
    [ParticleEmitterEvent.SET_MAX_PARTICLES]: {
        particleEmitter: ParticleEmitter;
        maxParticles: number;
    };
    /** Emitted when the offset of the particle emitter is set. */
    [ParticleEmitterEvent.SET_OFFSET]: {
        particleEmitter: ParticleEmitter;
        offset: Vector3Like;
    };
    /** Emitted when the orientation mode of emitted particles is set. */
    [ParticleEmitterEvent.SET_ORIENTATION]: {
        particleEmitter: ParticleEmitter;
        orientation: ParticleEmitterOrientation;
    };
    /** Emitted when the fixed rotation of emitted particles is set. */
    [ParticleEmitterEvent.SET_ORIENTATION_FIXED_ROTATION]: {
        particleEmitter: ParticleEmitter;
        orientationFixedRotation: Vector3Like;
    };
    /** Emitted when the opacity of an emitted particle at the end of its lifetime is set. */
    [ParticleEmitterEvent.SET_OPACITY_END]: {
        particleEmitter: ParticleEmitter;
        opacityEnd: number;
    };
    /** Emitted when the opacity variance of an emitted particle at the end of its lifetime is set. */
    [ParticleEmitterEvent.SET_OPACITY_END_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        opacityEndVariance: number;
    };
    /** Emitted when the opacity of an emitted particle at the start of its lifetime is set. */
    [ParticleEmitterEvent.SET_OPACITY_START]: {
        particleEmitter: ParticleEmitter;
        opacityStart: number;
    };
    /** Emitted when the opacity variance of an emitted particle at the start of its lifetime is set. */
    [ParticleEmitterEvent.SET_OPACITY_START_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        opacityStartVariance: number;
    };
    /** Emitted when the paused state of an emitted particle is set. */
    [ParticleEmitterEvent.SET_PAUSED]: {
        particleEmitter: ParticleEmitter;
        paused: boolean;
    };
    /** Emitted when the position of the particle emitter is set. */
    [ParticleEmitterEvent.SET_POSITION]: {
        particleEmitter: ParticleEmitter;
        position: Vector3Like;
    };
    /** Emitted when the position variance of an emitted particle is set. */
    [ParticleEmitterEvent.SET_POSITION_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        positionVariance: Vector3Like;
    };
    /** Emitted when the rate per second at which particles are emitted is set. */
    [ParticleEmitterEvent.SET_RATE]: {
        particleEmitter: ParticleEmitter;
        rate: number;
    };
    /** Emitted when the rate per second variance of the particle emission rate is set. */
    [ParticleEmitterEvent.SET_RATE_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        rateVariance: number;
    };
    /** Emitted when the size at the end of an emitted particle's lifetime is set. */
    [ParticleEmitterEvent.SET_SIZE_END]: {
        particleEmitter: ParticleEmitter;
        sizeEnd: number;
    };
    /** Emitted when the size variance at the end of an emitted particle's lifetime is set. */
    [ParticleEmitterEvent.SET_SIZE_END_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        sizeEndVariance: number;
    };
    /** Emitted when the size at the start of an emitted particle's lifetime is set. */
    [ParticleEmitterEvent.SET_SIZE_START]: {
        particleEmitter: ParticleEmitter;
        sizeStart: number;
    };
    /** Emitted when the size variance at the start of an emitted particle's lifetime is set. */
    [ParticleEmitterEvent.SET_SIZE_START_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        sizeStartVariance: number;
    };
    /** Emitted when the texture URI is set. */
    [ParticleEmitterEvent.SET_TEXTURE_URI]: {
        particleEmitter: ParticleEmitter;
        textureUri: string;
    };
    /** Emitted when the transparency of an emitted particle is set. */
    [ParticleEmitterEvent.SET_TRANSPARENT]: {
        particleEmitter: ParticleEmitter;
        transparent: boolean;
    };
    /** Emitted when the velocity of an emitted particle is set. */
    [ParticleEmitterEvent.SET_VELOCITY]: {
        particleEmitter: ParticleEmitter;
        velocity: Vector3Like;
    };
    /** Emitted when the velocity variance of an emitted particle is set. */
    [ParticleEmitterEvent.SET_VELOCITY_VARIANCE]: {
        particleEmitter: ParticleEmitter;
        velocityVariance: Vector3Like;
    };
    /** Emitted when a ParticleEmitter is spawned. */
    [ParticleEmitterEvent.SPAWN]: {
        particleEmitter: ParticleEmitter;
    };
}

/**
 * Manages ParticleEmitter instances in a world.
 *
 * When to use: querying or bulk-cleaning particle emitters for a world.
 * Do NOT use for: configuring emitters; use `ParticleEmitter` instances directly.
 *
 * @remarks
 * The ParticleEmitterManager is created internally per `World` instance.
 * Pattern: spawn emitters during gameplay and use this manager for cleanup on entity despawn.
 *
 * **Category:** Particles
 * @public
 */
export declare class ParticleEmitterManager {




    /**
     * The world the ParticleEmitterManager is for.
     *
     * **Category:** Particles
     */
    get world(): World;

    /**
     * Retrieves all spawned ParticleEmitter instances for the world.
     *
     * @returns An array of ParticleEmitter instances.
     *
     * **Category:** Particles
     */
    getAllParticleEmitters(): ParticleEmitter[];
    /**
     * Retrieves all spawned ParticleEmitter instances attached to a specific entity.
     *
     * Use for: cleanup or inspection of entity-bound emitters.
     *
     * @param entity - The entity to get attached ParticleEmitter instances for.
     * @returns An array of ParticleEmitter instances.
     *
     * **Requires:** Entity should belong to this world for meaningful results.
     *
     * @see `despawnEntityAttachedParticleEmitters()`
     *
     * **Category:** Particles
     */
    getAllEntityAttachedParticleEmitters(entity: Entity): ParticleEmitter[];


}

/**
 * Options for creating a ParticleEmitter instance.
 *
 * Use for: configuring an emitter before calling `ParticleEmitter.spawn`.
 * Do NOT use for: runtime updates after spawn; use `ParticleEmitter.set*` methods.
 *
 * **Category:** Particles
 * @public
 */
export declare interface ParticleEmitterOptions {
    /** The URI or path to the texture to be used for the particles. */
    textureUri: string;
    /** The alpha test value, discards particle texture pixels with alpha opacity less than this value. Defaults to 0.5. */
    alphaTest?: number;
    /** If set, the ParticleEmitter will be attached to this entity. */
    attachedToEntity?: Entity;
    /** The name of the node of the attached entity (if the attached entity is a model entity) to attach the particle emitter to. */
    attachedToEntityNodeName?: string;
    /** The color of an emitted particle at the end of its lifetime. */
    colorEnd?: RgbColor;
    /** The color variance of an emitted particle at the end of its lifetime. */
    colorEndVariance?: RgbColor;
    /** The color intensity of an emitted particle at the end of its lifetime. Values greater than 1 create HDR/bloom effects. */
    colorIntensityEnd?: number;
    /** The color intensity variance of an emitted particle at the end of its lifetime. */
    colorIntensityEndVariance?: number;
    /** The color intensity of an emitted particle at the start of its lifetime. Values greater than 1 create HDR/bloom effects. */
    colorIntensityStart?: number;
    /** The color intensity variance of an emitted particle at the start of its lifetime. */
    colorIntensityStartVariance?: number;
    /** The color of an emitted particle at the start of its lifetime. */
    colorStart?: RgbColor;
    /** The color variance of an emitted particle at the start of its lifetime. */
    colorStartVariance?: RgbColor;
    /** The gravity vector for an emitted particle. */
    gravity?: Vector3Like;
    /** The lifetime of an emitted particle in seconds. */
    lifetime?: number;
    /** The lifetime variance of an emitted particle in seconds. */
    lifetimeVariance?: number;
    /** When enabled, emitted particles follow the emitter's world position. Cannot be changed after construction.*/
    lockToEmitter?: boolean;
    /** The maximum number of live particles. */
    maxParticles?: number;
    /** The offset of the particle emitter from the attached entity or position. */
    offset?: Vector3Like;
    /** The orientation mode of emitted particles. 'billboard' faces the camera, 'billboardY' faces the camera but keeps Y-axis upward, 'fixed' uses a fixed rotation. Defaults to 'billboard'. */
    orientation?: ParticleEmitterOrientation;
    /** The fixed rotation of emitted particles in degrees (x, y, z) when orientation is 'fixed'. Defaults to (0, 0, 0). */
    orientationFixedRotation?: Vector3Like;
    /** The opacity of an emitted particle at the end of its lifetime. */
    opacityEnd?: number;
    /** The opacity variance of an emitted particle at the end of its lifetime. */
    opacityEndVariance?: number;
    /** The opacity of an emitted particle at the start of its lifetime. */
    opacityStart?: number;
    /** The opacity variance of an emitted particle at the start of its lifetime. */
    opacityStartVariance?: number;
    /** The position of the particle emitter in the world if explicitly set. */
    position?: Vector3Like;
    /** The position variance of an emitted particle. */
    positionVariance?: Vector3Like;
    /** The rate per second at which particles are emitted. */
    rate?: number;
    /** The rate per second variance of the particle emission rate. */
    rateVariance?: number;
    /** The size at the end of an emitted particle's lifetime. */
    sizeEnd?: number;
    /** The size variance at the end of an emitted particle's lifetime. */
    sizeEndVariance?: number;
    /** The size at the start of an emitted particle's lifetime. */
    sizeStart?: number;
    /** The size variance at the start of an emitted particle's lifetime. */
    sizeStartVariance?: number;
    /** Whether an emitted particle is transparent, resulting in smoother transparency blending. */
    transparent?: boolean;
    /** The velocity of an emitted particle. */
    velocity?: Vector3Like;
    /** The velocity variance of an emitted particle. */
    velocityVariance?: Vector3Like;
}

/**
 * The orientation mode for particles.
 *
 * **Category:** Particles
 * @public
 */
export declare type ParticleEmitterOrientation = 'billboard' | 'billboardY' | 'fixed' | 'velocity';

/**
 * Callback invoked when pathfinding aborts.
 *
 * **Category:** Controllers
 * @public
 */
export declare type PathfindAbortCallback = () => void;

/**
 * Callback invoked when pathfinding completes and the entity reaches the target.
 *
 * **Category:** Controllers
 * @public
 */
export declare type PathfindCompleteCallback = () => void;

/**
 * A pathfinding entity controller built on top of `SimpleEntityController`.
 *
 * When to use: obstacle-aware movement to a target coordinate.
 * Do NOT use for: per-tick recalculation; pathfinding is synchronous and can be expensive.
 *
 * @remarks
 * Implements A* pathfinding. Call `PathfindingEntityController.pathfind` sparingly; it is intended to be
 * called once per destination in most cases.
 *
 * <h2>Coordinate System & Model Orientation</h2>
 *
 * HYTOPIA uses **-Z as forward**. Models must be authored with their front facing -Z.
 * The controller automatically calls `face()` to orient the entity's -Z axis toward each waypoint.
 *
 * **Category:** Controllers
 * @public
 */
export declare class PathfindingEntityController extends SimpleEntityController {
















    /**
     * @param options - Options for the controller.
     *
     * **Category:** Controllers
     */
    constructor(options?: PathfindingEntityControllerOptions);
    /**
     * Whether to enable debug mode.
     *
     * @remarks
     * When enabled, pathfinding logs debug information to the console.
     *
     * **Category:** Controllers
     */
    get debug(): boolean;
    /**
     * The maximum fall distance the entity can fall.
     *
     * **Category:** Controllers
     */
    get maxFall(): number;
    /**
     * The maximum jump distance the entity can jump.
     *
     * **Category:** Controllers
     */
    get maxJump(): number;
    /**
     * The maximum open set iterations before aborting pathfinding.
     *
     * **Category:** Controllers
     */
    get maxOpenSetIterations(): number;
    /**
     * The speed used for path movement.
     *
     * **Category:** Controllers
     */
    get speed(): number;
    /**
     * The target coordinate being pathfound to.
     *
     * **Category:** Controllers
     */
    get target(): Vector3Like | undefined;
    /**
     * The vertical penalty used during pathfinding.
     *
     * **Category:** Controllers
     */
    get verticalPenalty(): number;
    /**
     * The current waypoints being followed.
     *
     * **Category:** Controllers
     */
    get waypoints(): Vector3Like[];
    /**
     * The index of the next waypoint being approached.
     *
     * **Category:** Controllers
     */
    get waypointNextIndex(): number;
    /**
     * The timeout in milliseconds for a waypoint to be considered reached.
     *
     * **Category:** Controllers
     */
    get waypointTimeoutMs(): number;
    /**
     * Calculates a path and moves to the target if a path is found.
     *
     * Use for: one-shot navigation to a destination.
     * Do NOT use for: high-frequency replanning; it is synchronous.
     *
     * @remarks
     * **Synchronous return:** Path calculation happens synchronously. Returns `true` if a path was found,
     * `false` if no path exists or calculation was aborted.
     *
     * **Auto-starts movement:** If a path is found, movement begins immediately using the inherited
     * `move()`, `face()`, and `jump()` methods from `SimpleEntityController`.
     *
     * **Auto-facing (-Z forward):** Automatically calls `face()` for each waypoint, orienting the entity's
     * -Z axis toward the next waypoint. Models must be authored with their front facing -Z.
     *
     * **A* algorithm:** Uses A* pathfinding with configurable `maxJump`, `maxFall`, and `verticalPenalty`.
     * Path calculation is capped by `maxOpenSetIterations` (default 200) to prevent blocking.
     *
     * **Waypoint progression:** Entity moves through calculated waypoints sequentially. Each waypoint
     * has a timeout (`waypointTimeoutMs`) after which it's skipped if not reached.
     *
     * @param target - The target coordinate to pathfind to.
     * @param speed - The speed of the entity (blocks per second).
     * @param options - The pathfinding options.
     * @returns True if a path was found, false otherwise.
     *
     * **Requires:** The controller must be attached to a spawned entity in a world.
     *
     * **Side effects:** Starts movement and facing if a path is found.
     *
     * **Category:** Controllers
     */
    pathfind(target: Vector3Like, speed: number, options?: PathfindingOptions): boolean;









}

/**
 * Options for creating a PathfindingEntityController instance.
 *
 * Use for: constructing a pathfinding controller with base movement settings.
 * Do NOT use for: per-path overrides; use `PathfindingOptions`.
 *
 * **Category:** Controllers
 * @public
 */
declare interface PathfindingEntityControllerOptions extends SimpleEntityControllerOptions {
}

/**
 * Options for `PathfindingEntityController.pathfind`.
 *
 * Use for: configuring a single pathfinding request.
 * Do NOT use for: per-tick recalculation; call `pathfind` sparingly.
 *
 * **Category:** Controllers
 * @public
 */
export declare type PathfindingOptions = {
    /** Whether to enable debug mode or not. When debug mode is enabled, the pathfinding algorithm will log debug information to the console. Defaults to false. */
    debug?: boolean;
    /** The maximum fall distance the entity can fall when considering a path. */
    maxFall?: number;
    /** The maximum height the entity will jump when considering a path. */
    maxJump?: number;
    /** The maximum number of open set iterations that can be processed before aborting pathfinding. Defaults to 200. */
    maxOpenSetIterations?: number;
    /** Callback called when the pathfinding algorithm aborts. */
    pathfindAbortCallback?: PathfindAbortCallback;
    /** Callback called when the entity associated with the PathfindingEntityController finishes pathfinding and is now at the target coordinate. */
    pathfindCompleteCallback?: PathfindCompleteCallback;
    /** The vertical penalty for the pathfinding algorithm. A higher value will prefer paths with less vertical movement. */
    verticalPenalty?: number;
    /** Callback called when the entity associated with the PathfindingEntityController finishes moving to a calculate waypoint of its current path. */
    waypointMoveCompleteCallback?: WaypointMoveCompleteCallback;
    /** Callback called when the entity associated with the PathfindingEntityController skips a waypoint because it took too long to reach. */
    waypointMoveSkippedCallback?: WaypointMoveSkippedCallback;
    /** The distance in blocks from the waypoint that the entity will stop moving and consider the waypoint reached. */
    waypointStoppingDistance?: number;
    /** The timeout in milliseconds for a waypoint to be considered reached. Defaults to 2000ms divided by the speed of the entity. */
    waypointTimeoutMs?: number;
};

/**
 * Manages persistence of player and global data.
 *
 * When to use: reading or writing persisted data shared across lobbies or per player.
 * Do NOT use for: per-tick state; cache data in memory and write back periodically.
 *
 * @remarks
 * This class is a singleton accessible with `PersistenceManager.instance`.
 * Convenience methods are also available on `Player` and `GameServer`.
 *
 * Pattern: load data on join, update in memory, and save on significant events.
 * Anti-pattern: calling persistence APIs every frame.
 *
 * **Category:** Persistence
 * @public
 */
export declare class PersistenceManager {
    /**
     * Singleton instance.
     *
     * **Category:** Persistence
     */
    static readonly instance: PersistenceManager;
    private _saveStatesClient;

    /**
     * Get global data from the data persistence service.
     *
     * @remarks
     * **Empty data:** Returns `{}` if key exists but has no data.
     *
     * **Failure:** Returns `undefined` if fetch failed after retries.
     *
     * @param key - The key to get the data from.
     * @param maxRetries - The maximum number of retries to attempt in the event of failure.
     * @returns The data from the persistence layer.
     *
     * **Side effects:** May perform network I/O and retries.
     *
     * @see `PersistenceManager.setGlobalData`
     *
     * **Category:** Persistence
     */
    getGlobalData(key: string, maxRetries?: number): Promise<Record<string, unknown> | undefined>;

    /**
     * Set global data in the data persistence service. This
     * data is available and shared by all lobbies of your game.
     * @param key - The key to set the data to.
     * @param data - The data to set.
     *
     * **Side effects:** Performs network I/O to persist data.
     *
     * @see `PersistenceManager.getGlobalData`
     *
     * **Category:** Persistence
     */
    setGlobalData(key: string, data: Record<string, unknown>): Promise<void>;



}

/**
 * A connected player in the game.
 *
 * When to use: interacting with a connected player's state, UI, and world membership.
 * Do NOT use for: constructing players or representing offline users.
 *
 * @remarks
 * Players are created automatically on connection by `PlayerManager`.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `PlayerEventPayloads`.
 *
 * **Category:** Players
 * @public
 */
export declare class Player extends EventRouter implements protocol.Serializable {

    /**
     * The unique HYTOPIA UUID for the player.
     *
     * **Category:** Players
     */
    readonly id: string;
    /**
     * The unique HYTOPIA username for the player.
     *
     * **Category:** Players
     */
    readonly username: string;
    /**
     * The profile picture URL for the player.
     *
     * **Category:** Players
     */
    readonly profilePictureUrl: string | undefined;
    /**
     * The camera for the player.
     *
     * **Category:** Players
     */
    readonly camera: PlayerCamera;

    /**
     * The cosmetics for the player.
     *
     * @remarks
     * This resolves asynchronously and may resolve to `void` if unavailable.
     *
     * **Category:** Players
     */
    readonly cosmetics: Promise<PlayerCosmetics | void>;
    /**
     * The UI for the player.
     *
     * **Category:** Players
     */
    readonly ui: PlayerUI;








    /**
     * The current `PlayerInput` of the player.
     *
     * **Category:** Players
     */
    get input(): PlayerInput;
    /**
     * Whether player click/tap input triggers interactions.
     *
     * @remarks
     * Defaults to `true`.
     *
     * **Category:** Players
     */
    get isInteractEnabled(): boolean;
    /**
     * The maximum distance a player can interact with entities or blocks.
     *
     * @remarks
     * Measured in world blocks. Defaults to `20`.
     *
     * **Category:** Players
     */
    get maxInteractDistance(): number;
    /**
     * The current `World` the player is in, or undefined if not yet joined.
     *
     * **Category:** Players
     */
    get world(): World | undefined;
    /**
     * Disconnects the player from the game server.
     *
     * Use for: kicking a player or enforcing a logout.
     * Do NOT use for: switching worlds; use `Player.joinWorld` instead.
     *
     * **Side effects:** Emits `PlayerEvent.LEFT_WORLD` if the player is in a world and closes the connection.
     *
     * **Category:** Players
     */
    disconnect(): void;
    /**
     * Gets the persisted data for the player, if available.
     *
     * Use for: reading saved progress after the player connects.
     *
     * @remarks
     * Returns `undefined` if data hasn't loaded or no data exists.
     * Returns an empty object when data loads successfully but is empty.
     *
     * @returns The persisted data for the player, or undefined.
     *
     * **Requires:** Player persistence must have been loaded (handled during connect).
     *
     * **Category:** Players
     */
    getPersistedData(): Record<string, unknown> | undefined;
    /**
     * Assigns the player to a world.
     *
     * Use for: initial placement or moving a player between worlds.
     * Do NOT use for: respawning or teleporting within the same world.
     *
     * @remarks
     * If switching worlds, the player is internally disconnected/reconnected and
     * `JOINED_WORLD` is emitted after reconnection completes.
     *
     * @param world - The world to join the player to.
     *
     * **Side effects:** Emits `PlayerEvent.JOINED_WORLD` and `PlayerEvent.LEFT_WORLD`
     * during world switches.
     *
     * **Category:** Players
     */
    joinWorld(world: World): void;
    /**
     * Schedules a notification for the player at a future time.
     *
     * Use for: re-engagement or timed reminders.
     * Do NOT use for: immediate in-game messaging; use chat or UI instead.
     *
     * @remarks
     * Automatically prompts for notification permission in-game if needed.
     *
     * @param type - The type of notification to schedule.
     * @param scheduledFor - A future timestamp in milliseconds to schedule the notification for.
     * @returns The ID of the notification if scheduled successfully, undefined otherwise.
     *
     * **Requires:** Player must be in a world to request permission.
     *
     * **Side effects:** Emits `PlayerEvent.REQUEST_NOTIFICATION_PERMISSION`.
     *
     * **Category:** Players
     */
    scheduleNotification(type: string, scheduledFor: number): Promise<string | void>;
    /**
     * Unschedules a scheduled notification for the player.
     *
     * @param notificationId - The ID returned from `Player.scheduleNotification`.
     * @returns True if the notification was unscheduled, false otherwise.
     *
     * **Category:** Players
     */
    unscheduleNotification(notificationId: string): Promise<boolean>;


    /**
     * Resets all cached input keys for the player.
     *
     * Use for: clearing stuck input states (e.g., after disconnect or pause).
     *
     * **Side effects:** Clears the current `PlayerInput` state.
     *
     * **Category:** Players
     */
    resetInputs(): void;
    /**
     * Enables or disables interaction clicks/taps for this player.
     *
     * Use for: cutscenes, menus, or temporary input blocking.
     *
     * @param enabled - True to allow interactions, false to block them.
     *
     * **Category:** Players
     */
    setInteractEnabled(enabled: boolean): void;
    /**
     * Sets the maximum distance a player can interact with entities or blocks.
     *
     * @param distance - The maximum distance in blocks used for the interact raycast.
     *
     * **Category:** Players
     */
    setMaxInteractDistance(distance: number): void;
    /**
     * Merges data into the player's persisted data cache.
     *
     * Use for: saving progress, inventory, or other player-specific state.
     * Do NOT use for: large binary data or per-tick updates.
     *
     * @remarks
     * Data is merged shallowly into the cached persistence object.
     *
     * @param data - The data to merge into the persisted data.
     *
     * **Requires:** Player persistence must have been loaded before calling.
     *
     * **Side effects:** Mutates the in-memory persistence cache for this player.
     *
     * **Category:** Players
     */
    setPersistedData(data: Record<string, unknown>): void;








}

/**
 * The camera for a Player.
 *
 * When to use: controlling a player's view, mode, and camera offsets.
 * Do NOT use for: moving the player or entities; use entity movement APIs.
 *
 * @remarks
 * Access via `Player.camera`. Most operations require the player to be in a world.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `PlayerCameraEventPayloads`.
 *
 * @example
 * ```typescript
 * // Camera follows player, continuously looks at enemy
 * player.camera.setAttachedToEntity(playerEntity);
 * player.camera.setTargetEntity(enemyEntity);
 *
 * // Camera at fixed position, continuously looks at player
 * player.camera.setAttachedToPosition({ x: 0, y: 10, z: 0 });
 * player.camera.setTargetEntity(playerEntity);
 *
 * // Stop targeting, restore manual camera control
 * player.camera.setTargetEntity(undefined);
 * ```
 *
 * **Category:** Players
 * @public
 */
export declare class PlayerCamera extends EventRouter implements protocol.Serializable {
    /**
     * The player that the camera belongs to.
     *
     * **Category:** Players
     */
    readonly player: Player;



















    /**
     * The entity the camera is attached to.
     *
     * **Category:** Players
     */
    get attachedToEntity(): Entity | undefined;
    /**
     * The position the camera is attached to.
     *
     * **Category:** Players
     */
    get attachedToPosition(): Vector3Like | undefined;
    /**
     * Whether the camera collides with blocks instead of clipping through them.
     *
     * **Category:** Players
     */
    get collidesWithBlocks(): boolean;
    /**
     * The facing direction vector of the camera based on its current orientation.
     *
     * **Category:** Players
     */
    get facingDirection(): Vector3Like;
    /**
     * The quaternion representing the camera's facing direction.
     *
     * **Category:** Players
     */
    get facingQuaternion(): QuaternionLike;
    /**
     * The film offset of the camera.
     *
     * @remarks
     * Positive shifts right, negative shifts left.
     *
     * **Category:** Players
     */
    get filmOffset(): number;
    /**
     * The forward offset of the camera (first-person mode only).
     *
     * @remarks
     * Positive shifts forward, negative shifts backward.
     *
     * **Category:** Players
     */
    get forwardOffset(): number;
    /**
     * The field of view of the camera.
     *
     * **Category:** Players
     */
    get fov(): number;
    /**
     * Model nodes that will not be rendered for this player.
     *
     * @remarks
     * Uses case-insensitive substring matching.
     *
     * **Category:** Players
     */
    get modelHiddenNodes(): Set<string>;
    /**
     * Model nodes that will be rendered for this player, overriding hidden nodes.
     *
     * @remarks
     * Uses case-insensitive substring matching.
     *
     * **Category:** Players
     */
    get modelShownNodes(): Set<string>;
    /**
     * The mode of the camera.
     *
     * **Category:** Players
     */
    get mode(): PlayerCameraMode;
    /**
     * The relative offset of the camera from its attachment target.
     *
     * **Category:** Players
     */
    get offset(): Vector3Like;
    /**
     * The current orientation of the camera.
     *
     * @remarks
     * Updated by client input; there is no public setter.
     *
     * **Category:** Players
     */
    get orientation(): PlayerCameraOrientation;
    /**
     * The shoulder angle of the camera in degrees.
     *
     * **Category:** Players
     */
    get shoulderAngle(): number;
    /**
     * The entity the camera continuously rotates to face.
     *
     * **Category:** Players
     */
    get targetEntity(): Entity | undefined;
    /**
     * The position the camera continuously rotates to face.
     *
     * **Category:** Players
     */
    get targetPosition(): Vector3Like | undefined;
    /**
     * The URI of the view model.
     *
     * @remarks
     * If not set, defaults to using attached entity's model uri.
     * If no entity is attached, returns `undefined`.
     *
     * **Category:** Players
     */
    get viewModelUri(): string | undefined;
    /**
     * Node substrings to hide on the view model (or attached entity's model).
     *
     * **Category:** Players
     */
    get viewModelHiddenNodes(): Set<string>;
    /**
     * Whether the view model pitches up/down with the camera orientation.
     *
     * **Category:** Players
     */
    get viewModelPitchesWithCamera(): boolean;
    /**
     * Node substrings to show on the view model (or attached entity's model).
     *
     * **Category:** Players
     */
    get viewModelShownNodes(): Set<string>;
    /**
     * Whether the view model yaws left/right with the camera orientation.
     *
     * **Category:** Players
     */
    get viewModelYawsWithCamera(): boolean;
    /**
     * The zoom of the camera.
     *
     * **Category:** Players
     */
    get zoom(): number;
    /**
     * Makes the camera look at an entity once.
     *
     * Use for: one-off focus moments (e.g., cutscene beats).
     * Do NOT use for: continuous tracking; use `PlayerCamera.setTrackedEntity`.
     *
     * @param entity - The entity to look at.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.LOOK_AT_ENTITY`.
     *
     * **Category:** Players
     */
    faceEntity(entity: Entity): void;
    /**
     * Makes the camera look at a position once.
     *
     * Use for: one-off focus moments (e.g., points of interest).
     * Do NOT use for: continuous tracking; use `PlayerCamera.setTrackedPosition`.
     *
     * @param position - The position to look at.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.LOOK_AT_POSITION`.
     *
     * **Category:** Players
     */
    facePosition(position: Vector3Like): void;
    /**
     * Resets the camera state on the server.
     *
     * Use for: clearing camera state on disconnect or reconnect.
     *
     * @remarks
     * Clears `attachedToEntity`, `attachedToPosition`, `orientation`, `trackedEntity`, and `trackedPosition`.
     * This does not emit a camera event; it only resets server-side state.
     *
     * **Category:** Players
     */
    reset(): void;
    /**
     * Attaches the camera to an entity.
     *
     * Use for: third-person follow cameras or entity-bound views.
     * Do NOT use for: tracking an entity without attachment; use `PlayerCamera.setTrackedEntity`.
     *
     * @param entity - The entity to attach the camera to (must be spawned).
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_ATTACHED_TO_ENTITY`.
     *
     * **Category:** Players
     */
    setAttachedToEntity(entity: Entity): void;
    /**
     * Attaches the camera to a world position.
     *
     * Use for: fixed cameras or cinematic shots.
     * Do NOT use for: tracking a moving target; use `PlayerCamera.setTrackedPosition`.
     *
     * @param position - The position to attach the camera to.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_ATTACHED_TO_POSITION`.
     *
     * **Category:** Players
     */
    setAttachedToPosition(position: Vector3Like): void;
    /**
     * Sets whether the camera collides with blocks instead of clipping through them.
     *
     * @param collidesWithBlocks - Whether the camera should collide with blocks.
     *
     * **Category:** Players
     */
    setCollidesWithBlocks(collidesWithBlocks: boolean): void;
    /**
     * Sets the film offset of the camera. A positive value
     * shifts the camera right, a negative value shifts it left.
     * @param filmOffset - The film offset to set.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_FILM_OFFSET`.
     *
     * **Category:** Players
     */
    setFilmOffset(filmOffset: number): void;
    /**
     * Sets the forward offset of the camera (first-person mode only).
     *
     * @remarks
     * Positive shifts forward, negative shifts backward.
     *
     * @param forwardOffset - The forward offset to set.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_FORWARD_OFFSET`.
     *
     * **Category:** Players
     */
    setForwardOffset(forwardOffset: number): void;
    /**
     * Sets the field of view of the camera.
     *
     * @param fov - The field of view to set.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_FOV`.
     *
     * **Category:** Players
     */
    setFov(fov: number): void;
    /**
     * Sets the mode of the camera.
     *
     * @param mode - The mode to set.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_MODE`.
     *
     * **Category:** Players
     */
    setMode(mode: PlayerCameraMode): void;
    /**
     * Sets the relative offset of the camera from its attachment target.
     *
     * @param offset - The offset to set.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_OFFSET`.
     *
     * **Category:** Players
     */
    setOffset(offset: Vector3Like): void;


    /**
     * Sets the shoulder angle of the camera in degrees (third-person mode only).
     *
     * @remarks
     * Positive shifts right, negative shifts left.
     *
     * @param shoulderAngle - The shoulder angle to set in degrees.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_SHOULDER_ANGLE`.
     *
     * **Category:** Players
     */
    setShoulderAngle(shoulderAngle: number): void;
    /**
     * Sets the entity the camera will continuously look at.
     *
     * Use for: keeping the camera focused on a moving entity.
     *
     * @param entity - The entity to track, or undefined to stop tracking.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_TRACKED_ENTITY`.
     *
     * **Category:** Players
     */
    setTargetEntity(entity: Entity | undefined): void;
    /**
     * Sets the position the camera will continuously look at.
     *
     * Use for: fixed focal points in the scene.
     *
     * @param position - The position to track, or undefined to stop tracking.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_TRACKED_POSITION`.
     *
     * **Category:** Players
     */
    setTargetPosition(position: Vector3Like | undefined): void;
    /**
     * Sets a view model for first-person rendering.
     *
     * @remarks
     * The view model is only visible to this camera's player and renders in place of
     * the attached entity's model (e.g., first-person arms/weapon).
     * Animations played on the attached entity automatically sync to
     * this model if animation names match.
     *
     * @param viewModelUri - The model URI, or `undefined` to clear.
     *
     * **Category:** Players
     */
    setViewModel(viewModelUri: string | undefined): void;
    /**
     * Hides nodes on the view model (or attached entity's model if no view model is set).
     *
     * @remarks
     * Only affects this camera's player. Uses case-insensitive substring matching.
     * Replaces the current set (not a merge).
     *
     * @param viewModelHiddenNodes - Node name substrings to hide.
     *
     * **Category:** Players
     */
    setViewModelHiddenNodes(viewModelHiddenNodes: string[]): void;
    /**
     * Sets whether the view model pitches up/down with the camera orientation.
     *
     * @remarks
     * Useful for first-person view models to tilt when looking up/down.
     *
     * @param viewModelPitchesWithCamera - Whether the view model should pitch with the camera.
     *
     * **Category:** Players
     */
    setViewModelPitchesWithCamera(viewModelPitchesWithCamera: boolean): void;
    /**
     * Shows nodes on the view model (or attached entity's model if no view model is set),
     * overriding hidden nodes.
     *
     * @remarks
     * Only affects this camera's player. Uses case-insensitive substring matching.
     * Replaces the current set (not a merge).
     *
     * @param viewModelShownNodes - Node name substrings to show.
     *
     * **Category:** Players
     */
    setViewModelShownNodes(viewModelShownNodes: string[]): void;
    /**
     * Sets whether the view model yaws left/right with the camera orientation.
     *
     * @remarks
     * Useful for first-person view models to rotate when looking left/right.
     *
     * @param viewModelYawsWithCamera - Whether the view model should yaw with the camera.
     *
     * **Category:** Players
     */
    setViewModelYawsWithCamera(viewModelYawsWithCamera: boolean): void;
    /**
     * Sets the zoom of the camera.
     *
     * @param zoom - The zoom to set, 0 to infinity.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerCameraEvent.SET_ZOOM`.
     *
     * **Category:** Players
     */
    setZoom(zoom: number): void;


}

/**
 * Event types a PlayerCamera can emit.
 *
 * See `PlayerCameraEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum PlayerCameraEvent {
    FACE_ENTITY = "PLAYER_CAMERA.FACE_ENTITY",
    FACE_POSITION = "PLAYER_CAMERA.FACE_POSITION",
    SET_ATTACHED_TO_ENTITY = "PLAYER_CAMERA.SET_ATTACHED_TO_ENTITY",
    SET_ATTACHED_TO_POSITION = "PLAYER_CAMERA.SET_ATTACHED_TO_POSITION",
    SET_COLLIDES_WITH_BLOCKS = "PLAYER_CAMERA.SET_COLLIDES_WITH_BLOCKS",
    SET_FILM_OFFSET = "PLAYER_CAMERA.SET_FILM_OFFSET",
    SET_FORWARD_OFFSET = "PLAYER_CAMERA.SET_FORWARD_OFFSET",
    SET_FOV = "PLAYER_CAMERA.SET_FOV",
    SET_MODE = "PLAYER_CAMERA.SET_MODE",
    SET_OFFSET = "PLAYER_CAMERA.SET_OFFSET",
    SET_SHOULDER_ANGLE = "PLAYER_CAMERA.SET_SHOULDER_ANGLE",
    SET_TARGET_ENTITY = "PLAYER_CAMERA.SET_TARGET_ENTITY",
    SET_TARGET_POSITION = "PLAYER_CAMERA.SET_TARGET_POSITION",
    SET_VIEW_MODEL = "PLAYER_CAMERA.SET_VIEW_MODEL",
    SET_VIEW_MODEL_HIDDEN_NODES = "PLAYER_CAMERA.SET_VIEW_MODEL_HIDDEN_NODES",
    SET_VIEW_MODEL_PITCHES_WITH_CAMERA = "PLAYER_CAMERA.SET_VIEW_MODEL_PITCHES_WITH_CAMERA",
    SET_VIEW_MODEL_SHOWN_NODES = "PLAYER_CAMERA.SET_VIEW_MODEL_SHOWN_NODES",
    SET_VIEW_MODEL_YAWS_WITH_CAMERA = "PLAYER_CAMERA.SET_VIEW_MODEL_YAWS_WITH_CAMERA",
    SET_ZOOM = "PLAYER_CAMERA.SET_ZOOM"
}

/**
 * Event payloads for PlayerCamera emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface PlayerCameraEventPayloads {
    /** Emitted when the camera faces an entity (one-time rotation). */
    [PlayerCameraEvent.FACE_ENTITY]: {
        playerCamera: PlayerCamera;
        entity: Entity;
    };
    /** Emitted when the camera faces a position (one-time rotation). */
    [PlayerCameraEvent.FACE_POSITION]: {
        playerCamera: PlayerCamera;
        position: Vector3Like;
    };
    /** Emitted when the camera attachment entity is set. */
    [PlayerCameraEvent.SET_ATTACHED_TO_ENTITY]: {
        playerCamera: PlayerCamera;
        entity: Entity;
    };
    /** Emitted when the camera attachment position is set. */
    [PlayerCameraEvent.SET_ATTACHED_TO_POSITION]: {
        playerCamera: PlayerCamera;
        position: Vector3Like;
    };
    /** Emitted when collides with blocks is set. */
    [PlayerCameraEvent.SET_COLLIDES_WITH_BLOCKS]: {
        playerCamera: PlayerCamera;
        collidesWithBlocks: boolean;
    };
    /** Emitted when the film offset of the camera is set. */
    [PlayerCameraEvent.SET_FILM_OFFSET]: {
        playerCamera: PlayerCamera;
        filmOffset: number;
    };
    /** Emitted when the forward offset of the camera is set. */
    [PlayerCameraEvent.SET_FORWARD_OFFSET]: {
        playerCamera: PlayerCamera;
        forwardOffset: number;
    };
    /** Emitted when the field of view of the camera is set. */
    [PlayerCameraEvent.SET_FOV]: {
        playerCamera: PlayerCamera;
        fov: number;
    };
    /** Emitted when the mode of the camera is set. */
    [PlayerCameraEvent.SET_MODE]: {
        playerCamera: PlayerCamera;
        mode: PlayerCameraMode;
    };
    /** Emitted when the offset of the camera is set. */
    [PlayerCameraEvent.SET_OFFSET]: {
        playerCamera: PlayerCamera;
        offset: Vector3Like;
    };
    /** Emitted when the shoulder angle of the camera is set. */
    [PlayerCameraEvent.SET_SHOULDER_ANGLE]: {
        playerCamera: PlayerCamera;
        shoulderAngle: number;
    };
    /** Emitted when the target entity of the camera is set. */
    [PlayerCameraEvent.SET_TARGET_ENTITY]: {
        playerCamera: PlayerCamera;
        entity: Entity | undefined;
    };
    /** Emitted when the target position of the camera is set. */
    [PlayerCameraEvent.SET_TARGET_POSITION]: {
        playerCamera: PlayerCamera;
        position: Vector3Like | undefined;
    };
    /** Emitted when the view model is set. */
    [PlayerCameraEvent.SET_VIEW_MODEL]: {
        playerCamera: PlayerCamera;
        viewModelUri: string | undefined;
    };
    /** Emitted when the nodes of the view model are set to be hidden. */
    [PlayerCameraEvent.SET_VIEW_MODEL_HIDDEN_NODES]: {
        playerCamera: PlayerCamera;
        viewModelHiddenNodes: Set<string>;
    };
    /** Emitted when view model pitches with camera is set. */
    [PlayerCameraEvent.SET_VIEW_MODEL_PITCHES_WITH_CAMERA]: {
        playerCamera: PlayerCamera;
        viewModelPitchesWithCamera: boolean;
    };
    /** Emitted when the nodes of the view model are set to be shown. */
    [PlayerCameraEvent.SET_VIEW_MODEL_SHOWN_NODES]: {
        playerCamera: PlayerCamera;
        viewModelShownNodes: Set<string>;
    };
    /** Emitted when view model yaws with camera is set. */
    [PlayerCameraEvent.SET_VIEW_MODEL_YAWS_WITH_CAMERA]: {
        playerCamera: PlayerCamera;
        viewModelYawsWithCamera: boolean;
    };
    /** Emitted when the zoom of the camera is set. */
    [PlayerCameraEvent.SET_ZOOM]: {
        playerCamera: PlayerCamera;
        zoom: number;
    };
}

/**
 * The mode of the camera.
 *
 * **Category:** Players
 * @public
 */
export declare enum PlayerCameraMode {
    FIRST_PERSON = 0,
    THIRD_PERSON = 1,
    SPECTATOR = 2
}

/**
 * The camera orientation state of a Player.
 *
 * **Category:** Players
 * @public
 */
export declare type PlayerCameraOrientation = {
    pitch: number;
    yaw: number;
};

/**
 * The cosmetics of a player.
 *
 * **Category:** Networking
 * @public
 */
export declare type PlayerCosmetics = {
    equippedItems: {
        slot: string;
        item: PlayerCosmeticsEquippedItem;
    }[];
    hairModelUri?: string;
    hairTextureUri?: string;
    skinTextureUri: string;
};

/**
 * An equipped item of a player's cosmetics.
 *
 * **Category:** Networking
 * @public
 */
export declare type PlayerCosmeticsEquippedItem = {
    flags: string[];
    type: string;
    modelUrl: string;
    textureUrl?: string;
};

/**
 * The slots used for player cosmetics.
 *
 * **Category:** Entities
 * @public
 */
export declare type PlayerCosmeticSlot = 'ALL' | 'BACK' | 'HEAD' | 'LEFT_ARM' | 'LEFT_FOOT' | 'LEFT_HAND' | 'LEFT_ITEM' | 'LEFT_LEG' | 'RIGHT_ARM' | 'RIGHT_FOOT' | 'RIGHT_HAND' | 'RIGHT_ITEM' | 'RIGHT_LEG' | 'TORSO';

/**
 * Represents an entity controlled by a player in a world.
 *
 * When to use: custom player avatars that respond to player input.
 * Do NOT use for: non-player NPCs; use `Entity` with a controller instead.
 *
 * @remarks
 * Player entities extend `Entity`. They expect a controller to be set before spawning.
 * Without a controller, player input cannot be processed.
 *
 * @example
 * ```typescript
 * world.onPlayerJoin = player => {
 *   const playerEntity = new PlayerEntity({
 *     player,
 *     name: 'Player',
 *     modelUri: 'models/players/player.gltf',
 *     modelAnimations: [
 *       { name: 'idle-lower', loopMode: EntityModelAnimationLoopMode.LOOP, play: true },
 *       { name: 'idle-upper', loopMode: EntityModelAnimationLoopMode.LOOP, play: true },
 *     ],
 *     modelScale: 0.5,
 *   });
 *
 *   playerEntity.spawn(world, { x: 10, y: 20, z: 15 });
 * };
 * ```
 *
 * **Category:** Entities
 * @public
 */
export declare class PlayerEntity extends Entity {
    /**
     * The player this entity is assigned to and controlled by.
     *
     * **Category:** Entities
     */
    readonly player: Player;
    /**
     * The SceneUI instance for the player entity's nametag.
     *
     * **Category:** Entities
     */
    readonly nametagSceneUI: SceneUI;

    /**
     * Creates a new PlayerEntity instance.
     *
     * @remarks
     * **Nametag:** A `nametagSceneUI` is automatically created using the built-in `hytopia:nametag` template
     * with the player's username and profile picture. Access via `nametagSceneUI` property to customize.
     *
     * @param options - The options for the player entity.
     *
     * **Category:** Entities
     */
    constructor(options: PlayerEntityOptions);
    /**
     * Whether `tickWithPlayerInput()` is called during the entity's tick.
     *
     * **Category:** Entities
     */
    get isTickWithPlayerInputEnabled(): boolean;
    /**
     * Enables or disables `tickWithPlayerInput()` during the entity's tick.
     *
     * Use for: temporarily disabling player control (cutscenes, menus, stuns).
     *
     * @param enabled - Whether `tickWithPlayerInput()` should be called.
     *
     * **Category:** Entities
     */
    setTickWithPlayerInputEnabled(enabled: boolean): void;


}

/**
 * Options for creating a PlayerEntity instance.
 *
 * Use for: creating a player-bound entity (requires `player`).
 * Do NOT use for: non-player entities; use `EntityOptions`.
 *
 * **Category:** Entities
 * @public
 */
export declare type PlayerEntityOptions = {
    /** The player the player entity is assigned to. */
    player: Player;
} & EntityOptions;

/**
 * Event types a Player can emit.
 *
 * See `PlayerEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum PlayerEvent {
    CHAT_MESSAGE_SEND = "PLAYER.CHAT_MESSAGE_SEND",
    INTERACT = "PLAYER.INTERACT",
    JOINED_WORLD = "PLAYER.JOINED_WORLD",
    LEFT_WORLD = "PLAYER.LEFT_WORLD",
    RECONNECTED_WORLD = "PLAYER.RECONNECTED_WORLD",
    REQUEST_NOTIFICATION_PERMISSION = "PLAYER.REQUEST_NOTIFICATION_PERMISSION",
    REQUEST_SYNC = "PLAYER.REQUEST_SYNC"
}

/**
 * Event payloads for Player emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface PlayerEventPayloads {
    /** Emitted when a player sends a chat message. */
    [PlayerEvent.CHAT_MESSAGE_SEND]: {
        player: Player;
        message: string;
    };
    /** Emitted when a player joins a world. */
    [PlayerEvent.JOINED_WORLD]: {
        player: Player;
        world: World;
    };
    /** Emitted when a player interacts the world. */
    [PlayerEvent.INTERACT]: {
        player: Player;
        interactOrigin: Vector3Like;
        interactDirection: Vector3Like;
        raycastHit?: RaycastHit;
    };
    /** Emitted when a player leaves a world. */
    [PlayerEvent.LEFT_WORLD]: {
        player: Player;
        world: World;
    };
    /** Emitted when a player reconnects to a world after a unintentional disconnect. */
    [PlayerEvent.RECONNECTED_WORLD]: {
        player: Player;
        world: World;
    };
    /** Emitted when notification permission is requested by a game. */
    [PlayerEvent.REQUEST_NOTIFICATION_PERMISSION]: {
        player: Player;
    };
    /** Emitted when a player's client requests a round trip time synchronization. */
    [PlayerEvent.REQUEST_SYNC]: {
        player: Player;
        receivedAt: number;
        receivedAtMs: number;
    };
}

/**
 * The input state of a `Player`.
 *
 * **Category:** Players
 * @public
 */
export declare type PlayerInput = InputSchema;

/**
 * Manages all connected players in a game server.
 *
 * When to use: accessing online players, reacting to connection lifecycle events,
 * or routing players to worlds.
 * Do NOT use for: constructing or persisting players yourself; players are created
 * automatically on connection.
 *
 * @remarks
 * Access via `PlayerManager.instance` — do not construct directly.
 *
 * <h2>Events</h2>
 *
 * This class emits global events with payloads listed under
 * `PlayerManagerEventPayloads`.
 *
 * @example
 * ```typescript
 * import { PlayerManager } from 'hytopia';
 *
 * const playerManager = PlayerManager.instance;
 * const connectedPlayers = playerManager.getConnectedPlayers();
 * ```
 *
 * **Category:** Players
 * @public
 */
export declare class PlayerManager {
    /**
     * The global PlayerManager instance (singleton).
     *
     * **Category:** Players
     */
    static readonly instance: PlayerManager;
    /**
     * Optional handler for selecting the world a newly connected player joins.
     *
     * Use for: lobby routing or game mode selection.
     * Do NOT use for: moving players after they have already joined a world; use `Player.joinWorld`.
     *
     * @remarks
     * Return `undefined` to place the player in the default world.
     *
     * **Category:** Players
     */
    worldSelectionHandler?: (player: Player) => Promise<World | undefined>;


    /**
     * The number of players currently connected to the server.
     *
     * **Category:** Players
     */
    get playerCount(): number;
    /**
     * Get all connected players.
     *
     * @returns An array of all connected players.
     *
     * **Category:** Players
     */
    getConnectedPlayers(): Player[];
    /**
     * Get all connected players in a specific world.
     *
     * @param world - The world to get connected players for.
     * @returns An array of all connected players in the world.
     *
     * **Category:** Players
     */
    getConnectedPlayersByWorld(world: World): Player[];
    /**
     * Get a connected player by their username (case-insensitive).
     *
     * @param username - The username of the player to get.
     * @returns The connected player with the given username or undefined if not found.
     *
     * **Category:** Players
     */
    getConnectedPlayerByUsername(username: string): Player | undefined;




}

/**
 * Event types a PlayerManager can emit.
 *
 * See `PlayerManagerEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum PlayerManagerEvent {
    PLAYER_CONNECTED = "PLAYER_MANAGER.PLAYER_CONNECTED",
    PLAYER_DISCONNECTED = "PLAYER_MANAGER.PLAYER_DISCONNECTED",
    PLAYER_RECONNECTED = "PLAYER_MANAGER.PLAYER_RECONNECTED"
}

/**
 * Event payloads for PlayerManager emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface PlayerManagerEventPayloads {
    /** Emitted when a player connects to the server. */
    [PlayerManagerEvent.PLAYER_CONNECTED]: {
        player: Player;
        connectionParams?: URLSearchParams;
    };
    /** Emitted when a player disconnects from the server for any reason (lost connection, kick, world switch, etc). */
    [PlayerManagerEvent.PLAYER_DISCONNECTED]: {
        player: Player;
    };
    /** Emitted when a player reconnects to the server for any reason (reconnection, world switch, etc). */
    [PlayerManagerEvent.PLAYER_RECONNECTED]: {
        player: Player;
    };
}

/**
 * The UI for a player.
 *
 * When to use: showing overlays, HUDs, menus, and custom UI for a specific player.
 * Do NOT use for: world-level UI shared by all players; use scene UI systems instead.
 *
 * @remarks
 * UI is driven by HTML, CSS, and JavaScript files in your `assets` folder.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `PlayerUIEventPayloads`.
 *
 * **Category:** Players
 * @public
 */
export declare class PlayerUI extends EventRouter {
    /**
     * The player that the UI belongs to.
     *
     * **Category:** Players
     */
    readonly player: Player;

    /**
     * Appends UI HTML to the player's existing client UI.
     *
     * Use for: incremental overlays (notifications, tooltips, modal layers).
     * Do NOT use for: replacing the entire UI; use `PlayerUI.load`.
     *
     * @remarks
     * Multiple calls in the same tick append in call order.
     * If used with `PlayerUI.load` in the same tick, appends occur after the load.
     *
     * @param htmlUri - The UI HTML URI to append.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerUIEvent.APPEND`.
     *
     * **Category:** Players
     */
    append(htmlUri: string): void;
    /**
     * Freezes or unfreezes the player's pointer lock state.
     *
     * Use for: menus or cutscenes that should not alter pointer lock.
     *
     * @param freeze - True to freeze pointer lock, false to unfreeze it.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerUIEvent.FREEZE_POINTER_LOCK`.
     *
     * **Category:** Players
     */
    freezePointerLock(freeze: boolean): void;
    /**
     * Loads client UI for the player, replacing any existing UI.
     *
     * Use for: switching to a new UI screen or resetting the UI.
     * Do NOT use for: incremental overlays; use `PlayerUI.append`.
     *
     * @remarks
     * If used with `PlayerUI.append` in the same tick, the load occurs first.
     *
     * @param htmlUri - The UI HTML URI to load.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerUIEvent.LOAD`.
     *
     * **Category:** Players
     */
    load(htmlUri: string): void;
    /**
     * Locks or unlocks the player's mouse pointer on desktop.
     *
     * Use for: controlling when mouse input is captured.
     * Do NOT use for: mobile devices (pointer lock has no effect).
     *
     * @remarks
     * If unlocked, the player cannot use in-game mouse inputs until it is locked again.
     *
     * @param lock - True to lock the pointer, false to unlock it.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerUIEvent.LOCK_POINTER`.
     *
     * **Category:** Players
     */
    lockPointer(lock: boolean): void;
    /**
     * Sends data to the player's client UI.
     *
     * Use for: pushing state updates to your UI scripts.
     *
     * @param data - The data to send to the client UI.
     *
     * **Requires:** Player must be in a world.
     *
     * **Side effects:** Emits `PlayerUIEvent.SEND_DATA`.
     *
     * **Category:** Players
     */
    sendData(data: object): void;
}

/**
 * Event types a PlayerUI can emit.
 *
 * See `PlayerUIEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum PlayerUIEvent {
    APPEND = "PLAYER_UI.APPEND",
    DATA = "PLAYER_UI.DATA",
    FREEZE_POINTER_LOCK = "PLAYER_UI.FREEZE_POINTER_LOCK",
    LOAD = "PLAYER_UI.LOAD",
    LOCK_POINTER = "PLAYER_UI.LOCK_POINTER",
    SEND_DATA = "PLAYER_UI.SEND_DATA"
}

/**
 * Event payloads for PlayerUI emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface PlayerUIEventPayloads {
    /** Emitted when UI HTML is appended to the player's existing client UI. */
    [PlayerUIEvent.APPEND]: {
        playerUI: PlayerUI;
        htmlUri: string;
    };
    /** Emitted when data is received by the server from the player's client UI. */
    [PlayerUIEvent.DATA]: {
        playerUI: PlayerUI;
        data: Record<string, any>;
    };
    /** Emitted when the player's pointer lock is frozen or unfrozen. */
    [PlayerUIEvent.FREEZE_POINTER_LOCK]: {
        playerUI: PlayerUI;
        freeze: boolean;
    };
    /** Emitted when the player's client UI is loaded. */
    [PlayerUIEvent.LOAD]: {
        playerUI: PlayerUI;
        htmlUri: string;
    };
    /** Emitted when the player's mouse pointer is locked or unlocked. */
    [PlayerUIEvent.LOCK_POINTER]: {
        playerUI: PlayerUI;
        lock: boolean;
    };
    /** Emitted when data is sent from the server to the player's client UI. */
    [PlayerUIEvent.SEND_DATA]: {
        playerUI: PlayerUI;
        data: Record<string, any>;
    };
}

/**
 * Represents a quaternion.
 *
 * When to use: rotation math for entities, cameras, or transforms.
 * Do NOT use for: immutable math; most methods mutate the instance.
 *
 * @remarks
 * All quaternion methods result in mutation of the quaternion instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a quaternion.
 *
 * Pattern: reuse instances to avoid allocations in tight loops.
 * Anti-pattern: assuming methods return new instances; most mutate in place.
 *
 * **Category:** Math
 * @public
 */
export declare class Quaternion extends Float32Array implements QuaternionLike {
    constructor(x: number, y: number, z: number, w: number);
    /** The length of the quaternion. */
    get length(): number;
    /** The squared length of the quaternion. */
    get squaredLength(): number;
    /** The magnitude of the quaternion. Alias for `.length`. */
    get magnitude(): number;
    /** The squared magnitude of the quaternion. Alias for `.squaredLength`. */
    get squaredMagnitude(): number;
    /** The x-component of the quaternion. */
    get x(): number;
    set x(value: number);
    /** The y-component of the quaternion. */
    get y(): number;
    set y(value: number);
    /** The z-component of the quaternion. */
    get z(): number;
    set z(value: number);
    /** The w-component of the quaternion. */
    get w(): number;
    set w(value: number);
    /**
     * Creates a quaternion from Euler angles.
     *
     * @param x - The x-component of the Euler angles in degrees.
     * @param y - The y-component of the Euler angles in degrees.
     * @param z - The z-component of the Euler angles in degrees.
     */
    static fromEuler(x: number, y: number, z: number): Quaternion;
    /**
     * Creates a quaternion from a `QuaternionLike` object.
     *
     * @param quaternionLike - The `QuaternionLike` object to create the quaternion from.
     */
    static fromQuaternionLike(quaternionLike: QuaternionLike): Quaternion;
    /**
     * Creates a clone of the current quaternion.
     *
     * @returns A new `Quaternion` instance.
     */
    clone(): Quaternion;
    /**
     * Conjugates the current quaternion.
     *
     * @returns The current quaternion.
     */
    conjugate(): Quaternion;
    /**
     * Copies the components of a `QuaternionLike` object to the current quaternion.
     *
     * @param quaternionLike - The `QuaternionLike` object to copy the components from.
     * @returns The current quaternion.
     */
    copy(quaternion: Quaternion): Quaternion;
    /**
     * Calculates the dot product of the current quaternion and another quaternion.
     *
     * @param quaternionLike - The quaternion to calculate the dot product with.
     * @returns The dot product.
     */
    dot(quaternion: Quaternion): number;
    /**
     * Calculates and sets the current quaternion to its exponential.
     *
     * @returns The current quaternion.
     */
    exponential(): Quaternion;
    /**
     * Checks if the current quaternion is approximately equal to another quaternion.
     *
     * @param quaternionLike - The quaternion to check against.
     * @returns `true` if the quaternions are approximately equal, `false` otherwise.
     */
    equals(quaternion: Quaternion): boolean;
    /**
     * Checks if the current quaternion is exactly equal to another quaternion.
     *
     * @param quaternionLike - The quaternion to check against.
     * @returns `true` if the quaternions are exactly equal, `false` otherwise.
     */
    exactEquals(quaternion: Quaternion): boolean;
    /**
     * Calculates and returns the angle between the current quaternion and another quaternion.
     *
     * @param quaternionLike - The quaternion to calculate the angle with.
     * @returns The angle in degrees.
     */
    getAngle(quaternion: Quaternion): number;
    /**
     * Sets the current quaternion to the identity quaternion.
     *
     * @returns The current quaternion.
     */
    identity(): Quaternion;
    /**
     * Inverts each component of the quaternion.
     *
     * @returns The current quaternion.
     */
    invert(): Quaternion;
    /**
     * Linearly interpolates between the current quaternion and another quaternion.
     *
     * @param quaternionLike - The quaternion to interpolate with.
     * @param t - The interpolation factor.
     * @returns The current quaternion.
     */
    lerp(quaternion: Quaternion, t: number): Quaternion;
    /**
     * Sets the current quaternion to its natural logarithm.
     *
     * @returns The current quaternion.
     */
    logarithm(): Quaternion;
    /**
     * Multiplies the quaternion by another quaternion.
     *
     * @param quaternionLike - The quaternion to multiply by.
     * @returns The current quaternion.
     */
    multiply(quaternion: Quaternion): Quaternion;
    /**
     * Rotates the provided vector by the rotation this quaternion represents.
     * This modifies the vector in-place, but also returns the rotated vector.
     *
     * @param vector - the vector to rotate
     * @returns the rotated vector.
     */
    transformVector(vector: Vector3): Vector3;
    /**
     * Normalizes the quaternion.
     *
     * @returns The current quaternion.
     */
    normalize(): Quaternion;
    /**
     * Raises the current quaternion to a power.
     *
     * @param exponent - The exponent to raise the quaternion to.
     * @returns The current quaternion.
     */
    power(exponent: number): Quaternion;
    /**
     * Randomizes the current quaternion.
     *
     * @returns The current quaternion.
     */
    randomize(): Quaternion;
    /**
     * Rotates the quaternion around the x-axis.
     *
     * @param angle - The angle to rotate in degrees.
     * @returns The current quaternion.
     */
    rotateX(angle: number): Quaternion;
    /**
     * Rotates the quaternion around the y-axis.
     *
     * @param angle - The angle to rotate in degrees.
     * @returns The current quaternion.
     */
    rotateY(angle: number): Quaternion;
    /**
     * Rotates the quaternion around the z-axis.
     *
     * @param angle - The angle to rotate in degrees.
     * @returns The current quaternion.
     */
    rotateZ(angle: number): Quaternion;
    /**
     * Scales the quaternion by a scalar value.
     *
     * @param scale - The scalar value to scale the quaternion by.
     * @returns The current quaternion.
     */
    scale(scale: number): Quaternion;
    /**
     * Sets the current quaternion to the angle and rotation axis.
     *
     * @param axis - The axis to rotate around.
     * @param angle - The angle to rotate in radians.
     * @returns The current quaternion.
     */
    setAxisAngle(axis: Vector3, angle: number): Quaternion;
    /**
     * Spherically interpolates between the current quaternion and another quaternion.
     *
     * @param quaternion - The quaternion to interpolate with.
     * @param t - The interpolation factor.
     * @returns The current quaternion.
     */
    slerp(quaternion: Quaternion, t: number): Quaternion;
    /**
     * Returns a string representation of the quaternion in x,y,z,w format.
     *
     * @returns A string representation of the quaternion in the format x,y,z,w.
     */
    toString(): string;
}

/**
 * A quaternion.
 *
 * **Category:** Math
 * @public
 */
export declare interface QuaternionLike {
    x: number;
    y: number;
    z: number;
    w: number;
}

/**
 * A raw collider object from the Rapier physics engine. @public
 *
 * **Category:** Physics
 */
export declare type RawCollider = RAPIER.Collider;

/**
 * A raw set of collision groups represented as a 32-bit number.
 *
 * **Category:** Physics
 * @public
 */
export declare type RawCollisionGroups = RAPIER.InteractionGroups;

/**
 * A raw shape object from the Rapier physics engine. @public
 *
 * **Category:** Physics
 */
export declare type RawShape = RAPIER.Shape;

/**
 * A hit result from a raycast.
 *
 * **Category:** Physics
 * @public
 */
export declare type RaycastHit = {
    /** The block the raycast hit. */
    hitBlock?: Block;
    /** The entity the raycast hit */
    hitEntity?: Entity;
    /** The point in global coordinate space the raycast hit the object. */
    hitPoint: Vector3Like;
    /** The distance from origin where the raycast hit. */
    hitDistance: number;
    /** The origin of the raycast. */
    origin: Vector3Like;
    /** The direction of the raycast from the origin. */
    originDirection: Vector3Like;
};

/**
 * Options for raycasting.
 *
 * Use for: configuring `Simulation.raycast` calls.
 * Do NOT use for: caching long-term query state; build per query.
 *
 * **Category:** Physics
 * @public
 */
export declare type RaycastOptions = {
    /** Whether to use solid mode for the raycast, defaults to true. */
    solidMode?: boolean;
} & FilterOptions;

/**
 * An RGB color. `r`, `g`, and `b` expect a value between 0 and 255.
 *
 * **Category:** Types
 * @public
 */
export declare interface RgbColor {
    r: number;
    g: number;
    b: number;
}

/**
 * Represents a rigid body in a world's physics simulation.
 *
 * When to use: physics-simulated or kinematic objects that need forces, collisions, or velocity.
 * Do NOT use for: purely visual transforms; use entity transforms without physics when possible.
 *
 * @remarks
 * Provide `simulation` in `RigidBodyOptions` or call `RigidBody.addToSimulation` to create the
 * underlying physics body. Many methods are type-specific (dynamic vs kinematic); see `RigidBody.setType`.
 *
 * **Category:** Physics
 * @public
 */
export declare class RigidBody extends EventRouter {









    /**
     * Creates a rigid body with the provided options.
     *
     * Use for: configuring physics behavior before adding to a simulation.
     * Do NOT use for: immediate physics queries; the rigid body must be simulated first.
     *
     * @param options - The options for the rigid body instance.
     *
     * **Category:** Physics
     */
    constructor(options: RigidBodyOptions);
    /**
     * The additional mass of the rigid body.
     *
     * **Category:** Physics
     */
    get additionalMass(): number;
    /**
     * The additional solver iterations of the rigid body.
     *
     * **Category:** Physics
     */
    get additionalSolverIterations(): number;
    /**
     * The angular damping of the rigid body.
     *
     * **Category:** Physics
     */
    get angularDamping(): number;
    /**
     * The angular velocity of the rigid body.
     *
     * **Category:** Physics
     */
    get angularVelocity(): Vector3Like;
    /**
     * The colliders of the rigid body.
     *
     * **Category:** Physics
     */
    get colliders(): Set<Collider>;
    /**
     * The dominance group of the rigid body.
     *
     * **Category:** Physics
     */
    get dominanceGroup(): number;
    /**
     * The direction from the rotation of the rigid body. (-Z identity)
     *
     * **Category:** Physics
     */
    get directionFromRotation(): Vector3Like;
    /**
     * The effective angular inertia of the rigid body.
     *
     * **Category:** Physics
     */
    get effectiveAngularInertia(): SpdMatrix3 | undefined;
    /**
     * The effective inverse mass of the rigid body.
     *
     * **Category:** Physics
     */
    get effectiveInverseMass(): Vector3Like | undefined;
    /**
     * The enabled axes of rotational movement of the rigid body.
     *
     * **Category:** Physics
     */
    get enabledRotations(): Vector3Boolean;
    /**
     * The enabled axes of positional movement of the rigid body.
     *
     * **Category:** Physics
     */
    get enabledPositions(): Vector3Boolean;
    /**
     * The gravity scale of the rigid body.
     *
     * **Category:** Physics
     */
    get gravityScale(): number;
    /**
     * The inverse mass of the rigid body.
     *
     * **Category:** Physics
     */
    get inverseMass(): number | undefined;
    /**
     * Whether the rigid body has continuous collision detection enabled.
     *
     * **Category:** Physics
     */
    get isCcdEnabled(): boolean;
    /**
     * Whether the rigid body is dynamic.
     *
     * **Category:** Physics
     */
    get isDynamic(): boolean;
    /**
     * Whether the rigid body is enabled.
     *
     * **Category:** Physics
     */
    get isEnabled(): boolean;
    /**
     * Whether the rigid body is fixed.
     *
     * **Category:** Physics
     */
    get isFixed(): boolean;
    /**
     * Whether the rigid body is kinematic.
     *
     * **Category:** Physics
     */
    get isKinematic(): boolean;
    /**
     * Whether the rigid body is kinematic position based.
     *
     * **Category:** Physics
     */
    get isKinematicPositionBased(): boolean;
    /**
     * Whether the rigid body is kinematic velocity based.
     *
     * **Category:** Physics
     */
    get isKinematicVelocityBased(): boolean;
    /**
     * Whether the rigid body is moving.
     *
     * **Category:** Physics
     */
    get isMoving(): boolean;
    /**
     * Whether the rigid body has been removed from the simulation.
     *
     * **Category:** Physics
     */
    get isRemoved(): boolean;
    /**
     * Whether the rigid body is simulated.
     *
     * **Category:** Physics
     */
    get isSimulated(): boolean;
    /**
     * Whether the rigid body is sleeping.
     *
     * **Category:** Physics
     */
    get isSleeping(): boolean;
    /**
     * The linear damping of the rigid body.
     *
     * **Category:** Physics
     */
    get linearDamping(): number;
    /**
     * The linear velocity of the rigid body.
     *
     * **Category:** Physics
     */
    get linearVelocity(): Vector3Like;
    /**
     * The local center of mass of the rigid body.
     *
     * **Category:** Physics
     */
    get localCenterOfMass(): Vector3Like;
    /**
     * The mass of the rigid body.
     *
     * **Category:** Physics
     */
    get mass(): number;
    /**
     * The next kinematic rotation of the rigid body.
     *
     * **Category:** Physics
     */
    get nextKinematicRotation(): QuaternionLike;
    /**
     * The next kinematic position of the rigid body.
     *
     * **Category:** Physics
     */
    get nextKinematicPosition(): Vector3Like;
    /**
     * The number of colliders in the rigid body.
     *
     * **Category:** Physics
     */
    get numColliders(): number;
    /**
     * The principal angular inertia of the rigid body.
     *
     * **Category:** Physics
     */
    get principalAngularInertia(): Vector3Like;
    /**
     * The principal angular inertia local frame of the rigid body.
     *
     * **Category:** Physics
     */
    get principalAngularInertiaLocalFrame(): QuaternionLike | undefined;
    /**
     * The position of the rigid body.
     *
     * **Category:** Physics
     */
    get position(): Vector3Like;
    /**
     * The raw RAPIER rigid body instance.
     *
     * **Category:** Physics
     */
    get rawRigidBody(): RAPIER.RigidBody | undefined;
    /**
     * The rotation of the rigid body.
     *
     * **Category:** Physics
     */
    get rotation(): QuaternionLike;
    /**
     * The soft continuous collision detection prediction of the rigid body.
     *
     * **Category:** Physics
     */
    get softCcdPrediction(): number;
    /**
     * The type of the rigid body.
     *
     * **Category:** Physics
     */
    get type(): RigidBodyType;
    /**
     * The world center of mass of the rigid body.
     *
     * **Category:** Physics
     */
    get worldCenterOfMass(): Vector3Like | undefined;
    /**
     * Sets the additional mass of the rigid body.
     * @param additionalMass - The additional mass of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setAdditionalMass(additionalMass: number): void;
    /**
     * Sets the additional mass properties of the rigid body.
     * @param additionalMassProperties - The additional mass properties of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setAdditionalMassProperties(additionalMassProperties: RigidBodyAdditionalMassProperties): void;
    /**
     * Sets the additional solver iterations of the rigid body.
     * @param solverIterations - The additional solver iterations of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setAdditionalSolverIterations(solverIterations: number): void;
    /**
     * Sets the angular damping of the rigid body.
     * @param angularDamping - The angular damping of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setAngularDamping(angularDamping: number): void;
    /**
     * Sets the angular velocity of the rigid body.
     * @param angularVelocity - The angular velocity of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setAngularVelocity(angularVelocity: Vector3Like): void;
    /**
     * Sets whether the rigid body has continuous collision detection enabled.
     * @param ccdEnabled - Whether the rigid body has continuous collision detection enabled.
     *
     *
     * **Category:** Physics
     */
    setCcdEnabled(ccdEnabled: boolean): void;
    /**
     * Sets the dominance group of the rigid body.
     * @param dominanceGroup - The dominance group of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setDominanceGroup(dominanceGroup: number): void;
    /**
     * Sets whether the rigid body is enabled.
     * @param enabled - Whether the rigid body is enabled.
     *
     *
     * **Category:** Physics
     */
    setEnabled(enabled: boolean): void;
    /**
     * Sets whether the rigid body has enabled positional movement.
     * @param enabledPositions - Whether the rigid body has enabled positional movement.
     *
     *
     * **Category:** Physics
     */
    setEnabledPositions(enabledPositions: Vector3Boolean): void;
    /**
     * Sets whether the rigid body has enabled rotations.
     * @param enabledRotations - Whether the rigid body has enabled rotations.
     *
     *
     * **Category:** Physics
     */
    setEnabledRotations(enabledRotations: Vector3Boolean): void;
    /**
     * Sets the gravity scale of the rigid body.
     * @param gravityScale - The gravity scale of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setGravityScale(gravityScale: number): void;
    /**
     * Sets the linear damping of the rigid body.
     * @param linearDamping - The linear damping of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setLinearDamping(linearDamping: number): void;
    /**
     * Sets the linear velocity of the rigid body.
     * @param linearVelocity - The linear velocity of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setLinearVelocity(linearVelocity: Vector3Like): void;
    /**
     * Sets the next kinematic rotation of the rigid body.
     *
     * Use for: kinematic bodies driven by explicit rotation each tick.
     * Do NOT use for: dynamic bodies; use torque or angular velocity instead.
     *
     * @param nextKinematicRotation - The next kinematic rotation of the rigid body.
     *
     * **Requires:** Rigid body must be kinematic.
     *
     * **Category:** Physics
     */
    setNextKinematicRotation(nextKinematicRotation: QuaternionLike): void;
    /**
     * Sets the next kinematic position of the rigid body.
     *
     * Use for: kinematic bodies driven by explicit position each tick.
     * Do NOT use for: dynamic bodies; use forces or velocity instead.
     *
     * @param nextKinematicPosition - The next kinematic position of the rigid body.
     *
     * **Requires:** Rigid body must be kinematic.
     *
     * **Category:** Physics
     */
    setNextKinematicPosition(nextKinematicPosition: Vector3Like): void;
    /**
     * Sets the position of the rigid body.
     *
     * @remarks
     * This teleports the body to the given position. For smooth motion,
     * prefer velocities or forces (dynamic) or next kinematic targets (kinematic).
     *
     * @param position - The position of the rigid body.
     *
     * **Category:** Physics
     */
    setPosition(position: Vector3Like): void;
    /**
     * Sets the rotation of the rigid body.
     *
     * @remarks
     * **Coordinate system:** Identity rotation (0,0,0,1 quaternion) means facing -Z.
     * For Y-axis rotation only (yaw), use: `{ x: 0, y: sin(yaw/2), z: 0, w: cos(yaw/2) }`.
     * A yaw of 0 faces -Z, positive yaw rotates counter-clockwise when viewed from above.
     *
     * This sets rotation immediately. For smooth rotation, use angular velocity (dynamic)
     * or next kinematic rotation (kinematic).
     *
     * @param rotation - The rotation of the rigid body.
     *
     * **Category:** Physics
     */
    setRotation(rotation: QuaternionLike): void;
    /**
     * Sets whether the rigid body is sleeping.
     * @param sleeping - Whether the rigid body is sleeping.
     *
     *
     * **Category:** Physics
     */
    setSleeping(sleeping: boolean): void;
    /**
     * Sets the soft ccd prediction of the rigid body.
     * @param softCcdPrediction - The soft ccd prediction of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setSoftCcdPrediction(softCcdPrediction: number): void;
    /**
     * Sets the collision groups for solid colliders (non-sensor) of the rigid body.
     * @param collisionGroups - The collision groups for solid colliders of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setCollisionGroupsForSolidColliders(collisionGroups: CollisionGroups): void;
    /**
     * Sets the collision groups for sensor colliders of the rigid body.
     * @param collisionGroups - The collision groups for sensor colliders of the rigid body.
     *
     *
     * **Category:** Physics
     */
    setCollisionGroupsForSensorColliders(collisionGroups: CollisionGroups): void;
    /**
     * Sets the type of the rigid body.
     *
     * Use for: switching between dynamic, fixed, and kinematic behavior.
     * Do NOT use for: per-tick motion changes; prefer velocity or forces.
     *
     * @param type - The type of the rigid body.
     *
     * **Category:** Physics
     */
    setType(type: RigidBodyType): void;
    /**
     * Adds a force to the rigid body.
     *
     * @remarks
     * Dynamic bodies only; has no effect on fixed or kinematic bodies.
     *
     * @param force - The force to add to the rigid body.
     *
     * **Category:** Physics
     */
    addForce(force: Vector3Like): void;
    /**
     * Adds a torque to the rigid body.
     *
     * @remarks
     * Dynamic bodies only; has no effect on fixed or kinematic bodies.
     *
     * @param torque - The torque to add to the rigid body.
     *
     * **Category:** Physics
     */
    addTorque(torque: Vector3Like): void;
    /**
     * Adds an unsimulated child collider to the rigid body for the simulation it belongs to.
     * @param collider - The child collider to add to the rigid body for the simulation it belongs to.
     *
     *
     * **Category:** Physics
     */
    addChildColliderToSimulation(collider: Collider): void;
    /**
     * Adds the rigid body to a simulation.
     *
     * @remarks
     * **Child colliders:** Also adds all pending child colliders to the simulation.
     * After this call, the rigid body is simulated and can respond to forces.
     *
     * @param simulation - The simulation to add the rigid body to.
     *
     * **Side effects:** Creates the underlying physics body and registers child colliders.
     *
     * **Category:** Physics
     */
    addToSimulation(simulation: Simulation): void;
    /**
     * Applies an impulse to the rigid body.
     *
     * @remarks
     * Dynamic bodies only; has no effect on fixed or kinematic bodies.
     *
     * @param impulse - The impulse to apply to the rigid body.
     *
     * **Category:** Physics
     */
    applyImpulse(impulse: Vector3Like): void;
    /**
     * Applies an impulse to the rigid body at a point.
     *
     * @remarks
     * Dynamic bodies only; has no effect on fixed or kinematic bodies.
     *
     * @param impulse - The impulse to apply to the rigid body.
     * @param point - The point at which to apply the impulse.
     *
     * **Category:** Physics
     */
    applyImpulseAtPoint(impulse: Vector3Like, point: Vector3Like): void;
    /**
     * Applies a torque impulse to the rigid body.
     *
     * @remarks
     * Dynamic bodies only; has no effect on fixed or kinematic bodies.
     *
     * @param impulse - The torque impulse to apply to the rigid body.
     *
     * **Category:** Physics
     */
    applyTorqueImpulse(impulse: Vector3Like): void;
    /**
     * Creates and adds a child collider to the rigid body for the simulation it belongs to.
     *
     * @remarks
     * If the rigid body is not simulated, the collider will be added to the rigid body as a pending child collider
     * and also simulated when the rigid body is simulated.
     *
     * @param colliderOptions - The options for the child collider to add.
     * @returns The child collider that was added to the rigid body, or null if failed.
     *
     *
     * **Category:** Physics
     */
    createAndAddChildCollider(colliderOptions: ColliderOptions): Collider | null;
    /**
     * Creates and adds multiple child colliders to the rigid body for the simulation it belongs to.
     *
     * @remarks
     * If the rigid body is not simulated, the colliders will be added to the rigid body as pending child colliders
     * and also simulated when the rigid body is simulated.
     *
     * @param colliderOptions - The options for the child colliders to add to the rigid body.
     * @returns The child colliders that were added to the rigid body.
     *
     *
     * **Category:** Physics
     */
    createAndAddChildColliders(colliderOptions: ColliderOptions[]): Collider[];
    /**
     * Gets the colliders of the rigid body by tag.
     * @param tag - The tag to filter by.
     * @returns The colliders of the rigid body with the given tag.
     *
     *
     * **Category:** Physics
     */
    getCollidersByTag(tag: string): Collider[];

    /**
     * Locks all rotations of the rigid body.
     *
     *
     * **Category:** Physics
     */
    lockAllRotations(): void;
    /**
     * Locks all positional movement of the rigid body.
     *
     *
     * **Category:** Physics
     */
    lockAllPositions(): void;
    /**
     * Removes the rigid body from the simulation it belongs to.
     *
     * @remarks
     * **Child colliders:** Also removes all child colliders from the simulation.
     *
     * **Side effects:** Unregisters the rigid body and all attached colliders.
     *
     * **Category:** Physics
     */
    removeFromSimulation(): void;

    /**
     * Resets the angular velocity of the rigid body.
     *
     *
     * **Category:** Physics
     */
    resetAngularVelocity(): void;
    /**
     * Resets the forces actiong on the rigid body.
     *
     *
     * **Category:** Physics
     */
    resetForces(): void;
    /**
     * Resets the linear velocity of the rigid body.
     *
     *
     * **Category:** Physics
     */
    resetLinearVelocity(): void;
    /**
     * Resets the torques acting on the rigid body.
     *
     *
     * **Category:** Physics
     */
    resetTorques(): void;
    /**
     * Explicitly puts the rigid body to sleep. Physics otherwise optimizes sleeping.
     *
     *
     * **Category:** Physics
     */
    sleep(): void;
    /**
     * Wakes up the rigid body. Physics otherwise optimizes waking it when necessary.
     *
     *
     * **Category:** Physics
     */
    wakeUp(): void;












}

/**
 * Additional mass properties for a RigidBody. @public
 *
 * **Category:** Physics
 */
export declare type RigidBodyAdditionalMassProperties = {
    additionalMass: number;
    centerOfMass: Vector3Like;
    principalAngularInertia: Vector3Like;
    principalAngularInertiaLocalFrame: QuaternionLike;
};

/**
 * The options for a rigid body. @public
 *
 * Use for: constructing rigid bodies; choose an option type matching `RigidBodyType`.
 * Do NOT use for: runtime changes; use `RigidBody` methods instead.
 *
 * **Category:** Physics
 */
export declare type RigidBodyOptions = DynamicRigidBodyOptions | FixedRigidBodyOptions | KinematicPositionRigidBodyOptions | KinematicVelocityRigidBodyOptions;

/**
 * The types a RigidBody can be. @public
 *
 * **Category:** Physics
 */
export declare enum RigidBodyType {
    DYNAMIC = "dynamic",
    FIXED = "fixed",
    KINEMATIC_POSITION = "kinematic_position",
    KINEMATIC_VELOCITY = "kinematic_velocity"
}

/**
 * The options for a round cylinder collider. @public
 *
 * Use for: rounded cylinder colliders.
 * Do NOT use for: other shapes; use the matching collider option type.
 *
 * **Category:** Physics
 */
export declare interface RoundCylinderColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.ROUND_CYLINDER;
    /**
     * The border radius of the round cylinder collider.
     *
     * **Category:** Physics
     */
    borderRadius?: number;
    /**
     * The half height of the round cylinder collider.
     *
     * **Category:** Physics
     */
    halfHeight?: number;
    /**
     * The radius of the round cylinder collider.
     *
     * **Category:** Physics
     */
    radius?: number;
}

/**
 * UI rendered within the 3D space of a world's
 * game scene.
 *
 * @remarks
 * SceneUI instances are created directly as instances.
 * They support a variety of configuration options through
 * the `SceneUIOptions` constructor argument.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under `SceneUIEventPayloads`
 *
 * @example
 * ```typescript
 * const sceneUI = new SceneUI({
 *   templateId: 'player-health-bar',
 *   attachedToEntity: playerEntity,
 *   offset: { x: 0, y: 1, z: 0 },
 * });
 * ```
 *
 * **Category:** UI
 * @public
 */
export declare class SceneUI extends EventRouter implements protocol.Serializable {








    /**
     * @param options - The options for the SceneUI instance.
     */
    constructor(options: SceneUIOptions);
    /** The unique identifier for the SceneUI. */
    get id(): number | undefined;
    /** The entity to which the SceneUI is attached if explicitly set. */
    get attachedToEntity(): Entity | undefined;
    /** Whether the SceneUI is loaded into the world. */
    get isLoaded(): boolean;
    /** The offset of the SceneUI from the attached entity or position. */
    get offset(): Vector3Like | undefined;
    /** The position of the SceneUI in the world if explicitly set. */
    get position(): Vector3Like | undefined;
    /** The state of the SceneUI. */
    get state(): Readonly<object>;
    /** The template ID of the SceneUI. */
    get templateId(): string;
    /** The maximum view distance the SceneUI will be visible to the player. */
    get viewDistance(): number | undefined;
    /** The world the SceneUI is loaded into. */
    get world(): World | undefined;
    /**
     * Loads the SceneUI into the world.
     *
     * @remarks
     * **Requires spawned entity:** If attached to an entity, the entity must be spawned first.
     *
     * @param world - The world to load the SceneUI into.
     */
    load(world: World): void;
    /**
     * Sets the entity to which the SceneUI is attached, following its position.
     *
     * @remarks
     * **Clears position:** Clears any set position (mutual exclusivity).
     *
     * @param entity - The entity to attach the SceneUI to.
     */
    setAttachedToEntity(entity: Entity): void;
    /**
     * Sets the spatial offset of the SceneUI relative to the attached entity or position.
     *
     * @param offset - The offset in the world.
     */
    setOffset(offset: Vector3Like): void;
    /**
     * Sets the position of the SceneUI.
     *
     * @remarks
     * **Detaches entity:** Detaches from any attached entity (mutual exclusivity).
     *
     * @param position - The position in the world.
     */
    setPosition(position: Vector3Like): void;
    /**
     * Sets the state of the SceneUI by performing a shallow merge with existing state.
     *
     * @param state - The state to set.
     */
    setState(state: object): void;
    /**
     * Sets the view distance of the SceneUI.
     *
     * @param viewDistance - The view distance in the world.
     */
    setViewDistance(viewDistance: number): void;
    /**
     * Unloads the SceneUI from the world.
     */
    unload(): void;

}

/**
 * Event types a SceneUI instance can emit.
 *
 * See `SceneUIEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum SceneUIEvent {
    LOAD = "SCENE_UI.LOAD",
    SET_ATTACHED_TO_ENTITY = "SCENE_UI.SET_ATTACHED_TO_ENTITY",
    SET_OFFSET = "SCENE_UI.SET_OFFSET",
    SET_POSITION = "SCENE_UI.SET_POSITION",
    SET_STATE = "SCENE_UI.SET_STATE",
    SET_VIEW_DISTANCE = "SCENE_UI.SET_VIEW_DISTANCE",
    UNLOAD = "SCENE_UI.UNLOAD"
}

/**
 * Event payloads for SceneUI emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface SceneUIEventPayloads {
    /** Emitted when a SceneUI is loaded into the world. */
    [SceneUIEvent.LOAD]: {
        sceneUI: SceneUI;
    };
    /** Emitted when a SceneUI is attached to an entity. */
    [SceneUIEvent.SET_ATTACHED_TO_ENTITY]: {
        sceneUI: SceneUI;
        entity: Entity;
    };
    /** Emitted when the offset of a SceneUI is set. */
    [SceneUIEvent.SET_OFFSET]: {
        sceneUI: SceneUI;
        offset: Vector3Like;
    };
    /** Emitted when the position of a SceneUI is set. */
    [SceneUIEvent.SET_POSITION]: {
        sceneUI: SceneUI;
        position: Vector3Like;
    };
    /** Emitted when the state of a SceneUI is set. */
    [SceneUIEvent.SET_STATE]: {
        sceneUI: SceneUI;
        state: object;
    };
    /** Emitted when the view distance of a SceneUI is set. */
    [SceneUIEvent.SET_VIEW_DISTANCE]: {
        sceneUI: SceneUI;
        viewDistance: number;
    };
    /** Emitted when a SceneUI is unloaded from the world. */
    [SceneUIEvent.UNLOAD]: {
        sceneUI: SceneUI;
    };
}

/**
 * Manages SceneUI instances in a world.
 *
 * When to use: querying or bulk-unloading scene UI elements in a world.
 * Do NOT use for: player HUD/menus; use `PlayerUI` for per-player UI.
 *
 * @remarks
 * The SceneUIManager is created internally per `World` instance.
 * Pattern: load scene UI for world objects and unload them when entities despawn.
 *
 * **Category:** UI
 * @public
 */
export declare class SceneUIManager {




    /**
     * The world the SceneUIManager is for.
     *
     * **Category:** UI
     */
    get world(): World;
    /**
     * Retrieves all loaded SceneUI instances for the world.
     *
     * @returns An array of SceneUI instances.
     *
     * **Category:** UI
     */
    getAllSceneUIs(): SceneUI[];
    /**
     * Retrieves all loaded SceneUI instances attached to a specific entity.
     *
     * Use for: cleanup or inspection of entity-bound scene UI.
     *
     * @param entity - The entity to get attached SceneUI instances for.
     * @returns An array of SceneUI instances.
     *
     * **Requires:** Entity should belong to this world for meaningful results.
     *
     * @see `SceneUIManager.unloadEntityAttachedSceneUIs`
     *
     * **Category:** UI
     */
    getAllEntityAttachedSceneUIs(entity: Entity): SceneUI[];
    /**
     * Retrieves a SceneUI instance by its unique identifier (id).
     *
     * @param id - The unique identifier (id) of the SceneUI to retrieve.
     * @returns The SceneUI instance if found, otherwise undefined.
     *
     * **Category:** UI
     */
    getSceneUIById(id: number): SceneUI | undefined;

    /**
     * Unloads and unregisters all SceneUI instances attached to a specific entity.
     *
     * @remarks
     * **Cleanup:** Calls `SceneUI.unload` on each attached SceneUI.
     *
     * @param entity - The entity to unload and unregister SceneUI instances for.
     *
     * **Requires:** Entity should belong to this world for meaningful results.
     *
     * **Side effects:** Unloads any attached scene UI and removes it from manager tracking.
     *
     * @see `SceneUIManager.getAllEntityAttachedSceneUIs`
     *
     * **Category:** UI
     */
    unloadEntityAttachedSceneUIs(entity: Entity): void;

}

/**
 * Options for creating a SceneUI instance.
 *
 * Use for: configuring scene UI before `SceneUI.load`.
 * Do NOT use for: runtime updates after load; use `SceneUI.set*` methods.
 *
 * **Category:** UI
 * @public
 */
export declare interface SceneUIOptions {
    /** If set, SceneUI will follow the entity's position */
    attachedToEntity?: Entity;
    /** The offset of the SceneUI from the attached entity or position */
    offset?: Vector3Like;
    /** If set, SceneUI will be attached at this position */
    position?: Vector3Like;
    /** The state of the SceneUI */
    state?: object;
    /** The template ID to use for this SceneUI */
    templateId: string;
    /** The maximum view distance the SceneUI will be visible to the player */
    viewDistance?: number;
}

/**
 * A simple entity controller with basic movement functions.
 *
 * When to use: straightforward movement and facing without pathfinding.
 * Do NOT use for: obstacle-aware movement; use `PathfindingEntityController`.
 *
 * @remarks
 * This class provides straight-line movement and yaw-only facing. It is compatible
 * with kinematic or dynamic rigid bodies.
 *
 * <h2>Coordinate System & Model Orientation</h2>
 *
 * HYTOPIA uses **-Z as forward**. Models must be authored with their front facing -Z.
 * When `face()` rotates an entity to look at a target, it orients the entity's -Z axis toward that target.
 * A yaw of 0 means facing -Z.
 *
 * @example
 * ```typescript
 * // Create a custom entity controller for myEntity, prior to spawning it.
 * myEntity.setController(new SimpleEntityController());
 *
 * // Spawn the entity in the world.
 * myEntity.spawn(world, { x: 53, y: 10, z: 23 });
 *
 * // Move the entity at a speed of 4 blocks
 * // per second to the coordinate (10, 1, 10).
 * // console.log when we reach the target.
 * myEntity.controller.move({ x: 10, y: 1, z: 10 }, 4, {
 *   moveCompleteCallback: endPosition => {
 *     console.log('Finished moving to', endPosition);
 *   },
 * });
 * ```
 *
 * **Category:** Controllers
 * @public
 */
export declare class SimpleEntityController extends BaseEntityController {
    /** The speed at which to rotate to the target coordinate when facing. Can be altered while facing. */
    private faceSpeed;
    /** The animations to loop when the entity is idle. */
    idleLoopedAnimations: string[];
    /** The speed at which to loop the idle animations. */
    idleLoopedAnimationsSpeed: number | undefined;
    /** The animations to play when the entity jumps. */
    jumpOneshotAnimations: string[];
    /** The animations to loop when the entity is moving. */
    moveLoopedAnimations: string[];
    /** The speed at which to loop the move animations. */
    moveLoopedAnimationsSpeed: number | undefined;
    /** The speed at which to move the entity. Can be altered while moving. */
    moveSpeed: number;
















    /**
     * @param options - Options for the controller.
     *
     * **Category:** Controllers
     */
    constructor(options?: SimpleEntityControllerOptions);
    /**
     * Override of the `BaseEntityController.spawn` method. Starts
     * the set idle animations (if any) when the entity is spawned.
     *
     * @remarks
     * **Auto-starts idle animations:** Calls `_startIdleAnimations()` which stops move/jump animations
     * and starts the configured `idleLoopedAnimations`.
     *
     * @param entity - The entity that was spawned.
     *
     * **Category:** Controllers
     */
    spawn(entity: Entity): void;
    /**
     * Rotates the entity at a given speed to face a target coordinate.
     *
     * Use for: turning an entity to look at a target without moving it.
     * Do NOT use for: pitch/roll orientation; this rotates yaw only.
     *
     * @remarks
     * **-Z forward:** Orients the entity so its **-Z axis** points toward the target.
     * Models must be authored with their front facing -Z for correct orientation.
     *
     * **Replaces previous target:** If called while already facing, the previous target is discarded
     * and the entity starts facing the new target. There is no queue.
     *
     * **Y-axis only:** Only rotates around the Y-axis (yaw). Does not pitch up/down to face targets
     * at different heights.
     *
     * @param target - The target coordinate to face.
     * @param speed - The speed at which to rotate to the target coordinate (radians per second).
     * @param options - Additional options for the face operation, such as callbacks.
     *
     * **Category:** Controllers
     */
    face(target: Vector3Like, speed: number, options?: FaceOptions): void;
    /**
     * Applies an upwards impulse to the entity to simulate a jump, only supported
     * for entities with dynamic rigid body types.
     *
     * Use for: a single jump impulse for dynamic entities.
     * Do NOT use for: kinematic entities; this has no effect.
     *
     * @remarks
     * **Deferred:** The impulse is applied on the next tick, not immediately.
     *
     * **Dynamic only:** Has no effect on kinematic entities. Uses `entity.applyImpulse()`.
     *
     * **Animations:** Starts `jumpOneshotAnimations` and stops idle/move animations when the jump occurs.
     *
     * @param height - The height to jump to (in blocks).
     *
     * **Category:** Controllers
     */
    jump(height: number): void;
    /**
     * Moves the entity at a given speed in a straight line to a target coordinate.
     *
     * Use for: simple straight-line movement.
     * Do NOT use for: obstacle avoidance; use `PathfindingEntityController`.
     *
     * @remarks
     * **Position only:** This method only changes position, not rotation. Use `face()` simultaneously
     * to rotate the entity toward its movement direction (-Z forward).
     *
     * **Replaces previous target:** If called while already moving, the previous target is discarded
     * and the entity starts moving to the new target. There is no queue.
     *
     * **Straight line:** Moves directly toward target using `entity.setPosition()`. Does not pathfind
     * around obstacles.
     *
     * **Animations:** Starts `moveLoopedAnimations` on the first tick of movement. When complete,
     * starts `idleLoopedAnimations` (unless `moveStartIdleAnimationsOnCompletion` is false).
     *
     * @param target - The target coordinate to move to.
     * @param speed - The speed at which to move to the target coordinate (blocks per second).
     * @param options - Additional options for the move operation, such as callbacks.
     *
     * **Category:** Controllers
     */
    move(target: Vector3Like, speed: number, options?: MoveOptions): void;
    /**
     * Stops the entity from attempting to face a target coordinate.
     *
     * @remarks
     * **Deferred:** Takes effect on the next tick. The `faceCompleteCallback` will still be called.
     *
     * **Category:** Controllers
     */
    stopFace(): void;
    /**
     * Stops the entity from continuing to move to its current target coordinate.
     *
     * @remarks
     * **Deferred:** Takes effect on the next tick. The `moveCompleteCallback` will still be called
     * and idle animations will start (unless `moveStartIdleAnimationsOnCompletion` was false).
     *
     * **Category:** Controllers
     */
    stopMove(): void;




}

/**
 * Options for creating a SimpleEntityController instance.
 *
 * Use for: default movement/animation settings at construction time.
 * Do NOT use for: per-move overrides; use `MoveOptions`.
 *
 * **Category:** Controllers
 * @public
 */
declare interface SimpleEntityControllerOptions {
    /** The animations to loop when the entity is idle. */
    idleLoopedAnimations?: string[];
    /** The speed at which to loop the idle animations. */
    idleLoopedAnimationsSpeed?: number;
    /** The animations to play when the entity jumps. */
    jumpOneshotAnimations?: string[];
    /** The animations to loop when the entity is moving. */
    moveLoopedAnimations?: string[];
    /** The speed at which to loop the move animations. */
    moveLoopedAnimationsSpeed?: number;
}

/**
 * Represents the physics simulation for a world.
 *
 * When to use: advanced physics queries, custom gravity, or debug rendering.
 * Do NOT use for: typical movement; use entity/rigid body APIs instead.
 *
 * @remarks
 * Access via `World.simulation`. The simulation drives all collision and contact
 * events for blocks and entities.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `SimulationEventPayloads`.
 *
 * **Category:** Physics
 * @public
 */
export declare class Simulation extends EventRouter {









    /**
     * Whether debug raycasting is enabled.
     *
     * **Category:** Physics
     */
    get isDebugRaycastingEnabled(): boolean;
    /**
     * Whether debug rendering is enabled.
     *
     * **Category:** Physics
     */
    get isDebugRenderingEnabled(): boolean;
    /**
     * The gravity vector for the simulation.
     *
     * **Category:** Physics
     */
    get gravity(): RAPIER.Vector3;
    /**
     * The fixed timestep for the simulation.
     *
     * **Category:** Physics
     */
    get timestepS(): number;
    /**
     * The world this simulation belongs to.
     *
     * **Category:** Physics
     */
    get world(): World;


    /**
     * Enables or disables debug raycasting for the simulation.
     *
     * @remarks
     * When enabled, raycasts emit `SimulationEvent.DEBUG_RAYCAST` for visualization.
     *
     * @param enabled - Whether to enable debug raycasting.
     *
     * **Side effects:** Emits debug raycast events when `Simulation.raycast` is called.
     *
     * **Category:** Physics
     */
    enableDebugRaycasting(enabled: boolean): void;
    /**
     * Enables or disables debug rendering for the simulation.
     *
     * @remarks
     * When enabled, all colliders and rigid body outlines are rendered.
     * Avoid enabling in production; it can cause noticeable lag.
     *
     * @param enabled - Whether to enable debug rendering.
     * @param filterFlags - Optional query filter flags for debug rendering.
     *
     * **Side effects:** Emits `SimulationEvent.DEBUG_RENDER` each step while enabled.
     *
     * **Category:** Physics
     */
    enableDebugRendering(enabled: boolean, filterFlags?: RAPIER.QueryFilterFlags): void;
    /**
     * Gets the contact manifolds for a pair of colliders.
     *
     * @remarks
     * Returns an empty array for sensor contacts (sensors do not generate manifolds).
     *
     * @param colliderHandleA - The handle of the first collider.
     * @param colliderHandleB - The handle of the second collider.
     * @returns The contact manifolds, or an empty array if no contact.
     *
     * **Category:** Physics
     */
    getContactManifolds(colliderHandleA: RAPIER.ColliderHandle, colliderHandleB: RAPIER.ColliderHandle): ContactManifold[];
    /**
     * Gets the intersections with a raw shape.
     *
     * @remarks
     * `rawShape` can be retrieved from a simulated or unsimulated collider using
     * `Collider.rawShape`.
     *
     * @param rawShape - The raw shape to get intersections with.
     * @param position - The position of the shape.
     * @param rotation - The rotation of the shape.
     * @param options - The options for the intersections.
     * @returns The intersections.
     *
     * **Category:** Physics
     */
    intersectionsWithRawShape(rawShape: RawShape, position: Vector3Like, rotation: QuaternionLike, options?: FilterOptions): IntersectionResult[];
    /**
     * Casts a ray through the simulation and returns the first hit.
     *
     * @remarks
     * The ray stops at the first block or entity hit within the length of the ray.
     *
     * @param origin - The origin of the ray.
     * @param direction - The direction of the ray.
     * @param length - The length of the ray.
     * @param options - The options for the raycast.
     * @returns A RaycastHit object containing the first block or entity hit by the ray, or null if no hit.
     *
     * **Category:** Physics
     */
    raycast(origin: RAPIER.Vector3, direction: RAPIER.Vector3, length: number, options?: RaycastOptions): RaycastHit | null;


    /**
     * Sets the gravity vector for the simulation.
     *
     * @param gravity - The gravity vector.
     *
     * **Side effects:** Changes gravity for all simulated rigid bodies.
     *
     * **Category:** Physics
     */
    setGravity(gravity: RAPIER.Vector3): void;




}

/**
 * Event types a Simulation instance can emit.
 *
 * See `SimulationEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum SimulationEvent {
    STEP_START = "SIMULATION.STEP_START",
    STEP_END = "SIMULATION.STEP_END",
    DEBUG_RAYCAST = "SIMULATION.DEBUG_RAYCAST",
    DEBUG_RENDER = "SIMULATION.DEBUG_RENDER"
}

/**
 * Event payloads for Simulation emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface SimulationEventPayloads {
    /** Emitted when the simulation step starts. */
    [SimulationEvent.STEP_START]: {
        simulation: Simulation;
        tickDeltaMs: number;
    };
    /** Emitted when the simulation step ends. */
    [SimulationEvent.STEP_END]: {
        simulation: Simulation;
        stepDurationMs: number;
    };
    /** Emitted when a debug raycast is performed. */
    [SimulationEvent.DEBUG_RAYCAST]: {
        simulation: Simulation;
        origin: Vector3Like;
        direction: Vector3Like;
        length: number;
        hit: boolean;
    };
    /** Emitted when the simulation debug rendering is enabled. */
    [SimulationEvent.DEBUG_RENDER]: {
        simulation: Simulation;
        vertices: Float32Array;
        colors: Float32Array;
    };
}

/**
 * A 3x3 symmetric positive-definite matrix for spatial dynamics.
 *
 * **Category:** Math
 * @public
 */
export declare interface SpdMatrix3 extends SdpMatrix3 {
}

/**
 * Boots the server runtime, runs your init callback, and starts accepting connections.
 *
 * Use for: normal server startup in your entry file.
 * Do NOT use for: restarting an already running server within the same process.
 *
 * @remarks
 * Initialization order:
 * 1) Physics engine (RAPIER)
 * 2) Block texture atlas preload
 * 3) Model preload
 * 4) Your `init` callback (awaited if async)
 * 5) Server starts accepting connections
 *
 * If `init` declares a `world` parameter, a default world is created and provided.
 *
 * @param init - Game initialization callback. It can be sync or async. If it accepts a
 * world parameter, the default world is created and passed in.
 *
 * **Requires:** Call once per process before using gameplay systems.
 *
 * @see `GameServer`
 * @see `WorldManager.getDefaultWorld`
 *
 * **Category:** Core
 * @public
 */
export declare function startServer(init: ((() => void | Promise<void>) | ((world: World) => void | Promise<void>))): void;

/**
 * The inputs that are included in `PlayerInput`.
 *
 * **Category:** Players
 * @public
 */
export declare const SUPPORTED_INPUTS: readonly ["w", "a", "s", "d", "sp", "sh", "tb", "ml", "mr", "q", "e", "r", "f", "z", "x", "c", "v", "u", "i", "o", "j", "k", "l", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "cp", "cy", "iro", "ird", "jd"];

/**
 * Manages performance telemetry and error tracking through your Sentry account.
 *
 * When to use: profiling and diagnosing slow ticks or runtime errors in production.
 * Do NOT use for: high-volume custom metrics; use a dedicated metrics pipeline instead.
 *
 * @remarks
 * Provides low-overhead performance monitoring and error tracking via Sentry.
 * The system only sends telemetry data when errors or slow-tick performance issues are detected.
 *
 * Pattern: initialize once at server startup and wrap critical sections with `Telemetry.startSpan`.
 * Anti-pattern: creating spans inside tight loops without filtering.
 *
 * @example
 * ```typescript
 * // Initialize Sentry for production telemetry
 * Telemetry.initializeSentry('MY_SENTRY_PROJECT_DSN');
 *
 * // Wrap performance-critical code in spans
 * Telemetry.startSpan({
 *   operation: TelemetrySpanOperation.CUSTOM_OPERATION,
 *   attributes: {
 *     playerCount: world.playerManager.connectedPlayers.length,
 *     entityCount: world.entityManager.entityCount,
 *   },
 * }, () => {
 *   performExpensiveOperation();
 * });
 *
 * // Get current process statistics
 * const stats = Telemetry.getProcessStats();
 * console.log(`Heap usage: ${stats.jsHeapUsagePercent * 100}%`);
 * ```
 *
 * **Category:** Telemetry
 * @public
 */
export declare class Telemetry {
    /**
     * Gets current process memory and performance statistics.
     *
     * @param asMeasurement - Whether to return data in Sentry measurement format with units.
     * @returns Process statistics including heap usage, RSS memory, and capacity metrics.
     *
     * **Category:** Telemetry
     */
    static getProcessStats(asMeasurement?: boolean): Record<string, any>;
    /**
     * Initializes Sentry telemetry with the provided DSN.
     *
     * @remarks
     * This method configures Sentry for error tracking and performance monitoring.
     * It sets up filtering to only send performance spans that exceed the
     * provided threshold duration, reducing noise and costs. The initialization
     * includes game-specific tags and process statistics attachment.
     *
     * @param sentryDsn - The Sentry Data Source Name (DSN) for your project.
     * @param tickTimeMsThreshold - The tick duration that must be exceeded to
     * send a performance span to Sentry for a given tick. Defaults to 50ms.
     *
     * **Requires:** A valid Sentry DSN and network access.
     *
     * **Side effects:** Initializes the Sentry SDK and registers global hooks.
     *
     * **Category:** Telemetry
     */
    static initializeSentry(sentryDsn: string, tickTimeMsThreshold?: number): void;
    /**
     * Executes a callback function within a performance monitoring span.
     *
     * @remarks
     * This method provides zero-overhead performance monitoring in development
     * environments. In production with Sentry enabled and `SENTRY_ENABLE_TRACING=true`,
     * it creates performance spans for monitoring. The span data is only transmitted
     * to Sentry when performance issues are detected.
     *
     * @param options - Configuration for the telemetry span including operation type and attributes.
     * @param callback - The function to execute within the performance span.
     * @returns The return value of the callback function.
     *
     * @example
     * ```typescript
     * const result = Telemetry.startSpan({
     *   operation: TelemetrySpanOperation.ENTITIES_TICK,
     *   attributes: {
     *     entityCount: entities.length,
     *     worldId: world.id,
     *   },
     * }, () => {
     *   return processEntities(entities);
     * });
     * ```
     *
     * **Category:** Telemetry
     */
    static startSpan<T>(options: TelemetrySpanOptions, callback: (span?: Sentry.Span) => T): T;
    /**
     * Gets the Sentry SDK instance for advanced telemetry operations.
     *
     * @remarks
     * This method provides direct access to the Sentry SDK for operations
     * not covered by the Telemetry wrapper, such as custom error reporting,
     * user context setting, or advanced span manipulation.
     *
     * @returns The Sentry SDK instance.
     *
     * **Category:** Telemetry
     */
    static sentry(): typeof Sentry;
}

/**
 * Performance telemetry span operation types.
 *
 * **Category:** Telemetry
 * @public
 */
export declare enum TelemetrySpanOperation {
    BUILD_PACKETS = "build_packets",
    ENTITIES_EMIT_UPDATES = "entities_emit_updates",
    ENTITIES_TICK = "entities_tick",
    NETWORK_SYNCHRONIZE = "network_synchronize",
    NETWORK_SYNCHRONIZE_CLEANUP = "network_synchronize_cleanup",
    PHYSICS_CLEANUP = "physics_cleanup",
    PHYSICS_STEP = "physics_step",
    SEND_ALL_PACKETS = "send_all_packets",
    SEND_PACKETS = "send_packets",
    SERIALIZE_FREE_BUFFERS = "serialize_free_buffers",
    SERIALIZE_PACKETS = "serialize_packets",
    SERIALIZE_PACKETS_ENCODE = "serialize_packets_encode",
    SIMULATION_STEP = "simulation_step",
    TICKER_TICK = "ticker_tick",
    WORLD_TICK = "world_tick"
}

/**
 * Options for creating a telemetry span.
 *
 * Use for: configuring `Telemetry.startSpan` calls.
 * Do NOT use for: long-lived spans; keep spans short and scoped to a task.
 *
 * **Category:** Telemetry
 * @public
 */
export declare type TelemetrySpanOptions = {
    /** The operation being measured. */
    operation: TelemetrySpanOperation | string;
    /** Additional attributes to attach to the span for context. */
    attributes?: Record<string, string | number>;
};

/**
 * The options for a trimesh collider. @public
 *
 * Use for: mesh-based colliders from model data.
 * Do NOT use for: simple primitives; prefer analytic shapes when possible.
 *
 * **Category:** Physics
 */
export declare interface TrimeshColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.TRIMESH;
    /**
     * The indices of the trimesh collider.
     *
     * **Category:** Physics
     */
    indices?: Uint32Array;
    /**
     * The vertices of the trimesh collider.
     *
     * **Category:** Physics
     */
    vertices?: Float32Array;
}

/**
 * Represents a 2D vector.
 *
 * When to use: performance-sensitive math in game loops or geometry utilities.
 * Do NOT use for: immutable math; most methods mutate the instance.
 *
 * @remarks
 * All vector methods result in mutation of the vector instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 2-dimensional vector.
 *
 * Pattern: reuse instances (and temporary vectors) to reduce allocations.
 * Anti-pattern: storing references and assuming value semantics.
 *
 * **Category:** Math
 * @public
 */
export declare class Vector2 extends Float32Array implements Vector2Like {
    constructor(x: number, y: number);
    /** The length of the vector. */
    get length(): number;
    /** The squared length of the vector. */
    get squaredLength(): number;
    /** The magnitude of the vector. Alias for `length`. */
    get magnitude(): number;
    /** The squared magnitude of the vector. Alias for `squaredLength`. */
    get squaredMagnitude(): number;
    /** The x-component of the vector. */
    get x(): number;
    set x(value: number);
    /** The y-component of the vector. */
    get y(): number;
    set y(value: number);
    /**
     * Creates a new `Vector2` instance.
     *
     * @returns A new `Vector2` instance.
     */
    static create(): Vector2;
    /**
     * Adds a vector to the current vector.
     *
     * @param vector2 - The vector to add to the current vector.
     * @returns The current vector.
     */
    add(vector2: Vector2): Vector2;
    /**
     * Returns the angle between two vectors.
     *
     * @param vector2 - The vector to compare to the current vector.
     * @returns The angle between the two vectors.
     */
    angle(vector2: Vector2): number;
    /**
     * Rounds each component of the vector up to the nearest integer.
     *
     * @returns The current vector.
     */
    ceil(): Vector2;
    /**
     * Returns a new vector with the same components as the current vector.
     *
     * @returns A new `Vector2` instance.
     */
    clone(): Vector2;
    /**
     * Copies the components of a vector to the current vector.
     *
     * @param vector2 - The vector to copy the components from.
     * @returns The current vector.
     */
    copy(vector2: Vector2): Vector2;
    /**
     * Calculates the distance between the current vector and another vector.
     *
     * @param vector2 - The vector to calculate the distance to.
     * @returns The distance between the two vectors.
     */
    distance(vector2: Vector2): number;
    /**
     * Divides the current vector by another vector.
     *
     * @param vector2 - The vector to divide the current vector by.
     * @returns The current vector.
     */
    divide(vector2: Vector2): Vector2;
    /**
     * Calculates the dot product of the current vector and another vector.
     *
     * @param vector2 - The vector to calculate the dot product with.
     * @returns The dot product of the two vectors.
     */
    dot(vector2: Vector2): number;
    /**
     * Checks if the current vector is approximately equal to another vector.
     *
     * @param vector2 - The vector to compare to the current vector.
     * @returns `true` if the two vectors are equal, `false` otherwise.
     */
    equals(vector2: Vector2): boolean;
    /**
     * Checks if the current vector is exactly equal to another vector.
     *
     * @param vector2 - The vector to compare to the current vector.
     * @returns `true` if the two vectors are equal, `false` otherwise.
     */
    exactEquals(vector2: Vector2): boolean;
    /**
     * Rounds each component of the vector down to the nearest integer.
     *
     * @returns The current vector.
     */
    floor(): Vector2;
    /**
     * Inverts the components of the current vector.
     *
     * @returns The current vector.
     */
    invert(): Vector2;
    /**
     * Linearly interpolates between the current vector and another vector.
     *
     * @param vector2 - The vector to interpolate to.
     * @param t - The interpolation factor. A value between 0 and 1.
     * @returns The current vector.
     */
    lerp(vector2: Vector2, t: number): Vector2;
    /**
     * Sets each component of the vector to the maximum of the current vector and another vector.
     *
     * @param vector2 - The vector to compare to the current vector.
     * @returns The current vector.
     */
    max(vector2: Vector2): Vector2;
    /**
     * Sets each component of the vector to the minimum of the current vector and another vector.
     *
     * @param vector2 - The vector to compare to the current vector.
     * @returns The current vector.
     */
    min(vector2: Vector2): Vector2;
    /**
     * Multiplies each component of the current vector by the corresponding component of another vector.
     *
     * @param vector2 - The vector to multiply the current vector by.
     * @returns The current vector.
     */
    multiply(vector2: Vector2): Vector2;
    /**
     * Negates each component of the vector.
     *
     * @returns The current vector.
     */
    negate(): Vector2;
    /**
     * Normalizes the current vector.
     *
     * @returns The current vector.
     */
    normalize(): Vector2;
    /**
     * Randomizes the components of the current vector.
     *
     * @param scale - The scale of the resulting vector.
     * @returns The current vector.
     */
    randomize(scale?: number): Vector2;
    /**
     * Rotates the current vector around an origin.
     *
     * @param vector2 - The vector to rotate around.
     * @param angle - The angle to rotate the vector by.
     * @returns The current vector.
     */
    rotate(vector2: Vector2, angle: number): Vector2;
    /**
     * Rounds each component of the vector to the nearest integer.
     *
     * @returns The current vector.
     */
    round(): Vector2;
    /**
     * Scales the current vector by a scalar value.
     *
     * @param scale - The scalar value to scale the vector by.
     * @returns The current vector.
     */
    scale(scale: number): Vector2;
    /**
     * Scales the current vector by a scalar value and adds the result to another vector.
     *
     * @param vector2 - The vector to add the scaled vector to.
     * @param scale - The scalar value to scale the vector by.
     * @returns The current vector.
     */
    scaleAndAdd(vector2: Vector2, scale: number): Vector2;
    /**
     * Subtracts a vector from the current vector.
     *
     * @param vector2 - The vector to subtract from the current vector.
     * @returns The current vector.
     */
    subtract(vector2: Vector2): Vector2;
    /**
     * Returns a string representation of the vector in x,y format.
     *
     * @returns A string representation of the vector in the format x,y.
     */
    toString(): string;
    /**
     * Transforms the current vector by a matrix2.
     *
     * @param matrix2 - The matrix2 to transform the vector by.
     * @returns The current vector.
     */
    transformMatrix2(matrix2: Matrix2): Vector2;
    /**
     * Transforms the current vector by a matrix3.
     *
     * @param matrix3 - The matrix3 to transform the vector by.
     * @returns The current vector.
     */
    transformMatrix3(matrix3: Matrix3): Vector2;
    /**
     * Transforms the current vector by a matrix4.
     *
     * @param matrix4 - The matrix4 to transform the vector by.
     * @returns The current vector.
     */
    transformMatrix4(matrix4: Matrix4): Vector2;
    /**
     * Sets each component of the vector to zero.
     *
     * @returns The current vector.
     */
    zero(): Vector2;
}

/**
 * A 2-dimensional vector of boolean values.
 *
 * **Category:** Math
 * @public
 */
export declare interface Vector2Boolean {
    x: boolean;
    y: boolean;
}

/**
 * A 2-dimensional vector.
 *
 * **Category:** Math
 * @public
 */
export declare interface Vector2Like {
    x: number;
    y: number;
}

/**
 * Represents a 3-dimensional vector.
 *
 * When to use: performance-sensitive 3D math and transforms.
 * Do NOT use for: immutable math; most methods mutate the instance.
 *
 * @remarks
 * All vector methods result in mutation of the vector instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 3-dimensional vector.
 *
 * Pattern: reuse instances (and temporary vectors) to reduce allocations.
 * Anti-pattern: storing references and assuming value semantics.
 *
 * **Category:** Math
 * @public
 */
export declare class Vector3 extends Float32Array implements Vector3Like {
    constructor(x: number, y: number, z: number);
    /** The length of the vector. */
    get length(): number;
    /** The squared length of the vector. */
    get squaredLength(): number;
    /** The magnitude of the vector. Alias for `length`. */
    get magnitude(): number;
    /** The squared magnitude of the vector. Alias for `squaredLength`. */
    get squaredMagnitude(): number;
    /** The x-component of the vector. */
    get x(): number;
    set x(value: number);
    /** The y-component of the vector. */
    get y(): number;
    set y(value: number);
    /** The z-component of the vector. */
    get z(): number;
    set z(value: number);
    /**
     * Creates a new `Vector3` instance.
     *
     * @returns A new `Vector3` instance.
     */
    static create(): Vector3;
    /**
     * Creates a new `Vector3` instance from a `Vector3Like` object.
     *
     * @param vector3Like - The `Vector3Like` object to create the `Vector3` instance from.
     * @returns A new `Vector3` instance.
     */
    static fromVector3Like(vector3Like: Vector3Like): Vector3;
    /**
     * Adds a vector to the current vector.
     *
     * @param vector3 - The vector to add to the current vector.
     * @returns The current vector.
     */
    add(vector3: Vector3): Vector3;
    /**
     * Rounds each component of the vector up to the nearest integer.
     *
     * @returns The current vector.
     */
    ceil(): Vector3;
    /**
     * Returns a new vector with the same components as the current vector.
     *
     * @returns A new vector.
     */
    clone(): Vector3;
    /**
     * Copies the components of a vector to the current vector.
     *
     * @param vector3 - The vector to copy the components from.
     * @returns The current vector.
     */
    copy(vector3: Vector3): Vector3;
    /**
     * Calculates the cross product of the current vector and another vector.
     *
     * @param vector3 - The vector to calculate the cross product with.
     * @returns The current vector.
     */
    cross(vector3: Vector3): Vector3;
    /**
     * Calculates the distance between the current vector and another vector.
     *
     * @param vector3 - The vector to calculate the distance to.
     * @returns The distance between the two vectors.
     */
    distance(vector3: Vector3): number;
    /**
     * Divides each component of the current vector by the corresponding component of another vector.
     *
     * @param vector3 - The vector to divide the current vector by.
     * @returns The current vector.
     */
    divide(vector3: Vector3): Vector3;
    /**
     * Returns the dot product of this vector and another vector.
     *
     * @param vector3 - the other vector
     * @returns the dot product of this and vector3
     */
    dot(vector3: Vector3): number;
    /**
     * Checks if the current vector is approximately equal to another vector.
     *
     * @param vector3 - The vector to compare to.
     * @returns A boolean indicating whether the two vectors are approximately equal.
     */
    equals(vector3: Vector3): boolean;
    /**
     * Checks if the current vector is exactly equal to another vector.
     *
     * @param vector3 - The vector to compare to.
     * @returns A boolean indicating whether the two vectors are exactly equal.
     */
    exactEquals(vector3: Vector3): boolean;
    /**
     * Rounds each component of the vector down to the nearest integer.
     *
     * @returns The current vector.
     */
    floor(): Vector3;
    /**
     * Inverts each component of the vector.
     *
     * @returns The current vector.
     */
    invert(): Vector3;
    /**
     * Linearly interpolates between the current vector and another vector.
     *
     * @param vector3 - The vector to interpolate to.
     * @param t - The interpolation factor. A value between 0 and 1.
     * @returns The current vector.
     */
    lerp(vector3: Vector3, t: number): Vector3;
    /**
     * Sets each component of the vector to the maximum of the current vector and another vector.
     *
     * @param vector3 - The vector to compare to.
     * @returns The current vector.
     */
    max(vector3: Vector3): Vector3;
    /**
     * Sets each component of the vector to the minimum of the current vector and another vector.
     *
     * @param vector3 - The vector to compare to.
     * @returns The current vector.
     */
    min(vector3: Vector3): Vector3;
    /**
     * Multiplies each component of the current vector by the corresponding component of another vector.
     *
     * @param vector3 - The vector to multiply the current vector by.
     * @returns The current vector.
     */
    multiply(vector3: Vector3): Vector3;
    /**
     * Negates each component of the vector.
     *
     * @returns The current vector.
     */
    negate(): Vector3;
    /**
     * Normalizes the vector.
     *
     * @returns The current vector.
     */
    normalize(): Vector3;
    /**
     * Randomizes the vector.
     *
     * @param scale - Length of the resulting vector, if omitted a unit vector is set.
     * @returns The current vector.
     */
    randomize(scale?: number): Vector3;
    /**
     * Rotates the vector around the x-axis.
     *
     * @param vector3 - The origin vector to rotate around.
     * @param angle - The angle to rotate the vector by.
     * @returns The current vector.
     */
    rotateX(vector3: Vector3, angle: number): Vector3;
    /**
     * Rotates the vector around the y-axis.
     *
     * @param vector3 - The origin vector to rotate around.
     * @param angle - The angle to rotate the vector by.
     * @returns The current vector.
     */
    rotateY(vector3: Vector3, angle: number): Vector3;
    /**
     * Rotates the vector around the z-axis.
     *
     * @param vector3 - The origin vector to rotate around.
     * @param angle - The angle to rotate the vector by.
     * @returns The current vector.
     */
    rotateZ(vector3: Vector3, angle: number): Vector3;
    /**
     * Rounds each component of the vector to the nearest integer.
     *
     * @returns The current vector.
     */
    round(): Vector3;
    /**
     * Scales each component of the vector by a scalar value.
     *
     * @param scale - The scalar value to scale the vector by.
     * @returns The current vector.
     */
    scale(scale: number): Vector3;
    /**
     * Adds 2 vectors together after scaling the provided vector by a scalar value.
     *
     * @param vector3 - The vector to add the scaled vector to.
     * @param scale - The scalar value to scale the current vector by.
     * @returns The current vector.
     */
    scaleAndAdd(vector3: Vector3, scale: number): Vector3;
    /**
     * Subtracts a vector from the current vector.
     *
     * @param vector3 - The vector to subtract from the current vector.
     * @returns The current vector.
     */
    subtract(vector3: Vector3): Vector3;
    /**
     * Returns a string representation of the vector in x,y,z format.
     *
     * @returns A string representation of the vector in the format x,y,z.
     */
    toString(): string;
    /**
     * Transforms the vector by a matrix3.
     *
     * @param matrix3 - The matrix3 to transform the vector by.
     * @returns The current vector.
     */
    transformMatrix3(matrix3: Matrix3): Vector3;
    /**
     * Transforms the vector by a matrix4.
     *
     * @param matrix4 - The matrix4 to transform the vector by.
     * @returns The current vector.
     */
    transformMatrix4(matrix4: Matrix4): Vector3;
    /**
     * Transforms the vector by a quaternion.
     *
     * @param quaternion - The quaternion to transform the vector by.
     * @returns The current vector.
     */
    transformQuaternion(quaternion: Quaternion): Vector3;
    /**
     * Sets each component of the vector to zero.
     *
     * @returns The current vector.
     */
    zero(): Vector3;
}

/**
 * A 3-dimensional vector of boolean values.
 *
 * **Category:** Math
 * @public
 */
export declare interface Vector3Boolean {
    x: boolean;
    y: boolean;
    z: boolean;
}

/**
 * A 3-dimensional vector.
 *
 * **Category:** Math
 * @public
 */
export declare interface Vector3Like {
    x: number;
    y: number;
    z: number;
}

/**
 * The options for a voxels collider. @public
 *
 * Use for: voxel-based colliders (block volumes).
 * Do NOT use for: simple primitives; prefer analytic shapes when possible.
 *
 * **Category:** Physics
 */
export declare interface VoxelsColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.VOXELS;
    /**
     * The coordinate of each voxel in the collider.
     *
     * **Category:** Physics
     */
    coordinates?: Vector3Like[];
    /**
     * The size of each voxel in the collider.
     *
     * **Category:** Physics
     */
    size?: Vector3Like;
}

/**
 * Callback invoked when the entity finishes moving to a waypoint.
 *
 * @param waypoint - The waypoint reached.
 * @param waypointIndex - The index of the waypoint reached.
 *
 * **Category:** Controllers
 * @public
 */
export declare type WaypointMoveCompleteCallback = (waypoint: Vector3Like, waypointIndex: number) => void;

/**
 * Callback invoked when a waypoint is skipped due to timeout.
 *
 * @param waypoint - The waypoint that was skipped.
 * @param waypointIndex - The index of the waypoint that was skipped.
 *
 * **Category:** Controllers
 * @public
 */
export declare type WaypointMoveSkippedCallback = (waypoint: Vector3Like, waypointIndex: number) => void;

/**
 * The options for a wedge collider. @public
 *
 * Use for: wedge-shaped colliders (inclined planes).
 * Do NOT use for: other shapes; use the matching collider option type.
 *
 * **Category:** Physics
 */
export declare interface WedgeColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.WEDGE;
    /**
     * The extents of the wedge collider, defining full width (x), height (y), and length (z).
     *
     * **Category:** Physics
     */
    extents?: Vector3Like;
}

/**
 * Represents an isolated simulation space (a world) on the server.
 *
 * When to use: your primary container for game objects, physics, and players.
 * Use multiple worlds to run separate rooms, arenas, or instances.
 * Do NOT use for: cross-world global state; keep that in your own services or `GameServer`.
 *
 * @remarks
 * Prefer creating worlds via `WorldManager.createWorld` or
 * `WorldManager.getDefaultWorld` so IDs and lifecycle are managed consistently.
 *
 * Initialization:
 * - Call `World.start` to begin ticking (auto-started when created by `WorldManager`).
 * - Use `set*` methods for runtime lighting or skybox changes.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed
 * under `WorldEventPayloads`.
 *
 * @example
 * ```typescript
 * const world = WorldManager.instance.createWorld({
 *   name: 'My World',
 *   skyboxUri: 'skyboxes/partly-cloudy',
 * });
 * ```
 *
 * **Category:** Core
 * @public
 */
export declare class World extends EventRouter implements protocol.Serializable {























    /**
     * Creates a world instance with the provided options.
     *
     * Use for: direct construction only when you need custom lifecycle control.
     * Do NOT use for: routine world creation; prefer `WorldManager.createWorld`.
     *
     * @param options - Initial world configuration. Options are applied once at construction.
     *
     * @see `WorldManager.createWorld`
     *
     * **Category:** Core
     */
    constructor(options: WorldOptions);
    /**
     * The unique ID of the world.
     *
     * **Category:** Core
     */
    get id(): number;
    /**
     * The color of the ambient light.
     *
     * **Category:** Core
     */
    get ambientLightColor(): RgbColor;
    /**
     * The intensity of the ambient light.
     *
     * **Category:** Core
     */
    get ambientLightIntensity(): number;
    /**
     * The block type registry for this world.
     *
     * **Category:** Core
     */
    get blockTypeRegistry(): BlockTypeRegistry;
    /**
     * The chat manager for this world.
     *
     * **Category:** Core
     */
    get chatManager(): ChatManager;
    /**
     * The chunk lattice for this world.
     *
     * **Category:** Core
     */
    get chunkLattice(): ChunkLattice;
    /**
     * The color of the directional light.
     *
     * **Category:** Core
     */
    get directionalLightColor(): RgbColor;
    /**
     * The intensity of the directional light.
     *
     * **Category:** Core
     */
    get directionalLightIntensity(): number;
    /**
     * The position the directional light originates from (relative to the camera).
     *
     * **Category:** Core
     */
    get directionalLightPosition(): Vector3Like;
    /**
     * The entity manager for this world.
     *
     * **Category:** Core
     */
    get entityManager(): EntityManager;
    /**
     * The fog color, or undefined to use ambient light color.
     *
     * **Category:** Core
     */
    get fogColor(): RgbColor | undefined;
    /**
     * The maximum distance from the camera at which fog stops being applied.
     *
     * **Category:** Core
     */
    get fogFar(): number;
    /**
     * The minimum distance from the camera to start applying fog.
     *
     * **Category:** Core
     */
    get fogNear(): number;
    /**
     * The world loop that drives ticking for this world.
     *
     * @remarks
     * Use `World.start` and `World.stop` for lifecycle control.
     *
     * **Category:** Core
     */
    get loop(): WorldLoop;
    /**
     * The name of the world.
     *
     * **Category:** Core
     */
    get name(): string;

    /**
     * The particle emitter manager for this world.
     *
     * **Category:** Core
     */
    get particleEmitterManager(): ParticleEmitterManager;
    /**
     * The scene UI manager for this world.
     *
     * **Category:** Core
     */
    get sceneUIManager(): SceneUIManager;
    /**
     * The physics simulation for this world.
     *
     * **Category:** Core
     */
    get simulation(): Simulation;
    /**
     * The intensity of the world's skybox brightness.
     *
     * **Category:** Core
     */
    get skyboxIntensity(): number;
    /**
     * The URI of the skybox cubemap for this world.
     *
     * **Category:** Core
     */
    get skyboxUri(): string;
    /**
     * The audio manager for this world.
     *
     * **Category:** Core
     */
    get audioManager(): AudioManager;
    /**
     * An arbitrary identifier tag for your own logic.
     *
     * **Category:** Core
     */
    get tag(): string | undefined;
    /**
     * Loads a map into the world, replacing any prior map contents.
     *
     * Use for: initializing or fully resetting a world from serialized map data.
     * Do NOT use for: incremental edits while players are actively interacting with the world.
     *
     * @remarks
     * - Clears existing blocks and colliders via `ChunkLattice.clear`.
     * - Registers block types from the map into `World.blockTypeRegistry`.
     * - Spawns map entities as `isEnvironmental: true` by default.
     *
     * @param map - The map to load.
     *
     * **Side effects:** Clears the chunk lattice, registers block types, and spawns entities.
     *
     * **Category:** Core
     */
    loadMap(map: WorldMap): void;
    /**
     * Sets the color of the world's ambient light.
     *
     * @param color - The color of the light.
     *
     * **Side effects:** Emits `WorldEvent.SET_AMBIENT_LIGHT_COLOR`.
     *
     * **Category:** Core
     */
    setAmbientLightColor(color: RgbColor): void;
    /**
     * Sets the intensity of the world's ambient light.
     *
     * @param intensity - The intensity.
     *
     * **Side effects:** Emits `WorldEvent.SET_AMBIENT_LIGHT_INTENSITY`.
     *
     * **Category:** Core
     */
    setAmbientLightIntensity(intensity: number): void;
    /**
     * Sets the color of the world's directional light.
     *
     * @param color - The color of the light.
     *
     * **Side effects:** Emits `WorldEvent.SET_DIRECTIONAL_LIGHT_COLOR`.
     *
     * **Category:** Core
     */
    setDirectionalLightColor(color: RgbColor): void;
    /**
     * Sets the intensity of the world's directional light.
     *
     * @param intensity - The intensity.
     *
     * **Side effects:** Emits `WorldEvent.SET_DIRECTIONAL_LIGHT_INTENSITY`.
     *
     * **Category:** Core
     */
    setDirectionalLightIntensity(intensity: number): void;
    /**
     * Sets the position the world's directional light originates from relative to a player's camera.
     *
     * @param position - The light position relative to the player's camera.
     *
     * **Side effects:** Emits `WorldEvent.SET_DIRECTIONAL_LIGHT_POSITION`.
     *
     * **Category:** Core
     */
    setDirectionalLightPosition(position: Vector3Like): void;
    /**
     * Sets the color of the world's fog.
     *
     * @param color - The color of the fog, or undefined to reset to ambient light color.
     *
     * **Side effects:** Emits `WorldEvent.SET_FOG_COLOR`.
     *
     * **Category:** Core
     */
    setFogColor(color: RgbColor | undefined): void;
    /**
     * Sets the maximum distance from the camera at which fog stops being applied.
     *
     * @param far - The far distance.
     *
     * **Side effects:** Emits `WorldEvent.SET_FOG_FAR`.
     *
     * **Category:** Core
     */
    setFogFar(far: number): void;
    /**
     * Sets the minimum distance from the camera to start applying fog.
     *
     * @param near - The near distance.
     *
     * **Side effects:** Emits `WorldEvent.SET_FOG_NEAR`.
     *
     * **Category:** Core
     */
    setFogNear(near: number): void;
    /**
     * Sets the intensity of the world's skybox brightness.
     *
     * @param intensity - The intensity.
     *
     * **Side effects:** Emits `WorldEvent.SET_SKYBOX_INTENSITY`.
     *
     * **Category:** Core
     */
    setSkyboxIntensity(intensity: number): void;
    /**
     * Sets the cubemap URI of the world's skybox.
     *
     * @param skyboxUri - The cubemap URI of the skybox.
     *
     * **Side effects:** Emits `WorldEvent.SET_SKYBOX_URI`.
     *
     * **Category:** Core
     */
    setSkyboxUri(skyboxUri: string): void;
    /**
     * Starts the world loop, which begins ticking physics, entities, and networking.
     *
     * Use for: resuming a previously stopped world.
     * Do NOT use for: standard world creation when using `WorldManager.createWorld` (it auto-starts).
     *
     * **Side effects:** Emits `WorldEvent.START`.
     *
     * **Category:** Core
     */
    start(): void;
    /**
     * Stops the world loop, pausing physics, entities, and networking ticks.
     *
     * Use for: pausing a world or preparing for a full map reset.
     * Do NOT use for: disconnecting players; they remain assigned to this world.
     *
     * **Side effects:** Emits `WorldEvent.STOP`.
     *
     * **Category:** Core
     */
    stop(): void;

}

/**
 * Event types a World instance can emit.
 *
 * See `WorldEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum WorldEvent {
    SET_AMBIENT_LIGHT_COLOR = "WORLD.SET_AMBIENT_LIGHT_COLOR",
    SET_AMBIENT_LIGHT_INTENSITY = "WORLD.SET_AMBIENT_LIGHT_INTENSITY",
    SET_DIRECTIONAL_LIGHT_COLOR = "WORLD.SET_DIRECTIONAL_LIGHT_COLOR",
    SET_DIRECTIONAL_LIGHT_INTENSITY = "WORLD.SET_DIRECTIONAL_LIGHT_INTENSITY",
    SET_DIRECTIONAL_LIGHT_POSITION = "WORLD.SET_DIRECTIONAL_LIGHT_POSITION",
    SET_FOG_COLOR = "WORLD.SET_FOG_COLOR",
    SET_FOG_FAR = "WORLD.SET_FOG_FAR",
    SET_FOG_NEAR = "WORLD.SET_FOG_NEAR",
    SET_SKYBOX_INTENSITY = "WORLD.SET_SKYBOX_INTENSITY",
    SET_SKYBOX_URI = "WORLD.SET_SKYBOX_URI",
    START = "WORLD.START",
    STOP = "WORLD.STOP"
}

/**
 * Event payloads for World emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface WorldEventPayloads {
    /** Emitted when the color of the world's ambient light is set. */
    [WorldEvent.SET_AMBIENT_LIGHT_COLOR]: {
        world: World;
        color: RgbColor;
    };
    /** Emitted when the intensity of the world's ambient light is set. */
    [WorldEvent.SET_AMBIENT_LIGHT_INTENSITY]: {
        world: World;
        intensity: number;
    };
    /** Emitted when the color of the world's directional light is set. */
    [WorldEvent.SET_DIRECTIONAL_LIGHT_COLOR]: {
        world: World;
        color: RgbColor;
    };
    /** Emitted when the intensity of the world's directional light is set. */
    [WorldEvent.SET_DIRECTIONAL_LIGHT_INTENSITY]: {
        world: World;
        intensity: number;
    };
    /** Emitted when the position of the world's directional light is set. */
    [WorldEvent.SET_DIRECTIONAL_LIGHT_POSITION]: {
        world: World;
        position: Vector3Like;
    };
    /** Emitted when the color of the world's fog is set. */
    [WorldEvent.SET_FOG_COLOR]: {
        world: World;
        color: RgbColor;
    };
    /** Emitted when the density of the world's fog is set. */
    [WorldEvent.SET_FOG_FAR]: {
        world: World;
        far: number;
    };
    /** Emitted when the density of the world's fog is set. */
    [WorldEvent.SET_FOG_NEAR]: {
        world: World;
        near: number;
    };
    /** Emitted when the intensity of the world's skybox brightness is set. */
    [WorldEvent.SET_SKYBOX_INTENSITY]: {
        world: World;
        intensity: number;
    };
    /** Emitted when the URI of the world's skybox is set. */
    [WorldEvent.SET_SKYBOX_URI]: {
        world: World;
        uri: string;
    };
    /** Emitted when the world starts. */
    [WorldEvent.START]: {
        world: World;
        startedAtMs: number;
    };
    /** Emitted when the world stops. */
    [WorldEvent.STOP]: {
        world: World;
        stoppedAtMs: number;
    };
}

/**
 * Manages the tick loop for a world.
 *
 * When to use: advanced scheduling or instrumentation of a world's tick cycle.
 * Do NOT use for: normal lifecycle control—use `World.start` and `World.stop`.
 *
 * @remarks
 * The world loop automatically handles ticking physics, entities, and other world logic.
 *
 * The internal order of tick operations is:
 * 1) Tick entity logic
 * 2) Step physics
 * 3) Check and emit entity updates
 * 4) Synchronize network packets with player clients
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit events with payloads listed under
 * `WorldLoopEventPayloads`.
 *
 * **Category:** Core
 * @public
 */
export declare class WorldLoop extends EventRouter {




    /**
     * The current tick count of the world loop.
     *
     * **Category:** Core
     */
    get currentTick(): number;
    /**
     * Whether the world loop is started.
     *
     * **Category:** Core
     */
    get isStarted(): boolean;
    /**
     * The next scheduled tick time in milliseconds.
     *
     * **Category:** Core
     */
    get nextTickMs(): number;
    /**
     * The fixed timestep of the world loop in seconds.
     *
     * **Category:** Core
     */
    get timestepS(): number;
    /**
     * The world this loop manages.
     *
     * **Category:** Core
     */
    get world(): World;




}

/**
 * Event types a WorldLoop instance can emit.
 *
 * See `WorldLoopEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum WorldLoopEvent {
    START = "WORLD_LOOP.START",
    STOP = "WORLD_LOOP.STOP",
    TICK_START = "WORLD_LOOP.TICK_START",
    TICK_END = "WORLD_LOOP.TICK_END",
    TICK_ERROR = "WORLD_LOOP.TICK_ERROR"
}

/**
 * Event payloads for WorldLoop emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface WorldLoopEventPayloads {
    /** Emitted when the world loop starts. */
    [WorldLoopEvent.START]: {
        worldLoop: WorldLoop;
    };
    /** Emitted when the world loop stops. */
    [WorldLoopEvent.STOP]: {
        worldLoop: WorldLoop;
    };
    /** Emitted when the world loop tick starts. */
    [WorldLoopEvent.TICK_START]: {
        worldLoop: WorldLoop;
        tickDeltaMs: number;
    };
    /** Emitted when the world loop tick ends. */
    [WorldLoopEvent.TICK_END]: {
        worldLoop: WorldLoop;
        tickDurationMs: number;
    };
    /** Emitted when an error occurs during a world loop tick. */
    [WorldLoopEvent.TICK_ERROR]: {
        worldLoop: WorldLoop;
        error: Error;
    };
}

/**
 * Manages all worlds in a game server.
 *
 * When to use: creating additional worlds, routing players, or querying the active world set.
 * Do NOT use for: instantiating `World` directly for gameplay; use `WorldManager.createWorld`
 * to ensure IDs and lifecycle are managed consistently.
 *
 * @remarks
 * Access via `WorldManager.instance` — do not construct directly.
 *
 * <h2>Events</h2>
 *
 * This class emits global events with payloads listed under
 * `WorldManagerEventPayloads`.
 *
 * @example
 * ```typescript
 * import { WorldManager } from 'hytopia';
 *
 * const worldManager = WorldManager.instance;
 * const newWorld = worldManager.createWorld({
 *   name: 'My New World',
 *   skyboxUri: 'skyboxes/partly-cloudy',
 * });
 * ```
 *
 * **Category:** Core
 * @public
 */
export declare class WorldManager {
    /**
     * The global WorldManager instance (singleton).
     *
     * **Category:** Core
     */
    static readonly instance: WorldManager;



    /**
     * Creates and starts a new world with a unique ID.
     *
     * Use for: additional game rooms, arenas, or isolated simulations.
     * Do NOT use for: deferred world creation without starting; this always starts.
     *
     * @remarks
     * Auto-starts the world after creation.
     *
     * @param options - The options for the world (ID is assigned automatically).
     * @returns The created world.
     *
     * **Side effects:** Starts the world's tick loop and emits `WorldManagerEvent.WORLD_CREATED`.
     *
     * @see `World.start`
     * @see `WorldManager.getDefaultWorld`
     *
     * **Category:** Core
     */
    createWorld(options: Omit<WorldOptions, 'id'>): World;
    /**
     * Gets all worlds currently managed by the server.
     *
     * @returns All worlds.
     *
     * **Category:** Core
     */
    getAllWorlds(): World[];
    /**
     * Gets the default world, creating it if it does not exist.
     *
     * Use for: a single-world game or as a safe fallback when routing players.
     * Do NOT use for: creating specialized worlds with unique options.
     *
     * @remarks
     * Lazy-creates and auto-starts a default world if none exists.
     *
     * @returns The default world.
     *
     * **Side effects:** Creates and starts a world if it does not yet exist.
     *
     * **Category:** Core
     */
    getDefaultWorld(): World;
    /**
     * Gets all worlds with a specific tag.
     *
     * @param tag - The tag to filter worlds by.
     * @returns All worlds with the provided tag.
     *
     * **Category:** Core
     */
    getWorldsByTag(tag: string): World[];
    /**
     * Gets a world by its ID.
     *
     * @param id - The ID of the world to get.
     * @returns The world with the provided ID, or undefined if no world is found.
     *
     * **Category:** Core
     */
    getWorld(id: number): World | undefined;
    /**
     * Sets the default world players join on connect.
     *
     * Use for: changing the lobby or main world at runtime.
     * Do NOT use for: moving already connected players; use `Player.joinWorld`.
     *
     * @param world - The world to set as the default.
     *
     * **Category:** Core
     */
    setDefaultWorld(world: World): void;
}

/**
 * Event types a WorldManager instance can emit to the global event router.
 *
 * See `WorldManagerEventPayloads` for the payloads.
 *
 * **Category:** Events
 * @public
 */
export declare enum WorldManagerEvent {
    WORLD_CREATED = "WORLD_MANAGER.WORLD_CREATED"
}

/**
 * Event payloads for WorldManager emitted events.
 *
 * **Category:** Events
 * @public
 */
export declare interface WorldManagerEventPayloads {
    /** Emitted when a world is created. */
    [WorldManagerEvent.WORLD_CREATED]: {
        world: World;
    };
}

/**
 * A map representation for initializing a world.
 *
 * Use for: importing static maps or tooling exports via `World.loadMap`.
 * Do NOT use for: incremental edits while a world is live; use chunk/block APIs instead.
 *
 * @remarks
 * `blocks` uses `"x,y,z"` world block coordinates as string keys.
 *
 * **Category:** Core
 * @public
 */
export declare interface WorldMap {
    /** The block types in the map. */
    blockTypes?: BlockTypeOptions[];
    /** The blocks in the map */
    blocks?: {
        /** The global coordinate to block mapping. */
        [coordinate: string]: number | {
            i: number;
            r?: number;
        };
    };
    /** The entities in the map. */
    entities?: {
        /** The position to entity as entity options mapping. */
        [position: string]: Omit<EntityOptions, 'rigidBodyOptions'> & {
            rigidBodyOptions?: Omit<NonNullable<EntityOptions['rigidBodyOptions']>, 'type'> & {
                type?: any;
            };
        };
    };
}

/**
 * Options for creating a World instance.
 *
 * Use for: initializing a world and its environment at construction time.
 * Do NOT use for: runtime changes; use the corresponding `set*` methods on `World`.
 *
 * @remarks
 * Options are applied once at construction time. For runtime changes, use the
 * corresponding `set*` methods on `World`.
 *
 * **Category:** Core
 * @public
 */
export declare interface WorldOptions {
    /** The unique ID of the world. */
    id: number;
    /** The color of the ambient light for the world. */
    ambientLightColor?: RgbColor;
    /** The intensity of the ambient light for the world. 0 to 1+ */
    ambientLightIntensity?: number;
    /** The color of the directional light for the world. */
    directionalLightColor?: RgbColor;
    /** The intensity of the directional light for the world. 0 to 1+ */
    directionalLightIntensity?: number;
    /** The position the directional light originates from for the world. */
    directionalLightPosition?: Vector3Like;
    /** The color of the fog for the world. Defaults to ambient light color. */
    fogColor?: RgbColor;
    /** The maximum distance from the camera at which fog stops being applied.  */
    fogFar?: number;
    /** The minimum distance from the camera to start applying fog. */
    fogNear?: number;
    /** The map of the world. */
    map?: WorldMap;
    /** The name of the world. */
    name: string;
    /** The intensity of the skybox brightness for the world. 0 is black, 1 is full brightness, 1+ is brighter. */
    skyboxIntensity?: number;
    /** The URI of the skybox cubemap for the world. */
    skyboxUri: string;
    /** An arbitrary identifier tag of the world. Useful for your own logic */
    tag?: string;
    /** The tick rate for the world. */
    tickRate?: number;
    /** The gravity vector for the world. */
    gravity?: Vector3Like;
}

export { }
