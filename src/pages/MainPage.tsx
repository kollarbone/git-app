import { useEffect, useState } from "react";
import { useLazyGetUserReposQuery, useSearchReposQuery } from "../store/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";
import "./pages.css"
import { usePagination } from "../hooks/page";

function MainPage() {
    const [search, setSearch] = useState("")
    const [dropdown, setdropdown] = useState(false)
    const debounced = useDebounce(search)
    const [fetchRepos, {isLoading: areCurrentReposLoading, data: repos}] = useLazyGetUserReposQuery()
    const [page, setPage] = useState(1);

    const {isLoading, isError, data} = useSearchReposQuery({search: debounced, page:  1 || page}, { 
        skip: debounced.length < 3, 
        refetchOnFocus: true 
    })

    const { goToPrevPage, goToNextPage, goToPage } = usePagination(data?.total_count!, page);
    
    useEffect(() => {
        const username = "kollarbone"
        fetchRepos({username: username, page})
        setdropdown(debounced.length > 3)
    }, [debounced, fetchRepos, page])

console.log()
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
            <div className="pagination">
                <button disabled={page === 1} onClick={goToPrevPage}>Previous</button>
                    {Array.from(Array(data?.total_count)).map((_, i) => (
                        <button key={i} disabled={i + 1 === page} onClick={() => goToPage(i + 1)}>{i + 1}</button>
                    ))}
                <button disabled={page === data?.total_count} onClick={goToNextPage}>Next</button>
            </div>    
      </div>
    );
  }
  
  export default MainPage;
  