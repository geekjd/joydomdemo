import { CampType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";

/**技能基类 */
export default class SkillBase {
    constructor(parameters) {

    }
    PerSon: Map<Laya.Sprite3D, Laya.Sprite3D> = new Map<Laya.Sprite3D, Laya.Sprite3D>();
    m_SoBattleType: CampType;
    m_SoldiersBase: MagicCubeSource;
    CreatorSkill() {

    }
}