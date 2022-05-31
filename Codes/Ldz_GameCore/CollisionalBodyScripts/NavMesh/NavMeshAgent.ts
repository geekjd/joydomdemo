import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";

export default class NavMeshAgent {
	_velocity: any;
	navMeshGroup: any;
	updateRotation: boolean;
	_pathPending: boolean;
	_path: Laya.Vector3[];
	_pathp: number;
	_pathlen: number;
	_remainingDistance: number;
	destination: any;
	speed: number;
	steeringTarget: Laya.Vector3;
	out: Laya.Vector3;
	gameobj: Laya.Sprite3D;
	enabled: boolean;
	CheckObj: boolean = false;
	navMeshGroupName: string = 'game';
	maxSpeed: number = 1;

	targetPos: Laya.Vector3 = new Laya.Vector3();
	StarPOs: Laya.Vector3 = new Laya.Vector3();
	LowFps: boolean;
	Up: Laya.Vector3 = new Laya.Vector3(0, 1, 0);

	LastMovePos: Laya.Vector3 = new Laya.Vector3(0, 0, 0);


	ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
	hitResult = new Laya.HitResult();
	Dir = new Laya.Vector3();

	CTTime: number = 0;
	CtTimeCheckMax: number = 0.2;

	sp = new Laya.Sprite3D();
	constructor(_gameobj: Laya.Sprite3D) {
		this.navMeshGroup = null;
		this.enabled = false;
		this.updateRotation = false;
		this._pathPending = false;
		//路线进行中
		this._path = null;
		this._pathp = 0;
		this._pathlen = 0;
		this._remainingDistance = 0;
		this.destination = null;
		this.speed = 0.1;
		this.steeringTarget = new Laya.Vector3();
		this._velocity = new Laya.Vector3();
		this.out = new Laya.Vector3();
		this.gameobj = _gameobj;
		this.path = [];
		this.LowFps = false;
		Laya.stage.addChild(this.sp);

		Laya.stage.addChild(this.pl);

	}
	Init(Index: number = 0) {
		switch (Index) {
			case 1:
				return;
			case 2:
				this.navMeshGroupName = "Hunting";
				break;
			case 3:
				this.navMeshGroupName = "Cooperation";
				break;
			case 4:
				this.navMeshGroupName = "Existence";
				break;
			case 5:
				this.navMeshGroupName = "Sports";
				break;
		}
		this.navMeshGroup = NevMesh.getGroup(this.navMeshGroupName, this.gameobj.transform.position);
	}
	FindPath(targetPos: Laya.Vector3) {
		if (this.navMeshGroup == null) return;
		if (this.IsSwche == false) { return; }
		targetPos.cloneTo(this.targetPos);
		this.gameobj.transform.position.cloneTo(this.StarPOs);
		this.StarPOs.y = 0
		this.targetPos.y = 0;
		let calculatedPath = NevMesh.findPath(this.StarPOs, this.targetPos, this.navMeshGroupName, this.navMeshGroup);
		if (calculatedPath && calculatedPath.length && this.navMeshGroupName != "Existence") {
			var debugPath = (calculatedPath);
			var p: Laya.Vector3[] = [];
			for (var i = 0; i < debugPath.length; i++) {
				//console.log(debugPath[i].x, debugPath[i].y, debugPath[i].z);
				p.push(new Laya.Vector3(debugPath[i].x, debugPath[i].y + .1, debugPath[i].z));
			}
			if (p.length > 3) {
				if (this.StarPOs) {
					this.path.push(this.StarPOs);
					this.path = [...p]; //[this.StarPOs].concat(p);
					this.Optimizationpath();
					this.enabled = true;
				} else {
					this.path = [];
					this.enabled = false;
				}
			} else {
				this.path.push(this.StarPOs);
				this.path.push(this.targetPos);
				this.enabled = true;
			}

		}
		else {
			this.path.push(this.StarPOs);
			this.path.push(this.targetPos);
			this.enabled = true;
			//this.path = [];
			//this.enabled = false;
		}
	}
	Optimizationpath() {
		//console.log(this.path);
		for (let i = 0; i < this.path.length - 1; i++) {
			let Temp1 = Math.floor(Laya.Vector3.scalarLengthSquared(this.path[i]));
			let Temp2 = Math.floor(Laya.Vector3.scalarLengthSquared(this.path[i + 1]));
			// console.log("Temp1", Temp1);
			// console.log("Temp2", Temp2);
			if (Temp1 == Temp2) {
				this.path.splice(i, 1);
			}
		}
		//console.log(this.path);
	}
	now: Laya.Vector3;
	pl = new Laya.PixelLineSprite3D();
	IsSwche: boolean = true;

