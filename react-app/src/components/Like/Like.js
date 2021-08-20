import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AddLike from './AddLike';
import RemoveLike from './RemoveLike';

import styles from './Like.module.css';

const Like = ({ recipeId }) => {
    const userId = useSelector(state => state.session.user?.id);

    /* isLiked Boolean to check if current user likes recipe */
    const like = useSelector(state => state.like);
    const [isLiked, setIsLiked] = useState(!!like[recipeId]);


    useEffect(() => {
        setIsLiked(!!like[recipeId]);
    }, [like, recipeId]);

    
    return (
        <div className={styles.like_container}>
            {isLiked &&
                <AddLike 
                    setIsLiked={setIsLiked}
                    like={like[+recipeId]}
                />
            }
            {!isLiked &&
                <RemoveLike 
                    setIsLiked={setIsLiked}
                    recipeId={+recipeId}
                    userId={userId}
                />
            }
        </div>
    )
};

export default Like;