import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _HeroBuffConfig } from "../_config/_HeroBuffConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_HeroBuffConfig)
/**猎人BUFF配置表 */
export class HeroBuffDataProxy extends BaseConfigProxy<_HeroBuffConfig.DataType>{
    /** 单例 */
    public static readonly instance: HeroBuffDataProxy;
    //
    private constructor() { super(); }

    protected _initData() {
        super._initData();
        //初始化数据
        if (this.m_dataList && !this.BuffMiscIDMap) {
            this.BuffMiscIDMap = new Map<number, _HeroBuffConfig.DataType>();
            this.BuffMiscIDBynameMap = new Map<string, _HeroBuffConfig.DataType>();
            this.m_dataList.forEach((Value, index) => {
                Value.BuffEnglishName
                this.BuffMiscIDMap.set(Value.BuffMiscID, Value);
                this.BuffMiscIDBynameMap.set(Value.BuffEnglishName, Value);
            })
        }
    }
    /**技能信息表 */
    BuffMiscIDMap: Map<number, _HeroBuffConfig.DataType>;
    BuffMiscIDBynameMap: Map<string, _HeroBuffConfig.DataType>;

    /**根据Id返回Buff信息 */
    GetBuffInfoByMiscID(HeroID: number): _HeroBuffConfig.DataType {
        return this.BuffMiscIDMap.get(HeroID);
    }

    /**根据代码名称返回Buff信息 */
    GetBuffInfoByEnglishName(BuffEnglishName: string): _HeroBuffConfig.DataType {
        return this.BuffMiscIDBynameMap.get(BuffEnglishName);
    }

}