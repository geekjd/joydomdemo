import { EnemyAttributeInfoProxy } from "src/Game/ConfigProxy/EnemyAttributeInfoProxy";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { HeroBattleUpGradeDataProxy } from "src/Game/ConfigProxy/HeroBattleUpGradeDataProxy";
import { HeroSkillDataProxy } from "src/Game/ConfigProxy/HeroSkillDataProxy";
import { HeroUpGradeDataProxy } from "src/Game/ConfigProxy/HeroUpGradeDataProxy";
import { _EnemyInfoConfig } from "src/Game/_config/_EnemyInfoConfig";
import { _HeroAttributeInfoConfig } from "src/Game/_config/_HeroAttributeInfoConfig";
import { _HeroBattleUpGradeConfig } from "src/Game/_config/_HeroBattleUpGradeConfig";
import { _HeroSkillConfig } from "src/Game/_config/_HeroSkillConfig";
import { _HeroUpGradeConfig } from "src/Game/_config/_HeroUpGradeConfig";
import { Enitiy } from "src/Ldz_GameCore/GeneralScripts/GameDefine";

/** 士兵的属性里列表*/
export default class MagicCubeSourceAttributeBase {
    /**中文名称 */
    m_MagicChess: string = "";
    /**代码名称 */
    m_MagicName: string = "";
    /**单位ID */
    m_MagicMiscId: number = 0;
    /**等级 */
    m_MagicLv: number = 0;
    /**最大等级 */
    m_MagicMaxLv: number = 0;
    /**生命值 */
    m_Hitpoints: number = 1;
    /**最大生命值 */
    m_MaxHitpoints: number = 1;
    /**攻击力 */
    m_Damage: number = 1;
    /**攻击间隔 */
    m_HitSpeed: number = 1;
    /**移动速度 */
    m_Speed: number = 1;
    /**攻击范围 */
    m_Range: number = 1;
    /**掉落奖励 */
    m_DropReward: string = "";
    /**经验奖励 */
    m_KillExperience: string = "";
    /**攻击时的物体代码 */
    m_Projectiles: string = "";
    /**投射物数量 */
    ProjectilesCount: number = 0;
    /**当前经验值 */
    CurExp: number = 0;
    /**最大经验值 */
    MaxExp: number = 0;
    /**可拥有的BUFFID */
    BuffMiscid: string;
    /**击退距离 */
    RepelValue: number = 0;

    Isone: boolean = true;

