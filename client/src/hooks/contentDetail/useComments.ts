import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getComments } from '@redux/modules/content/comments';
import { deleteComment, postComment } from '@redux/modules/content/comments';
import { RouteComponentProps } from 'react-router';

export const useComments = (contentID: string) => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(state => state.comments.comments);
    const auth = useAppSelector(state => state.auth.tokenMatch);
    const userID = useAppSelector(state => state.auth.userID);

    useEffect(() => {
        dispatch(getComments({ contentID: contentID }));
    }, [])

    const onDeleteComment = async (commentID: string) => {
        await dispatch(deleteComment({ commentID: commentID }));
        dispatch(getComments({ contentID: contentID }));
    }

    const onPostComment = async (data: { comment: string }, props: RouteComponentProps) => {
        if (!auth) {
            props.history.push('/login')
            return;
        }

        dispatch(postComment({
            userID: userID,
            comment: data.comment,
            contentID: contentID,
        }))
            .then(res => {
                // console.log('postComments res', res);
                if (res.payload.success) {
                    dispatch(getComments({ contentID: contentID }))
                }
            })
    }

    return { comments, onDeleteComment, onPostComment };
}