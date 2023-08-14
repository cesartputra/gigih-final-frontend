import { useState, useEffect } from 'react'
import axios from 'axios'
import VideoCard from '../components/VideoCard'
import { Link } from 'react-router-dom'

export default function Home() {
    const [videosData, setVideosData] = useState([])
    const [loading, setLoading] = useState(true)
    const baseUrl = 'https://gigih-midterm-backend.onrender.com';

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/videos`)
                
                setVideosData(response.data.data.videos)
                setLoading(false);
            } catch (error) {
                console.error('Error fetch videos data: ' + error)
                setLoading(false);
            }
        }

        fetchVideos()
    }, [])

    return (
        <div className={loading ? 'container mx-auto my-2 h-screen flex justify-center':'container mx-auto my-2 grid grid-cols-5'}>
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
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
            )}
        </div>
    );
}