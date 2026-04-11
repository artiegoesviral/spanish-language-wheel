import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

const verbs = [
  {
    infinitive: "acostarse",
    present: {
      yo: "me acuesto",
      tú: "te acuestas",
      él: "se acuesta",
      nosotros: "nos acostamos",
      vosotros: "os acostais",
      ellos: "se acuestan"
    },
    future: "acostar-",
    perfect: "acostado",
    indefinite: {
      yo: "me acosté",
      tú: "te acostaste",
      él: "se acostó",
      nosotros: "nos acostamos",
      vosotros: "os acostásteis",
      ellos: "se acostaron"
    }
  },
  {
    infinitive: "abrir",
    present: {
      yo: "abro",
      tú: "abres",
      él: "abre",
      nosotros: "abrimos",
      vosotros: "abrís",
      ellos: "abren"
    },
    future: "abrir-",
    perfect: "abierto",
    indefinite: {
      yo: "abri",
      tú: "abriste",
      él: "abrió",
      nosotros: "abrimos",
      vosotros: "abrísteis",
      ellos: "abrieron"
    }
  },
  {
    infinitive: "andar",
    present: {
      yo: "ando",
      tú: "andas",
      él: "anda",
      nosotros: "andamos",
      vosotros: "andáis",
      ellos: "andan"
    },
    future: "andar-",
    perfect: "andado",
    indefinite: {
      yo: "anduve",
      tú: "anduviste",
      él: "anduvo",
      nosotros: "anduvimos",
      vosotros: "anduvisteis",
      ellos: "anduvieron"
    }
  },
  {
    infinitive: "caber",
    present: {
      yo: "quepo",
      tú: "cabes",
      él: "cabe",
      nosotros: "cabemos",
      vosotros: "cabéis",
      ellos: "caben"
    },
    future: "cabr-",
    perfect: "cabido",
    indefinite: {
      yo: "cupe",
      tú: "cupiste",
      él: "cupo",
      nosotros: "cupimos",
      vosotros: "cupísteis",
      ellos: "cupieron"
    }
  },
  {
    infinitive: "caer",
    present: {
      yo: "caigo",
      tú: "caes",
      él: "cae",
      nosotros: "caemos",
      vosotros: "caéis",
      ellos: "caen"
    },
    future: "caer-",
    perfect: "caído",
    indefinite: {
      yo: "caí",
      tú: "caiste",
      él: "cayó",
      nosotros: "caimos",
      vosotros: "caisteis",
      ellos: "cayeron"
    }
  },
  {
    infinitive: "cerrar",
    present: {
      yo: "cierro",
      tú: "cierras",
      él: "cierra",
      nosotros: "cerramos",
      vosotros: "cerráis",
      ellos: "cierran"
    },
    future: "cerrar-",
    perfect: "cerrado",
    indefinite: {
      yo: "cerré",
      tú: "cerraste",
      él: "cerró",
      nosotros: "cerramos",
      vosotros: "cerrásteis",
      ellos: "cerraron"
    }
  },
  {
    infinitive: "competir",
    present: {
      yo: "compito",
      tú: "compites",
      él: "compite",
      nosotros: "competimos",
      vosotros: "competís",
      ellos: "compiten"
    },
    future: "competir-",
    perfect: "competido",
    indefinite: {
      yo: "competí",
      tú: "competiste",
      él: "compitió",
      nosotros: "competimos",
      vosotros: "competísteis",
      ellos: "competieron"
    }
  },
  {
    infinitive: "conducir",
    present: {
      yo: "conduzco",
      tú: "conduces",
      él: "conduce",
      nosotros: "conducimos",
      vosotros: "conducís",
      ellos: "conducen"
    },
    future: "conducir-",
    perfect: "conducido",
    indefinite: {
      yo: "conduje",
      tú: "condujiste",
      él: "condujo",
      nosotros: "condujimos",
      vosotros: "condujísteis",
      ellos: "condujeron"
    }
  },
  {
    infinitive: "conocer",
    present: {
      yo: "conozco",
      tú: "conoces",
      él: "conoce",
      nosotros: "conocemos",
      vosotros: "conocéis",
      ellos: "conocen"
    },
    future: "conocer-",
    perfect: "conocido",
    indefinite: {
      yo: "conocí",
      tú: "conociste",
      él: "conoció",
      nosotros: "conocimos",
      vosotros: "conocísteis",
      ellos: "conocieron"
    }
  },
  {
    infinitive: "contar",
    present: {
      yo: "cuento",
      tú: "cuentas",
      él: "cuenta",
      nosotros: "contamos",
      vosotros: "contáis",
      ellos: "cuentan"
    },
    future: "contar-",
    perfect: "contado",
    indefinite: {
      yo: "conté",
      tú: "contaste",
      él: "contó",
      nosotros: "contamos",
      vosotros: "contásteis",
      ellos: "contaron"
    }
  },
  {
    infinitive: "dar",
    present: {
      yo: "doy",
      tú: "das",
      él: "da",
      nosotros: "damos",
      vosotros: "dais",
      ellos: "dan"
    },
    future: "dar-",
    perfect: "dado",
    indefinite: {
      yo: "di",
      tú: "diste",
      él: "dio",
      nosotros: "dimos",
      vosotros: "dísteis",
      ellos: "dieron"
    }
  },
  {
    infinitive: "decir",
    present: {
      yo: "digo",
      tú: "dices",
      él: "dice",
      nosotros: "decimos",
      vosotros: "decís",
      ellos: "dicen"
    },
    future: "dir-",
    perfect: "dicho",
    indefinite: {
      yo: "dije",
      tú: "dijiste",
      él: "dijo",
      nosotros: "dijimos",
      vosotros: "dijísteis",
      ellos: "dijeron"
    }
  },
  {
    infinitive: "despertarse",
    present: {
      yo: "me despierto",
      tú: "te despiertas",
      él: "se despierta",
      nosotros: "nos despertamos",
      vosotros: "despertáis",
      ellos: "se despiertan"
    },
    future: "despertar-",
    perfect: "despertado",
    indefinite: {
      yo: "me desperté",
      tú: "te despertaste",
      él: "se despertó",
      nosotros: "nos despertamos",
      vosotros: "despertásteis",
      ellos: "se despertaron"
    }
  },
  {
    infinitive: "divertirse",
    present: {
      yo: "me divierto",
      tú: "te diviertes",
      él: "se divierte",
      nosotros: "nos divertimos",
      vosotros: "os divertís",
      ellos: "se divierten"
    },
    future: "divertir-",
    perfect: "divertido",
    indefinite: {
      yo: "me divertí",
      tú: "te divertiste",
      él: "se divirtió",
      nosotros: "nos divertimos",
      vosotros: "os divertísteis",
      ellos: "se divirtieron"
    }
  },
  {
    infinitive: "dormir",
    present: {
      yo: "duermo",
      tú: "duermes",
      él: "duerme",
      nosotros: "dormimos",
      vosotros: "dormís",
      ellos: "duermen"
    },
    future: "dormir-",
    perfect: "dormido",
    indefinite: {
      yo: "dormí",
      tú: "dormiste",
      él: "durmió",
      nosotros: "dormimos",
      vosotros: "dormisteis",
      ellos: "durmieron"
    }
  },
  {
    infinitive: "empezar",
    present: {
      yo: "empiezo",
      tú: "empiezas",
      él: "empieza",
      nosotros: "empezamos",
      vosotros: "empezáis",
      ellos: "empiezan"
    },
    future: "empezar-",
    perfect: "empezado",
    indefinite: {
      yo: "empecé",
      tú: "empezaste",
      él: "empezó",
      nosotros: "empezamos",
      vosotros: "empezásteis",
      ellos: "empezaron"
    }
  },
  {
    infinitive: "encontrar",
    present: {
      yo: "encuentro",
      tú: "encuentras",
      él: "encuentra",
      nosotros: "encontramos",
      vosotros: "encontráis",
      ellos: "encuentran"
    },
    future: "encontrar-",
    perfect: "encontrado",
    indefinite: {
      yo: "encontré",
      tú: "encontraste",
      él: "encontró",
      nosotros: "encontramos",
      vosotros: "encontrásteis",
      ellos: "encontraron"
    }
  },
  {
    infinitive: "entender",
    present: {
      yo: "entiendo",
      tú: "entiendes",
      él: "entiende",
      nosotros: "entendemos",
      vosotros: "entendéis",
      ellos: "entienden"
    },
    future: "entender-",
    perfect: "entendido",
    indefinite: {
      yo: "entendí",
      tú: "entendiste",
      él: "entendió",
      nosotros: "entendimos",
      vosotros: "entendísteis",
      ellos: "entendieron"
    }
  },
  {
    infinitive: "estar",
    present: {
      yo: "estoy",
      tú: "estás",
      él: "está",
      nosotros: "estamos",
      vosotros: "estáis",
      ellos: "están"
    },
    future: "estar-",
    perfect: "estado",
    indefinite: {
      yo: "estuve",
      tú: "estuviste",
      él: "estuvo",
      nosotros: "estuvimos",
      vosotros: "estuvisteis",
      ellos: "estuvieron"
    }
  },
  {
    infinitive: "haber",
    present: {
      yo: "he",
      tú: "has",
      él: "ha",
      nosotros: "hemos",
      vosotros: "habéis",
      ellos: "han"
    },
    future: "habr-",
    perfect: "habido",
    indefinite: {
      yo: "hube",
      tú: "hubiste",
      él: "hubo",
      nosotros: "hubimos",
      vosotros: "hubísteis",
      ellos: "hubieron"
    }
  },
  {
    infinitive: "hacer",
    present: {
      yo: "hago",
      tú: "haces",
      él: "hace",
      nosotros: "hacemos",
      vosotros: "hacéis",
      ellos: "hacen"
    },
    future: "har-",
    perfect: "hecho",
    indefinite: {
      yo: "hice",
      tú: "hiciste",
      él: "hizo",
      nosotros: "hicimos",
      vosotros: "hicísteis",
      ellos: "hicieron"
    }
  },
  {
    infinitive: "ir",
    present: {
      yo: "voy",
      tú: "vas",
      él: "va",
      nosotros: "vamos",
      vosotros: "vais",
      ellos: "van"
    },
    future: "ir-",
    perfect: "ido",
    indefinite: {
      yo: "fui",
      tú: "fuiste",
      él: "fue",
      nosotros: "fuimos",
      vosotros: "fuísteis",
      ellos: "fueron"
    }
  },
  {
    infinitive: "jugar",
    present: {
      yo: "juego",
      tú: "juegas",
      él: "juega",
      nosotros: "jugamos",
      vosotros: "jugáis",
      ellos: "juegan"
    },
    future: "jugar-",
    perfect: "jugado",
    indefinite: {
      yo: "jugué",
      tú: "jugaste",
      él: "jugó",
      nosotros: "jugamos",
      vosotros: "jugásteis",
      ellos: "jugaron"
    }
  },
  {
    infinitive: "mentir",
    present: {
      yo: "miento",
      tú: "mientes",
      él: "miente",
      nosotros: "mentimos",
      vosotros: "mentís",
      ellos: "mienten"
    },
    future: "mentir-",
    perfect: "mentido",
    indefinite: {
      yo: "mentí",
      tú: "mentiste",
      él: "mintió",
      nosotros: "mentimos",
      vosotros: "mentísteis",
      ellos: "mintieron"
    }
  },
];

