import {
    OrbitControls,
    PerspectiveCamera,
    Sparkles,
    Stars,
    SpotLight
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import { Suspense } from 'react'

import { Curbs } from '../components/Enviroment/Curb'
import { EnviromentGround } from '../components/Enviroment/Ground'
import { Moon } from '../components/Enviroment/Moon'
import GrassModel from '../components/GrassModel/GrassModel'
import LanternModel from '../components/LanternModel'
import MasterChiefModel from '../components/MasterChiefModel'

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

            <PerspectiveCamera makeDefault fov={60} position={[2, 2, 4]} />

            <color args={[0, 0, 0]} attach="background" />

            <ambientLight intensity={1} />
            <Moon position={[4, 2, -24]} />
            <pointLight intensity={0.05} position={[4, 2, -24]} castShadow />

            {/* <pointLight
                intensity={0.5}
                distance={8}
                position={[0, 4, 0]}
                castShadow
            /> */}

            <LanternModel position={[-3, 0, 0]} />

            <SpotLight
                color="#EDE4C8"
                intensity={1.5}
                distance={8}
                attenuation={4.5}
                position={[-3, 2.7, 0]}
                angle={Math.PI / 8}
                penumbra={0.5}
                anglePower={8}
                castShadow
            />

            <Curbs position={[-2, -0.15, -5]} />
            <Curbs position={[2, -0.15, -5]} />
            <GrassModel position={[1, 1, 1]} />

            {/* <AnyaModel scale={[0.2, 0.2, 0.2]} position={[0, 0, 2]} /> */}
            <MasterChiefModel
                scale={[
                    1 / Math.pow(10, 2),
                    1 / Math.pow(10, 2),
                    1 / Math.pow(10, 2)
                ]}
                // position={[0, 0, 1]}
            />
            {/* <AlternativeMaster
                scale={[
                    1 / Math.pow(10, 2),
                    1 / Math.pow(10, 2),
                    1 / Math.pow(10, 2)
                ]}
                position={[0, 0, 2]}
            /> */}

            <EnviromentGround />
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
