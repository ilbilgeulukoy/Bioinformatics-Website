export function cleanDNA(value: string) {
  return value.toUpperCase().replace(/[^ACGT]/g, "");
}

export function hammingDistance(a: string, b: string) {
  if (a.length !== b.length) {
    return null;
  }

  let distance = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) distance += 1;
  }

  return distance;
}

export function exactPatternPositions(sequence: string, pattern: string) {
  const positions: number[] = [];
  if (!pattern || pattern.length > sequence.length) return positions;

  for (let i = 0; i <= sequence.length - pattern.length; i += 1) {
    if (sequence.slice(i, i + pattern.length) === pattern) {
      positions.push(i);
    }
  }

  return positions;
}

export function approximatePatternPositions(sequence: string, pattern: string, d: number) {
  const positions: { position: number; substring: string; distance: number }[] = [];
  if (!pattern || pattern.length > sequence.length) return positions;

  for (let i = 0; i <= sequence.length - pattern.length; i += 1) {
    const substring = sequence.slice(i, i + pattern.length);
    const distance = hammingDistance(pattern, substring);

    if (distance !== null && distance <= d) {
      positions.push({ position: i, substring, distance });
    }
  }

  return positions;
}

export function generateNeighbors(pattern: string, d: number) {
  const alphabet = ["A", "C", "G", "T"];
  const results: string[] = [];

  function build(prefix: string, index: number) {
    if (index === pattern.length) {
      const distance = hammingDistance(pattern, prefix);
      if (distance !== null && distance <= d) {
        results.push(prefix);
      }
      return;
    }

    alphabet.forEach((base) => build(prefix + base, index + 1));
  }

  build("", 0);
  return results.sort();
}

export function expectedKmerOccurrences(k: number, sequenceLength: number, numberOfSequences: number) {
  const positions = sequenceLength - k + 1;
  if (positions <= 0) return 0;

  const probability = Math.pow(0.25, k);
  return numberOfSequences * positions * probability;
}

export function reverseComplement(sequence: string) {
  const complement: Record<string, string> = {
    A: "T",
    T: "A",
    C: "G",
    G: "C",
  };

  return sequence
    .split("")
    .reverse()
    .map((base) => complement[base] || "")
    .join("");
}

export function buildReverseComplementPalindrome(firstHalf: string) {
  return firstHalf + reverseComplement(firstHalf);
}

export function computeSkew(sequence: string) {
  const skew = [0];
  let minSkew = 0;
  let minPositions = [0];

  sequence.split("").forEach((base, index) => {
    const previous = skew[skew.length - 1];

    if (base === "G") skew.push(previous + 1);
    else if (base === "C") skew.push(previous - 1);
    else skew.push(previous);

    const current = skew[skew.length - 1];

    if (current < minSkew) {
      minSkew = current;
      minPositions = [index + 1];
    } else if (current === minSkew) {
      minPositions.push(index + 1);
    }
  });

  return { skew, minSkew, minPositions };
}

export function profileFromMotifs(motifs: string[]) {
  const cleanMotifs = motifs.map(cleanDNA).filter(Boolean);
  if (cleanMotifs.length === 0) return [];

  const length = Math.min(...cleanMotifs.map((motif) => motif.length));
  const alphabet = ["A", "C", "G", "T"];

  return Array.from({ length }, (_, position) => {
    return alphabet.map((base) => {
      const count = cleanMotifs.filter((motif) => motif[position] === base).length;
      return count / cleanMotifs.length;
    });
  });
}

export function entropy(distribution: number[]) {
  return distribution.reduce((total, p) => {
    if (p === 0) return total;
    return total + -p * Math.log2(p);
  }, 0);
}
