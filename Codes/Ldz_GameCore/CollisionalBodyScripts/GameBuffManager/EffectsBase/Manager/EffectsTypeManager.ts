import BOOM from "../EffectsTimer/BOOM";
import ExpTirg from "../EffectsTimer/ExpTirg";
import GeneralBase from "../EffectsTimer/GeneralBase";

export default class EffectsTypeManager {

    private static _Instance: EffectsTypeManager;
    private constructor() { }
    //公开的方法
    public static get Instance(): EffectsTypeManager {
        if (!this._Instance) {
            this._Instance = new EffectsTypeManager();
            this._Instance.InitType();
        }
        return this._Instance;
    }
    private InitType() {
        //特效
        this.EffectsTypeMap.set("ExpTirg", ExpTirg);
        this.EffectsTypeMap.set("GeneralBase", GeneralBase);
        this.EffectsTypeMap.set("BOOM", BOOM);
    }
    /**
        * @param DoesTheEffectsTypeExist 检测是否拥有当前名称的特效类型
        * @param TypeName 
        */
    DoesTheEffectsTypeExist(TypeName: string): boolean {

        if (this.EffectsTypeMap.has(TypeName)) {
            return true;
        }
        return false;
    }

    /**
  * @param GetTypeByName 根据名称获取类型
  * @param TypeName      //与类型相同的字符串
  */
    GetTypeByName(TypeName: string): any {

        if (this.EffectsTypeMap.has(TypeName)) {

            return this.EffectsTypeMap.get(TypeName);

        }
        return null;
    }

    /**
 * @param EffectsTypeMap 特效类型Map
 */
    EffectsTypeMap: Map<string, any> = new Map<string, any>();

}