    /**克隆属性 */
    Clone(): MagicCubeSourceAttributeBase {
        let Temp = new MagicCubeSourceAttributeBase();
        Temp.m_MagicChess = this.m_MagicChess;
        Temp.m_MagicName = this.m_MagicName;
        Temp.m_MagicMiscId = this.m_MagicMiscId;
        Temp.m_MagicLv = this.m_MagicLv;
        Temp.m_Hitpoints = this.m_Hitpoints;
        Temp.m_MaxHitpoints = this.m_MaxHitpoints;
        Temp.m_Damage = this.m_Damage;
        Temp.m_HitSpeed = this.m_HitSpeed;
        Temp.m_Speed = this.m_Speed;
        Temp.m_Range = this.m_Range;
        Temp.m_DropReward = this.m_DropReward;
        Temp.m_KillExperience = this.m_KillExperience;
        Temp.m_Projectiles = this.m_Projectiles;
        Temp.m_MagicMaxLv = this.m_MagicMaxLv;
        Temp.BuffMiscid = this.BuffMiscid;
        /**当前经验值 */
        Temp.CurExp = this.CurExp;
        /**最大经验值 */
        Temp.MaxExp = this.MaxExp;
        return Temp;
    }
    ClonetToTemp(Temp: MagicCubeSourceAttributeBase): MagicCubeSourceAttributeBase {
        // let Temp = new MagicCubeSourceAttributeBase();
        Temp.m_MagicChess = this.m_MagicChess;
        Temp.m_MagicName = this.m_MagicName;
        Temp.m_MagicMiscId = this.m_MagicMiscId;
        Temp.m_MagicLv = this.m_MagicLv;
        Temp.m_Hitpoints = this.m_Hitpoints;
        Temp.m_MaxHitpoints = this.m_MaxHitpoints;
        Temp.m_Damage = this.m_Damage;
        Temp.m_HitSpeed = this.m_HitSpeed;
        Temp.m_Speed = this.m_Speed;
        Temp.m_Range = this.m_Range;
        Temp.m_DropReward = this.m_DropReward;
        Temp.m_KillExperience = this.m_KillExperience;
        Temp.m_Projectiles = this.m_Projectiles;
        Temp.m_MagicMaxLv = this.m_MagicMaxLv;
        Temp.BuffMiscid = this.BuffMiscid;
        /**当前经验值 */
        Temp.CurExp = this.CurExp;
        /**最大经验值 */
        Temp.MaxExp = this.MaxExp;
        return Temp;
    }
    ClonetTo(Temp: MagicCubeSourceAttributeBase): MagicCubeSourceAttributeBase {
        // let Temp = new MagicCubeSourceAttributeBase();
        Temp.m_MagicChess = this.m_MagicChess;
        Temp.m_MagicName = this.m_MagicName;
        Temp.m_MagicMiscId = this.m_MagicMiscId;
        Temp.m_MagicLv = this.m_MagicLv;
        Temp.m_Hitpoints = this.m_Hitpoints;
        Temp.m_MaxHitpoints = this.m_MaxHitpoints;
        Temp.m_Damage = this.m_Damage;
        Temp.m_HitSpeed = (1 / this.m_HitSpeed);
        Temp.m_Speed = this.m_Speed;
        Temp.m_Range = this.m_Range;
        Temp.m_DropReward = this.m_DropReward;
        Temp.m_KillExperience = this.m_KillExperience;
        Temp.m_Projectiles = this.m_Projectiles;
        Temp.m_MagicMaxLv = this.m_MagicMaxLv;
        Temp.BuffMiscid = this.BuffMiscid;
        /**当前经验值 */
        Temp.CurExp = this.CurExp;
        /**最大经验值 */
        Temp.MaxExp = this.MaxExp;
        return Temp;
    }
    /**加载属性 */
    public LodeAttribute(KeyName: string, MagicLv: number, TempEnitiy: Enitiy) {
        if (this.Isone) {
            this.Isone = false;
            switch (TempEnitiy) {
                case Enitiy.Role_Type:
                    this.LodeRoleA(KeyName, MagicLv);
                    break;
                case Enitiy.Filed_Type:
                    this.LodeFiledA(KeyName, MagicLv);
                    break;
                case Enitiy.Boos_Type:
                    this.LodeBoosA(KeyName, MagicLv);
                    break;
            }
        } else {
            this.m_Hitpoints = this.m_MaxHitpoints;
        }
    }
    /**加载英雄单位属性 */
    private LodeRoleA(KeyName: string, MagicLv: number) {
        /**加载基本属性 */
        let Data: _HeroAttributeInfoConfig.DataType = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByName(KeyName);
        if (Data != null) {
            this.m_MagicName = Data.HeroEnglishName;
            this.m_MagicChess = Data.HeroName;
            this.m_Damage = Data.AttackDamage;
            this.m_HitSpeed = Data.AttackSpeed;
            this.m_Hitpoints = Data.HealthValue;
            this.m_Speed = Data.MoveSpeed;
            this.m_MaxHitpoints = this.m_Hitpoints;
            this.m_MagicMiscId = Data.HeroMiscID;
            this.BuffMiscid = Data.GameSkills;
            this.m_Range = Data.AttackRange;//Number(Data.AttackRangeStr); //
            this.RepelValue = 20;
            /**加载技能 */
            let SkillID: _HeroSkillConfig.DataType = HeroSkillDataProxy.instance.GetHeroSkillInfoByMiscID(this.m_MagicMiscId);
            if (SkillID != null) {
                this.m_Projectiles = SkillID.SkillScriptName ? SkillID.SkillScriptName : "";
            }
            /**加载等级属性 */
            this.LodeMagicLevelAttribute(MagicLv);
            this.UpdateExpInfo();
        }
    }
    /**加载敌人单位属性 */
    private LodeFiledA(KeyName: string, MagicLv: number) {
        let Data: _EnemyInfoConfig.DataType = EnemyAttributeInfoProxy.instance.GetHeroAttributeInfoByName(KeyName);
        if (Data != null) {
            this.m_MagicName = Data.EnemyEnglishName;
            this.m_MagicChess = Data.EnemyChineseName;
            this.m_MagicMiscId = Data.EnemyMiscID;
            this.m_Damage = Data.AttackDamage;
            this.m_HitSpeed = Data.AttackSpeed;
            this.m_Hitpoints = Data.HealthValue;
            this.m_Speed = Data.MoveSpeed;
            this.m_MaxHitpoints = this.m_Hitpoints;
            this.m_Range = Data.AttackRange;
            this.m_KillExperience = Data.KillExperience ? Data.KillExperience : "";
            this.m_DropReward = Data.DropReward ? Data.DropReward : "";
            this.m_Projectiles = Data.Projectiles ? Data.Projectiles : "";
        }
    }

