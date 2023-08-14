import { useState, useEffect } from 'react'
import axios from 'axios'
import VideoCard from '../components/VideoCard'
import { Link, useLocation } from 'react-router-dom'

export default function Search() {
    const [videosData, setVideosData] = useState([])
    const [loading, setLoading] = useState(true)
    const baseUrl = 'https://gigih-midterm-backend.onrender.com';
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');

    useEffect(() => {
        setVideosData([])
        const fetchVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${baseUrl}/api/search`, {
                    params: { q: searchQuery }
                });
                console.log(response);
                setVideosData(response.data.data.videos)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error('Error fetch videos data: ' + error)
            }
        }

        fetchVideos()
    }, [searchQuery])

    return (
        <div className={loading ? 'container mx-auto my-2 h-screen flex justify-center':'container mx-auto my-2 grid grid-cols-5'}>
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : ( videosData.length === 0 ? (
                    <h1>No Videos found</h1>
                ) : (
                    videosData && (
                        videosData.map(video => (
                            <Link key={video._id} to={`/videos/${video._id}`} className="cursor-pointer">
                                <VideoCard
                                    title={video.title}
                                    description={video.description}
                                    videoUrl={video.videoUrl}
                                    thumbnailUrl={video.thumbnailUrl}
                                    videoId={video._id}
                                />
                            </Link>
                        ))
                    )
                )
            )}
        </div>
    );
}