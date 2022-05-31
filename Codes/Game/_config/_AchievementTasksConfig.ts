// ！ 自动导出，请不要修改
//
/**
 * _AchievementTasksConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _AchievementTasksConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 每日任务ID */
        TaskMiscID: number;
       /** 任务等级 */
        TaskLevle: number;
       /** 任务类型 */
        TaskType: string;
       /** 任务需求限定人 */
        TaskTarget: string;
       /** 任务需求类型 */
        TaskRequirementType: string;
       /** 当前进度值 */
        CurNum: number;
       /** 需求数量 */
        RequirementValue: number;
       /** 任务奖励ID */
        TaskRewardMiscID: number;
       /** 任务奖励数量 */
        TaskRewardCount: number;
       /** 任务状态（-1已完成 0进行中 1待领取） */
        TaskState: number;
       /** 任务标题 */
        TsakTittle: string;
       /** 任务说明(&User:目标  &Demand：需求数量  ) */
        MissionStatement: string;
    }
    /** config数据列表 */
    export var datas: _AchievementTasksConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'AchievementTasksConfig.json';
}
    