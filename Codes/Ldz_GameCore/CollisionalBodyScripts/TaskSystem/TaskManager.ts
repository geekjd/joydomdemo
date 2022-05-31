import { AchievementProxy } from "src/Game/ConfigProxy/AchievementProxy";
import { EveryDayProxy } from "src/Game/ConfigProxy/EveryDayProxy";
import { WeeklyTaskProxy } from "src/Game/ConfigProxy/WeeklyTaskProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { _AchievementTasksConfig } from "src/Game/_config/_AchievementTasksConfig";
import ComResUrl from "src/_T/Res/ComResUrl";
import MathUtils from "src/_T/Utils/MathUtils";
import TimeUtils from "src/_T/Utils/TimeUtils";
import AchievementTask from "./AchievementTask";
import EverdyTask from "./EverdyTask";
// import PassReward from "../PassRewardManager/PassReward";
import WeeklyTask from "./WeeklyTask";

export default class TaskManager {
    private constructor() { };
    private static _Instance: TaskManager;
    public static get Instance(): TaskManager {
        if (this._Instance == null) { this._Instance = new TaskManager(); }
        return this._Instance;
    }

    /**成就任务列表 */
    private m_AchievementTaskList: Array<AchievementTask>;
    /**每日任务列表 */
    private m_EverdyTaskList: Array<EverdyTask>;
    /**每日任务列表 */
    private m_WeeklyTaskList: Array<WeeklyTask>;
    /**视屏任务 */
    private m_AudioTask: EverdyTask;
    /**初始化 任务管理器 */
    public InitTask() {
        this.m_AchievementTaskList = new Array<AchievementTask>();
        this.m_EverdyTaskList = new Array<EverdyTask>();
        this.m_WeeklyTaskList = new Array<WeeklyTask>();
        this.ReadAudioTask();
        this.ReadTaskMemory();
        this.ReadEverdyTaskMemory();
        this.ReadWeeklyTaskMemory();
    }
    //#region  任务列表参数获取方法

    /*****-------------------------成就任务 */
    /**返回成就任务长度 */
    public GetAchievementTasklength(): number {
        return this.m_AchievementTaskList.length;
    }
    /**获取成就任务列表 */
    public GetAchievementTaskList(): Array<AchievementTask> {
        return this.m_AchievementTaskList;
    }
    /**根据下标获取成就任务数据 */
    public GetAchievementTaskDataByIndex(Index: number): AchievementTask {
        if (!this.m_AchievementTaskList) return null;
        if (this.m_AchievementTaskList.length == 0) return null;
        if (Index < 0 || Index >= this.m_AchievementTaskList.length) return null;
        return this.m_AchievementTaskList[Index];
    }
    /**返回已完成的成就任务个数 */
    GetAchievementTaskCompleteCount(): number {
        let Count = 0;
        let Len = this.m_AchievementTaskList.length;
        for (let i = 0; i < Len; ++i) {
            if (this.m_AchievementTaskList[i].GetTaskState() == 1) {
                ++Count;
            }
        }
        return Count;
    }


    /*****-------------------------每日任务 */
    /**返回每日任务长度 */
    public GetEverdyTasklength(): number {
        return this.m_EverdyTaskList.length;
    }
    /**获取每日任务列表 */
    public GetEverdyTaskList(): Array<EverdyTask> {
        return this.m_EverdyTaskList;
    }
    /**根据下标获取每日任务数据 */
    public GetEverdyTaskDataByIndex(Index: number): EverdyTask {
        if (!this.m_EverdyTaskList) return null;
        if (this.m_EverdyTaskList.length == 0) return null;
        if (Index < 0 || Index >= this.m_EverdyTaskList.length) return null;
        return this.m_EverdyTaskList[Index];
    }
    /**返回已完成的成就任务个数 */
    GetEverdyTaskCompleteCount(): number {
        let Count = 0;
        let Len = this.m_EverdyTaskList.length;
        for (let i = 0; i < Len; ++i) {
            if (this.m_EverdyTaskList[i].GetTaskState() == 1) {
                ++Count;
            }
        }
        return Count;
    }

