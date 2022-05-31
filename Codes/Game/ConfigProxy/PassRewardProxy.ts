import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _PassRewardConfig } from "../_config/_PassRewardConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_PassRewardConfig)
/**通行证奖励配置表 */
export class PassRewardProxy extends BaseConfigProxy<_PassRewardConfig.DataType>{
    /** 单例 */
    public static readonly instance: PassRewardProxy;
    //
    private constructor() {
        super();
    }

    public passConfigMap: Map<number, _PassRewardConfig.DataType>;

    protected _initData() {
        super._initData();
        //初始化数据
        if (this.m_dataList && !this.passConfigMap) {
            this.passConfigMap = new Map<number, _PassRewardConfig.DataType>();
            this.m_dataList.forEach((Value, index) => {
                this.passConfigMap.set(Value.id, Value);
            })
        }
    }

    /**根据ID获取数据 */
    public getConfig(id: number): _PassRewardConfig.DataType {
        return this.passConfigMap.get(id);
    }

    /**获取数据数量 */
    public getCount(): number {
        return this.passConfigMap.size;
    }

}