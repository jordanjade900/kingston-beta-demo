import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ReactNode } from "react";

const lime = "#AFCB27";
const ink = "#111111";
const warm = "#F4F1EA";
const muted = "#D8D2C8";

const images = {
  logo: "assets/kingston-beta-logo.png",
  audience: "assets/kingston-beta-event-audience.jpeg",
  earlyIngrid: "assets/whos-who/networking-conversation.png",
  aboutSignal: "assets/kingston-beta-about-community-signal-correct.png",
  relationships: "assets/kingston-beta-community-relationships.png",
  founderCircle: "assets/kingston-beta-founder-circle-slide-v2.png",
  builderLab: "assets/kingston-beta-builder-lab-slide-v2.png",
  demoNight: "assets/kingston-beta-demo-night-slide-v2.png",
  liveBuilder: "assets/kingston-beta-live-builder-v2.png",
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const clampInterpolate = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
) =>
  interpolate(frame, inputRange, outputRange, {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const linear = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
) =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const sceneOpacity = (
  frame: number,
  start: number,
  duration: number,
  fade = 24,
) => {
  const intro = linear(frame, [start, start + fade], [0, 1]);
  const outro = linear(frame, [start + duration - fade, start + duration], [1, 0]);
  return Math.min(intro, outro);
};

const localFrame = (frame: number, start: number) => Math.max(0, frame - start);

const labelStyle = {
  color: lime,
  fontSize: 18,
  fontWeight: 900,
  letterSpacing: 8,
  textTransform: "uppercase" as const,
};

const bodyStyle = {
  color: muted,
  fontSize: 34,
  lineHeight: 1.28,
  fontWeight: 700,
  letterSpacing: -0.2,
};

const BackgroundImage = ({
  src,
  frame,
  start,
  duration,
  position = "center",
  scaleFrom = 1.06,
  scaleTo = 1,
  opacity = 1,
}: {
  src: string;
  frame: number;
  start: number;
  duration: number;
  position?: string;
  scaleFrom?: number;
  scaleTo?: number;
  opacity?: number;
}) => {
  const scale = linear(frame, [start, start + duration], [scaleFrom, scaleTo]);

  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: position,
        transform: `scale(${scale})`,
        opacity,
      }}
    />
  );
};

const Scene = ({
  start,
  duration,
  children,
}: {
  start: number;
  duration: number;
  children: (local: number, opacity: number) => ReactNode;
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, start, duration);

  if (opacity <= 0) {
    return null;
  }

  return (
    <AbsoluteFill style={{ opacity }}>
      {children(localFrame(frame, start), opacity)}
    </AbsoluteFill>
  );
};

const FrameLines = ({ opacity = 0.16 }: { opacity?: number }) => (
  <AbsoluteFill
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
      backgroundSize: "76px 76px",
      opacity,
    }}
  />
);

const BrandMark = ({ dark = false }: { dark?: boolean }) => (
  <div
    style={{
      position: "absolute",
      left: 78,
      top: 64,
      display: "flex",
      alignItems: "center",
      gap: 22,
      color: dark ? ink : warm,
      fontWeight: 900,
      letterSpacing: 4,
      textTransform: "uppercase",
      fontSize: 18,
    }}
  >
    <Img src={staticFile(images.logo)} style={{ width: 188, height: "auto" }} />
    <span style={{ opacity: 0.72 }}>Caribbean tech culture</span>
  </div>
);

const HeroScene = ({ start, duration }: { start: number; duration: number }) => (
  <Scene start={start} duration={duration}>
    {(f) => {
      const titleY = clampInterpolate(f, [10, 46], [70, 0]);
      const titleOpacity = clampInterpolate(f, [8, 38], [0, 1]);
      const statX = clampInterpolate(f, [38, 74], [80, 0]);
      const sweep = linear(f, [0, duration], [-240, 1720]);

      return (
        <AbsoluteFill style={{ backgroundColor: ink, overflow: "hidden" }}>
          <BackgroundImage
            src={images.audience}
            frame={f}
            start={0}
            duration={duration}
            position="center 36%"
            scaleFrom={1.1}
            scaleTo={1.03}
            opacity={0.74}
          />
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.84) 42%, rgba(17,17,17,0.24) 100%)",
            }}
          />
          <FrameLines />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: sweep,
              width: 380,
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(175,203,39,0.18), transparent)",
              transform: "skewX(-14deg)",
            }}
          />
          <BrandMark />
          <div
            style={{
              position: "absolute",
              left: 92,
              top: 264,
              width: 1000,
              transform: `translateY(${titleY}px)`,
              opacity: titleOpacity,
            }}
          >
            <div style={labelStyle}>Since 2007 / Kingston BETA</div>
            <h1
              style={{
                margin: "34px 0 0",
                color: warm,
                fontSize: 172,
                lineHeight: 0.86,
                letterSpacing: -6,
                fontWeight: 950,
              }}
            >
              Caribbean tech
              <br />
              in motion.
            </h1>
            <p style={{ ...bodyStyle, marginTop: 42, maxWidth: 780 }}>
              The room where founders, builders, investors, and digital creatives
              come to pressure-test what is next.
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              right: 96,
              bottom: 88,
              width: 430,
              padding: "34px 38px",
              border: "1px solid rgba(244,241,234,0.28)",
              background: "rgba(17,17,17,0.74)",
              transform: `translateX(${statX}px)`,
              opacity: clampInterpolate(f, [42, 72], [0, 1]),
            }}
          >
            <div style={{ color: lime, fontSize: 72, fontWeight: 950 }}>
              300+
            </div>
            <div style={{ ...labelStyle, color: warm, fontSize: 14, letterSpacing: 5 }}>
              events across the ecosystem
            </div>
          </div>
        </AbsoluteFill>
      );
    }}
  </Scene>
);