    /*****-------------------------每周任务 */

    /**返回每周任务长度 */
    public GetWeeklyTasklength(): number {
        return this.m_WeeklyTaskList.length;
    }
    /**获取每周任务列表 */
    public GetWeeklyTaskList(): Array<WeeklyTask> {
        return this.m_WeeklyTaskList;
    }
    /**根据下标获取每周任务数据 */
    public GetWeeklyTaskDataByIndex(Index: number): WeeklyTask {
        if (!this.m_WeeklyTaskList) return null;
        if (this.m_WeeklyTaskList.length == 0) return null;
        if (Index < 0 || Index >= this.m_WeeklyTaskList.length) return null;
        return this.m_WeeklyTaskList[Index];
    }
    /**返回已完成的成就任务个数 */
    GetWeeklyTaskCompleteCount(): number {
        let Count = 0;
        let Len = this.m_WeeklyTaskList.length;
        for (let i = 0; i < Len; ++i) {
            if (this.m_WeeklyTaskList[i].GetTaskState() == 1) {
                ++Count;
            }
        }
        return Count;
    }

    //#endregion 

    //#region 
    /**读取视屏任务 */
    ReadAudioTask() {
        if (HunterGameDataMediator.instance.data.AudioTask == null) {
            let TmpArray = [...EveryDayProxy.instance.dataList];
            let Temp = TmpArray[TmpArray.length - 1];
            let TempTask: EverdyTask = new EverdyTask(Temp, 999, true);
            HunterGameDataMediator.instance.data.AudioTask = Temp;
            this.m_AudioTask = TempTask;
        } else {
            let Temp = HunterGameDataMediator.instance.data.AudioTask;
            let TempTask: EverdyTask = new EverdyTask(Temp, 999, true);
            this.m_AudioTask = TempTask;
        }
    }
    /**获取视屏任务 */
    GetAudioTask(): EverdyTask {
        return this.m_AudioTask;
    }
    /**重置状态 */
    SetAudioTaskState() {
        HunterGameDataMediator.instance.data.AudioTask.CurNum = 0;
        HunterGameDataMediator.instance.data.AudioTask.TaskState = 0;
        this.m_AudioTask.TaskData.CurNum = 0;
        this.m_AudioTask.TaskData.TaskState = 0;
        HunterGameDataMediator.instance.Save();
    }


    //#endregion


    //#region 读取成就任务
    SetInfo(Left: _AchievementTasksConfig.DataType, Right: _AchievementTasksConfig.DataType) {
    }

    /**读取任务内存 */
    private ReadTaskMemory() {
        /**读取成就任务 */
        /**查看缓存是否拥有成就任务 */
        if (HunterGameDataMediator.instance.data.AchievementTask == null || HunterGameDataMediator.instance.data.AchievementTask.length == 0) {
            /**没有成就任务缓存那么添加 */
            let Len = AchievementProxy.instance.dataList.length;
            let TmpArray = [...AchievementProxy.instance.dataList];
            HunterGameDataMediator.instance.data.AchievementTask = [];
            for (let i = 0; i < Len; i++) {
                let Temp = TmpArray[i];
                let TempData = new _AchievementTasksConfig.DataType();
                let TempTask: AchievementTask = new AchievementTask(Temp, i, true);
                this.m_AchievementTaskList.push(TempTask);
                HunterGameDataMediator.instance.data.AchievementTask.push([Temp.TaskMiscID, Temp]);
            }
        } else {
            /**从缓存中取出 成就任务 */
            //let TempArray = [...HunterGameDataMediator.instance.data.AchievementTask];
            let Len = HunterGameDataMediator.instance.data.AchievementTask.length;
            for (let i = 0; i < Len; i++) {
                let [Key, Value] = HunterGameDataMediator.instance.data.AchievementTask[i];
                let TempTask: AchievementTask = new AchievementTask(Value, i, true);
                this.m_AchievementTaskList.push(TempTask);
            }
            this.CheckTaskISNewTask();
        }
    }
    CheckTaskISNewTask() {
        let Len = AchievementProxy.instance.dataList.length;
        let TempMap: Map<number, number> = new Map<number, number>();
        for (let i = 0; i < this.m_AchievementTaskList.length; i++) {
            TempMap.set(this.m_AchievementTaskList[i].TaskData.TaskMiscID, this.m_AchievementTaskList[i].TaskData.TaskMiscID);
        }
        let TmpArray = [...AchievementProxy.instance.dataList];
        for (let i = 0; i < Len; i++) {
            let Temp = TmpArray[i];
            if (!TempMap.has(Temp.TaskMiscID)) {
                let TempTask: AchievementTask = new AchievementTask(Temp, i, true);
                this.m_AchievementTaskList.push(TempTask);
                HunterGameDataMediator.instance.data.AchievementTask.push([Temp.TaskMiscID, Temp]);
            }
        }
    }
    //#endregion  

