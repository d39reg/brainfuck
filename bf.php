<?php
	
	$bf = '++++++++[>++++++<-]++++++++++[>.+<-]';
	
	function eval_bf($bf)
	{
		$sizeMemory = 1000;
		$bit = 0xFF;
		$i = $sizeMemory;
		$memory = [];
		while(--$i) $memory[$i] = 0;
		$len = strlen($bf);
		$countOffset = (int)($sizeMemory / 2);
		
		$push = [];
		$pushI = 0;
		
		while($i < $len)
		{
			switch($bf[$i++])
			{
				case '+':
					$memory[$countOffset] = ($memory[$countOffset] + 1) & $bit;
				break;
				case '-':
					$memory[$countOffset] = ($memory[$countOffset] - 1) & $bit;
				break;
				case '.':
					echo chr($memory[$countOffset]);
				break;
				case ',':
					
				break;
				case '[':
					$push[$pushI++] = $i;
				break;
				case ']':
					if($memory[$countOffset]) $i = $push[$pushI - 1];
					else --$pushI;
				break;
				case '>':
					++$countOffset;
				break;
				case '<':
					--$countOffset;
				break;
			}
		}
	}
	
	eval_bf($bf);
  
  ?>
