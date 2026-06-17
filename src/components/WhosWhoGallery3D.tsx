import { useEffect, useRef } from "react";
import * as THREE from "three";

const galleryImages = [
  {
    src: "/assets/kingston-beta-community-hub-v2.png",
    label: "Community Hub",
  },
  {
    src: "/assets/kingston-beta-building-learning-v2.png",
    label: "Building + Learning",
  },
  {
    src: "/assets/kingston-beta-live-builder-v2.png",
    label: "Live Builder",
  },
  {
    src: "/assets/kingston-beta-demo-night-slide-v2.png",
    label: "Demo Night",
  },
  {
    src: "/assets/kingston-beta-founder-circle-slide-v2.png",
    label: "Founder Circle",
  },
  {
    src: "/assets/kingston-beta-builder-lab-slide-v2.png",
    label: "Builder Lab",
  },
  {
    src: "/assets/kingston-beta-solutions-workshop-v2.png",
    label: "Solutions Workshop",
  },
  {
    src: "/assets/kingston-beta-kingston-landscape-v2.png",
    label: "Kingston Signal",
  },
];

function fitTextureToPlane(texture: THREE.Texture, planeAspect: number) {
  const image = texture.image as HTMLImageElement | undefined;
  const imageAspect = image?.naturalWidth && image?.naturalHeight
    ? image.naturalWidth / image.naturalHeight
    : planeAspect;

  texture.center.set(0.5, 0.5);

  if (imageAspect > planeAspect) {
    texture.repeat.set(planeAspect / imageAspect, 1);
  } else {
    texture.repeat.set(1, imageAspect / planeAspect);
  }
}

