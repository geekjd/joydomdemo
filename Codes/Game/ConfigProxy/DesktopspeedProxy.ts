import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _DesktopspeedConfig } from "../_config/_DesktopspeedConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_DesktopspeedConfig)
export class DesktopspeedProxy extends BaseConfigProxy<_DesktopspeedConfig.DataType>{
    /** 单例 */
    public static readonly instance: DesktopspeedProxy;
    //
    private constructor() { super(); }

    GetDesktopspeedData(): string[] {
        let Dir: string[] = [];
        this.dataList.forEach((Item) => {
            Dir.push(Item.DIrString);
        });
        return Dir;
    }
}