    //#region 读取每日任务

    /**读取缓存中的每任务内存 */
    private ReadEverdyTaskMemory() {
        /**获取配置表中的每日任务 */
        if (HunterGameDataMediator.instance.data.EverydayTask == null || HunterGameDataMediator.instance.data.EverydayTask.length == 0) {
            this.RefreshEverdyTask();
        } else {
            if (this.CheckEverdyTaskIsRefresh()) {
                this.m_EverdyTaskList = [];
                let EverydatLen = HunterGameDataMediator.instance.data.EverydayTask.length;
                for (let i = 0; i < EverydatLen; i++) {
                    let [Key, Value] = HunterGameDataMediator.instance.data.EverydayTask[i];
                    let TempTask: EverdyTask = new EverdyTask(Value, i, true);
                    this.m_EverdyTaskList.push(TempTask);
                }
            }
        }
    }

    /**检测是否刷新每日任务 */
    CheckEverdyTaskIsRefresh(): boolean {
        let curTime: number = TimeUtils.GetCurrentDayCount(new Date().getTime());
        let curIndex: number = curTime - HunterGameDataMediator.instance.data.EverydayTime;
        if (HunterGameDataMediator.instance.data.EverydayTime == 0 || curIndex > 0) {
            //刷新
            HunterGameDataMediator.instance.data.EverydayTime = curTime;
            HunterGameDataMediator.instance.Save();
            console.log("刷新任务");
            this.RefreshEverdyTask();
            return false;
        }
        return true;
    }

    /**刷新每日任务 */
    RefreshEverdyTask() {
        /**读取配置表中的每日任务列表 */
        let EverydatLen = EveryDayProxy.instance.dataList.length;
        let TmpArray = [...EveryDayProxy.instance.dataList];
        HunterGameDataMediator.instance.data.EverydayTask = [];
        for (let i = 0; i < 3; i++) {
            let RandIndex = MathUtils.randomRangeInt(0, (TmpArray.length - 1));
            let Temp = TmpArray.splice(RandIndex, 1);
            if (Temp.length < 1) return;
            let TempTask: EverdyTask = new EverdyTask(Temp[0], i, true);
            this.m_EverdyTaskList.push(TempTask);
            HunterGameDataMediator.instance.data.EverydayTask.push([Temp[0].TaskMiscID, Temp[0]]);
        }
        // for (let i = 0; i < EverydatLen; i++) {
        //     let Temp = TmpArray[i];
        //     let TempTask: EverdyTask = new EverdyTask(Temp, i, true);
        //     this.m_EverdyTaskList.push(TempTask);
        //     HunterGameDataMediator.instance.data.EverydayTask.push([Temp.TaskMiscID, Temp]);
        // }
    }

    //#endregion

