<?php

namespace YOOtheme;

class RouteCollection implements \IteratorAggregate
{
    /**
     * @var Route[]
     */
    protected $routes = [];

    /**
     * @var Route[]
     */
    protected $index = [];

    /**
     * Adds a route.
     *
     * @param  string|string[] $method
     * @param  string|string[] $path
     * @param  string|callable $handler
     * @return Route
     */
    public function map($method, $path, $handler)
    {
        if (is_array($path)) {
            list($path, $name) = $path;
        }

        $route = new Route($path, $handler, $method);

        if (isset($name)) {
            $route->setName($name);
        }

        if ($this->index) {
            $this->index = [];
        }

        return $this->routes[] = $route;
    }

    /**
     * Adds a GET route.
     *
     * @param  string|string[] $path
     * @param  string|callable $handler
     * @return Route
     */
    public function get($path, $handler)
    {
        return $this->map('GET', $path, $handler);
    }

    /**
     * Adds a POST route.
     *
     * @param  string|string[] $path
     * @param  string|callable $handler
     * @return Route
     */
    public function post($path, $handler)
    {
        return $this->map('POST', $path, $handler);
    }

    /**
     * Adds a PUT route.
     *
     * @param  string|string[] $path
     * @param  string|callable $handler
     * @return Route
     */
    public function put($path, $handler)
    {
        return $this->map('PUT', $path, $handler);
    }

    /**
     * Adds a PATCH route.
     *
     * @param  string|string[] $path
     * @param  string|callable $handler
     * @return Route
     */
    public function patch($path, $handler)
    {
        return $this->map('PATCH', $path, $handler);
    }

    /**
     * Adds a DELETE route.
     *
     * @param  string|string[] $path
     * @param  string|callable $handler
     * @return Route
     */
    public function delete($path, $handler)
    {
        return $this->map('DELETE', $path, $handler);
    }

    /**
     * Adds a HEAD route.
     *
     * @param  string|string[] $path
     * @param  string|callable $handler
     * @return Route
     */
    public function head($path, $handler)
    {
        return $this->map('HEAD', $path, $handler);
    }

    /**
     * Adds a OPTIONS route.
     *
     * @param  string|string[] $path
     * @param  string|callable $handler
     * @return Route
     */
    public function options($path, $handler)
    {
        return $this->map('OPTIONS', $path, $handler);
    }

    /**
     * Adds a group of routes.
     *
     * @param  string   $prefix
     * @param  callable $group
     * @return RouteCollection
     */
    public function group($prefix, callable $group)
    {
        $routes = new static();

        $group($routes);

        return $this->mount($prefix, $routes);
    }

    /**
     * Mounts a route collection.
     *
     * @param  string          $prefix
     * @param  RouteCollection $routes
     * @return self
     */
    public function mount($prefix, RouteCollection $routes)
    {
        $prefix = trim($prefix, '/');

        foreach ($routes as $route) {
            $this->routes[] = $route->setPath($prefix.$route->getPath());
        }

        return $this;
    }

    /**
     * Gets a route by name.
     *
     * @param  string $name
     * @return Route|null
     */
    public function getRoute($name)
    {
        $index = $this->getIndex();

        return isset($index[$name]) ? $index[$name] : null;
    }

    /**
     * Gets an index of routes.
     *
     * @return Route[]
     */
    public function getIndex()
    {
        if (!$this->index) {
            foreach ($this->routes as $index => $route) {
                $this->index[$route->getName() ?: "route{$index}"] = $route;
            }
        }

        return $this->index;
    }

    /**
     * Implements the IteratorAggregate.
     *
     * @return \ArrayIterator
     */
    public function getIterator()
    {
        return new \ArrayIterator($this->routes);
    }
}
