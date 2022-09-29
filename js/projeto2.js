
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

//Criando oo círculo
const circuloGeometry = new THREE.SphereGeometry( 5, 32, 20 );
const circuloMaterial = new THREE.ShaderMaterial( {

	uniforms: {},

	vertexShader: _VS,

	fragmentShader: _FS

} );
const circulo = new THREE.Mesh( circuloGeometry, circuloMaterial );
scene.add( circulo );

// Criação do retângulo
const retanguloGeometry = new THREE.BoxGeometry( 1, 2, 1 );
const retanguloMaterial = new THREE.ShaderMaterial( {

	uniforms: {colorA: {type: 'vec3', value: new THREE.Color(0xFFC300)},
               colorB: {type: 'vec3', value: new THREE.Color(0xC70039)}
            },

	vertexShader: _VS2,

	fragmentShader: _FS2

} );
const retangulo = new THREE.Mesh( retanguloGeometry, retanguloMaterial );
scene.add( retangulo );

// Translação do objeto
circulo.translateX(23);
torusKnot.translateX(30);
retangulo.translateX(60);

// Escala do objeto
circulo.scale.set(2, 2, 2);
torusKnot.scale.set(1, 1, 1);
retangulo.scale.set(9, 9, 9);


// rotação do objeto
circulo.rotation.set(0, 1, 1);
torusKnot.rotation.set(0, 1, 1);
retangulo.rotation.set(1, 1, 0);


// Função que move o objeto para cima

function moveObjectUp(obj) {
	obj.position.y += 0.8;	

	if (obj.position.y >= 40) {
		obj.position.y = obj.position.y - 35;
	}
}

// Função que move o objeto em sua direção
function moveObjectFoward(obj) {
	obj.position.z += 0.8;

	if (obj.position.z >= 40) {
		obj.position.z = obj.position.y - 35;
	}
}



// Função de animação do objeto
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	moveObjectUp(circulo);
	moveObjectFoward(torusKnot);
	moveObjectFoward(retangulo);
}
animate();