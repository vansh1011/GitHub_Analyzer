    import { useEffect, useState } from "react";


    function All() {
        const [data, setData] = useState([]);



        useEffect(() => {
            (async function call() {
                try {
                    const res = await fetch(`${import.meta.env.VITE_SERVER}/all`);
                    const json = await res.json();
                    setData(json);
                } catch (error) {
                    console.log("Error fetching data:", error);
                }
            })();
        }, []);

        return (
            <div className="min-h-screen bg-linear-to-br from-[#050b1f] via-[#071a3a] to-[#0b2a5a] text-white px-6 py-10">

                <h1 className="text-3xl font-bold text-center text-blue-300 mb-8">
                    All Users Analysis
                </h1>

                <div className="max-w-5xl mx-auto grid gap-5">

                    {data.length > 0 ? (
                        data.map((user, index) => (
                            <div
                                key={index}
                                className="bg-[#0b1b3a]/70 backdrop-blur-md border border-blue-900/40 rounded-2xl shadow-xl p-5"
                            >

                            
                                <div className="text-lg font-semibold text-blue-300 mb-4">
                                    User #{index + 1}
                                </div>

                            
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

                                    <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40">
                                        Followers:{" "}
                                        <span className="font-bold text-blue-300">
                                            {user.followers ?? "-"}
                                        </span>
                                    </div>

                                    <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40">
                                        Following:{" "}
                                        <span className="font-bold text-blue-300">
                                            {user.following ?? "-"}
                                        </span>
                                    </div>

                                    <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40">
                                        Top Language:{" "}
                                        <span className="font-bold text-blue-300">
                                            {user.top_language ?? "-"}
                                        </span>
                                    </div>

                                    <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40">
                                        Stars:{" "}
                                        <span className="font-bold text-blue-300">
                                            {user.total_stars ?? "-"}
                                        </span>
                                    </div>

                                    <div className="bg-[#07152e] p-3 rounded-lg border border-blue-900/40 sm:col-span-2">
                                        Forks:{" "}
                                        <span className="font-bold text-blue-300">
                                            {user.total_forks ?? "-"}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-blue-200 opacity-70">
                            Loading data...
                        </div>
                    )}

                </div>
            </div>
        );
    }

    export default All;