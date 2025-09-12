import type { AnyPacket } from '@hytopia.com/server-protocol';
import type { ErrorEvent as ErrorEvent_2 } from 'ws';
import EventEmitter from 'eventemitter3';
import http from 'http';
import type { IncomingMessage } from 'http';
import type { InputSchema } from '@hytopia.com/server-protocol';
import type { LobbyMembershipDto } from '@hytopia.com/creative-lib/dist/impl/getSession';
import protocol from '@hytopia.com/server-protocol';
import RAPIER from '@dimforge/rapier3d-simd-compat';
import { SdpMatrix3 } from '@dimforge/rapier3d-simd-compat';
import * as Sentry from '@sentry/node';
import type { Socket } from 'net';
import type { types } from 'mediasoup';
import { WebSocket as WebSocket_2 } from 'ws';

/**
 * Represents a audio playback in a world.
 *
 * @remarks
 * Audio instances are created directly as instances.
 * They support a variety of configuration options through
 * the {@link AudioOptions} constructor argument.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link AudioEventPayloads}
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
     * Sets the position of the audio. Will detach from entity if attached.
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

/** Event types an Audio instance can emit. See {@link AudioEventPayloads} for the payloads. @public */
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

/** Event payloads for Audio emitted events. @public */
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
 * @remarks
 * The AudioManager is created internally as a singleton
 * for each {@link World} instance in a game server.
 * It allows retrieval of all loaded audio, entity
 * attached audio, looped audio, and more.
 *
 * @example
 * ```typescript
 * // Stop all audio in the world
 * const audioManager = world.audioManager;
 * audioManager.getAllAudios().map(audio => audio.pause());
 * ```
 *
 * @public
 */
export declare class AudioManager {




    /** The world the audio manager is for. */
    get world(): World;
    /**
     * Retrieves all loaded audio instances for the world.
     *
     * @returns An array of audio instances.
     */
    getAllAudios(): Audio[];
    /**
     * Retrieves all loaded audio instances attached to a specific entity.
     *
     * @param entity - The entity to get attached audio instances for.
     * @returns An array of audio instances.
     */
    getAllEntityAttachedAudios(entity: Entity): Audio[];
    /**
     * Retrieves all looped audio instances for the world.
     *
     * @returns An array of audio instances.
     */
    getAllLoopedAudios(): Audio[];
    /**
     * Retrieves all oneshot (non-looped) audio instances for the world.
     *
     * @returns An array of audio instances.
     */
    getAllOneshotAudios(): Audio[];

    /**
     * Unregisters and stops an audio instance from the audio manager.
     *
     * @param audio - The audio instance to pause and unregister.
     */
    unregisterAudio(audio: Audio): void;
    /**
     * Unregisters and stops all audio instances attached to a specific entity.
     *
     * @param entity - The entity to pause and unregister audio instances for.
     */
    unregisterEntityAttachedAudios(entity: Entity): void;
}

/** Options for creating an Audio instance. @public */
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

/** The options for a ball collider. @public */
export declare interface BallColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.BALL;
    /** The radius of the ball collider. */
    radius?: number;
}

/** The base options for a collider. @public */
export declare interface BaseColliderOptions {
    /** The shape of the collider. */
    shape: ColliderShape;
    /** The bounciness of the collider. */
    bounciness?: number;
    /** The bounciness combine rule of the collider. */
    bouncinessCombineRule?: CoefficientCombineRule;
    /** The collision groups the collider belongs to. */
    collisionGroups?: CollisionGroups;
    /** Whether the collider is enabled. */
    enabled?: boolean;
    /** The flags of the collider if the shape is a trimesh */
    flags?: number;
    /** The friction of the collider. */
    friction?: number;
    /** The friction combine rule of the collider. */
    frictionCombineRule?: CoefficientCombineRule;
    /** Whether the collider is a sensor. */
    isSensor?: boolean;
    /** The mass of the collider. */
    mass?: number;
    /** The on collision callback for the collider. */
    onCollision?: CollisionCallback;
    /** The parent rigid body of the collider. */
    parentRigidBody?: RigidBody;
    /** The relative position of the collider. Relative to parent rigid body. */
    relativePosition?: Vector3Like;
    /** The relative rotation of the collider. Relative to parent rigid body. */
    relativeRotation?: QuaternionLike;
    /** The simulation the collider is in, if provided the collider will automatically be added to the simulation. */
    simulation?: Simulation;
    /** An arbitrary identifier tag of the collider. Useful for your own logic. */
    tag?: string;
}

/**
 * A base class for entity controller implementations.
 *
 * @remarks
 * The BaseEntityController should be extended
 * by a more specific entity controller that you or a
 * plugin implements. Entity controllers are intended to
 * be used as one controller instance per entity, but
 * are flexible enough for edge cases such as if you want to create
 * niche behavior of one controller for many entities that
 * behave in unison.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link BaseEntityControllerEventPayloads}
 *
 * @public
 */
export declare abstract class BaseEntityController extends EventRouter {
    /**
     * Override this method to handle the attachment of an entity
     * to your entity controller.
     * @param entity - The entity to attach the controller to.
     */
    attach(entity: Entity): void;
    /**
     * Override this method to handle the despawn of an entity
     * from your entity controller.
     * @param entity - The entity to despawn.
     */
    despawn(entity: Entity): void;
    /**
     * Override this method to handle the detachment of an entity
     * from your entity controller.
     * @param entity - The entity to detach.
     */
    detach(entity: Entity): void;
    /**
     * Override this method to handle the spawning of an entity
     * to your entity controller.
     * @param entity - The entity to spawn.
     */
    spawn(entity: Entity): void;
    /**
     * Override this method to handle entity movements
     * based on player input for your entity controller.
     * This is called every tick by a PlayerEntity with a
     * entity controller.
     * @param entity - The entity to tick.
     * @param input - The current input state of the player.
     * @param cameraOrientation - The current camera orientation state of the player.
     * @param deltaTimeMs - The delta time in milliseconds since the last tick.
     */
    tickWithPlayerInput(entity: PlayerEntity, input: PlayerInput, cameraOrientation: PlayerCameraOrientation, deltaTimeMs: number): void;
    /**
     * Override this method to handle entity movements
     * based on your entity controller.
     * @param deltaTimeMs - The delta time in milliseconds since the last tick.
     */
    tick(entity: Entity, deltaTimeMs: number): void;
}

/** Event types a BaseEntityController instance can emit. See {@link BaseEntityControllerEventPayloads} for the payloads. @public */
export declare enum BaseEntityControllerEvent {
    ATTACH = "BASE_ENTITY_CONTROLLER.ATTACH",
    DESPAWN = "BASE_ENTITY_CONTROLLER.DESPAWN",
    DETACH = "BASE_ENTITY_CONTROLLER.DETACH",
    SPAWN = "BASE_ENTITY_CONTROLLER.SPAWN",
    TICK = "BASE_ENTITY_CONTROLLER.TICK",
    TICK_WITH_PLAYER_INPUT = "BASE_ENTITY_CONTROLLER.TICK_WITH_PLAYER_INPUT"
}

/** Event payloads for BaseEntityController emitted events. @public */
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

/** The base options for an entity. @public */
export declare interface BaseEntityOptions {
    /** The entity controller to use for the entity. */
    controller?: BaseEntityController;
    /** The opacity of the entity between 0 and 1. 0 is fully transparent, 1 is fully opaque. */
    opacity?: number;
    /** Whether the entity is environmental, if true it will not invoke its tick function or change position. Defaults to false. */
    isEnvironmental?: boolean;
    /** The parent entity of the entity, entities with a parent will ignore creating their own colliders. */
    parent?: Entity;
    /** The name of the parent's node (if parent is a model entity) to attach the entity to. */
    parentNodeName?: string;
    /** The rigid body options for the entity. */
    rigidBodyOptions?: RigidBodyOptions;
    /** An arbitrary identifier tag of the entity. Useful for your own logic. */
    tag?: string;
    /** The tint color of the entity as a hex code. */
    tintColor?: RgbColor;
    /** The name of the entity. */
    name?: string;
}

/** The base options for a rigid body. @public */
export declare interface BaseRigidBodyOptions {
    /** The type of the rigid body, defaults to {@link RigidBodyType.DYNAMIC}. */
    type?: RigidBodyType;
    /** The colliders of the rigid body, provided as {@link ColliderOptions}. */
    colliders?: ColliderOptions[];
    /** Whether the rigid body is enabled. */
    enabled?: boolean;
    /** The position of the rigid body. */
    position?: Vector3Like;
    /** The rotation of the rigid body. */
    rotation?: QuaternionLike;
    /** The simulation the rigid body is in. If provided, the rigid body will be automatically added to the simulation. */
    simulation?: Simulation;
}

/**
 * Represents a block in a world.
 *
 * @remarks
 * Instances of this class are created internally but made
 * publicly available through various public facing API
 * methods.
 *
 * @public
 */
export declare class Block {
    /** The global coordinate of the block. */
    readonly globalCoordinate: Vector3Like;
    /** The block type of the block. */
    readonly blockType: BlockType;


    /**
     * Gets the most adjacent neighbor global coordinate of this block
     * based on a relative hit point, typically from a raycast.
     *
     * @param hitPoint - The hit point on this block to get the neighbor coordinate from.
     * @returns A neighbor global coordinate of this block based on the hit point.
     */
    getNeighborGlobalCoordinateFromHitPoint(hitPoint: Vector3Like): Vector3Like;
}

/** The options for a block collider. @public */
export declare interface BlockColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.BLOCK;
    /** The half extents of the block collider. */
    halfExtents?: Vector3Like;
}

/** The options for creating a block entity. @public */
export declare interface BlockEntityOptions extends BaseEntityOptions {
    /** The half extents of the visual size of the block entity when blockTextureUri is set. If no rigidBodyOptions.colliders are provided, a block collider with the size of the half extents will be created. */
    blockHalfExtents?: Vector3Like;
    /** The texture uri of a entity if the entity is a block entity, if set rigidBodyOptions collider shape [0] must be a block */
    blockTextureUri?: string;
}

/**
 * Represents a block type.
 *
 * @remarks
 * Block types are created directly as instances.
 * They support a variety of configuration options through
 * the {@link BlockTypeOptions} constructor argument.
 * Block types are registered with a {@link BlockTypeRegistry} instance,
 * allowing you to create custom blocks with unique visual representations
 * and behaviors.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link BlockTypeEventPayloads}
 *
 * @example
 * ```typescript
 * const stoneBlockTypeId = 10;
 * world.blockTypeRegistry.registerBlockType(stoneBlockTypeId, new BlockType({
 *   id: stoneBlockTypeId,
 *   textureUri: 'textures/stone.png',
 *   name: 'Stone',
 * }));
 *
 * // Create a stone block at coordinate 0, 1, 0
 * world.chunkLattice.setBlock({ x: 0, y: 1, z: 0 }, stoneBlockTypeId);
 * ```
 *
 * @public
 */
export declare class BlockType extends EventRouter implements protocol.Serializable {







    /**
     * Creates a new block type instance.
     * @param world - The world the block type is for.
     * @param options - The options for the block type.
     */
    constructor(options?: BlockTypeOptions);
    /** The unique identifier for the block type. */
    get id(): number;
    /** The collider options for the block type. */
    get colliderOptions(): VoxelsColliderOptions;
    /** The half extents size of the block type. */
    get halfExtents(): Vector3Like;
    /** Whether the block type is a liquid. */
    get isLiquid(): boolean;
    /** Whether the block type is meshable. */
    get isMeshable(): boolean;
    /** The light emission level. */
    get lightLevel(): number;
    /** The name of the block type. */
    get name(): string;
    /** The size of the block type. */
    get size(): Vector3Like;
    /** The URI of the texture for the block type. */
    get textureUri(): string;


}

/** Event types a BlockType instance can emit. See {@link BlockTypeEventPayloads} for the payloads. @public */
export declare enum BlockTypeEvent {
    ENTITY_COLLISION = "BLOCK_TYPE.ENTITY_COLLISION",
    ENTITY_CONTACT_FORCE = "BLOCK_TYPE.ENTITY_CONTACT_FORCE"
}

/** Event payloads for BlockType emitted events. @public */
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
}

/** Options for creating a block type instance. @public */
export declare interface BlockTypeOptions {
    /** The unique numeric identifier for the block type. */
    id: number;
    /** The custom collider options for the block type. */
    customColliderOptions?: VoxelsColliderOptions;
    /** The half extents size of the block type. */
    halfExtents?: Vector3Like;
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
 * @remarks
 * Block type registries are created internally as a singleton
 * for each {@link World} instance in a game server. A block
 * type registry allows you to register and retrieve block
 * types by their unique id for a world.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link BlockTypeRegistryEventPayloads}
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
 * @public
 */
export declare class BlockTypeRegistry extends EventRouter implements protocol.Serializable {



    /** The world the block type registry is for. */
    get world(): World;
    /**
     * Get all registered block types.
     * @returns An array of all registered block types.
     */
    getAllBlockTypes(): BlockType[];
    /**
     * Get a registered block type by its id.
     * @param id - The id of the block type to get.
     * @returns The block type with the given id.
     */
    getBlockType(id: number): BlockType;
    /**
     * Register a generic block type.
     * @param blockTypeOptions - The options for the block type.
     * @returns The registered block type.
     */
    registerGenericBlockType(blockTypeOptions: BlockTypeOptions): BlockType;
    /**
     * Register a block type.
     * @param blockType - The block type to register.
     */
    registerBlockType(blockType: BlockType): void;

}

/** Event types a BlockTypeRegistry instance can emit. See {@link BlockTypeRegistryEventPayloads} for the payloads. @public */
export declare enum BlockTypeRegistryEvent {
    REGISTER_BLOCK_TYPE = "BLOCK_TYPE_REGISTRY.REGISTER_BLOCK_TYPE"
}

/** Event payloads for BlockTypeRegistry emitted events. @public */
export declare interface BlockTypeRegistryEventPayloads {
    /** Emitted when a block type is registered. */
    [BlockTypeRegistryEvent.REGISTER_BLOCK_TYPE]: {
        blockTypeRegistry: BlockTypeRegistry;
        id: number;
        blockType: BlockType;
    };
}

/** The options for a capsule collider. @public */
export declare interface CapsuleColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.CAPSULE;
    /** The half height of the capsule collider. */
    halfHeight?: number;
    /** The radius of the capsule collider. */
    radius?: number;
}

/** Event types a ChatManager instance can emit. See {@link ChatEventPayloads} for the payloads. @public */
export declare enum ChatEvent {
    BROADCAST_MESSAGE = "CHAT.BROADCAST_MESSAGE",
    PLAYER_MESSAGE = "CHAT.PLAYER_MESSAGE"
}

/** Event payloads for ChatManager emitted events. @public */
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
 * @remarks
 * The ChatManager is created internally as a singleton
 * for each {@link World} instance in a game server.
 * The ChatManager allows you to broadcast messages,
 * send messages to specific players, and register
 * commands that can be used in chat to execute game
 * logic.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link ChatEventPayloads}
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
 * @public
 */
export declare class ChatManager extends EventRouter {



    /**
     * Register a command and its callback.
     * @param command - The command to register.
     * @param callback - The callback function to execute when the command is used.
     */
    registerCommand(command: string, callback: CommandCallback): void;
    /**
     * Unregister a command.
     * @param command - The command to unregister.
     */
    unregisterCommand(command: string): void;
    /**
     * Send a system broadcast message to all players in the world.
     * @param message - The message to send.
     * @param color - The color of the message as a hex color code, excluding #.
     *
     * @example
     * ```typescript
     * chatManager.sendBroadcastMessage('Hello, world!', 'FF00AA');
     * ```
     */
    sendBroadcastMessage(message: string, color?: string): void;
    /**
     * Handle a command if it exists.
     * @param player - The player that sent the command.
     * @param message - The full message.
     * @returns True if a command was handled, false otherwise.
     */
    handleCommand(player: Player, message: string): boolean;
    /**
     * Send a system message to a specific player, only visible to them.
     * @param player - The player to send the message to.
     * @param message - The message to send.
     * @param color - The color of the message as a hex color code, excluding #.
     *
     * @example
     * ```typescript
     * chatManager.sendPlayerMessage(player, 'Hello, player!', 'FF00AA');
     * ```
     */
    sendPlayerMessage(player: Player, message: string, color?: string): void;


}

/**
 * A 16^3 chunk of blocks. Used to represent a world's terrain.
 *
 * @remarks
 * Chunks make up the bulk of the terrain in a world. Chunks are
 * fixed size, each containing 16^3 possible blocks as
 * a 16x16x16 cube. Chunks are primarily a data structure used by
 * {@link ChunkLattice} to represent a world's terrain.
 * Chunks store their internal block coordinates in local
 * space, meaning local coordinates x: 0...15, y: 0...15, z: 0...15.
 *
 * @public
 */
