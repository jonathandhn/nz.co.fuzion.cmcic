<?php
use Rector\Config\RectorConfig;
use Rector\ValueObject\PhpVersion;
use Rector\Php71\Rector\List_\ListToArrayDestructRector;
use Rector\Php80\Rector\Catch_\RemoveUnusedVariableInCatchRector;

return RectorConfig::configure()
  ->withPhpVersion(PhpVersion::PHP_85)
  ->withPaths([
    __DIR__ . '/CRM',
    __DIR__ . '/Civi',
    __DIR__ . '/cmcic.php',
  ])
  ->withRules([
    ListToArrayDestructRector::class,
    RemoveUnusedVariableInCatchRector::class,
  ]);
