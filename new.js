function eval_bf(bf)
{
	var sizeMemory = 1000;
	var bit = 0xFF;
	var memory = [];
	var i = sizeMemory;
	while(i--) memory[i] = 0;
	var l = bf.length;
	var countOffset = (sizeMemory / 2) & 0xFFFFFFFF;
	var push = [];
	var pushI = 0;
	
	for(var a=[],b={},c=0;!(c&256);)a[c]=String.fromCharCode(0==c?0:191<c?c+848:127<c?[1026,1027,8218,1107,8222,8230,8224,8225,8364,8240,1033,8249,1034,1036,1035,1039,1106,8216,8217,8220,8221,8226,8211,8212,152,8482,1113,8250,1114,1116,1115,1119,160,1038,1118,1032,164,1168,166,167,1025,169,1028,171,172,173,174,1031,176,177,1030,1110,1169,181,182,183,1105,8470,1108,187,1112,1029,1109,1111][c-128]:c),b[a[c]]=c++;
	
	var fnc = 0;
	var position = 0;
	function run(key)
	{
		if(key != null)
		{
			window.removeEventListener('keydown', fnc);
			i = position;
			memory[countOffset] = key;
		}
		while(i < l)
		{
			switch(bf.charAt(i++))
			{
				case '+':
					memory[countOffset] = (memory[countOffset] + 1) & bit;
				break;
				case '-':
					memory[countOffset] = (memory[countOffset] - 1) & bit;
				break;
				case '.':
					document.write(a[memory[countOffset]]);
				break;
				case ',':
					position = i;
					i = l;
					fnc = function(){run(event.keyCode);}
					window.addEventListener('keydown', fnc);
				break;
				case '[':
					push[pushI++] = i;
				break;
				case ']':
					if(memory[countOffset]) i = push[pushI - 1];
					else --pushI;
				break;
				case '>':
					++countOffset;
				break;
				case '<':
					--countOffset;
				break;
			}
		}
	}
	run(null);
}
eval_bf('>++++++[-<,.>]');