export declare class Chunk implements protocol.Serializable {


    /**
     * Creates a new chunk instance.
     */
    constructor(originCoordinate: Vector3Like);
    /** The blocks in the chunk as a flat Uint8Array[4096], each index as 0 or a block type id. */
    get blocks(): Readonly<Uint8Array>;
    /** The origin coordinate of the chunk. */
    get originCoordinate(): Vector3Like;
    /**
     * Convert a block index to a local coordinate.
     * @param index - The index of the block to convert.
     * @returns The local coordinate of the block.
     */
    static blockIndexToLocalCoordinate(index: number): Vector3Like;
    /**
     * Convert a global coordinate to a local coordinate.
     * @param globalCoordinate - The global coordinate to convert.
     * @returns The local coordinate.
     */
    static globalCoordinateToLocalCoordinate(globalCoordinate: Vector3Like): Vector3Like;
    /**
     * Convert a global coordinate to an origin coordinate.
     * @param globalCoordinate - The global coordinate to convert.
     * @returns The origin coordinate.
     */
    static globalCoordinateToOriginCoordinate(globalCoordinate: Vector3Like): Vector3Like;
    /**
     * Get the block type id at a specific local coordinate.
     * @param localCoordinate - The local coordinate of the block to get.
     * @returns The block type id.
     */
    getBlockId(localCoordinate: Vector3Like): number;
    /**
     * Check if a block exists at a specific local coordinate.
     * @param localCoordinate - The local coordinate of the block to check.
     * @returns Whether a block exists.
     */
    hasBlock(localCoordinate: Vector3Like): boolean;




}

/**
 * A lattice of chunks that represent a world's terrain.
 *
 * @remarks
 * The ChunkLattice lattice tracks the current terrain of a world,
 * comprised of {@link Chunk} instances.
 *
 * @public
 */
export declare class ChunkLattice extends EventRouter {





    /**
     * Creates a new chunk lattice instance.
     * @param world - The world the chunk lattice is for.
     */
    constructor(world: World);
    /** The number of chunks in the lattice. */
    get chunkCount(): number;
    /**
     * Removes and clears all chunks and their blocks from the lattice.
     */
    clear(): void;
    /**
     * Get the block type id at a specific global coordinate.
     * @param globalCoordinate - The global coordinate of the block to get.
     * @returns The block type id, 0 if no block is set.
     */
    getBlockId(globalCoordinate: Vector3Like): number;

    /**
     * Get the block type at a specific global coordinate.
     * @param globalCoordinate - The global coordinate of the block to get.
     * @returns The block type, null if no block is set.
     */
    getBlockType(globalCoordinate: Vector3Like): BlockType | null;
    /**
     * Get the number of blocks of a specific block type in the lattice.
     * @param blockTypeId - The block type id to get the count of.
     * @returns The number of blocks of the block type.
     */
    getBlockTypeCount(blockTypeId: number): number;
    /**
     * Get the chunk that contains the given global coordinate.
     * @param globalCoordinate - The global coordinate to get the chunk for.
     * @returns The chunk that contains the given global coordinate or undefined if not found.
     */
    getChunk(globalCoordinate: Vector3Like): Chunk | undefined;

    /**
     * Get the chunk for a given global coordinate.
     * @param globalCoordinate - The global coordinate of the chunk to get.
     * @returns The chunk at the given global coordinate or undefined if not found.
     */
    getOrCreateChunk(globalCoordinate: Vector3Like): Chunk;
    /**
     * Get all chunks in the lattice.
     * @returns An array of all chunks in the lattice.
     */
    getAllChunks(): Chunk[];
    /**
     * Check if a block exists at a specific global coordinate.
     * @param globalCoordinate - The global coordinate of the block to check.
     * @returns Whether a block exists.
     */
    hasBlock(globalCoordinate: Vector3Like): boolean;
    /**
     * Check if a chunk exists for a given global coordinate.
     * @param globalCoordinate - The global coordinate of the chunk to check.
     * @returns Whether the chunk exists.
     */
    hasChunk(globalCoordinate: Vector3Like): boolean;
    /**
     * Set the block at a global coordinate by block type id, automatically
     * creating a chunk if it doesn't exist. Use block type id 0 for air (to remove a block).
     * @param globalCoordinate - The global coordinate of the block to set.
     * @param blockTypeId - The block type id to set. Use 0 to remove the block and replace with air.
     */
    setBlock(globalCoordinate: Vector3Like, blockTypeId: number): void;



}

/** Event types a ChunkLattice instance can emit. See {@link ChunkLatticeEventPayloads} for the payloads. @public */
export declare enum ChunkLatticeEvent {
    ADD_CHUNK = "CHUNK_LATTICE.ADD_CHUNK",
    REMOVE_CHUNK = "CHUNK_LATTICE.REMOVE_CHUNK",
    SET_BLOCK = "CHUNK_LATTICE.SET_BLOCK"
}

/** Event payloads for ChunkLattice emitted events. @public */
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
    };
}

/** The coefficient for friction or bounciness combine rule. @public */
export declare enum CoefficientCombineRule {
    Average = 0,
    Min = 1,
    Multiply = 2,
    Max = 3
}

/**
 * Represents a collider in a world's physics simulation.
 *
 * @remarks
 * Colliders make up the foundation of the physical interactions
 * in a world. They are highly configurable and have many
 * aspects that can be adjusted both before simulation and
 * while simulated. Colliders will most often be used through
 * passing {@link ColliderOptions} to a {@link RigidBody} or
 * an entity's {@link EntityOptions}.
 *
 * @public
 */
export declare class Collider extends EventRouter {





    private _relativeRotation;



    /**
     * @param colliderOptions - The options for the collider instance.
     */
    constructor(colliderOptions: ColliderOptions);
    /**
     * Creates a collider options object from a block's half extents.
     * @param halfExtents - The half extents of the block.
     * @returns The collider options object.
     */
    static optionsFromBlockHalfExtents(halfExtents: Vector3Like): ColliderOptions;
    /**
     * Creates a collider options object from a modelUri with best approximate shape and size.
     * @param modelUri - The URI of the model.
     * @param scale - The scale of the model.
     * @param preferredShape - The preferred shape to use for the collider.
     * @returns The collider options object.
     */
    static optionsFromModelUri(modelUri: string, scale?: number, preferredShape?: ColliderShape): ColliderOptions;
    /** The bounciness of the collider. */
    get bounciness(): number;
    /** The bounciness combine rule of the collider. */
    get bouncinessCombineRule(): CoefficientCombineRule;
    /** The collision groups the collider belongs to. */
    get collisionGroups(): CollisionGroups;
    /** The friction of the collider. */
    get friction(): number;
    /** The friction combine rule of the collider. */
    get frictionCombineRule(): CoefficientCombineRule;
    /** Whether the collider is enabled. */
    get isEnabled(): boolean;
    /** Whether the collider has been removed from the simulation. */
    get isRemoved(): boolean;
    /** Whether the collider is a sensor. */
    get isSensor(): boolean;
    /** Whether the collider is simulated. */
    get isSimulated(): boolean;
    /** The parent rigid body of the collider. */
    get parentRigidBody(): RigidBody | undefined;
    /** The raw collider object from the Rapier physics engine. */
    get rawCollider(): RawCollider | undefined;
    /** The raw shape object from the Rapier physics engine. */
    get rawShape(): RawShape | undefined;
    /** The relative position of the collider to its parent rigid body. */
    get relativePosition(): Vector3Like;
    /** The relative rotation of the collider. */
    get relativeRotation(): QuaternionLike;
    /** The shape of the collider. */
    get shape(): ColliderShape;
    /** An arbitrary identifier tag of the collider. Useful for your own logic. */
    get tag(): string | undefined;
    /**
     * Sets the bounciness of the collider.
     * @param bounciness - The bounciness of the collider.
     */
    setBounciness(bounciness: number): void;
    /**
     * Sets the bounciness combine rule of the collider.
     * @param bouncinessCombineRule - The bounciness combine rule of the collider.
     */
    setBouncinessCombineRule(bouncinessCombineRule: CoefficientCombineRule): void;
    /**
     * Sets the collision groups of the collider.
     * @param collisionGroups - The collision groups of the collider.
     */
    setCollisionGroups(collisionGroups: CollisionGroups): void;
    /**
     * Sets whether the collider is enabled.
     * @param enabled - Whether the collider is enabled.
     */
    setEnabled(enabled: boolean): void;
    /**
     * Sets the friction of the collider.
     * @param friction - The friction of the collider.
     */
    setFriction(friction: number): void;
    /**
     * Sets the friction combine rule of the collider.
     * @param frictionCombineRule - The friction combine rule of the collider.
     */
    setFrictionCombineRule(frictionCombineRule: CoefficientCombineRule): void;
    /**
     * Sets the mass of the collider.
     * @param mass - The mass of the collider.
     */
    setMass(mass: number): void;
    /**
     * Sets the on collision callback for the collider.
     * @param callback - The on collision callback for the collider.
     */
    setOnCollision(callback: CollisionCallback | undefined): void;
    /**
     * Sets the relative rotation of the collider to its parent rigid body or the world origin.
     *
     * @remarks
     * Colliders can be added as a child of a rigid body, or to the world directly. This rotation
     * is relative to the parent rigid body or the world origin.
     *
     * @param rotation - The relative rotation of the collider.
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
     */
    setRelativePosition(position: Vector3Like): void;
    /**
     * Sets whether the collider is a sensor.
     * @param sensor - Whether the collider is a sensor.
     */
    setSensor(sensor: boolean): void;
    /**
     * Sets the tag of the collider.
     * @param tag - The tag of the collider.
     */
    setTag(tag: string): void;
    /**
     * Sets the voxel at the given coordinate as filled or not filled.
     * @param coordinate - The coordinate of the voxel to set.
     * @param filled - True if the voxel at the coordinate should be filled, false if it should be removed.
     */
    setVoxel(coordinate: Vector3Like, filled: boolean): void;
    /**
     * Adds the collider to the simulation.
     * @param simulation - The simulation to add the collider to.
     * @param parentRigidBody - The parent rigid body of the collider.
     */
    addToSimulation(simulation: Simulation, parentRigidBody?: RigidBody): void;

    /**
     * Enables or disables collision events for the collider.
     * This is automatically enabled if an on collision callback is set.
     * @param enabled - Whether collision events are enabled.
     */
    enableCollisionEvents(enabled: boolean): void;
    /**
     * Enables or disables contact force events for the collider.
     * This is automatically enabled if an on contact force callback is set.
     * @param enabled - Whether contact force events are enabled.
     */
    enableContactForceEvents(enabled: boolean): void;

    /**
     * Removes the collider from the simulation.
     */
    removeFromSimulation(): void;
    /**
     * Scales the collider by the given scalar. Only
     * ball, block, capsule, cone, cylinder, round cylinder
     * are supported.
     * @param scalar - The scalar to scale the collider by.
     */
    scale(scalar: number): void;


    private _buildWedgeConvexHullVertices;






}

/** The options for a collider. @public */
export declare type ColliderOptions = BallColliderOptions | BlockColliderOptions | CapsuleColliderOptions | ConeColliderOptions | CylinderColliderOptions | RoundCylinderColliderOptions | TrimeshColliderOptions | VoxelsColliderOptions | WedgeColliderOptions | NoneColliderOptions;

/** The shapes a collider can be. @public */
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
 * @param other - The other object involved in the collision, a block or entity.
 * @param started - Whether the collision has started or ended.
 * @public
 */
export declare type CollisionCallback = ((other: BlockType | Entity, started: boolean) => void) | ((other: BlockType | Entity, started: boolean, colliderHandleA: number, colliderHandleB: number) => void);

/**
 * The default collision groups.
 *
 * @remarks
 * The collision groups are used to determine which objects collide and
 * generate collision and contact force events. The default collision groups
 * can be used for most entity and block interactions, but you may want to
 * create your own for more complex scenarios. Up to 15 collision groups can be
 * registered. Collision groups use pairwise filtering using bit masks.
 *
 * This filtering method is based on two 16-bit values:
 * - The belongsTo groups (the 16 left-most bits of `self.0`).
 * - The collidesWith mask (the 16 right-most bits of `self.0`).
 *
 * An interaction is allowed between two filters `a` and `b` two conditions
 * are met simultaneously:
 * - The belongsTo groups of `a` has at least one bit set to `1` in common with the collidesWith mask of `b`.
 * - The belongsTo groups of `b` has at least one bit set to `1` in common with the collidesWith mask of `a`.
 * In other words, interactions are allowed between two filter if the following condition is met:
 *
 * ```
 * ((a >> 16) & b) != 0 && ((b >> 16) & a) != 0
 * ```
 *
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

/** A set of collision groups. @public */
export declare type CollisionGroups = {
    belongsTo: CollisionGroup[];
    collidesWith: CollisionGroup[];
};

/**
 * A helper class for building and decoding collision groups.
 *
 * @remarks
 * This class should be used directly with its static methods.
 * You can assign collision groups to colliders of entities and
 * blocks to control optimized collision interactions and filterings
 * between blocks and entities, and entities and other entities.
 *
 * @public
 */
export declare class CollisionGroupsBuilder {
    private static readonly BELONGS_TO_SHIFT;
    private static readonly COLLIDES_WITH_MASK;
    /**
     * Builds a raw set of collision groups from a set of collision groups.
     * @param collisionGroups - The set of collision groups to build.
     * @returns A raw set of collision groups represented as a 32-bit number.
     */
    static buildRawCollisionGroups(collisionGroups: CollisionGroups): RawCollisionGroups;
    /**
     * Decodes a raw set of collision groups into a set of collision groups.
     * @param groups - The raw set of collision groups to decode.
     * @returns A set of collision groups.
     */
    static decodeRawCollisionGroups(groups: RawCollisionGroups): CollisionGroups;
    /**
     * Decodes a set of collision groups into a set of their string equivalents.
     * @param collisionGroups - The set of collision groups to decode.
     * @returns A set of collision groups represented as their string equivalents.
     */
    static decodeCollisionGroups(collisionGroups: CollisionGroups): DecodedCollisionGroups;
    /**
     * Checks if the collision groups are the default collision groups.
     * @param collisionGroups - The set of collision groups to check.
     * @returns Whether the collision groups are the default collision groups.
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
 * @public
 */
export declare type CommandCallback = (player: Player, args: string[], message: string) => void;

/** The options for a cone collider. @public */
export declare interface ConeColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.CONE;
    /** The half height of the cone collider. */
    halfHeight?: number;
    /** The radius of the cone collider. */
    radius?: number;
}

/** Data for contact forces. @public */
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

/** A contact manifold. @public */
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

/** The options for a cylinder collider. @public */
export declare interface CylinderColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.CYLINDER;
    /** The half height of the cylinder collider. */
    halfHeight?: number;
    /** The radius of the cylinder collider. */
    radius?: number;
}

/** A decoded set of collision groups represented as their string equivalents. @public */
export declare type DecodedCollisionGroups = {
    belongsTo: string[];
    collidesWith: string[];
};

/** The default rigid body options for a model entity when EntityOptions.rigidBodyOptions is not provided. @public */
export declare const DEFAULT_ENTITY_RIGID_BODY_OPTIONS: RigidBodyOptions;

/**
 * Represents the default player model entity.
 *
 * @remarks
 * The default player entity extends the {@link PlayerEntity} class,
 * uses the default player model, and assigns a DefaultPlayerEntityController.
 * This entity is the most commonly used player controlled entity in games.
 * It automatically handles things like managing player visual customizations
 * and cosmetics, and more. If you want to change the default model used, you
 * can override all of the defaults, including the modelUri, but you must
 * ensure that the model used has the same animation names and anchor points
 * as the default player model in order to prevent unexpected behavior.
 *
 * @example
 * ```typescript
 * const playerEntity = new DefaultPlayerEntity({ player });
 *
 * playerEntity.spawn(world, { x: 0, y: 10, z: 0 });
 * ```
 *
 * @public
 */
export declare class DefaultPlayerEntity extends PlayerEntity {
    private _cosmeticHiddenSlots;
    constructor(options: DefaultPlayerEntityOptions);
    /** The cosmetic slots that are hidden. @public */
    get cosmeticHiddenSlots(): PlayerCosmeticSlot[];

}

