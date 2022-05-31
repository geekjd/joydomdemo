import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _ExistenceSceneDataConfig } from "../_config/_ExistenceSceneDataConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_ExistenceSceneDataConfig)
export class ExistenceSceneProxy extends BaseConfigProxy<_ExistenceSceneDataConfig.DataType>{
    /** 单例 */
    public static readonly instance: ExistenceSceneProxy;
    //
    private constructor() { super(); }
    GetEnemyInfoArrayByIndex(): _ExistenceSceneDataConfig.DataType[] {
        return this.dataList;
    }
}