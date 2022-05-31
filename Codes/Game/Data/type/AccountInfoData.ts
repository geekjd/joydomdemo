import BaseData from "src/_T/Data/BaseData";

/**
 * 设置数据
 */
export default class AccountInfoData extends BaseData {

    /**玩家名称*/
    PlayerName: string = "";
    /**玩家头像 */
    PlayerAvatar: string = "";
    /**玩家头衔 */
    PlayerTitle: string = "";
    /**名称颜色 */
    NameColor: string = "";
    /**最高奖杯 */
    TopTrophy: number = 0;
    /**玩的最多的猎人 */
    PlayHunterMaxCount: string = "";
    /**猎手 */
    HunterCount: number;
    /**永久能力 */
    PermanentCapacity: number = 0;
    /**上场时间 */
    PlayingTime: number = 0;
    /**已完成的活动 */
    CompletedActivities: number = 0;
    /**狩猎名次 */
    HuntingRanking: number = 0;
    /**赏金名次 */
    PrizeRanking: number = 0;
    /**BOOS挑战名次 */
    BoosChallengeRanking: number = 0;
    /**合作浪潮波次 */
    WavesCooperation: number = 0;


}