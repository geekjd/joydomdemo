import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
export default class LayerManager {
    public static readonly instance: LayerManager;

    public constructor() {
    }
}