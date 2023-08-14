import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import ReactPlayer from "react-player";
import ProductCard from "./ProductCard";
import { useAuth } from "./AuthContext";

export default function VideoDetail(){
    const { videoId } = useParams(); // Get the video ID from URL parameters
    const [videoData, setVideoData] = useState(null);
    const [commentsData, setCommentsData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [newComment, setNewComment] = useState(null);
    const [commentText, setCommentText] = useState("");
    const { token, user } = useAuth();
    const baseUrl = 'http://localhost:3000';
    
    
    
    useEffect(() => {
        const fetchCommentsByVideoId = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/comments`, {
                    params: { videoId }
                })
                setCommentsData(response.data.data.comments)
            } catch (error) {
                console.error('Error fetching comments by video Id: ' + error)
            }
        }

        const fetchProductsByVideoId = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/products/list`, {
                    params: { videoId }
                })

                setProductsData(response.data.data.products)
            } catch (error) {
                console.error('Error fetching products by video Id: ' + error)
            }
        }

        const fetchVideoById = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/videos/${videoId}`)
                
                setVideoData(response.data.data.video)
            } catch (error) {
                console.error('Error fetch videos data: ' + error)
            }
        }

        fetchVideoById()
        fetchCommentsByVideoId()
        fetchProductsByVideoId()
    }, [])

    // useEffect(() => {
    //     if (newComment) {
    //         setCommentsData(prevComments => [newComment, ...prevComments]);
    //     }
    // }, [newComment]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to send the new comment
            const response = await axios.post(`${baseUrl}/api/comments`, {
                videoId,
                content: commentText,
                userId: user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedCommentsResponse = await axios.get(`${baseUrl}/api/comments`, {
                params: { videoId }
            });
            setCommentsData(updatedCommentsResponse.data.data.comments);
            setCommentText("");
        } catch (error) {
            console.error('Error submitting comment: ' + error);
        }
    };
    // console.log(user);
    return (
        <div className="my-2 mx-2">
            <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
                <div className="md:col-span-2 flex justify-center">
                    <div className="space-y-4 overflow-y-scroll max-h-[70vh]">
                            {productsData.length === 0 ? (
                                <p>No Products</p>
                            ) : (productsData &&
                                    (productsData.map(product => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    )))
                            )}
                        </div>
                </div>
                <div className="md:col-span-7 flex justify-center items-center">
                    {videoData && (
                        <div className="videoSectio mx-4 w-screen">
                            <div className="rounded-lg h-96">
                                <ReactPlayer
                                    url={videoData.videoUrl}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                />
                                
                            </div>
                            <h1 className="mt-4 text-xl font-semibold dark:text-white">{videoData.title}</h1>
                            <div className="rounded-md bg-neutral px-2 py-1 my-2">
                                
                                <h2 className="mt-2 text-md font-semibold dark:text-white">{videoData.description}</h2>
                            </div>
                            
                        </div>
                    )}
                    
                    
                    
                </div>
                <div className="md:col-span-3 flex justify-center">
                    <div className="space-y-4 ">
                        <div className="comments overflow-y-scroll max-h-[70vh]">
                            {commentsData.length === 0 ? (
                                <p>No comments</p>
                            ) : (commentsData &&
                                    (commentsData.map(comment => (
                                        <CommentCard
                                            key={comment._id}
                                            comment={comment}
                                            // content={comment.content}
                                            // userId={comment.userId}
                                            // username={comment.user.username}
                                            // userAvatar={comment.user.avatar}
                                            // createdAt={comment.createdAt}
                                        />
                                    )))
                            )}
                        </div>
                        {user ? (
                            <div className="flex justify-center">
                                <div className="w-full bg-white dark:bg-gray-900 p-4 shadow-md rounded-lg mb-4">
                                    <form onSubmit={handleSubmitComment}>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            placeholder="Add a new comment..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                        />
                                        <button
                                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                            type="submit"
                                        >
                                            Post Comment
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}