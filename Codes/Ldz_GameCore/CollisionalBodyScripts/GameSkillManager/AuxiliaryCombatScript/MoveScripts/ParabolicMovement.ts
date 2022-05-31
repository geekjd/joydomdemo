import LayaUtils from "src/_T/Utils/LayaUtils";
import MoveBase from "./MoveBase";

export default class ParabolicMovement extends MoveBase {
    //重量(高度)
    public g = 150;
    //重力加速度
    private verticalSpeed = 0;
    //方向
    private moveDirection: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    //角度切换速度
    private angleSpeed = 0;
    //角度
    private angle = 0;

    time: number = 0;

    /**初始化数据 */
    InitData(MoveTarget: Laya.Sprite3D, WordPos: Laya.Vector3) {
        this.MoveTarget = MoveTarget;
        this.TargetPos = WordPos;
        this.time = 0;
        this.Isloop = true;
        this.MoveSpeed = 15;

        //获取距离
        let tmepDistance = Laya.Vector3.distance(this.TargetPos, this.MoveTarget.transform.position);
        //console.log("抛物线距离", tmepDistance);
        //this.MoveSpeed = this.MoveSpeed * (tmepDistance / this.MoveSpeed);
        //console.log("抛物线速度", this.MoveSpeed);
        this.g = this.MoveSpeed * tmepDistance * 4 * (1 - tmepDistance / this.MoveSpeed);
        //console.log("抛物线高度", this.g);
        //根据速度得到单位化时间
        let tempTime = tmepDistance / this.MoveSpeed;
        let riseTime, downTime;
        riseTime = downTime = tempTime / 2;
        //得到重力加速度
        this.verticalSpeed = this.g * riseTime;
        //看向目标
        this.MoveTarget.transform.lookAt(this.TargetPos, new Laya.Vector3(0, 1, 0), false);
        let tempTan = this.verticalSpeed / this.MoveSpeed;
        let hu = Math.atan(tempTan);
        this.angle = (180 / Math.PI * hu);
        this.angleSpeed = this.angle / riseTime;
        /**方向 */
        Laya.Vector3.subtract(this.TargetPos, this.MoveTarget.transform.position, this.moveDirection);
    };
    /**更新移动 */
    UpdateMove() {
        if (!this.Isloop) return;
        if (!this.MoveTarget) return;
        if (this.MoveTarget.transform.position.y < 1) {
            this.Isloop = false;
            this.EndMoveFunction && this.EndMoveFunction.run();
            return;
        }

        //获取时间(秒单位)
        let TimeDD = (LayaUtils.deltaTime / 1000);
        this.time += TimeDD;

        //获取重力速度
        let test = this.verticalSpeed - this.g * this.time;

        let forward: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
        let Up: Laya.Vector3 = new Laya.Vector3(0, 1, 0);
        //向前方向单位化
        Laya.Vector3.normalize(this.moveDirection, forward);

        //向前移动的速度
        let TempSpeed: number = this.MoveSpeed * TimeDD;
        //向上移动的速度
        let TempTest: number = test * TimeDD;

        //计算得到距离
        Laya.Vector3.scale(forward, TempSpeed, forward);
        Laya.Vector3.scale(Up, TempTest, Up);

        //移动
        this.MoveTarget.transform.translate(forward, false);
        this.MoveTarget.transform.translate(Up, false);

        //角度
        let testAngle = -this.angle + this.angleSpeed * this.time;
        this.MoveTarget.transform.rotationEuler = new Laya.Vector3(testAngle, this.MoveTarget.transform.rotationEuler.y, this.MoveTarget.transform.rotationEuler.z);
    };
    /**返回方向 */
    BackDir() {
        let Dir = new Laya.Vector3();
        Laya.Vector3.subtract(this.TargetPos, this.MoveTarget.transform.position, Dir);
        Laya.Vector3.normalize(Dir, Dir);
        return Dir;
    }
    /**返回距离 */

    BackDic(): number {
        let LeftPos = new Laya.Vector3();
        let RightPos = new Laya.Vector3();
        this.MoveTarget.transform.position.cloneTo(LeftPos);
        this.TargetPos.cloneTo(RightPos);
        LeftPos.y = 0;
        RightPos.y = 0;
        return Laya.Vector3.distance(LeftPos, RightPos);
    }

}