<?php

Route::get('/test', function(){
	$post = App\Model\user\Post::where(['id'=>2])->first();
	$tag = App\Model\user\Tag::where(['id'=>2])->first();
	$category = App\Model\user\Category::where(['id'=>2])->first();
	$posts = App\Model\user\Post::where(['id'=>1])->first();
	dd($posts->categories);
});


// User Routes
Route::group(['namespace' => 'User'],function(){
	Route::get('/','HomeController@index');
	Route::get('post/{post}','PostController@post')->name('post');
	Route::get('post/tag/{tag}','HomeController@tag')->name('tag');
	Route::get('post/category/{category}','HomeController@category')->name('category');
});
//Admin Routes
Route::group(['namespace' => 'Admin'],function(){
	Route::get('admin/home','HomeController@index')->name('admin.home');
	// Users Routes
	Route::resource('admin/user','UserController');
	// Role Routes
	Route::resource('admin/role','RoleController');
	//Permission Routes
	Route::resource('admin/permission','PermissionController');
	// Post Routes
	Route::resource('admin/post','PostController');
	// Tag Routes
	Route::resource('admin/tag','TagController');
	// Category Routes
	Route::resource('admin/category','CategoryController');
	// Admin Auth Routes
	Route::get('admin-login', 'Auth\LoginController@showLoginForm')->name('admin.login');
	Route::post('admin-login', 'Auth\LoginController@login');
});

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');