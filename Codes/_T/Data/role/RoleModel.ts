import { RoleVO } from './RoleVO';
import CodeS2C from "src/core/net/CodeS2C";
import { IBaseModel } from "src/_T/com/ModelManager";
import App from "src/core/App";
import ConfigDB from 'src/core/ConfigDB';

/**
 * @export 角色Model
 * @class RoleModel
 * @implements {IBaseModel}
 */
export class RoleModel implements IBaseModel {

    /**服务器传过来的英雄数据 */
    private _heroData = [];
    /**所有的英雄数据map */
    private _allHeroMap: Map<number, RoleVO> = new Map();
    /**所有已解锁的英雄 */
    private _allUnlockHero: RoleVO[] = [];

    /**英雄总数据 map */
    get heroMap() {
        return this._allHeroMap;
    }

    /**英雄总数量 */
    get heroNum() {
        return this._allHeroMap.size;
    }

    /**获取已解锁的英雄 */
    get allUnlockHero(): RoleVO[] {
        this._allUnlockHero = [];
        this._allHeroMap.forEach((value, key) => {
            if (value.lockState == 1 || value.lockState == 4)
                this._allUnlockHero.push(value);
        });
        return this._allUnlockHero;
    }

    constructor() {
        // App.socket.addEventListener(CodeS2C.TEST, this, this.__testHandler);
        this.onEstablishData();
    }

    /**收到消息 */
    private __testHandler(message): void {
        console.log("---------收到测试消息-------", message);
        this._heroData = message;
        /**直接存储所有原始数据 保证长度不变 后续只对数据进行操作 */
        // if (this._allHeroMap.size == 0) {
        //     let allConfig = HeroInfoDataProxy.instance.HeroInfoMiscIDMap;
        //     allConfig.forEach((value, key) => {
        //         let data = new RoleVO();
        //         data.heroId = value.HeroMiscID;
        //         data.level = 2;
        //         data.config = value;
        //         data.lockState = 1;
        //         this._allHeroMap.set(value.HeroMiscID, data);
        //     });
        // }
        /**更新数据替换原始数据 */
        // this._allHeroMap.forEach((value, key) => {
        // });
    }

    /**创建虚拟数据 */
    private onEstablishData() {
        for (let i in ConfigDB._HeroConfig) {
            let data = new RoleVO();
            data.heroId = ConfigDB._HeroConfig[i].HeroId;
            data.level = 2;
            data.config = ConfigDB._HeroConfig[i];
            data.lockState = 1;
            this._allHeroMap.set(ConfigDB._HeroConfig[i].HeroId, data);
        }
    }

    /**请求英雄数据 */
    public sendTestMessage(msgId: number, type: number): void {
        let obj: any = {};
        obj.msgId = msgId;
        obj.type = type;
        App.socket.send(obj);
    }
}