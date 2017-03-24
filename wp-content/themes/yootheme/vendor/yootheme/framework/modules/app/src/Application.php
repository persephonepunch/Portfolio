<?php

namespace YOOtheme;

use YOOtheme\Module\AutoLoader;
use YOOtheme\Module\ReplaceLoader;

class Application extends Container
{
    use EventTrait, ModuleTrait;

    /**
     * @var string
     */
    public $path = '';

    /**
     * @var boolean
     */
    public $debug = false;

    /**
     * Constructor.
     *
     * @param array $values
     */
    public function __construct(array $values = [])
    {
        $this['app'] = $this;

        $this['modules'] = function () {

            $kernel = new ModuleKernel($this);
            $manager = new ModuleManager($kernel, [$this]);
            $manager->register('../../../index.php', __DIR__);
            $manager->addLoader(new ReplaceLoader());

            if (isset($this['autoloader'])) {
                $manager->addLoader(new AutoLoader($this['autoloader']));
            }

            return $manager;
        };

        parent::__construct($values);
    }

    /**
     * Run application.
     *
     * @param boolean $send
     */
    public function run($send = true)
    {
        $this['events']->trigger('boot', [$this]);

        return $this['kernel']->handle($this['request'], $this['response'], $send);
    }
}
