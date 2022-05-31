import LayerManager from "src/Game/Manager/LayerManager";
import SceneManager from "src/Game/Manager/SceneManager";
import MessageProxyManager from "./manager/MessageProxyManager";
import PlayerManager from "./manager/PlayerManager";
import SocketManager from "./manager/SocketManager";

export default class App {
    public static socket: SocketManager;
    public static message: MessageProxyManager;
    public static layer: LayerManager;
    public static scene: SceneManager;
    // public static camera2d: Camera2DManager;
    // public static stage: StageManager;

    public static player: PlayerManager;

    public static init(): void {
        this.initManager();
    }

    public static initManager(): void {
        // App.stage = StageManager.instance;
        App.layer = LayerManager.instance;
        App.socket = SocketManager.instance;
        App.message = MessageProxyManager.instance;
        App.scene = SceneManager.instance;
        // App.camera2d = Camera2DManager.instance;

        App.player = PlayerManager.instance;
    }
}