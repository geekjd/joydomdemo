import { _AchievementTasksConfig } from "src/Game/_config/_AchievementTasksConfig";
import { _EverydayTasksConfig } from "src/Game/_config/_EverydayTasksConfig";
import { _PassRewardConfig } from "src/Game/_config/_PassRewardConfig";
import BaseData from "src/_T/Data/BaseData";
import { PassData } from "src/Game/UICon/GameMianCom/PPassProxy";
import MesManager from "src/_T/Mes/MesManager";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";

/**
 * 设置数据
 */
export default class HunterGameData extends BaseData {

    /**金币 */
    private _Gold: number = 0;
    /**钻石 */
    private _Gemstone: number = 0;
    /**奖杯 */
    Trophy: number = 0;
    /**积分 */
    Integral: number = 0;
    /**门票卷 */
    Ticket: number = 0;
    /**历程等级 */
    CourseLv: number = 1;
    /**当前选择的模式需求额奖杯数量  */
    public GameModeTrophy: number[] = [0, 10, 30, 50];
    /**模式数量 */
    public readonly GameModeArray: string[] = ["Hunting", "Sports", "Cooperation", "Existence"];

    SelectMode: string = "Hunting";
    /**选择的人物脚本名称 */
    SelectHunterName: string = "ElfArcher";
    /**选着的人物模型 */
    SelectHunterSkinName: string = "ElfArcher";
    /** */
    SelectHunterLevel: number = 1;
    /**选择的人物ID */
    SelectHunterMiscID: number = 100001;
    /**选择的人物技能配置 */
    SelectHunterSkillMiscID: number[] = [];
    /**每日任务完成数量 */
    TotalEveryTaskNum: number = 100;
    /**活动积分数量 */
    TotalIntegral: number = 200;
    /**抵御波数 */
    ToatalResistWave: number = 1000;
    /**每日刷新时间 */
    EverydayTime: number = 0;
    /**每周刷新时间 */
    WeeklyTime: number = 0;
    /**广告任务 */
    AudioTask: _AchievementTasksConfig.DataType = null;
    /**成就任务 */
    AchievementTask: [number, _AchievementTasksConfig.DataType][] = [];
    /**每日任务 */
    EverydayTask: [number, _EverydayTasksConfig.DataType][] = [];
    /**每周任务 */
    WeeklyTask: [number, _EverydayTasksConfig.DataType][] = [];

    /**是否有赛季通行证 */
    havePass: boolean = false;
    /**赛季通行证等级 */
    passLv: number = 0;
    /**赛季通行证当前等级已有经验 */
    passExp: number = 0;
    /**赛季通行证等级升级所需经验值，暂时固定 */
    passMaxExp: number = 100;
    /**通行证奖励 */
    PassDatas: PassData[] = [];
    /**进入关卡时需要消耗的门票 */
    DaiBi: number = 120;
    /**自动恢复代币时的上限，用道具增加的无上限 */
    DaiBi_Limit: number = 120;
    /**下一次获得代币门票的时间 */
    public daibiNextTime: number = 0;

    /**金币 */
    public get Gold() {
        return this._Gold;
    }
    public set Gold(value: number) {
        this._Gold = value;
        //通知感兴趣的组件更新
        MesManager.event(EUIEvent.refreshGold);
    }
    /**钻石 */
    public get Gemstone() {
        return this._Gemstone;
    }

    public set Gemstone(value: number) {
        this._Gemstone = value;
        //通知感兴趣的组件更新
        MesManager.event(EUIEvent.refreshDiamond);
    }
    /*赛季时间 数据记录 */
    SeasonNum: number = 0;
    SeasonDay: number = 0;
    shareIntervalTimes: number = 0;

    /**钻石首次免费 */
    itemOneIsfirst: boolean = true;
    itemTwoIsfirst: boolean = true;
    itemThreeIsfirst: boolean = true;

    /**钻石刷新天数 */
    DayRefresh: number = 0;
    TodayCanClick: boolean = true;

    /**第一次*/
    firstrtimes: boolean = true;

}