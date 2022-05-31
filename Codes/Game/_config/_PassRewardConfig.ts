// ！ 自动导出，请不要修改
//
/**
 * _PassRewardConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _PassRewardConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 升到下一级所需积分 */
        IntegralNum: number;
       /** 免费奖励ID */
        freeID: number;
       /** 免费奖励数量 */
        freeCount: number;
       /** 进阶奖励ID */
        plusID: number;
       /** 进阶奖励数量 */
        plusCount: number;
    }
    /** config数据列表 */
    export var datas: _PassRewardConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'PassRewardConfig.json';
}
    