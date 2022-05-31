import BaseLocalDataProxy from "src/_T/Data/BaseLocalDataProxy";
import DataT from "src/_T/Data/DataT";
import InstanceT from "src/_T/Ts/InstanceT";
import HunterGameData from "./type/HunterGameData";
import { PassData } from "../UICon/GameMianCom/PPassProxy";

/**
 * 设置数据代理
 */
@InstanceT.DecorateInstance()
@DataT.DecorateDataTemplate(HunterGameData)
export class HunterGameDataMediator extends BaseLocalDataProxy<HunterGameData>{
    /** 单例 */
    public static readonly instance: HunterGameDataMediator;
    _initData() {
        if (this.data.PassDatas.length <= 0) {
            for (let i = 0; i < 100; i++) {
                this.data.PassDatas.push(new PassData(i + 1, false, false));
            }
        }
    }
    //
    private constructor() { super(); }

    /**根据等级获取通行证数据 */
    public getPassDataByLv(lv: number): PassData {
        // var data: PassData;
        for (let i = 0; i < this.data.PassDatas.length; i++) {
            if (this.data.PassDatas[i].lv == lv) {
                return this.data.PassDatas[i];
            }
        }
        return null;
    }

    /**是否有可以领取的通行证奖励 */
    public check_passReward(): boolean {
        console.log("通行证等级", this.data.passLv)
        let iscan: boolean = false;
        for (let i = 0; i < this.data.passLv; i++) {
            if (this.data.PassDatas[i].free == false || (this.data.havePass && this.data.PassDatas[i].plus == false)) {
                iscan = true;
                break;
            }
        }
        return iscan;
    }

    /**设置通行证数据 */
    public set_state(lv: number, type: number, state: boolean) {
        for (let i = 0; i < this.data.PassDatas.length; i++) {
            if (this.data.PassDatas[i].lv == lv) {
                if (type == 1) {
                    this.data.PassDatas[i].free = state;
                } else if (type == 2) {
                    this.data.PassDatas[i].plus = state;
                }
            }
        }
    }
}