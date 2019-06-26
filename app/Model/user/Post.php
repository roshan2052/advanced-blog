<?php

namespace App\Model\user;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{	
	// one post may have many tags
    public function tags()
    {
    	return $this->belongsToMany('App\Model\user\Tag','post__tags');
    }

    public function categories()
    {
    	return $this->belongsToMany('App\Model\user\Category','category__posts');
    }
    public function getRouteKeyName()
    {
    	return 'slug';
    }

}
