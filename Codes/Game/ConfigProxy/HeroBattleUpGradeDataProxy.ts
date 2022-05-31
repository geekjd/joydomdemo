import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _HeroBattleUpGradeConfig } from "../_config/_HeroBattleUpGradeConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_HeroBattleUpGradeConfig)
/**猎人战斗升级属性配置表 */
export class HeroBattleUpGradeDataProxy extends BaseConfigProxy<_HeroBattleUpGradeConfig.DataType>{
    /** 单例 */
    public static readonly instance: HeroBattleUpGradeDataProxy;
    /**属性信息表 */

    private constructor() { super(); }
    protected _initData() {
        super._initData();
    }

    /**根据角色ID 和 等级 获取当前属性 */
    GetHeroBattleUpInfoByMicIDAndLevel(MiscID: number, Level: number): _HeroBattleUpGradeConfig.DataType {
        return this.dataList.find((Value) => {
            if (Value.HeroMiscID == MiscID && Value.Degree == Level) {
                return Value;
            }
        });

    }




}