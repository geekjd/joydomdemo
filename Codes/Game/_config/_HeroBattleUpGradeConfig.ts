// ！ 自动导出，请不要修改
//
/**
 * _HeroBattleUpGradeConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _HeroBattleUpGradeConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** ID */
        Id: number;
       /** 英雄ID */
        HeroMiscID: number;
       /** 英雄类型 */
        HeroType: string;
       /** 所需经验 */
        MaxLevelExp: number;
       /** 等级 */
        Degree: number;
       /** 最大等级 */
        HeroMaxLevel: number;
       /** 升级后的伤害 */
        AttackValue: number;
       /** 升级后的生命值 */
        HealthValue: number;
    }
    /** config数据列表 */
    export var datas: _HeroBattleUpGradeConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'HeroBattleUpGradeConfig.json';
}
    