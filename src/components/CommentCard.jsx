import moment from 'moment';

export default function Comment({ comment }) {
    return (
        <div className="chat chat-start w-full pl-4 pr-4">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img src={comment.user.avatar} alt={`User ${comment.user.username}`} />
                </div>
            </div>
            <div className="chat-header">
                {comment.user.username}
                {/* <time className="text-xs opacity-50">{timestamp}</time> */}
            </div>
            <div className="chat-bubble">{comment.content}</div>
            <div className={`chat-footer`}>
                {moment(comment.createdAt).format('DD MMMM YYYY')}
            </div>
        </div>
    );
}

// export default function CommentCard({ content, userId, username, userAvatar, createdAt }) {
//     return (
//         <div className="flex items-start p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg w-80 mb-4">
//             <img
//                 src={userAvatar}
//                 alt={`User ${username}`}
//                 className="w-10 h-10 rounded-full mr-4"
//             />
//             <div className="flex-1">
//                 <div className="flex items-center justify-between">
//                     <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                         {username}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                         {moment(createdAt).format('DD MMMM YYYY')}
//                     </p>
//                 </div>
//                 <p className="text-gray-500 dark:text-gray-400 mt-1">
//                     {content}
//                 </p>
//                 <div className="mt-2 flex items-center space-x-2">
//                     <button
//                         className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
//                     >
//                         <svg
//                             className="w-4 h-4 mr-1"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                             ></path>
//                         </svg>
//                         Reply
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }