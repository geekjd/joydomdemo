import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";

export default class ShaderManager {

    public static IsOpenDebug: boolean = false;

    public static StarDeBug() {
        if (!ShaderManager.IsOpenDebug) return;
        Laya.Shader3D.debugMode = true;
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.KKKKKEY_DOWN);
    }
    public static KKKKKEY_DOWN(KEY_DOWN: string) {
        console.log("按键: ", KEY_DOWN);
        let Data = ShaderManager.getShaderData();
        console.log("数据:  ", Data);
    }
    public static getShaderData() {
        let shaderObj = {};
        let arr = new Array();
        for (let i = 0; i < Laya.Shader3D.debugShaderVariantCollection.variantCount; i++) {
            let shadervariant: Laya.ShaderVariant = Laya.Shader3D.debugShaderVariantCollection.getByIndex(i);
            let shaderName: string = shadervariant.shader.name;
            if (!shaderObj[shaderName]) shaderObj[shaderName] = [];
            arr = shaderObj[shaderName];
            let obj: any = {};
            obj.defineNames = shadervariant.defineNames;
            obj.passIndex = shadervariant.passIndex;
            obj.subShaderIndex = shadervariant.subShaderIndex;
            arr.push(obj);
        }
        //console.log("ShaderData: ", shaderObj);
        let json = JSON.stringify(shaderObj);
        console.log("ShaderData: ", json.toString());
        return shaderObj;
    }

    public static compileShader() {
        let _url = EssentialResUrls.NavMeshConfigJsonURL("ShaderConfig");
        ResLoad.Load2D(_url, Laya.Handler.create(this, () => {

            var json: JSON = ResLoad.GetRes(_url, true);
            let shaderData = json;
            console.log(shaderData);
            for (const key in shaderData) {
                const element1 = shaderData[key];
                for (let i = 0; i < element1.length; i++) {
                    const element2 = element1[i];
                    Laya.Shader3D.compileShaderByDefineNames(key, element2.subShaderIndex, element2.passIndex, element2.defineNames);
                }
            }
        }));
    }

}