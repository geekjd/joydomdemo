import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import MathUtils from "src/_T/Utils/MathUtils";
import BuffBase from "../Manager/BuffBase";

/**致命一击 */
export default class BUFF_DeadlyProbability extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    probability: number = 0;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_DeadlyProbability");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
        this.probability = 0;
    }
    BuffOccur() {
        this.setValue();
    }
    RefreshBuff() {
        this.setValue();
    }
    //攻击时
    BuffOnHit(TempDamageData: DamageData) {

        let Num: number = MathUtils.randomRangeInt(0, 100);
        let Max: number = this.probability * 100;
        if (Num < Max) {
            TempDamageData.ISOneShotDeath = true;
        }
        //TempDamageData.DamageCoefficient = TempDamageData.DamageCoefficient + 1;
    }
    setValue() {
        if (this.BuffValueArray.length >= 1) {
            this.probability = this.BuffValueArray[0];
        }
    }

}