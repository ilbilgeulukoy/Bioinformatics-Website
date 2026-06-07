import { useMemo, useState } from "react";
import { cleanDNA, exactPatternPositions } from "../../utils/sequenceAlgorithms";

function ExactPatternSimulator() {
  const [sequence, setSequence] = useState("ACGTTGCATGTCGCATGATGCATGAGAGCT");
  const [pattern, setPattern] = useState("CAT");

  const cleanSequence = cleanDNA(sequence);
  const cleanPattern = cleanDNA(pattern);

  const positions = useMemo(
    () => exactPatternPositions(cleanSequence, cleanPattern),
    [cleanSequence, cleanPattern]
  );

  return (
    <div className="interactiveCard">
      <label>
        DNA sequence
        <textarea value={sequence} onChange={(event) => setSequence(event.target.value)} />
      </label>

      <label>
        Pattern
        <input value={pattern} onChange={(event) => setPattern(event.target.value)} />
      </label>

      <div className="visualBlock">
        <p className="miniTitle">Matched positions</p>
        <div className="baseLine">
          {cleanSequence.split("").map((base, index) => {
            const hit = positions.some(
              (position) => index >= position && index < position + cleanPattern.length
            );

            return (
              <span className={hit ? "base hit" : "base"} key={index}>
                {base}
              </span>
            );
          })}
        </div>
      </div>

      <div className="resultBox">
        <strong>Positions</strong>
        <span>{positions.length ? positions.join(", ") : "No exact match"}</span>
      </div>
    </div>
  );
}

export default ExactPatternSimulator;
