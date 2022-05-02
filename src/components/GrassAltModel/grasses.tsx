import { GrassAltModel } from '.'

export function Grasses() {
    let arr = []

    for (let i = 0; i < 10; i++) arr.push(0)

    const randomPos = Math.random() * 2

    console.log(arr)

    return (
        <>
            {arr.map((s, i) => (
                <GrassAltModel
                    key={i}
                    position={[Math.random() * 2 - 1, 0, Math.random() * 4 - 1]}
                    // position={[0, 0, 0]}
                />
            ))}
        </>
    )
}
