import FGUI_CoTips from "src/FGUI/GameMain/FGUI_CoTips";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { PGameFitingPlanProxy } from "src/Game/UICon/GameMianCom/PGameFitingPlanProxy";
import { _HeroAttributeInfoConfig } from "src/Game/_config/_HeroAttributeInfoConfig";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import FixedHpItem from "src/Ldz_GameCore/ItemScriptsManager/FixedHpItem";
import FixedMagicBook from "src/Ldz_GameCore/ItemScriptsManager/FixedMagicBook";
import UpgradeBox from "src/Ldz_GameCore/ItemScriptsManager/UpgradeBox";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CameraControl from "src/Ldz_GameCore/PlayerCore/CameraControl";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import SceneNode from "src/_T/D3/scene/SceneNode";
import { CameraUtils } from "src/_T/Utils/CameraUtils";
import MathUtils from "src/_T/Utils/MathUtils";

export default class BattleRoomData {

    /**人物信息列表 */
    CharacterInfoList: RoleInfo[] = [];
    /**人物出生点 */
    RoleBirthPoint: Laya.Vector3[] = [];
    /**敌人出生点 */
    EnemyBirthPoint: Map<number, Laya.Vector3[]>;
    /**狩猎模式回复点*/
    RecoveryPoint: Laya.Sprite3D;
    /**等级升级点 */
    LevleUpPoint: Laya.Sprite3D;
    /**金币系数增加量点 */
    GoldInPoint: Laya.Sprite3D;
    ItemPrant: Laya.Sprite3D;
    players: Laya.Sprite3D;


    RecoveryUI: FGUI_CoTips;
    LevleUpUI: FGUI_CoTips;
    GoldInUI: FGUI_CoTips;
    IsAddPrant: boolean = true;
    WaypointArray: Laya.Sprite3D[];


    //竞技场景道具点
    FixedHpItemArray: FixedHpItem[] = [];

    FixedMagicBookArray: FixedMagicBook[] = [];

    delete() {
        this.CharacterInfoList = [];
        this.RoleBirthPoint = [];
        this.EnemyBirthPoint = new Map<number, Laya.Vector3[]>();
        this.RecoveryPoint = null;
        this.LevleUpPoint = null;
        this.GoldInPoint = null;
        this.ItemPrant = null;
        this.players = null;
        this.RecoveryUI = null;
        this.LevleUpUI = null;
        this.GoldInUI = null;
        this.IsAddPrant = null;
        for (let i = 0; i < this.FixedHpItemArray.length; i++) {
            this.FixedHpItemArray[i] = null;
        }
        this.FixedHpItemArray = [];
        for (let i = 0; i < this.FixedMagicBookArray.length; i++) {
            this.FixedMagicBookArray[i] = null;
        }
        this.FixedMagicBookArray = [];
        for (let i = 0; i < this.WaypointArray.length; i++) {
            this.WaypointArray[i].destroy();
            this.WaypointArray[i] = null;
        }
    }


