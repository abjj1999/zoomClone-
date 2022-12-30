import { getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useAppSelector } from '../app/hooks'
import { userRef } from '../utils/FirebaseConfig';
import { UserType } from '../utils/types';

export default function useFetchUsers() {
  const [users, setUsers] = React.useState<Array<UserType>>([])
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);

    React.useEffect(() => {
        if (uid) {
            const getUsers = async () => {
                const fireStoreQuery = query(userRef, where('uid', '!=', uid));
                const data = await getDocs(fireStoreQuery);
                const firebaseUsers: Array<UserType> = [];
                data.forEach((user) => {
                    const userData = user.data() as UserType;
                    firebaseUsers.push({
                        ...userData,
                        label: userData.name,
                    })
                })
                setUsers(firebaseUsers);
            }
            getUsers();
        }
    }, [uid]);
    return [users];
}
