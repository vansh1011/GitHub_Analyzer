import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { useNavigate } from 'react-router-dom'

export function Home() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [data, setData] = useState({})
    const [repos, setRepos] = useState([])
    const [getrepo, setGetrepo] = useState(false)

    const total_forks = useRef(0)
    const total_stars = useRef(0)
    const top_language = useRef("")

    const ChartRef = useRef(null)
    const chartInstance = useRef(null)

    async function handleSubmit() {

        const result = await fetch(`https://api.github.com/users/${username}`)
        setData(await result.json())
        setGetrepo(true)
    }

    async function handleGetRepos() {
        const repo_result = await fetch(
            `https://api.github.com/users/${username}/repos`
        )
        setRepos(await repo_result.json())
    }

    async function getLanguage(reponame) {

        const result = await fetch(
            `https://api.github.com/repos/${username}/${reponame}/languages`
        )

        const ans = await result.json()

        const label = Object.keys(ans)
        const value = Object.values(ans)

        const ctx = ChartRef.current

        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        chartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: label,
                datasets: [
                    {
                        data: value
                    }
                ]
            }
        })
    }

    useEffect(() => {

        total_stars.current = 0
        total_forks.current = 0

        const freq = {}

        for (const ele of repos) {

            total_stars.current += ele.stargazers_count
            total_forks.current += ele.forks_count

            if (ele.language) {
                freq[ele.language] = (freq[ele.language] || 0) + 1
            }

        }

        let maxCount = 0
        let topLang = ""

        for (const key in freq) {
            if (freq[key] > maxCount) {
                maxCount = freq[key]
                topLang = key
            }
        }

        top_language.current = topLang

    }, [repos])

    async function handleSaveAnalysis() {

        const analyzeData = {
            username,
            followers: data.followers,
            following: data.following,
            public_repos: data.public_repos,
            total_stars: total_stars.current,
            total_forks: total_forks.current,
            top_language: top_language.current,
        }

        await fetch(`${import.meta.env.VITE_SERVER}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(analyzeData)
        })
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-8">

            <div className="flex-1">

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8">

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500 w-full sm:w-75"
                    />

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold w-full sm:w-auto"
                    >
                        Find
                    </button>

                    <button
                        type="button"
                        className="bg-amber-600 hover:bg-amber-800 px-5 py-2 rounded-lg font-semibold w-full sm:w-auto"
                        onClick={() => navigate('/analysis')}
                    >
                        Find Analysis
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/all')}
                        className="bg-amber-600 hover:bg-amber-800 px-5 py-2 rounded-lg font-semibold w-full sm:w-auto"
                    >
                        Find All
                    </button>

                </div>

                <div className="bg-gray-800 rounded-2xl p-4 md:p-5 shadow-lg space-y-2 mb-6">

                    <div>Followers : <span className="font-bold">{data.followers}</span></div>
                    <div>Login : <span className="font-bold">{data.login}</span></div>
                    <div>Public Repo : <span className="font-bold">{data.public_repos}</span></div>

                </div>

                {getrepo && (
                    <>
                        <button
                            onClick={handleGetRepos}
                            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold mb-4 w-full sm:w-auto"
                        >
                            Get All repos
                        </button>

                        {repos.length > 0 && (
                            <button
                                onClick={handleSaveAnalysis}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-semibold mb-6 w-full sm:w-auto sm:ml-4"
                            >
                                Save Analysis
                            </button>
                        )}

                        <div className="space-y-4 md:space-y-5">

                            {repos.map((repo) => (
                                <div
                                    key={repo.id}
                                    className="bg-gray-800 border border-gray-700 rounded-2xl p-4 md:p-5 shadow-md"
                                >

                                    <div className="text-lg md:text-xl font-bold mb-2">
                                        {repo.name}
                                    </div>

                                    <div className="mb-1">
                                        Language : {repo.language}
                                    </div>

                                    <div className="mb-1">
                                        Fork count : {repo.forks_count}
                                    </div>

                                    <div className="mb-3">
                                        Stars : {repo.stargazers_count}
                                    </div>

                                    <button
                                        onClick={() => getLanguage(repo.name)}
                                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg w-full sm:w-auto"
                                    >
                                        View chart
                                    </button>

                                </div>
                            ))}

                        </div>
                    </>
                )}

            </div>

            <div className="w-full md:w-100 sticky top-0 md:top-5 h-fit mt-6 md:mt-0">

                <div className="bg-white rounded-2xl p-4 md:p-5">
                    <canvas ref={ChartRef} className="w-full"></canvas>
                </div>

            </div>

        </div>
    )
}