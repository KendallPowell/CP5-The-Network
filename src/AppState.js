import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],
  /** @type {import('./models/Account.js').Account} */
  activeProfile: null,
  /** @type {import('./models/Ad.js').Ad[]} */
  ads: [],
  profiles: [],
  page: 1,
  maxPage: 10,
})
