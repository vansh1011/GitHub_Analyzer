import { useState } from "react"

function Analysis() {

    const [username, setUsername] = useState("")
    const [oneuser, setOneuser] = useState({})

    async function handleSubmit() {

        const data = { username }

        const result = await fetch(`${import.meta.env.VITE_SERVER}/find`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const response = await result.json()

        setOneuser(response.data[0])
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#050b1f] via-[#071a3a] to-[#0b2a5a] text-white px-4">

            <div className="w-full max-w-xl">

                <div className="bg-[#0b1b3a]/70 backdrop-blur-md border border-blue-900/40 rounded-2xl shadow-2xl p-6">

                    <h1 className="text-2xl font-bold text-center mb-6 text-blue-300">
                        GitHub User Finder
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-3 mb-6">

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username..."
                            className="flex-1 px-4 py-2 rounded-lg bg-[#07152e] border border-blue-800/50 focus:outline-none focus:border-blue-400 text-white"
                        />

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-semibold"
                        >
                            Find
                        </button>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

                        <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40">
                            Followers: <span className="font-bold text-blue-300">{oneuser?.followers ?? "-"}</span>
                        </div>

                        <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40">
                            Following: <span className="font-bold text-blue-300">{oneuser?.following ?? "-"}</span>
                        </div>

                        <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40">
                            Top Language: <span className="font-bold text-blue-300">{oneuser?.top_language ?? "-"}</span>
                        </div>

                        <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40">
                            Stars: <span className="font-bold text-blue-300">{oneuser?.total_stars ?? "-"}</span>
                        </div>

                        <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40 sm:col-span-2">
                            Forks: <span className="font-bold text-blue-300">{oneuser?.total_forks ?? "-"}</span>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Analysis