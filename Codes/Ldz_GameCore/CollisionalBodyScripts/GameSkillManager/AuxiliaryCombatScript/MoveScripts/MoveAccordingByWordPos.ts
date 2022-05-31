import LayaUtils from "src/_T/Utils/LayaUtils";
import MoveBase from "./MoveBase";

/**根据方向移动 */
export default class MoveAccordingByWordPos extends MoveBase {

    /**初始化数据 */
    InitData(MoveTarget: Laya.Sprite3D, WordPos: Laya.Vector3) {
        this.MoveTarget = MoveTarget;
        this.TargetPos = WordPos;
        if (this.MoveTarget == null || this.MoveTarget.parent == null) {
            this.Isloop = false;
            return;
        }
        this.Direction = this.BackDir();
        Laya.Vector3.normalize(this.Direction, this.Direction);
        this.Isloop = true;
    };
    /**更新移动 */
    UpdateMove() {
        if (!this.Isloop) return;
        if (!this.MoveTarget) return;
        let Dic: number = this.BackDic();
        if (Dic < 1) {
            this.Isloop = false;
            this.EndMoveFunction && this.EndMoveFunction.run();
            return;
        }

        this.Speed = this.MoveSpeed * (LayaUtils.deltaTime / 1000);//(Laya.timer.delta / 1000);
        this.Speed = this.Speed > 0.8 ? 0.8 : this.Speed;
        Laya.Vector3.scale(this.Direction, this.Speed, this.m_OutPos);
        Laya.Vector3.add(this.MoveTarget.transform.position, this.m_OutPos, this.m_OutPos);
        this.MoveTarget.transform.position = this.MoveTarget.transform.position;
        this.m_OutPos.y = 0.8;
        if (this.IsLookAt) {
            this.MoveTarget.transform.lookAt(this.m_OutPos, new Laya.Vector3(0, 1, 0));
            this.MoveTarget.transform.localRotationEulerY += 180;
        }
        this.m_OutPos.cloneTo(this.MoveTarget.transform.position);
        this.MoveTarget.transform.position = this.MoveTarget.transform.position;

    };
    Speed: number = 0;
    m_OutPos: Laya.Vector3 = new Laya.Vector3();
    m_Dir: Laya.Vector3 = new Laya.Vector3();
    /**返回方向 */
    BackDir() {
        Laya.Vector3.subtract(this.TargetPos, this.MoveTarget.transform.position, this.m_Dir);
        Laya.Vector3.normalize(this.m_Dir, this.m_Dir);
        return this.m_Dir;
    }
    /**返回距离 */
    LeftPos: Laya.Vector3 = new Laya.Vector3();
    RightPos: Laya.Vector3 = new Laya.Vector3();
    BackDic(): number {
        this.MoveTarget.transform.position.cloneTo(this.LeftPos);
        this.TargetPos.cloneTo(this.RightPos);
        this.LeftPos.y = 0;
        this.RightPos.y = 0;
        return Laya.Vector3.distance(this.LeftPos, this.RightPos);
    }

}