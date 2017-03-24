<?php

namespace YOOtheme\Theme;

use YOOtheme\Util\Collection;

class BuilderElement implements \ArrayAccess, \Countable, \IteratorAggregate, \JsonSerializable
{
    /**
     * @var string
     */
    public $name = '';

    /**
     * @var string
     */
    public $type = '';

    /**
     * @var string
     */
    public $content = '';

    /**
     * @var array
     */
    public $props = [];

    /**
     * @var array
     */
    public $children = [];

    /**
     * @var integer
     */
    public $index = 0;

    /**
     * @var BuilderElement
     */
    public $parent;

    /**
     * Constructor.
     *
     * @param array $options
     */
    public function __construct(array $options)
    {
        // TODO: temp config fix
        if (isset($options['config'])) {
            $options['props'] = $options['config'];
        }

        extract(array_replace(get_object_vars($this), $options));

        $this->name = $name;
        $this->type = $type;
        $this->index = $index;
        $this->parent = $parent;
        $this->addProps($props);
        $this->addChildren($children);
    }

    /**
     * Handles dynamic calls.
     *
     * @param  string $name
     * @param  array  $args
     * @return mixed
     */
    public function __call($name, $args)
    {
        if (!method_exists($this->props, $name)) {
            trigger_error(sprintf('Call to undefined method %s::%s()', get_class($this->props), $name), E_USER_ERROR);
        }

        return call_user_func_array([$this->props, $name], $args);
    }

    /**
     * Adds the properties.
     *
     * @param  array $props
     * @return self
     */
    public function addProps(array $props)
    {
        $this->props = (new Collection($props))->merge($this->props);

        return $this;
    }

    /**
     * Adds the children.
     *
     * @param  array $children
     * @return self
     */
    public function addChildren(array $children)
    {
        foreach ($children as $child) {

            if (!is_array($child)) {
                continue;
            }

            $this->children[] = new self(array_replace($child, [
                'index' => count($this->children),
                'parent' => $this,
            ]));
        }

        return $this;
    }

    /**
     * Counts the children.
     *
     * @return int
     */
    public function count()
    {
        return count($this->children);
    }

    /**
     * Find a parent and its property.
     *
     * @param  string $type
     * @param  bool   $property
     * @return $this|mixed
     */
    public function parent($type, $property = false)
    {
        if ($this->type === $type) {
            if ($property) {
                return $this->offsetGet($property);
            }

            return $this;
        }

        return $this->parent ? $this->parent->parent($type, $property) : false;
    }

    /**
     * Checks if an offset exists.
     *
     * @param  string $key
     * @return bool
     */
    public function offsetExists($key)
    {
        return $this->props->offsetExists($key);
    }

    /**
     * Gets an value.
     *
     * @param  string $key
     * @return mixed
     */
    public function offsetGet($key)
    {
        return $this->props->offsetGet($key);
    }

    /**
     * Sets an value.
     *
     * @param string $key
     * @param mixed  $value
     */
    public function offsetSet($key, $value)
    {
        $this->props->offsetSet($key, $value);
    }

    /**
     * Removes an value.
     *
     * @param string $key
     */
    public function offsetUnset($key)
    {
        return $this->props->offsetUnset($key);
    }

    /**
     * Gets an iterator.
     *
     * @return \ArrayIterator
     */
    public function getIterator()
    {
        return new \ArrayIterator($this->children);
    }

    /**
     * Gets the data as JSON.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        $data = [
            'name' => $this->name,
            'type' => $this->type,
        ];

        if (count($this->props)) {
            $data['props'] = $this->props;
        }

        if (count($this->children)) {
            $data['children'] = $this->children;
        }

        return $data;
    }

    /**
     * Gets the content.
     *
     * @return string
     */
    public function __toString()
    {
        return $this->content ?: $this->props->get('content', '');
    }
}
