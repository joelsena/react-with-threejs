import { MeshReflectorMaterial, RoundedBox } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { LinearEncoding, RepeatWrapping, TextureLoader, Vector2 } from 'three'

function Curb({ position }: { position: [number, number, number] }) {
    const [normal, roughness] = useLoader(TextureLoader, [
        '/textures/terrain-normal.jpg',
        '/textures/terrain-roughness.jpg'
    ])

    useEffect(() => {
        ;[normal, roughness].forEach(text => {
            text.wrapS = RepeatWrapping
            text.wrapT = RepeatWrapping

            text.encoding = LinearEncoding
        })
    }, [normal, roughness])

    return (
        <RoundedBox args={[0.3, 0.2, 1]} castShadow position={position}>
            <MeshReflectorMaterial
                normalMap={normal}
                normalScale={new Vector2(1, 1)}
                roughnessMap={roughness}
                envMapIntensity={0}
                dithering
                color={[0.05, 0.05, 0.05]}
                roughness={0.9}
                blur={[200, 400]}
                mixBlur={20}
                mixStrength={50}
                mixContrast={1}
                resolution={1024}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={0.9}
                depthToBlurRatioBias={0.25}
                mirror={0}
            />
        </RoundedBox>
    )
}

export function Curbs(props: JSX.IntrinsicElements['group']) {
    const [arr] = useState(() => {
        let a = []
        for (let i = 0; i < 8; i++) a.push(0)
        return a
    })

    return (
        <group {...props}>
            {arr.map((e, i) => (
                <Curb key={i} position={[0, 0.2, i + 1.5]} />
            ))}
        </group>
    )
}
