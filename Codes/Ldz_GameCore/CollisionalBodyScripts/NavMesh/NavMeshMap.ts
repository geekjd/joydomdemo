import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import NavMeshAgent from "./NavMeshAgent";
/**
*
* @ author:Carson
* @ email:976627526@qq.com
* @ data: 2019-11-17 12:50
*/
export default class NavMeshMap {
	navUrl: string;
	agent: Array<NavMeshAgent>;
	ZoneName: string;
	Isloding: boolean = false;
	//targetPos: any;
	// AddAgent(Agent: NavMeshAgent) {
	// 	//Agent.navMeshGroup = NevMesh.getGroup('game', this.player.transform.position);
	// 	this.agent.push(Agent);
	// }
	CreatorNavMesh(Index: number) {

		switch (Index) {
			case 1:
				return;
			case 2:
				this.navUrl = EssentialResUrls.NavMeshConfigJsonURL("Hunting");
				this.ZoneName = "Hunting";
				break;
			case 3:
				this.navUrl = EssentialResUrls.NavMeshConfigJsonURL("Cooperation");
				this.ZoneName = "Cooperation";
				break;
			case 4:
				this.navUrl = EssentialResUrls.NavMeshConfigJsonURL("Existence");
				this.ZoneName = "Existence";
				break;
			case 5:
				this.navUrl = EssentialResUrls.NavMeshConfigJsonURL("Sports");
				this.ZoneName = "Sports";
				break;
		}
		this.agent = new Array<NavMeshAgent>();
		this.Isloding = true;
		Laya.loader.load(this.navUrl, Laya.Handler.create(this, this.onNavLoaded), null, "json");
	}
	onNavLoaded() {
		var json = Laya.loader.getRes(this.navUrl);
		//let ObjNevMesh:NevMesh.Astar=new NevMesh.Astar();
		console.log(json);
		let zoneNodes = NevMesh.buildNodesByJson(json);
		NevMesh.setZoneData(this.ZoneName, zoneNodes);
		this.Isloding = false;
		//this.playerNavMeshGroup = NevMesh.getGroup('game', this.player.transform.position);
		//Laya.stage.on("click", this, this.onClick);
	}

	// onClick() {
	// 	//将屏幕坐标转化为射线
	// 	this.camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY), this.ray);
	// 	if (this.physicsSimulation.rayCast(this.ray, this.hitResult)) {
	// 		console.log("000");
	// 		this.targetPos = this.hitResult.point;
	// 		let calculatedPath = NevMesh.findPath(this.player.transform.position, this.targetPos, 'game', this.playerNavMeshGroup);
	// 		if (calculatedPath && calculatedPath.length) {
	// 			var debugPath = (calculatedPath);
	// 			console.log("start", this.player.transform.position.x, this.player.transform.position.y, this.player.transform.position.z);
	// 			var p = [];
	// 			for (var i = 0; i < debugPath.length; i++) {
	// 				console.log(debugPath[i].x, debugPath[i].y, debugPath[i].z);
	// 				p.push(new Laya.Vector3(debugPath[i].x, debugPath[i].y + .1, debugPath[i].z));
	// 			}
	// 			this.agent.path = [this.player.transform.position].concat(p);
	// 			this.agent.enabled = true;
	// 			console.log("end", this.targetPos.x, this.targetPos.y, this.targetPos.z);
	// 		}
	// 		else {
	// 			this.agent.enabled = false;
	// 		}
	// 	}
	// }
}