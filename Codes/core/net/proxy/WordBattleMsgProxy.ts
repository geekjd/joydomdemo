import App from "src/core/App";
import CodeS2C from "../CodeS2C";
import MessageProxy from "./MessageProxy";

/**
 * 测试数据
 */
export default class WordBattleMsgProxy extends MessageProxy {
    public constructor() {
        super();
    }

    protected addEvent(): void {
        App.socket.addEventListener(CodeS2C.WORD_BATTLE, this, this.__worldBattleHandler);
        App.socket.addEventListener(CodeS2C.WORD_BATTLE_RESULT, this, this.__worldBattleResultHandler);
    }

    /**
     * 挑战世界地图
     * @param msg 
     */
    private __worldBattleHandler(msg: any): void {

    }

    /**
     * 挑战世界地图
     * @param msg 
     */
    private __worldBattleResultHandler(msg: any): void {

    }
}