/**
 * The player entity controller implementation.
 *
 * @remarks
 * This class extends {@link BaseEntityController}
 * and implements the default movement, platforming, jump,
 * swimming, and other basic logic for the
 * default player entity. We recommend you extend this class
 * if you'd like to implement additional logic on top of the
 * DefaultPlayerEntityController implementation.
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
    /** Whether to face forward when the entity stops moving. */
    faceForwardOnStop: boolean;
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
     */
    constructor(options?: DefaultPlayerEntityControllerOptions);
    /** Whether the entity is moving from player inputs. */
    get isActivelyMoving(): boolean;
    /** Whether the entity is grounded. */
    get isGrounded(): boolean;
    /** Whether the entity is on a platform, a platform is any entity with a kinematic rigid body. */
    get isOnPlatform(): boolean;
    /** Whether the entity is swimming, this is determined by if the entity is in a liquid block. */
    get isSwimming(): boolean;
    /** The platform the entity is on, if any. */
    get platform(): Entity | undefined;
    /**
     * Called when the controller is attached to an entity.
     * @param entity - The entity to attach the controller to.
     */
    attach(entity: Entity): void;
    /**
     * Called when the controlled entity is spawned.
     * In DefaultPlayerEntityController, this function is used to create
     * the colliders for the entity for wall and ground detection.
     * @param entity - The entity that is spawned.
     */
    spawn(entity: Entity): void;
    /**
     * Ticks the player movement for the entity controller,
     * overriding the default implementation. If the entity to tick
     * is a child entity, only the event will be emitted but the default
     * movement logic will not be applied.
     *
     * @param entity - The entity to tick.
     * @param input - The current input state of the player.
     * @param cameraOrientation - The current camera orientation state of the player.
     * @param deltaTimeMs - The delta time in milliseconds since the last tick.
     */
    tickWithPlayerInput(entity: PlayerEntity, input: PlayerInput, cameraOrientation: PlayerCameraOrientation, deltaTimeMs: number): void;
}

/** Options for creating a DefaultPlayerEntityController instance. @public */
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
    /** Whether to face forward when the entity stops moving. */
    faceForwardOnStop?: boolean;
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

/** Options for creating a DefaultPlayerEntity instance. @public */
export declare type DefaultPlayerEntityOptions = {
    cosmeticHiddenSlots?: PlayerCosmeticSlot[];
} & PlayerEntityOptions;

/** The options for a dynamic rigid body, also the default type. @public */
export declare interface DynamicRigidBodyOptions extends BaseRigidBodyOptions {
    type: RigidBodyType.DYNAMIC;
    /** The additional mass of the rigid body. */
    additionalMass?: number;
    /** The additional mass properties of the rigid body. */
    additionalMassProperties?: RigidBodyAdditionalMassProperties;
    /** The additional solver iterations of the rigid body. */
    additionalSolverIterations?: number;
    /** The angular damping of the rigid body. */
    angularDamping?: number;
    /** The angular velocity of the rigid body. */
    angularVelocity?: Vector3Like;
    /** Whether the rigid body has continuous collision detection enabled. */
    ccdEnabled?: boolean;
    /** The dominance group of the rigid body. */
    dominanceGroup?: number;
    /** The enabled axes of positional movement of the rigid body. */
    enabledPositions?: Vector3Boolean;
    /** The enabled rotations of the rigid body. */
    enabledRotations?: Vector3Boolean;
    /** The gravity scale of the rigid body. */
    gravityScale?: number;
    /** The linear damping of the rigid body. */
    linearDamping?: number;
    /** The linear velocity of the rigid body. */
    linearVelocity?: Vector3Like;
    /** Whether the rigid body is sleeping. */
    sleeping?: boolean;
    /** The soft continuous collision detection prediction of the rigid body. */
    softCcdPrediction?: number;
}

/**
 * Represents an entity in a world.
 *
 * @remarks
 * Entities are highly configurable and controllable. All
 * entities are created from a .gltf model asset and
 * allow full control of their rigid body and attached collider
 * dynamics.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link EntityEventPayloads}
 *
 * @example
 * ```typescript
 * const spider = new Entity({
 *   name: 'Spider',
 *   modelUri: 'models/spider.gltf',
 *   modelLoopedAnimations: [ 'walk' ],
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
 * @public
 */
export declare class Entity extends RigidBody implements protocol.Serializable {


























    /**
     * @param options - The options for the entity.
     */
    constructor(options: EntityOptions);
    /** The unique identifier for the entity. */
    get id(): number | undefined;
    /** The half extends of the visual size of the block entity when blockTextureUri is set. */
    get blockHalfExtents(): Vector3Like | undefined;
    /** The URI or path to the texture to be used, if this is set, the entity is a block entity. */
    get blockTextureUri(): string | undefined;
    /** The controller for the entity. */
    get controller(): BaseEntityController | undefined;
    /** The depth (z-axis) of the entity's model with scale consideration or block entity's y*2 half extents. */
    get depth(): number;
    /** The height (y-axis) of the entity's model with scale consideration or block entity's y*2 half extents. */
    get height(): number;
    /** The playback rate of the entity's model animations. */
    get modelAnimationsPlaybackRate(): number;
    /** The nodes to hide on the entity's model. */
    get modelHiddenNodes(): ReadonlySet<string>;
    /** The looped animations to start when the entity is spawned. */
    get modelLoopedAnimations(): ReadonlySet<string>;
    /** The preferred shape of the entity's model when automatically generating its collider when no explicit colliders are provided. */
    get modelPreferredShape(): ColliderShape | undefined;
    /** The scale of the entity's model. */
    get modelScale(): number;
    /** The nodes to show on the entity's model, overriding hidden nodes. */
    get modelShownNodes(): ReadonlySet<string>;
    /** The URI or path to the texture that overrides the model entity's default texture. */
    get modelTextureUri(): string | undefined;
    /** The URI or path to the .gltf model asset to be used for the entity. */
    get modelUri(): string | undefined;
    /** The name of the entity. */
    get name(): string;
    /** The opacity of the entity between 0 and 1. 0 is fully transparent, 1 is fully opaque. */
    get opacity(): number;
    /** The parent entity of the entity. */
    get parent(): Entity | undefined;
    /** The name of the parent's node (if parent is a model entity) this entity is attached to when spawned. */
    get parentNodeName(): string | undefined;
    /** An arbitrary identifier tag of the entity. Useful for your own logic. */
    get tag(): string | undefined;
    /** The tint color of the entity. */
    get tintColor(): RgbColor | undefined;
    /** Whether the entity is a block entity. */
    get isBlockEntity(): boolean;
    /** Whether the entity is environmental, if true it will not invoke its tick function or change position. */
    get isEnvironmental(): boolean;
    /** Whether the entity is a model entity. */
    get isModelEntity(): boolean;
    /** Whether the entity is spawned. */
    get isSpawned(): boolean;
    /** The width (x-axis) of the entity's model with scale consideration or block entity's x*2 half extents. */
    get width(): number;
    /** The world the entity is in. */
    get world(): World | undefined;
    /**
     * Spawns the entity in the world.
     * @param world - The world to spawn the entity in.
     * @param position - The position to spawn the entity at.
     * @param rotation - The optional rotation to spawn the entity with.
     */
    spawn(world: World, position: Vector3Like, rotation?: QuaternionLike): void;
    /**
     * Despawns the entity and all children from the world.
     */
    despawn(): void;
    /**
     * Sets the controller for the entity.
     * @param controller - The controller to set.
     */
    setController(controller: BaseEntityController | undefined): void;
    /**
     * Sets the playback rate of all animations on the entity's model.
     *
     * @remarks
     * Defaults to 1. A positive value will play the animation forward,
     * a negative value will play the animation in reverse. Any value may be used.
     * You can make animations play faster by using larger values.
     *
     * @param playbackRate - The playback rate of the entity's model animations.
     */
    setModelAnimationsPlaybackRate(playbackRate: number): void;
    /**
     * Sets the nodes to hide on the entity's model. Matched nodes
     * will be hidden for all players. Uses case insensitive
     * substring matching.
     * @param modelHiddenNodes - The nodes to hide on the entity's model.
     */
    setModelHiddenNodes(modelHiddenNodes: string[]): void;
    /**
     * Sets the scale of the entity's model and proportionally
     * scales its colliders.
     * @param modelScale - The scale of the entity's model.
     */
    setModelScale(modelScale: number): void;
    /**
     * Sets the nodes to show on the entity's model, overriding hidden nodes.
     * Matched nodes will be shown for all players. Uses case insensitive
     * substring matching.
     * @param modelShownNodes - The nodes to show on the entity's model.
     */
    setModelShownNodes(modelShownNodes: string[]): void;
    /**
     * Sets the texture uri of the entity's model. Setting
     * this overrides the model's default texture.
     * @param modelTextureUri - The texture uri of the entity's model.
     */
    setModelTextureUri(modelTextureUri: string | undefined): void;
    /**
     * Sets the opacity of the entity.
     * @param opacity - The opacity of the entity between 0 and 1. 0 is fully transparent, 1 is fully opaque.
     */
    setOpacity(opacity: number): void;
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
     */
    setParent(parent: Entity | undefined, parentNodeName?: string, position?: Vector3Like, rotation?: QuaternionLike): void;
    /**
     * Sets the tint color of the entity.
     * @param tintColor - The tint color of the entity.
     */
    setTintColor(tintColor: RgbColor | undefined): void;
    /**
     * Starts looped animations for the entity, blending with
     * other animations currently playing.
     *
     * @remarks
     * This method will be ignored and do nothing if the entity
     * is a block entity.
     *
     * @param animations - The animations to start.
     */
    startModelLoopedAnimations(animations: string[]): void;
    /**
     * Starts a oneshot animation for the entity, blending with
     * other animations currently playing.
     *
     * @remarks
     * This method will be ignored and do nothing if the entity
     * is a block entity.
     *
     * @param animations - The animations to start.
     */
    startModelOneshotAnimations(animations: string[]): void;
    /**
     * Stops all looped and oneshot animations for the entity,
     * optionally excluded the provided animations from stopping.
     *
     * @param excludedAnimations - The animations to exclude from being stopped.
     */
    stopAllModelAnimations(excludedAnimations?: string[]): void;
    /**
     * Stops all looped animations for the entity, optionally
     * excluded the provided animations from stopping.
     *
     * @param excludedAnimations - The animations to exclude from being stopped.
     */
    stopAllModelLoopedAnimations(excludedAnimations?: string[]): void;
    /**
     * Stops all oneshot animations for the entity, optionally
     * excluded the provided animations from stopping.
     *
     * @param excludedAnimations - The animations to exclude from being stopped.
     */
    stopAllModelOneshotAnimations(excludedAnimations?: string[]): void;
    /**
     * Stops the provided model animations for the entity.
     *
     * @remarks
     * This method will be ignored and do nothing if the entity
     * is a block entity.
     *
     * @param animations - The animations to stop.
     */
    stopModelAnimations(animations: string[]): void;







}

/** Event types an Entity instance can emit. See {@link EntityEventPayloads} for the payloads. @public */
export declare enum EntityEvent {
    BLOCK_COLLISION = "ENTITY.BLOCK_COLLISION",
    BLOCK_CONTACT_FORCE = "ENTITY.BLOCK_CONTACT_FORCE",
    DESPAWN = "ENTITY.DESPAWN",
    ENTITY_COLLISION = "ENTITY.ENTITY_COLLISION",
    ENTITY_CONTACT_FORCE = "ENTITY.ENTITY_CONTACT_FORCE",
    SET_MODEL_ANIMATIONS_PLAYBACK_RATE = "ENTITY.SET_MODEL_ANIMATIONS_PLAYBACK_RATE",
    SET_MODEL_HIDDEN_NODES = "ENTITY.SET_MODEL_HIDDEN_NODES",
    SET_MODEL_SCALE = "ENTITY.SET_MODEL_SCALE",
    SET_MODEL_SHOWN_NODES = "ENTITY.SET_MODEL_SHOWN_NODES",
    SET_MODEL_TEXTURE_URI = "ENTITY.SET_MODEL_TEXTURE_URI",
    SET_OPACITY = "ENTITY.SET_OPACITY",
    SET_PARENT = "ENTITY.SET_PARENT",
    SET_TINT_COLOR = "ENTITY.SET_TINT_COLOR",
    SPAWN = "ENTITY.SPAWN",
    START_MODEL_LOOPED_ANIMATIONS = "ENTITY.START_MODEL_LOOPED_ANIMATIONS",
    START_MODEL_ONESHOT_ANIMATIONS = "ENTITY.START_MODEL_ONESHOT_ANIMATIONS",
    STOP_MODEL_ANIMATIONS = "ENTITY.STOP_MODEL_ANIMATIONS",
    TICK = "ENTITY.TICK",
    UPDATE_POSITION = "ENTITY.UPDATE_POSITION",
    UPDATE_ROTATION = "ENTITY.UPDATE_ROTATION"
}