	GetRayLayer(Layer: number = 0) {
		this.gameobj.transform.getForward(this.Dir);
		this.ray.origin = this.gameobj.transform.position;
		Laya.Vector3.scale(this.Dir, -1, this.Dir);
		this.ray.direction = this.Dir;

		if (GlobalD3Environment.Scene3D.physicsSimulation.rayCast(this.ray, this.hitResult, 0.4)) {

			if (this.hitResult.collider.owner != null) {

				//this.hitResult.collider.owner.getComponent(MagicCubeSource) != null || this.hitResult.collider.owner.getComponent(MagicCubeSource)

				if ((this.hitResult.collider.owner as Laya.Sprite3D).layer == Layer) {

					return true;
				} else {

				}
			}
		}
		return false;
	}

	LastPos: Laya.Vector3 = new Laya.Vector3();
	COunt: number = 0;
	Update() {
		if (this.enabled) {

			if (this._path) {

				if (this.navMeshGroupName == "Hunting") {
					if (this.GetRayLayer()) {

						this.speed = this.LowFps ? 0.15 : 0.08;
						let Right: Laya.Vector3 = new Laya.Vector3();
						this.gameobj.transform.getRight(Right);
						Laya.Vector3.normalize(Right, Right);
						Laya.Vector3.scale(Right, this.speed, Right);
						Laya.Vector3.add(this.gameobj.transform.position, Right, this.steeringTarget);
						this.steeringTarget.y = 0;
						this.gameobj.transform.position = this.gameobj.transform.position;
						// this.gameobj.transform.lookAt(this.steeringTarget, this.Up, false);
						// this.gameobj.transform.localRotationEulerY += 180;
						// this.gameobj.transform.localRotationEulerX = 0;
						// this.gameobj.transform.localRotationEulerZ = 0;
						this.gameobj.transform.position.y = 0;
						this.gameobj.transform.position = this.steeringTarget.clone(); // this.gameobj.transform.position;
						this.gameobj.transform.translate(Right, false);
						//this.enabled = false;
						this.CheckObj = true;
						this.IsSwche = false;
						return console.log("前方有碰撞物");
					} else {
						this.IsSwche = true;
						this.CheckObj = false;
					}
				}

				//var tp = null;
				if (this._path.length > 0) {
					this.now = this.gameobj.transform.position;
					let TempX = Math.floor(this.gameobj.transform.position.x);
					let TempZ = Math.floor(this.gameobj.transform.position.z);
					let TempXX = Math.floor(this.LastPos.x);
					let TempZZ = Math.floor(this.LastPos.z);

					if (TempX == TempXX && TempZ == TempZZ) {
						this.COunt += (Laya.timer.delta / 1000);
						if (this.COunt > 2) {
							console.log("原地踏步");
							this.enabled = false;
							this.COunt = 0;
						}
					} else {
						this.COunt = 0;
						this.gameobj.transform.position.cloneTo(this.LastPos);
					}

					this.speed = this.LowFps ? 0.15 : 0.08;
					var v = new Laya.Vector3;
					var p0 = this._path[0];
					//tp = now.clone();
					p0.cloneTo(this.steeringTarget);
					//tp.y = 0;
					this.steeringTarget.y = 0;
					let Temp1 = Math.floor(Laya.Vector3.scalarLengthSquared(this.now));
					let Temp2 = Math.floor(Laya.Vector3.scalarLengthSquared(p0));
					var tlen = Math.abs(Temp1 - Temp2); //Laya.Vector3.distance(now, p0);
					//console.log(tlen);
					if (tlen <= 3) {
						this._path.shift();
					} else {
						Laya.Vector3.subtract(p0, this.now, v);
						Laya.Vector3.normalize(v, v);
						Laya.Vector3.scale(v, this.speed, v);
						v.y = 0;
						this.gameobj.transform.lookAt(this.steeringTarget, this.Up, false);
						//console.log(this.gameobj.transform.localRotationEulerY);
						this.gameobj.transform.localRotationEulerY += 180;
						this.gameobj.transform.localRotationEulerX = 0;
						this.gameobj.transform.localRotationEulerZ = 0;
						this.gameobj.transform.position.y = 0;
						this.gameobj.transform.position = this.gameobj.transform.position;
						this.gameobj.transform.translate(v, false);
					}
					// let LastLen = Math.floor(Laya.Vector3.scalarLengthSquared(this.LastMovePos));
					// let CurLen = Math.floor(Laya.Vector3.scalarLengthSquared(now));
					// if (LastLen - CurLen == 0) {
					// 	this.CTTime += LayaUtils.deltaTime;
					// } else {
					// 	this.CTTime = 0;
					// }
					// if (this.CTTime >= this.CtTimeCheckMax) {
					// 	this.SetStopMove();
					// }
					// this.gameobj.transform.position.cloneTo(this.LastMovePos);
				} else {
					let TempLen = Laya.Vector3.distanceSquared(this.targetPos, this.gameobj.transform.position);
					if (TempLen < 3) {
						this.enabled = false;
					}
				}
			} else {
				this.enabled = false;
				this.gameobj.transform.position.y = 0;
				this.gameobj.transform.position = this.gameobj.transform.position;
			}
		} else {
			this.gameobj.transform.position.y = 0;
			this.gameobj.transform.position = this.gameobj.transform.position;
		}
	}

