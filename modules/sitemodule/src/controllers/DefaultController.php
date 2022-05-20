<?php
/**
 * Site Module module for Craft CMS 3.x
 *
 * Module for basic site needs.
 *
 * @link      github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace modules\sitemodule\controllers;

use modules\sitemodule\SiteModule;

use Craft;
use craft\web\Controller;

/**
 * @author    Nicholas Hamilton
 * @package   SiteModule
 * @since     1.0.0
 */
class DefaultController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = ['index', 'do-something'];

    // Public Methods
    // =========================================================================

    /**
     * @return mixed
     */
    public function actionIndex()
    {
        $result = 'Welcome to the DefaultController actionIndex() method';

        return $result;
    }

    /**
     * @return mixed
     */
    public function actionDoSomething()
    {
        $result = 'Welcome to the DefaultController actionDoSomething() method';

        return $result;
    }
}
