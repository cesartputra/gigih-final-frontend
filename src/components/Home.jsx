import { useState, useEffect } from 'react'
import axios from 'axios'
import VideoCard from '../components/VideoCard'
import { Link } from 'react-router-dom'

export default function Home() {
    const [videosData, setVideosData] = useState([])
    const baseUrl = 'http://localhost:3000'

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/videos`)
                
                setVideosData(response.data.data.videos)
            } catch (error) {
                console.error('Error fetch videos data: ' + error)
            }
        }

        fetchVideos()
    }, [])

    return (
        <div className="container mx-auto my-2 grid grid-cols-5">
            {videosData.map(video => (
                <Link key={video._id} to={`/videos/${video._id}`} className="cursor-pointer">
                    <VideoCard
                        title={video.title}
                        description={video.description}
                        videoUrl={video.videoUrl}
                        thumbnailUrl={video.thumbnailUrl}
                        videoId={video._id}
                    />
                </Link>
            ))}
        </div>
    );
}