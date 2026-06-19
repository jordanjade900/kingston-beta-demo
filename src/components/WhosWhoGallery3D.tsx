import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

type GalleryItem = {
  src: string;
  label: string;
  year: string;
  milestone?: boolean;
  width: number;
  height: number;
  bg: number;
};

const galleryItems: GalleryItem[] = [
  { src: "/assets/whos-who/2007-community-meetup.jpg", label: "Opening Room", year: "2007", milestone: true, width: 4.85, height: 2.7, bg: 0x121212 },
  { src: "/assets/whos-who/2008-community-night.jpg", label: "Community Night", year: "2008", width: 4.85, height: 2.7, bg: 0x272b2b },
  { src: "/assets/whos-who/2009-founder-network.jpg", label: "Founder Network", year: "2009", width: 4.85, height: 2.7, bg: 0x2f3028 },
  { src: "/assets/whos-who/2010-tech-panel.jpg", label: "Tech Panel", year: "2010", width: 4.85, height: 2.7, bg: 0x2c3030 },
  { src: "/assets/whos-who/2011-startup-stage.jpg", label: "Startup Stage", year: "2011", milestone: true, width: 4.85, height: 2.7, bg: 0x373d3e },
  { src: "/assets/whos-who/2012-conference-network.jpg", label: "Caribbean Network", year: "2012", width: 4.85, height: 2.7, bg: 0x313633 },
  { src: "/assets/whos-who/founder-circle.jpg", label: "Caribbean BETA", year: "2013", milestone: true, width: 4.85, height: 2.7, bg: 0x16270e },
  { src: "/assets/whos-who/2014-hackathon-builders.jpg", label: "Hackathon Builders", year: "2014", width: 4.85, height: 2.7, bg: 0x273236 },
  { src: "/assets/whos-who/2015-entrepreneur-workshop.jpg", label: "Entrepreneur Workshop", year: "2015", width: 4.85, height: 2.7, bg: 0x2e3125 },
  { src: "/assets/whos-who/2016-bloggers-week.jpg", label: "Caribbean Bloggers Week", year: "2016", milestone: true, width: 4.85, height: 2.7, bg: 0x30252a },
  { src: "/assets/whos-who/2017-startup-pitch.jpg", label: "Startup Pitch", year: "2017", width: 4.85, height: 2.7, bg: 0x242d31 },
  { src: "/assets/whos-who/2018-blockchain-forum.jpg", label: "Blockchain Trend Forum", year: "2018", milestone: true, width: 4.85, height: 2.7, bg: 0x2c2325 },
  { src: "/assets/whos-who/2019-tech-network.jpg", label: "Tech Network", year: "2019", width: 4.85, height: 2.7, bg: 0x252a2b },
  { src: "/assets/whos-who/builder-lab.jpg", label: "Builder Lab", year: "2020", width: 4.85, height: 2.7, bg: 0x043653 },
  { src: "/assets/whos-who/community-archive.jpg", label: "Community Archive", year: "2021", width: 4.85, height: 2.7, bg: 0xb8b0a1 },
  { src: "/assets/whos-who/2022-money-conference.jpg", label: "Future of Caribbean Money", year: "2022", milestone: true, width: 4.85, height: 2.7, bg: 0x102b35 },
  { src: "/assets/whos-who/2013-workshop.jpg", label: "Community Workshop", year: "2024", width: 4.85, height: 2.7, bg: 0x30332d },
  { src: "/assets/whos-who/2026-future-room.jpg", label: "The Next Room", year: "2026", milestone: true, width: 4.85, height: 2.7, bg: 0x1a2d26 },
];

const milestoneDetails: Record<string, string> = {
  "2007": "Kingston BETA opened its first room on February 28, bringing 90 people from four countries together around Jamaica's emerging technology and internet scene.",
  "2011": "The community's startup stage expanded the room from conversation into public pitching, feedback, credibility, and practical founder momentum.",
  "2013": "Caribbean BETA and Jamaica's first Startup Weekend helped turn regional founder energy into a more visible, connected startup movement.",
  "2016": "Caribbean Bloggers Week and AgriHack Talent Caribbean extended Kingston BETA's reach across storytelling, agriculture, youth innovation, and multiple countries.",
  "2018": "The Kingston BETA Trend Forum introduced Jamaica's first major blockchain and cryptocurrency conversation to the national stage.",
  "2022": "Future of Caribbean Money connected more than 300 attendees from 12 countries with 40 speakers exploring the region's changing financial future.",
  "2026": "The next chapter carries the archive forward: new rooms, new builders, and a community still creating what comes next.",
};

