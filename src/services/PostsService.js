import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    // logger.log(AppState.posts)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getPostsByCreatorId(creatorId) {
    const res = await api.get(`api/profiles/${creatorId}/posts`)
    // logger.log('[get posts by creator]', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    // logger.log('[create post]', res.data)
    AppState.posts.push(res.data)
  }


}

export const postsService = new PostsService()