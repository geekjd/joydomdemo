
/**碰撞单位脚本 */
export default class MyCollisionalBodyBase extends Laya.Script3D {

    /**触发单位的 单位类型 */
    // m_EnemyType: EnemyType = EnemyType.Enemy_NUll;
    // m_RoomLayer: RoomLayer = RoomLayer.Room_NULL;
    /**方法调用类型 */
    IsTrigger: boolean = true;

    SelfWordPoint: Laya.Vector3;
    EnemyWordPoint: Laya.Vector3;

    ClientID: number = 0;

    Init() {

    }
    /**Trigger进入 */
    onTriggerEnter(Con: Laya.PhysicsComponent) {
        if (!this.IsTrigger) return;
    }
    /**Trigger退出 */
    onTriggerExit(Con: Laya.PhysicsComponent) {
        if (!this.IsTrigger) return;

    }
    /**刚体碰撞进入 */
    onCollisionEnter(Con: Laya.Collision) {
        if (this.IsTrigger) return;
    }
    /**刚体碰撞退出 */
    onCollisionExit(Con: Laya.Collision) {
        if (this.IsTrigger) return;
    }

}