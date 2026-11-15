import * as THREE from "three";

/**
 * Traverses an Object3D hierarchy and properly disposes of all geometries,
 * materials (and their textures), and render targets to prevent WebGL GPU memory leaks.
 */
export function disposeThreeHierarchy(root: THREE.Object3D): void {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
      if (obj.geometry) {
        obj.geometry.dispose();
      }

      const disposeMaterial = (mat: THREE.Material) => {
        // Dispose any associated textures
        for (const value of Object.values(mat)) {
          if (value && typeof value === "object" && "isTexture" in value && value.isTexture) {
            (value as THREE.Texture).dispose();
          }
        }
        mat.dispose();
      };

      if (Array.isArray(obj.material)) {
        obj.material.forEach(disposeMaterial);
      } else if (obj.material) {
        disposeMaterial(obj.material);
      }
    }
  });
}
