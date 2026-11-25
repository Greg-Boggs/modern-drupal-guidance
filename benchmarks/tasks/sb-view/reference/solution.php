<?php

use Drupal\Component\Serialization\Yaml;
use Drupal\views\Entity\View;

// $extra holds the arguments after "--".
View::create(Yaml::decode(file_get_contents($extra[0])))->save();