const OriginScene = ({ start, duration }: { start: number; duration: number }) => (
  <Scene start={start} duration={duration}>
    {(f) => {
      const imageY = clampInterpolate(f, [4, 42], [62, 0]);
      const titleX = clampInterpolate(f, [18, 58], [-80, 0]);
      const scale = linear(f, [0, duration], [1.03, 1.08]);

      return (
        <AbsoluteFill style={{ backgroundColor: warm, overflow: "hidden" }}>
          <FrameLines opacity={0.08} />
          <div
            style={{
              position: "absolute",
              left: 86,
              top: 86,
              ...labelStyle,
              color: "#006B2D",
            }}
          >
            Origins / first rooms
          </div>
          <div
            style={{
              position: "absolute",
              left: 78,
              bottom: 74,
              color: "rgba(17,17,17,0.08)",
              fontSize: 260,
              lineHeight: 0.82,
              fontWeight: 950,
              letterSpacing: -10,
            }}
          >
            2007
          </div>
          <div
            style={{
              position: "absolute",
              left: 96,
              top: 220,
              width: 720,
              transform: `translateX(${titleX}px)`,
            }}
          >
            <h2
              style={{
                margin: 0,
                color: ink,
                fontSize: 116,
                lineHeight: 0.9,
                letterSpacing: -4,
                fontWeight: 950,
              }}
            >
              One room.
              <br />
              Real signal.
            </h2>
            <p style={{ ...bodyStyle, color: "#343434", marginTop: 34, maxWidth: 650 }}>
              A young Ingrid Riley hosting one of the first Kingston BETA events,
              bringing curious builders into the same conversation.
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              right: 90,
              top: 116,
              width: 860,
              height: 720,
              overflow: "hidden",
              border: "1px solid rgba(17,17,17,0.16)",
              boxShadow: "0 30px 90px rgba(17,17,17,0.18)",
              transform: `translateY(${imageY}px)`,
            }}
          >
            <Img
              src={staticFile(images.earlyIngrid)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 42%",
                transform: `scale(${scale})`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 46%, rgba(17,17,17,0.62) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 34,
                bottom: 34,
                color: warm,
                ...labelStyle,
                fontSize: 14,
              }}
            >
              Ingrid hosting early Kingston BETA
            </div>
          </div>
        </AbsoluteFill>
      );
    }}
  </Scene>
);

