import BaseConfigProxy from "src/_T/Config/BaseConfigProxy";
import { _ShopConfig } from "../_config/_ShopConfig";
import InstanceT from "src/_T/Ts/InstanceT";
import ConfigT from "src/_T/Config/ConfigT";

/**
 * 商店配置表
 */
@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_ShopConfig)
export class ShopConfigProxy extends BaseConfigProxy<_ShopConfig.DataType>{
    /** 单例 */
    public static readonly instance: ShopConfigProxy;
    //
    private constructor() {
        super();
    }

    protected initData() {
        super.initData();
    }

    /**根据类型获取商品 */
    public getItemByType(type: number): Array<_ShopConfig.DataType> {
        var arr: Array<_ShopConfig.DataType> = new Array<_ShopConfig.DataType>();
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].type == type) {
                arr.push(this.dataList[i]);
            }
        }
        return arr;
    }
}