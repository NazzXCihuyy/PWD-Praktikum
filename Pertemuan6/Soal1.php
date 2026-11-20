<?php
echo "<h3>Bilangan Genap dari 1 sampai 10</h3>";

for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 == 0) {
        echo $i . "<br>";
    }
}
?>