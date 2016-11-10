<?php
$start=time();

for($i=0,$sum=0;$i<100000000;$i++){
	$sum+=1;
}

$end=time();

echo $end-$start;