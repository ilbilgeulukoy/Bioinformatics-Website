import random

def hamming_distance(p, q):
    """Return the Hamming distance between strings p and q."""
    return sum(1 for a, b in zip(p, q) if a != b)

def score(motifs):
    """
    Compute the score of a set of motifs.
    The score is the sum of Hamming distances between each motif and the consensus.
    """
    consensus = ""
    k = len(motifs[0])
    for i in range(k):
        column = [motif[i] for motif in motifs]
        # Tie-break: choose the first nucleotide (in "ACGT") that achieves the max count.
        max_count = max(column.count(nuc) for nuc in "ACGT")
        for nuc in "ACGT":
            if column.count(nuc) == max_count:
                consensus += nuc
                break
    return sum(hamming_distance(motif, consensus) for motif in motifs)

def profile_with_pseudocounts(motifs, k):
    """Return a profile matrix with pseudocounts (as a dictionary) for the given motifs."""
    t = len(motifs)
    counts = { "A": [1] * k, "C": [1] * k, "G": [1] * k, "T": [1] * k }
    for motif in motifs:
        for i, nucleotide in enumerate(motif):
            counts[nucleotide][i] += 1
    # Normalize: each column's sum is t + 4 (due to the 4 pseudocounts)
    profile = {}
    for nuc in "ACGT":
        profile[nuc] = [count / (t + 4) for count in counts[nuc]]
    return profile

def most_probable_kmer(text, k, profile):
    """Return the profile-most probable k-mer in text using the given profile."""
    max_prob = -1
    best_kmer = text[:k]
    for i in range(len(text) - k + 1):
        kmer = text[i:i+k]
        prob = 1
        for j, nucleotide in enumerate(kmer):
            prob *= profile[nucleotide][j]
        if prob > max_prob:
            max_prob = prob
            best_kmer = kmer
    return best_kmer

def random_motifs(dna, k, t):
    """Randomly select a k-mer from each string in dna."""
    motifs = []
    for s in dna:
        start = random.randint(0, len(s) - k)
        motifs.append(s[start:start+k])
    return motifs

def randomized_motif_search(dna, k, t):
    """Perform one instance of Randomized Motif Search using pseudocounts."""
    motifs = random_motifs(dna, k, t)
    best_motifs = list(motifs)
    while True:
        prof = profile_with_pseudocounts(motifs, k)
        new_motifs = [most_probable_kmer(s, k, prof) for s in dna]
        if score(new_motifs) < score(best_motifs):
            best_motifs = list(new_motifs)
            motifs = list(new_motifs)
        else:
            return best_motifs

def main():
    # Read input: first line contains k and t, second line contains t DNA strings.
    line1 = input().strip()  # e.g., "8 5"
    k, t = map(int, line1.split())
    line2 = input().strip()  # e.g., "CGCCCCTCTCGGGGGTGTTCAGTAAACGGCCA GGGCGAGGTATGTGTAAGTGCCAAGGTGCCAG ..."
    dna = line2.split()
    
    best_overall = None
    best_score = float('inf')
    iterations = 1000
    
    for i in range(iterations):
        motifs = randomized_motif_search(dna, k, t)
        current_score = score(motifs)
        if current_score < best_score:
            best_score = current_score
            best_overall = motifs
    
    print(" ".join(best_overall))

if __name__ == "__main__":
    main()