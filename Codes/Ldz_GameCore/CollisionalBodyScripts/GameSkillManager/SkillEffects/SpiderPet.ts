import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import { CampType, SkillType, WorkType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import MagicCubeSourceTypeManager from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSourceTypeManager";
import { PlayerControl } from "src/Ldz_GameCore/PlayerCore/PlayerControl";
import BattleRoomCon from "src/Ldz_GameCore/SceneScripts/BattleScene/BattleRoomCon";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import Boom from "../AuxiliaryCombatScript/RangeAttack/Boom";

/**蜘蛛 */
export default class SpiderPet extends Laya.Script3D {

    m_SkillType: SkillType;
    //m_MoveAccordingByDirection: MoveAccordingByWordPos;
    SelefS3D: Laya.Sprite3D;
    Transform: Laya.Transform3D;
    m_CampType: CampType;
    SkillModeNameTwo: string;
    m_DamageData: DamageData;
    onAwake() {
        this.m_SkillType = SkillType.WordPos;
        this.SelefS3D = <Laya.Sprite3D>this.owner;
        this.Transform = this.SelefS3D.transform;
    }
    onStart() {

    }
    InitData(TempDamageData: DamageData, TarGetObjPos: Laya.Vector3, IsShow: boolean = true) {
        this.m_DamageData = TempDamageData;
        let OwnerScript = this.m_DamageData.m_SelfSc;
        this.m_CampType = OwnerScript.m_CampType;
        this.SelefS3D.transform.position = OwnerScript.AttackPos.transform.position.clone();
        this.SelefS3D.transform.position = this.SelefS3D.transform.position;
        this.LodePet();
    }

    LodePet() {
        let ScTempbee: MagicCubeSource = this.SelefS3D.addComponent(MagicCubeSourceTypeManager.Instance.GetTypeByName("Spider"));
        if (ScTempbee != null) {
            ScTempbee.Init(1);
            ScTempbee.m_CampType = CampType.Blue_Camp;
            ScTempbee.m_WorkType = WorkType.Default;
        }
        this.destroy();
    }

}