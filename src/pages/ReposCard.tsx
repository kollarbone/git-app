import { useLocation } from "react-router-dom";
import { useGetFullInfoRepoQuery } from "../store/github.api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsStar } from "react-icons/bs";

function ReposCard() {
  const location = useLocation().pathname;
  const {isLoading, isError, data} = useGetFullInfoRepoQuery({search: location})
  let day = new Date(data?.updated_at!).toLocaleString()
 
  return (
    <div className="full_info_block">
      {isError && <p className="error">Something went wrong...</p>}
      {isLoading && <p className="loading"><AiOutlineLoading3Quarters/></p>}
      {data && <>
        <div className="user_repo_info">
          <span>{data.name}</span>
          <span className="stars" style={{color:"#ffffffd0"}}><BsStar/> {data.stargazers_count}</span>
          <span style={{color: "#7d8590"}}>{day}</span>
        </div>
        <div className="user_info">
          {data.owner.avatar_url && <img src={data.owner.avatar_url} alt="avatar_owner"/>}
          <a href={data.owner.html_url}>{data.owner.login}</a>
        </div>
        <div className="langs">
          <span>{data.language}</span>
        </div>
        <div className="descr">
          <span>{data.description}</span>
        </div>
      </>}
    </div>
  );
}

export default ReposCard;
