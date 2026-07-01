import { useState, useRef, useEffect } from "react";
import "./styles.css";
import { verbs } from "./verbs.tsx";

type Conjugations = Record<string, string>;

type Verb = {
  infinitive: string;
  english?: string;
  present: Conjugations;
  future: Conjugations;
  perfect: Conjugations;
  indefinite: Conjugations;
};

type WheelProps = {
  verbs: Verb[];
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

function Wheel({ verbs, rotation, setRotation, setSelectedIndex }: WheelProps) {
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const startAngle = useRef(0);

  const size =
    typeof window !== "undefined"
      ? Math.min(window.innerWidth * 0.95, 950)
      : 950;

  const radius = size * 0.36;
  const center = size / 2;

  const getClientPosition = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const point = "touches" in e ? e.touches[0] : e;
    return {
      clientX: point.clientX,
      clientY: point.clientY,
    };
  };

  const getSelectedIndexFromRotation = (rot: number) => {
    const anglePerItem = 360 / verbs.length;
    const normalized = ((270 - rot) % 360 + 360) % 360;

    return Math.round(normalized / anglePerItem) % verbs.length;
  };

  const getAngle = (x: number, y: number) =>
    Math.atan2(y - center, x - center) * (180 / Math.PI);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;

    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const { clientX, clientY } = getClientPosition(e);

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    startAngle.current = getAngle(x, y) - rotation;
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!dragging.current) return;

    const wheel = wheelRef.current;
    if (!wheel) return;

    const rect = wheel.getBoundingClientRect();
    const { clientX, clientY } = getClientPosition(e);

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const targetRotation = getAngle(x, y) - startAngle.current;
    const dragSensitivity = 0.1;

    const newRotation =
      rotation + (targetRotation - rotation) * dragSensitivity;

    setRotation(newRotation);

    const index = getSelectedIndexFromRotation(newRotation);
    setSelectedIndex(index);
  };

  const handleMouseUp = () => {
    if (!dragging.current) return;

    dragging.current = false;

    const anglePerItem = 360 / verbs.length;
    const index = getSelectedIndexFromRotation(rotation);
    const snappedRotation = 270 - index * anglePerItem;

    setRotation(snappedRotation);
    setSelectedIndex(index);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const angleStep = 360 / verbs.length;

  return (
    <div
      ref={wheelRef}
      className="wheel"
      style={{
        transform: `rotate(${rotation}deg)`,
        width: size,
        height: size,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {verbs.map((verb, index) => {
        const angle = index * angleStep;

        return (
          <div
            key={verb.infinitive}
            className="slice"
            style={{
              transform: `rotate(${angle}deg)`,
            }}
          >
            <div className="divider" />

            <div
              className="wheel-item"
              style={{
                transform: `
                  translate(${radius}px, -50%)
                  translate(10%, 0)
                  rotate(${-angle - rotation}deg)
                `,
              }}
            >
              {verb.infinitive}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const tenses: Array<keyof Pick<Verb, "present" | "future" | "perfect" | "indefinite">> = [
  "present",
  "future",
  "perfect",
  "indefinite",
];

function ConjugationDisplay({ verb }: { verb: Verb }) {
  return (
    <div className="center">
      <h2>{verb.infinitive}</h2>

      {verb.english && (
        <div className="translation">{verb.english}</div>
      )}

      {tenses.map((tense) => {
        const value = verb[tense];

        return (
          <div key={tense} className="tense-box">
            <h3>{tense}</h3>

            {typeof value === "string" ? (
              <div className="perfect-form">{value}</div>
            ) : (
              <div className="row">
                {Object.entries(value || {}).map(([p, f]) => (
                  <div key={p} className="cell">
                    <strong>{p}</strong>
                    <div>{f}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [rotation, setRotation] = useState(270);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const verbsPerPage = 24;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(verbs.length / verbsPerPage);

  const currentVerbs = verbs.slice(
    page * verbsPerPage,
    page * verbsPerPage + verbsPerPage
  );

  return (
    <div className="app">
      <h1>Spanish Verb Wheel</h1>

      <div className="page-buttons">
        <button
          onClick={() => {
            console.log("NEXT clicked");

            setPage((p) => Math.max(0, p - 1));
            setSelectedIndex(0);
            setRotation(270);
          }}
          disabled={page === 0}
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => {
            setPage((p) => Math.min(totalPages - 1, p + 1));
            setSelectedIndex(0);
            setRotation(270);
          }}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>

      <div className="wheel-container">
        <div className="pointer-arrow" />

        <Wheel
          key={page}
          verbs={currentVerbs}
          rotation={rotation}
          setRotation={setRotation}
          setSelectedIndex={setSelectedIndex}
        />

        <ConjugationDisplay verb={currentVerbs[selectedIndex]} />
      </div>
    </div>
  );
}