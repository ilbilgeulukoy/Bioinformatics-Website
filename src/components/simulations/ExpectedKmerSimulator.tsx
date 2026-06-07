import { useMemo, useState } from "react";
import { expectedKmerOccurrences } from "../../utils/sequenceAlgorithms";

function ExpectedKmerSimulator() {
  const [k, setK] = useState(9);
  const [sequenceLength, setSequenceLength] = useState(1000);
  const [numberOfSequences, setNumberOfSequences] = useState(500);

  const expected = useMemo(
    () => expectedKmerOccurrences(k, sequenceLength, numberOfSequences),
    [k, sequenceLength, numberOfSequences]
  );

  return (
    <div className="interactiveCard">
      <label>
        k-mer length
        <input
          type="number"
          min="1"
          max="20"
          value={k}
          onChange={(event) => setK(Number(event.target.value))}
        />
      </label>

      <label>
        Sequence length
        <input
          type="number"
          min="1"
          value={sequenceLength}
          onChange={(event) => setSequenceLength(Number(event.target.value))}
        />
      </label>

      <label>
        Number of sequences
        <input
          type="number"
          min="1"
          value={numberOfSequences}
          onChange={(event) => setNumberOfSequences(Number(event.target.value))}
        />
      </label>

      <div className="formulaBox">
        <p className="miniTitle">Expected value</p>
        <p>E = number of sequences × (L - k + 1) × 0.25^k</p>
      </div>

      <div className="resultBox">
        <strong>Expected occurrences</strong>
        <span>{expected.toFixed(4)}</span>
      </div>
    </div>
  );
}

export default ExpectedKmerSimulator;
