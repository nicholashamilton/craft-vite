<?php
/**
 * Site Module module for Craft CMS 3.x
 *
 * Module for basic site needs.
 *
 * @link      github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace modules\sitemodule\variables;

use modules\sitemodule\SiteModule;

use Craft;

/**
 * @author    Nicholas Hamilton
 * @package   SiteModule
 * @since     1.0.0
 */
class SiteModuleVariable
{
    public function getCachedMainCSS() {
        $cssFilePaths = glob(CRAFT_BASE_PATH . "/public/dist/assets/*.css");

        foreach ($cssFilePaths as $cssPath) {
            if (str_contains($cssPath, "styles.")) {
                $cssHref =  "/dist/assets/" . basename($cssPath);

                return "
                    <link rel='preload' href='$cssHref' as='style'>
                    <link rel='stylesheet' href='$cssHref'>
                ";
            }
        }

        return "";
    }
}
