import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
export default class EnemyManager {
    public static readonly instance: EnemyManager;

    public constructor() {
    }
}