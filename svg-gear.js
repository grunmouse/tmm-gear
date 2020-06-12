var Pi = Math.PI,
	sin = Math.sin,
	cos = Math.cos;


const rotate = require('./rotate.js');
const coord = require('./evolventa.js');
const geometry = require('./geometry.js');

	function writePoint(xy){
		return xy.map((x)=>(x.toFixed(1))).join(',');
	}
	
	function polyline(points){
		return points.map(writePoint).join(' L ')
	}
	
	/**
	 * @param m : Number - модуль зуба 
	 * @param z : Number - число зубов
	 * @param mask : String - маска неполнозубости
	 * @return {string} - path зубчатого колеса
	 */
	function Gear(m, z, mask){

		const {
			r, Ra, Rf, Rb,
			sa, zwa
		} = geometry(m, z);
		
		var points = [], i=0, dr = (Ra-Rb)/8, ir = Rb;
		points.push([0, Rf]);	//Прямой участок
		//Эвольвентный участок
		for(;Rb+dr*i<r;++i){
			points.push(coord(Rb+dr*i, Rb));
		}
		points.push(coord(r, Rb));
		for(;i<=8;++i){
			points.push(coord(Rb+dr*i, Rb));
		}
		
		var	pointsL = points.map((xy)=>(rotate([-xy[0],xy[1]], zwa+sa))).reverse();	//Вторая половина зуба
		points = points.map((xy)=>(rotate(xy, sa)));
		//Дуги окружностей колеса
		var Arge = " A "+Ra+','+Ra + ' 0 0,1 ';
		var Argi = " A "+Rf+','+Rf + ' 0 0,1 ';
		
		var startPoint = writePoint(rotate([0, Rf], sa));
		var pathD = 'M ';
		if(!mask || mask[0]=='1'){
			pathD += polyline(points) + Arge + polyline(pointsL);
		}
		else{
			pathD += startPoint;
		}
		pathD += Argi;
		for(i=1; i<z; ++i){
			if(!mask || mask[i]=='1'){
				pathD += polyline(points.map((xy)=>(rotate(xy, 2*Pi/z*i)))) + Arge + polyline(pointsL.map((xy)=>(rotate(xy, 2*Pi/z*i))));
			}
			else{
				pathD += writePoint(rotate([0, Rf], 2*Pi/z*i));
			}
			pathD += Argi;
		}
		pathD += startPoint + ' Z';

		return pathD;
	}
	
module.exports = Gear;
