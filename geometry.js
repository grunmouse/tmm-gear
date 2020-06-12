const {sin, cos, PI} = Math;


	var m=10, z=18;

function geometry(m, z){

		var d = m*z, //Диаметр окружности зацепления
			/* При условии прямых зубьев и нулевых смещений */
			Da = d + 2*1*m, //Диаметр вершин
			Df = d - 2 * 1.25 * m, //Диаметр впадин
			r = d/2, //Радиус зацепления
			Ra = Da/2,
			Rf = Df/2;

		var Rb = r * cos(PI/9); //Базовая окружность эвольвенты

		//var x = Math.sqrt(r**2 - Rb**2); //длина натянутой части нитки
		var a = Math.tan(PI/9); //Угол, который занимала нитка x когда была намотана
		
		var sa = PI/9-Math.tan(PI/9);//Угловое уширение зуба (угол между точкой зацепления и началом эвольвенты)
		
		var zwa = PI/z - 2*sa; //угловая ширина основания зубца.
		
		var fwa = PI/z + 2*sa; //угловая ширина впадины
		
		var fwl = Rf*fwa; //линейная ширина впадины
		
	return {
		r,
		Ra,
		Rf,
		Rb,
		sa,
		zwa,
		fwa,
		fwl
	};
}

module.exports = geometry;