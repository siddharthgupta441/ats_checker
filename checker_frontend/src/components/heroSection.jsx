import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {

    const analyse = async (e) => {

    }

    return (
        <form onSubmit={analyse}>
            {/* selecting pdf file */}
            <motion.div 
                className="col-span-full"
                whileHover={{ scale: 1.1 }}
                >
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                    <div className="text-center">
                        <div className="mt-4 flex text-sm/6 text-gray-400">
                            <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300">
                                <span>Upload a file</span>
                                <input id="file-upload" type="file" name="file-upload" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs/5 text-gray-400">PDF only up to 10MB</p>
                    </div>
                </div>
            </motion.div>

            {/* JD imput field */}
            <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-3 mt-4 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md px-4 py-2">
                <textarea
                    onChange={(e) => setInput(e.target.value)}
                    rows={7}
                    cols={150}
                    name='jdInput'
                    placeholder="Paste the job description here..."
                    className="flex-grow resize-none bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 overflow-hidden max-h-48"
                // onInput={(e) => {
                //     e.target.style.height = "auto";
                //     e.target.style.height = e.target.scrollHeight + "px";
                // }}
                />
            </motion.div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="self-end bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl mt-4"
            >
                Submit
            </motion.button>
        </form>

    )
}

export default HeroSection
