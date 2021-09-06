import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getSingleContent } from '@redux/modules/comments/comments';
import { deleteContent } from '@redux/modules/contents/contents';
import { ContentSubject } from '@redux/modules/commons/contentMenu';
import { RouteComponentProps } from 'react-router';
import { setUpdateContentModal } from '@redux/modules/contents/updateContentModal';
import { updateContent } from '@redux/modules/contents/contents';

export const useSingleContent = (contentID: string) => {
    const dispatch = useAppDispatch();

    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const singleContent = useAppSelector(state => state.comments.singleContent);
    const userID = useAppSelector(state => state.auth.userID);

    useEffect(() => {
        dispatch(getSingleContent({ contentID: contentID }));
    }, [])

    const onDeleteContent = async (props: RouteComponentProps) => {
        await dispatch(deleteContent({ contentID: contentID ? contentID : '' }))
        if (contentSubject === ContentSubject.MY_CONTENT || contentSubject === ContentSubject.MY_COMMENT) {
            props.history.push(`/my-page/${userID}`)
        } else {
            props.history.push('/home')
        }
    }

    const onUpdateContent = async (data: { title: string, content: string }) => {
        await dispatch(updateContent({ ...data, contentID: contentID }))
        dispatch(setUpdateContentModal(false));
        dispatch(getSingleContent({ contentID: contentID ? contentID : '' }));
    }

    const openUpdateContentModal = () => {
        dispatch(setUpdateContentModal(true));
    }

    const closeUpdateContentModal = () => {
        dispatch(setUpdateContentModal(false));
    }

    return { singleContent, onDeleteContent, onUpdateContent, openUpdateContentModal, closeUpdateContentModal };
}