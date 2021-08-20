import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getProfile } from '../../store/profile';

import ProfileCard from './ProfileCard';

const Profile = () => {
    const { userId } = useParams();

    /* isOwner used to check if owner of profile page */
    const user = useSelector(state => state.session.user);
    const isOwner = user.id === +userId;

    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile[userId]);

    useEffect(() => {
        dispatch(getProfile(userId))
    }, [dispatch, userId]);

    return (
        <div>
            <br/>
            <br/>
            <br/>
            {profile &&
                <ProfileCard 
                    profile={profile}
                />
            }
        </div>
    )
};

export default Profile;