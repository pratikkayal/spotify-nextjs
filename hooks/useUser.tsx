import { Subscription, UserDetails } from "@/types";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";
import { createContext } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext <UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isSessionLoading,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoading, setIsLoading] = useState(isSessionLoading);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () => supabase.from('subscriptions')
                                    .select('*, prices(*, products(*))')
                                    .in('status', ['trialing', 'active'])
                                    .single();

    useEffect(() => {
        if(user && !isLoading && !userDetails !subscription) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    if(userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    if(subscriptionPromise.status === 'fulfilled') {
                        setSubscription(subscriptionPromise.value.data as Subscription);
                    }

                    setIsLoadingData(false);
                }
            );
        }
}