import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { ContentSubject } from '@redux/modules/commons/contentMenu';
import { getClubContents, getGroupContents } from '@redux/modules/contents/contents';
import { getMyContents } from '@redux/modules/contents/myContents';
import { getMyComments } from '@redux/modules/comments/myComments';

export const useFetchPage = () => {
    const dispatch = useAppDispatch();

    const userID = useAppSelector(state => state.auth.userID);
    const perPage = useAppSelector(state => state.pagination.perPage);
    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);

    const getPapers = (page: number) => {
        switch (contentSubject) {

            case ContentSubject.CLUB_CONTENT:
                dispatch(getClubContents({ page: page, perPage: perPage }));
                break;

            case ContentSubject.GROUP_CONTENT:
                dispatch(getGroupContents({ page: page, perPage: perPage }));
                break;

            case ContentSubject.MY_CONTENT:
                dispatch(getMyContents({ userID: userID, page: page, perPage: perPage }));
                break;

            case ContentSubject.MY_COMMENT:
                dispatch(getMyComments({ userID: userID, page: page, perPage: perPage }));
                break;

            default:
                break;
        }
    }

    return { getPapers }
}