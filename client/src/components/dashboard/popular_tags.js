import '../../styles/tags.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';


const Popular_tags = () => {
    const [popularTags, set_popularTags] = useState([]);

    const getPopularTags = async() => {
        try {
            const popularTagLists = await axios.get('/dashboard/popular-tags');
            set_popularTags(popularTagLists.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPopularTags();

    }, [])

    return ( 
        <div className='tags'>
            <h3>Popular tags</h3>
            {popularTags.map(tag => (
                <div className='tag'>
                    <h4>{tag.tag}</h4>
                    <p>x</p>
                    <p>{tag.num}</p>
                </div>
            ))}

        </div>
     );
}
 
export default Popular_tags;