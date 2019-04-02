Rails.application.routes.draw do
  scope module: 'home' do
    post 'index/login'                         =>             'home_auth#login'
    post 'sign_up'                             =>             'home_auth#sign_up'
    get  'get_post'                            =>             'post#get_post'
    post 'create_post'                         =>             'post#create_post'
    post 'soft_delete_post'                    =>             'post#soft_delete_post'
    post 'delete_post'                         =>             'post#delete_post'
    post 'edit_post'                           =>             'post#edit_post'
    get  'get_comment'                         =>             'post#get_comment'
    post 'create_comment'                      =>             'post#create_comment'
    post 'edit_comment'                        =>             'post#edit_comment'
    post 'soft_delete_comment'                 =>             'post#soft_delete_comment'
    post 'delete_comment'                      =>             'post#delete_comment'
    get  'trash_post'                          =>             'post#trashed_posts'
    post 'restore_post'                        =>             'post#restore_post'
    get  'trash_comment'                       =>             'post#trashed_comments'
    post 'restore_comment'                     =>             'post#restore_comment'
  end
end
