import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _HeroSkillConfig } from "../_config/_HeroSkillConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_HeroSkillConfig)
/**猎人技能配置表 */
export class HeroSkillDataProxy extends BaseConfigProxy<_HeroSkillConfig.DataType>{
    /** 单例 */
    public static readonly instance: HeroSkillDataProxy;
    //
    private constructor() { super(); }

    protected _initData() {
        super._initData();
        //初始化数据
        if (this.m_dataList && !this.HeroSkillMiscIDMap) {
            this.HeroSkillMiscIDMap = new Map<number, _HeroSkillConfig.DataType>();
            this.m_dataList.forEach((Value, index) => {
                this.HeroSkillMiscIDMap.set(Value.HeroMiscID, Value);
            })
        }
    }
    /**技能信息表 */
    HeroSkillMiscIDMap: Map<number, _HeroSkillConfig.DataType>;

    /**根据Id返回技能信息 */
    GetHeroSkillInfoByMiscID(HeroID: number): _HeroSkillConfig.DataType {
        return this.HeroSkillMiscIDMap.get(HeroID);
    }

}