function Wheel({ verbs, rotation, setRotation, setSelectedIndex }) {
  const wheelRef = useRef(null);
  const dragging = useRef(false);
  const startAngle = useRef(0);

  const size = 800;
  const center = size / 2;
  const radius = 320;

  const getAngle = (x, y) =>
    Math.atan2(y - center, x - center) * (180 / Math.PI);

  const handleMouseDown = (e) => {
    dragging.current = true;
    const rect = wheelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startAngle.current = getAngle(x, y) - rotation;
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    const rect = wheelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRotation = getAngle(x, y) - startAngle.current;
    setRotation(newRotation);

    const anglePerItem = 360 / verbs.length;
    let normalized = (-newRotation % 360 + 360) % 360;

    const index = Math.round(normalized / anglePerItem) % verbs.length;
    setSelectedIndex(index);
  };

  const handleMouseUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    const anglePerItem = 360 / verbs.length;

    let normalized = (-rotation % 360 + 360) % 360;
    const index = Math.round(normalized / anglePerItem) % verbs.length;

    const snappedRotation = -index * anglePerItem;

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
  }, [handleMouseMove, handleMouseUp]);

  const angleStep = 360 / verbs.length;

  return (
    <div
      ref={wheelRef}
      className="wheel"
      style={{
        transform: `rotate(${rotation - 90}deg)`,
        width: size,
        height: size,
      }}
      onMouseDown={handleMouseDown}
    >
      {verbs.map((verb, index) => {
        const angle = index * angleStep;

        return (
          <div
            key={verb.infinitive}
            className="wheel-item"
            style={{
              transform: `
                rotate(${angle}deg)
                translate(${radius}px)
                rotate(-${angle}deg)
              `,
            }}
          >
            {verb.infinitive}
          </div>
        );
      })}
    </div>
  );
}

function ConjugationDisplay({ verb }) {
  return (
    <div className="center">
      <h2>{verb.infinitive}</h2>

      <div className="row">
        {Object.entries(verb.present).map(([p, f]) => (
          <div key={p} className="cell">
            <strong>{p}</strong>
            <div>{f}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="app">
      <h1>Verb Wheel 🎡</h1>

      <div className="wheel-container">
        <Wheel
          verbs={verbs}
          rotation={rotation}
          setRotation={setRotation}
          setSelectedIndex={setSelectedIndex}
        />

        <ConjugationDisplay verb={verbs[selectedIndex]} />
      </div>
    </div>
  );
}