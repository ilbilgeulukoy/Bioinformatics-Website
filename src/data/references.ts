export type ScientificReference = {
  title: string;
  authors: string;
  source: string;
  url: string;
  note: string;
};

export const referencesByMethod: Record<string, ScientificReference[]> = {
  "exact-pattern": [
    {
      title: "Lightweight Pattern Matching Method for DNA Sequencing in IoT Healthcare",
      authors: "Rexie et al.",
      source: "PubMed / PMC",
      url: "https://pubmed.ncbi.nlm.nih.gov/36120669/",
      note: "Uses DNA pattern matching as a sequence identification problem.",
    },
    {
      title: "Quantum-effective exact multiple patterns matching algorithms for biological sequences",
      authors: "Soni et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9138144/",
      note: "Discusses exact multiple pattern matching in biological sequence processing.",
    },
  ],

  "approx-pattern": [
    {
      title: "Lightweight Pattern Matching Method for DNA Sequencing in IoT Healthcare",
      authors: "Rexie et al.",
      source: "PubMed / PMC",
      url: "https://pubmed.ncbi.nlm.nih.gov/36120669/",
      note: "Frames exact and approximate sequence matching as relevant DNA analysis tasks.",
    },
    {
      title: "SeArcH schemes for Approximate stRing mAtching",
      authors: "Gottlieb et al.",
      source: "PubMed / PMC",
      url: "https://pubmed.ncbi.nlm.nih.gov/40104676/",
      note: "Discusses approximate string matching as a central stringology problem with bioinformatics applications.",
    },
  ],

  hamming: [
    {
      title: "Hamming Distance as a Concept in DNA Molecular Recognition",
      authors: "Mohammadi-Kambs et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5410656/",
      note: "Uses Hamming distance to reason about DNA molecular recognition.",
    },
    {
      title: "Genome-scale ncRNA homology search using a Hamming distance-based filtration strategy",
      authors: "Sun et al.",
      source: "PubMed",
      url: "https://pubmed.ncbi.nlm.nih.gov/22536896/",
      note: "Example of Hamming-distance-based filtering in sequence homology search.",
    },
  ],

  neighborhood: [
    {
      title: "A survey of DNA motif finding algorithms",
      authors: "Das and Dai",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2099490/",
      note: "Covers motif finding approaches where mismatch neighborhoods are a core computational idea.",
    },
    {
      title: "Motif discovery and transcription factor binding sites before and after the next-generation sequencing era",
      authors: "Zambelli et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3603212/",
      note: "Reviews motif discovery and the computational search for recurring DNA patterns.",
    },
  ],

  "expected-kmer": [
    {
      title: "A survey of k-mer methods and applications in bioinformatics",
      authors: "Moeckel et al.",
      source: "PubMed / PMC",
      url: "https://pubmed.ncbi.nlm.nih.gov/38840832/",
      note: "Reviews k-mer methods and their applications in genomic and proteomic analyses.",
    },
    {
      title: "A Benchmark Study of K-Mer Counting Methods for High-Throughput Sequencing",
      authors: "Manekar and Sathe",
      source: "PubMed / PMC",
      url: "https://pubmed.ncbi.nlm.nih.gov/30346548/",
      note: "Evaluates k-mer counting approaches for high-throughput sequencing datasets.",
    },
  ],

  "kmer-probability": [
    {
      title: "A survey of k-mer methods and applications in bioinformatics",
      authors: "Moeckel et al.",
      source: "PubMed / PMC",
      url: "https://pubmed.ncbi.nlm.nih.gov/38840832/",
      note: "Provides background for k-mer-based representations and applications.",
    },
    {
      title: "Estimation of genomic characteristics by analyzing k-mer frequency in de novo genome projects",
      authors: "Liu et al.",
      source: "Preprint / genomics method reference",
      url: "https://arxiv.org/abs/1308.2012",
      note: "Uses k-mer frequency distributions for genome characterization.",
    },
  ],

  "median-string": [
    {
      title: "A survey of DNA motif finding algorithms",
      authors: "Das and Dai",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2099490/",
      note: "Reviews motif finding formulations including combinatorial motif search concepts.",
    },
    {
      title: "Motif discovery and transcription factor binding sites before and after the next-generation sequencing era",
      authors: "Zambelli et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3603212/",
      note: "Contextualizes motif discovery as a central problem in regulatory sequence analysis.",
    },
  ],

  "profile-most-probable": [
    {
      title: "A survey of DNA motif finding algorithms",
      authors: "Das and Dai",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2099490/",
      note: "Introduces motif models and profile-based motif discovery approaches.",
    },
    {
      title: "A survey on algorithms to characterize transcription factor binding sites",
      authors: "Tognon et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10422928/",
      note: "Reviews computational methods for transcription factor binding site characterization.",
    },
  ],

  "motif-enumeration": [
    {
      title: "A survey of DNA motif finding algorithms",
      authors: "Das and Dai",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2099490/",
      note: "Reviews exact and approximate motif finding strategies.",
    },
    {
      title: "Motif discovery and transcription factor binding sites before and after the next-generation sequencing era",
      authors: "Zambelli et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3603212/",
      note: "Discusses de novo prediction of over-represented transcription factor binding sites.",
    },
  ],

  "greedy-motif": [
    {
      title: "A survey of DNA motif finding algorithms",
      authors: "Das and Dai",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2099490/",
      note: "Provides background for heuristic motif finding methods.",
    },
    {
      title: "Pseudocounts for transcription factor binding sites",
      authors: "Nishida et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2647310/",
      note: "Discusses pseudocounts in motif/profile models.",
    },
  ],

  "randomized-motif": [
    {
      title: "A survey of DNA motif finding algorithms",
      authors: "Das and Dai",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2099490/",
      note: "Reviews stochastic and heuristic motif discovery approaches.",
    },
    {
      title: "Motif discovery and transcription factor binding sites before and after the next-generation sequencing era",
      authors: "Zambelli et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3603212/",
      note: "Places motif discovery algorithms in regulatory genomics context.",
    },
  ],

  gibbs: [
    {
      title: "Gibbs Recursive Sampler: finding transcription factor binding sites",
      authors: "Thompson et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC169014/",
      note: "Describes a Gibbs motif sampler variant for locating transcription factor binding sites.",
    },
    {
      title: "Gibbs motif sampling: detection of bacterial outer membrane protein repeats",
      authors: "Neuwald et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2143180/",
      note: "Uses Gibbs sampling for motif-region detection in biological sequences.",
    },
  ],

  entropy: [
    {
      title: "Pseudocounts for transcription factor binding sites",
      authors: "Nishida et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2647310/",
      note: "Discusses position-specific motif models and entropy-related motif properties.",
    },
    {
      title: "Motif models proposing independent and interdependent positions",
      authors: "Tsukanov et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9373801/",
      note: "Reviews position weight matrix models for transcription factor binding sites.",
    },
  ],

  "motif-score": [
    {
      title: "A survey of DNA motif finding algorithms",
      authors: "Das and Dai",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2099490/",
      note: "Provides context for motif scoring and motif-set comparison.",
    },
    {
      title: "Pseudocounts for transcription factor binding sites",
      authors: "Nishida et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2647310/",
      note: "Supports profile-based motif modeling and scoring context.",
    },
  ],

  skew: [
    {
      title: "SkewIT: The Skew Index Test for large-scale GC skew analysis",
      authors: "Lu and Salzberg",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7717575/",
      note: "Discusses GC skew as a phenomenon observed in many bacterial genomes.",
    },
    {
      title: "SkewDB, a comprehensive database of GC and other skews",
      authors: "Hubert et al.",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8941118/",
      note: "Defines GC skew as relative excess of G over C on leading versus lagging strands.",
    },
  ],

  palindrome: [
    {
      title: "Structure and function of type II restriction endonucleases",
      authors: "Pingoud and Jeltsch",
      source: "PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC55916/",
      note: "Type II restriction enzymes commonly recognize short palindromic DNA sequences.",
    },
    {
      title: "Identification of palindromic sequences recognized by restriction endonucleases",
      authors: "Fuchs et al.",
      source: "PubMed",
      url: "https://pubmed.ncbi.nlm.nih.gov/6253357/",
      note: "Early work on palindromic sequences recognized by restriction endonucleases.",
    },
  ],
};
