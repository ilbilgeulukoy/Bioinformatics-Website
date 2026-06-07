import { useMemo, useState } from "react";
import { entropy, profileFromMotifs } from "../../utils/sequenceAlgorithms";

function EntropySimulator() {
  const [motifsText, setMotifsText] = useState(
    "TCGGGGGTTTTT\nCCGGTGACTTAC\nACGGGGATTTTC\nTTGGGGACTTTT"
  );

  const motifs = motifsText
    .split(/\s+/)
    .map((motif) => motif.trim())
    .filter(Boolean);

  const profile = useMemo(() => profileFromMotifs(motifs), [motifsText]);
  const entropies = profile.map(entropy);
  const total = entropies.reduce((sum, value) => sum + value, 0);

  return (
    <div className="interactiveCard">
      <label>
        Aligned motifs
        <textarea
          value={motifsText}
          onChange={(event) => setMotifsText(event.target.value)}
        />
      </label>

      <div className="tableBlock">
        <p className="miniTitle">Column entropy</p>
        {entropies.map((value, index) => (
          <div className="tableRow" key={index}>
            <span>Position {index + 1}</span>
            <b>{value.toFixed(3)}</b>
          </div>
        ))}
      </div>

      <div className="resultBox">
        <strong>Total entropy</strong>
        <span>{total.toFixed(3)}</span>
      </div>
    </div>
  );
}

export default EntropySimulator;
