export default function VideoCard({ title, description, thumbnailUrl }){
    return (
        <div className="card w-60 bg-base-100 h-96 shadow-xl image-full">
            <figure><img src={thumbnailUrl} alt={title + ' Thumbnail'} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                {/* <div className="card-actions justify-end">
                    <a className="btn btn-primary" href={videoUrl}>Play</a>
                </div> */}
            </div>
        </div>
    );
}