    //#region 读取每周任务
    /**读取缓存中的每周任务内存 */
    private ReadWeeklyTaskMemory() {
        /**获取配置表中的每日任务 */
        if (HunterGameDataMediator.instance.data.WeeklyTask == null || HunterGameDataMediator.instance.data.WeeklyTask.length == 0) {
            this.RefreshWeeklyTask();
        } else {
            if (this.CheckWeeklyTaskIsRefresh()) {
                this.m_WeeklyTaskList = [];
                let EverydatLen = HunterGameDataMediator.instance.data.WeeklyTask.length;
                for (let i = 0; i < EverydatLen; i++) {
                    let [Key, Value] = HunterGameDataMediator.instance.data.WeeklyTask[i];
                    let TempTask: WeeklyTask = new WeeklyTask(Value, i, true);
                    this.m_WeeklyTaskList.push(TempTask);
                }
            }
        }
    }

    /**检测是否刷新每周任务 */
    CheckWeeklyTaskIsRefresh(): boolean {
        let curTime: number = TimeUtils.GetCurrentDayCount(new Date().getTime());
        let curIndex: number = curTime - HunterGameDataMediator.instance.data.WeeklyTime;
        if (HunterGameDataMediator.instance.data.WeeklyTime == 0 || curIndex > 0) {
            //刷新
            HunterGameDataMediator.instance.data.WeeklyTime = curTime;
            HunterGameDataMediator.instance.Save();
            console.log("刷新任务");
            this.RefreshWeeklyTask();
            return false;
        }
        return true;
    }

    /**刷新每周任务 */
    RefreshWeeklyTask() {
        /**读取配置表中的每周任务列表 */
        let EverydatLen = WeeklyTaskProxy.instance.dataList.length;
        let TmpArray = [...WeeklyTaskProxy.instance.dataList];
        HunterGameDataMediator.instance.data.WeeklyTask = [];
        for (let i = 0; i < EverydatLen; i++) {
            let Temp = TmpArray[i];
            let TempTask: WeeklyTask = new WeeklyTask(Temp, i, true);
            this.m_WeeklyTaskList.push(TempTask);
            HunterGameDataMediator.instance.data.WeeklyTask.push([Temp.TaskMiscID, Temp]);
        }
    }

    //#endregion

    //#region 保存相关

    /**根据ID保存成就任务 */
    SetAchievementTaskState(Index: number, TaskMsicID: number) {
        for (let i = 0; i < HunterGameDataMediator.instance.data.AchievementTask.length; i++) {
            let [Key, Value] = HunterGameDataMediator.instance.data.AchievementTask[i];
            if (Key == TaskMsicID) {
                Value.CurNum -= Value.RequirementValue;
                Value.TaskState = 0;
            }
        }
        this.m_AchievementTaskList[Index].TaskData.CurNum -= this.m_AchievementTaskList[Index].TaskData.RequirementValue;
        this.m_AchievementTaskList[Index].TaskData.TaskState = 0;
        HunterGameDataMediator.instance.Save();
    }
    /**根据ID保存每日任务 */
    SetEverdyTaskState(Index: number, TaskMsicID: number) {

        for (let i = 0; i < HunterGameDataMediator.instance.data.EverydayTask.length; i++) {
            let [Key, Value] = HunterGameDataMediator.instance.data.EverydayTask[i];
            if (Key == TaskMsicID) {
                Value.TaskState = -1;
            }
        }
        this.m_EverdyTaskList[Index].TaskData.TaskState = -1;
        HunterGameDataMediator.instance.Save();
    }

    /**根据ID保存每周任务 */
    SetWeeklyTaskState(Index: number, TaskMsicID: number) {

        for (let i = 0; i < HunterGameDataMediator.instance.data.WeeklyTask.length; i++) {
            let [Key, Value] = HunterGameDataMediator.instance.data.WeeklyTask[i];
            if (Key == TaskMsicID) {
                Value.TaskState = -1;
            }
        }
        this.m_WeeklyTaskList[Index].TaskData.TaskState = -1;
        HunterGameDataMediator.instance.Save();
    }
    //#endregion

}