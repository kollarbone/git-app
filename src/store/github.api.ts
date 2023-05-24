import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { IRepo, ServerResponse } from "../models"

export const githubApi = createApi({
    reducerPath: "github/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com/"
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchRepos: build.query<ServerResponse<IRepo>, string>({
            query: (search: string) => ({
                url: '/search/repositories',
                params: {
                    q: search,
                    rep_page: 10
                }
            }),
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    })
})

export const {useSearchReposQuery, useLazyGetUserReposQuery} = githubApi