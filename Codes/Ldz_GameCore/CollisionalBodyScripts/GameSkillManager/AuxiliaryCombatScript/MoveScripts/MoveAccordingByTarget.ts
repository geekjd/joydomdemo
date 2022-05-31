import LayaUtils from "src/_T/Utils/LayaUtils";
import TimeUtils from "src/_T/Utils/TimeUtils";
import MoveBase from "./MoveBase";

/**根据目标移动 */
export default class MoveAccordingByTarget extends MoveBase {

    /**初始化数据 */
    InitData(MoveTarget: Laya.Sprite3D, TargetObj: Laya.Sprite3D) {
        this.MoveTarget = null;
        this.TargetObj = null;
        this.MoveTarget = MoveTarget;
        this.TargetObj = TargetObj;
        this.CurrentFrame = 0;
        this.Isloop = true;
        if (this.MoveTarget == null || this.MoveTarget.parent == null) {
            this.Isloop = false;
            return;
        }
        if (this.TargetObj == null || this.TargetObj.parent == null) {
            this.MoveTarget.destroy();
            this.Isloop = false;
            return;
        }
        this.Direction = this.BackDir();
    };
    /**更新移动 */
    UpdateMove() {
        if (!this.Isloop) return;
        if (!this.MoveTarget) return;
        if (this.TargetObj == null || this.TargetObj.destroyed) {
            this.MoveTarget.destroy();
            return;
        }
        if (this.CurrentFrame == 0) {
            this.StarMoveFunction && this.StarMoveFunction.run();
        }
        if (this.TargetObj != null) {
            if (this.TargetObj == null || this.TargetObj.parent == null) {
                this.MoveTarget.destroy();
                this.Isloop = false;
                return;
            }
            if (this.MoveTarget == null || this.MoveTarget.parent == null) {
                this.Isloop = false;
                return;
            }
            this.Direction = this.BackDir();
            let Dic: number = this.BackDic();
            if (Dic <= 0.5) {
                this.Isloop = false;
                this.EndMoveFunction && this.EndMoveFunction.runWith([this.TargetObj]);
                return;
            }
        } else {
            /**移动一段时间后消除 */
            //this.Isloop = false;
        }


        this.Speed = this.MoveSpeed * (LayaUtils.deltaTime / 1000);// (Laya.timer.delta / 1000);
        this.Speed = this.Speed > 0.8 ? 0.8 : this.Speed;
        // console.log("飞行中的监视速度", this.Speed);
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
        this.CurrentFrame++;
    };
    Speed: number = 0;
    m_OutPos: Laya.Vector3 = new Laya.Vector3();

    m_Dir: Laya.Vector3 = new Laya.Vector3();
    /**返回方向 */
    BackDir() {
        Laya.Vector3.subtract(this.TargetObj.transform.position, this.MoveTarget.transform.position, this.m_Dir);
        Laya.Vector3.normalize(this.m_Dir, this.m_Dir);
        return this.m_Dir;
    }
    LeftPos: Laya.Vector3 = new Laya.Vector3();
    RightPos: Laya.Vector3 = new Laya.Vector3();
    /**返回距离 */
    BackDic(): number {
        this.MoveTarget.transform.position.cloneTo(this.LeftPos);
        this.TargetObj.transform.position.cloneTo(this.RightPos);
        this.LeftPos.y = 0;
        this.RightPos.y = 0;
        return Laya.Vector3.distance(this.LeftPos, this.RightPos);
    }

}