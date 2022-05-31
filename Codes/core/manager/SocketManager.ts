import InstanceT from "src/_T/Ts/InstanceT";
import Socket from "../net/Socket";

@InstanceT.DecorateInstance()
export default class SocketManager {
    public static readonly instance: SocketManager;

    /**游戏服 */
    private _gameSocket: Socket;
    /**战斗服 */
    private _battleSocket: Socket;

    private _eventDic: object;

    public constructor() {
        this.init();
    }

    private init(): void {
        this._eventDic = {};

        this._gameSocket = new Socket(this, this._gameSocketHandler);
    }

    /**打开游戏服 */
    public openGame(ip: string, port: number): void {
        this._gameSocket.connect(ip, port);
    }

    /**打开战斗服 */
    public openBattle(): void {

    }

    public send(msg: any): void {
        this._gameSocket.sendMessage(msg);
    }

    private _gameSocketHandler(msgId: number, message: any): void {
        this._dispatchEventHandler(msgId, message);
    }

    private _dispatchEventHandler(msgId: number, message: any): void {
        let list = this._eventDic[msgId];
        if (!list) return;
        if (list.length == 0) return;

        for (let i = 0, len = list.length; i < len; i++) {
            let infos = list[i];
            (<Function>infos[1]).apply(infos[0], message);
        }
    }

    public addEventListener(msgId: number, caller: any, listener: Function): void {
        let list = this._eventDic[msgId];
        if (!list) {
            list = this._eventDic[msgId] = [];
        }

        for (let i = 0, len = list.length; i < len; i++) {
            let infos = list[i];
            if (infos[0] == caller && infos[1] == listener) {
                return;
            }
        }

        list.push([caller, listener]);
    }

    public removeEventListener(msgId: number, caller: any, listener: Function): void {
        let list = this._eventDic[msgId];
        if (!list) return;

        for (let i = 0, len = list.length; i < len; i++) {
            let infos = list[i];
            if (infos[0] == caller && infos[1] == listener) {
                list.splice(i, 1);
                return;
            }
        }
    }
}