import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _HeroInfoConfig } from "../_config/_HeroInfoConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_HeroInfoConfig)
/**猎人信息配置表 */
export class HeroInfoDataProxy extends BaseConfigProxy<_HeroInfoConfig.DataType>{
    /** 单例 */
    public static readonly instance: HeroInfoDataProxy;
    //
    private constructor() { super(); }

    protected _initData() {
        super._initData();
        //初始化数据
        if (this.m_dataList && !this.HeroInfoMiscIDMap) {
            this.HeroInfoMiscIDMap = new Map<number, _HeroInfoConfig.DataType>();
            this.m_dataList.forEach((Value, index) => {
                this.HeroInfoMiscIDMap.set(Value.HeroMiscID, Value);
            })
        }
    }
    /**技能信息表 */
    HeroInfoMiscIDMap: Map<number, _HeroInfoConfig.DataType>;
    /**根据Id返回英雄信息 */
    GetHeroInfoByMiscID(HeroID: number): _HeroInfoConfig.DataType {
        return this.HeroInfoMiscIDMap.get(HeroID);
    }
}