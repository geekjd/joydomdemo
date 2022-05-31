import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import LayaUtils from "src/_T/Utils/LayaUtils";
import BuffBase from "../Manager/BuffBase";

/**重生 */
export default class BUFF_BeReborn extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    BuffValue: number = 0;

    CurTime: number = 0;
    Interval: number = 0;

    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_BeReborn");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
        this.BuffValue = 0;
        this.Interval = 0;
    }

    BuffOccur() {
        this.CurTime = 0;
        this.setValue();
    }
    //Buff每帧调用
    BuffOnTick() {
        this.CurTime += (LayaUtils.deltaTime / 1000);
        if (this.CurTime >= this.Interval) {
            this.CurTime = 0;
            let Hitos = this.m_SoldiersBase.m_TempAttributeBase.m_MaxHitpoints * this.BuffValue;
            this.m_SoldiersBase.AddHitPoints(Hitos);
        }
    }
    RefreshBuff() {
        this.setValue();
    }
    setValue() {
        if (this.BuffValueArray.length >= 2) {
            this.Interval = this.BuffValueArray[0]
            this.BuffValue += this.BuffValueArray[1];
        }
    }

}