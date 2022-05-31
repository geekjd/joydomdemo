import BaseConfigProxy from "src/_T/Config/BaseConfigProxy";
import { _FreeRewardConfig } from "../_config/_FreeRewardConfig";
import InstanceT from "src/_T/Ts/InstanceT";
import ConfigT from "src/_T/Config/ConfigT";
import { _CourseConfig } from "../_config/_CourseConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_FreeRewardConfig)
/**免费奖励配置 */
export class FreeRewardConfigProxy extends BaseConfigProxy<_FreeRewardConfig.DataType>{
    /** 单例 */
    public static readonly instance: FreeRewardConfigProxy;
    //
    private constructor() {
        super();
    }

    protected initData() {
        super.initData();
    }
}