/** Event payloads for Entity emitted events. @public */
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
    /** Emitted when the playback rate of the entity's model animations is set. */
    [EntityEvent.SET_MODEL_ANIMATIONS_PLAYBACK_RATE]: {
        entity: Entity;
        playbackRate: number;
    };
    /** Emitted when nodes of the entity's model are set to be hidden. */
    [EntityEvent.SET_MODEL_HIDDEN_NODES]: {
        entity: Entity;
        modelHiddenNodes: Set<string>;
    };
    /** Emitted when the scale of the entity's model is set. */
    [EntityEvent.SET_MODEL_SCALE]: {
        entity: Entity;
        modelScale: number;
    };
    /** Emitted when nodes of the entity's model are set to be shown. */
    [EntityEvent.SET_MODEL_SHOWN_NODES]: {
        entity: Entity;
        modelShownNodes: Set<string>;
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
    /** Emitted when the parent of the entity is set. */
    [EntityEvent.SET_PARENT]: {
        entity: Entity;
        parent: Entity | undefined;
        parentNodeName: string | undefined;
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
    /** Emitted when the looped animations of the entity's model are started. */
    [EntityEvent.START_MODEL_LOOPED_ANIMATIONS]: {
        entity: Entity;
        animations: Set<string>;
    };
    /** Emitted when the oneshot animations of the entity's model are started. */
    [EntityEvent.START_MODEL_ONESHOT_ANIMATIONS]: {
        entity: Entity;
        animations: Set<string>;
    };
    /** Emitted when the model animations of the entity are stopped. */
    [EntityEvent.STOP_MODEL_ANIMATIONS]: {
        entity: Entity;
        animations: Set<string>;
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
 * @remarks
 * The EntityManager is created internally as a singleton
 * for each {@link World} instance in a game server.
 * It allows retrieval of all entities, player entities,
 * and more.
 *
 * @example
 * ```typescript
 * // Get all entities in the world
 * const entityManager = world.entityManager;
 * const entities = entityManager.getAllEntities();
 * ```
 *
 * @public
 */
export declare class EntityManager {





    /** The number of spawned entities in the world. */
    get entityCount(): number;
    /** The world the entity manager is for. */
    get world(): World;


    /**
     * Gets all spawned entities in the world.
     * @returns All spawned entities in the world.
     */
    getAllEntities(): Entity[];
    /**
     * Gets all spawned player entities in the world.
     * @returns All spawned player entities in the world.
     */
    getAllPlayerEntities(): PlayerEntity[];
    /**
     * Gets all spawned entities in the world assigned to the provided player.
     * @param player - The player to get the entities for.
     * @returns All spawned entities in the world assigned to the player.
     */
    getPlayerEntitiesByPlayer(player: Player): PlayerEntity[];
    /**
     * Gets a spawned entity in the world by its id.
     * @param id - The id of the entity to get.
     * @returns The spawned entity with the provided id, or undefined if no entity is found.
     */
    getEntity<T extends Entity>(id: number): T | undefined;
    /**
     * Gets all spawned entities in the world with a specific tag.
     * @param tag - The tag to get the entities for.
     * @returns All spawned entities in the world with the provided tag.
     */
    getEntitiesByTag(tag: string): Entity[];
    /**
     * Gets all spawned entities in the world with a tag that includes a specific substring.
     * @param tagSubstring - The tag substring to get the entities for.
     * @returns All spawned entities in the world with a tag that includes the provided substring.
     */
    getEntitiesByTagSubstring(tagSubstring: string): Entity[];
    /**
     * Gets all child entities of an entity.
     * @param entity - The entity to get the children for.
     * @returns All child entities of the entity.
     */
    getEntityChildren(entity: Entity): Entity[];


}

/** The options for creating an Entity instance. @public */
export declare type EntityOptions = BlockEntityOptions | ModelEntityOptions;

/**
 * Manages error and warning logging.
 *
 * @public
 */
export declare class ErrorHandler {
    private static errorCount;
    private static warningCount;
    /**
     * Logs a formatted warning message to alert about potential issues
     * @param message - The warning message to display
     * @param context - Optional context information about the warning
     */
    static warning(message: string, context?: string): void;
    /**
     * Logs a formatted error message with stack trace to help debug issues
     * @param message - The error message to display
     * @param context - Optional context information about the error
     */
    static error(message: string, context?: string): void;
    /**
     * Logs a formatted fatal error message with stack trace and throws the error
     * @param message - The error message to display
     * @param context - Optional context information about the error
     * @throws The created Error object
     */
    static fatalError(message: string, context?: string): never;

}

/**
 * The payloads for all events in the game server.
 *
 * @public
 */
export declare interface EventPayloads extends AudioEventPayloads, BaseEntityControllerEventPayloads, BlockTypeEventPayloads, BlockTypeRegistryEventPayloads, ChatEventPayloads, ChunkLatticeEventPayloads, ConnectionEventPayloads, EntityEventPayloads, GameServerEventPayloads, ParticleEmitterEventPayloads, PlayerCameraEventPayloads, PlayerEventPayloads, PlayerManagerEventPayloads, PlayerUIEventPayloads, SceneUIEventPayloads, SimulationEventPayloads, SocketEventPayloads, LightEventPayloads, WebServerEventPayloads, WorldEventPayloads, WorldLoopEventPayloads, WorldManagerEventPayloads {
}

/**
 * Manages event emission and assigned listener callbacks.
 *
 * @public
 */
export declare class EventRouter {
    /** The global event router instance. */
    static readonly globalInstance: EventRouter;

    private _finalListeners;
    /**
     * Emit an event, invoking all registered listeners for the event type.
     *
     * @param eventType - The type of event to emit.
     * @param payload - The payload to emit.
     *
     * @returns `true` if any listeners were found and invoked, `false` otherwise.
     */
    emit<TEventType extends keyof EventPayloads>(eventType: TEventType, payload: EventPayloads[TEventType]): boolean;
    emit(eventType: string, payload: any): boolean;
    /**
     * Emits an event to the local and global server instance event routers.
     *
     * @param eventType - The type of event to emit.
     * @param payload - The payload to emit.
     */
    emitWithGlobal<TEventType extends keyof EventPayloads>(eventType: TEventType, payload: EventPayloads[TEventType]): void;
    emitWithGlobal(eventType: string, payload: any): void;
    /**
     * Emits an event to local and provided world event routers.
     *
     * @param world - The world to broadcast the event to.
     * @param eventType - The type of event to broadcast.
     * @param payload - The payload to broadcast.
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
     */
    hasListeners<TEventType extends keyof EventPayloads>(eventType: TEventType): boolean;
    hasListeners(eventType: string): boolean;
    /**
     * Get all listeners for a specific event type.
     *
     * @param eventType - The type of event to get listeners for.
     *
     * @returns All listeners for the event type.
     */
    listeners<TEventType extends keyof EventPayloads>(eventType: TEventType): EventEmitter.EventListener<any, string>[];
    listeners(eventType: string): EventEmitter.EventListener<any, string>[];
    /**
     * Get the number of listeners for a specific event type.
     *
     * @param eventType - The type of event to get the listener count for.
     *
     * @returns The number of listeners for the event type.
     */
    listenerCount<TEventType extends keyof EventPayloads>(eventType: TEventType): number;
    listenerCount(eventType: string): number;
    /**
     * Remove a listener for a specific event type.
     *
     * @param eventType - The type of event to remove the listener from.
     * @param listener - The listener function to remove.
     */
    off<TEventType extends keyof EventPayloads>(eventType: TEventType, listener: (payload: EventPayloads[TEventType]) => void): void;
    off(eventType: string, listener: (payload: any) => void): void;
    /**
     * Remove all listeners or all listeners for a provided event type.
     *
     * @param eventType - The type of event to remove all listeners from.
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
     */
    on<TEventType extends keyof EventPayloads>(eventType: TEventType, listener: (payload: EventPayloads[TEventType]) => void): void;
    on(eventType: string, listener: (payload: any) => void): void;
    /**
     * Register a listener for a specific event type that will be invoked once.
     *
     * @param eventType - The type of event to listen for.
     * @param listener - The listener function to invoke when the event is emitted.
     */
    once<TEventType extends keyof EventPayloads>(eventType: TEventType, listener: (payload: EventPayloads[TEventType]) => void): void;
    once(eventType: string, listener: (payload: any) => void): void;
}

/**
 * A callback function called when the entity associated with the
 * SimpleEntityController updates its rotation as it is
 * attempting to face a target coordinate.
 * @param currentRotation - The current rotation of the entity.
 * @param targetRotation - The target rotation of the entity.
 * @public
 */
export declare type FaceCallback = (currentRotation: QuaternionLike, targetRotation: QuaternionLike) => void;

/**
 * A callback function called when the entity associated with the
 * SimpleEntityController finishes rotating and is now facing
 * a target coordinate.
 * @param endRotation - The rotation of the entity after it has finished rotating.
 * @public
 */
export declare type FaceCompleteCallback = (endRotation: QuaternionLike) => void;

/**
 * Options for the {@link SimpleEntityController.face} method.
 * @public
 */
export declare type FaceOptions = {
    faceCallback?: FaceCallback;
    faceCompleteCallback?: FaceCompleteCallback;
};

/** Filter options for various operations like raycasting and intersections. @public */
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

/** The options for a fixed rigid body. @public */
export declare interface FixedRigidBodyOptions extends BaseRigidBodyOptions {
    type: RigidBodyType.FIXED;
}

/**
 * Manages the game and associated worlds and systems.
 *
 * @remarks
 * This class is used as a singleton and should be
 * accessed via the `instance` property
 *
 * @public
 */
export declare class GameServer {







    /** The singleton instance of the game server. */
    static get instance(): GameServer;
    /** The model manager for the game server. */
    get modelRegistry(): ModelRegistry;
    /** The player manager for the game server. */
    get playerManager(): PlayerManager;

    /** The web server for the game server. */
    get webServer(): WebServer;
    /** The world manager for the game server */
    get worldManager(): WorldManager;

}

/** Event types a GameServer instance can emit to the global event router. See {@link GameServerEventPayloads} for the payloads. @public */
export declare enum GameServerEvent {
    START = "GAMESERVER.START",
    STOP = "GAMESERVER.STOP"
}

/** Event payloads for GameServer emitted events. @public */
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

/** A intersection result. @public */
export declare type IntersectionResult = {
    /** The block type that was intersected. */
    intersectedBlockType?: BlockType;
    /** The entity that was intersected. */
    intersectedEntity?: Entity;
};

/**
 * A high-performance Map-like data structure optimized for frequent iteration.
 *
 * @remarks
 * IterationMap maintains both a Map for O(1) lookups and an Array for fast iteration,
 * eliminating the need for Array.from() calls and providing ~2x faster iteration
 * than Map.values(). Optimized for "build up, iterate, clear" usage patterns
 * common in game loops.
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
 * @public
 */
export declare class IterationMap<K, V> {



    /**
     * Returns the number of key-value pairs in the IterationMap.
     */
    get size(): number;
    /**
     * Returns a readonly array of all values for fast iteration.
     * This is the key performance feature - use this instead of .values() for iteration.
     */
    get valuesArray(): readonly V[];
    /**
     * Returns the value associated with the key, or undefined if the key doesn't exist.
     * @param key - The key to look up.
     * @returns The value associated with the key, or undefined.
     */
    get(key: K): V | undefined;
    /**
     * Sets the value for the key in the IterationMap.
     * @param key - The key to set.
     * @param value - The value to set.
     * @returns The IterationMap instance for chaining.
     */
    set(key: K, value: V): this;
    /**
     * Returns true if the key exists in the IterationMap.
     * @param key - The key to check.
     * @returns True if the key exists, false otherwise.
     */
    has(key: K): boolean;
    /**
     * Removes the key-value pair from the IterationMap.
     * @param key - The key to delete.
     * @returns True if the key existed and was deleted, false otherwise.
     */
    delete(key: K): boolean;
    /**
     * Removes all key-value pairs from the IterationMap.
     * Highly optimized for the common "build up, iterate, clear" pattern.
     */
    clear(): void;
    /**
     * Executes a provided function once for each key-value pair.
     * @param callbackfn - Function to execute for each element.
     * @param thisArg - Value to use as this when executing callback.
     */
    forEach(callbackfn: (value: V, key: K, map: IterationMap<K, V>) => void, thisArg?: any): void;
    /**
     * Returns an iterator for the keys in the IterationMap.
     * @returns An iterator for the keys.
     */
    keys(): IterableIterator<K>;
    /**
     * Returns an iterator for the values in the IterationMap.
     * Note: For performance-critical iteration, use .valuesArray instead.
     * @returns An iterator for the values.
     */
    values(): IterableIterator<V>;
    /**
     * Returns an iterator for the key-value pairs in the IterationMap.
     * @returns An iterator for the entries.
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * Returns an iterator for the key-value pairs in the IterationMap.
     * @returns An iterator for the entries.
     */
    [Symbol.iterator](): IterableIterator<[K, V]>;

}

/** The options for a kinematic position rigid body. @public */
export declare interface KinematicPositionRigidBodyOptions extends BaseRigidBodyOptions {
    type: RigidBodyType.KINEMATIC_POSITION;
}

/** The options for a kinematic velocity rigid body. @public */
export declare interface KinematicVelocityRigidBodyOptions extends BaseRigidBodyOptions {
    type: RigidBodyType.KINEMATIC_VELOCITY;
    /** The angular velocity of the rigid body. */
    angularVelocity?: Vector3Like;
    /** The linear velocity of the rigid body. */
    linearVelocity?: Vector3Like;
}

/**
 * Represents a light in a world. Lights can be point lights
 * or spotlights.
 *
 * @remarks
 * Lights are created directly as instances. They support a
 * variety of configuration options through the {@link LightOptions}
 * constructor argument.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link LightEventPayloads}
 *
 * @example
 * ```typescript
 * const light = new Light({
 *   attachedToEntity: playerEntity,
 *   color: { r: 255, g: 0, b: 0 },
 *   intensity: 5,
 *   offset: { x: 0, y: 1, z: 0 },
 * });
 *
 * light.spawn(world);
 * ```
 *
 * @public
 */
export declare class Light extends EventRouter implements protocol.Serializable {













    /**
     * @param options - The options for the Light instance.
     */
    constructor(options: LightOptions);
    /** The unique identifier for the Light. */
    get id(): number | undefined;
    /** If type is spotlight, the angle of the spotlight. */
    get angle(): number | undefined;
    /** The entity to which the Light is attached if explicitly set. */
    get attachedToEntity(): Entity | undefined;
    /** The color of the light. */
    get color(): RgbColor;
    /** The maximum distance the light will illuminate. 0 does not limit distance. Defaults to 0. */
    get distance(): number | undefined;
    /** The intensity of the light in candela (cd). Defaults to 1 */
    get intensity(): number;
    /** Whether the Light is spawned into the world. */
    get isSpawned(): boolean;
    /** The offset of the light from the attached entity or position. */
    get offset(): Vector3Like | undefined;
    /** If type is spotlight, the penumbra of the spotlight. */
    get penumbra(): number | undefined;
    /** The position of the light in the world if explicitly set. */
    get position(): Vector3Like | undefined;
    /** If type is spotlight, the entity the spotlight will constantly point at. */
    get trackedEntity(): Entity | undefined;
    /** If type is spotlight, the position the spotlight will constantly point at. */
    get trackedPosition(): Vector3Like | undefined;
    /** The type of light. Defaults to point light. */
    get type(): LightType;
    /** The world the Light is spawned into. */
    get world(): World | undefined;
    /**
     * Sets the angle of the spotlight if the light type is spotlight.
     *
     * @param angle - The angle of the spotlight.
     */
    setAngle(angle: number): void;
    /**
     * Sets the entity to which the Light is attached.
     *
     * @param entity - The entity to attach the Light to.
     */
    setAttachedToEntity(entity: Entity): void;
    /**
     * Sets the color of the light.
     *
     * @param color - The color of the light.
     */
    setColor(color: RgbColor): void;
    /**
     * Sets the maximum distance the light will illuminate.
     *
     * @param distance - The maximum distance the light will illuminate.
     */
    setDistance(distance: number): void;
    /**
     * Sets the intensity of the light.
     *
     * @param intensity - The intensity of the light.
     */
    setIntensity(intensity: number): void;
    /**
     * Sets the offset of the light from the attached entity or position.
     *
     * @param offset - The offset of the light.
     */
    setOffset(offset: Vector3Like): void;
    /**
     * Sets the penumbra of the spotlight if the light type is spotlight.
     *
     * @param penumbra - The penumbra of the spotlight.
     */
    setPenumbra(penumbra: number): void;
    /**
     * Sets the position of the light.
     *
     * @param position - The position of the light.
     */
    setPosition(position: Vector3Like): void;
    /**
     * Sets the entity the spotlight will constantly point at if the light type is spotlight.
     *
     * @param entity - The entity the spotlight will constantly point at.
     */
    setTrackedEntity(entity: Entity): void;
    /**
     * Sets the position the spotlight will constantly point at if the light type is spotlight.
     *
     * @param position - The position the spotlight will constantly point at.
     */
    setTrackedPosition(position: Vector3Like): void;
    /**
     * Despawns the Light from the world.
     */
    despawn(): void;
    /**
     * Spawns the Light in the world.
     *
     * @param world - The world to spawn the Light in.
     */
    spawn(world: World): void;

}

/** Event types a Light instance can emit. See {@link LightEventPayloads} for the payloads. @public */
export declare enum LightEvent {
    DESPAWN = "LIGHT.DESPAWN",
    SET_ANGLE = "LIGHT.SET_ANGLE",
    SET_ATTACHED_TO_ENTITY = "LIGHT.SET_ATTACHED_TO_ENTITY",
    SET_COLOR = "LIGHT.SET_COLOR",
    SET_DISTANCE = "LIGHT.SET_DISTANCE",
    SET_INTENSITY = "LIGHT.SET_INTENSITY",
    SET_OFFSET = "LIGHT.SET_OFFSET",
    SET_PENUMBRA = "LIGHT.SET_PENUMBRA",
    SET_POSITION = "LIGHT.SET_POSITION",
    SET_TRACKED_ENTITY = "LIGHT.SET_TRACKED_ENTITY",
    SET_TRACKED_POSITION = "LIGHT.SET_TRACKED_POSITION",
    SPAWN = "LIGHT.SPAWN"
}

/** Event payloads for Light emitted events. @public */
export declare interface LightEventPayloads {
    /** Emitted when a light is despawned. */
    [LightEvent.DESPAWN]: {
        light: Light;
    };
    /** Emitted when the angle of the spotlight is set. */
    [LightEvent.SET_ANGLE]: {
        light: Light;
        angle: number;
    };
    /** Emitted when the light is attached to an entity. */
    [LightEvent.SET_ATTACHED_TO_ENTITY]: {
        light: Light;
        entity: Entity;
    };
    /** Emitted when the color of the light is set. */
    [LightEvent.SET_COLOR]: {
        light: Light;
        color: RgbColor;
    };
    /** Emitted when the maximum distance the light will illuminate is set. */
    [LightEvent.SET_DISTANCE]: {
        light: Light;
        distance: number;
    };
    /** Emitted when the intensity of the light is set. */
    [LightEvent.SET_INTENSITY]: {
        light: Light;
        intensity: number;
    };
    /** Emitted when the offset of the light is set. */
    [LightEvent.SET_OFFSET]: {
        light: Light;
        offset: Vector3Like;
    };
    /** Emitted when the penumbra of the spotlight is set. */
    [LightEvent.SET_PENUMBRA]: {
        light: Light;
        penumbra: number;
    };
    /** Emitted when the position of the light is set. */
    [LightEvent.SET_POSITION]: {
        light: Light;
        position: Vector3Like;
    };
    /** Emitted when the tracked entity of the spotlight is set. */
    [LightEvent.SET_TRACKED_ENTITY]: {
        light: Light;
        entity: Entity;
    };
    /** Emitted when the tracked position of the spotlight is set. */
    [LightEvent.SET_TRACKED_POSITION]: {
        light: Light;
        position: Vector3Like;
    };
    /** Emitted when a light is spawned. */
    [LightEvent.SPAWN]: {
        light: Light;
    };
}

/**
 * Manages Light instances in a world.
 *
 * @remarks
 * The LightManager is created internally as a singleton
 * for each {@link World} instance in a game server.
 * It allows retrieval of all loaded Light instances,
 * entity attached Light instances, and more.
 *
 * @public
 */
export declare class LightManager {




    /** The world the LightManager is for. */
    get world(): World;

    /**
     * Retrieves all spawned Light instances for the world.
     *
     * @returns An array of Light instances.
     */
    getAllLights(): Light[];
    /**
     * Retrieves all spawned Light instances attached to a specific entity.
     *
     * @param entity - The entity to get attached Light instances for.
     * @returns An array of Light instances.
     */
    getAllEntityAttachedLights(entity: Entity): Light[];


}

/** Options for creating a Light instance. @public */
export declare interface LightOptions {
    /** If type is spotlight, the angle of the spotlight. */
    angle?: number;
    /** If set, the light will be attached to this entity. */
    attachedToEntity?: Entity;
    /** The color of the light. Defaults to white. */
    color?: RgbColor;
    /** The maximum distance the light will illuminate. 0 does not limit distance. Defaults to 0. */
    distance?: number;
    /** The intensity of the light in candela (cd). Defaults to 1 */
    intensity?: number;
    /** The offset of the light from the attached entity or position. */
    offset?: Vector3Like;
    /** If type is spotlight, the penumbra of the spotlight. Defaults to 0 */
    penumbra?: number;
    /** If set, the light will be attached at this position. */
    position?: Vector3Like;
    /** If type is spotlight, the entity the spotlight will constantly point at. */
    trackedEntity?: Entity;
    /** If type is spotlight, the position the spotlight will constantly point at. */
    trackedPosition?: Vector3Like;
    /** The type of light. Defaults to point light. */
    type?: LightType;
}

/** The types a Light can be. @public */
export declare enum LightType {
    POINTLIGHT = 0,
    SPOTLIGHT = 1
}

/**
 * Represents a 2x2 matrix.
 *
 * @remarks
 * All matrix methods result in mutation of the matrix instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 2x2 matrix. Various convenience methods are
 * provided for common matrix operations.
 *
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
 * @remarks
 * All matrix methods result in mutation of the matrix instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 3x3 matrix. Various convenience methods are
 * provided for common matrix operations.
 *
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
 * @remarks
 * All matrix methods result in mutation of the matrix instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 4x4 matrix. Various convenience methods are
 * provided for common matrix operations.
 *
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

/** A bounding box for a model. @public */
export declare type ModelBoundingBox = {
    min: Vector3Like;
    max: Vector3Like;
};

/** The options for creating a model entity. @public */
export declare interface ModelEntityOptions extends BaseEntityOptions {
    /** The playback rate of the entity's model animations. */
    modelAnimationsPlaybackRate?: number;
    /** The nodes to hide on the entity's model. */
    modelHiddenNodes?: string[];
    /** The looped animations to start when the entity is spawned. */
    modelLoopedAnimations?: string[];
    /** The preferred shape of the entity's model when automatically generating its collider when no explicit colliders are provided. */
    modelPreferredShape?: ColliderShape;
    /** The scale of the entity's model. */
    modelScale?: number;
    /** The nodes to show on the entity's model, overriding hidden nodes. */
    modelShownNodes?: string[];
    /** The texture uri of the entity's model. Setting this overrides the model's default texture. */
    modelTextureUri?: string;
    /** The URI or path to the .gltf model asset to be used for the entity. */
    modelUri?: string;
}

/**
 * Manages model data for all known models of the game.
 *
 * @remarks
 * The ModelRegistry is created internally as a global
 * singletone accessible with the static property
 * `ModelRegistry.instance`.
 *
 * @example
 * ```typescript
 * import { ModelRegistry } from 'hytopia';
 *
 * const modelRegistry = ModelRegistry.instance;
 * const boundingBox = modelRegistry.getBoundingBox('models/player.gltf');
 * ```
 *
 * @public
 */
export declare class ModelRegistry {
    /** The global ModelRegistry instance as a singleton. */
    static readonly instance: ModelRegistry;
    /** Whether to use optimized models when they are loaded. */
    optimize: boolean;
    /** Whether to always run model optimization on server start. */
    optimizeEveryStart: boolean;






    /**
     * Retrieves an array of all known animation names for a model.
     *
     * @param modelUri - The URI of the model to retrieve the animation names for.
     * @returns An array of all known animation names for the model.
     */
    getAnimationNames(modelUri: string): string[];
    /**
     * Retrieves the bounding box of a model.
     *
     * @param modelUri - The URI of the model to retrieve the bounding box for.
     * @returns The bounding box of the model.
     */
    getBoundingBox(modelUri: string): ModelBoundingBox;
    /**
     * Retrieves the Z-axis depth of a model for a scale of 1.
     *
     * @param modelUri - The URI of the model to retrieve the depth for.
     * @returns The depth of the model.
     */
    getDepth(modelUri: string): number;
    /**
     * Retrieves the Y-axis height of a model for a scale of 1.
     *
     * @param modelUri - The URI of the model to retrieve the height for.
     * @returns The height of the model.
     */
    getHeight(modelUri: string): number;
    /**
     * Retrieves the names of all nodes in a model.
     *
     * @param modelUri - The URI of the model to retrieve the node names for.
     * @returns The names of all nodes in the model.
     */
    getNodeNames(modelUri: string): string[];
    /**
     * Retrieves the trimesh of a model.
     *
     * @param modelUri - The URI of the model to retrieve the trimesh for.
     * @param scale - Optional uniform scaling to apply to the trimesh. Defaults to 1, which is no scaling.
     * @returns The trimesh of the model.
     */
    getTrimesh(modelUri: string, scale?: number): ModelTrimesh | undefined;
    /**
     * Retrieves the X-axis width of a model for a scale of 1.
     *
     * @param modelUri - The URI of the model to retrieve the width for.
     * @returns The width of the model.
     */
    getWidth(modelUri: string): number;
    /**
     * Checks if a model has a node with the given name.
     *
     * @param modelUri - The URI of the model to check.
     * @param nodeName - The name of the node to check for.
     * @returns Whether the model has a node with the given name.
     */
    modelHasNode(modelUri: string, nodeName: string): boolean;









}

/** A trimesh for a model. @public */
export declare type ModelTrimesh = {
    vertices: Float32Array;
    indices: Uint32Array;
};

/**
 * A callback function called when the entity associated with the
 * SimpleEntityController updates its position as it is
 * attempting to move to a target coordinate.
 * @param currentPosition - The current position of the entity.
 * @param targetPosition - The target position of the entity.
 * @public
 */
export declare type MoveCallback = (currentPosition: Vector3Like, targetPosition: Vector3Like) => void;

/**
 * A callback function called when the entity associated with the
 * SimpleEntityController reaches the target coordinate. An entity
 * must reach the x,y,z coordinate for the callback to be called.
 * @param endPosition - The position of the entity after it has finished moving.
 * @public
 */
export declare type MoveCompleteCallback = (endPosition: Vector3Like) => void;

/**
 * Options for the {@link SimpleEntityController.move} method.
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

/** The options for an error type "none" collider. @public */
export declare interface NoneColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.NONE;
}

/**
 * Represents a particle emitter in the world. Emit 2D
 * particles that always face the camera.
 *
 * @remarks
 * Particle emitters are created directly as instances. They support a
 * variety of configuration options through the {@link ParticleEmitterOptions}
 * constructor argument.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instance of it emit
 * events with payloads listed under {@link ParticleEmitterEventPayloads}.
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
    /** The maximum number of live particles. */
    get maxParticles(): number | undefined;
    /** The offset of the particle emitter from the attached entity or position. */
    get offset(): Vector3Like | undefined;
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
     * @param world - The world to spawn the ParticleEmitter in.
     */
    spawn(world: World): void;

}

/** Event types a ParticleEmitter instance can emit. See {@link ParticleEmitterEventPayloads} @public */
export declare enum ParticleEmitterEvent {
    BURST = "PARTICLE_EMITTER.BURST",
    DESPAWN = "PARTICLE_EMITTER.DESPAWN",
    SET_ALPHA_TEST = "PARTICLE_EMITTER.SET_ALPHA_TEST",
    SET_ATTACHED_TO_ENTITY = "PARTICLE_EMITTER.SET_ATTACHED_TO_ENTITY",
    SET_ATTACHED_TO_ENTITY_NODE_NAME = "PARTICLE_EMITTER.SET_ATTACHED_TO_ENTITY_NODE_NAME",
    SET_COLOR_END = "PARTICLE_EMITTER.SET_COLOR_END",
    SET_COLOR_END_VARIANCE = "PARTICLE_EMITTER.SET_COLOR_END_VARIANCE",
    SET_COLOR_START = "PARTICLE_EMITTER.SET_COLOR_START",
    SET_COLOR_START_VARIANCE = "PARTICLE_EMITTER.SET_COLOR_START_VARIANCE",
    SET_GRAVITY = "PARTICLE_EMITTER.SET_GRAVITY",
    SET_LIFETIME = "PARTICLE_EMITTER.SET_LIFETIME",
    SET_LIFETIME_VARIANCE = "PARTICLE_EMITTER.SET_LIFETIME_VARIANCE",
    SET_MAX_PARTICLES = "PARTICLE_EMITTER.SET_MAX_PARTICLES",
    SET_OFFSET = "PARTICLE_EMITTER.SET_OFFSET",
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

/** Event payloads for ParticleEmitter emitted events. @public */
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
 * @remarks
 * The ParticleEmitterManager is created internally as a singleton
 * for each {@link World} instance in a game server.
 * It allows retrieval of all loaded ParticleEmitter instances,
 * entity attached ParticleEmitter instances, and more.
 *
 * @public
 */
export declare class ParticleEmitterManager {




    /** The world the ParticleEmitterManager is for. */
    get world(): World;

    /**
     * Retrieves all spawned ParticleEmitter instances for the world.
     *
     * @returns An array of ParticleEmitter instances.
     */
    getAllParticleEmitters(): ParticleEmitter[];
    /**
     * Retrieves all spawned ParticleEmitter instances attached to a specific entity.
     *
     * @param entity - The entity to get attached ParticleEmitter instances for.
     * @returns An array of ParticleEmitter instances.
     */
    getAllEntityAttachedParticleEmitters(entity: Entity): ParticleEmitter[];


}

/** Options for creating a ParticleEmitter instance. @public */
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
    /** The maximum number of live particles. */
    maxParticles?: number;
    /** The offset of the particle emitter from the attached entity or position. */
    offset?: Vector3Like;
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
 * A callback function called when the pathfinding algorithm aborts.
 * @public
 */
export declare type PathfindAbortCallback = () => void;

/**
 * A callback function called when the entity associated with the
 * PathfindingEntityController finishes pathfinding and is now at the
 * target coordinate.
 * @public
 */
export declare type PathfindCompleteCallback = () => void;

/**
 * A pathfinding entity controller built on top of {@link SimpleEntityController}.
 *
 * @remarks
 * This class implements pathfinding using the A* algorithm. Pathfinding when frequently
 * called can cause performance issues, use it sparingly. The .pathfind() method should only need to
 * be called once in nearly all cases when attempting to move an entity to a target coordinate.
 *
 * @public
 */
export declare class PathfindingEntityController extends SimpleEntityController {
















    /**
     * @param options - Options for the controller.
     */
    constructor(options?: PathfindingEntityControllerOptions);
    /** Whether to enable debug mode or not. When debug mode is enabled, the pathfinding algorithm will log debug information to the console. Defaults to false. */
    get debug(): boolean;
    /** The maximum fall distance the entity can fall. */
    get maxFall(): number;
    /** The maximum jump distance the entity can jump. */
    get maxJump(): number;
    /** The maximum number of open set iterations that can be processed before aborting pathfinding. Defaults to 200. */
    get maxOpenSetIterations(): number;
    /** The speed of the entity. */
    get speed(): number;
    /** The target coordinate to pathfind to. */
    get target(): Vector3Like | undefined;
    /** The vertical penalty for the pathfinding algorithm. A higher value will prefer paths with less vertical movement. */
    get verticalPenalty(): number;
    /** The current waypoints being followed. */
    get waypoints(): Vector3Like[];
    /** The index representing the next waypoint moving towards of the current set of waypoints being followed. */
    get waypointNextIndex(): number;
    /** The timeout in milliseconds for a waypoint to be considered reached. Defaults to 2000ms divided by the speed of the entity. */
    get waypointTimeoutMs(): number;
    /**
     * Calculate a path and move to the target if a path is found. Returns true if a path is found, false if no path is found.
     * @param target - The target coordinate to pathfind to.
     * @param speed - The speed of the entity.
     * @param options - The pathfinding options.
     * @returns Whether the path was found.
     */
    pathfind(target: Vector3Like, speed: number, options?: PathfindingOptions): boolean;









}

/** Options for creating a PathfindingEntityController instance. @public */
declare interface PathfindingEntityControllerOptions extends SimpleEntityControllerOptions {
}

/**
 * Options for the {@link PathfindingEntityController.pathfind} method.
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
 * @remarks
 * This class is a singleton accessible with the static property
 * `PersistenceManager.instance`. Convenience methods are also
 * available on the `Player` and `GameServer` classes.
 *
 * @public
 */
export declare class PersistenceManager {
    static readonly instance: PersistenceManager;

    /**
     * Get global data from the data persistence service.
     * @param key - The key to get the data from.
     * @param maxRetries - The maximum number of retries to attempt in the event of failure.
     * @returns The data from the persistence layer.
     */
    getGlobalData(key: string, maxRetries?: number): Promise<Record<string, unknown> | undefined>;

    /**
     * Set global data in the data persistence service. This
     * data is available and shared by all lobbies of your game.
     * @param key - The key to set the data to.
     * @param data - The data to set.
     */
    setGlobalData(key: string, data: Record<string, unknown>): Promise<Record<string, unknown> | undefined>;


}

/**
 * A player in the game.
 *
 * @remarks
 * Players are automatically created when they connect and
 * authenticate with the game server. This is all handled
 * internally.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link PlayerEventPayloads}
 *
 * @public
 */
export declare class Player extends EventRouter implements protocol.Serializable {

    /** The unique HYTOPIA UUID for the player. */
    readonly id: string;
    /** The unique HYTOPIA username for the player. */
    readonly username: string;
    /** The profile picture URL for the player. */
    readonly profilePictureUrl: string | undefined;
    /** The camera for the player. */
    readonly camera: PlayerCamera;

    /** The cosmetics for the player */
    readonly cosmetics: Promise<PlayerCosmetics | void>;
    /** The UI for the player. */
    readonly ui: PlayerUI;






    /** The current {@link PlayerInput} of the player. */
    get input(): PlayerInput;
    /** The current {@link World} the player is in. */
    get world(): World | undefined;
    /**
     * Disconnects the player from the game server.
     */
    disconnect(): void;
    /**
     * Get the persisted data for the player.
     *
     * @remarks
     * This method returns the player persisted data. If it returns
     * undefined, the player data failed to load and your game
     * logic should handle this case appropriately. If it returns
     * an empty object {}, the player data loaded successfully but
     * no prior data has been set.
     *
     * @returns The persisted data for the player.
     */
    getPersistedData(): Record<string, unknown> | undefined;
    /**
     * Joins a player to a world.
     *
     * @remarks
     * If the player is already in a {@link World}, they
     * will be removed from their current world before joining
     * the new world.
     *
     * @param world - The world to join the player to.
     */
    joinWorld(world: World): void;


    /**
     * Resets all inputs keys
     */
    resetInputs(): void;
    /**
     * Set the persisted data for the player. This data can
     * later be retrieved using {@link Player.getPersistedData},
     * even if a player disconnects and rejoin a game in the future,
     * or joins a different HYTOPIA managed lobby of your game.
     *
     * @remarks
     * This method is asynchronous and returns a promise that
     * resolves to the player data. Data is set using shallow
     * merge of the existing data. It is recommended that you
     * provide a changed data object for your saved data structure
     * rather than the entire data object to avoid edge cases with
     * data persistence or overwrites.
     *
     * @param data - The data to set.
     * @returns The persisted data for the player.
     */
    setPersistedData(data: Record<string, unknown>): Record<string, unknown>;







}

/**
 * The camera for a Player.
 *
 * @remarks
 * The camera is used to render the player's view of the
 * world. The player's camera exposes functionality to
 * control the camera of a player. All player objects
 * have a camera, accessible via {@link Player.camera}.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link PlayerCameraEventPayloads}
 *
 * @example
 * ```typescript
 * player.camera.setMode(PlayerCameraMode.FIRST_PERSON);
 * ```
 *
 * @public
 */
export declare class PlayerCamera extends EventRouter implements protocol.Serializable {
    /** The player that the camera belongs to. @readonly */
    readonly player: Player;















    /** The entity the camera is attached to. */
    get attachedToEntity(): Entity | undefined;
    /** The position the camera is attached to. */
    get attachedToPosition(): Vector3Like | undefined;
    /** The facing direction vector of the camera based on its current orientation. */
    get facingDirection(): Vector3Like;
    /** The quaternion representing the camera's facing direction. */
    get facingQuaternion(): QuaternionLike;
    /** The film offset of the camera. A positive value shifts the camera right, a negative value shifts it left. */
    get filmOffset(): number;
    /** Only used in first-person mode. The forward offset of the camera. A positive number shifts the camera forward, a negative number shifts it backward. */
    get forwardOffset(): number;
    /** The field of view of the camera. */
    get fov(): number;
    /** The nodes of the model the camera is attached to that will not be rendered for the player. Uses case insensitive substring matching. */
    get modelHiddenNodes(): Set<string>;
    /** The nodes of the model the camera is attached to that will be rendered for the player, overriding hidden nodes. Uses case insensitive substring matching. */
    get modelShownNodes(): Set<string>;
    /** The mode of the camera. */
    get mode(): PlayerCameraMode;
    /** The relative offset of the camera from the entity or position it is attached to. */
    get offset(): Vector3Like;
    /** The current orientation of the camera. */
    get orientation(): PlayerCameraOrientation;
    /** The shoulder angle of the camera in degrees. */
    get shoulderAngle(): number;
    /** The entity the camera will constantly look at, even if the camera attached or tracked entity moves. */
    get trackedEntity(): Entity | undefined;
    /** The position the camera will constantly look at, even if the camera attached entity moves. */
    get trackedPosition(): Vector3Like | undefined;
    /** The zoom of the camera. */
    get zoom(): number;
    /**
     * Makes the camera look at an entity. If the camera was
     * previously tracking an entity or position, it will
     * stop tracking.
     * @param entity - The entity to look at.
     */
    lookAtEntity(entity: Entity): void;
    /**
     * Makes the camera look at a position. If the camera was
     * previously tracking an entity or position, it will
     * stop tracking.
     * @param position - The position to look at.
     */
    lookAtPosition(position: Vector3Like): void;
    /**
     * Resets the camera to its default, unattached,
     * spectator mode state.
     */
    reset(): void;
    /**
     * Sets the entity the camera is attached to.
     * @param entity - The entity to attach the camera to.
     */
    setAttachedToEntity(entity: Entity): void;
    /**
     * Sets the position the camera is attached to.
     * @param position - The position to attach the camera to.
     */
    setAttachedToPosition(position: Vector3Like): void;
    /**
     * Sets the film offset of the camera. A positive value
     * shifts the camera right, a negative value shifts it left.
     * @param filmOffset - The film offset to set.
     */
    setFilmOffset(filmOffset: number): void;
    /**
     * Only used in first-person mode. Sets the forward offset
     * of the camera. A positive value shifts the camera forward,
     * a negative value shifts it backward.
     * @param forwardOffset - The forward offset to set.
     */
    setForwardOffset(forwardOffset: number): void;
    /**
     * Sets the field of view of the camera.
     * @param fov - The field of view to set.
     */
    setFov(fov: number): void;
    /**
     * Sets the nodes of the model the camera is attached to
     * that will not be rendered for the player. Uses case
     * insensitive substring matching.
     * @param modelHiddenNodes - Determines nodes to hide that match these case insensitive substrings.
     */
    setModelHiddenNodes(modelHiddenNodes: string[]): void;
    /**
     * Sets the nodes of the model the camera is attached to
     * that will be rendered for the player, overriding hidden
     * nodes. Uses case insensitive substring matching.
     * @param modelShownNodes - Determines nodes to show that match these case insensitive substrings.
     */
    setModelShownNodes(modelShownNodes: string[]): void;
    /**
     * Sets the mode of the camera.
     * @param mode - The mode to set.
     */
    setMode(mode: PlayerCameraMode): void;
    /**
     * Sets the relative offset of the camera from the
     * entity or position it is attached to.
     * @param offset - The offset to set.
     */
    setOffset(offset: Vector3Like): void;


    /**
     * Only used in third-person mode. Sets the shoulder angle
     * of the camera in degrees. A positive value shifts the
     * camera to the right, a negative value shifts it to the
     * left.
     * @param shoulderAngle - The shoulder angle to set in degrees.
     */
    setShoulderAngle(shoulderAngle: number): void;
    /**
     * Sets the entity the camera will constantly look at,
     * even if the camera attached or tracked entity moves.
     * @param entity - The entity to track or undefined to stop tracking.
     */
    setTrackedEntity(entity: Entity | undefined): void;
    /**
     * Sets the position the camera will constantly look at,
     * even if the camera attached entity moves.
     * @param position - The position to track or undefined to stop tracking.
     */
    setTrackedPosition(position: Vector3Like | undefined): void;
    /**
     * Sets the zoom of the camera.
     * @param zoom - The zoom to set, 0 to infinity.
     */
    setZoom(zoom: number): void;


}

/** Event types a PlayerCamera can emit. See {@link PlayerCameraEventPayloads} for the payloads. @public */
export declare enum PlayerCameraEvent {
    LOOK_AT_ENTITY = "PLAYER_CAMERA.LOOK_AT_ENTITY",
    LOOK_AT_POSITION = "PLAYER_CAMERA.LOOK_AT_POSITION",
    SET_ATTACHED_TO_ENTITY = "PLAYER_CAMERA.SET_ATTACHED_TO_ENTITY",
    SET_ATTACHED_TO_POSITION = "PLAYER_CAMERA.SET_ATTACHED_TO_POSITION",
    SET_FILM_OFFSET = "PLAYER_CAMERA.SET_FILM_OFFSET",
    SET_FORWARD_OFFSET = "PLAYER_CAMERA.SET_FORWARD_OFFSET",
    SET_FOV = "PLAYER_CAMERA.SET_FOV",
    SET_MODEL_HIDDEN_NODES = "PLAYER_CAMERA.SET_MODEL_HIDDEN_NODES",
    SET_MODEL_SHOWN_NODES = "PLAYER_CAMERA.SET_MODEL_SHOWN_NODES",
    SET_MODE = "PLAYER_CAMERA.SET_MODE",
    SET_OFFSET = "PLAYER_CAMERA.SET_OFFSET",
    SET_SHOULDER_ANGLE = "PLAYER_CAMERA.SET_SHOULDER_ANGLE",
    SET_TRACKED_ENTITY = "PLAYER_CAMERA.SET_TRACKED_ENTITY",
    SET_TRACKED_POSITION = "PLAYER_CAMERA.SET_TRACKED_POSITION",
    SET_ZOOM = "PLAYER_CAMERA.SET_ZOOM"
}

/** Event payloads for PlayerCamera emitted events. @public */
export declare interface PlayerCameraEventPayloads {
    /** Emitted when the camera looks at an entity. */
    [PlayerCameraEvent.LOOK_AT_ENTITY]: {
        playerCamera: PlayerCamera;
        entity: Entity;
    };
    /** Emitted when the camera looks at a position. */
    [PlayerCameraEvent.LOOK_AT_POSITION]: {
        playerCamera: PlayerCamera;
        position: Vector3Like;
    };
    /** Emitted when the camera is attached to an entity. */
    [PlayerCameraEvent.SET_ATTACHED_TO_ENTITY]: {
        playerCamera: PlayerCamera;
        entity: Entity;
    };
    /** Emitted when the camera is attached to a position. */
    [PlayerCameraEvent.SET_ATTACHED_TO_POSITION]: {
        playerCamera: PlayerCamera;
        position: Vector3Like;
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
    /** Emitted when the nodes of the model the camera is attached to are set to be hidden. */
    [PlayerCameraEvent.SET_MODEL_HIDDEN_NODES]: {
        playerCamera: PlayerCamera;
        modelHiddenNodes: Set<string>;
    };
    /** Emitted when the nodes of the model the camera is attached to are set to be shown. */
    [PlayerCameraEvent.SET_MODEL_SHOWN_NODES]: {
        playerCamera: PlayerCamera;
        modelShownNodes: Set<string>;
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
    /** Emitted when the tracked entity of the camera is set. */
    [PlayerCameraEvent.SET_TRACKED_ENTITY]: {
        playerCamera: PlayerCamera;
        entity: Entity | undefined;
    };
    /** Emitted when the tracked position of the camera is set. */
    [PlayerCameraEvent.SET_TRACKED_POSITION]: {
        playerCamera: PlayerCamera;
        position: Vector3Like | undefined;
    };
    /** Emitted when the zoom of the camera is set. */
    [PlayerCameraEvent.SET_ZOOM]: {
        playerCamera: PlayerCamera;
        zoom: number;
    };
}

/** The mode of the camera. @public */
export declare enum PlayerCameraMode {
    FIRST_PERSON = 0,
    THIRD_PERSON = 1,
    SPECTATOR = 2
}

/** The camera orientation state of a Player. @public */
export declare type PlayerCameraOrientation = {
    pitch: number;
    yaw: number;
};

/** The cosmetics of a player. @public */
export declare type PlayerCosmetics = {
    equippedItems: {
        slot: string;
        item: PlayerCosmeticsEquippedItem;
    }[];
    hairStyle: number;
    skinTextureUri: string;
};

/** An equipped item of a player's cosmetics. @public */
export declare type PlayerCosmeticsEquippedItem = {
    flags: string[];
    type: string;
    modelUrl: string;
    textureUrl?: string;
};

/** The slots used for player cosmetics. @public */
declare type PlayerCosmeticSlot = 'ALL' | 'BACK' | 'HEAD' | 'LEFT_ARM' | 'LEFT_FOOT' | 'LEFT_HAND' | 'LEFT_ITEM' | 'LEFT_LEG' | 'RIGHT_ARM' | 'RIGHT_FOOT' | 'RIGHT_HAND' | 'RIGHT_ITEM' | 'RIGHT_LEG' | 'TORSO';

/**
 * Represents an entity controlled by a player in a world.
 *
 * @remarks
 * Player entities extend the {@link Entity} class.
 * They can be created and assigned to a player at
 * anytime during gameplay, but most commonly when
 * a player joins a world. PlayerEntity expects
 * a controller to be set prior to spawning.
 * Without setting a controller, the player entity
 * will not respond to player inputs and throw an
 * error.
 *
 * @example
 * ```typescript
 * world.onPlayerJoin = player => {
 *   const playerEntity = new PlayerEntity({
 *     player,
 *     name: 'Player',
 *     modelUri: 'models/players/player.gltf',
 *     modelLoopedAnimations: [ 'idle_lower', 'idle_upper' ],
 *     modelScale: 0.5,
 *   });
 *
 *   playerEntity.spawn(world, { x: 10, y: 20, z: 15 });
 * };
 * ```
 *
 * @public
 */
export declare class PlayerEntity extends Entity {
    /** The player the player entity is assigned to and controlled by. */
    readonly player: Player;
    /** The SceneUI instance for the player entity's nametag. */
    readonly nametagSceneUI: SceneUI;
    /**
     * @param options - The options for the player entity.
     */
    constructor(options: PlayerEntityOptions);


}

/** Options for creating a PlayerEntity instance. @public */
export declare type PlayerEntityOptions = {
    /** The player the player entity is assigned to. */
    player: Player;
} & EntityOptions;

/** Event types a Player can emit. See {@link PlayerEventPayloads} for the payloads. @public */
export declare enum PlayerEvent {
    CHAT_MESSAGE_SEND = "PLAYER.CHAT_MESSAGE_SEND",
    JOINED_WORLD = "PLAYER.JOINED_WORLD",
    LEFT_WORLD = "PLAYER.LEFT_WORLD",
    RECONNECTED_WORLD = "PLAYER.RECONNECTED_WORLD",
    REQUEST_SYNC = "PLAYER.REQUEST_SYNC"
}

/** Event payloads for Player emitted events. @public */
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
    /** Emitted when a player's client requests a round trip time synchronization. */
    [PlayerEvent.REQUEST_SYNC]: {
        player: Player;
        receivedAt: number;
        receivedAtMs: number;
    };
}

/** The input state of a Player; keys from SUPPORTED_INPUT_KEYS. @public */
export declare type PlayerInput = Partial<Record<keyof InputSchema, boolean>>;

/**
 * Manages all connected players in a game server.
 *
 * @remarks
 * The PlayerManager is created internally as a global
 * singleton accessible with the static property
 * `PlayerManager.instance`.
 *
 * <h2>Events</h2>
 *
 * This class emits global events with payloads listed
 * under {@link PlayerManagerEventPayloads}
 *
 * @example
 * ```typescript
 * import { PlayerManager } from 'hytopia';
 *
 * const playerManager = PlayerManager.instance;
 * const connectedPlayers = playerManager.getConnectedPlayers();
 * ```
 *
 * @public
 */
export declare class PlayerManager {
    /** The global PlayerManager instance as a singleton. */
    static readonly instance: PlayerManager;
    /** Optional handler for selecting the world a newly connected player joins. Returning no world results in the player joining the default WorldManager world. */
    worldSelectionHandler?: (player: Player) => Promise<World | undefined>;


    /** The number of players currently connected to the server. */
    get playerCount(): number;
    /**
     * Get all connected players.
     * @returns An array of all connected players.
     */
    getConnectedPlayers(): Player[];
    /**
     * Get all connected players in a specific world.
     * @param world - The world to get connected players for.
     * @returns An array of all connected players in the world.
     */
    getConnectedPlayersByWorld(world: World): Player[];
    /**
     * Get a connected player by their username (case insensitive).
     * @param username - The username of the player to get.
     * @returns The connected player with the given username or undefined if not found.
     */
    getConnectedPlayerByUsername(username: string): Player | undefined;




}

/** Event types a PlayerManager can emit. See {@link PlayerManagerEventPayloads} for the payloads. @public */
export declare enum PlayerManagerEvent {
    PLAYER_CONNECTED = "PLAYER_MANAGER.PLAYER_CONNECTED",
    PLAYER_DISCONNECTED = "PLAYER_MANAGER.PLAYER_DISCONNECTED",
    PLAYER_RECONNECTED = "PLAYER_MANAGER.PLAYER_RECONNECTED"
}

/** Event payloads for PlayerManager emitted events. @public */
export declare interface PlayerManagerEventPayloads {
    /** Emitted when a player connects to the server. */
    [PlayerManagerEvent.PLAYER_CONNECTED]: {
        player: Player;
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
 * @remarks
 * UI allows control of all in-game overlays a player
 * sees. UI is controlled by HTML, CSS and JavaScript
 * files you provide in your `assets` folder.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link PlayerUIEventPayloads}
 *
 * @public
 */
export declare class PlayerUI extends EventRouter {
    /** The player that the UI belongs to. @readonly */
    readonly player: Player;

    /**
     * Loads client UI for the player.
     * @param htmlUri - The ui html uri to load.
     */
    load(htmlUri: string): void;
    /**
     * Locks or unlocks the player's mouse pointer. If the pointer is unlocked
     * with lockPointer(false), the player will not be able to use in-game inputs
     * or camera controls from the mouse pointer until `player.ui.lockPointer(true)`,
     * or in your game's client UI html with `hytopia.lockPointer(true)`.
     *
     * @param lock - Set true to lock the pointer, false to unlock it.
     */
    lockPointer(lock: boolean): void;
    /**
     * Sends data to the player's client UI.
     * @param data - The data to send to the client UI.
     */
    sendData(data: object): void;
}

/** Event types a PlayerUI can emit. See {@link PlayerUIEventPayloads} for the payloads. @public */
export declare enum PlayerUIEvent {
    DATA = "PLAYER_UI.DATA",
    LOAD = "PLAYER_UI.LOAD",
    LOCK_POINTER = "PLAYER_UI.LOCK_POINTER",
    SEND_DATA = "PLAYER_UI.SEND_DATA"
}

/** Event payloads for PlayerUI emitted events. @public */
export declare interface PlayerUIEventPayloads {
    /** Emitted when data is received by the server from the player's client UI. */
    [PlayerUIEvent.DATA]: {
        playerUI: PlayerUI;
        data: Record<string, any>;
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
 * The port the server will run on. You can override
 * this in your .env by setting PORT. When deployed in
 * production to HYTOPIA servers, any .env value will
 * be ignored and 8080 will be used.
 *
 * @public
 */
export declare const PORT: string | 8080;

/**
 * Represents a quaternion.
 *
 * @remarks
 * All quaternion methods result in mutation of the quaternion instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a quaternion. Various convenience methods are
 * provided for common quaternion operations.
 *
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

/** A quaternion. @public */
export declare interface QuaternionLike {
    x: number;
    y: number;
    z: number;
    w: number;
}

/** A raw collider object from the Rapier physics engine. @public */
export declare type RawCollider = RAPIER.Collider;

/** A raw set of collision groups represented as a 32-bit number. @public */
export declare type RawCollisionGroups = RAPIER.InteractionGroups;

/** A raw shape object from the Rapier physics engine. @public */
export declare type RawShape = RAPIER.Shape;

/** A hit result from a raycast. @public */
export declare type RaycastHit = {
    /** The block the raycast hit. */
    hitBlock?: Block;
    /** The entity the raycast hit */
    hitEntity?: Entity;
    /** The point in global coordinate space the raycast hit the object. */
    hitPoint: Vector3Like;
    /** The distance from origin where the raycast hit. */
    hitDistance: number;
};

/** Options for raycasting. @public */
export declare type RaycastOptions = {
    /** Whether to use solid mode for the raycast, defaults to true. */
    solidMode?: boolean;
} & FilterOptions;

/** A RGB color. r, g and b expect a value between 0 and 255. @public */
export declare interface RgbColor {
    r: number;
    g: number;
    b: number;
}

/**
 * Represents a rigid body in a world's physics simulation.
 *
 * @remarks
 * Rigid bodies are the core of the physics simulation. They are
 * used to represent physical objects (IE: entities) that can
 * interact with each other.
 *
 * @public
 */
export declare class RigidBody extends EventRouter {









    /**
     * @param options - The options for the rigid body instance.
     */
    constructor(options: RigidBodyOptions);
    /** The additional mass of the rigid body. */
    get additionalMass(): number;
    /** The additional solver iterations of the rigid body. */
    get additionalSolverIterations(): number;
    /** The angular damping of the rigid body. */
    get angularDamping(): number;
    /** The angular velocity of the rigid body. */
    get angularVelocity(): Vector3Like;
    /** The colliders of the rigid body. */
    get colliders(): Set<Collider>;
    /** The dominance group of the rigid body. */
    get dominanceGroup(): number;
    /** The direction from the rotation of the rigid body. (-Z identity) */
    get directionFromRotation(): Vector3Like;
    /** The effective angular inertia of the rigid body. */
    get effectiveAngularInertia(): SpdMatrix3 | undefined;
    /** The effective inverse mass of the rigid body. */
    get effectiveInverseMass(): Vector3Like | undefined;
    /** The effective world inverse principal angular inertia square root of the rigid body. */
    get effectiveWorldInversePrincipalAngularInertiaSqrt(): SpdMatrix3 | undefined;
    /** The enabled axes of rotational movement of the rigid body. */
    get enabledRotations(): Vector3Boolean;
    /** The enabled axes of positional movement of the rigid body. */
    get enabledPositions(): Vector3Boolean;
    /** The gravity scale of the rigid body. */
    get gravityScale(): number;
    /** The inverse mass of the rigid body. */
    get inverseMass(): number | undefined;
    /** The inverse principal angular inertia square root of the rigid body. */
    get inversePrincipalAngularInertiaSqrt(): Vector3Like | undefined;
    /** Whether the rigid body has continuous collision detection enabled. */
    get isCcdEnabled(): boolean;
    /** Whether the rigid body is dynamic. */
    get isDynamic(): boolean;
    /** Whether the rigid body is enabled. */
    get isEnabled(): boolean;
    /** Whether the rigid body is fixed. */
    get isFixed(): boolean;
    /** Whether the rigid body is kinematic. */
    get isKinematic(): boolean;
    /** Whether the rigid body is kinematic position based. */
    get isKinematicPositionBased(): boolean;
    /** Whether the rigid body is kinematic velocity based. */
    get isKinematicVelocityBased(): boolean;
    /** Whether the rigid body is moving. */
    get isMoving(): boolean;
    /** Whether the rigid body has been removed from the simulation. */
    get isRemoved(): boolean;
    /** Whether the rigid body is simulated. */
    get isSimulated(): boolean;
    /** Whether the rigid body is sleeping. */
    get isSleeping(): boolean;
    /** The linear damping of the rigid body. */
    get linearDamping(): number;
    /** The linear velocity of the rigid body. */
    get linearVelocity(): Vector3Like;
    /** The local center of mass of the rigid body. */
    get localCenterOfMass(): Vector3Like;
    /** The mass of the rigid body. */
    get mass(): number;
    /** The next kinematic rotation of the rigid body. */
    get nextKinematicRotation(): QuaternionLike;
    /** The next kinematic position of the rigid body. */
    get nextKinematicPosition(): Vector3Like;
    /** The number of colliders in the rigid body. */
    get numColliders(): number;
    /** The principal angular inertia of the rigid body. */
    get principalAngularInertia(): Vector3Like;
    /** The principal angular inertia local frame of the rigid body. */
    get principalAngularInertiaLocalFrame(): QuaternionLike | undefined;
    /** The position of the rigid body. */
    get position(): Vector3Like;
    /** The raw RAPIER rigid body instance. */
    get rawRigidBody(): RAPIER.RigidBody | undefined;
    /** The rotation of the rigid body. */
    get rotation(): QuaternionLike;
    /** The soft continuous collision detection prediction of the rigid body. */
    get softCcdPrediction(): number;
    /** The type of the rigid body. */
    get type(): RigidBodyType;
    /** The world center of mass of the rigid body. */
    get worldCenterOfMass(): Vector3Like | undefined;
    /**
     * Sets the additional mass of the rigid body.
     * @param additionalMass - The additional mass of the rigid body.
     */
    setAdditionalMass(additionalMass: number): void;
    /**
     * Sets the additional mass properties of the rigid body.
     * @param additionalMassProperties - The additional mass properties of the rigid body.
     */
    setAdditionalMassProperties(additionalMassProperties: RigidBodyAdditionalMassProperties): void;
    /**
     * Sets the additional solver iterations of the rigid body.
     * @param solverIterations - The additional solver iterations of the rigid body.
     */
    setAdditionalSolverIterations(solverIterations: number): void;
    /**
     * Sets the angular damping of the rigid body.
     * @param angularDamping - The angular damping of the rigid body.
     */
    setAngularDamping(angularDamping: number): void;
    /**
     * Sets the angular velocity of the rigid body.
     * @param angularVelocity - The angular velocity of the rigid body.
     */
    setAngularVelocity(angularVelocity: Vector3Like): void;
    /**
     * Sets whether the rigid body has continuous collision detection enabled.
     * @param ccdEnabled - Whether the rigid body has continuous collision detection enabled.
     */
    setCcdEnabled(ccdEnabled: boolean): void;
    /**
     * Sets the dominance group of the rigid body.
     * @param dominanceGroup - The dominance group of the rigid body.
     */
    setDominanceGroup(dominanceGroup: number): void;
    /**
     * Sets whether the rigid body is enabled.
     * @param enabled - Whether the rigid body is enabled.
     */
    setEnabled(enabled: boolean): void;
    /**
     * Sets whether the rigid body has enabled positional movement.
     * @param enabledPositions - Whether the rigid body has enabled positional movement.
     */
    setEnabledPositions(enabledPositions: Vector3Boolean): void;
    /**
     * Sets whether the rigid body has enabled rotations.
     * @param enabledRotations - Whether the rigid body has enabled rotations.
     */
    setEnabledRotations(enabledRotations: Vector3Boolean): void;
    /**
     * Sets the gravity scale of the rigid body.
     * @param gravityScale - The gravity scale of the rigid body.
     */
    setGravityScale(gravityScale: number): void;
    /**
     * Sets the linear damping of the rigid body.
     * @param linearDamping - The linear damping of the rigid body.
     */
    setLinearDamping(linearDamping: number): void;
    /**
     * Sets the linear velocity of the rigid body.
     * @param linearVelocity - The linear velocity of the rigid body.
     */
    setLinearVelocity(linearVelocity: Vector3Like): void;
    /**
     * Sets the next kinematic rotation of the rigid body.
     * @param nextKinematicRotation - The next kinematic rotation of the rigid body.
     */
    setNextKinematicRotation(nextKinematicRotation: QuaternionLike): void;
    /**
     * Sets the next kinematic position of the rigid body.
     * @param nextKinematicPosition - The next kinematic position of the rigid body.
     */
    setNextKinematicPosition(nextKinematicPosition: Vector3Like): void;
    /**
     * Sets the position of the rigid body.
     * @param position - The position of the rigid body.
     */
    setPosition(position: Vector3Like): void;
    /**
     * Sets the rotation of the rigid body.
     * @param rotation - The rotation of the rigid body.
     */
    setRotation(rotation: QuaternionLike): void;
    /**
     * Sets whether the rigid body is sleeping.
     * @param sleeping - Whether the rigid body is sleeping.
     */
    setSleeping(sleeping: boolean): void;
    /**
     * Sets the soft ccd prediction of the rigid body.
     * @param softCcdPrediction - The soft ccd prediction of the rigid body.
     */
    setSoftCcdPrediction(softCcdPrediction: number): void;
    /**
     * Sets the collision groups for solid colliders (non-sensor) of the rigid body.
     * @param collisionGroups - The collision groups for solid colliders of the rigid body.
     */
    setCollisionGroupsForSolidColliders(collisionGroups: CollisionGroups): void;
    /**
     * Sets the collision groups for sensor colliders of the rigid body.
     * @param collisionGroups - The collision groups for sensor colliders of the rigid body.
     */
    setCollisionGroupsForSensorColliders(collisionGroups: CollisionGroups): void;
    /**
     * Sets the type of the rigid body.
     * @param type - The type of the rigid body.
     */
    setType(type: RigidBodyType): void;
    /**
     * Adds a force to the rigid body.
     * @param force - The force to add to the rigid body.
     */
    addForce(force: Vector3Like): void;
    /**
     * Adds a torque to the rigid body.
     * @param torque - The torque to add to the rigid body.
     */
    addTorque(torque: Vector3Like): void;
    /**
     * Adds an unsimulated child collider to the rigid body for the simulation it belongs to.
     * @param collider - The child collider to add to the rigid body for the simulation it belongs to.
     */
    addChildColliderToSimulation(collider: Collider): void;
    /**
     * Adds the rigid body to a simulation.
     * @param simulation - The simulation to add the rigid body to.
     */
    addToSimulation(simulation: Simulation): void;
    /**
     * Applies an impulse to the rigid body.
     * @param impulse - The impulse to apply to the rigid body.
     */
    applyImpulse(impulse: Vector3Like): void;
    /**
     * Applies an impulse to the rigid body at a point.
     * @param impulse - The impulse to apply to the rigid body.
     * @param point - The point at which to apply the impulse.
     */
    applyImpulseAtPoint(impulse: Vector3Like, point: Vector3Like): void;
    /**
     * Applies a torque impulse to the rigid body.
     * @param impulse - The torque impulse to apply to the rigid body.
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
     */
    createAndAddChildColliders(colliderOptions: ColliderOptions[]): Collider[];
    /**
     * Gets the colliders of the rigid body by tag.
     * @param tag - The tag to filter by.
     * @returns The colliders of the rigid body with the given tag.
     */
    getCollidersByTag(tag: string): Collider[];

    /**
     * Locks all rotations of the rigid body.
     */
    lockAllRotations(): void;
    /**
     * Locks all positional movement of the rigid body.
     */
    lockAllPositions(): void;
    /**
     * Removes the rigid body from the simulation it belongs to.
     */
    removeFromSimulation(): void;

    /**
     * Resets the angular velocity of the rigid body.
     */
    resetAngularVelocity(): void;
    /**
     * Resets the forces actiong on the rigid body.
     */
    resetForces(): void;
    /**
     * Resets the linear velocity of the rigid body.
     */
    resetLinearVelocity(): void;
    /**
     * Resets the torques acting on the rigid body.
     */
    resetTorques(): void;
    /**
     * Explicitly puts the rigid body to sleep. Physics otherwise optimizes sleeping.
     */
    sleep(): void;
    /**
     * Wakes up the rigid body. Physics otherwise optimizes waking it when necessary.
     */
    wakeUp(): void;












}

/** Additional mass properties for a RigidBody. @public */
export declare type RigidBodyAdditionalMassProperties = {
    additionalMass: number;
    centerOfMass: Vector3Like;
    principalAngularInertia: Vector3Like;
    principalAngularInertiaLocalFrame: QuaternionLike;
};

/** The options for a rigid body. @public */
export declare type RigidBodyOptions = DynamicRigidBodyOptions | FixedRigidBodyOptions | KinematicPositionRigidBodyOptions | KinematicVelocityRigidBodyOptions;

/** The types a RigidBody can be. @public */
export declare enum RigidBodyType {
    DYNAMIC = "dynamic",
    FIXED = "fixed",
    KINEMATIC_POSITION = "kinematic_position",
    KINEMATIC_VELOCITY = "kinematic_velocity"
}

/** The options for a round cylinder collider. @public */
export declare interface RoundCylinderColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.ROUND_CYLINDER;
    /** The border radius of the round cylinder collider. */
    borderRadius?: number;
    /** The half height of the round cylinder collider. */
    halfHeight?: number;
    /** The radius of the round cylinder collider. */
    radius?: number;
}

/**
 * UI rendered within the 3D space of a world's
 * game scene.
 *
 * @remarks
 * SceneUI instances are created directly as instances.
 * They support a variety of configuration options through
 * the {@link SceneUIOptions} constructor argument.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link SceneUIEventPayloads}
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
     * @param world - The world to load the SceneUI into.
     */
    load(world: World): void;
    /**
     * Sets the entity to which the SceneUI is attached, following its position.
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
     * Sets the position of the SceneUI. Will detach from entity if attached.
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

/** Event types a SceneUI instance can emit. See {@link SceneUIEventPayloads} for the payloads. @public */
export declare enum SceneUIEvent {
    LOAD = "SCENE_UI.LOAD",
    SET_ATTACHED_TO_ENTITY = "SCENE_UI.SET_ATTACHED_TO_ENTITY",
    SET_OFFSET = "SCENE_UI.SET_OFFSET",
    SET_POSITION = "SCENE_UI.SET_POSITION",
    SET_STATE = "SCENE_UI.SET_STATE",
    SET_VIEW_DISTANCE = "SCENE_UI.SET_VIEW_DISTANCE",
    UNLOAD = "SCENE_UI.UNLOAD"
}

/** Event payloads for SceneUI emitted events. @public */
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
 * @remarks
 * The SceneUIManager is created internally as a singleton
 * for each {@link World} instance in a game server.
 * It allows retrieval of all loaded SceneUI instances,
 * entity attached SceneUI instances, and more.
 *
 * @public
 */
export declare class SceneUIManager {




    /** The world the SceneUIManager is for. */
    get world(): World;
    /**
     * Retrieves all loaded SceneUI instances for the world.
     *
     * @returns An array of SceneUI instances.
     */
    getAllSceneUIs(): SceneUI[];
    /**
     * Retrieves all loaded SceneUI instances attached to a specific entity.
     *
     * @param entity - The entity to get attached SceneUI instances for.
     * @returns An array of SceneUI instances.
     */
    getAllEntityAttachedSceneUIs(entity: Entity): SceneUI[];
    /**
     * Retrieves a SceneUI instance by its unique identifier (id).
     *
     * @param id - The unique identifier (id) of the SceneUI to retrieve.
     * @returns The SceneUI instance if found, otherwise undefined.
     */
    getSceneUIById(id: number): SceneUI | undefined;

    /**
     * Unloads and unregisters all SceneUI instances attached to a specific entity.
     *
     * @param entity - The entity to unload and unregister SceneUI instances for.
     */
    unloadEntityAttachedSceneUIs(entity: Entity): void;

}

/** Options for creating a SceneUI instance. @public */
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
 * @remarks
 * This class implements simple movement methods that serve
 * as a way to add realistic movement and rotational facing
 * functionality to an entity. This is also a great base to
 * extend for your own more complex entity controller
 * that implements things like pathfinding. Compatible with
 * entities that have kinematic or dynamic rigid body types.
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
     */
    constructor(options?: SimpleEntityControllerOptions);
    /**
     * Override of the {@link BaseEntityController.spawn} method. Starts
     * the set idle animations (if any) when the entity is spawned.
     * @param entity - The entity that was spawned.
     */
    spawn(entity: Entity): void;
    /**
     * Rotates the entity at a given speed to face a target coordinate.
     *
     * @remarks
     * If this method is called while the entity is already attempting
     * to face another target, the previous target will be ignored and
     * the entity will start attempting to face the new target.
     *
     * @param target - The target coordinate to face.
     * @param speed - The speed at which to rotate to the target coordinate.
     * @param options - Additional options for the face operation, such as callbacks.
     */
    face(target: Vector3Like, speed: number, options?: FaceOptions): void;
    /**
     * Applies an upwards impulse to the entity to simulate a jump, only supported
     * for entities with dynamic rigid body types.
     *
     * @param height - The height to jump to.
     */
    jump(height: number): void;
    /**
     * Moves the entity at a given speed in a straight line to a target coordinate.
     *
     * @remarks
     * If this method is called while the entity is already attempting
     * to move to another target, the previous target will be ignored and
     * the entity will start attempting to move to the new target.
     *
     * @param target - The target coordinate to move to.
     * @param speed - The speed at which to move to the target coordinate.
     * @param options - Additional options for the move operation, such as callbacks.
     */
    move(target: Vector3Like, speed: number, options?: MoveOptions): void;
    /**
     * Stops the entity from attempting to face a target coordinate.
     */
    stopFace(): void;
    /**
     * Stops the entity from continuing to move it's current target coordinate.
     */
    stopMove(): void;




}

/** Options for creating a SimpleEntityController instance. @public */
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
 * @remarks
 * The simulation internally and automatically handles the physical
 * interactions, collisions, contact forces, and events for all aspects
 * of the world. Most methods are not often used directly, but are
 * provided for advanced usage.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link SimulationEventPayloads}
 *
 * @public
 */
export declare class Simulation extends EventRouter {









    /** Whether the simulation has debug raycasting enabled */
    get isDebugRaycastingEnabled(): boolean;
    /** Whether the simulation has debug rendering enabled. */
    get isDebugRenderingEnabled(): boolean;
    /** The gravity vector for the simulation. */
    get gravity(): RAPIER.Vector3;
    /** The fixed timestep for the simulation. */
    get timestepS(): number;
    /** The world the simulation is for. */
    get world(): World;


    /**
     * Enables or disables debug raycasting for the simulation.
     * This will render lines for the raycast that disappear
     * after a few seconds.
     * @param enabled - Whether to enable debug raycasting.
     */
    enableDebugRaycasting(enabled: boolean): void;
    /**
     * Enables or disables debug rendering for the simulation.
     * When enabled, all colliders and rigid body outlines
     * will be rendered in the world. Do not enable this in production.
     * In large worlds enabling this can cause noticable lag and RTT spikes.
     * @param enabled - Whether to enable debug rendering.
     */
    enableDebugRendering(enabled: boolean, filterFlags?: RAPIER.QueryFilterFlags): void;
    /**
     * Gets the contact manifolds for a pair of colliders.
     *
     * @remarks
     * Contact manifolds will not be returned for contacts that
     * involve sensors.
     *
     * @param colliderHandleA - The handle of the first collider.
     * @param colliderHandleB - The handle of the second collider.
     * @returns The contact manifolds, or an empty array if no contact.
     */
    getContactManifolds(colliderHandleA: RAPIER.ColliderHandle, colliderHandleB: RAPIER.ColliderHandle): ContactManifold[];
    /**
     * Gets the intersections with a raw shape.
     *
     * @remarks
     * rawShape can be retrieved from a simulated or
     * unsimulated collider using {@link Collider.rawShape}.
     *
     * @param rawShape - The raw shape to get intersections with.
     * @param position - The position of the shape.
     * @param rotation - The rotation of the shape.
     * @param options - The options for the intersections.
     * @returns The intersections.
     */
    intersectionsWithRawShape(rawShape: RawShape, position: Vector3Like, rotation: QuaternionLike, options?: FilterOptions): IntersectionResult[];
    /**
     * Casts a ray through the simulation.
     *
     * @remarks
     * The cast ray will stop at the the first block or
     * entity hit within the length of the ray.
     *
     * @param origin - The origin of the ray.
     * @param direction - The direction of the ray.
     * @param length - The length of the ray.
     * @param options - The options for the raycast.
     * @returns A RaycastHit object containing the first block or entity hit by the ray, or null if no hit.
     */
    raycast(origin: RAPIER.Vector3, direction: RAPIER.Vector3, length: number, options?: RaycastOptions): RaycastHit | null;


    /**
     * Sets the gravity vector for the simulation.
     * @param gravity - The gravity vector.
     */
    setGravity(gravity: RAPIER.Vector3): void;




}

/** Event types a Simulation instance can emit. See {@link SimulationEventPayloads} for the payloads. @public */
export declare enum SimulationEvent {
    STEP_START = "SIMULATION.STEP_START",
    STEP_END = "SIMULATION.STEP_END",
    DEBUG_RAYCAST = "SIMULATION.DEBUG_RAYCAST",
    DEBUG_RENDER = "SIMULATION.DEBUG_RENDER"
}

/** Event payloads for Simulation emitted events. @public */
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

/** A 3x3 symmetric positive-definite matrix for spatial dynamics. @public */
export declare interface SpdMatrix3 extends SdpMatrix3 {
}

/**
 * The entry point for running game setup and starting the game server.
 *
 * @remarks
 * This function should always be called first when initializing your
 * game. It will internally handle initialization of the physics engine
 * and other systems required systems. All of your game setup logic
 * should be executed in the init function.
 *
 * @param init - A function that initializes the game. The function can take no parameters
 * to just initialize game logic, or it can accept a world parameter. If it accepts a world
 * parameter, a default world will be automatically created and passed to the function.
 *
 * @public
 */
export declare function startServer(init: ((() => void) | ((world: World) => void))): void;

/** The input keys that are included in the PlayerInput. @public */
export declare const SUPPORTED_INPUT_KEYS: readonly ["w", "a", "s", "d", "sp", "sh", "tb", "ml", "mr", "q", "e", "r", "f", "z", "x", "c", "v", "u", "i", "o", "j", "k", "l", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

/**
 * Manages performance telemetry and error tracking through your Sentry.io account.
 *
 * @remarks
 * The Telemetry class provides low-overhead performance monitoring
 * and error tracking through Sentry (https://sentry.io) integration
 * and your provided Sentry DSN. It automatically tracks critical game loop
 * operations like physics simulation, entity updates, network synchronization,
 * and more. The system only sends telemetry data when errors or slow-tick
 * performance issues are detected, minimizing bandwidth and storage costs.
 *
 * @example
 * ```typescript
 * // Initialize Sentry for production telemetry
 * Telemetry.initializeSentry('MY_SENTRY_PROJECT_DSN');
 *
 * // Wrap performance-critical code in spans
 * Telemetry.startSpan({
 *   operation: TelemetrySpanOperation.CUSTOM_OPERATION,
 *   attributes: { // any arbitrary attributes you want to attach to the span
 *     playerCount: world.playerManager.connectedPlayers.length,
 *     entityCount: world.entityManager.entityCount,
 *   },
 * }, () => {
 *   // Your performance-critical code here
 *   performExpensiveOperation();
 * });
 *
 * // Get current process statistics
 * const stats = Telemetry.getProcessStats();
 * console.log(`Heap usage: ${stats.jsHeapUsagePercent * 100}%`);
 * ```
 *
 * @public
 */
export declare class Telemetry {
    /**
     * Gets current process memory and performance statistics.
     *
     * @param asMeasurement - Whether to return data in Sentry measurement format with units.
     * @returns Process statistics including heap usage, RSS memory, and capacity metrics.
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
     */
    static sentry(): typeof Sentry;
}

/** Performance telemetry span operation types. @public */
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

/** Options for creating a telemetry span. @public */
export declare type TelemetrySpanOptions = {
    /** The operation being measured. */
    operation: TelemetrySpanOperation | string;
    /** Additional attributes to attach to the span for context. */
    attributes?: Record<string, string | number>;
};

/** The options for a trimesh collider. @public */
export declare interface TrimeshColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.TRIMESH;
    /** The indices of the trimesh collider. */
    indices?: Uint32Array;
    /** The vertices of the trimesh collider. */
    vertices?: Float32Array;
}

/**
 * Represents a 2D vector.
 *
 * @remarks
 * All vector methods result in mutation of the vector instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 2-dimensional vector. Various convenience
 * methods are provided for common vector operations.
 *
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

/** A 2-dimensional vector of boolean values. @public */
export declare interface Vector2Boolean {
    x: boolean;
    y: boolean;
}

/** A 2-dimensional vector. @public */
export declare interface Vector2Like {
    x: number;
    y: number;
}

/**
 * Represents a 3-dimensional vector.
 *
 * @remarks
 * All vector methods result in mutation of the vector instance.
 * This class extends `Float32Array` to provide an efficient way to
 * create and manipulate a 3-dimensional vector. Various convenience
 * methods are provided for common vector operations.
 *
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

/** A 3-dimensional vector of boolean values. @public */
export declare interface Vector3Boolean {
    x: boolean;
    y: boolean;
    z: boolean;
}

/** A 3-dimensional vector. @public */
export declare interface Vector3Like {
    x: number;
    y: number;
    z: number;
}

/** The options for a voxels collider. @public */
export declare interface VoxelsColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.VOXELS;
    /** The coordinate of each voxel in the collider. */
    coordinates?: Vector3Like[];
    /** The size of each voxel in the collider. */
    size?: Vector3Like;
}

/**
 * A callback function called when the entity associated with the
 * PathfindingEntityController finishes moving to a calculate waypoint
 * of its current path.
 * @param waypoint - The waypoint that the entity has finished moving to.
 * @param waypointIndex - The index of the waypoint that the entity has finished moving to.
 * @public
 */
export declare type WaypointMoveCompleteCallback = (waypoint: Vector3Like, waypointIndex: number) => void;

/**
 * A callback function called when the entity associated with the
 * PathfindingEntityController skips a waypoint because it took too long to reach.
 * @param waypoint - The waypoint that the entity skipped.
 * @param waypointIndex - The index of the waypoint that the entity skipped.
 * @public
 */
export declare type WaypointMoveSkippedCallback = (waypoint: Vector3Like, waypointIndex: number) => void;

/** The options for a wedge collider. @public */
export declare interface WedgeColliderOptions extends BaseColliderOptions {
    shape: ColliderShape.WEDGE;
    /** The extents of the wedge collider, defining full width (x), height (y), and length (z). */
    extents?: Vector3Like;
}

/**
 * Represents a world in the game server.
 *
 * @remarks
 * Worlds are the primary container for game objects
 * and interactions. A game can have multiple worlds running
 * simultaneously, each uniquely isolated from each other.
 * Players who have joined your server can be assigned to a world
 * programmatically by your game logic if desired. This is useful
 * for things like mini-games, or complex dungeons with multiple
 * floors that can be optimized by splitting them into seperate
 * world or "room" simulations, etc. In most cases, the single
 * automatically created default world is all you need, but
 * this flexibility is available for more complex games.
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link WorldEventPayloads}
 *
 * @example
 * ```typescript
 * const world = new World({
 *   id: 1,
 *   name: 'My World',
 *   skyboxUri: 'skyboxes/partly-cloudy',
 * });
 * ```
 *
 * @public
 */
export declare class World extends EventRouter implements protocol.Serializable {
























    /**
     * @param options - The options for the world.
     */
    constructor(options: WorldOptions);
    /** The unique ID of the world. */
    get id(): number;
    /** The color of the ambient light. */
    get ambientLightColor(): RgbColor;
    /** The intensity of the ambient light. */
    get ambientLightIntensity(): number;
    /** The block type registry for the world. */
    get blockTypeRegistry(): BlockTypeRegistry;
    /** The chat manager for the world. */
    get chatManager(): ChatManager;
    /** The chunk lattice for the world. */
    get chunkLattice(): ChunkLattice;
    /** The color of the directional light. */
    get directionalLightColor(): RgbColor;
    /** The intensity of the directional light. */
    get directionalLightIntensity(): number;
    /** The position the directional light originates from. */
    get directionalLightPosition(): Vector3Like;
    /** The entity manager for the world. */
    get entityManager(): EntityManager;
    /** The color of the fog, if not explicitly set, defaults to ambient light color. */
    get fogColor(): RgbColor | undefined;
    /** The maximum distance from the camera at which fog stops being applied. */
    get fogFar(): number;
    /** The minimum distance from the camera to start applying fog. */
    get fogNear(): number;
    /** The light manager for the world. */
    get lightManager(): LightManager;
    /** The world loop for the world. */
    get loop(): WorldLoop;
    /** The name of the world. */
    get name(): string;

    /** The particle emitter manager for the world. */
    get particleEmitterManager(): ParticleEmitterManager;
    /** The scene UI manager for the world. */
    get sceneUIManager(): SceneUIManager;
    /** The simulation for the world. */
    get simulation(): Simulation;
    /** The intensity of the world's skybox brightness. */
    get skyboxIntensity(): number;
    /** The URI of the skybox cubemap for the world. */
    get skyboxUri(): string;
    /** The audio manager for the world. */
    get audioManager(): AudioManager;
    /** An arbitrary identifier tag of the world. Useful for your own logic. */
    get tag(): string | undefined;
    /**
     * Loads a map into the world, clearing any prior map.
     * @param map - The map to load.
     */
    loadMap(map: WorldMap): void;
    /**
     * Sets the color of the world's ambient light.
     * @param color - The color of the light.
     */
    setAmbientLightColor(color: RgbColor): void;
    /**
     * Sets the intensity of the world's ambient light.
     * @param intensity - The intensity.
     */
    setAmbientLightIntensity(intensity: number): void;
    /**
     * Sets the color of the world's directional light.
     * @param color - The color of the light.
     */
    setDirectionalLightColor(color: RgbColor): void;
    /**
     * Sets the intensity of the world's directional light.
     * @param intensity - The intensity.
     */
    setDirectionalLightIntensity(intensity: number): void;
    /**
     * Sets the position the world's directional light originates
     * from relative to a player's camera position.
     * @param position - The position the directional light originates from relative to the player's camera position.
     */
    setDirectionalLightPosition(position: Vector3Like): void;
    /**
     * Sets the color of the world's fog.
     * @param color - The color of the fog, or undefined to reset to ambient light color.
     */
    setFogColor(color: RgbColor | undefined): void;
    /**
     * Sets the maximum distance from the camera at which fog stops being applied.
     * @param far - The far distance.
     */
    setFogFar(far: number): void;
    /**
     * Sets the minimum distance from the camera to start applying fog.
     * @param near - The near distance.
     */
    setFogNear(near: number): void;
    /**
     * Sets the intensity of the world's skybox brightness.
     * @param intensity - The intensity.
     */
    setSkyboxIntensity(intensity: number): void;
    /**
     * Starts the world loop, which begins ticking physics, entities, etc.
     */
    start(): void;
    /**
     * Stops the world loop, which stops ticking physics, entities, etc.
     */
    stop(): void;

}

/** Event types a World instance can emit. See {@link WorldEventPayloads} for the payloads. @public */
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
    START = "WORLD.START",
    STOP = "WORLD.STOP"
}

/** Event payloads for World emitted events. @public */
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
 * @remarks
 * The world loop automatically handles ticking physics,
 * entities, and other world logic.
 *
 * The internal order of tick operations is as follows:
 *
 * 1. Update chunks and meshing
 *
 * 2. Tick entity logic
 *
 * 3. Step physics
 *
 * 4. Check and emit entity updates
 *
 * 5. Synchronize network packets with player clients
 *
 * <h2>Events</h2>
 *
 * This class is an EventRouter, and instances of it emit
 * events with payloads listed under {@link WorldLoopEventPayloads}
 *
 * @public
 */
export declare class WorldLoop extends EventRouter {




    /** The current tick of the world loop. */
    get currentTick(): number;
    /** Whether the world loop is started. */
    get isStarted(): boolean;
    /** The next tick time in milliseconds. */
    get nextTickMs(): number;
    /** The fixed timestep of the world loop in seconds. */
    get timestepS(): number;
    /** The world that the loop manages. */
    get world(): World;




}

/** Event types a WorldLoop instance can emit. See {@link WorldLoopEventPayloads} for the payloads. @public */
export declare enum WorldLoopEvent {
    START = "WORLD_LOOP.START",
    STOP = "WORLD_LOOP.STOP",
    TICK_START = "WORLD_LOOP.TICK_START",
    TICK_END = "WORLD_LOOP.TICK_END",
    TICK_ERROR = "WORLD_LOOP.TICK_ERROR"
}

/** Event payloads for WorldLoop emitted events. @public */
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
 * @remarks
 * The WorldManager is created internally as a global
 * singleton accessible with the static property
 * `WorldManager.instance`.
 *
 * <h2>Events</h2>
 *
 * This class emits global events with payloads listed
 * under {@link WorldManagerEventPayloads}
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
 * @public
 */
export declare class WorldManager {
    /** The global WorldManager instance as a singleton. */
    static readonly instance: WorldManager;



    /**
     * Creates a new world.
     * @param options - The options for the world.
     * @param start - Whether to start the world immediately, defaults to true.
     * @returns The created world.
     */
    createWorld(options: Omit<WorldOptions, 'id'>): World;
    /**
     * Gets all worlds.
     * @returns All worlds.
     */
    getAllWorlds(): World[];
    /**
     * Gets the default world.
     * @returns The default world.
     */
    getDefaultWorld(): World;
    /**
     * Gets all worlds with a specific tag.
     * @param tag - The tag to get the worlds for.
     * @returns All worlds with the provided tag.
     */
    getWorldsByTag(tag: string): World[];
    /**
     * Gets a world by its id.
     * @param id - The id of the world to get.
     * @returns The world with the provided id, or undefined if no world is found.
     */
    getWorld(id: number): World | undefined;
    /**
     * Sets the default world. This is the world players
     * automatically join when they connect to the game.
     * @param world - The world to set as the default.
     */
    setDefaultWorld(world: World): void;
}

/** Event types a WorldManager instance can emit to the global event router. See {@link WorldManagerEventPayloads} for the payloads. @public */
export declare enum WorldManagerEvent {
    WORLD_CREATED = "WORLD_MANAGER.WORLD_CREATED"
}

/** Event payloads for WorldManager emitted events. @public */
export declare interface WorldManagerEventPayloads {
    /** Emitted when a world is created. */
    [WorldManagerEvent.WORLD_CREATED]: {
        world: World;
    };
}

/** A map representation for a world. @public */
export declare interface WorldMap {
    /** The block types in the map. */
    blockTypes?: BlockTypeOptions[];
    /** The blocks in the map */
    blocks?: {
        /** The global coordinate to block type id mapping. */
        [coordinate: string]: number;
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

/** Options for creating a World instance. @public */
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
