import Socket from "./core/net/Socket";
import GameMain from "./Game/GameMain";
import GameConfig from "./GameConfig";
import ShaderManager from "./Ldz_GameCore/ShaderScripts/ShaderManager";
import WhiteScreenT from "./WhiteScreenT";
import TMain from "./_T/TMain";
class Main {
	private _socket: Socket;
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.bgColor = "#000000";
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) {
			Laya.Stat.show(0, 0);
		}
		Laya.alertGlobalError(true);
		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		// var h = new Laya.HttpRequest();
		// h.once(Laya.Event.COMPLETE, this, (e: any) => {
		// 	TipsEnterGam.instance.SDKData = JSON.parse(e);
		// 	console.log('opposdk===>>>>', TipsEnterGam.instance.SDKData);
		// 	this.StartGame();
		// });
		// h.once(Laya.Event.ERROR, this, (e: any) => {

		// })
		// h.send('https://oss-game-res.fengjiangame.com/other_game_data/oppo_ydygc/oppo_ydygc.json');

		this.StartGame();
	}


	public StartGame() {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		//Laya.SoundManager.autoStopMusic = false;
		ShaderManager.StarDeBug();
		/** 正式开始，加载白屏ui #28df99 */
		WhiteScreenT.load().then(() => {
			//框架入口
			new TMain();
			//打开白屏
			WhiteScreenT.open().then(() => {
				//游戏入口
				new GameMain();
			});
		});
	}
}

//激活启动类
new Main();