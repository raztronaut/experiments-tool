"use client";

import dynamic from "next/dynamic";

const ShaderLanding = dynamic(() => import("@/components/experiments/shader-landing/ShaderLanding").then(mod => mod.ShaderLanding), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black animate-pulse" />
});

export default function ShaderLandingPage() {
    return (
        <div className="w-full h-screen overflow-hidden bg-black">
            <ShaderLanding />
        </div>
    );
}
