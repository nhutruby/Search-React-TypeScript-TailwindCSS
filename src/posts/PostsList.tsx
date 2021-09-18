import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import {
  fetchPosts,
  selectPostIds,
  selectPostById,
} from './postsSlice'
interface Props {
  postId: string | number;
}
let PostExcerpt = ({ postId }: Props) => {
  const post = useSelector((state: RootState) => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post?.id}>
      <div className="flex items-center justify-center">
        <div className="max-w-md py-4 px-8 border border-back-700 rounded-lg my-5">
          <div>
            <h2 className="text-gray-800 text-3xl font-semibold">{post?.title}</h2>
            <p className="mt-2 text-gray-600">
              {post?.body.substring(0, 100)}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
export const PostsList = () => {
  const dispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds)

  const postStatus = useSelector((state: RootState) => state.posts.status)
  const error = useSelector((state: RootState) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
      {content}
    </section>
  )
}
