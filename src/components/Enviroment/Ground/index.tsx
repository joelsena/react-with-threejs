import { useLoader } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import { useEffect } from 'react'
import { LinearEncoding, RepeatWrapping, Vector2 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Grasses } from '../../GrassAltModel/grasses'

function Road() {
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

function GrassGround(props: JSX.IntrinsicElements['group']) {
    const grassMap = useLoader(TextureLoader, '/textures/grass.jpg')

    useEffect(() => {
        grassMap.wrapS = RepeatWrapping
        grassMap.wrapT = RepeatWrapping
        grassMap.repeat.set(1, 1)

        grassMap.encoding = LinearEncoding
    }, [grassMap])

    return (
        <group {...props}>
            <mesh rotation-x={-Math.PI / 2}>
                <planeBufferGeometry args={[2, 8]} />
                <meshLambertMaterial map={grassMap} color={[0.1, 0.1, 0.1]} />
            </mesh>
            <Grasses />
        </group>
    )
}

export function EnviromentGround(props: JSX.IntrinsicElements['group']) {
    return (
        <group {...props}>
            <GrassGround position={[-3.15, 0.005, 0]} />
            <Road />
            <GrassGround position={[3.15, 0.005, 0]} />
        </group>
    )
}
