import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { IRepo, ServerResponse } from "../models"

export const githubApi = createApi({
    reducerPath: "github/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com/"
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchRepos: build.query<ServerResponse<IRepo>, {search: string, page: number}>({
            query: ({search, page}) => ({
                url: '/search/repositories',
                params: {
                    q: search,
                    per_page: 10,
                    page: page
                }
            }),
        }),
        getUserRepos: build.query<IRepo[], {username: string, page: number}>({
            query: ({username, page}) => ({
                url: `users/${username}/repos`,
                params: {
                    per_page: 10,
                    page: page
                }
            })
        })
    })
})

export const {useSearchReposQuery, useLazyGetUserReposQuery} = githubApi