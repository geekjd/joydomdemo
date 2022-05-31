import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import BuffBase from "../Manager/BuffBase";

/**恶魔契约 */
export default class BUFF_DemonicContract extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_DemonicContract");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
    }
    BuffOccur() {
        this.setValue();
    }
    RefreshBuff() {
        this.setValue();
    }
    setValue() {
        if (this.BuffValueArray.length >= 2) {
            this.m_SoldiersBase.m_AttributeBase.m_Damage += this.BuffValueArray[0];
            this.m_SoldiersBase.m_AttributeBase.m_Hitpoints -= this.BuffValueArray[1];
            this.m_SoldiersBase.m_AttributeBase.m_Hitpoints = this.m_SoldiersBase.m_AttributeBase.m_Hitpoints < 1 ? 1 : this.m_SoldiersBase.m_AttributeBase.m_Hitpoints;
        }
    }

}