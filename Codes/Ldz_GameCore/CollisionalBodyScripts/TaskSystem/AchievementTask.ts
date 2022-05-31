import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { _AchievementTasksConfig } from "src/Game/_config/_AchievementTasksConfig";
import MesManager from "src/_T/Mes/MesManager";
import Task from "./Task";

export default class AchievementTask extends Task {
    constructor(TaskData: _AchievementTasksConfig.DataType, Index: number, IsBack: boolean = false) {
        super();
        this.m_Index = Index;
        this.m_TaskData = TaskData;
        this.Init(IsBack);
    }
    m_Index: number = 0;
    public get TaskData(): _AchievementTasksConfig.DataType {
        return this.m_TaskData;
    }
    /**初始化任务数据 */
    Init(IsBack: boolean) {
        this.m_ResData = this.GetResICONById(this.TaskData.TaskRewardMiscID);
        this.TaskTarget = this.TaskData.TaskTarget;
        this.m_TaskTypeOne = this.TaskData.TaskType;
        let TempArray = this.TaskData.TaskRequirementType.split(":");
        this.m_TaskTypTwo = TempArray[0];// this.GetTypeByETaskType(this.TaskData.TaskRequirementType);
        this.m_TaskTypThree = TempArray[1];
        let count1 = this.m_TaskTypeOne + this.m_TaskTypTwo;
        let count2 = this.m_TaskTypeOne + this.m_TaskTypThree;
        if (IsBack) {
            MesManager.off(count1, this, this.AddCurNumber);
            MesManager.on(count1, this, this.AddCurNumber);
            MesManager.off(count2, this, this.AddCurNumber);
            MesManager.on(count2, this, this.AddCurNumber);
        }
    }

    /**增加值 */
    AddCurNumber(Count: number = 1) {
        let [Key, Value] = HunterGameDataMediator.instance.data.AchievementTask[this.m_Index];
        Value.CurNum += Count;
        Value.CurNum = Value.CurNum >= Value.RequirementValue ? Value.RequirementValue : Value.CurNum;
        HunterGameDataMediator.instance.Save();
    }
    setData(name: string, count: number, imgNane: string) {
        //(this.m_TaskData as _AchievementTasksConfig.DataType).
    }
    public GetTaskCondition() {
        if (this.TaskData.TaskState == -1) { return; }
        if (this.TaskData.TaskLevle > 10) { this.TaskData.TaskState = -1; return; }
        //this.TaskData.RequirementValue = this.TaskData.TaskLevle * 5;
        if (this.TaskData.CurNum >= this.TaskData.RequirementValue) {
            this.TaskData.TaskState = 1;
            return;
        } else {
            this.TaskData.TaskState = 0;
            return;
        }
    }
    GetTaskState(): number {
        this.GetTaskCondition();
        return this.TaskData.TaskState;
    }
    TaskReceiveRewards() {

    }
    //#endregion

}