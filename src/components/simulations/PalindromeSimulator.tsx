import { useState } from "react";
import {
  buildReverseComplementPalindrome,
  cleanDNA,
  reverseComplement,
} from "../../utils/sequenceAlgorithms";

function PalindromeSimulator() {
  const [firstHalf, setFirstHalf] = useState("AACG");

  const cleanHalf = cleanDNA(firstHalf);
  const secondHalf = reverseComplement(cleanHalf);
  const palindrome = buildReverseComplementPalindrome(cleanHalf);

  return (
    <div className="interactiveCard">
      <label>
        First half
        <input
          value={firstHalf}
          onChange={(event) => setFirstHalf(event.target.value)}
        />
      </label>

      <div className="strandBox">
        <div>
          <p className="miniTitle">First half</p>
          <div className="baseLine">
            {cleanHalf.split("").map((base, index) => (
              <span className="base" key={"first" + index}>
                {base}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="miniTitle">Reverse complement appended as second half</p>
          <div className="baseLine">
            {secondHalf.split("").map((base, index) => (
              <span className="base complement" key={"second" + index}>
                {base}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="resultBox">
        <strong>Palindrome</strong>
        <span>{palindrome}</span>
      </div>
    </div>
  );
}

export default PalindromeSimulator;
