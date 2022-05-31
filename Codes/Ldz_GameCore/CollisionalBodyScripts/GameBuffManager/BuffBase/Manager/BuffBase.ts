//import SoldiersBase from "src/LDZ/SoldiersScripts/SoldiersBase/SoldiersBase";

import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";

export default class BuffBase {

    public m_SoldiersBase: MagicCubeSource;
    public m_DamageData: DamageData;
    public IsDestory: boolean = false;
    BuffValueArray: number[] = [];
    /**初始化Buff */
    InitBuffBase(_SoldiersBase: MagicCubeSource, TempDamageData: DamageData) {
        this.m_SoldiersBase = _SoldiersBase;
        this.m_DamageData = TempDamageData;
    }
    /**Buff进入时*/
    BuffOccur() {

    }
    /**刷新Buff*/
    RefreshBuff() {

    }
    /**Buff每帧调用*/
    BuffOnTick() {

    }
    /**Buff移除*/
    BuffRemoved() {
        this.IsDestory = true;
    }
    /**受到伤害*/
    BuffBeHurt(TempDamageData: DamageData) {

    }
    /**攻击时*/
    BuffOnHit(TempDamageData: DamageData) {

    }
    /**被杀死时*/
    BuffBeforeKilled(TempDamageData: DamageData) {

    }
    /**敌人死亡时*/
    BuffAfterKilled(TempDamageData: DamageData) {

    }

    /**解析 */
    BuffValueAnalysis(BuffType: string, BuffValue: string) {
        this.BuffValueArray = [];
        let ValueArray = BuffValue.split(',');
        for (let i = 0; i < ValueArray.length; i++) {
            this.BuffValueArray.push(Number(ValueArray[i]));
        }
    }

}