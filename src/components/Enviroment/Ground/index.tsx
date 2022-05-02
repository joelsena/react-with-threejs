import { useLoader } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import { useEffect } from 'react'
import { LinearEncoding, RepeatWrapping, Vector2 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export function EnviromentGround() {
    const [normal, roughness, albedo] = useLoader(TextureLoader, [
        '/textures/terrain-normal.jpg',
        '/textures/terrain-roughness.jpg',
        '/textures/road_albedo.jpg'
    ])

    useEffect(() => {
        ;[normal, roughness, albedo].forEach(t => {
            t.wrapS = RepeatWrapping
            t.wrapT = RepeatWrapping
            t.repeat.set(1, 1)

            t.encoding = LinearEncoding
        })
    }, [normal, roughness, albedo])

    return (
        <mesh
            // rotation-y={-Math.PI / 2}
            rotation-x={-Math.PI / 2}
            rotation-z={-Math.PI / 2}
            receiveShadow
        >
            <planeGeometry args={[8, 8]} />
            <MeshReflectorMaterial
                normalMap={normal}
                normalScale={new Vector2(0.5, 0.5)}
                roughnessMap={roughness}
                envMapIntensity={0}
                dithering
                map={albedo}
                color={[0.05, 0.05, 0.05]}
                roughness={0.5}
                blur={[200, 400]}
                mixBlur={20}
                mixStrength={50}
                mixContrast={1}
                resolution={1024}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={0.9}
                depthToBlurRatioBias={0.25}
                // debug={0}
                // reflectorOffset={0.2}
                mirror={0}
            />

            {/* <meshLambertMaterial map={albedo} color={[0.5, 0.5, 0.5]} /> */}
        </mesh>
    )
}