    InitBattleRooomData(level: SceneNode) {
        this.RoleBirthPoint = [];
        this.WaypointArray = [];
        this.FixedHpItemArray = [];
        this.FixedMagicBookArray = [];
        this.EnemyBirthPoint = new Map<number, Laya.Vector3[]>();
        this.RecoveryPoint = null;
        let RolePointPlan: Laya.Sprite3D[] = level.prefabs[_AllPrefabsNames.Point];
        for (let i = 0, Len = RolePointPlan.length; i < Len; i++) {
            this.RoleBirthPoint.push(RolePointPlan[i].transform.localPosition.clone());
        }
        let EnemyPointPlan: Laya.Sprite3D[] = level.prefabs[_AllPrefabsNames.EnemyRegion];
        for (let i = 0, Len = EnemyPointPlan.length; i < Len; i++) {
            let temp: Laya.Sprite3D = EnemyPointPlan[i];
            //console.log(temp);
            let TempArray: Laya.Vector3[] = [];
            for (let j = 0, len2 = temp.numChildren; j < len2; j++) {
                let Temp2: Laya.Sprite3D = temp.getChildAt(j) as Laya.Sprite3D;
                TempArray.push(Temp2.transform.position.clone());
            }
            this.EnemyBirthPoint.set(i, TempArray);
        }

        let WaypointPlan: Laya.Sprite3D[] = level.prefabs[_AllPrefabsNames.Waypoint];
        if (WaypointPlan != null) {
            for (let i = 0, Len = WaypointPlan.length; i < Len; i++) {
                this.WaypointArray.push(WaypointPlan[i]);
            }
        }
        let Level_Plan = GlobalD3Environment.Scene3D.getChildByName("").getChildAt(0).getChildAt(0);
        //let Map_Plan = Level_Plan.getChildByName("FindMap");
        this.players = Level_Plan.getChildByName("Players") as Laya.Sprite3D;
        this.ItemPrant = level.prefabs[_AllPrefabsNames.ItemAndEffectsPlan][0] as Laya.Sprite3D;
        this.IsAddPrant = true;
    }
    /**给预制体添加脚本狩猎模式 */
    HunterPerfabAddCommont(level: SceneNode) {
        // let upgrade_green: Laya.Sprite3D[] = level.prefabs[_AllPrefabsNames.upgrade_green];
        // for (let i = 0; i < upgrade_green.length; i++) {
        //     let ScUpgradeBox: UpgradeBox = upgrade_green[i].addComponent(UpgradeBox);
        //     this.RecoveryPoint = upgrade_green[i];
        //     ScUpgradeBox.InitData(1);
        // }
    }
    /**给预制体添加脚本合作模式 */
    CooperationPerfabAddCommont(level: SceneNode) {

        let upgrade_purple: Laya.Sprite3D[] = level.prefabs[_AllPrefabsNames.upgrade_purple];
        for (let i = 0; i < upgrade_purple.length; i++) {
            let ScUpgradeBox: UpgradeBox = upgrade_purple[i].addComponent(UpgradeBox);
            this.LevleUpPoint = upgrade_purple[i];
            ScUpgradeBox.InitData(1);
        }
        let upgrade_green: Laya.Sprite3D[] = level.prefabs[_AllPrefabsNames.upgrade_green];
        for (let i = 0; i < upgrade_green.length; i++) {
            let ScUpgradeBox: UpgradeBox = upgrade_green[i].addComponent(UpgradeBox);
            this.RecoveryPoint = upgrade_green[i];
            ScUpgradeBox.InitData(2);
        }
        let upgrade_yellow: Laya.Sprite3D[] = level.prefabs[_AllPrefabsNames.upgrade_yellow];
        for (let i = 0; i < upgrade_yellow.length; i++) {
            let ScUpgradeBox: UpgradeBox = upgrade_yellow[i].addComponent(UpgradeBox);
            this.GoldInPoint = upgrade_yellow[i];
            ScUpgradeBox.InitData(3);
        }
        this.RecoveryUI = FGUI_CoTips.createInstance();
        this.LevleUpUI = FGUI_CoTips.createInstance();
        this.GoldInUI = FGUI_CoTips.createInstance();
    }

    /**给预制体添加脚本合作模式 */
    SportsPerfabAddCommont(level: SceneNode) {
        for (let i = 0, Len = this.WaypointArray.length; i < Len; i++) {
            if (i < Len - 1) {
                let FixedHpItemSc: FixedHpItem = this.WaypointArray[i].addComponent(FixedHpItem);
                FixedHpItemSc.InitData(_AllPrefabsNames.jiaxie, 10);
                this.FixedHpItemArray.push(FixedHpItemSc);
            } else {
                let FixedMagicBookSc: FixedMagicBook = this.WaypointArray[i].addComponent(FixedMagicBook);
                FixedMagicBookSc.InitData(_AllPrefabsNames.Spell_Book, 20);
                this.FixedMagicBookArray.push(FixedMagicBookSc);
            }
        }
    }

    UpdateTipsUI(Player: MagicCubeSource) {
        this.SetTipsUIPos();
        this.SetUIPrant();
        this.SetTipsInfo(Player);
    }
    SetUIPrant() {
        if (!this.IsAddPrant) return;
        this.IsAddPrant = false;
        if (this.RecoveryUI.parent == null) {
            PGameFitingPlanProxy.instance.ui.m_HP_Prant.addChild(this.RecoveryUI);
            PGameFitingPlanProxy.instance.ui.m_HP_Prant.addChild(this.LevleUpUI);
            PGameFitingPlanProxy.instance.ui.m_HP_Prant.addChild(this.GoldInUI);
        }
    }

