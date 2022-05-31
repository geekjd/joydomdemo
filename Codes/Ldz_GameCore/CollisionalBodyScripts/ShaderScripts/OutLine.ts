const OutLinevertex = `
attribute vec4 a_Position; 
attribute vec3 a_Normal;
uniform mat4 u_MvpMatrix; 
uniform float u_OutlineWidth;

void main()
{
    vec4 position = vec4(a_Position.xyz + a_Normal * u_OutlineWidth, 1.0);
    gl_Position = u_MvpMatrix * position;
}

`

const OutLinefragment = `
#ifdef FSHIGHPRECISION
precision highp float; 
#else 
    precision mediump float; 
#endif 
uniform float u_OutlineLightness; 
uniform vec4 u_OutlineColor;
void main() 
{ 
    vec3 finalColor = u_OutlineColor.rgb * u_OutlineLightness; 
    gl_FragColor = vec4(0,1,0,0); 
}
`;





const vertex = `
#include "Lighting.glsl";
attribute vec4 a_Position; 
attribute vec2 a_Texcoord0; 
uniform mat4 u_MvpMatrix; 
uniform mat4 u_WorldMat; 
attribute vec3 a_Normal; 
varying vec3 v_Normal; 
varying vec2 v_Texcoord0; 
void main() 
{ 
    gl_Position = u_MvpMatrix * a_Position; 
    mat3 worldMat=mat3(u_WorldMat); 
    v_Normal=worldMat*a_Normal; 
    v_Texcoord0 = a_Texcoord0; 
    gl_Position=remapGLPositionZ(gl_Position); 
}
`

const fragment = `
#ifdef FSHIGHPRECISION 
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v_Texcoord0;
varying vec3 v_Normal;
uniform sampler2D u_AlbedoTexture;
void main()
{
    vec4 albedoTextureColor = vec4(1.0);
    albedoTextureColor = texture2D(u_AlbedoTexture, v_Texcoord0);
    gl_FragColor= vec4(1,1,1,1);
}

`

export class OutLine extends Laya.Material {
    static inited = false;
    constructor() {
        super();
        this.InitShader();
        this.setShaderName("OutLine");
    }

    public set MaxRadius(value: number) {
        this._shaderValues.setNumber(Laya.Shader3D.propertyNameToID("u_MaxRadius"), value);
    }

    public set MinRadius(value: number) {
        this._shaderValues.setNumber(Laya.Shader3D.propertyNameToID("u_MinRadius"), value);
    }

    public set Value(value: number) {
        this._shaderValues.setNumber(Laya.Shader3D.propertyNameToID("u_OutlineWidth"), value);
    }

    public set Color(value: Laya.Vector3) {
        this._shaderValues.setVector3(Laya.Shader3D.propertyNameToID("u_OutlineColor"), value);
    }

    InitShader() {
        // if (ExpCircleMaterial.inited) return;
        // ExpCircleMaterial.inited = true;
        // let attributeMap =
        //     {
        //         'a_Position': Laya.VertexMesh.MESH_POSITION0,
        //         'a_Texcoord': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        //     };

        // let uniformMap =
        //     {
        //         'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
        //         'u_Color': Laya.Shader3D.PERIOD_MATERIAL,
        //         'u_MaxRadius': Laya.Shader3D.PERIOD_MATERIAL,
        //         'u_MinRadius': Laya.Shader3D.PERIOD_MATERIAL,
        //         'u_Value': Laya.Shader3D.PERIOD_MATERIAL,
        //     };
        // var customShader: Laya.Shader3D = Laya.Shader3D.add("ExpCircleShader");
        // var subShader: Laya.SubShader = new Laya.SubShader(attributeMap, uniformMap);
        // subShader.addShaderPass(vertex, fragment);
        // customShader.addSubShader(subShader);

        //所有的attributeMap属性
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_Normal': Laya.VertexMesh.MESH_NORMAL0,
            'a_Texcoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };
        //所有的uniform属性
        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
            'u_OutlineWidth': Laya.Shader3D.PERIOD_MATERIAL,
            'u_OutlineLightness': Laya.Shader3D.PERIOD_MATERIAL,
            'u_OutlineColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL
        };
        //注册多Pass描边Shader
        var customShader = Laya.Shader3D.add("OutLine");
        //创建一个subShader
        var subShader = new Laya.SubShader(attributeMap, uniformMap);
        customShader.addSubShader(subShader);
        //添加一个Pass
        var pass1 = subShader.addShaderPass(OutLinevertex, OutLinefragment);
        //设置渲染状态，剔除正面
        pass1.renderState.cull = Laya.RenderState.CULL_FRONT;
        //添加第二个Pass
        subShader.addShaderPass(vertex, fragment);
    }
}




