const {PI, sqrt, floor, ceil} = Math;


function zSize(lfw, a, m){
	const sa = PI/9-Math.tan(PI/9);
	
	const A = -5*PI/a; //<0
	const B = PI - 5*sa; //>0
	const C = a*sa - lfw/m; //<0
	
	const D = B**2 - 4*A*C;
	
	
	if(D>0){
		let ba = -B/2/A; //>0
		let da = sqrt(D)/2/A; //<0
		

		
		let x = [ba+da, ba-da];
		
		let [y1, y2] = x.map((x)=>(0.5/x));
		
		return [ceil(y2), floor(y1)];
	}
	else{
		throw new Error('Nothing roots');
	}
	
}

function zCount(a, b, min, max){
	if(a>b){
		return multipler(b, a, min, max);
	}
	else{
		return [
			Math.ceil(min/a),
			Math.floor(max/b)
		];
	}
}

/**
 * Вычисляет ограничения на множитель числа зубов для пары с заданным передаточным отношением
 */
function limits(a, b, m, min, max, lfw){
	const cond = [
		zCount(a, b, min, max),
		zSize(lfw, a, m),
		zSize(lfw, b, m)
	];
	
	return [
		Math.max(...cond.map((a)=>(a[0]))),
		Math.min(...cond.map((a)=>(a[1])))
	];
}


module.exports = {
	zSize,
	zCount,
	limits
};