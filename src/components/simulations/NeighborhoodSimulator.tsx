import { useMemo, useState } from "react";
import { cleanDNA, generateNeighbors } from "../../utils/sequenceAlgorithms";

function NeighborhoodSimulator() {
  const [pattern, setPattern] = useState("ACG");
  const [d, setD] = useState(1);

  const cleanPattern = cleanDNA(pattern);
  const neighbors = useMemo(
    () => generateNeighbors(cleanPattern, d),
    [cleanPattern, d]
  );

  return (
    <div className="interactiveCard">
      <label>
        Pattern
        <input value={pattern} onChange={(event) => setPattern(event.target.value)} />
      </label>

      <label>
        Maximum mismatches d
        <input
          type="number"
          min="0"
          max="3"
          value={d}
          onChange={(event) => setD(Number(event.target.value))}
        />
      </label>

      <div className="visualBlock">
        <p className="miniTitle">d-neighborhood size: {neighbors.length}</p>
        <div className="pillWrap">
          {neighbors.slice(0, 80).map((neighbor) => (
            <span className="kmerPill" key={neighbor}>
              {neighbor}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NeighborhoodSimulator;
