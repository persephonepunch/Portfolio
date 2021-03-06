<?php

namespace YOOtheme;

use YOOtheme\Util\MethodTrait;
use YOOtheme\Util\Str;

class View implements \ArrayAccess
{
    use MethodTrait {
        hasMethod as hasFunction;
        defineMethod as addFunction;
    }

    /**
     * @var \SplStack
     */
    protected $loader;

    /**
     * @var array
     */
    protected $template = [];

    /**
     * @var array
     */
    protected $parameters = [];

    /**
     * @var array
     */
    protected $globals = [];

    /**
     * @var array
     */
    protected $helpers = [];

    /**
     * Constructor.
     *
     * @param callable $loader
     */
    public function __construct(callable $loader = null)
    {
        $this->loader = new \SplStack();
        $this->loader->push([$this, 'evaluate']);

        if ($loader) {
            $this->addLoader($loader);
        }

        $this->addFunction('e', [$this, 'escape']);
    }

    /**
     * Gets the global parameters.
     *
     * @return array
     */
    public function getGlobals()
    {
        return $this->globals;
    }

    /**
     * Adds a global parameter.
     *
     * @param  string $name
     * @param  mixed  $value
     * @return self
     */
    public function addGlobal($name, $value)
    {
        $this->globals[$name] = $value;

        return $this;
    }

    /**
     * Adds a helper.
     *
     * @param  string|callable $helper
     * @return self
     */
    public function addHelper($helper)
    {
        if (is_callable($helper)) {
            $helper($this);
        } elseif (class_exists($helper)) {
            new $helper($this);
        }

        return $this;
    }

    /**
     * Adds a loader callback.
     *
     * @param  callable $loader
     * @param  string   $filter
     * @return self
     */
    public function addLoader(callable $loader, $filter = null)
    {
        $next = $this->loader->top();

        $this->loader->push(function ($name, array $parameters = []) use ($loader, $filter, $next) {

            if ($filter && !Str::is($filter, $name)) {
                return $next($name, $parameters);
            }

            return $loader($name, $parameters, $next);
        });

        return $this;
    }

    /**
     * Applies multiple functions.
     *
     * @param  mixed  $value
     * @param  string $functions
     * @return string
     */
    public function apply($value, $functions)
    {
        $functions = explode('|', strtolower($functions));

        return array_reduce($functions, function ($value, $function) {
            return call_user_func([$this, $function], $value);
        }, $value);
    }

    /**
     * Converts special characters to HTML entities.
     *
     * @param  string $value
     * @param  string $functions
     * @return string
     */
    public function escape($value, $functions = '')
    {
        if ($functions) {
            $value = $this->apply($value, $functions);
        }

        return htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
    }

    /**
     * Renders a template.
     *
     * @param  string $name
     * @param  mixed  $parameters
     * @return string|false
     */
    public function render($name, $parameters = [])
    {
        if (is_callable($parameters)) {
            return function () use ($name, $parameters) {
                return $this->render($name, call_user_func_array($parameters, func_get_args()) ?: []);
            };
        }

        $load = $this->loader->top();

        return $load($name, array_replace(end($this->parameters) ?: $this->globals, $parameters));
    }

    /**
     * Renders current template.
     *
     * @param  mixed  $parameters
     * @return string|false
     */
    public function self($parameters = [])
    {
        return $this->render(end($this->template), $parameters);
    }

    /**
     * Evaluates a template.
     *
     * @param  string $template
     * @param  array  $parameters
     * @return string|false
     */
    public function evaluate($template, array $parameters = [])
    {
        $this->template[] = $template;
        $this->parameters[] = $parameters;

        unset($template, $parameters);
        extract(end($this->parameters), EXTR_SKIP);

        if (is_file(end($this->template))) {

            ob_start();
            require end($this->template);

            $result = preg_replace('/^[ \t]*[\r\n]+/m', '', ob_get_clean());
        }

        array_pop($this->template);
        array_pop($this->parameters);

        return isset($result) ? $result : false;
    }

    /**
     * Checks if a helper is registered.
     *
     * @param  string $name
     * @return bool
     */
    public function offsetExists($name)
    {
        return isset($this->helpers[$name]);
    }

    /**
     * Gets a helper.
     *
     * @param  string $name
     * @return mixed
     */
    public function offsetGet($name)
    {
        if (!$this->offsetExists($name)) {
            throw new \InvalidArgumentException(sprintf('Undefined helper "%s"', $name));
        }

        return $this->helpers[$name];
    }

    /**
     * Sets a helper.
     *
     * @param string $name
     * @param object $helper
     */
    public function offsetSet($name, $helper)
    {
        $this->helpers[$name] = $helper;
    }

    /**
     * Removes a helper.
     *
     * @param string $name
     */
    public function offsetUnset($name)
    {
        throw new \LogicException(sprintf('You can\'t remove a helper "%s"', $name));
    }
}
