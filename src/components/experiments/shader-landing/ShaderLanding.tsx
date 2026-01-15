"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

// Classic Perlin 2D Noise
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid issues with too large integer values
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
    vec4 gy = abs(gx) - 0.5 ;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 f = fade(vec2(fx.x, fy.x));
    vec4 n = mix(vec4(n00, n10, n01, n11), vec4(n01, n11, n00, n10), f.x);
    return 2.3 * mix(n.x, n.y, f.y);
}

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float time = uTime;
    
    // Dynamic gradient background composition
    vec3 color1 = vec3(0.1, 0.1, 0.2); // Base: Dark blue/purple
    vec3 color2 = vec3(0.9, 0.4, 0.6); // Accent: Pink/orange
    vec3 color3 = vec3(0.2, 0.8, 0.9); // Highlight: Cyan

    float noise1 = cnoise(uv * 3.0 + time * 0.2);
    float noise2 = cnoise(uv * 5.0 - time * 0.3);

    vec3 finalColor = mix(color1, color2, smoothstep(-0.5, 0.5, noise1));
    finalColor = mix(finalColor, color3, smoothstep(-0.5, 0.5, noise2) * 0.5);

    // Apply film grain texture and motion
    float grain = cnoise(uv * 50.0 + time * 5.0);
    finalColor += grain * 0.05;

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const VertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function GradientPlane() {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(0, 0) }
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={[10, 10, 1]}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                fragmentShader={FragmentShader}
                vertexShader={VertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

const StaticOverlay = (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-white tracking-tighter mb-4 drop-shadow-lg">
                Shader Experiments
            </h1>
            <p className="text-white/80 text-xl font-light">
                WebGL powered backgrounds.
            </p>
        </div>
    </div>
);

export function ShaderLanding() {
    return (
        <div className="w-full h-full relative">
            {StaticOverlay}
            <Canvas className="w-full h-full block bg-black">
                <GradientPlane />
            </Canvas>
        </div>
    );
}
