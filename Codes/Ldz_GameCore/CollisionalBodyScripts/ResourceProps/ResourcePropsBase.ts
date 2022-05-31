

/**3D资源基类 */
export default class ResourcePropsBase extends Laya.Script3D {
    /**当资源个数不足是否销毁 */
    IsDestory: boolean = false;
    IsOpenUI: boolean = false;
    IsSend: boolean = false;
    m_SceneSprite3d: Laya.Sprite3D;

    Tips_Txt: string = "";
    //m_SelfCollision: Laya.ColliderBase;
    /**-1为无限时间 */
    m_DestroyTimer = -1;
    /**当前时间 */
    m_CurTime = 0;
    onAwake() {
        this.IsOpenUI = false;
        this.m_SceneSprite3d = this.owner as Laya.Sprite3D;

        this.m_CurTime = 0;
        this.m_DestroyTimer = -1;
        // this.m_SelfCollision = this.m_SceneSprite3d.getComponent(Laya.ColliderBase);

    }


    onStart() {

    }
    /**Trigger进入 */
    onTriggerEnter(Con: Laya.PhysicsComponent) {
    }
    /**Trigger退出 */
    onTriggerExit(Con: Laya.PhysicsComponent) {
    }
    onUpdate() {
    }
    RemoveSelf() {
        this.IsOpenUI = false;
        this.m_SceneSprite3d.removeSelf();
        this.m_SceneSprite3d.destroy();
    }


}