export type MethodNote = {
  formula?: string;
  assumptions: string[];
  complexity?: string;
  steps: string[];
  glossary: { term: string; definition: string }[];
};

export const methodNotesById: Record<string, MethodNote> = {
  "exact-pattern": {
    formula: "For each position i, compare Text[i : i + k] with Pattern.",
    assumptions: [
      "The sequence is represented as a string over the alphabet A, C, G, T.",
      "A reported match requires exact equality between the pattern and the substring.",
    ],
    complexity: "O(nk), where n is the text length and k is the pattern length.",
    steps: [
      "Define the pattern length k.",
      "Move a window of length k along the DNA sequence.",
      "Compare each window with the query pattern.",
      "Return all zero-based starting positions where the strings are identical.",
    ],
    glossary: [
      { term: "Pattern", definition: "The query DNA word searched inside a longer sequence." },
      { term: "Window", definition: "A substring extracted from the text at a given position." },
    ],
  },

  "approx-pattern": {
    formula: "Report position i if HammingDistance(Pattern, Text[i : i + k]) ≤ d.",
    assumptions: [
      "The pattern and each compared window have the same length.",
      "Only substitutions are counted as mismatches; insertions and deletions are not modeled.",
      "The mismatch threshold d is fixed before the search.",
    ],
    complexity: "O(nk), where n is the text length and k is the pattern length.",
    steps: [
      "Extract every substring of length k from the DNA text.",
      "Compute the Hamming distance between the substring and the pattern.",
      "Keep the position if the distance is less than or equal to d.",
      "Return all accepted positions.",
    ],
    glossary: [
      { term: "Mismatch", definition: "A position where two aligned nucleotides differ." },
      { term: "d", definition: "The maximum number of allowed mismatches." },
    ],
  },

  hamming: {
    formula: "HammingDistance(p, q) = number of positions i such that p[i] ≠ q[i].",
    assumptions: [
      "The two strings must have equal length.",
      "The strings are compared position by position without gaps.",
      "The measure counts substitutions only.",
    ],
    complexity: "O(n), where n is the sequence length.",
    steps: [
      "Align the two sequences by position.",
      "Compare each pair of nucleotides.",
      "Increment the distance for each unequal pair.",
      "Return the total mismatch count.",
    ],
    glossary: [
      { term: "Aligned strings", definition: "Strings compared position by position." },
      { term: "Substitution", definition: "A nucleotide difference at an aligned position." },
    ],
  },

  neighborhood: {
    formula: "Neighbors(Pattern, d) = {x ∈ {A,C,G,T}^k : HammingDistance(x, Pattern) ≤ d}.",
    assumptions: [
      "All neighbors have the same length as the input pattern.",
      "Only substitutions are considered.",
      "The alphabet is restricted to A, C, G, T.",
    ],
    complexity: "Up to O(4^k · k) for exhaustive generation.",
    steps: [
      "Generate candidate k-mers over the DNA alphabet.",
      "Compute the Hamming distance between each candidate and the original pattern.",
      "Keep candidates with distance at most d.",
      "Return the resulting set.",
    ],
    glossary: [
      { term: "d-neighborhood", definition: "All strings within d mismatches of a pattern." },
      { term: "Candidate k-mer", definition: "A possible DNA word tested against the pattern." },
    ],
  },

  "expected-kmer": {
    formula: "E = N × (L - k + 1) × 0.25^k.",
    assumptions: [
      "Nucleotides are assumed independent.",
      "Each nucleotide has probability 0.25.",
      "The model describes a specific k-mer under a uniform random DNA model.",
    ],
    complexity: "O(1), because the expected value is computed directly.",
    steps: [
      "Compute the number of possible starting positions: L - k + 1.",
      "Compute the probability of one specific k-mer: 0.25^k.",
      "Multiply by the number of sequences.",
      "Return the expected total count.",
    ],
    glossary: [
      { term: "Expected value", definition: "The average value predicted by a probability model." },
      { term: "Uniform DNA model", definition: "A model where A, C, G, and T have equal probability." },
    ],
  },

  "kmer-probability": {
    formula: "P(X ≥ 2) = 1 - P(X = 0) - P(X = 1), with X ~ Binomial(n, p).",
    assumptions: [
      "The sampled strings are treated as independent.",
      "Each string has one implanted k-mer position among L - k + 1 possible positions.",
      "The probability of sampling the implanted k-mer is p = 1 / (L - k + 1).",
    ],
    complexity: "O(1), using the closed-form binomial expression.",
    steps: [
      "Define the number of independent strings n.",
      "Compute the probability p of recovering the implanted k-mer from one string.",
      "Compute P(X = 0) and P(X = 1).",
      "Subtract both from 1 to obtain P(X ≥ 2).",
    ],
    glossary: [
      { term: "Binomial model", definition: "A probability model counting successes across independent trials." },
      { term: "Implanted k-mer", definition: "A k-mer inserted or assumed to be present in each string." },
    ],
  },

  "median-string": {
    formula: "Find Pattern minimizing Σ min HammingDistance(Pattern, k-mer in DNA_i).",
    assumptions: [
      "All candidate patterns have fixed length k.",
      "Distance is computed using Hamming distance.",
      "The exhaustive version enumerates all 4^k candidate patterns.",
    ],
    complexity: "O(4^k · t · m · k), for t sequences of length m.",
    steps: [
      "Enumerate all possible k-mers over A, C, G, T.",
      "For each candidate, find its closest k-mer in each DNA sequence.",
      "Sum these minimum distances across all sequences.",
      "Return the candidate with the smallest total distance.",
    ],
    glossary: [
      { term: "Median string", definition: "The k-mer minimizing total distance to a set of sequences." },
      { term: "Total distance", definition: "The sum of closest-match distances across sequences." },
    ],
  },

  "profile-most-probable": {
    formula: "Probability(k-mer) = product of profile probabilities for each base and position.",
    assumptions: [
      "The profile matrix gives nucleotide probabilities for each motif position.",
      "Positions are treated independently in the simple profile model.",
      "The highest-probability k-mer is selected deterministically.",
    ],
    complexity: "O(nk), where n is the sequence length and k is the k-mer length.",
    steps: [
      "Scan every k-mer in the DNA sequence.",
      "For each k-mer, multiply the corresponding profile probabilities.",
      "Track the k-mer with the highest probability.",
      "Return the best-scoring k-mer.",
    ],
    glossary: [
      { term: "Profile matrix", definition: "A position-specific matrix of nucleotide probabilities." },
      { term: "Profile-most probable k-mer", definition: "The k-mer with the highest probability under a profile." },
    ],
  },

  "motif-enumeration": {
    formula: "Find all k-mers that occur in every DNA string with Hamming distance ≤ d.",
    assumptions: [
      "All motifs have fixed length k.",
      "Only substitutions are considered.",
      "A valid motif must appear in every sequence within the mismatch threshold.",
    ],
    complexity: "Can be exponential in k because neighbor sets may contain many candidates.",
    steps: [
      "Extract k-mers from each DNA sequence.",
      "Generate d-neighbors for observed k-mers.",
      "Test each candidate against every sequence.",
      "Return candidates appearing in all sequences within distance d.",
    ],
    glossary: [
      { term: "(k,d)-motif", definition: "A k-mer appearing in each sequence with at most d mismatches." },
      { term: "Enumeration", definition: "Systematic generation and testing of possible candidates." },
    ],
  },

  "greedy-motif": {
    formula: "Iteratively select profile-most probable k-mers using a pseudocount profile.",
    assumptions: [
      "The motif length k and number of sequences t are fixed.",
      "Pseudocounts prevent zero probabilities in the profile.",
      "The greedy procedure may find a local optimum rather than a global optimum.",
    ],
    complexity: "Approximately O(t · n^2 · k) depending on implementation and sequence lengths.",
    steps: [
      "Initialize candidate motifs using each k-mer from the first sequence.",
      "Build a profile from the motifs selected so far.",
      "Select the profile-most probable k-mer in the next sequence.",
      "Keep the motif set with the lowest score.",
    ],
    glossary: [
      { term: "Pseudocount", definition: "A small added count that avoids zero probability estimates." },
      { term: "Greedy algorithm", definition: "An algorithm making the locally best choice at each step." },
    ],
  },

  "randomized-motif": {
    formula: "Randomly initialize motifs, then update them using profile-most probable k-mers.",
    assumptions: [
      "Random initialization means different runs may produce different motif sets.",
      "Pseudocounts are used in profile estimation.",
      "Multiple random starts improve the chance of finding a lower-scoring motif set.",
    ],
    complexity: "Depends on the number of random starts and update iterations.",
    steps: [
      "Select a random k-mer from each sequence.",
      "Build a profile matrix from the current motifs.",
      "Replace motifs with profile-most probable k-mers.",
      "Repeat while the score improves.",
    ],
    glossary: [
      { term: "Random start", definition: "An initial motif set chosen randomly." },
      { term: "Score", definition: "A measure of disagreement from the consensus motif." },
    ],
  },

  gibbs: {
    formula: "Repeatedly remove one motif and sample a replacement according to profile-induced probabilities.",
    assumptions: [
      "One sequence is updated at each iteration.",
      "The profile is estimated from all motifs except the removed one.",
      "The replacement k-mer is sampled probabilistically, not always chosen as the maximum.",
    ],
    complexity: "Depends on sequence length, motif length, iteration count, and number of random starts.",
    steps: [
      "Initialize one random k-mer per sequence.",
      "Randomly choose one sequence to update.",
      "Build a profile from all other motifs.",
      "Sample a new k-mer for the removed sequence according to profile probabilities.",
      "Keep the best motif set observed.",
    ],
    glossary: [
      { term: "Gibbs sampling", definition: "A stochastic procedure updating one variable at a time." },
      { term: "Weighted sampling", definition: "Random selection where candidates have different probabilities." },
    ],
  },

  entropy: {
    formula: "H = -Σ p log2(p) for each motif profile column.",
    assumptions: [
      "Motifs are aligned and have comparable positions.",
      "Column probabilities are estimated from observed nucleotide frequencies.",
      "Zero-probability terms contribute zero to entropy.",
    ],
    complexity: "O(tk), where t is the number of motifs and k is motif length.",
    steps: [
      "Align the motif sequences.",
      "Compute nucleotide frequencies at each position.",
      "Calculate entropy for each column.",
      "Sum column entropies to obtain total profile entropy.",
    ],
    glossary: [
      { term: "Entropy", definition: "A measure of uncertainty in a probability distribution." },
      { term: "Conservation", definition: "Low variability at a motif position across sequences." },
    ],
  },

  "motif-score": {
    formula: "Score = total number of symbols differing from the consensus across all columns.",
    assumptions: [
      "Motifs are aligned and have equal length.",
      "The consensus base is the most frequent base in each column.",
      "Lower scores indicate stronger agreement with a consensus pattern.",
    ],
    complexity: "O(tk), where t is the number of motifs and k is motif length.",
    steps: [
      "Build the consensus sequence column by column.",
      "For each motif, compare every position to the consensus.",
      "Count mismatches.",
      "Sum mismatches across the motif set.",
    ],
    glossary: [
      { term: "Consensus", definition: "The most frequent symbol at each motif position." },
      { term: "Motif score", definition: "A mismatch-based measure of motif-set compactness." },
    ],
  },

  skew: {
    formula: "Skew(i) = count(G in prefix i) - count(C in prefix i).",
    assumptions: [
      "Only G and C affect the skew value.",
      "A and T do not change cumulative skew.",
      "The interpretation of minimum skew is context-dependent and strongest in bacterial genome analysis.",
    ],
    complexity: "O(n), where n is the sequence length.",
    steps: [
      "Initialize skew at zero.",
      "Read the sequence from left to right.",
      "Add 1 for G and subtract 1 for C.",
      "Record positions where cumulative skew is minimal.",
    ],
    glossary: [
      { term: "GC skew", definition: "The cumulative excess of G over C along a sequence." },
      { term: "Minimum skew", definition: "Positions where the cumulative skew reaches its lowest value." },
    ],
  },

  palindrome: {
    formula: "Palindrome = firstHalf + reverseComplement(firstHalf).",
    assumptions: [
      "The generated sequence has even length.",
      "Complement rules are A↔T and C↔G.",
      "The sequence is palindromic in the reverse-complement sense, not the ordinary text palindrome sense.",
    ],
    complexity: "O(n), where n is the length of the first half.",
    steps: [
      "Take the first half of the sequence.",
      "Reverse the first half.",
      "Replace each nucleotide by its complement.",
      "Append the result to the original first half.",
    ],
    glossary: [
      { term: "Reverse complement", definition: "The reverse of a DNA string after replacing each base by its complement." },
      { term: "DNA palindrome", definition: "A sequence equal to its reverse complement." },
    ],
  },
};
