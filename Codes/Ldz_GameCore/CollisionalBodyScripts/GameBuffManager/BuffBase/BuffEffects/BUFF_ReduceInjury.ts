import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import BuffBase from "../Manager/BuffBase";

/**伤害减免 */
export default class BUFF_ReduceInjury extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    probability: number = 0;
    InitBuffBase(_SoldiersBase: any, TempDamageData: DamageData) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_ReduceInjury");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
    }
    BuffOccur() {
        this.setValue();
    }
    RefreshBuff() {
        this.setValue();
    }
    setValue() {
        if (this.BuffValueArray.length >= 1) {
            this.probability = this.BuffValueArray[0];
        }
    }
    //受到伤害
    BuffBeHurt(TempDamageData: DamageData) {
        //let SubDamage = TempDamageData.BasicDamage * this.probability;
        TempDamageData.BasicDamage -= this.probability;
        TempDamageData.BasicDamage = TempDamageData.BasicDamage < 0 ? 0 : TempDamageData.BasicDamage;
    }
}