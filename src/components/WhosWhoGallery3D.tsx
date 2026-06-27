import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

type GalleryItem = {
  src: string;
  label: string;
  caption: string;
  width: number;
  height: number;
  bg: number;
};

const galleryItems: GalleryItem[] = [
  {
    src: "/assets/whos-who/networking-conversation.png",
    label: "Ingrid Hosting Early Kingston BETA",
    caption:
      "A young Ingrid Riley hosting one of the first Kingston BETA events, bringing founders, technologists, and curious builders into the same room.",
    width: 4.85,
    height: 3.62,
    bg: 0x2f3028,
  },
  {
    src: "/assets/whos-who/christopher-karin-holta.png",
    label: "Christopher & Karin",
    caption:
      "Early Birds Christopher & Karin were the first winners of the night — taking home access passes to all #KgnBeta events for the remainder of the year.",
    width: 3.2,
    height: 4.28,
    bg: 0x2a2c2e,
  },
  {
    src: "/assets/whos-who/seminar-audience.png",
    label: "In the Room",
    caption:
      "Attendees like Sherry absorbed in a Kingston BETA seminar session — learning, listening, and building together.",
    width: 4.85,
    height: 2.7,
    bg: 0x2c3030,
  },
  {
    src: "/assets/whos-who/marc-ricardo-collaboration.png",
    label: "Marc & Ricardo",
    caption:
      "Marc and Ricardo (@RICKMAN) collaborating over a laptop at a tech meetup — builders sharing ideas shoulder to shoulder.",
    width: 4.85,
    height: 3.62,
    bg: 0x272b2b,
  },
  {
    src: "/assets/whos-who/community-participants.png",
    label: "Community Session",
    caption:
      "Two members engaged at a Kingston BETA workshop — thoughtful, focused, and fully present in the room.",
    width: 3.8,
    height: 3.8,
    bg: 0x313633,
  },
  {
    src: "/assets/whos-who/ac-lounge-networking.png",
    label: "AC Lounge Evening",
    caption:
      "Professionals in conversation at the AC Lounge during an evening networking event — serious talk, warm atmosphere.",
    width: 3.8,
    height: 3.71,
    bg: 0x1a2d26,
  },
  {
    src: "/assets/whos-who/events-full-house.png",
    label: "Full House",
    caption:
      "A packed room at a Kingston BETA event — attendees capturing the moment as new features and ideas take the stage.",
    width: 4.85,
    height: 3.64,
    bg: 0x242d31,
  },
  {
    src: "/assets/whos-who/jampro-registration.png",
    label: "Kingston BETA Check-In",
    caption:
      "Kingston BETA attendees checking in before the room fills with founders, builders, investors, and first conversations.",
    width: 4.85,
    height: 3.63,
    bg: 0x2e3125,
  },
  {
    src: "/assets/whos-who/more-good-jobs-book.png",
    label: "Lucky Seat Winners",
    caption:
      "Lucky seat winners took home a copy of More Good Jobs and tickets to future #KgnBeta events.",
    width: 4.85,
    height: 3.63,
    bg: 0x102b35,
  },
  {
    src: "/assets/whos-who/kaseith-pegasus-jamaica.png",
    label: "Kingston BETA Speaker Session",
    caption:
      "A Kingston BETA speaker sharing ideas with the community, turning the stage into a place for learning and connection.",
    width: 4.0,
    height: 3.53,
    bg: 0x2c2325,
  },
];



function fitTexture(texture: THREE.Texture, planeAspect: number) {
  const image = texture.image as HTMLImageElement | undefined;
  const imageAspect =
    image?.naturalWidth && image?.naturalHeight
      ? image.naturalWidth / image.naturalHeight
      : planeAspect;

  texture.center.set(0.5, 0.5);
  if (imageAspect > planeAspect) {
    texture.repeat.set(planeAspect / imageAspect, 1);
  } else {
    texture.repeat.set(1, imageAspect / planeAspect);
  }
}

type WhosWhoGallery3DProps = {
  onGalleryModeChange?: (isGalleryMode: boolean) => void;
};

