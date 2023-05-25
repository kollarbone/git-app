import { useEffect, useState } from "react";
import { useSearchReposQuery } from "../store/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";
import "./pages.css"
import CurrentRepos from "../components/CurrentRepos";

function MainPage() {
    const [search, setSearch] = useState("")
    const [dropdown, setdropdown] = useState(false)
    const debounced = useDebounce(search)
    const [page, setPage] = useState(1);
    const pageNumber = [];
    const maxPage = 50;

    const {isLoading, isError, data} = useSearchReposQuery({search: debounced, page: page}, { 
        skip: debounced.length < 3, 
        refetchOnFocus: true 
    })
    
    for (let i = 1; i <= Math.min(Math.ceil(data?.total_count! / 10), maxPage); i++) {
        pageNumber.push(i);
    }

    useEffect(() => {
        setdropdown(debounced.length > 3)
    }, [debounced, page])

    const paginate = (number: number) => setPage(number);
 
    return (
      <div className="main_page">
        {isError && <p>Something went wrong...</p>}
        <div className="search">
            <input type="text" className="search_repos" 
                placeholder="Search for Github repos.."
                value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {!dropdown ?
            <CurrentRepos/>
            :<div className="repos_block">
                {isLoading && <p className="loading">Repos are loading...</p>}
                {data?.items.map(repo => (
                    <RepoCard repo ={repo} key={repo.id}/>
                ))}
                <div className="pagination">
                    {data?.total_count! > 10 &&
                        pageNumber.map((number) => (
                            <button className={page === number? "active": "un_active"}
                                key={number} disabled={page === number} 
                                onClick={() => paginate(number)}
                                >
                                    {number}
                            </button>
                    ))}
                </div> 
            </div>} 
      </div>
    );
  }
  
  export default MainPage;
  