const ImpactScene = ({ start, duration }: { start: number; duration: number }) => (
  <Scene start={start} duration={duration}>
    {(f) => {
      const imageX = clampInterpolate(f, [8, 48], [-70, 0]);
      const cardY = clampInterpolate(f, [18, 54], [80, 0]);
      const numbers = [
        ["100,000+", "people directly impacted"],
        ["300+", "events"],
        ["15", "countries"],
        ["4", "communities"],
      ];

      return (
        <AbsoluteFill style={{ backgroundColor: "#F7F5EF", overflow: "hidden" }}>
          <FrameLines opacity={0.07} />
          <div
            style={{
              position: "absolute",
              left: 92,
              top: 96,
              ...labelStyle,
              color: "#006B2D",
            }}
          >
            Community signal
          </div>
          <div
            style={{
              position: "absolute",
              left: 92,
              top: 168,
              width: 1000,
              height: 770,
              overflow: "hidden",
              border: "1px solid rgba(17,17,17,0.13)",
              transform: `translateX(${imageX}px)`,
            }}
          >
            <Img
              src={staticFile(images.aboutSignal)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 24%",
                transform: `scale(${linear(f, [0, duration], [1.03, 1.07])})`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 52%, rgba(17,17,17,0.56) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 42,
                bottom: 42,
                color: warm,
                fontSize: 56,
                lineHeight: 0.96,
                fontWeight: 950,
                letterSpacing: -2,
              }}
            >
              Jamaica. Caribbean.
              <br />
              Diaspora.
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: 92,
              top: 168,
              width: 590,
              padding: "42px 46px",
              background: ink,
              color: warm,
              minHeight: 770,
              transform: `translateY(${cardY}px)`,
              boxShadow: "0 28px 70px rgba(17,17,17,0.15)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 68,
                lineHeight: 0.9,
                letterSpacing: -2.5,
                fontWeight: 950,
              }}
            >
              Built for
              <br />
              impact.
            </h2>
            <p style={{ ...bodyStyle, fontSize: 24, marginTop: 22 }}>
              Knowledge exchange, investment, and community for people building
              what comes next.
            </p>
            <div style={{ marginTop: 30 }}>
              {numbers.map(([value, label], index) => {
                const rowIn = clampInterpolate(f, [42 + index * 10, 70 + index * 10], [0, 1]);
                return (
                  <div
                    key={value}
                    style={{
                      borderTop: "1px solid rgba(244,241,234,0.2)",
                      padding: "14px 0 10px",
                      opacity: rowIn,
                      transform: `translateY(${(1 - rowIn) * 24}px)`,
                    }}
                  >
                    <div style={{ color: lime, fontSize: 44, fontWeight: 950 }}>
                      {value}
                    </div>
                    <div style={{ ...labelStyle, color: "#AFAAA1", fontSize: 12, letterSpacing: 4 }}>
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      );
    }}
  </Scene>
);

const MontageScene = ({ start, duration }: { start: number; duration: number }) => (
  <Scene start={start} duration={duration}>
    {(f) => {
      const cards = [
        { src: images.founderCircle, left: 82, top: 114, width: 690, height: 430, label: "Founder feedback" },
        { src: images.builderLab, left: 790, top: 76, width: 500, height: 340, label: "Builder rooms" },
        { src: images.demoNight, left: 1294, top: 168, width: 530, height: 380, label: "Startup stage" },
        { src: images.liveBuilder, left: 808, top: 554, width: 690, height: 390, label: "Real networks" },
      ];

      return (
        <AbsoluteFill style={{ backgroundColor: ink, overflow: "hidden" }}>
          <FrameLines opacity={0.13} />
          <div
            style={{
              position: "absolute",
              left: 92,
              bottom: 88,
              zIndex: 5,
              width: 700,
            }}
          >
            <div style={labelStyle}>Active focus / room culture</div>
            <h2
              style={{
                color: warm,
                fontSize: 108,
                lineHeight: 0.9,
                letterSpacing: -4,
                fontWeight: 950,
                margin: "26px 0 0",
              }}
            >
              Pitch.
              <br />
              Feedback.
              <br />
              Proof.
              <br />
              Access.
            </h2>
          </div>
          {cards.map((card, index) => {
            const enter = clampInterpolate(f, [index * 12, index * 12 + 34], [0, 1]);
            const drift = linear(f, [0, duration], [0, index % 2 === 0 ? -24 : 24]);
            return (
              <div
                key={card.src}
                style={{
                  position: "absolute",
                  left: card.left,
                  top: card.top + drift,
                  width: card.width,
                  height: card.height,
                  overflow: "hidden",
                  border: "1px solid rgba(244,241,234,0.18)",
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 46}px)`,
                }}
              >
                <Img
                  src={staticFile(card.src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transform: `scale(${linear(f, [0, duration], [1.04, 1.1])})`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(17,17,17,0.74) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 24,
                    bottom: 22,
                    ...labelStyle,
                    color: warm,
                    fontSize: 13,
                    letterSpacing: 5,
                  }}
                >
                  {card.label}
                </div>
              </div>
            );
          })}
        </AbsoluteFill>
      );
    }}
  </Scene>
);

const RelationshipScene = ({ start, duration }: { start: number; duration: number }) => (
  <Scene start={start} duration={duration}>
    {(f) => {
      const titleY = clampInterpolate(f, [16, 52], [52, 0]);
      const button = clampInterpolate(f, [62, 92], [0, 1]);

      return (
        <AbsoluteFill style={{ backgroundColor: ink, overflow: "hidden" }}>
          <BackgroundImage
            src={images.relationships}
            frame={f}
            start={0}
            duration={duration}
            position="36% 28%"
            scaleFrom={1.05}
            scaleTo={1}
            opacity={0.86}
          />
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.24) 0%, rgba(17,17,17,0.38) 34%, rgba(17,17,17,0.88) 56%, #111111 100%)",
            }}
          />
          <FrameLines opacity={0.11} />
          <div
            style={{
              position: "absolute",
              left: 92,
              bottom: 120,
              width: 850,
              transform: `translateY(${titleY}px)`,
            }}
          >
            <div style={labelStyle}>Join the community</div>
            <h2
              style={{
                margin: "26px 0 0",
                color: warm,
                fontSize: 116,
                lineHeight: 0.9,
                letterSpacing: -4,
                fontWeight: 950,
              }}
            >
              The event ends.
              <br />
              The relationships
              <br />
              keep moving.
            </h2>
          </div>
          <div
            style={{
              position: "absolute",
              right: 112,
              top: 188,
              width: 690,
            }}
          >
            <p style={{ ...bodyStyle, color: warm, margin: 0 }}>
              Member perks, founder feedback, investor access, and a trusted
              Caribbean technology network that shows up.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginTop: 42,
                gap: 18,
              }}
            >
              {["Pitch + feedback", "Credibility + social proof", "Relationships before you need them", "Investor and partner access"].map((item) => (
                <div
                  key={item}
                  style={{
                    borderTop: "1px solid rgba(244,241,234,0.24)",
                    paddingTop: 20,
                    color: muted,
                    fontSize: 22,
                    fontWeight: 850,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 64,
                display: "inline-flex",
                background: lime,
                color: ink,
                padding: "22px 42px",
                fontSize: 18,
                fontWeight: 950,
                letterSpacing: 4,
                textTransform: "uppercase",
                transform: `scale(${0.96 + button * 0.04})`,
                opacity: button,
              }}
            >
              Join Kingston BETA
            </div>
          </div>
        </AbsoluteFill>
      );
    }}
  </Scene>
);

const OutroScene = ({ start, duration }: { start: number; duration: number }) => (
  <Scene start={start} duration={duration}>
    {(f) => {
      const mark = clampInterpolate(f, [8, 46], [0, 1]);
      const line = linear(f, [48, duration - 20], [0, 1]);

      return (
        <AbsoluteFill style={{ backgroundColor: warm, overflow: "hidden" }}>
          <FrameLines opacity={0.08} />
          <div
            style={{
              position: "absolute",
              inset: "82px",
              border: "1px solid rgba(17,17,17,0.12)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 150,
              top: 164,
              transform: `translateY(${(1 - mark) * 42}px)`,
              opacity: mark,
            }}
          >
            <Img src={staticFile(images.logo)} style={{ width: 285, height: "auto" }} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 150,
              bottom: 172,
              width: 1180,
              opacity: mark,
            }}
          >
            <div style={{ ...labelStyle, color: "#006B2D" }}>Kingston BETA</div>
            <h2
              style={{
                margin: "30px 0 0",
                color: ink,
                fontSize: 150,
                lineHeight: 0.88,
                letterSpacing: -6,
                fontWeight: 950,
              }}
            >
              Caribbean tech
              <br />
              keeps showing up.
            </h2>
          </div>
          <div
            style={{
              position: "absolute",
              right: 150,
              bottom: 182,
              width: 420,
              padding: "28px 32px",
              background: ink,
              color: warm,
              opacity: clampInterpolate(f, [56, 86], [0, 1]),
            }}
          >
            <div style={{ color: lime, fontSize: 20, fontWeight: 950, letterSpacing: 5, textTransform: "uppercase" }}>
              Join the community
            </div>
            <div style={{ marginTop: 20, color: muted, fontSize: 24, lineHeight: 1.28, fontWeight: 750 }}>
              LinkedIn and YouTube:
              <br />
              Kingston BETA
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 150,
              bottom: 118,
              width: 1380 * line,
              height: 8,
              background: lime,
            }}
          />
        </AbsoluteFill>
      );
    }}
  </Scene>
);

export const KingstonBetaPromo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = (value: number) => value * fps;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: ink,
        fontFamily:
          'Inter, "Arial Black", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <HeroScene start={seconds(0)} duration={seconds(5)} />
      <OriginScene start={seconds(4.6)} duration={seconds(5.2)} />
      <ImpactScene start={seconds(9.4)} duration={seconds(5.4)} />
      <MontageScene start={seconds(14.4)} duration={seconds(5.6)} />
      <RelationshipScene start={seconds(19.7)} duration={seconds(5.8)} />
      <OutroScene start={seconds(25.1)} duration={seconds(4.9)} />
      <div
        style={{
          position: "absolute",
          right: 42,
          bottom: 32,
          color: "rgba(244,241,234,0.32)",
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: 5,
          textTransform: "uppercase",
          opacity: frame < seconds(25) ? 1 : 0,
        }}
      >
        Kingston BETA promo
      </div>
    </AbsoluteFill>
  );
};
