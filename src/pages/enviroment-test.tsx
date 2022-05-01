import {
    ContactShadows,
    OrbitControls,
    PerspectiveCamera,
    Sparkles,
    Stars
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import { Suspense } from 'react'
import { AnyaModel } from '../components/AnyaModel'
import { Box } from '../components/Box'
import AlternativeCorvetteModel from '../components/CarShow/CorvetteModel/alternative'
import { EnviromentGround } from '../components/Enviroment/Ground'
import { Moon } from '../components/Enviroment/Moon'

import styles from '../styles/car.module.css'

function TestScene() {
    return (
        <>
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
            <OrbitControls maxPolarAngle={1.45} />

            <PerspectiveCamera makeDefault fov={40} position={[0.5, 1.2, 5]} />

            <Sparkles
                count={100}
                size={5}
                color="hotpink"
                scale={1.2}
                position={[0, 0.2, 2.1]}
            />

            <color args={[0, 0, 0]} attach="background" />

            <AnyaModel scale={[0.2, 0.2, 0.2]} position={[0, 0, 2]} />
            <ContactShadows
                opacity={1}
                scale={10}
                blur={1}
                far={10}
                resolution={256}
                color="#000000"
                frames={1}
            />
            <Moon position={[12, 4, -24]} />

            <ambientLight intensity={1} />
            <pointLight intensity={0.5} position={[12, 4, -24]} castShadow />

            <EnviromentGround />
            {/* <Box /> */}
        </>
    )
}

export default function Enviroment() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Enviroment Test</title>
            </Head>

            <Suspense fallback={null}>
                <Canvas className={styles.canvas} shadows>
                    <TestScene />
                </Canvas>
            </Suspense>
        </div>
    )
}
