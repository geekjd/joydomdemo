import BaseData from "src/_T/Data/BaseData";

export class HeroAchievementInfo {

    /**英雄ID */
    HeroMiscID: number = 1;
    /**英雄名称 */
    HeroEnName: string = "";
    /**已经解锁的皮肤名称 */
    HeroSkinInfo: string[] = [];
    /**英雄当前正在使用的皮肤 */
    HeroUsingSkin: string = "";
    /**英雄等级 */
    HeroLevel: number = 1;
    /**第六级的技能配置 */
    LevelSixSkills: number = 0;
    /**第八级的技能配置 */
    LevelEightSkills: number = 0;
    /**第十级的技能配置 */
    LevelTenSkills: number = 0;
    /**已解锁的技能 */
    UnlockedSkills: number[] = [];
    /**英雄碎片 */
    HeroFragment: number = 0;
    /**英雄奖杯*/
    HeroTrophy: number = 0;
    /**狩猎名次 */
    HuntingRanking: number = 0;
    /**赏金名次 */
    PrizeRanking: number = 0;
    /**BOOS挑战名称 */
    BoosChallengeRanking: number = 0;
    /**合作浪潮波次 */
    WavesCooperation: number = 0;

}

/**
 * 设置数据
 */
export default class HunterHeroInfoData extends BaseData {
    /**已解锁的游戏角色 */
    HeroData: [number, HeroAchievementInfo][] = [];

}