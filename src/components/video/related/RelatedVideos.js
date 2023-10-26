import { useGetRelatedVideosQuery } from "../../../features/api/ApiSlice";
import RelatedVideo from "./RelatedVideo";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Error from "../../ui/Error"

export default function RelatedVideos({ id, title }) {
  const {
    data: RelatedVideos,
    isLoading,
    isError,
  } = useGetRelatedVideosQuery({id, title});

  let content = null;
  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  }
  if(!isLoading && isError){
    content = <Error message="There was an error!"/>
  }
  if(!isLoading && !isError && RelatedVideos?.length === 0){
    <Error message="No related videos found!"/>
  }
  if(!isLoading && !isError && RelatedVideos?.length > 0){
    content = RelatedVideos.map((video) => <RelatedVideo key={video.id} video={video}/>)
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
