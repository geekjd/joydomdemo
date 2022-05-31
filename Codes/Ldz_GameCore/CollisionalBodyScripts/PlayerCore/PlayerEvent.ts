import MesT from "src/_T/Mes/MesT";

/**
 * 所有的UI事件
 */

export enum E_AD_PlayerEvent {
    /**玩家移动 */
    PlayerMove,
    /**玩家跳跃 */
    PlayerJump,
    /**玩家旋转 */
    PlayerRotate,
    /**玩家点击使用按钮*/
    PlayerUser,
}
//
MesT.packE(E_AD_PlayerEvent);