import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color } from 'three'

export function Rings() {
    const itemsRef = useRef([])

    useFrame(state => {
        const elapsed = state.clock.getElapsedTime()

        itemsRef.current.forEach((mesh, i) => {
            let z = (i - 7) * 3.5 + ((elapsed * 1) % 3.5) * 2
            // [-7, 6]
            const dist = Math.abs(z)

            // vamos controlar o scale dos anéis
            const decresingValue = 1 - dist * 0.04
            // Setando a distância dos anéis
            // Ao momento que a distância aumenta o scale diminui o anel
            mesh.position.set(0, 0, -z)
            mesh.scale.set(decresingValue, decresingValue, decresingValue)

            // Quanto mais longe for o anél menor será a intensidade da cor
            let colorScale = 1
            if (dist > 2) {
                colorScale = 1 - (Math.min(dist, 12) - 2) / 10
            }
            colorScale *= 0.5

            // changing color
            if (i % 2 === 0) {
                // even
                mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(
                    colorScale
                )
            } else {
                // odd
                mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(
                    colorScale
                )
            }
        })
    })

    return (
        <>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
                <mesh
                    castShadow
                    receiveShadow
                    position={[0, 0, 0]}
                    key={i}
                    ref={el => (itemsRef.current[i] = el)}
                >
                    <torusGeometry args={[3.35, 0.05, 16, 100]} />
                    {/* emissive faz com que o material se pareça com uma fonte de luz */}
                    {/* E seu conteúdo é a cor da fonte de luz */}
                    <meshStandardMaterial
                        emissive={[0.5, 0.5, 0.5]}
                        color={[0, 0, 0]}
                    />
                </mesh>
            ))}
        </>
    )
}
