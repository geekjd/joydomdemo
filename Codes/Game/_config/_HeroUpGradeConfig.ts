// ！ 自动导出，请不要修改
//
/**
 * _HeroUpGradeConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _HeroUpGradeConfig {
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
       /** 等级 */
        Degree: number;
       /** 当前等级所需的英雄数量 */
        NeedHeroNum: number;
       /** 升级所需金币 */
        HeroUpGold: number;
       /** 升级后的伤害 */
        AttackValue: number;
       /** 升级后的生命值 */
        HealthValue: number;
    }
    /** config数据列表 */
    export var datas: _HeroUpGradeConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'HeroUpGradeConfig.json';
}
    