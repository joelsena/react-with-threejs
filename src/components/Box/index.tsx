import { MeshProps, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import texture from "../../assets/textures/metal_container_texture.jpg";

interface BoxProps extends MeshProps {
  materialType?: "lambert" | "texture" | "normal";
}

export function Box({ materialType = "lambert", ...rest }: BoxProps) {
  const colorMap = useLoader(TextureLoader, texture["src"]);

  return (
    <mesh {...rest}>
      {/* mesh é uma classe  que representa uma malha poligonal(ou mesh polygon) */}
      {/* In 3D computer graphics and solid modeling, a polygon mesh is a collection of vertices, edges and faces that defines the shape of a polyhedral object. */}
      {/* É composto por um geometry e um material */}
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      {materialType === "lambert" && (
        <meshLambertMaterial attach="material" color="pink" />
      )}
      {materialType === "texture" && (
        <meshStandardMaterial map={colorMap} attach="material" />
      )}

      {/* Material que mudar de cor dependendo da incidência da luz */}
      {materialType === "normal" && <meshNormalMaterial attach="material" />}
    </mesh>
  );
}
