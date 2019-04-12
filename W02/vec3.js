Vec3 = function( x, y, z )
{
this.x = x;
this.y = y;
this.z = z;
}
Vec3.prototype.xget = function()
{
	return this.x;
}

Vec3.prototype.yget = function()
{
	return this.y;
}

Vec3.prototype.zget = function()
{
	return this.z;
}


Vec3.prototype.add = function( v )
{
this.x += v.x;
this.y += v.y;
this.z += v.z;
return this;
}
// Sum method
Vec3.prototype.sum = function()
{
return this.x + this.y + this.z;
}
//max function
Vec3.prototype.max =function()
{
	if(v.x > v.y && v.x > v.z){
	return v.x;
	}
	if(v.y > v.x && v.y > v.z){
	return v.y;
	}
	if(v.z > v.x && v.z > v.y){
	return v.z;
	}
}
//mid function
Vec3.prototype.mid =function()
{
	if((v.x > v.y && v.x < v.z) || (v.x < v.y && v.x > v.z)){
	return v.x;
	}
	if((v.y > v.x && v.y < v.z) || (v.y < v.x && v.y > v.z)){
	return v.y;
	}
	if((v.z > v.x && v.z < v.y) || (v.z < v.x && v.z > v.y)){
	return v.z;
	}
}
//min function
Vec3.prototype.min =function()
{
	if(v.x < v.y && v.x < v.z){
	return v.x;
	}
	if(v.y < v.x && v.y < v.z){
	return v.y;
	}
	if(v.z < v.x && v.z < v.y){
	return v.z;
	}
}