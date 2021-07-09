function start(){
	alert("Bienvenido a mi taller de WebGl <3 - Escrito por Laura Pinila");	
	var pos, $id=function(d){ return document.getElementById(d);};
	
	
	var esfera = new PhiloGL.O3D.Sphere(
		{
			nlat:30,
			nlong:30,
			radius:5,
			textures:['image/fonditu.jpeg'],
			 colors: [1, 1, 1, 1]
			
		}
	);
	
	
PhiloGL('glCanvas',
		{
		camera: {
		position: {x:0, y:0, z:-30}
		},
		
		textures:{
			src:['image/fonditu.jpeg'],
			parameters:[{
				name:'TEXTURE_MAG_FILTER',
				value: 'LINEAR',
			},{
				name:'TEXTURE_MIN_FILTER',
				value: 'LINEAR_MIPMAP_NEAREST',
				generateMipmap:true,
			}]
		},
		events: {
      onDragStart: function(e) {
        pos = {
          x: e.x,
          y: e.y
        };
      },
      onDragMove: function(e) {
        var z = this.camera.position.z,
            sign = Math.abs(z) / z;

        esfera.rotation.y += -(pos.x - e.x) / 100;
        esfera.rotation.x += sign * (pos.y - e.y) / 100;
        esfera.update();
        pos.x = e.x;
        pos.y = e.y;
      },
      onMouseWheel: function(e) {
        e.stop();
        var camera = this.camera;
        camera.position.z += e.wheel;
        camera.update();
      }
    },
	
	
	onLoad: function(app){
		
		var gl= app.gl,
			program = app.program,
			scene = app.scene,
			canvas = app.canvas,
			camera = app.camera;
			alfa=0;
	
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.viewport(0,0, +canvas.width, +canvas.height);
	
		esfera.update();
		scene.add(esfera);
		draw();
		
		function draw(){
			
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPHT_BUFFER_BIT);
			
			//agrego rotacion
			if (rotacion.checked) {
				alfa += 0.01;
				esfera.rotation.set(alfa / 100, alfa, 0);
				esfera.update();
			}
			//agrego luz azul = el color + hermoso del mundo
			var lights = scene.config.lights;
          lights.enable = luz.checked;
          lights.ambient = {
            r: 0.1,
            g: 0.8,
            b: 0.8,
          };
			
			scene.render();
			
			PhiloGL.Fx.requestAnimationFrame(draw);
		}
		
		
	}
	
	
} );
}