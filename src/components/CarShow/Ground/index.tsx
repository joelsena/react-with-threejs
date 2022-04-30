import { MeshReflectorMaterial } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect } from 'react'
import { LinearEncoding, RepeatWrapping, TextureLoader, Vector2 } from 'three'

export function Ground() {
    const [roughness, normal] = useLoader(TextureLoader, [
        '/textures/terrain-roughness.jpg',
        '/textures/terrain-normal.jpg'
    ])

    useEffect(() => {
        ;[normal, roughness].forEach(t => {
            t.wrapS = RepeatWrapping
            t.wrapT = RepeatWrapping
            t.repeat.set(5, 5)
        })

        normal.encoding = LinearEncoding
    }, [normal, roughness])

    useFrame(state => {
        let t = -state.clock.getElapsedTime() * 0.828
        roughness.offset.set(0, t % 1)
        normal.offset.set(0, t % 1)
    })

    // rotation-x = mesh.rotation.x
    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            <planeGeometry args={[30, 30]} />
            {/* Material que possibilita refletir todos os objetos da cena */}
            <MeshReflectorMaterial
                normalMap={normal}
                normalScale={new Vector2(0.15, 0.15)}
                roughnessMap={roughness}
                envMapIntensity={0}
                dithering
                color={[0.015, 0.015, 0.015]}
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
                reflectorOffset={0.2}
                mirror={0}
            />
        </mesh>
    )
}
