function importAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

const contentAssets = require.context(
  "../content",
  true,
  /\.(png|jpe?g|gif|svg|webp|mp4|webm)$/
);
const content2Assets = require.context(
  "../content2",
  true,
  /\.(png|jpe?g|gif|svg|webp|mp4|webm)$/
);
const content3Assets = require.context(
  "../content3",
  true,
  /\.(png|jpe?g|gif|svg|webp|mp4|webm)$/
);

const allAssets = [
  ...importAll(contentAssets),
  ...importAll(content2Assets),
  ...importAll(content3Assets),
];

export function preloadAssets() {
  return new Promise(async (resolve) => {
    try {
      const loadPromises = allAssets.map((src) => {
        return new Promise((res) => {
          if (typeof src !== "string") return res();

          if (/\.(mp4|webm)$/i.test(src)) {
            const video = document.createElement("video");
            video.src = src;
            video.preload = "auto";
            video.muted = true;

            video.addEventListener(
              "canplaythrough",
              () => {
                res();
              },
              { once: true }
            );
            video.addEventListener(
              "error",
              () => {
                console.warn("Video failed:", src);
                res();
              },
              { once: true }
            );
          } else {
            const img = new Image();
            img.src = src;
            img.onload = () => res();
            img.onerror = () => res();
          }
        });
      });

      await Promise.all(loadPromises);
      resolve();
    } catch (error) {
      console.error("Error preloading assets:", error);
      resolve();
    }
  });
}
