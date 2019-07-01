<?php
namespace App\Policies;
use App\Model\admin\Admin;
use Illuminate\Auth\Access\HandlesAuthorization;
class PostPolicy
{
    use HandlesAuthorization;
    /**
     * Determine whether the admin can view the post.
     *
     * @param  \App\admin  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function view(Admin $user)
    {
        //
    }
    /**
     * Determine whether the admin can create posts.
     *
     * @param  \App\admin  $user
     * @return mixed
     */
    public function create(Admin $user)
    {
        return $this->getPermission($user,1);
    }
    /**
     * Determine whether the admin can update the post.
     *
     * @param  \App\admin  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function update(Admin $user)
    {
        return $this->getPermission($user,2);
    }
    /**
     * Determine whether the admin can delete the post.
     *
     * @param  \App\admin  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function delete(Admin $user)
    {
        return $this->getPermission($user,6);
    }
    public function tag(Admin $user)
    {
        return $this->getPermission($user,11);
    }
    public function category(Admin $user)
    {
        return $this->getPermission($user,12);
    }
    protected function getPermission($user,$p_id)
    {
        foreach ($user->roles as $role) {
            foreach ($role->permissions as $permission) {
                if ($permission->id == $p_id) {
                    return true;
                }
            }
        }
        return false;
    }
}