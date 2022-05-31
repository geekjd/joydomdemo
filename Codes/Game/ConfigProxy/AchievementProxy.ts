import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _AchievementTasksConfig } from "../_config/_AchievementTasksConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_AchievementTasksConfig)
export class AchievementProxy extends BaseConfigProxy<_AchievementTasksConfig.DataType>{
    /** 单例 */
    public static readonly instance: AchievementProxy;
    //
    private constructor() { super(); }

}