import React, { ComponentProps } from "react";
import { preloadImg } from "./data/imgResource";
import { useResource } from "./data/resource";

export function Image(
  props: { src: string } & Omit<
    ComponentProps<"img">,
    "src"
  >
) {
  const imgResource = useResource(props.src, src =>
    preloadImg(src)
  );
  const src = imgResource.data;

  return <img {...props} src={src} />;
}