    SetTipsInfo(Player: MagicCubeSource) {
        this.RecoveryUI.m_Title.text = "治疗";
        this.RecoveryUI.m_Tips.text = "" + Player.RecoveryGoold;
        if (Player.CurGoold >= Player.RecoveryGoold) {
            this.RecoveryUI.m_Tips.color = "#00FF00";
        } else {
            this.RecoveryUI.m_Tips.color = "#FF0000";
        }
        this.LevleUpUI.m_Title.text = "等级提升";
        this.LevleUpUI.m_Tips.text = "" + Player.LevelUpGoold;
        if (Player.CurGoold >= Player.LevelUpGoold) {
            this.LevleUpUI.m_Tips.color = "#00FF00";
        } else {
            this.LevleUpUI.m_Tips.color = "#FF0000";
        }
        this.GoldInUI.m_Title.text = "获得量 +10%";
        this.GoldInUI.m_Tips.text = "" + Player.GooldInGoold;
        if (Player.CurGoold >= Player.GooldInGoold) {
            this.GoldInUI.m_Tips.color = "#00FF00";
        } else {
            this.GoldInUI.m_Tips.color = "#FF0000";
        }
    }
    SetTipsUIPos() {
        let UIPos = new Laya.Vector3();
        CameraUtils.WorldToScreen2(CameraControl.Instance.m_Camera, this.RecoveryPoint.transform.position, UIPos);
        this.RecoveryUI.setXY(UIPos.x, UIPos.y - 100);
        CameraUtils.WorldToScreen2(CameraControl.Instance.m_Camera, this.LevleUpPoint.transform.position, UIPos);
        this.LevleUpUI.setXY(UIPos.x, UIPos.y - 100);
        CameraUtils.WorldToScreen2(CameraControl.Instance.m_Camera, this.GoldInPoint.transform.position, UIPos);
        this.GoldInUI.setXY(UIPos.x, UIPos.y - 100);
    }
    /**人物列表 */
    SetPlayerRoleInfo(Temp: RoleInfo) {
        this.CharacterInfoList = [];
        this.CharacterInfoList.push(Temp);
    }
    AddRoleInfo(Temp: RoleInfo) {
        this.CharacterInfoList.push(Temp);
    }
    /**随机 */
    RoodmAiRoleInfo(MaxCount: number) {
        let TempInfoArray: _HeroAttributeInfoConfig.DataType[] = HeroAttributeInfoDataProxy.instance.GetRandomInfo(MaxCount, this.CharacterInfoList[0].m_HeroName);
        let RandomMin = 1;
        let RandmoMax = 6;
        if (HunterGameDataMediator.instance.data.Trophy >= 100) {
            RandomMin = 6;
            RandmoMax = 11;
        }
        let Level = MathUtils.randomRangeInt(RandomMin, RandmoMax);
        Level = Level < 0 ? 0 : Level;
        Level = Level >= 10 ? 10 : Level;
        for (let i = 0; i < TempInfoArray.length; i++) {
            let TempInfo = new RoleInfo(TempInfoArray[i].HeroEnglishName, TempInfoArray[i].HeroEnglishName, Level, null);
            this.AddRoleInfo(TempInfo);
        }
    }
    UpdateOperation() {

    }
    /**获取信息列表 */
    GetRoleInfoList(): RoleInfo[] {
        return this.CharacterInfoList;
    }

}

/**人物信息 */
export class RoleInfo {
    constructor(HeroName: string, HeroSkinName: string, HeroLevel: number, HeroSkillArray: number[], LodeCount: number = 1, LodeTimer: number = 0) {
        this.m_HeroName = HeroName;
        this.m_HeroSkinName = HeroSkinName;
        this.m_HeroLevel = HeroLevel;
        this.m_HeroSkillArray = HeroSkillArray;
        this.m_LodeCount = LodeCount;
        this.m_LodeTimer = LodeTimer;
    }
    m_HeroName: string;
    m_HeroSkinName: string;
    m_HeroLevel: number;
    m_HeroSkillArray: number[];
    m_LodeCount: number = 1;
    m_LodeTimer: number = 0;

}