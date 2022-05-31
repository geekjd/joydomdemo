import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _EverydayTasksConfig } from "../_config/_EverydayTasksConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_EverydayTasksConfig)
/**每日任务配置表 */
export class EveryDayProxy extends BaseConfigProxy<_EverydayTasksConfig.DataType>{
    /** 单例 */
    public static readonly instance: EveryDayProxy;
    //
    private constructor() { super(); }

}