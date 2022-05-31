// ！ 自动导出，请不要修改
//
/**
 * _CourseConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _CourseConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要]历程配置表 */
        id: number;
       /** 等级 */
        lv: number;
       /** 经验值  */
        exp: number;
       /** 奖励ID */
        propID: number;
       /** 奖励数量 */
        count: number;
    }
    /** config数据列表 */
    export var datas: _CourseConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'CourseConfig.json';
}
    