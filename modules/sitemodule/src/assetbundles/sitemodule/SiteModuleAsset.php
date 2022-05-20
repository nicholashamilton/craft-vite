<?php
/**
 * Site Module module for Craft CMS 3.x
 *
 * Module for basic site needs.
 *
 * @link      github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace modules\sitemodule\assetbundles\sitemodule;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * @author    Nicholas Hamilton
 * @package   SiteModule
 * @since     1.0.0
 */
class SiteModuleAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = "@modules/sitemodule/assetbundles/sitemodule/dist";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/SiteModule.js',
        ];

        $this->css = [
            'css/SiteModule.css',
        ];

        parent::init();
    }
}
