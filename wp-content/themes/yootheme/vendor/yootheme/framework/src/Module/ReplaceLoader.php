<?php

namespace YOOtheme\Module;

use YOOtheme\Util\Filter;

class ReplaceLoader
{
    /**
     * Loader callback function.
     *
     * @param  array    $options
     * @param  callable $next
     * @return mixed
     */
    public function __invoke($options, $next)
    {
        return $next($this->replace($options));
    }

    /**
     * Replaces values in config strings.
     *
     * @param  mixed $value
     * @return mixed
     */
    protected function replace($value)
    {
        if (is_array($value)) {

            foreach ($value as $k => $v) {
                $value[$k] = $this->replace($v);
            }

            return $value;
        }

        return is_string($value) ? Filter::replace($value) : $value;
    }
}
