import { useMemo, useState } from "react";
import { approximatePatternPositions, cleanDNA } from "../../utils/sequenceAlgorithms";

function ApproximatePatternSimulator() {
  const [sequence, setSequence] = useState("CGCCCGAATCCAGAACGCATTCCCATATT");
  const [pattern, setPattern] = useState("ATTCTGGA");
  const [d, setD] = useState(3);

  const cleanSequence = cleanDNA(sequence);
  const cleanPattern = cleanDNA(pattern);

  const matches = useMemo(
    () => approximatePatternPositions(cleanSequence, cleanPattern, d),
    [cleanSequence, cleanPattern, d]
  );

  return (
    <div className="interactiveCard">
      <label>
        DNA text
        <textarea value={sequence} onChange={(event) => setSequence(event.target.value)} />
      </label>

      <label>
        Pattern
        <input value={pattern} onChange={(event) => setPattern(event.target.value)} />
      </label>

      <label>
        Maximum mismatches d
        <input
          type="number"
          min="0"
          max="10"
          value={d}
          onChange={(event) => setD(Number(event.target.value))}
        />
      </label>

      <div className="tableBlock">
        <p className="miniTitle">Accepted windows</p>
        {matches.length ? (
          matches.slice(0, 12).map((match) => (
            <div className="tableRow" key={match.position + match.substring}>
              <span>{match.position}: {match.substring}</span>
              <b>d = {match.distance}</b>
            </div>
          ))
        ) : (
          <p className="mutedText">No position satisfies the mismatch threshold.</p>
        )}
      </div>
    </div>
  );
}

export default ApproximatePatternSimulator;
