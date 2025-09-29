import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
    const [file, setFile] = useState(null);
    const [jdValue, setJdValue] = useState("");
    const [error, setError] = useState("");
    const [score, setScore] = useState("");
    const [diplayScore, setDisplayScore] = useState(true);
    let respondedScore = "";

    const allowedType = "application/pdf";
    const maxSize = 5 * 1024 * 1024;

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            setFile(null);
            setError("");
            return;
        }
        if (selectedFile.type !== allowedType) {
            setError("Invalid file format. Only PDF files are allowed.");
            setFile(null);
            return;
        }
        if (selectedFile.size > maxSize) {
            setError("File size exceeds 10MB limit.");
            setFile(null);
            return;
        }
        setFile(selectedFile);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !jdValue.trim()) {
            alert("Please upload a PDF file and enter the job description.");
            return;
        }

        setFile(null);
        setJdValue("");
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("jd", jdValue);

        try {
            const res = await fetch("http://127.0.0.1:5000/atsChecker", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            respondedScore = setScore(data.score);
            if (respondedScore !== "") {
                setDisplayScore(false);
            }
        }
        catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    return (
        <>
            {diplayScore && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Select file */}
                    {!file && (
                        <motion.div
                            className="col-span-full"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10" style={{ backgroundColor: '#023547' }}>
                                <div className="text-center">
                                    <div className="mt-4 flex text-sm text-gray-400">
                                        <label className="relative cursor-pointer rounded-md font-semibold text-indigo-400 hover:text-indigo-300">
                                            <span className="font-semibold" style={{ color: '#00e078' }}>Upload a file</span>
                                            <input
                                                type="file"
                                                id="file-upload"
                                                name="file-upload"
                                                className="sr-only"
                                                onChange={handleFile}
                                            />
                                        </label>
                                        <p className="pl-1 text-gray-200">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-200">PDF only, up to 5MB</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Selected File */}
                    {file && (
                        <motion.div
                            className="col-span-full mt-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-4 py-4" style={{ backgroundColor: '#023547' }}>
                                <div className="text-center">
                                    <div className="flex text-sm text-gray-700">
                                        <span className="font-semibold" style={{ color: '#00e078' }}>
                                            Selected File:
                                        </span>
                                        <span className="pl-1 text-gray-200 italic">{file.name}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* File formate error */}
                    {error && (
                        <div className="mt-2">
                            <span className="text-red-500 text-sm">{error}</span>
                        </div>
                    )}

                    {/* JD input */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="mt-6 flex items-center gap-3 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md px-4 py-2"
                        style={{ backgroundColor: '#023547' }}
                    >
                        <textarea
                            value={jdValue}
                            onChange={(e) => setJdValue(e.target.value)}
                            rows={7}
                            cols={150}
                            name="jdInput"
                            placeholder="Paste the job description here..."
                            className="flex-grow resize-none bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 overflow-hidden max-h-48"
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="self-end bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl mt-4"
                    >
                        Submit
                    </motion.button>
                </form>
            )}
            {!diplayScore && (
                <form>
                    <motion.div
                        className="col-span-full mt-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-4 py-4" style={{ backgroundColor: '#023547' }}>
                            <div className="text-center">
                                <div className="flex text-sm text-gray-700">
                                    <span className="font-semibold" style={{ color: '#00e078' }}>
                                        AtS Score:
                                    </span>
                                    <span className="pl-1 text-gray-200 italic">{score}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-22 self-end bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl mt-4"
                    >
                        OK
                    </motion.button>
                </form>
            )}
        </>
    );
};

export default HeroSection;
