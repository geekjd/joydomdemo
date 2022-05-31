import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _ResourcePropsConfig } from "../_config/_ResourcePropsConfig";
import { _HuntingSceneDataConfig } from "../_config/_HuntingSceneDataConfig";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_HuntingSceneDataConfig)
/**狩猎模式波次配置表 */
export class HuntingSceneDataProxy extends BaseConfigProxy<_HuntingSceneDataConfig.DataType>{
    /** 单例 */
    public static readonly instance: HuntingSceneDataProxy;
    //
    private constructor() { super(); }

    GetEnemyInfoArrayByIndex(Index: number): string[] {
        if (Index < 0 || Index >= this.dataList.length) return [];
        let Tempdata: _HuntingSceneDataConfig.DataType = this.dataList[Index];
        let TempArray: string[] = [];
        TempArray.push(Tempdata.GameWave1);
        TempArray.push(Tempdata.GameWave2);
        TempArray.push(Tempdata.GameWave3);
        TempArray.push(Tempdata.GameWave4);
        TempArray.push(Tempdata.GameWave5);
        TempArray.push(Tempdata.GameWave6);
        TempArray.push(Tempdata.GameWave7);
        TempArray.push(Tempdata.GameWave8);
        TempArray.push(Tempdata.GameWave9);
        TempArray.push(Tempdata.GameWave10);
        TempArray.push(Tempdata.GameWave11);
        TempArray.push(Tempdata.GameWave12);
        TempArray.push(Tempdata.GameWave13);
        TempArray.push(Tempdata.GameWave14);
        TempArray.push(Tempdata.GameWave15);
        TempArray.push(Tempdata.GameWave16);
        TempArray.push(Tempdata.GameWave17);
        TempArray.push(Tempdata.GameWave18);
        TempArray.push(Tempdata.GameWave19);
        TempArray.push(Tempdata.GameWave20);
        return TempArray;

    }

}