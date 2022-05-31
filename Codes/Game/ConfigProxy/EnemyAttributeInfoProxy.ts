import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _HeroAttributeInfoConfig } from "../_config/_HeroAttributeInfoConfig";
import { _EnemyInfoConfig } from "../_config/_EnemyInfoConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_EnemyInfoConfig)
/**敌人属性配置表 */
export class EnemyAttributeInfoProxy extends BaseConfigProxy<_EnemyInfoConfig.DataType>{
    /** 单例 */
    public static readonly instance: EnemyAttributeInfoProxy;
    /**属性信息表 */
    EnemyAttributeMiscIDMap: Map<number, _EnemyInfoConfig.DataType>;
    EnemyAttributeNameMap: Map<string, _EnemyInfoConfig.DataType>;
    private constructor() { super(); }
    protected _initData() {
        super._initData();
        //初始化数据
        if (this.m_dataList && !this.EnemyAttributeMiscIDMap) {
            this.EnemyAttributeMiscIDMap = new Map<number, _EnemyInfoConfig.DataType>();
            this.EnemyAttributeNameMap = new Map<string, _EnemyInfoConfig.DataType>();
            this.m_dataList.forEach((Value, index) => {
                this.EnemyAttributeMiscIDMap.set(Value.EnemyMiscID, Value);
                this.EnemyAttributeNameMap.set(Value.EnemyEnglishName, Value);
            })
        }
    }

    /**根据Id返回B属性信息 */
    GetHeroAttributeInfoByMiscID(EnemyID: number): _EnemyInfoConfig.DataType {
        return this.EnemyAttributeMiscIDMap.get(EnemyID);
    }

    /**根据Id返回B属性信息 */
    GetHeroAttributeInfoByName(EnemyName: string): _EnemyInfoConfig.DataType {
        return this.EnemyAttributeNameMap.get(EnemyName);
    }


}