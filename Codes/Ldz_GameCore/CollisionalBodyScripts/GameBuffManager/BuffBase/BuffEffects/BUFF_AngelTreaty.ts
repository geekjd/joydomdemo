import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import BuffBase from "../Manager/BuffBase";

/**天使契约 */
export default class BUFF_AngelTreaty extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;

    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_AngelTreaty");
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
    setValue() {
        if (this.BuffValueArray.length >= 2) {
            this.m_SoldiersBase.m_AttributeBase.m_Hitpoints += this.BuffValueArray[0];
            this.m_SoldiersBase.m_AttributeBase.m_Damage -= this.BuffValueArray[1];
            this.m_SoldiersBase.m_AttributeBase.m_Damage = this.m_SoldiersBase.m_AttributeBase.m_Damage < 1 ? 1 : this.m_SoldiersBase.m_AttributeBase.m_Damage;
        }
    }
}