function createYearTexture(year: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const context = canvas.getContext("2d");

  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#F7F5F0";
    context.font = "800 92px Arial, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(year, 12, canvas.height / 2 + 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

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
  const [activeMilestone, setActiveMilestone] = useState<GalleryItem | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onGalleryModeChange?.(isGalleryOpen);

    return () => onGalleryModeChange?.(false);
  }, [isGalleryOpen, onGalleryModeChange]);

  const openGallery = () => {
    if (isTransitioning || isGalleryOpen) return;

    setIsTransitioning(true);
    const timeline = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        window.setTimeout(() => {
          setIsGalleryOpen(true);
          window.setTimeout(() => {
            gsap.to(transitionRef.current, {
              autoAlpha: 0,
              duration: 0.62,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(transitionRef.current, {
                  clearProps: "all",
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

    setIsTransitioning(true);
    setActiveMilestone(null);
    gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          setIsGalleryOpen(false);
          onGalleryModeChange?.(false);
          window.history.replaceState(null, "", "#who");
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.setTimeout(() => setIsTransitioning(false), 120);
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

    gsap.set(transitionRef.current, { autoAlpha: 0, scaleY: 0 });
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
    let selectedIndex = -1;
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
    const timelineRoot = new THREE.Group();
    scene.add(root);
    scene.add(timelineRoot);
    scene.add(new THREE.AmbientLight(0xffffff, 1.55));

    const timelineMarkers: Array<{
      group: THREE.Group;
      line: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
      label: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
      milestone: boolean;
    }> = [];

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

      const markerGroup = new THREE.Group();
      const markerGeometry = new THREE.PlaneGeometry(1, item.milestone ? 0.026 : 0.014);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xf7f5f0,
        transparent: true,
        opacity: item.milestone ? 0.92 : 0.42,
        side: THREE.DoubleSide,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      markerGroup.add(marker);
      geometries.push(markerGeometry);
      materials.push(markerMaterial);

      const yearTexture = createYearTexture(item.year);
      const yearGeometry = new THREE.PlaneGeometry(
        item.milestone ? 1.1 : 0.58,
        item.milestone ? 0.34 : 0.18,
      );
      const yearMaterial = new THREE.MeshBasicMaterial({
        map: yearTexture,
        transparent: true,
        opacity: item.milestone ? 0.98 : 0.48,
        depthTest: false,
        side: THREE.DoubleSide,
      });
      const yearLabel = new THREE.Mesh(yearGeometry, yearMaterial);
      markerGroup.add(yearLabel);
      timelineRoot.add(markerGroup);
      textures.push(yearTexture);
      geometries.push(yearGeometry);
      materials.push(yearMaterial);
      timelineMarkers.push({
        group: markerGroup,
        line: marker,
        label: yearLabel,
        milestone: Boolean(item.milestone),
      });

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
      selectedIndex = stableHit
        ? objects.findIndex((entry) => entry.plane === stableHit.object)
        : -1;
      targetBg.set(
        selectedIndex >= 0 ? objects[selectedIndex].base.bg : 0x333838,
      );
      setActiveMilestone(
        selectedIndex >= 0 && objects[selectedIndex].base.milestone
          ? objects[selectedIndex].base
          : null,
      );
      if (selectedIndex >= 0) {
        const layout = getLayoutSettings();
        const visibleHeight =
          2 *
          camera.position.z *
          Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
        const topEdge = visibleHeight * 0.5 + 0.08;
        const targetScales = objects.map((_, index) => {
          const distance = Math.min(
            Math.abs(index - selectedIndex),
            objects.length - Math.abs(index - selectedIndex),
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
          .slice(0, selectedIndex)
          .reduce((sum, rowHeight) => sum + rowHeight + layout.gap, 0);
        const centeredScroll =
          precedingHeight + rowHeights[selectedIndex] * 0.5 - topEdge;
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
      targetScroll += selectedIndex >= 0 || isDragging ? 0 : 0.0009;
      scroll += (targetScroll - scroll) * 0.075;

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

        const timelineMarker = timelineMarkers[index];
        const compact = width < 640;
        const markerWidth = timelineMarker.milestone
          ? visibleWidth * 0.92
          : visibleWidth * (compact ? 0.34 : 0.42);
        timelineMarker.group.position.set(
          0,
          y + itemHeight * 0.5 - 0.02,
          -0.36,
        );
        timelineMarker.line.scale.set(markerWidth, 1, 1);
        timelineMarker.line.position.set(
          visibleWidth * 0.5 - markerWidth * 0.5 - 0.04,
          0,
          0,
        );
        timelineMarker.label.position.set(
          visibleWidth * 0.5 - (compact ? 0.36 : 0.58),
          timelineMarker.milestone ? 0.22 : 0.12,
          0.02,
        );
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

  if (!isGalleryOpen) {
    return (
      <>
        <main className="relative min-h-screen overflow-hidden bg-editorial text-warm">
          <section
            key="who-intro"
            ref={introRef}
            className="relative min-h-screen overflow-hidden bg-[#171A18]"
          >
            <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] lg:grid-cols-[1.15fr_0.56fr_0.56fr]">
              <figure className="relative min-h-screen overflow-hidden">
                <img
                  data-who-intro-image
                  src="/assets/whos-who/founder-circle.jpg"
                  alt="Kingston BETA founders and community members in conversation"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.84)_0%,rgba(17,17,17,0.48)_48%,rgba(17,17,17,0.08)_100%)]" />
              </figure>

              <div className="hidden border-l border-white/12 md:grid md:grid-rows-2">
                <figure className="overflow-hidden border-b border-white/12">
                  <img
                    data-who-intro-image
                    src="/assets/whos-who/2011-startup-stage.jpg"
                    alt="A Kingston BETA startup presentation"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <figure className="overflow-hidden">
                  <img
                    data-who-intro-image
                    src="/assets/whos-who/community-archive.jpg"
                    alt="Members gathering at a Kingston BETA event"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </div>

              <div className="hidden border-l border-white/12 lg:grid lg:grid-rows-[0.64fr_1.36fr]">
                <figure className="overflow-hidden border-b border-white/12">
                  <img
                    data-who-intro-image
                    src="/assets/whos-who/builder-lab.jpg"
                    alt="Builders collaborating at Kingston BETA"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <figure className="overflow-hidden">
                  <img
                    data-who-intro-image
                    src="/assets/whos-who/2018-blockchain-forum.jpg"
                    alt="Kingston BETA event audience"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </div>
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.58)_0%,rgba(17,17,17,0.08)_38%,rgba(17,17,17,0.82)_100%)] md:bg-[linear-gradient(90deg,rgba(17,17,17,0.76)_0%,rgba(17,17,17,0.18)_58%,rgba(17,17,17,0.32)_100%)]" />
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
                    A living record since 2007
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
                <p className="text-lg font-semibold leading-relaxed text-warm/76 sm:text-xl">
                    Not a photo gallery. A roll call of the people who built,
                    backed, attended, and carried Caribbean tech forward.
                </p>
                <button
                  type="button"
                  onClick={openGallery}
                  disabled={isTransitioning}
                  className="mt-7 inline-flex min-h-[54px] items-center justify-center bg-[#F7F5F0] px-7 text-sm font-black uppercase tracking-[0.14em] text-editorial transition hover:bg-[#AFCB27] disabled:cursor-wait disabled:opacity-70"
                >
                  Explore Gallery
                </button>
              </div>
              </div>
            </div>
          </section>
        </main>

        <div
          ref={transitionRef}
          className="pointer-events-none fixed inset-0 z-[200] origin-bottom scale-y-0 bg-[#333838]"
        />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#333838] text-[#F7F5F0]">
        <section
          key="who-gallery"
          ref={stageRef}
          className="relative min-h-screen cursor-grab touch-none overflow-hidden bg-[#333838] active:cursor-grabbing"
          aria-label="Vertical Who's Who photo gallery"
        >
          <div className="pointer-events-none absolute inset-0 z-[8] opacity-[0.13] [background-image:linear-gradient(to_right,rgba(247,245,240,0.42)_1px,transparent_1px),linear-gradient(to_bottom,rgba(247,245,240,0.42)_1px,transparent_1px)] [background-size:72px_72px] sm:[background-size:88px_88px]" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.04)_38%,rgba(0,0,0,0.22)_74%,rgba(0,0,0,0.32)_100%)]" />

          <div
            ref={contentRef}
            className="pointer-events-none absolute right-4 top-4 z-30 max-w-[10rem] text-right drop-shadow-[0_3px_16px_rgba(0,0,0,0.6)] sm:right-8 sm:top-8 sm:max-w-[22rem]"
          >
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#AFCB27] sm:text-[10px]">
              Kingston BETA Archive
            </p>
            <h1 className="mt-2 font-display text-lg font-extrabold leading-[0.96] text-[#F7F5F0] sm:text-3xl">
              Milestones throughout the years.
            </h1>
            <p className="kb-stat-value mt-2 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-[#F7F5F0]/58">
              2007 — 2026
            </p>
          </div>

          <div className="pointer-events-none absolute right-[7%] top-[48%] z-30 hidden max-w-[12rem] -translate-y-1/2 text-right font-mono text-[9px] font-black uppercase leading-relaxed tracking-[0.16em] text-[#F7F5F0]/54 md:block">
            <p>Scroll or drag through</p>
            <p>the living timeline</p>
          </div>

          <div className="pointer-events-none absolute bottom-8 right-8 z-30 hidden text-right font-mono text-[9px] font-black uppercase tracking-[0.18em] text-[#F7F5F0]/52 lg:block">
            <p>Kingston</p>
            <p>BETA</p>
            <p>Archive</p>
          </div>

          <AnimatePresence>
            {activeMilestone && (
              <motion.aside
                key={`${activeMilestone.year}-${activeMilestone.label}`}
                data-gallery-control
                onPointerDown={(event) => event.stopPropagation()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="kb-milestone-panel absolute inset-x-3 bottom-3 z-50 max-h-[56vh] overflow-y-auto bg-[#F7F5F0] text-editorial shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:inset-x-6 sm:bottom-6 lg:bottom-6 lg:left-auto lg:right-6 lg:top-36 lg:w-[27rem]"
                role="dialog"
                aria-modal="false"
                aria-label={`${activeMilestone.year} ${activeMilestone.label}`}
              >
                <figure className="relative h-28 overflow-hidden bg-editorial sm:h-36 lg:h-48">
                  <img
                    src={activeMilestone.src}
                    alt=""
                    className="h-full w-full object-cover opacity-78"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.08),rgba(17,17,17,0.72))]" />
                  <p className="kb-stat-value absolute bottom-4 left-4 font-display text-4xl font-extrabold text-[#AFCB27] sm:text-5xl">
                    {activeMilestone.year}
                  </p>
                  <button
                    type="button"
                    data-gallery-control
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => setActiveMilestone(null)}
                    className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-[#F7F5F0] text-editorial transition hover:bg-[#AFCB27]"
                    aria-label="Close milestone details"
                  >
                    <X size={18} />
                  </button>
                </figure>
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1F7A3A]">
                    Milestone selected
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight">
                    {activeMilestone.label}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-editorial/68 sm:text-base">
                    {milestoneDetails[activeMilestone.year]}
                  </p>
                  <p className="mt-5 border-t border-editorial/10 pt-4 font-mono text-[9px] font-black uppercase tracking-[0.16em] text-editorial/42">
                    Kingston BETA living archive
                  </p>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <button
            type="button"
            data-gallery-control
            onPointerDown={(event) => event.stopPropagation()}
            onClick={goHome}
            className="absolute bottom-6 right-6 z-40 inline-flex min-h-[48px] items-center justify-center bg-[#F7F5F0] px-5 text-[11px] font-black uppercase tracking-[0.14em] text-editorial shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:bg-[#AFCB27] sm:bottom-8 sm:right-8"
          >
            Back to Intro
          </button>
        </section>
      </main>
      <div
        ref={transitionRef}
        className="pointer-events-none fixed inset-0 z-[200] origin-bottom scale-y-0 bg-[#333838]"
      />
    </>
  );
}
