<?php

namespace YOOtheme\Module;

use YOOtheme\Util\Collection;

class ConfigLoader
{
    /**
     * @var array
     */
    protected $values;

    /**
     * Constructor.
     *
     * @param array $values
     */
    public function __construct(array $values = [])
    {
        $this->values = $values;
    }

    /**
     * Loader callback function.
     *
     * @param  array    $options
     * @param  callable $next
     * @return mixed
     */
    public function __invoke($options, $next)
    {
        if (isset($this->values[$options['name']])) {
            $options = array_replace_recursive($options,
                ['config' => $this->values[$options['name']]]
            );
        }

        $module = $next($options);

        if (!isset($module->container['@config'])) {
            $module->container['@config'] = function () use ($module) {
                return new Collection($module->options['config']);
            };
        }

        return $module;
    }
}
