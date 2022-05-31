import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";

export default class RoleManage {
    constructor(parameters) {

    }
    /**角色列表 */
    Map_Role: Map<number, MagicCubeSource>;
    /**初始化信息 */
    InitData() {
        this.CreatRole();
    }

    /**创建角色 */
    CreatRole() {

    }
    /**根据ID获取玩家信息 */
    GetRoleFromBattleID(ID: number): MagicCubeSource {
        return this.Map_Role.get(ID);
    }

    /**更新玩家操作 */
    Logic_Operation() {

    }

}