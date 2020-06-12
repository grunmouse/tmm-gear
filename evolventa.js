const rotate = require('./rotate.js');

	/**
	 * Расчёт точки эвольвенты в системе координат, в которой ось проходит через точку её начала
	 * @param ro - радиус точки
	 * @param Rb - радиус базовой окружности
	 */
	function coord(ro, Rb){
		var x = Math.sqrt(ro**2 - Rb**2); //длина натянутой части нитки
		var y = Rb;
		var a = x/Rb; //Угол, который занимала нитка x когда была намотана
		return rotate([x,y], a); //Поворот точки на угол a равносилен повороту осей на угол -a
	}
	
module.exports = coord;