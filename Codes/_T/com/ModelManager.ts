import { ModelEnum } from "../Misc/ConfigModel";
import App from "src/core/App";
import CodeS2C from "src/core/net/CodeS2C";
import { RoleModel } from "../Data/role/RoleModel";

export interface IBaseVo {
    decode(data: any): void
}

export interface IBaseModel {
}

/**
 * @export Model管理器，可接收所有功能Model数据，一般只处理登录、货币数据
 * @class ModelManager
 */
export class ModelManager {
    private static _instance: ModelManager = null;
    private _modelEnumToModelClass: Map<ModelEnum, { model: any }> = new Map([
        [ModelEnum.RoleModel, { model: RoleModel }],
    ]);

    private _modelEnumToModelInstance: Map<ModelEnum, any> = new Map();

    constructor() {
        this.addProEvent();
    }

    public static getInstance(): ModelManager {
        if (this._instance == null) {
            this._instance = new ModelManager();
        }
        return this._instance;
    }

    public getModel(type: ModelEnum) {
        let instance = this._modelEnumToModelInstance.get(type);
        if (instance) {
            return instance;
        }
        let cls = this._modelEnumToModelClass.get(type).model;
        let newCls = new cls();
        this._modelEnumToModelInstance.set(type, newCls);
        return newCls;
    }

    private addProEvent() {
        // App.socket.addEventListener(CodeS2C.TEST, this, this.testHandler);
    }

    /**收到消息 */
    private testHandler(message): void {
        console.log("---------收到测试消息-------", message);
    }
}
export let ModelMgr = ModelManager.getInstance();