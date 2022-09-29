
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

  // Criação da cena
const scene = new THREE.Scene();
// Criação da câmera
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000);
// Posicionamento da camera
camera.position.z = 60;

// Renderização
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Colocando background de estrelinhas
const loader = new THREE.TextureLoader();
loader.load('https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg' , function(texture)
            {
             scene.background = texture;  
            });

// Adicionando luz à cena
const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( -20, 15, 50 );
scene.add( light );


// Criando o nó de torus
const torusKnotGeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const torusKnotMaterial = new THREE.MeshPhongMaterial( { color: 0xC70039  } );
const torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMaterial );
torusKnot.rotation.set(0.3, 2.9, 0);
scene.add( torusKnot );