export default function WhosWhoGallery3D({
  onGalleryModeChange,
}: WhosWhoGallery3DProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const selectedIndexRef = useRef<number>(-1);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  const handleCloseFocus = () => {
    setSelectedItem(null);
    selectedIndexRef.current = -1;
  };

  useEffect(() => {
    onGalleryModeChange?.(isGalleryOpen);

    return () => onGalleryModeChange?.(false);
  }, [isGalleryOpen, onGalleryModeChange]);

  const openGallery = () => {
    if (isTransitioning || isGalleryOpen) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsGalleryOpen(true);
      return;
    }

    setIsTransitioning(true);
    const timeline = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        window.setTimeout(() => {
          setIsGalleryOpen(true);
          window.setTimeout(() => {
            gsap.to(transitionRef.current, {
              scaleY: 0,
              transformOrigin: "top",
              duration: 0.72,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(transitionRef.current, {
                  autoAlpha: 0,
                  scaleY: 0,
                });
                setIsTransitioning(false);
              },
            });
          }, 80);
        }, 40);
      },
    });

    timeline
      .to(introRef.current, { autoAlpha: 0, scale: 1.018, duration: 0.68 })
      .fromTo(
        transitionRef.current,
        { autoAlpha: 1, scaleY: 0, transformOrigin: "bottom" },
        { autoAlpha: 1, scaleY: 1, duration: 0.82 },
        0.08,
      );
  };

  const goHome = () => {
    if (isTransitioning) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      handleCloseFocus();
      setIsGalleryOpen(false);
      window.scrollTo(0, 0);
      return;
    }

    setIsTransitioning(true);
    handleCloseFocus();
    gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          setIsGalleryOpen(false);
          window.history.replaceState(null, "", "#who");
          window.scrollTo(0, 0);
          window.requestAnimationFrame(() => {
            gsap.to(transitionRef.current, {
              scaleY: 0,
              transformOrigin: "bottom",
              duration: 0.72,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(transitionRef.current, { autoAlpha: 0, scaleY: 0 });
                setIsTransitioning(false);
              },
            });
          });
        },
      })
      .to(stageRef.current, {
        autoAlpha: 0,
        scale: 0.992,
        duration: 0.48,
      })
      .fromTo(
        transitionRef.current,
        { autoAlpha: 0, scaleY: 0, transformOrigin: "top" },
        { autoAlpha: 1, scaleY: 1, duration: 0.5 },
        0,
      );
  };

  useEffect(() => {
    if (isGalleryOpen) return;

    const intro = introRef.current;
    if (!intro) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) {
      gsap.set(intro, { clearProps: "all", autoAlpha: 1 });
      gsap.set(intro.querySelectorAll("[data-who-intro-item]"), {
        clearProps: "all",
        autoAlpha: 1,
      });
      gsap.set(transitionRef.current, { clearProps: "all", scaleY: 0 });
      return;
    }

    if (!isTransitioning) {
      gsap.set(transitionRef.current, { autoAlpha: 0, scaleY: 0 });
    }
    gsap.fromTo(
      intro.querySelectorAll("[data-who-intro-image]"),
      { scale: 1.075, opacity: 0.48 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
      },
    );
    gsap.fromTo(
      intro.querySelectorAll("[data-who-intro-item]"),
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.085,
        ease: "power3.out",
      },
    );
  }, [isGalleryOpen]);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const stage = stageRef.current;
    if (!stage) return;
    gsap.fromTo(
      stage,
      { autoAlpha: 0, scale: 1.012 },
      { autoAlpha: 1, scale: 1, duration: 0.82, ease: "power3.out" },
    );

    let width = stage.clientWidth;
    let height = stage.clientHeight;
    let frame = 0;
    let scroll = 0;
    let targetScroll = 0;
    let isDragging = false;
    let lastDragY = 0;
    let dragDistance = 0;
    const pointer = new THREE.Vector2(0, 0);
    const mouse = new THREE.Vector2(20, 20);
    const currentBg = new THREE.Color(0x333838);
    const targetBg = new THREE.Color(0x333838);
    const raycaster = new THREE.Raycaster();
    const objects: Array<{
      group: THREE.Group;
      plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
      material: THREE.MeshBasicMaterial;
      base: GalleryItem;
      scale: number;
    }> = [];
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const textures: THREE.Texture[] = [];

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x333838, 8, 22);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 60);
    camera.position.set(0, 0, 9.2);

    const getLayoutSettings = () => {
      const compact = width < 640;
      const tablet = width >= 640 && width < 1024;

      if (compact) {
        return {
          baseScale: 0.42,
          selectedMultiplier: 1.38,
          nearMultiplier: 0.82,
          midMultiplier: 0.68,
          farMultiplier: 0.58,
          gap: 0.015,
        };
      }

      if (tablet) {
        return {
          baseScale: 0.62,
          selectedMultiplier: 1.34,
          nearMultiplier: 0.7,
          midMultiplier: 0.56,
          farMultiplier: 0.48,
          gap: 0.018,
        };
      }

      return {
        baseScale: 0.84,
        selectedMultiplier: 1.38,
        nearMultiplier: 0.58,
        midMultiplier: 0.46,
        farMultiplier: 0.38,
        gap: 0.02,
      };
    };

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.setClearColor(0x333838, 1);
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    renderer.domElement.dataset.galleryCanvas = "whos-who-vertical";
    renderer.domElement.setAttribute("aria-hidden", "true");
    stage.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);
    scene.add(new THREE.AmbientLight(0xffffff, 1.55));

    const loader = new THREE.TextureLoader();
    const shadowMaterial = new THREE.MeshBasicMaterial({
      color: 0x101313,
      transparent: true,
      opacity: 0.32,
      side: THREE.DoubleSide,
    });
    materials.push(shadowMaterial);

    galleryItems.forEach((item, index) => {
      const geometry = new THREE.PlaneGeometry(item.width, item.height);
      const shadowGeometry = new THREE.PlaneGeometry(
        item.width + 0.08,
        item.height + 0.08,
      );
      geometries.push(geometry, shadowGeometry);

      const texture = loader.load(item.src, (loaded) => {
        loaded.colorSpace = THREE.SRGBColorSpace;
        fitTexture(loaded, item.width / item.height);
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.push(texture);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide,
      });
      materials.push(material);

      const group = new THREE.Group();
      const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
      shadow.position.set(0.12, -0.12, -0.08);
      group.add(shadow);

      const plane = new THREE.Mesh(geometry, material);
      group.add(plane);

      group.userData.index = index;
      root.add(group);

      objects.push({
        group,
        plane,
        material,
        base: item,
        scale: 1,
      });
    });

    const updatePointerPosition = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointerPosition(event);

      if (isDragging) {
        const deltaY = event.clientY - lastDragY;
        dragDistance += Math.abs(deltaY);
        targetScroll += deltaY * 0.012;
        lastDragY = event.clientY;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-gallery-control]")) return;

      updatePointerPosition(event);
      isDragging = true;
      lastDragY = event.clientY;
      dragDistance = 0;
      stage.setPointerCapture(event.pointerId);
    };

    const onPointerUp = (event: PointerEvent) => {
      const wasClick = isDragging && dragDistance < 8;
      isDragging = false;
      if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
      }

      if (!wasClick) return;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(
        objects.map((entry) => entry.plane),
        false,
      );
      const stableHit = hits.find((hit) => {
        const uv = hit.uv;
        return (
          uv &&
          uv.x > 0.035 &&
          uv.x < 0.965 &&
          uv.y > 0.035 &&
          uv.y < 0.965
        );
      });
      const hitIndex = stableHit
        ? objects.findIndex((entry) => entry.plane === stableHit.object)
        : -1;
      selectedIndexRef.current = hitIndex;
      setSelectedItem(hitIndex >= 0 ? objects[hitIndex].base : null);

      if (hitIndex >= 0) {
        const layout = getLayoutSettings();
        const visibleHeight =
          2 *
          camera.position.z *
          Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
        const topEdge = visibleHeight * 0.5 + 0.08;
        const targetScales = objects.map((_, index) => {
          const distance = Math.min(
            Math.abs(index - hitIndex),
            objects.length - Math.abs(index - hitIndex),
          );

          if (distance === 0) {
            return layout.baseScale * layout.selectedMultiplier;
          }
          if (distance === 1) {
            return layout.baseScale * layout.nearMultiplier;
          }
          if (distance === 2) {
            return layout.baseScale * layout.midMultiplier;
          }
          return layout.baseScale * layout.farMultiplier;
        });
        const rowHeights = objects.map(
          (entry, index) => entry.base.height * targetScales[index],
        );
        const totalHeight = rowHeights.reduce(
          (sum, rowHeight) => sum + rowHeight + layout.gap,
          0,
        );
        const precedingHeight = rowHeights
          .slice(0, hitIndex)
          .reduce((sum, rowHeight) => sum + rowHeight + layout.gap, 0);
        const centeredScroll =
          precedingHeight + rowHeights[hitIndex] * 0.5 - topEdge;
        const cycles = Math.round((targetScroll - centeredScroll) / totalHeight);

        targetScroll = centeredScroll + cycles * totalHeight;
      }
    };

    const onPointerLeave = () => {
      isDragging = false;
      mouse.set(20, 20);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetScroll += event.deltaY * 0.006;
    };

    const onResize = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      camera.aspect = width / height;
      camera.fov = width < 640 ? 48 : width < 1024 ? 41 : 34;
      camera.position.z = width < 640 ? 8.8 : width < 1024 ? 8.9 : 9.2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const animate = () => {
      const selectedIndex = selectedIndexRef.current;
      targetScroll += selectedIndex >= 0 || isDragging ? 0 : 0.0009;
      scroll += (targetScroll - scroll) * 0.075;

      targetBg.set(
        selectedIndex >= 0 ? objects[selectedIndex].base.bg : 0x333838,
      );

      currentBg.lerp(targetBg, 0.06);
      renderer.setClearColor(currentBg, 1);
      scene.fog?.color.copy(currentBg);
      stage.style.backgroundColor = `#${currentBg.getHexString()}`;

      camera.position.x += (pointer.x * 0.02 - camera.position.x) * 0.035;
      camera.position.y += (pointer.y * 0.02 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      const layout = getLayoutSettings();
      const visibleHeight =
        2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
      const visibleWidth = visibleHeight * camera.aspect;
      const topEdge = visibleHeight * 0.5 + 0.08;

      objects.forEach((entry, index) => {
        const distance =
          selectedIndex < 0
            ? 0
            : Math.min(
                Math.abs(index - selectedIndex),
                objects.length - Math.abs(index - selectedIndex),
              );
        const targetScale =
          selectedIndex < 0
            ? layout.baseScale
            : distance === 0
              ? layout.baseScale * layout.selectedMultiplier
              : distance === 1
                ? layout.baseScale * layout.nearMultiplier
                : distance === 2
                  ? layout.baseScale * layout.midMultiplier
                  : layout.baseScale * layout.farMultiplier;
        entry.scale += (targetScale - entry.scale) * 0.12;
        entry.material.opacity +=
          ((selectedIndex >= 0 && distance > 0 ? 0.74 : 0.98) -
            entry.material.opacity) *
          0.08;
      });

      const rowHeights = objects.map((entry) => entry.base.height * entry.scale);
      const totalHeight = rowHeights.reduce(
        (sum, rowHeight) => sum + rowHeight + layout.gap,
        0,
      );
      const normalizedScroll = ((scroll % totalHeight) + totalHeight) % totalHeight;

      let cursor = -normalizedScroll;
      objects.forEach((entry, index) => {
        const itemHeight = rowHeights[index];
        let y = topEdge - cursor - itemHeight * 0.5;
        while (y > visibleHeight * 0.5 + itemHeight) y -= totalHeight;
        while (y < -visibleHeight * 0.5 - itemHeight) y += totalHeight;

        const itemWidth = entry.base.width * entry.scale;
        const leftEdgeX = -visibleWidth * 0.5 + itemWidth * 0.5;
        entry.group.position.set(
          leftEdgeX,
          y,
          selectedIndex === index ? 0.42 : 0,
        );
        entry.group.rotation.set(0, 0, 0);
        entry.group.scale.set(entry.scale, entry.scale, 1);

        cursor += itemHeight + layout.gap;
      });

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };

    gsap.fromTo(
      contentRef.current,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
    );

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    onResize();
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      renderer.domElement.remove();
      textures.forEach((texture) => texture.dispose());
      materials.forEach((material) => material.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      renderer.dispose();
    };
  }, [isGalleryOpen]);

  return (
    <>
      {!isGalleryOpen ? (
        <main className="relative min-h-screen overflow-hidden bg-editorial text-warm">
          <section
            key="who-intro"
            ref={introRef}
            className="kb-who-intro-hard relative min-h-screen overflow-hidden bg-[#171A18]"
          >
            <figure className="absolute inset-0 overflow-hidden">
              <img
                data-who-intro-image
                src="/assets/whos-who/kingston-beta-community-montage.png"
                alt="A montage of Kingston BETA community members connecting, working, and sharing ideas"
                className="h-full w-full object-cover object-center"
              />
            </figure>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.62)_0%,rgba(17,17,17,0.12)_38%,rgba(17,17,17,0.86)_100%)] md:bg-[linear-gradient(90deg,rgba(17,17,17,0.76)_0%,rgba(17,17,17,0.12)_58%,rgba(17,17,17,0.4)_100%)]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(247,245,240,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(247,245,240,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />

            <div className="relative z-10 flex min-h-screen flex-col justify-between px-4 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:px-12 lg:pb-12">
              <div className="flex items-start justify-between gap-6">
                <p
                  data-who-intro-item
                  className="inline-flex bg-[#AFCB27] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-editorial"
                >
                  Who's Who / The Archive
                </p>
                <p
                  data-who-intro-item
                  className="hidden max-w-[15rem] text-right font-mono text-[10px] font-black uppercase leading-relaxed tracking-[0.16em] text-warm/62 sm:block"
                >
                  Members. Founders. Builders. Friends.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
                <div className="max-w-5xl">
                  <p
                    data-who-intro-item
                    className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#AFCB27]"
                  >
                    A living record of the community
                  </p>
                <h1
                  data-who-intro-item
                    className="max-w-5xl font-display text-5xl font-extrabold leading-[0.88] tracking-tight sm:text-6xl lg:text-7xl 2xl:text-8xl"
                >
                    Find yourself in the room.
                </h1>
                </div>

              <div
                data-who-intro-item
                  className="max-w-xl justify-self-start border-t border-white/24 pt-5 lg:justify-self-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
              >
                <p className="inline-block rounded-full bg-white/90 px-6 py-3 text-base font-semibold leading-relaxed text-editorial shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-md sm:text-lg">
                    A cinematic gallery documenting the people, connections, and
                    moments that built and carried Caribbean tech forward.
                </p>
                <button
                  type="button"
                  onClick={openGallery}
                  disabled={isTransitioning}
                  className="kb-who-explore-button mt-7 inline-flex min-h-[54px] items-center justify-center bg-[#F7F5F0] px-7 text-sm font-black uppercase tracking-[0.14em] text-editorial transition hover:bg-[#AFCB27] disabled:cursor-wait disabled:opacity-70"
                >
                  Explore Gallery
                </button>
              </div>
              </div>
            </div>
          </section>
        </main>

      ) : (
      <main className="min-h-screen bg-[#333838] text-[#F7F5F0]">
        <section
          key="who-gallery"
          ref={stageRef}
          className="relative min-h-screen cursor-grab touch-none overflow-hidden bg-[#333838] active:cursor-grabbing"
          aria-label="Vertical Who's Who photo gallery"
        >
          {/* Subtle grid pattern behind the carousel */}
          <div className="pointer-events-none absolute inset-0 z-[8] opacity-[0.08] [background-image:linear-gradient(to_right,rgba(247,245,240,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(247,245,240,0.3)_1px,transparent_1px)] [background-size:72px_72px] sm:[background-size:88px_88px]" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_40%,rgba(0,0,0,0.15)_75%,rgba(0,0,0,0.25)_100%)]" />

          {/* Minimal branding at top-left */}
          <div className="absolute left-6 top-6 z-30 flex items-center gap-3">
            <span className="bg-[#AFCB27] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-editorial">
              Archive
            </span>
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#F7F5F0]/70">
              Kingston BETA
            </span>
          </div>

          {/* Elegant, clean fallback description on the right when no card is focused */}
          <AnimatePresence>
            {!selectedItem && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 z-20 max-w-[28rem] text-right pr-4 sm:pr-8 md:block hidden"
              >
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#AFCB27]">
                  The Living Archive
                </p>
                <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.92] text-[#F7F5F0] uppercase tracking-tight">
                  Find yourself<br />in the room.
                </h1>
                <p className="mt-6 text-sm font-medium leading-relaxed text-[#F7F5F0]/50">
                  A visual record of the founders, builders, and community who built and carried Caribbean tech forward. Drag the canvas to explore, click any photo to focus.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cinematic Photo Detail Panel & Wash Effect */}
          <AnimatePresence>
            {selectedItem && (
              <>
                {/* Full-screen ambient wash backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.16 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-none absolute inset-0 z-10 bg-cover bg-center filter blur-3xl scale-110"
                  style={{ backgroundImage: `url(${selectedItem.src})` }}
                />

                {/* Cinematic detail panel */}
                <motion.aside
                  key={selectedItem.src}
                  data-gallery-control
                  onPointerDown={(event) => event.stopPropagation()}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-0 bottom-0 z-30 flex flex-col justify-center w-full md:w-[46%] lg:w-[40%] xl:w-[35%] bg-black/95 md:bg-gradient-to-l md:from-black/98 md:via-black/85 md:to-transparent p-6 sm:p-12 text-[#F7F5F0] overflow-y-auto"
                  role="dialog"
                  aria-modal="false"
                  aria-label={selectedItem.label}
                >
                  <button
                    type="button"
                    onClick={handleCloseFocus}
                    className="absolute right-6 top-6 grid h-10 w-10 place-items-center border border-white/10 bg-black/40 backdrop-blur-md text-[#F7F5F0] transition hover:bg-[#AFCB27] hover:text-editorial cursor-pointer"
                    aria-label="Close photo detail"
                  >
                    <X size={18} />
                  </button>

                  <div className="flex flex-col h-full max-h-[85vh] justify-between py-6">
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-[#AFCB27] mb-6">
                        Active Focus / Community Archive
                      </p>

                      {/* Large, high-resolution premium preview of the image */}
                      <div className="relative mb-8 flex max-h-[52vh] items-center justify-center overflow-hidden border border-white/10 bg-[#080908] shadow-2xl group">
                        <img
                          src={selectedItem.src}
                          alt={selectedItem.label}
                          className="max-h-[52vh] w-full object-contain transition duration-700 group-hover:scale-[1.02]"
                        />
                      </div>

                      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-4 text-[#F7F5F0]">
                        {selectedItem.label}
                      </h2>

                      <p className="text-sm sm:text-base leading-relaxed text-[#F7F5F0]/70 font-medium">
                        {selectedItem.caption}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between">
                      <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#F7F5F0]/40">
                        Kingston BETA living archive
                      </span>
                      <button
                        type="button"
                        onClick={handleCloseFocus}
                        className="bg-[#F7F5F0] text-editorial hover:bg-[#AFCB27] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition cursor-pointer"
                      >
                        Close Focus
                      </button>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          <button
            type="button"
            data-gallery-control
            onClick={goHome}
            className="absolute bottom-6 left-6 z-40 inline-flex min-h-[44px] items-center justify-center border border-white/20 bg-black/40 backdrop-blur-md px-5 text-[10px] font-black uppercase tracking-[0.18em] text-[#F7F5F0] transition hover:bg-[#AFCB27] hover:text-editorial cursor-pointer"
          >
            Back to Intro
          </button>
        </section>
      </main>
      )}
      <div
        ref={transitionRef}
        className="pointer-events-none fixed inset-0 z-[200] origin-bottom scale-y-0 bg-[#333838] will-change-transform"
      />
    </>
  );
}
