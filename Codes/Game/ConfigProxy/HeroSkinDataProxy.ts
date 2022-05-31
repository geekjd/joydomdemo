import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _HeroSkinConfig } from "../_config/_HeroSkinConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_HeroSkinConfig)
/**猎人皮肤数据配置表 */
export class HeroSkinDataProxy extends BaseConfigProxy<_HeroSkinConfig.DataType>{
    /** 单例 */
    public static readonly instance: HeroSkinDataProxy;
    //
    private constructor() { super(); }

    protected _initData() {
        super._initData();
        //初始化数据
        if (this.m_dataList && !this.HeroSkinMiscIDMap) {
            this.HeroSkinMiscIDMap = new Map<number, _HeroSkinConfig.DataType>();
            this.m_dataList.forEach((Value, index) => {
                this.HeroSkinMiscIDMap.set(Value.HeroMiscID, Value);
            })
        }
    }
    /**技能信息表 */
    HeroSkinMiscIDMap: Map<number, _HeroSkinConfig.DataType>;
    /**根据Id返回皮肤信息 */
    GetHeroSkinInfoByMiscID(HeroID: number): _HeroSkinConfig.DataType {
        return this.HeroSkinMiscIDMap.get(HeroID);
    }

}