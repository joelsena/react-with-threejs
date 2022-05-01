import { MeshProps, useLoader, Vector3 } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export function Moon(props: { position?: Vector3 }) {
    const moonMap = useLoader(TextureLoader, '/textures/moon.jpg')

    return (
        <Sphere
            visible
            args={[1, 100, 200]}
            scale={0.5}
            position={props.position}
            rotation-y={-Math.PI * 0.6}
            rotation-z={-Math.PI * 0.05}
        >
            <meshLambertMaterial attach="material" map={moonMap} />
        </Sphere>
    )
}
