def score(motifs):
    """Calculate the score of a set of motifs based on their consensus sequence."""
    consensus = "".join(max(set(col), key=col.count) for col in zip(*motifs))
    return sum(sum(1 for base in col if base != consensus[i]) for i, col in enumerate(zip(*motifs)))

def profile_with_pseudocounts(motifs, k):
    """Generate a profile matrix with pseudocounts for a given set of motifs."""
    counts = {'A': [1] * k, 'C': [1] * k, 'G': [1] * k, 'T': [1] * k}
    for motif in motifs:
        for i, base in enumerate(motif):
            counts[base][i] += 1

    t = len(motifs) + 4  # Total sequences + 4 pseudocounts
    return {base: [counts[base][i] / t for i in range(k)] for base in "ACGT"}

def most_probable_kmer(text, k, profile):
    """Find the most probable k-mer in a string based on the given profile matrix."""
    max_prob = -1
    best_kmer = text[:k]
    for i in range(len(text) - k + 1):
        kmer = text[i:i+k]
        prob = 1
        for j, base in enumerate(kmer):
            prob *= profile[base][j]
        if prob > max_prob:
            max_prob = prob
            best_kmer = kmer
    return best_kmer

def greedy_motif_search(dna, k, t):
    """Implement the GreedyMotifSearch algorithm with pseudocounts."""
    best_motifs = [seq[:k] for seq in dna]  # Initialize with first k-mers
    for i in range(len(dna[0]) - k + 1):
        motifs = [dna[0][i:i+k]]
        for j in range(1, t):
            profile = profile_with_pseudocounts(motifs, k)
            motifs.append(most_probable_kmer(dna[j], k, profile))
        if score(motifs) < score(best_motifs):
            best_motifs = motifs
    return best_motifs

# Read input
k, t = map(int, input().split())
dna = input().split()

# Run the algorithm and print the result
print(" ".join(greedy_motif_search(dna, k, t)))