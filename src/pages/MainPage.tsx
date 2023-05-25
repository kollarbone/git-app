import { useEffect, useState } from "react";
import { useLazyGetUserReposQuery, useSearchReposQuery } from "../store/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";
import "./pages.css"
import { usePage } from "../hooks/page";

function MainPage() {
    const [search, setSearch] = useState("")
    const [dropdown, setdropdown] = useState(false)
    const debounced = useDebounce(search)
    const page = usePage(3)

    const {isLoading, isError, data} = useSearchReposQuery({search: debounced, page}, {
        skip: debounced.length < 3,
        refetchOnFocus: true
      })
      const [fetchRepos, {isLoading: areCurrentReposLoading, data: repos}] = useLazyGetUserReposQuery()
    
      useEffect(() => {
        const username = "kollarbone"
        fetchRepos({username: username, page})
        setdropdown(debounced.length > 3)
      }, [debounced, fetchRepos, page])

    // const clickHandler = (username: string) => {
        
    // }

    return (
      <div className="main_page">
        {isError && <p>Something went wrong...</p>}
        <div>
            <input type="text" className="search_repos" 
            placeholder="Search for Github repos.."
            value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {areCurrentReposLoading && <p>Current repos are loading...</p>}
        {!search && repos?.map(repo => 
            <RepoCard repo ={repo} key={repo.id}/>
        )}
        {dropdown && 
            <div>
                {isLoading && <p>Repos are loading...</p>}
                {data?.items.map(repo => (<>
                    {/* <p key={user.id} onClick={() => clickHandler(user.full_name)}>{user.name}</p> */}
                    <RepoCard repo ={repo} key={repo.id}/>
                </>))}
            </div>}
            
      </div>
    );
  }
  
  export default MainPage;
  