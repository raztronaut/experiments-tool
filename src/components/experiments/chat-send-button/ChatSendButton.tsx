"use client";

import * as React from "react";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ChatSendButton() {
    const [inputValue, setInputValue] = React.useState("");
    const [isHovered, setIsHovered] = React.useState(false);
    const [isSending, setIsSending] = React.useState(false);

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        setIsSending(true);
        // Mock network request delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSending(false);
        setInputValue("");
    };

    return (
        <div className="w-full max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl overflow-hidden">
            <div className="relative flex items-end gap-2 bg-zinc-950/50 p-1.5 rounded-xl border border-zinc-800/50 focus-within:ring-1 focus-within:ring-white/20 transition-all duration-300">
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 resize-none outline-none py-2.5 px-3 min-h-[44px] max-h-32"
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />

                <div className="pb-1 pr-1">
                    <motion.button
                        onClick={handleSend}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        disabled={!inputValue.trim() || isSending}
                        className={cn(
                            "relative group flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                            inputValue.trim()
                                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        )}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            {isSending ? (
                                <motion.div
                                    key="sending"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="send-icon"
                                    className="relative"
                                    animate={{
                                        x: isHovered && inputValue.trim() ? 2 : 0,
                                        y: isHovered && inputValue.trim() ? -2 : 0
                                    }}
                                >
                                    <Send className="w-4 h-4" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Glow effect on hover when active */}
                        {inputValue.trim() && !isSending ? (
                            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/20 blur-md -z-10" />
                        ) : null}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
