import App from "src/core/App";
import CodeS2C from "../CodeS2C";
import MessageProxy from "./MessageProxy";

/**
 * 测试数据
 */
export default class TestMsgProxy extends MessageProxy {
    public constructor() {
        super();
    }

    protected addEvent(): void {
        App.socket.addEventListener(CodeS2C.TEST, this, this.__testHandler);
    }

    /**收到消息 */
    private __testHandler(message): void {
        console.log("---------收到测试消息-------", message);
    }

    /**发送测试数据 */
    public static sendTestMessage(msgId: number, type: number): void {
        let obj: any = {};
        obj.msgId = msgId;
        obj.type = type;
        App.socket.send(obj);
    }
}