export default function WhosWhoGallery3D() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let width = stage.clientWidth;
    let height = stage.clientHeight;
    let animationFrame = 0;
    const pointer = new THREE.Vector2(0, 0);
    const cameraTarget = new THREE.Vector3(0, 0, 8.6);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 9, 19);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 60);
    camera.position.set(0, 0.25, cameraTarget.z);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(width, height);
    renderer.setClearColor(0x111111, 1);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.dataset.galleryCanvas = "whos-who";
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    stage.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0xafcb27, 18, 18);
    keyLight.position.set(-3.5, 3.5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xffffff, 8, 16);
    fillLight.position.set(5, -2, 5);
    scene.add(fillLight);

    const loader = new THREE.TextureLoader();
    const textureCache = new Map<string, THREE.Texture>();
    const photoGroups: THREE.Group[] = [];
    const materialList: THREE.Material[] = [];
    const geometryList: THREE.BufferGeometry[] = [];

    const makeMaterial = (color: number, opacity = 1) => {
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: opacity < 1,
        opacity,
        side: THREE.DoubleSide,
      });
      materialList.push(material);
      return material;
    };

    const frameMaterial = makeMaterial(0xf7f5f0);
    const limeMaterial = makeMaterial(0xafcb27);
    const shadowMaterial = makeMaterial(0x070707, 0.62);

    const createPlaneGeometry = (w: number, h: number) => {
      const geometry = new THREE.PlaneGeometry(w, h, 12, 8);
      geometryList.push(geometry);
      return geometry;
    };

    const frameGeometry = createPlaneGeometry(1, 1);

    const imageSet = [...galleryImages, ...galleryImages];
    imageSet.forEach((item, index) => {
      const group = new THREE.Group();
      const isTall = index % 5 === 1 || index % 7 === 3;
      const planeW = isTall ? 1.58 : 2.35;
      const planeH = isTall ? 2.34 : 1.58;
      const planeAspect = planeW / planeH;

      const texture = textureCache.get(item.src) ?? loader.load(item.src, (loaded) => {
        loaded.colorSpace = THREE.SRGBColorSpace;
        fitTextureToPlane(loaded, planeAspect);
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      textureCache.set(item.src, texture);

      const imageMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      materialList.push(imageMaterial);

      const imageGeometry = createPlaneGeometry(planeW, planeH);
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.scale.set(planeW + 0.09, planeH + 0.09, 1);
      frame.position.z = -0.018;
      group.add(frame);

      const accent = new THREE.Mesh(frameGeometry, limeMaterial);
      accent.scale.set(planeW + 0.22, planeH + 0.22, 1);
      accent.position.set(index % 2 === 0 ? -0.035 : 0.035, -0.035, -0.035);
      group.add(accent);

      const shadow = new THREE.Mesh(frameGeometry, shadowMaterial);
      shadow.scale.set(planeW + 0.35, planeH + 0.35, 1);
      shadow.position.set(0.16, -0.18, -0.08);
      group.add(shadow);

      const image = new THREE.Mesh(imageGeometry, imageMaterial);
      image.position.z = 0.015;
      group.add(image);

      group.userData = {
        index,
        baseRotation: (index % 4 - 1.5) * 0.055,
        drift: index % 2 === 0 ? 1 : -1,
        lane: index % 3,
      };

      root.add(group);
      photoGroups.push(group);
    });

    const backPlaneGeometry = createPlaneGeometry(42, 18);
    const backPlaneMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f7a3a,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    materialList.push(backPlaneMaterial);
    const backPlane = new THREE.Mesh(backPlaneGeometry, backPlaneMaterial);
    backPlane.position.set(0, -0.45, -3.8);
    scene.add(backPlane);

    const layout = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      const isMobile = width < 720;
      const columns = isMobile ? 4 : 6;
      const gapX = isMobile ? 1.85 : 2.72;
      const gapY = isMobile ? 1.62 : 1.92;
      const startX = -((columns - 1) * gapX) / 2;

      camera.aspect = width / height;
      camera.fov = isMobile ? 42 : 34;
      cameraTarget.z = isMobile ? 10.1 : 8.6;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      photoGroups.forEach((group, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns) % 3;
        const rowDirection = row % 2 === 0 ? 1 : -1;
        const baseX = startX + column * gapX + (rowDirection * 0.28);
        const baseY = (1 - row) * gapY - (isMobile ? 0.35 : 0.15);
        const baseZ = -Math.abs(column - columns / 2) * 0.2 - row * 0.36;

        group.position.set(baseX, baseY, baseZ);
        group.scale.setScalar(isMobile ? 0.78 : 1);
        group.userData.baseX = baseX;
        group.userData.baseY = baseY;
        group.userData.baseZ = baseZ;
        group.userData.rowDirection = rowDirection;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const onResize = () => layout();

    const render = (timeMs: number) => {
      const time = timeMs * 0.001;

      camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.045;
      camera.position.y += (0.25 + pointer.y * 0.28 - camera.position.y) * 0.045;
      camera.position.z += (cameraTarget.z - camera.position.z) * 0.04;
      camera.lookAt(0, -0.06, 0);

      root.rotation.y = pointer.x * 0.055;
      root.rotation.x = -pointer.y * 0.025;

      photoGroups.forEach((group) => {
        const index = group.userData.index as number;
        const direction = group.userData.rowDirection as number;
        const baseX = group.userData.baseX as number;
        const baseY = group.userData.baseY as number;
        const baseZ = group.userData.baseZ as number;
        const phase = time * (0.28 + (index % 5) * 0.018) + index * 0.56;

        group.position.x = baseX + Math.sin(phase) * 0.16 * direction;
        group.position.y = baseY + Math.cos(phase * 0.8) * 0.08;
        group.position.z = baseZ + Math.sin(phase * 0.72) * 0.2;
        group.rotation.y = (group.userData.baseRotation as number) + Math.sin(phase) * 0.055;
        group.rotation.x = Math.cos(phase * 0.7) * 0.018;
      });

      keyLight.position.x = -3.5 + Math.sin(time * 0.45) * 1.2;
      keyLight.position.y = 3.5 + Math.cos(time * 0.38) * 0.55;

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    layout();
    stage.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      stage.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.domElement.remove();
      textureCache.forEach((texture) => texture.dispose());
      materialList.forEach((material) => material.dispose());
      geometryList.forEach((geometry) => geometry.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <main className="min-h-screen bg-editorial text-warm">
      <section
        ref={stageRef}
        className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-editorial"
        aria-label="Cinematic Who's Who photo gallery"
      >
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_68%_18%,rgba(175,203,39,0.16),transparent_32%),linear-gradient(180deg,rgba(17,17,17,0.16)_0%,rgba(17,17,17,0.04)_42%,rgba(17,17,17,0.92)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-52 bg-gradient-to-b from-editorial via-editorial/76 to-transparent" />

        <div className="relative z-30 mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1700px] flex-col justify-between px-4 pb-6 pt-12 sm:px-6 lg:px-12 lg:pb-10 lg:pt-16">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-5 inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial">
                Who's Who
              </p>
              <h1 className="max-w-5xl font-display text-5xl font-extrabold leading-[0.92] sm:text-6xl lg:text-8xl">
                <span style={{ textShadow: "0 8px 30px rgba(0,0,0,0.72)" }}>
                  Every photo here is a timestamp.
                </span>
              </h1>
            </div>
            <div
              className="max-w-2xl border-l-4 border-[#AFCB27] pl-6 text-lg font-semibold leading-relaxed text-warm/82 sm:text-xl"
              style={{ textShadow: "0 4px 18px rgba(0,0,0,0.72)" }}
            >
              <p>
                Someone met their co-founder. Someone pitched for the first
                time. Someone came back for the hundredth time.
              </p>
              <p className="mt-4">
                A lot of people should be able to see themselves, their
                colleagues, and their friends in this archive.
              </p>
            </div>
          </div>

          <div className="grid gap-3 pb-2 text-editorial sm:grid-cols-3 lg:w-[58rem]">
            {[
              ["19 years", "of showing up"],
              ["300+ events", "across rooms and stages"],
              ["One archive", "for members and attendees"],
            ].map(([value, label]) => (
              <div key={value} className="bg-[#AFCB27] px-4 py-3">
                <p className="font-display text-3xl font-extrabold leading-none">
                  {value}
                </p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-editorial/62">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAF7] px-4 py-16 text-editorial sm:px-6 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="mb-5 inline-flex bg-editorial px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-warm">
              Photo Album Pics
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[0.96] sm:text-5xl">
              A gallery that elevates members and attendees to Who's Who.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Founders", "People who brought ideas into the room and found pressure, support, and momentum."],
              ["Builders", "Developers, creatives, operators, and digital business owners who made the scene visible."],
              ["Community", "Friends, colleagues, speakers, partners, and repeat attendees across the archive."],
            ].map(([title, copy]) => (
              <article key={title} className="border border-editorial/10 bg-white p-5">
                <h3 className="font-display text-3xl font-extrabold">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-editorial/62">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
