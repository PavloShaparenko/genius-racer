declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
