import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { _ResourcePropsConfig } from "src/Game/_config/_ResourcePropsConfig";

enum TaskState {
    /**0 不可接状态*/
    cannotAccept = 0,
    /**1 可接  但还未接的状态*/
    canAccept = 1,
    /**2 已接  正在进行中*/
    doTasking = 2,
    /**3 完成  未领奖*/
    completeTask = 3,
    /**4 完成  已领奖*/
    finishTask = 4,
}

/**任务 */
export default class Task {
    /**任务id*/
    private m_TaskID: number;
    /**任务状态*/
    private m_TaskState: TaskState;
    /**任务进度*/
    private progress: number;
    /**任务需求人 */
    TaskTarget: string;
    /**数据类型 */
    protected m_TaskData: any;
    /**道具类型 */
    m_ResData: _ResourcePropsConfig.DataType;
    /**任务类型1 */
    m_TaskTypeOne: any;
    /**任务类型2 */
    m_TaskTypTwo: any;
    /**任务类型3 */
    m_TaskTypThree: any;

    /**重写此方法 */
    public get TaskData(): any {
        return this.m_TaskData;
    }
    /**更新 任务 */
    UpdateTask() {

    }
    /**
     * 
     * @returns 获取当前状态 -1已领取 1 已达到条件但未领取 0 进行中
     */
    public GetTaskCondition() {
        if (this.TaskData.TaskState < 0) {
            this.TaskData.TaskState = -1;
        }
        if (this.TaskData.CurNum >= this.TaskData.RequirementValue) {
            this.TaskData.TaskState = 1;
        } else {
            this.TaskData.TaskState = 0;
        }
    }
    GetTaskState(): number {
        this.GetTaskCondition();
        return this.TaskData.TaskState;
    }
    TaskReceiveRewards() {

    }

    /**获取任务条件的值 */
    protected GetTaskNumber(type: any = this.m_TaskTypTwo): number {
        return 0;
    }
    //#region  根据类型2 获取对应的数值 
    /**击杀 */
    protected ETaskTypeSkill(): number {
        return 0;
    }
    /**生成 */
    protected ETaskTypeCreator(): number {
        return 0;
    }
    /**收集 */
    protected ETaskTypecollection(): number {

        return 0;
    }
    /**团灭 */
    protected ETaskTypeACE(): number {
        return 0;
    }
    /**挑战 */
    protected ETaskTypeChanllenge(): number {
        return 0;
    }
    /**建造与升级 */
    protected ETaskTypeBuilding(): number {
        return 0;
    }
    //#endregion

    /** 通过进度条获取进度条信息*/
    public GetProgressRateData(): { rate: number, rateTxt: string } {
        let CurCount: number = this.m_TaskData.CurNum;
        let value = this.m_TaskData;
        var rate = CurCount / value.CurMaxNum * 100;
        var rateTxt = CurCount + '/' + value.CurMaxNum;
        return { rate: rate, rateTxt: rateTxt };
    }
    /**根据类型1 使用字符串解析方法 并返回对应类型 */
    protected GetTypeByETaskType(TypeStr: string): any {

    }
    /**根据配置表中的道具ID 获取道具属性 */
    GetResICONById(ResId: number): _ResourcePropsConfig.DataType {
        return ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(ResId);
    }
    //#region  获取字符串解析 获取类型参数
    /**获取房间类型 */
    protected GetRoomLayerTypeeByString(TypeStr: string): any {
        return null;
    }

    /**获取对象类型 */
    protected GetEntityTypeByString(TypeStr: string): any {
        return null;
    }
    /**获取道具类型 */
    protected GetResItemTypeeByString(TypeStr: string): any {
        return null;
    }

    //#endregion

}