	// onUpdate() {
	// 	if (this.enabled) {
	// 		var now = this.gameobj.transform.position;
	// 		if (this._path) {
	// 			var v = new Laya.Vector3;
	// 			var tp = null;
	// 			for (var i = this._pathp; i < this._path.length - 1; i++) {
	// 				var p0 = this._path[i];
	// 				var p1 = this._path[i + 1];
	// 				this._pathlen = this._pathlen + this.speed / 60;
	// 				var tlen = Laya.Vector3.distance(p0, p1);
	// 				if (this._pathlen > tlen) {
	// 					this._pathlen -= tlen;
	// 					this._pathp++;
	// 				} else {
	// 					tp = p0.clone();
	// 					p1.cloneTo(this.steeringTarget);
	// 					Laya.Vector3.subtract(p1, p0, v);
	// 					Laya.Vector3.normalize(v, v);
	// 					Laya.Vector3.scale(v, this._pathlen, v);
	// 					Laya.Vector3.add(p0, v, tp);
	// 					break;
	// 				}
	// 			}
	// 			if (tp == null) {
	// 				this._pathPending = false;
	// 				tp = this._path[this._path.length - 1];
	// 				this._path[this._path.length - 1].cloneTo(this.steeringTarget);
	// 			}
	// 			this.gameobj.transform.position = tp;
	// 		} else {
	// 			this.out.x = now.x + this.velocity.x * Laya.timer.delta / 1000;
	// 			this.out.y = now.y + this.velocity.y * Laya.timer.delta / 1000;
	// 			this.out.z = now.z + this.velocity.z * Laya.timer.delta / 1000;
	// 			if (this.navMeshGroup == null) {
	// 				this.out.cloneTo(now);
	// 				this.gameobj.transform.position = now;
	// 			}
	// 		}
	// 	}
	// }
	SetStopMove() {
		this._path = [];
		this.enabled = false;
	}

	get remainingDistance() {
		if (this.destination && this.gameobj) {
			return Laya.Vector3.distance(this.destination, this.gameobj.transform.position);
		}
		return this._remainingDistance;
	}
	set remainingDistance(value) {
		this._remainingDistance = value;
	}

	get velocity() {
		return this._velocity;
	}
	set velocity(value) {
		this._velocity = value;
		this.destination = null;
	}

	get path() {
		return this._path;
	}
	set path(value) {
		this._path = value;
		if (value) {
			this._pathPending = true;
		} else {
			this._pathPending = false;
		}
		this._pathp = 0;
		this._pathlen = 0;
	}
}