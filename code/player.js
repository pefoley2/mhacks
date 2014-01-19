/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Based on THREE.PointerLockControls by mrdoob.
 * @author benvanik
 */

var moveObject;
 
PlayerCharacter = function(camera)	{
	moveObject = new THREE.Object3D();
	moveObject.position.y = 0;
	moveObject.add( camera );

	this.moveForward = false;
	this.moveLeft = false;
	this.moveRight = false;

	var canJump = false;
	var canFire = true;

	this.velocity = new THREE.Vector3();

	var PI_2 = Math.PI / 2;

	this.MOVE_SPEED = 3;
	this.GRAVITY = 0.3;
	this.jumpSpeed = 5;
	
	this.ray = new THREE.Raycaster();
	this.ray.ray.direction.set( 0, -1, 0 );
	this.ray.near = 0.1;
	this.ray.far = 20;

	//*
	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 87: // w
				moveForward = true;
				break;
			case 65: // a
				moveLeft = true;
				break;
			case 83: // s
				moveBackward = true;
				break;
			case 68: // d
				moveRight = true;
				break;
			case 81: // q
				if ( canJump === true ) this.velocity.y += this.jumpSpeed;
				canJump = false;
				break;
			case 69: // e
				if (canFire == true)	{
					var dir = new THREE.Vector3(0, angleYaw + (Math.random() * 5) - 2.5, 0);
					
					objArray.push(new PlayerBullet(camera.position, dir));
					canFire = false;
					
					this.velocity.z = -0.5;
				}
		}

	}.bind(this);

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {
			case 87: // w
				moveForward = false;
				break;
			case 65: // a
				moveLeft = false;
				break;
			case 83: // s
				moveBackward = false;
				break;
			case 68: // d
				moveRight = false;
				break;
			case 69: // e
				canFire = true;
				break;
		}

	};

	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
//*/

	this.enabled = false;

	this.getObject = function () {

		return moveObject;

	};

	this.isOnObject = function ( boolean ) {
		isOnObject = boolean;
		canJump = boolean;
	};

	this.update = function ( angle, vrstate ) {
		if ( this.moveForward ) this.velocity.z += this.MOVE_SPEED;
		if ( this.moveBackward ) this.velocity.z -= this.MOVE_SPEED;
		if ( this.moveLeft ) this.velocity.x -= this.MOVE_SPEED;
		if ( this.moveRight ) this.velocity.x += this.MOVE_SPEED;
		
		if (mode == "Shoot")	{
			if (canFire == true)	{
				var dir = new THREE.Vector3(0, angleYaw + (Math.random() * 5) - 2.5, 0);
					
				objArray.push(new PlayerBullet(camera.position, dir));
				this.velocity.z = -0.5;
				
				canFire = false;
				setTimeout(function(){ canFire = true }, 300);
			}
		}
		
		if (up)	{
			if ( canJump === true ) this.velocity.y += this.jumpSpeed;
			canJump = false;
		}
		
		// lower limit to velocity
		if (Math.abs(this.velocity.x) < 0.01) this.velocity.x = 0;
		if (Math.abs(this.velocity.z) < 0.01) this.velocity.z = 0;
		
		// gravity
		this.velocity.y -= this.GRAVITY;
		
		var inters;

		// vertical collision
		if (this.velocity.y <= 0)	{
			var projectedPos = new THREE.Vector3(camera.position.x, camera.position.y - this.velocity.y, camera.position.z);
		
			this.ray.set(projectedPos, new THREE.Vector3(0, -1, 0));
			inters = this.ray.intersectObject(levelMesh, false);
			if (inters.length > 0)	{
				this.velocity.y = 0;
				camera.position.y += (20 - inters[0].distance);
				canJump = true;
			} else	{
				canJump = false;
			}
		}
		
		// horizontal collision is handles slightly below the camera
		var horizCollPos = new THREE.Vector3(camera.position.x, camera.position.y - 5, camera.position.z);
		
		// horizontal collision (X axis)
		this.ray.set(horizCollPos, new THREE.Vector3((this.velocity.x > 0) ? 1 : -1, 0, 0));
		inters = this.ray.intersectObject(levelMesh, false);
		if (inters.length > 0)	{
			this.velocity.x = 0;
		}

		// horizontal collision (Z axis)
		this.ray.set(horizCollPos, new THREE.Vector3(0, 0, (this.velocity.z > 0) ? -1 : 1));
		inters = this.ray.intersectObject(levelMesh, false);
		if (inters.length > 0)	{
			this.velocity.z = 0;
		}

		
		
		
		// forward movement
		camera.position.x += this.velocity.z * Math.sin(angleYaw * Math.PI / 180);
		camera.position.z -= this.velocity.z * Math.cos(angleYaw * Math.PI / 180);
		
		// lateral movement
		camera.position.x += this.velocity.x * Math.sin((angleYaw + 90) * Math.PI / 180);
		camera.position.z -= this.velocity.x * Math.cos((angleYaw + 90) * Math.PI / 180);
		
		// vertical movement
		camera.position.y += this.velocity.y;

		// deceleration
		this.velocity.x += ( -this.velocity.x ) * 0.8;
		this.velocity.z += ( -this.velocity.z ) * 0.8;
		
		
		// death
		if (camera.position.y < -100 + 15)	{
			restartLevelFlag = true;
		}
	};

};
