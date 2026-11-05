import espiralMarcaAsset from "@/assets/espiral-marca.png.asset.json";

/**
 * Símbolo gráfico de Noralma: espiral botánica que se vuelve rama.
 * Es un elemento decorativo; el logotipo tipográfico "Noralma" sigue
 * siendo la identidad principal de la marca.
 */
export function EspiralMarca({ className = "size-11" }: { className?: string }) {
  return (
    <img
      src={espiralMarcaAsset.url}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      loading="lazy"
      className={className}
    />
  );
}
