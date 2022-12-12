import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class PostsService {
  async getPosts() {
    const res = await api.get('api/posts?page=' + AppState.page)
    // logger.log(AppState.posts)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.maxPage = res.data.totalPages
    logger.log(res.data)
  }

  async getPostsByCreatorId(creatorId) {
    const res = await api.get(`api/profiles/${creatorId}/posts?page=` + AppState.page)
    // logger.log('[get posts by creator]', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.maxPage = res.data.totalPages

  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    // logger.log('[create post]', res.data)
    AppState.posts.unshift(new Post(res.data))
  }

  async removePost(id) {
    const res = await api.delete('api/posts/' + id)
    logger.log('[removePost]', res.data)
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    logger.log(res.data)
  }

  async searchPosts(query) {
    const res = await api.get("api/posts", { params: { query: query } })
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.posts)
  }


}

export const postsService = new PostsService()