import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import {_LevelConfig} from "../_config/_LevelConfig";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_LevelConfig)
export class LevelDataProxy extends BaseConfigProxy<_LevelConfig.DataType>{
    /** 单例 */
    public static readonly instance: LevelDataProxy;
    //
    private constructor() { super(); }
}