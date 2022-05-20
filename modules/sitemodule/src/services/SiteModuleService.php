<?php
/**
 * Site Module module for Craft CMS 3.x
 *
 * Module for basic site needs.
 *
 * @link      github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace modules\sitemodule\services;

use modules\sitemodule\SiteModule;

use Craft;
use craft\base\Component;

/**
 * @author    Nicholas Hamilton
 * @package   SiteModule
 * @since     1.0.0
 */
class SiteModuleService extends Component
{
    // Public Methods
    // =========================================================================

    /*
     * @return mixed
     */
    public function exampleService()
    {
        $result = 'something';

        return $result;
    }
}
