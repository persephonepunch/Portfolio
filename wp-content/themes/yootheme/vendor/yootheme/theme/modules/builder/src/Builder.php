<?php

namespace YOOtheme\Theme;

use YOOtheme\Util\Collection;

class Builder
{
    /**
     * @var Collection
     */
    protected $types;

    /**
     * @var \SplStack
     */
    protected $renderer;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->types = new Collection();
        $this->renderer = new \SplStack();
        $this->renderer->push([$this, 'doRender']);
    }

    /**
     * Gets all element types.
     *
     * @return Collection
     */
    public function all()
    {
        return $this->types;
    }

    /**
     * Gets an element type.
     *
     * @return Collection
     */
    public function get($name)
    {
        return $this->types[$name];
    }

    /**
     * Adds an element type.
     *
     * @param  string $name
     * @param  array  $type
     * @return self
     */
    public function add($name, $type)
    {
        $this->types[$name] = new Collection($type);

        return $this;
    }

    /**
     * Removes an element type.
     *
     * @param  string $name
     * @return self
     */
    public function remove($name)
    {
        unset($this->types[$name]);

        return $this;
    }

    /**
     * Loads an element.
     *
     * @param  Collection|array|string $element
     * @return BuilderElement
     */
    public function load($element)
    {
        if (is_string($element)) {
            $element = json_decode($element, true);
        } elseif ($element instanceof Collection) {
            $element = $element->all();
        }

        return is_array($element) ? new BuilderElement($element) : null;
    }

    /**
     * Converts elements to content.
     *
     * @param  string|array $element
     * @return string
     */
    public function content($element)
    {
        $renderer = function ($element, $type, $next) {

            if ($content = $element['content']) {
                $content = "<p>{$content}</p>\n\n";
            }

            return $content ?: $next($element, $type);
        };

        return (new self)->addRenderer($renderer)->render($element);
    }

    /**
     * Encodes an element to JSON.
     *
     * @param  string|array $element
     * @return string
     */
    public function encode($element)
    {
        if ($element = $this->load($element)) {
            return json_encode($element);
        }

        return '';
    }

    /**
     * Renders an element.
     *
     * @param  string|array $element
     * @return string
     */
    public function render($element)
    {
        if (!$element instanceof BuilderElement) {
            $element = $this->load($element);
        }

        return $element ? call_user_func($this->renderer->top(), $element, $this->get($element->type) ?: new Collection()) : '';
    }

    /**
     * Applies an element render callback.
     *
     * @param  BuilderElement $element
     * @param  Collection     $type
     * @return string
     */
    public function doRender(BuilderElement $element, Collection $type)
    {
        $reducer = function ($carry, $child) {
            return $carry.$this->render($child);
        };

        if (count($element)) {
            $element->content = array_reduce($element->children, $reducer, '');
        }

        return $type['render'] ? call_user_func($type['render'], $element) : (string) $element;
    }

    /**
     * Adds a renderer to stack.
     *
     * @param  callable $renderer
     * @return self
     */
    public function addRenderer(callable $renderer)
    {
        $next = $this->renderer->top();

        $this->renderer->push(function (BuilderElement $element, Collection $type) use ($renderer, $next) {
            return $renderer($element, $type, $next);
        });

        return $this;
    }
}
