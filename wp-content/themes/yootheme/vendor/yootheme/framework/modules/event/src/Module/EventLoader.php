<?php

namespace YOOtheme\Module;

use YOOtheme\EventManagerInterface;
use YOOtheme\EventSubscriberInterface;

class EventLoader
{
    /**
     * @var EventManagerInterface
     */
    protected $events;

    /**
     * Constructor.
     *
     * @param EventManagerInterface $events
     */
    public function __construct(EventManagerInterface $events)
    {
        $this->events = $events;
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
        $module = $next($options);

        if (isset($module->options['events'])) {
            foreach ($module->options['events'] as $event => $listener) {

                $priority = 0;

                if (is_array($listener) && !is_callable($listener)) {
                    list($listener, $priority) = $listener;
                }

                if ($listener instanceof \Closure) {
                    $listener = $listener->bindTo($module, $module);
                }

                $this->events->on($event, $listener, $priority);
            }
        }

        if ($module instanceof EventSubscriberInterface) {
            $this->events->subscribe($module);
        }

        return $module;
    }
}
