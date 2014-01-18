function loadTexture(filename)	{
	var texture = THREE.ImageUtils.loadTexture(filename);
	texture.magFilter = THREE.LinearFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	return texture;
}

function createCube(scene, texFilename, size)	{
	var cubeTex = loadTexture(texFilename);
	var cubeGeo = new THREE.CubeGeometry(size, size, size);
	var cubeMat = new THREE.MeshLambertMaterial({ map: cubeTex, ambient: 0xffffff });
	var cube = new THREE.Mesh(cubeGeo, cubeMat);
	
	scene.add(cube);
	
	return cube;
}



function createWaterPlane(scene)	{
	var ret = new Array();
	
	waterTex = loadTexture('./tex/water.jpg');
	waterTex.wrapS = waterTex.wrapT = THREE.RepeatWrapping;
	waterTex.repeat.set( 10, 10 );
	ret[0] = waterTex;
		
	var planeGeo = new THREE.PlaneGeometry(5000, 5000);
	ret[1] = planeGeo;
	
	var planeMat = new THREE.MeshLambertMaterial({ map: waterTex, ambient: 0xffffff });
	planeMat.side = THREE.DoubleSide;
	
	var plane = new THREE.Mesh(planeGeo, planeMat);
	plane.position.x = 0;
	plane.position.y = -100;
	plane.rotation.x = 90 * Math.PI / 180;
	
	scene.add(plane);
	
	return ret;
}

function createSkybox(scene)	{
	var urlPrefix = "./tex/skybox/";
	var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
	             urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
	             urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
	var textureCube = THREE.ImageUtils.loadTextureCube( urls );
			
			
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( urls[i] ),
			side: THREE.DoubleSide
		}));
	var skyMat = new THREE.MeshFaceMaterial( materialArray );
	var skyGeo = new THREE.CubeGeometry(2000, 2000, 2000);
	var skybox = new THREE.Mesh( skyGeo, skyMat );
	scene.add(skybox);
	
	return skybox;
}


function createLevelMesh(level, camera, scene)	{
	var geometry = new THREE.Geometry();
	
	var UNIT_LEN = 75;
	var UNIT_HGT = 75;
	
	var cubeTex = loadTexture('./tex/checkerboard.jpg');
	//var cubeMat = new THREE.MeshLambertMaterial({ map: cubeTex, ambient: 0xffffff });
	var basicMat = new THREE.MeshBasicMaterial();
	
	var rows = level.length;
	var cols = level[0].length;
	
	var meshOut = level.length * UNIT_LEN;
	
	for (var j = 0; j < rows; j++)	{
		for (var i = 0; i < cols; i++)	{
			var c = level[j].charAt(i);
			var pX = i * UNIT_LEN;
			var pZ = j * UNIT_LEN;
			
			var blkHeight;
			if (c == 'P')	{
				blkHeight = 0;
			} else	{
				blkHeight = parseInt(c) - 1;
			}
			
			var height = 25 + (blkHeight * UNIT_HGT);
			var cubeGeo = new THREE.CubeGeometry(UNIT_LEN, height, UNIT_LEN);
			var cubeMesh = new THREE.Mesh(cubeGeo, basicMat);
			
			if (c != '-')	{
				cubeMesh.position.x = pX;
				cubeMesh.position.y = 0;
				cubeMesh.position.z = pZ;
				THREE.GeometryUtils.merge( geometry, cubeMesh );
			}
			
			if (c == 'P')	{
				camera.position.x = pX;
				camera.position.y = 30;
				camera.position.z = pZ;
			}
		}
	}
	
	var cubeMat = new THREE.MeshLambertMaterial({ map: cubeTex, ambient: 0xffffff });
	var levMesh = new THREE.Mesh(geometry, cubeMat);
	scene.add(levMesh);
	return levMesh;
}






