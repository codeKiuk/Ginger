import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setIsCreateContentModal } from '@redux/modules/modal/createContentModal';
import { RouteComponentProps } from 'react-router';
import { postClubContent, getClubContents, postGroupContent, getGroupContents } from '@redux/modules/contents/contents';
import { ContentSubject } from '@redux/modules/commons/contentMenu';


export const useContents = () => {
    const dispatch = useAppDispatch();
    const userID = useAppSelector(state => state.auth.userID);
    const auth = useAppSelector(state => state.auth.tokenMatch);

    useEffect(() => {

    }, [])

    const onPostContent = (data: {
        checkClub: boolean,
        checkGroup: boolean
        subject: ContentSubject,
        title: string,
        content: string,
        userID: string,
    }) => {

        closeCreateContentModal();

        if (data.subject === ContentSubject.CLUB_CONTENT) {
            dispatch(postClubContent({ ...data, userID: userID }));
            dispatch(getClubContents({ page: 1, perPage: 10 }));
        } else {
            dispatch(postGroupContent({ ...data, userID: userID }));
            dispatch(getGroupContents({ page: 1, perPage: 10 }));
        }


    }

    const openCreateContentModal = (props: RouteComponentProps) => {
        if (auth) {
            dispatch(setIsCreateContentModal(true));
        } else {
            props.history.push('/login');
        }
    }

    const closeCreateContentModal = () => {
        dispatch(setIsCreateContentModal(false));
    }

    return { openCreateContentModal, closeCreateContentModal, onPostContent }
}