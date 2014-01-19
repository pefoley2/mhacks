
Enemy = function(position)	{
	var SIZE = 20;
	
	this.GRAVITY = 0.6;
	
	this.ray = new THREE.Raycaster();
	this.ray.ray.direction.set( 0, -1, 0 );
	this.ray.near = 0.1;
	this.ray.far = 20;
	
	this.geo = new THREE.OctahedronGeometry(SIZE);
	this.mat = new THREE.MeshLambertMaterial({ color: 0xA00000 });
	this.mesh = new THREE.Mesh(this.geo, this.mat);
	
	this.hurtMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
	
	this.mesh.position.x = position.x;
	this.mesh.position.y = position.y + 2;
	this.mesh.position.z = position.z;
	
	this.initialPos = this.mesh.position.x;
	this.wanderCounter = 0;
	
	this.health = 4;
	this.hurt = false;
	this.hurtCounter = 0;
	
	this.numBounces = 0;
	this.bounceTarget = 6;
	
	this.velocity = new THREE.Vector3();

	scene.add(this.mesh);
	
	this.update = function ()	{
		this.mesh.rotation.y += 20 * Math.PI / 180;
		
		this.velocity.y -= this.GRAVITY;
		
		// vertical collision
		if (this.velocity.y <= 0)	{
			var projectedPos = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y - this.velocity.y,
			                                     this.mesh.position.z);
		
			this.ray.set(projectedPos, new THREE.Vector3(0, -1, 0));
			inters = this.ray.intersectObject(levelMesh, false);
			if (inters.length > 0)	{
				this.numBounces++;
				
				if (this.numBounces == this.bounceTarget)	{
					this.numBounces = -1;
					this.velocity.y = 6;
				} else	{
					//if (this.numBounces == 0)	{
					
					//}
					
					this.velocity.y = 2;
				}
				
				this.mesh.position.y += (20 - inters[0].distance);
			}
		}
		
		this.mesh.position.x = this.initialPos + Math.sin(this.wanderCounter * Math.PI / 180) * 4;
		this.wanderCounter += 15;
		
		if (this.hurt)	{
			this.hurtCounter++;
			
			this.mesh.rotation.z += (360 / 24 * 1) * Math.PI / 180;
			this.mesh.rotation.x += (360 / 24 * 1) * Math.PI / 180;
			
			if (this.hurtCounter % 6 >= 3)	{
				this.mat.color.set(0xFFFFFF);
			} else	{
				this.mat.color.set(0xA00000);
			}
			
			if (this.hurtCounter == 24)	{
				this.hurt = false;
				this.hurtCounter = 0;
			}
		}
		
		this.mesh.position.y += this.velocity.y;
	};
};