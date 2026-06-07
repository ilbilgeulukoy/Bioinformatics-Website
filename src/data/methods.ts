export type MethodStatus = "interactive" | "explanation";

export type Method = {
  id: string;
  title: string;
  category: string;
  file: string;
  status: MethodStatus;
  definition: string;
  relevance: string;
  algorithmicIdea: string;
  input: string;
  output: string;
};

export const methods: Method[] = [
  {
    id: "exact-pattern",
    title: "Exact Pattern Localization in DNA",
    category: "String matching",
    file: "count_pattern.py",
    status: "interactive",
    definition:
      "Exact pattern matching identifies every starting position at which a query pattern occurs in a DNA sequence without mismatches.",
    relevance:
      "This operation is a basic component of motif localization, restriction site detection, primer inspection, and sequence annotation.",
    algorithmicIdea:
      "A window of length |Pattern| is moved along the sequence. At each position, the substring is compared with the query pattern.",
    input: "A DNA sequence and a query pattern.",
    output: "A list of zero-based starting positions.",
  },
  {
    id: "approx-pattern",
    title: "Approximate Pattern Localization",
    category: "String matching",
    file: "pattern_position.py",
    status: "interactive",
    definition:
      "Approximate pattern matching identifies positions where a pattern occurs with at most d mismatches.",
    relevance:
      "Mismatch-tolerant search is used when substitutions, sequence variation, or sequencing errors must be considered.",
    algorithmicIdea:
      "For each substring of length |Pattern|, compute its Hamming distance to the pattern and retain positions with distance ≤ d.",
    input: "A pattern, a DNA text, and a maximum mismatch value d.",
    output: "A list of zero-based positions satisfying the mismatch threshold.",
  },
  {
    id: "hamming",
    title: "Hamming Distance Between DNA Strings",
    category: "Sequence comparison",
    file: "hamming_distance.py",
    status: "interactive",
    definition:
      "Hamming distance is the number of positions at which two strings of equal length differ.",
    relevance:
      "It provides a simple measure of substitution differences between aligned sequences.",
    algorithmicIdea:
      "Compare the two strings position by position and count unequal character pairs.",
    input: "Two DNA strings of equal length.",
    output: "An integer distance.",
  },
  {
    id: "neighborhood",
    title: "d-Neighborhood of a DNA Pattern",
    category: "Mismatch models",
    file: "neighbourhood.py",
    status: "interactive",
    definition:
      "The d-neighborhood of a pattern is the set of all DNA strings whose Hamming distance from the pattern is at most d.",
    relevance:
      "Neighborhood generation is used in motif enumeration and approximate pattern search.",
    algorithmicIdea:
      "Generate candidate strings over A, C, G, and T, then retain candidates within the allowed Hamming distance.",
    input: "A DNA pattern and an integer d.",
    output: "A set of neighboring k-mers.",
  },
  {
    id: "expected-kmer",
    title: "Expected Occurrence of a Specific k-mer",
    category: "Probability",
    file: "k-mer_occurences.py",
    status: "interactive",
    definition:
      "This calculation estimates the expected number of occurrences of a specific k-mer in multiple random DNA sequences.",
    relevance:
      "Expected k-mer counts provide a simple null model for interpreting observed sequence word frequencies.",
    algorithmicIdea:
      "For a sequence of length L, there are L-k+1 possible starting positions. Under a uniform DNA model, the probability of a specific k-mer is 0.25^k.",
    input: "k-mer length, sequence length, and number of sequences.",
    output: "The expected total number of occurrences.",
  },
  {
    id: "kmer-probability",
    title: "Binomial Model for Implanted k-mer Sampling",
    category: "Probability",
    file: "k-mer_probability.py",
    status: "explanation",
    definition:
      "This method computes the probability that at least two sampled k-mers correspond to implanted k-mers across independent strings.",
    relevance:
      "It illustrates how a binomial model can be used for sequence sampling problems.",
    algorithmicIdea:
      "Let X follow a binomial distribution. Compute P(X ≥ 2) as 1 - P(X = 0) - P(X = 1).",
    input: "Number of strings, sequence length, and k-mer length.",
    output: "A probability.",
  },
  {
    id: "median-string",
    title: "Median String Problem",
    category: "Motif discovery",
    file: "min_k-mer_d.py",
    status: "explanation",
    definition:
      "The median string problem seeks the k-mer minimizing the total distance to a collection of DNA sequences.",
    relevance:
      "It is a motif discovery formulation where each candidate pattern is evaluated by its closest occurrence in every sequence.",
    algorithmicIdea:
      "Enumerate all possible k-mers and compute the sum of minimum Hamming distances to each DNA string.",
    input: "k and a list of DNA sequences.",
    output: "The k-mer with minimum total distance.",
  },
  {
    id: "profile-most-probable",
    title: "Profile-most Probable k-mer",
    category: "Motif discovery",
    file: "motif_search.py",
    status: "explanation",
    definition:
      "Given a profile matrix, this method identifies the k-mer in a DNA sequence with the highest probability under the profile.",
    relevance:
      "It is used inside profile-based motif search algorithms.",
    algorithmicIdea:
      "For each k-mer, multiply the profile probabilities corresponding to its bases and positions.",
    input: "A DNA sequence, k, and a 4 × k profile matrix.",
    output: "The profile-most probable k-mer.",
  },
  {
    id: "motif-enumeration",
    title: "(k,d)-Motif Enumeration",
    category: "Motif discovery",
    file: "motif_enumeration.py",
    status: "explanation",
    definition:
      "Motif enumeration finds all k-mers that appear in every DNA string with at most d mismatches.",
    relevance:
      "It is an exhaustive approach for detecting shared approximate motifs.",
    algorithmicIdea:
      "Generate neighbors of observed k-mers and test whether each candidate appears in all sequences within distance d.",
    input: "k, d, and a list of DNA sequences.",
    output: "All valid (k, d)-motifs.",
  },
  {
    id: "greedy-motif",
    title: "Greedy Motif Search with Pseudocounts",
    category: "Motif discovery",
    file: "greedy_motif.py",
    status: "explanation",
    definition:
      "Greedy motif search builds a motif set iteratively using profile matrices with pseudocounts.",
    relevance:
      "It is a heuristic method for motif discovery when exhaustive search is computationally expensive.",
    algorithmicIdea:
      "Start from each k-mer in the first sequence, build a profile from selected motifs, and choose profile-most probable k-mers in the remaining sequences.",
    input: "k, t, and t DNA sequences.",
    output: "A selected motif set.",
  },
  {
    id: "randomized-motif",
    title: "Randomized Motif Search",
    category: "Motif discovery",
    file: "RandomizedMotifSearch.py",
    status: "explanation",
    definition:
      "Randomized motif search starts with random k-mers and iteratively updates motifs using a profile matrix.",
    relevance:
      "It introduces stochastic optimization into motif discovery.",
    algorithmicIdea:
      "Randomly select motifs, build a pseudocount profile, replace motifs by profile-most probable k-mers, and retain improvements.",
    input: "k, t, and t DNA sequences.",
    output: "A motif set with low score across random starts.",
  },
  {
    id: "gibbs",
    title: "Gibbs Sampler for Motif Discovery",
    category: "Motif discovery",
    file: "gibbs_sampler.py",
    status: "explanation",
    definition:
      "Gibbs sampling updates one motif at a time by sampling a k-mer according to probabilities induced by a profile matrix.",
    relevance:
      "It is a probabilistic motif discovery method for noisy sequence sets.",
    algorithmicIdea:
      "Remove one motif, build a profile from the remaining motifs, sample a replacement k-mer, and retain improved motif sets.",
    input: "k, t, number of iterations, and DNA sequences.",
    output: "A motif set selected by repeated stochastic updates.",
  },
  {
    id: "entropy",
    title: "Entropy of Motif Profile Columns",
    category: "Motif scoring",
    file: "entropy.py",
    status: "interactive",
    definition:
      "Entropy measures uncertainty in a probability distribution. In motif analysis, column entropy summarizes how conserved each position is.",
    relevance:
      "Low entropy indicates conservation; high entropy indicates variability.",
    algorithmicIdea:
      "Build a profile matrix from aligned motifs and compute -p log2(p) for each non-zero nucleotide frequency.",
    input: "A set of aligned motifs.",
    output: "Column entropy values and total entropy.",
  },
  {
    id: "motif-score",
    title: "Motif Score and Consensus Mismatch",
    category: "Motif scoring",
    file: "motif_score.py",
    status: "explanation",
    definition:
      "Motif score summarizes the mismatch burden of a motif set relative to a consensus sequence.",
    relevance:
      "It is used to compare candidate motif sets during motif search.",
    algorithmicIdea:
      "For each column, count bases that differ from the most frequent base and sum across columns.",
    input: "A motif set or motif dimensions depending on the scoring formulation.",
    output: "A score value.",
  },
  {
    id: "skew",
    title: "Cumulative GC Skew",
    category: "Genome-scale signal",
    file: "skew_v2.py",
    status: "interactive",
    definition:
      "Genome skew is the cumulative difference between G and C counts along a DNA sequence.",
    relevance:
      "Minimum skew positions are often studied in relation to bacterial replication origin analysis.",
    algorithmicIdea:
      "Start from zero; add 1 for G, subtract 1 for C, and leave the value unchanged for A or T.",
    input: "A DNA sequence.",
    output: "Skew values and positions where skew is minimal.",
  },
  {
    id: "palindrome",
    title: "Reverse-complement Palindromic Sequence",
    category: "Reverse complement",
    file: "palindrom.py",
    status: "interactive",
    definition:
      "A reverse-complement palindrome is a DNA sequence equal to its reverse complement.",
    relevance:
      "Reverse-complement palindromes are relevant for restriction sites, binding patterns, and strand-symmetric sequence structures.",
    algorithmicIdea:
      "Generate the first half, reverse it, replace each nucleotide by its complement, and append the result.",
    input: "A first-half DNA sequence.",
    output: "A reverse-complement palindromic DNA sequence.",
  },
];
