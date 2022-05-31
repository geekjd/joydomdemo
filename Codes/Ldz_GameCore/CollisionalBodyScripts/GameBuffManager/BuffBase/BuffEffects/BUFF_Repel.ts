import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import BuffBase from "../Manager/BuffBase";

/**击退 */
export default class BUFF_Repel extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    InitBuffBase(_SoldiersBase: any, TempDamageData: DamageData) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_Repel");
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
            this.m_DamageData.RepelValue += this.BuffValueArray[0];
        }
    }

}