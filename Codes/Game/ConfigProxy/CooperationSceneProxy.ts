import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _ResourcePropsConfig } from "../_config/_ResourcePropsConfig";
import { _CooperationSceneDataConfig } from "../_config/_CooperationSceneDataConfig";
import { _EnemyInfoConfig } from "../_config/_EnemyInfoConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_CooperationSceneDataConfig)
/**合作模式波次配配置表 */
export class CooperationSceneProxy extends BaseConfigProxy<_CooperationSceneDataConfig.DataType>{

    /** 单例 */
    public static readonly instance: CooperationSceneProxy;
    //
    private constructor() { super(); }

    GetEnemyInfoArrayByIndex(): _CooperationSceneDataConfig.DataType[] {
        return this.dataList;
    }

}