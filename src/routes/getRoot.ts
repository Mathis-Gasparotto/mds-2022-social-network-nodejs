import { Application } from "express-ws"
import path from 'path'
import { getAllPosts, getAuthorNameByPostId } from "../../repositories/postRepository"
import { prisma } from "../../repositories/prisma"

export function getRoot (app: Application) {
  app.get('/', async (req, res) => {
    var posts = Array()
    const postsDB = await getAllPosts()
    if(!postsDB) {
      res.render(path.join(__dirname, '../views/index.ejs'))
      return
    }
    postsDB.forEach(async (post) => {
      posts.push({
        author: await getAuthorNameByPostId(post.id),
        content: post.content
      })
    })
    res.render(path.join(__dirname, '../views/index.ejs'), {posts})
  })
}