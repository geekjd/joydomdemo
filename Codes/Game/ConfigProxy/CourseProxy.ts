import BaseConfigProxy from "src/_T/Config/BaseConfigProxy";
import { _CourseConfig } from "../_config/_CourseConfig";
import InstanceT from "src/_T/Ts/InstanceT";
import ConfigT from "src/_T/Config/ConfigT";

/**历程奖励配置表 */
@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_CourseConfig)
export class CourseProxy extends BaseConfigProxy<_CourseConfig.DataType>{
    /** 单例 */
    public static readonly instance: CourseProxy;
    //
    private constructor() {
        super();
    }

    protected initData() {
        super.initData();
    }

    public getConfigByLv(lv: number): _CourseConfig.DataType {
        return this.dataList.find((data) => data.lv === lv);
    }
}