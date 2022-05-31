import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _HeroUpGradeConfig } from "../_config/_HeroUpGradeConfig";
import Dictionary from "src/_T/Utils/Dictionary";
import { HunterHeroInfoDataMediator } from "../Data/HunterHeroInfoDataProxy";
import { HeroAttributeInfoDataProxy } from "./HeroAttributeInfoDataProxy";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_HeroUpGradeConfig)
/**猎人战斗升级属性配置表 */
export class HeroUpGradeDataProxy extends BaseConfigProxy<_HeroUpGradeConfig.DataType>{
    /** 单例 */
    public static readonly instance: HeroUpGradeDataProxy;
    /**属性信息表 */

    private constructor() { super(); }
    protected _initData() {
        super._initData();
    }

    /**根据角色ID 和 等级 获取当前属性 */
    GetHeroUpInfoByMicIDAndLevel(MiscID: number, Level: number): _HeroUpGradeConfig.DataType {
        return this.dataList.find((Value) => {
            if (Value.HeroMiscID == MiscID && Value.Degree == Level) {
                return Value;
            }
        });
    }
    GetHeroUpInfoByNameAndLevel(Name: string, Level: number): _HeroUpGradeConfig.DataType {
        return this.dataList.find((Value) => {
            if (Value.HeroType == Name && Value.Degree == Level) {
                return Value;
            }
        });
    }

    /**根据ID和等级获取伤害和血量 */
    public getHeroDamageAndHp(miscID: number, level: number): { damage: number, hp: number } {
        var damage: number = 0;
        var hp: number = 0;
        var heroConfig = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(miscID);
        damage = heroConfig.AttackDamage;
        hp = heroConfig.HealthValue;
        for (let i = 1; i <= level; i++) {
            let UpDate: _HeroUpGradeConfig.DataType = this.GetHeroUpInfoByMicIDAndLevel(miscID, i);
            if (UpDate != null) {
                damage += UpDate.AttackValue;
                hp += UpDate.HealthValue;
            } else {
                // console.log("没有获取到相关等级属性_" + i + "_" + this.m_MagicChess);
            }
        }
        var obj = { damage: damage, hp: hp };
        return obj;
    }

}