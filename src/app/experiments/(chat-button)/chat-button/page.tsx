"use client";

import dynamic from "next/dynamic";

const ChatSendButton = dynamic(() => import("@/components/experiments/chat-send-button/ChatSendButton").then(mod => mod.ChatSendButton), {
    ssr: false,
    loading: () => <div className="w-8 h-8 rounded-lg bg-zinc-800 animate-pulse" />
});

export default function ChatButtonPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900/50 p-8 ring-1 ring-inset ring-white/10">
                <div className="space-y-2 text-center">
                    <h2 className="text-xl font-medium tracking-tight text-white">Chat Interaction</h2>
                    <p className="text-sm text-zinc-400">Try typing a message and sending it.</p>
                </div>

                <div className="relative">
                    <ChatSendButton />
                </div>
            </div>
        </div>
    );
}
