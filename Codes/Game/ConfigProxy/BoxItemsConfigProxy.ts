import { _BoxItemsConfig } from "../_config/_BoxItemsConfig";
import BaseConfigProxy from "src/_T/Config/BaseConfigProxy";
import InstanceT from "src/_T/Ts/InstanceT";
import ConfigT from "src/_T/Config/ConfigT";

/**宝箱内出产道具配置表 */
@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_BoxItemsConfig)
export class BoxItemsConfigProxy extends BaseConfigProxy<_BoxItemsConfig.DataType>{
    /** 单例 */
    public static readonly instance: BoxItemsConfigProxy;
    //
    private constructor() {
        super();
    }

    protected initData() {
        super.initData();
    }

    public getConfigByID(id: number): _BoxItemsConfig.DataType {
        return this.dataList.find((data) => data.itemID === id);
    }
}