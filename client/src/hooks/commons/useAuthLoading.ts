import { useAppSelector } from '@redux/hooks';

export const useAuthLoading = (): boolean => {

    const tokenMatchLoading = useAppSelector(state => state.auth.loading);
    const loginLoading = useAppSelector(state => state.login.loading);
    const logoutLoading = useAppSelector(state => state.logout.loading);
    const registerLoading = useAppSelector(state => state.register.loading);

    const loading = tokenMatchLoading || loginLoading || logoutLoading || registerLoading;

    return loading;
}