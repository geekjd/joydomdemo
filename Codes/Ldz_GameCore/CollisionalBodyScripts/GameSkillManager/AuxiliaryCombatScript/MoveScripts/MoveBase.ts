import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";

export default class MoveBase {

    /**移动的单位 */
    MoveTarget: Laya.Sprite3D;
    /**目标对象(追踪) */
    TargetObj: Laya.Sprite3D;
    /**方向 */
    Direction: Laya.Vector3;
    /**坐标 */
    TargetPos: Laya.Vector3;
    /**开始移动 */
    StarMoveFunction: any;
    /**结束移动 */
    EndMoveFunction: Laya.Handler;
    /**当前帧 */
    CurrentFrame: number = 0;
    /**是否循环 */
    Isloop: boolean = true;
    /**移动速度 */
    MoveSpeed: number = 25;
    /**攻击数据 */
    m_m_DamageData: DamageData;
    /**IsLook */
    IsLookAt: boolean = true;

    /**初始化数据 */
    InitData(MoveTarget: Laya.Sprite3D, Temp: any) { };
    /**更新移动 */
    UpdateMove() { };


}