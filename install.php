<?php

$www = realpath(__DIR__ . '/..');
$public = __DIR__;
$releaseZip = realpath($www . '/release.zip');

echo "WWW path is $www<br/>";
echo "public path is $public<br/>";
echo "archive path is $releaseZip<br/>";

function deleteFiles($folder, $removeSelf, $releaseZip) {
    $iterator = new DirectoryIterator($folder);

    echo "Clearing $folder<br/>";

    foreach ($iterator as $f) {
        $filePath = $f->getPathname();

        if ($f->isDot() || $filePath === $releaseZip)
            continue; // skip . and ..

        if ($f->isFile()) {
            echo "TEST: $filePath === $releaseZip<br/>";
            echo "Removing file {$filePath}<br />";

            unlink($filePath);
        } elseif ($f->isDir()) {
            deleteFiles($f->getPathname(), true, $releaseZip);
        }
    }

    if ($removeSelf) {
        rmdir($folder);
    }
}

// First remove all files except the release archive
deleteFiles($www, false, $releaseZip);

$zip = new ZipArchive;
$res = $zip->open($releaseZip);

if ($res === true) {
	$zip->extractTo($www);
	$zip->close();

	unlink($releaseZip);
} else {
	throw new Error('Cannot open archive: ' . $res);
}

echo "Installation completed";
