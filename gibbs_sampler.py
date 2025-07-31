import sys
import random

def score(motifs):
    """
    Compute the score of a set of motifs.
    Score is the sum of the Hamming distances between each motif and the consensus.
    """
    k = len(motifs[0])
    consensus = ""
    for i in range(k):
        column = [motif[i] for motif in motifs]
        # Pick the nucleotide (in the order A, C, G, T) with the highest frequency.
        max_count = max(column.count(nuc) for nuc in "ACGT")
        for nuc in "ACGT":
            if column.count(nuc) == max_count:
                consensus += nuc
                break
    total = 0
    for motif in motifs:
        total += sum(1 for i in range(k) if motif[i] != consensus[i])
    return total

def profile_with_pseudocounts(motifs, k):
    """Return a profile matrix (dictionary) with pseudocounts for the given motifs."""
    t = len(motifs)
    counts = { "A": [1]*k, "C": [1]*k, "G": [1]*k, "T": [1]*k }
    for motif in motifs:
        for i, nucleotide in enumerate(motif):
            counts[nucleotide][i] += 1
    # Normalize each column: denominator is t+4 (since we added 1 to each of 4 nucleotides)
    profile = {}
    for nuc in "ACGT":
        profile[nuc] = [count / (t + 4) for count in counts[nuc]]
    return profile

def random_motifs(dna, k, t):
    """Randomly select one k-mer from each string in dna."""
    motifs = []
    for string in dna:
        start = random.randint(0, len(string) - k)
        motifs.append(string[start:start+k])
    return motifs

def weighted_random_kmer(text, k, profile):
    """
    Randomly select a k-mer from text according to the probability distribution
    induced by the profile matrix.
    """
    kmers = []
    probabilities = []
    for i in range(len(text) - k + 1):
        kmer = text[i:i+k]
        prob = 1
        for j, nucleotide in enumerate(kmer):
            prob *= profile[nucleotide][j]
        kmers.append(kmer)
        probabilities.append(prob)
    total = sum(probabilities)
    if total == 0:
        return random.choice(kmers)
    normalized = [p/total for p in probabilities]
    return random.choices(kmers, weights=normalized, k=1)[0]

def gibbs_sampler(dna, k, t, N):
    """
    Perform one run of the GibbsSampler with pseudocounts.
    
    dna: list of DNA strings
    k: motif length
    t: number of DNA strings
    N: number of iterations
    """
    motifs = random_motifs(dna, k, t)
    best_motifs = list(motifs)
    
    for j in range(N):
        i = random.randint(0, t - 1)
        # Remove motif i from the current motifs.
        motifs_except_i = motifs[:i] + motifs[i+1:]
        profile = profile_with_pseudocounts(motifs_except_i, k)
        # Sample a new k-mer for the i-th string based on the profile.
        new_motif = weighted_random_kmer(dna[i], k, profile)
        motifs[i] = new_motif
        
        if score(motifs) < score(best_motifs):
            best_motifs = list(motifs)
    
    return best_motifs

def run_gibbs_sampler(dna, k, t, N, iterations=20):
    """
    Run GibbsSampler (with pseudocounts) for a given number of random starts.
    Returns the best set of motifs (lowest score) over all runs.
    """
    best_overall = None
    best_score = float('inf')
    for _ in range(iterations):
        motifs = gibbs_sampler(dna, k, t, N)
        s = score(motifs)
        if s < best_score:
            best_score = s
            best_overall = motifs
    return best_overall

def main():
    # Read input:
    # First line: three integers: k, t, N
    # Second line: t space-separated DNA strings.
    line1 = input().strip()
    k, t, N = map(int, line1.split())
    line2 = input().strip()
    dna = line2.split()
    
    best_motifs = run_gibbs_sampler(dna, k, t, N, iterations=20)
    print(" ".join(best_motifs))

if __name__ == '__main__':
    main()