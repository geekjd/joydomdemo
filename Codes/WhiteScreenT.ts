import LoadSubpackagesConfig from "./Config/SubpackagesConfig";
import PlatformManager from "./Platform/PlatformManager";
import PlatformT from "./Platform/PlatformT";


/**
 * 白屏工具
 */
export default class WhiteScreenT {
    /** 场景 */
    private static m_scene: Laya.Scene;
    private static m_bg: Laya.Sprite;
    private static m_panNumber: Laya.Text

    /**
     * 加载
     */
    public static load(): Promise<void> {
        return new Promise<void>((r) => {
            Laya.loader.load([
                "initLoad.json",
                'atlas/initLoad.atlas',
                'atlas/initLoad.png',
            ], Laya.Handler.create(this, () => {
                r();
            }));
        });
    }

    /**
     * 打开
     */
    public static open(): Promise<void> {
        return new Promise<void>((r) => {
            //打开白屏ui
            Laya.Scene.open('initLoad.json', null, null, Laya.Handler.create(this, (_scene) => {
                this.m_scene = _scene;
                this.m_bg = this.m_scene.getChildByName('bg') as Laya.Sprite;
                //  this.m_panNumber = this.m_scene.getChildByName('panNumber') as Laya.Text;
                this.updateView();
                //监听屏幕改变事件
                Laya.stage.on(Laya.Event.RESIZE, this, this.updateView);
                console.log('whiteScreen open');

                this.openLater().then(r);
            }));
        });
    }

    /**
     * 打开之后的回调，可以在此加载分包
     */
    private static openLater(): Promise<any> {
        //初始化平台
        PlatformManager.instance.init();
        PlatformManager.instance.initPlatform();

        // return Promise.resolve();
        //加载需要加载的分包  
        return Promise.all(LoadSubpackagesConfig.subpackages.filter((item) => {
            return item.ifLoad;
        }).map((item) => {
            return PlatformT.LoadSubPKG(item.name);
        }));
    }

    /**
     * 
     * @param _n ,
      "subpackages": [
        {
          "name": "res",
          "root": "res/"
        }
      ]
     */
    /**
     * 设置进度
     * @param _n 进度值
     */
    public static setPlan(_n: number) {
        // console.log('设置进度', _n);
        //  this.m_panNumber.text = `% ${Math.floor(_n * 100)}`;
    }

    /**
     * 关闭
     */
    public static close() {
        //删除场景
        this.m_scene && this.m_scene.destroy();
        this.m_scene = null;
        this.m_bg = null;
        //关闭监听事件
        Laya.stage.offAllCaller(this);
    }

    /**
     * 更新视图
     */
    private static updateView() {
        let number = 750 / 1334;
        let number2 = 1334 / 750;
        let _width: number = Laya.stage.height * (number)//Laya.stage.width / 750;
        //  let _height: number = Laya.stage.width * (number2)//Laya.stage.height / 1334;

        //
        this.m_scene.width = _width;
        this.m_scene.height = Laya.stage.height;
        //
        this.m_bg.width = _width;
        this.m_bg.height = Laya.stage.height;

        console.log(this.m_bg.width);
        console.log(this.m_bg.height);

        this.m_bg.pos((Laya.stage.width - this.m_bg.width) / 2, (Laya.stage.height - this.m_bg.height) / 2);
        // this.m_panNumber.width = _width;
        // this.m_panNumber.height = _height;
    }
}