<?php

?>
<!DOCTYPE html>
<html>
<head>
    <title>Tabel Perkalian</title>
</head>
<body>
<table border="1" >
    <tr>
        <td bgcolor="white">bilangan</td>
        <?php for ($j = 1; $j <= 10; $j++) { ?>
            <td bgcolor="lime"><?php echo $j; ?></td>
        <?php } ?>
    </tr>

    <?php for ($i = 1; $i <= 10; $i++) { ?>
    <tr>
        <td bgcolor="lime"><?php echo $i; ?></td>
        <?php
        for ($j = 1; $j <= 10; $j++) {
            $hasil = $i * $j;
            $warna = ($hasil % 2 == 0) ? "cyan" : "yellow";
            echo "<td bgcolor='$warna'>$hasil</td>";
        }
        ?>
    </tr>
    <?php } ?>
</table>
</body>
</html>
