const makeSVG = require('./svg-gear.js');
const geometry = require('./geometry.js');
const {limits} = require('./limit.js');

function gearPair(d, [a,b], min, max, lfw){
	/*
		r1 + r2 = distance,
		r1/r2 = i;
	*/
	const x = d/(a+b);
	
	const r1 = a*x;
	const r2 = b*x;
	
	let m1 = 2*x;
	
	const [y1, y2] = limits(a, b, m1, min, max, lfw);
	
	let res = []
	for(let y = y1; y<=y2; ++y){
		res.push({
			z1:a*y,
			z2:b*y,
			m:m1/y
		});
	}
	
	return res;
}

//console.table(gearPair(32, [1,2], 8, 40, 2));

let m=2.5;

let z = [8, 16];
let str = z.map((z)=>makeSVG(m, z));
let Ra = z.map((z)=>geometry(m, z).Ra);

let p = Math.max(...Ra) + 10;
let s = Ra[0] + Ra[1] + 10;

let code = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg 
     baseProfile="full"
     xmlns = "http://www.w3.org/2000/svg" 
     xmlns:xlink = "http://www.w3.org/1999/xlink"
     xmlns:ev = "http://www.w3.org/2001/xml-events"
	width="210mm" height="297mm" viewBox="0 0 210 297">
<g style="fill:none; stroke:black; stroke-width:0.4;" >
	<def>
		<g id="crux">
			<line x1="-5" x2="5" />
			<line y1="-5" y2="5" />
		</g>
	</def>
	<g transform="translate(${p},0)">
		<g transform="translate(0,${p})">
			<path d="${str[0]}" />
			<circle r="3" />
			<use href="#crux" />
			<circle cx="${p}" r="3" />
			<use href="#crux" x="${p}"/>
		</g>
		<g transform="translate(0, ${s+p})">
			<path d="${str[1]}" />
			<circle r="3" />
			<use href="#crux" />
			<circle cx="${p}" r="3" />
			<use href="#crux" x="${p}"/>
		</g>
	</g>
	<g transform="translate(${s + 2*p},0) scale(-1, 1)">
		<g transform="translate(0,${p})">
			<path d="${str[0]}" />
			<circle r="3" />
			<use href="#crux" />
			<circle cx="${p}" r="3" />
			<use href="#crux" x="${p}"/>
		</g>
		<g transform="translate(0, ${s+p})">
			<path d="${str[1]}" />
			<circle r="3" />
			<use href="#crux" />
			<circle cx="${p}" r="3" />
			<use href="#crux" x="${p}"/>
		</g>
	</g>
</g>
</svg>`;

require('fs').writeFileSync('out.svg', code);