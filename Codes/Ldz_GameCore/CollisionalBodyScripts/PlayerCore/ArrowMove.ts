import DamageData from "../MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "../MagicCubeSource/HoneyBeeManager/MagicCubeSource";

export default class ArrowMove extends Laya.Script {
    //重量(高度)
    public g = 100;
    //目标点
    public target: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    //速度
    public speed = 40;
    //重力加速度
    private verticalSpeed = 0;

    //方向
    private moveDirection: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    //角度切换速度
    private angleSpeed = 0;
    //角度
    private angle = 0;

    SelefS3D: Laya.Sprite3D;
    Transform: Laya.Transform3D;
    time: number = 0;

    SelfAtt: Laya.Sprite3D;
    TargetObj: Laya.Sprite3D;
    m_DamageData: DamageData;
    BackFunction: Function = null;

    onAwake() {
        this.SelefS3D = <Laya.Sprite3D>this.owner;
        this.Transform = this.SelefS3D.transform;
    }
    //初始化目标点
    public Init(SelfPos: Laya.Sprite3D, _target: Laya.Sprite3D, TempDamageData: DamageData = null, _BackFunction: Function = null, Speed = 40) {
        this.TargetObj = _target;
        this.SelfAtt = SelfPos;
        this.m_DamageData = TempDamageData;
        this.speed = Speed;
        if (SelfPos == null || _target == null || SelfPos.transform == null || _target.transform == null) {
            this.destroy();
        } else {
            this.Transform.localPosition = new Laya.Vector3(SelfPos.transform.localPosition.x, SelfPos.transform.localPosition.y + 1, SelfPos.transform.localPosition.z);
            this.target = new Laya.Vector3(_target.transform.localPosition.x, _target.transform.localPosition.y + 1, _target.transform.localPosition.z);
        }
        if (_BackFunction == null) {
            this.BackFunction = this.Attacktarget;
        } else {
            this.BackFunction = _BackFunction;
        }
    }

    onStart() {

        //获取距离
        let tmepDistance = Laya.Vector3.distance(this.Transform.localPosition, this.target);
        //根据速度得到单位化时间
        let tempTime = tmepDistance / this.speed;
        let riseTime, downTime;
        riseTime = downTime = tempTime / 2;
        //得到重力加速度
        this.verticalSpeed = this.g * riseTime;
        //看向目标
        this.Transform.lookAt(this.target, new Laya.Vector3(0, 1, 0), false);
        let tempTan = this.verticalSpeed / this.speed;
        let hu = Math.atan(tempTan);
        this.angle = (180 / Math.PI * hu);
        this.angleSpeed = this.angle / riseTime;
        Laya.Vector3.subtract(this.target, this.Transform.localPosition, this.moveDirection);

    }
    onUpdate() {
        if (this.Transform.localPosition.y < 1) {
            //finish
            // console.log("飞跃完成");
            if (this.TargetObj != null && this.SelfAtt != null && !this.TargetObj.destroyed && !this.SelfAtt.destroyed) {
                // console.log("飞跃完成");
                if (this.BackFunction != null) {
                    this.BackFunction(this.Transform.localPosition);
                }
            }
            this.SelefS3D.destroy();
            return;
        }
        //获取时间(秒单位)
        let TimeDD = (Laya.timer.delta / 1000);
        this.time += TimeDD;

        //获取重力速度
        let test = this.verticalSpeed - this.g * this.time;

        let forward: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
        let Up: Laya.Vector3 = new Laya.Vector3(0, 1, 0);
        //向前方向单位化
        Laya.Vector3.normalize(this.moveDirection, forward);

        //向前移动的速度
        let TempSpeed: number = this.speed * TimeDD;
        //向上移动的速度
        let TempTest: number = test * TimeDD;

        //计算得到距离
        Laya.Vector3.scale(forward, TempSpeed, forward);
        Laya.Vector3.scale(Up, TempTest, Up);

        //移动
        this.Transform.translate(forward, false);
        this.Transform.translate(Up, false);

        //角度
        let testAngle = -this.angle + this.angleSpeed * this.time;
        this.Transform.rotationEuler = new Laya.Vector3(testAngle, this.Transform.rotationEuler.y, this.Transform.rotationEuler.z);
    }
    Attacktarget() {
        let _SoldiersBase: MagicCubeSource = this.TargetObj.getComponent(MagicCubeSource);
        let _AttBase: MagicCubeSource = this.SelfAtt.getComponent(MagicCubeSource);
        if (_SoldiersBase != null  && !_SoldiersBase.IsDie  && _AttBase != null) {
            _SoldiersBase.BeAttacked(this.m_DamageData);
        }
    }

}