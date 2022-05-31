import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { _EverydayTasksConfig } from "src/Game/_config/_EverydayTasksConfig";
import MesManager from "src/_T/Mes/MesManager";
import Task from "./Task";

export default class EverdyTask extends Task {
    constructor(TaskData: _EverydayTasksConfig.DataType, Index: number, IsBack: boolean = false) {

        super();
        this.m_Index = Index;
        this.m_TaskData = TaskData;
        this.Init(IsBack);
    }
    public get TaskData(): _EverydayTasksConfig.DataType {
        return this.m_TaskData;
    }
    m_Index: number;
    /**初始化任务数据 */
    Init(IsBack: boolean) {
        this.m_ResData = this.GetResICONById(this.TaskData.TaskRewardMiscID);
        this.TaskTarget = this.TaskData.TaskTarget;
        this.m_TaskTypeOne = this.TaskData.TaskType;
        let TempArray = this.TaskData.TaskRequirementType.split(":");
        this.m_TaskTypTwo = TempArray[0];// this.GetTypeByETaskType(this.TaskData.TaskRequirementType);
        if (TempArray.length > 1) {
            this.m_TaskTypThree = TempArray[1];
        } else {
            this.m_TaskTypThree = "";
        }
        let count1 = this.m_TaskTypeOne + this.m_TaskTypTwo;
        let count2 = this.m_TaskTypeOne + this.m_TaskTypThree;
        if (IsBack) {
            MesManager.off(count1, this, this.AddCurNumber);
            MesManager.on(count1, this, this.AddCurNumber);
            if (this.m_TaskTypThree != "") {
                MesManager.off(count2, this, this.AddCurNumber);
                MesManager.on(count2, this, this.AddCurNumber);
            }
        }
    }
    /**增加值 */
    AddCurNumber(Count: number = 1) {
        //  console.log("调用EverdyTask");
        //let [Key, Value] = HunterGameDataMediator.instance.data.EverydayTask[this.m_Index];
        this.TaskData.CurNum += 1;
        this.TaskData.CurNum = this.TaskData.CurNum >= this.TaskData.RequirementValue ? this.TaskData.RequirementValue : this.TaskData.CurNum;
        //console.log(HunterGameDataMediator.instance.data.EverydayTask[this.m_Index]);
        HunterGameDataMediator.instance.Save();
    }
    GetTaskState(): number {
        this.GetTaskCondition();
        return this.TaskData.TaskState;
    }
    /**获取条件判定 */
    public GetTaskCondition() {
        if (this.TaskData.TaskState < 0) {
            this.TaskData.TaskState = -1;
            return;
        }
        if (this.TaskData.CurNum >= this.TaskData.RequirementValue) {
            this.TaskData.TaskState = 1;
        } else {
            this.TaskData.TaskState = 0;
        }
    }
    TaskReceiveRewards() {

    }

}