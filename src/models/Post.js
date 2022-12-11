function _computeDate(date) {
  return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", time: "short" }) + " : " + date.toLocaleTimeString('en-us', { timeStyle: "medium" })
}
export class Post {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.likeIds = data.likeIds
    this.createdAt = data.createdAt
  }
}