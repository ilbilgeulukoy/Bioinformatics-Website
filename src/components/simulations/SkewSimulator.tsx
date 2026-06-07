import { useMemo, useState } from "react";
import { cleanDNA, computeSkew } from "../../utils/sequenceAlgorithms";

function SkewSimulator() {
  const [sequence, setSequence] = useState("CATGGGCATCGGCCATACGCC");

  const cleanSequence = cleanDNA(sequence);
  const { skew, minSkew, minPositions } = useMemo(
    () => computeSkew(cleanSequence),
    [cleanSequence]
  );

  const maxAbs = Math.max(...skew.map((value) => Math.abs(value)), 1);

  return (
    <div className="interactiveCard">
      <label>
        DNA sequence
        <textarea
          value={sequence}
          onChange={(event) => setSequence(event.target.value)}
        />
      </label>

      <div className="skewChart">
        {skew.map((value, index) => (
          <span
            key={index}
            title={`position ${index}: ${value}`}
            style={{ height: `${18 + (Math.abs(value) / maxAbs) * 80}px` }}
            className={value < 0 ? "skewBar negative" : "skewBar"}
          />
        ))}
      </div>

      <div className="resultBox">
        <strong>Minimum skew</strong>
        <span>{minSkew} at positions {minPositions.join(", ")}</span>
      </div>
    </div>
  );
}

export default SkewSimulator;
