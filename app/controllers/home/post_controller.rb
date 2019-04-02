class Home::PostController < ActionController::Base

	before_filter :load_post, :only => [:edit_post, :soft_delete_post, :delete_post, :get_comment, :restore_post] 
	before_filter :load_comment, :only => [:restore_comment, :delete_comment, :edit_comment, :soft_delete_comment, :delete_comment]

	def get_post
		post_data = ::Post.where(user_id: params[:user_id], is_active: true)
		return result({post_data: post_data}, {message: 'Post data has been fetched successfully.'}, :ok)
	end

	def create_post
		post_data = {
			data: params[:post],
			is_active: true,
			user_id: params[:user_id]
		}
		post_data_info = ::Post.create!(post_data)
		return result({post_data_info: post_data_info}, {message: 'Post created successfully'}, :ok)
	end

	def edit_post
		edit_post = {
			data: params[:post] || @post.data
		}
		@post.update!(edit_post)
		return result({}, {message: 'Post has been updated successfully.'}, :ok)
	end

	def soft_delete_post
		@post.update!(:is_active => false )
		return result({}, {message: 'Post updated successfully.'}, :ok)
	end

	def delete_post
		@post.delete
		@post.comments.delete_all
		return result({}, {message: 'Post deleted successfully.'}, :ok)
	end

	def get_comment
		comment_data = ::Comment.where(post_id: params[:post_id], is_active: true)
		post_name = @post.data
		return result({comment_data: comment_data, post_name: post_name}, {message: 'Comment data has been fetched successfully.'}, :ok)
	end

	def create_comment
		comment_data = {
			data: params[:comment],
			user_id: params[:user_id],
			post_id: params[:post_id],
			is_active: true
		}
		comment_data_info = ::Comment.create!(comment_data)
		return result({comment_data_info: comment_data_info}, {message: 'Comment created successfully.'}, :ok)
	end

	def edit_comment
		edit_comment = {
			data: params[:comment] || @comment.data
		}
		@comment.update!(edit_comment)
		return result({}, {message: 'Comment has been updated successfully.'}, :ok)
	end

	def soft_delete_comment
		@comment.update!(:is_active => false )
		return result({}, {message: 'Comment updated successfully.'}, :ok)
	end

	def delete_comment
		@comment.delete
		return result({}, {message: 'Post deleted successfully.'}, :ok)
	end

	def trashed_posts
		posts = ::Post.where(is_active: false)
		return result({trash_post: posts}, {message: 'Trash post has been fetched successfully.'}, :ok)
	end

	def restore_post
		@post.update!(:is_active => true)
		return result({}, {message: 'Post restored successfully.'}, :ok)
	end

	def trashed_comments
		comments = ::Comment.where(is_active: false)
		return result({trash_comment: comments}, {message: 'Trash comment has been fetched successfully.'}, :ok)
	end

	def restore_comment
		@comment.update!(is_active: true)
		return result({}, {message: 'Comment restore successfully.'}, :ok)
	end


	private

	def load_post
		@post ||= ::Post.find(params[:post_id]) 
	end

	def load_comment
		@comment ||= ::Comment.find(params[:comment_id])
	end

	def result(payload, meta, status = :ok)
    render json: {
      payload: payload ,
      meta: meta
    }, status: status
  end
end