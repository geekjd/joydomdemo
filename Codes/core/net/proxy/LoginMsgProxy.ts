import App from "src/core/App";
// import GEvent from "src/Game/MesEvent/GEvent";
import MesManager from "src/_T/Mes/MesManager";
import CodeS2C from "../CodeS2C";
import MessageProxy from "./MessageProxy";

/**
 * 测试数据
 */
export default class LoginMsgProxy extends MessageProxy {
    public constructor() {
        super();
    }

    protected addEvent(): void {
        App.socket.addEventListener(CodeS2C.LOGIN, this, this.__loginHandler);
    }

    /**收到消息 */
    private __loginHandler(msg: any): void {
        //登录返回 0：ok,1:账号密码错误
        let result: number = msg.Result;
        if (result == 1) {
            console.log("账号密码错误");
            return;
        }
        let actorId: number = msg.ActorId;

        App.player.actorId = actorId;

        // MesManager.event(GEvent.LOGIN_SUCCESS);
    }
}