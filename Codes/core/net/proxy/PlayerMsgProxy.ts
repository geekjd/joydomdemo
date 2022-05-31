import App from "src/core/App";
import CodeS2C from "../CodeS2C";
import MessageProxy from "./MessageProxy";

/**
 * 测试数据
 */
export default class PlayerMsgProxy extends MessageProxy {
    public constructor() {
        super();
    }

    protected addEvent(): void {
        App.socket.addEventListener(CodeS2C.LOGIN, this, this.__playerHandler);
    }

    private __playerHandler(msg: any): void {
        o2o(msg, App.player);
    }

    /**发送测试数据 */
    public static sendTestMessage(msgId: number, type: number): void {
        let obj: any = {};
        obj.msgId = msgId;
        obj.type = type;
        App.socket.send(obj);
    }
}