    /**加载Boos单位属性 */
    private LodeBoosA(KeyName: string, MagicLv: number) {
        /**加载基本属性 */
        let Data: _HeroAttributeInfoConfig.DataType = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByName(KeyName);
        if (Data != null) {
            this.m_MagicName = Data.HeroEnglishName;
            this.m_MagicChess = Data.HeroName;
            this.m_Damage = Data.AttackDamage;
            this.m_HitSpeed = Data.AttackSpeed;
            this.m_Hitpoints = Data.HealthValue;
            this.m_Speed = Data.MoveSpeed;
            this.m_MaxHitpoints = this.m_Hitpoints;
            this.m_MagicMiscId = Data.HeroMiscID;
            this.BuffMiscid = Data.GameSkills;
            this.m_Range = Data.AttackRange;
            /**加载技能 */
            let SkillID: _HeroSkillConfig.DataType = HeroSkillDataProxy.instance.GetHeroSkillInfoByMiscID(this.m_MagicMiscId);
            if (SkillID != null) {
                this.m_Projectiles = SkillID.SkillScriptName ? SkillID.SkillScriptName : "";
            }
        }
    }
    /**加载等级属性 */
    LodeMagicLevelAttribute(MagicLv: number) {
        for (let i = 1; i <= MagicLv; i++) {
            let UpDate: _HeroUpGradeConfig.DataType = HeroUpGradeDataProxy.instance.GetHeroUpInfoByMicIDAndLevel(this.m_MagicMiscId, i);
            if (UpDate != null) {
                this.m_Damage += UpDate.AttackValue;
                this.m_Hitpoints += UpDate.HealthValue;
                this.m_MaxHitpoints += UpDate.HealthValue;
            } else {
                console.log("没有获取到相关等级属性_" + i + "_" + this.m_MagicChess);
            }
        }
    }
    /**等级增加 */
    /**AddLevel */
    AddMagicLevel(): boolean {
        if (this.CheckLevelByMaxLv()) {
            this.CurExp = this.MaxExp;
            return false;
        }
        if (this.CurExp >= this.MaxExp) {
            this.m_MagicLv = this.m_MagicLv + 1;
            let BattleUpInfo: _HeroBattleUpGradeConfig.DataType = HeroBattleUpGradeDataProxy.instance.GetHeroBattleUpInfoByMicIDAndLevel(this.m_MagicMiscId, this.m_MagicLv);
            this.m_Damage = this.m_Damage + BattleUpInfo.AttackValue;
            this.m_Hitpoints = this.m_Hitpoints + BattleUpInfo.HealthValue;
            this.m_MaxHitpoints = this.m_MaxHitpoints + BattleUpInfo.HealthValue;
            this.CurExp -= this.MaxExp;
            this.UpdateExpInfo();
            this.AddMagicLevel();
            return true;
        }
        //return false;
    }
    CheckLevelByMaxLv(): boolean {
        let NextLv = (this.m_MagicLv + 1);
        if (NextLv > this.m_MagicMaxLv) {
            return true;
        }
        return false;
    }

    UpdateExpInfo() {
        let NextLv = (this.m_MagicLv + 1);
        if (this.m_MagicMaxLv != 0 && NextLv > this.m_MagicMaxLv) {
            return;
        }
        let BattleUpInfo: _HeroBattleUpGradeConfig.DataType = HeroBattleUpGradeDataProxy.instance.GetHeroBattleUpInfoByMicIDAndLevel(this.m_MagicMiscId, this.m_MagicLv + 1);
        this.MaxExp = BattleUpInfo.MaxLevelExp;
        this.m_MagicMaxLv = BattleUpInfo.HeroMaxLevel;
    }

}