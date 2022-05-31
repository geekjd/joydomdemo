import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import MathUtils from "src/_T/Utils/MathUtils";
import BuffBase from "../Manager/BuffBase";

/**眩晕几率 */
export default class BUFF_ChanceProbability extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    probability: number = 0;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_ChanceProbability");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
    }
    BuffOccur() {
        this.setValue();
    }
    RefreshBuff() {
        this.setValue();
    }
    //Buff移除
    BuffRemoved() {
        if (this.MeshObj != null) {
            this.MeshObj.removeSelf();
            this.MeshObj.destroy();
        }
        this.MeshObj = null;
        super.BuffRemoved();
    }
    //攻击时
    BuffOnHit() {
        let Num: number = MathUtils.randomRangeInt(0, 100);
        let Max: number = this.probability * 100;
        if (Num < Max) {
            this.m_DamageData.SetBuff("Vertigo");
        }
    }
    setValue() {
        if (this.BuffValueArray.length >= 1) {
            this.probability += this.BuffValueArray[0];
        }
        console.log(this.probability);
    }
}