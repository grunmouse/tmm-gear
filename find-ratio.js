function Farey(n){
	var a=0, b=1, c=1, d=n;
	var res = [[a,b]];
	var p, q;
	while(c<=n){
		res.push([c,d]);
		k = Math.floor((n+b)/d);
		p = k*c - a;
		q = k*d - b;
		a = c; b = d;
		c = p; d = q;
	}
	return res;
}

//Ищет в списке F ближайшее к value значение
/**
 * @param F : {Array<Number>}
 * @param value : {Number}
 * @return {Integer} - индекс найденного значения
 */
function find(F, value){
	var n = 0, p = F.length-1, i = Math.floor(p/2);
	while(p-n>1){
		if(F[i]>value){
			p=i;
		}
		else if(F[i]<value){
			n = i;
		}
		else if(F[i] === value){
			return i;
		}
		i = n + Math.floor((p-n)/2);
	}
	if(Math.abs(F[n]-value) <= Math.abs(F[p]-value)){
		return n
	}
	else{
		return p;
	}
	return n;
}

/**
 * Ищет Фареево число для передаточного отношения, с верхним ограничением на число зубьев колеса
 * @param i : {Number} - передаточное число <1 (если больше - нужно обратить)
 */
function findRatio(i, max){
	if(i>1){
		let [a,b] = findZPair(1/i, max);
		return [b,a];
	}
	else{
		let F = Farey(max);
		let index = find(F.map(([a,b])=>(a/b)), i);
		return F[index];
	}
}

module.exports = findRatio;