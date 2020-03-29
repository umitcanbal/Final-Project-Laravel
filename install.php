<?php

// $exclude works only on the first level, that's fine for this script
function deleteFilesThenSelf($folder, $exclude) {
    $iterator = new DirectoryIterator($folder);

    foreach ($iterator as $f) {
        if ($f->isDot())
            continue; // skip . and ..

        if ($f->isFile()) {
            if (in_array($exclude, $f->getFilename()))
                continue;

            unlink($f->getPathname());
        } elseif ($f->isDir()) {
            deleteFilesThenSelf($f->getPathname(), $exclude);
        }
    }

    rmdir($folder);
}

// First remove all files except the release archive
deleteFilesThenSelf(realpath(__DIR__ . '/..'), ['release.tar.gz']);

try {
    $p = new PharData(__DIR__ . '/release.tar.gz');
    $p->decompress();

    $p = new PharData(__DIR__ . '/release.tar');
    $p->extractTo(__DIR__);
} catch (Exception $e) {
    echo "Failed to unzip file: {$e.message}";
}

echo "Installation completed";
