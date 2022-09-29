
// Criação da primeira constante do vertex shader

const _VS = `
varying vec3 v_Normal;
void main(){
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	v_Normal = normal;
}
`
;

// Criação da primeira constante do fragment Shader

const _FS = `
varying vec3 v_Normal;
void main(){
	gl_FragColor = vec4(v_Normal, 1.0);
}
`
;

// Criação da segunda constante do vertex shader
const _VS2= `
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;

// Criação da primeira constante do fragment Shader
const _FS2 = `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
  `;
