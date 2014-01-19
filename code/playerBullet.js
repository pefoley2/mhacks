
PlayerBullet = function(position, euler)	{
	var BULLET_SIZE = 2.5;
	
	this.geo = new THREE.CubeGeometry(BULLET_SIZE / 2, BULLET_SIZE / 2, BULLET_SIZE * 2);
	this.mat = new THREE.MeshLambertMaterial({ color: 0xFF8020 });
	this.mesh = new THREE.Mesh(this.geo, this.mat);
	
	this.mesh.position.x = position.x;
	this.mesh.position.y = position.y;
	this.mesh.position.z = position.z;
	this.yaw = euler.y;
	this.pitch = euler.x;
	
	var yawRadians = this.yaw * Math.PI / 180;
	var pitchRadians = this.pitch * Math.PI / 180;
	this.velocity = new THREE.Vector3();
	this.velocity.x = 10 * Math.sin(yawRadians) * 1;//-Math.cos(pitchRadians);
	this.velocity.y = 10 * Math.sin(pitchRadians);
	this.velocity.z = -10 * Math.cos(yawRadians) * 1;//Math.cos(pitchRadians);
	
	this.ray = new THREE.Raycaster();
	this.ray.ray.direction.set( 0, 0, -1 );
	this.ray.near = 0;
	this.ray.far = 20; 
	
	scene.add(this.mesh);
	
	this.update = function ()	{
		this.mesh.position.x += this.velocity.x;
		this.mesh.position.y += this.velocity.y;
		this.mesh.position.z += this.velocity.z;
		
		// check collision	
		var edgePos = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y,
		                                this.mesh.position.z + BULLET_SIZE * 4);
		this.ray.set(edgePos, this.ray.ray.direction);
		
		// check collision with foreground
		if (this.ray.intersectObject(levelMesh, false).length > 0)	{
			this.deleteFlag = true;
		}
		
		// check collision with enemies
		for (var i = 0; i < objArray.length; i++)	{
			if (objArray[i] instanceof Enemy)	{
				var inters = this.ray.intersectObject(objArray[i].mesh, true);
				if (inters.length > 0)	{
					this.deleteFlag = true;
					if (!objArray[i].hurt)	{
						objArray[i].hurt = true;
						objArray[i].hurtCounter = 0;
						
						objArray[i].health--;
					}
				}
			}
		}
		
		//this.mesh.rotation.y += 15 * Math.PI / 180;
		//this.mesh.rotation.z += 15 * Math.PI / 180;
		
		//this.mesh.position.x += 5 * Math.sin((this.yaw + 90) * Math.PI / 180);
		//this.mesh.position.z -= 5 * Math.cos((this.yaw + 90) * Math.PI / 180);
	};
};