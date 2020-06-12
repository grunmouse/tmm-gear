	/**
	 * Поворот точки xy на угол a
	 */
	function rotate(xy, a){
		return [
			xy[0]*Math.cos(a) - xy[1]*Math.sin(a),
			xy[0]*Math.sin(a) + xy[1]*Math.cos(a)
		];
	}
	
module.exports = rotate;