import { DesktopspeedProxy } from "src/Game/ConfigProxy/DesktopspeedProxy";

export default class Desktopspeed {
    private constructor() { };
    private static _Instance: Desktopspeed;
    public static get Instance(): Desktopspeed {
        if (this._Instance == null) { this._Instance = new Desktopspeed(); this._Instance.InitSpeedInfo(); }
        return Desktopspeed._Instance;
    }
    dic_speed: Map<number, Laya.Vector2> = new Map<number, Laya.Vector2>();
    InitSpeedInfo() {
        let dir;
        let lineArray: string[] = DesktopspeedProxy.instance.GetDesktopspeedData();
        for (let i = 0; i < lineArray.length; i++) {
            let LineString = lineArray[i];
            if (LineString != "") {
                let date: Laya.Vector2 = new Laya.Vector2();
                LineString.split
                let line = LineString.split(',');
                dir = parseInt(line[0]);
                date.x = parseInt(line[1]);
                date.y = parseInt(line[2]);
                this.dic_speed[dir] = date;
            }
        }
    }
    public GetSpeed(_dir: number): Laya.Vector2 {
        return this.dic_speed[_dir];
    }
    public readonly Logic2RenderScale: number = 0.0001;
    public Logic2Render(_value: number): number {
        return _value * this.Logic2RenderScale;
    }
    public ChangeGameVectorToVector3(_vec2: Laya.Vector2, _y: number = 0): Laya.Vector3 {
        return new Laya.Vector3(this.Logic2Render(Math.floor(_vec2.x)), _y, this.Logic2Render(Math.floor(_vec2.y)));
    }

}