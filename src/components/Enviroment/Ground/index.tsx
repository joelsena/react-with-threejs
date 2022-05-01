import { useLoader } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import { useEffect } from 'react'
import { LinearEncoding, RepeatWrapping, Vector2 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export function EnviromentGround() {
    const [normal, roughness] = useLoader(TextureLoader, [
        '/textures/wood_cabinet.jpg',
        '/textures/wood_cabinet_rough.jpg'
    ])

    useEffect(() => {
        ;[normal, roughness].forEach(t => {
            t.wrapS = RepeatWrapping
            t.wrapT = RepeatWrapping
            t.repeat.set(5, 5)

            t.encoding = LinearEncoding
        })
    }, [normal, roughness])

    return (
        <mesh rotation-x={-Math.PI * 0.5}>
            <planeGeometry args={[8, 10]} />
            <MeshReflectorMaterial
                normalMap={normal}
                normalScale={new Vector2(0.15, 0.15)}
                roughnessMap={roughness}
                envMapIntensity={0}
                dithering
                color="#351900"
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
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

            {/* <meshLambertMaterial
                map={normal}
                // scale={new Vector2(0.15, 0.15)}
                // roughnessMap={roughness}
                attach="material"
            /> */}
        </mesh>
    )
}
