import GameConst from "../GameConst";

export default class Socket {

    private _socket: Laya.Socket;

    private _caller: any;
    private _listener: Function;
    public constructor(caller: any, listener: Function) {
        this._caller = caller;
        this._listener = listener;
    }

    public connect(ip: string, port: number) {
        this.connectByUrl(`ws://${ip}:${port}/login`);
    }

    public connectByUrl(wss: string) {
        if (!this._socket) {
            this._socket = new Laya.Socket();
            this._socket.endian = Laya.Socket.LITTLE_ENDIAN;
            this._socket.on(Laya.Event.OPEN, this, this.__openHandler);
            this._socket.on(Laya.Event.ERROR, this, this.__errorHandler);
            this._socket.on(Laya.Event.MESSAGE, this, this.__messageHandler);
            this._socket.on(Laya.Event.CLOSE, this, this.__closeHandler);
            this._socket.connectByUrl(wss);
        }
    }

    public sendMessage(msg: any): void {
        var str: string = JSON.stringify(msg);
        var bytes: Laya.Byte = new Laya.Byte()
        bytes.writeUint16(msg.msgId)
        bytes.writeUTFString(str)
        this._socket.send(bytes.buffer)
    }

    /**
     * 接受到服务器消息
     * @param event 
     */
    private __messageHandler(event: Laya.Event): void {
        let input: Laya.Byte = this._socket.input;

        let msgId = input.readUint16();
        let message = JSON.parse(input.readUTFString());

        console.log(`s2c->${msgId}`);

        this._listener.apply(this._caller, [msgId, message]);
    }

    /**
     * 连接成功
     * @param event 
     */
    private __openHandler(event: Laya.Event): void {
        console.log("连接成功");
        this.sendMessage({ msgId: 201, Plat: GameConst.plat, Account: GameConst.accout, Pwd: "1" });
        console.log("c2s->请求登录->账号:" + GameConst.accout + "，平台：" + GameConst.plat);

        Laya.timer.loop(10000, this, this._heartHandler);
    }

    private _heartHandler(): void {
        this.sendMessage({ msgId: 4 });
    }

    /**
     * 连接错误
     * @param event 
     */
    private __errorHandler(event: Laya.Event): void {
        console.log("连接错误");
    }

    /**
     * 连接关闭
     * @param event 
     */
    private __closeHandler(event: Laya.Event): void {
        console.log("连接关闭");
    }
}