import LayaUtils from "src/_T/Utils/LayaUtils";
import MoveBase from "./MoveBase";

/**根据方向移动 */
export default class MoveAccordingByDirection extends MoveBase {

    /**初始化数据 */
    InitData(MoveTarget: Laya.Sprite3D, Dir: Laya.Vector3) {
        this.MoveTarget = MoveTarget;
        this.Direction = Dir;
        if (this.MoveTarget == null || this.MoveTarget.parent == null) {
            this.Isloop = false;
            return;
        }
        this.Isloop = true;
        Laya.Vector3.normalize(this.Direction, this.Direction);
    };
    m_OutPos: Laya.Vector3 = new Laya.Vector3();
    Speed: number = 0;
    /**更新移动 */
    UpdateMove() {
        if (!this.Isloop) return;
        this.Speed = this.MoveSpeed * (LayaUtils.deltaTime / 1000); //(Laya.timer.delta / 1000);
        this.Speed = this.Speed > 0.8 ? 0.8 : this.Speed;
        Laya.Vector3.scale(this.Direction, this.Speed, this.m_OutPos);
        Laya.Vector3.add(this.MoveTarget.transform.position, this.m_OutPos, this.MoveTarget.transform.position);
        this.MoveTarget.transform.position = this.MoveTarget.transform.position;
    };

}