"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Create a dynamic gradient background
    float t = uTime * 0.5;
    
    vec3 color1 = vec3(0.1, 0.1, 0.2); // Dark blue/purple
    vec3 color2 = vec3(0.9, 0.4, 0.6); // Pink/orange
    vec3 color3 = vec3(0.2, 0.8, 0.9); // Cyan
    
    float noise = sin(uv.x * 10.0 + t) * cos(uv.y * 10.0 + t);
    
    vec3 finalColor = mix(color1, color2, sin(uv.x + t) * 0.5 + 0.5);
    finalColor = mix(finalColor, color3, cos(uv.y - t) * 0.5 + 0.5);
    
    // Add some "grain" or movement
    finalColor += noise * 0.05;
    
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
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
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

export function ShaderLanding() {
    return (
        <div className="w-full h-full relative">
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
            <Canvas className="w-full h-full block bg-black">
                <GradientPlane />
            </Canvas>
        </div>
    );
}
