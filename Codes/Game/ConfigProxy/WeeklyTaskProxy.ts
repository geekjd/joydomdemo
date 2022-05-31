import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _EverydayTasksConfig } from "../_config/_EverydayTasksConfig";
import { _WeeklyTasksConfig } from "../_config/_WeeklyTasksConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_WeeklyTasksConfig)
/**每日任务配置表 */
export class WeeklyTaskProxy extends BaseConfigProxy<_WeeklyTasksConfig.DataType>{
    /** 单例 */
    public static readonly instance: WeeklyTaskProxy;
    //
    private constructor() { super(); }

}