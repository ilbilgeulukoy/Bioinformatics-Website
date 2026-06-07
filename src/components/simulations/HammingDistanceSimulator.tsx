import { useMemo, useState } from "react";
import { cleanDNA, hammingDistance } from "../../utils/sequenceAlgorithms";

function HammingDistanceSimulator() {
  const [seqA, setSeqA] = useState("GGGCCGTTGGT");
  const [seqB, setSeqB] = useState("GGACCGTTGAC");

  const cleanA = cleanDNA(seqA);
  const cleanB = cleanDNA(seqB);

  const distance = useMemo(() => hammingDistance(cleanA, cleanB), [cleanA, cleanB]);

  return (
    <div className="interactiveCard">
      <label>
        Sequence 1
        <input value={seqA} onChange={(event) => setSeqA(event.target.value)} />
      </label>

      <label>
        Sequence 2
        <input value={seqB} onChange={(event) => setSeqB(event.target.value)} />
      </label>

      <div className="comparison">
        <div className="baseLine">
          {cleanA.split("").map((base, index) => (
            <span
              className={cleanB[index] && cleanB[index] !== base ? "base mismatch" : "base"}
              key={"a" + index}
            >
              {base}
            </span>
          ))}
        </div>

        <div className="baseLine">
          {cleanB.split("").map((base, index) => (
            <span
              className={cleanA[index] && cleanA[index] !== base ? "base mismatch" : "base"}
              key={"b" + index}
            >
              {base}
            </span>
          ))}
        </div>
      </div>

      <div className="resultBox">
        <strong>Hamming distance</strong>
        <span>{distance === null ? "Sequences must have equal length" : distance}</span>
      </div>
    </div>
  );
}

export default HammingDistanceSimulator;
