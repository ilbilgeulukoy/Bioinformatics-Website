import random
import numpy as np
from collections import defaultdict

def read_fasta(filename):
    """Reads a FASTA file and returns a list of DNA sequences."""
    sequences = []
    with open(filename, 'r') as f:
        sequence = ""
        for line in f:
            if line.startswith('>'):
                if sequence:
                    sequences.append(sequence)
                sequence = ""
            else:
                sequence += line.strip()
        if sequence:
            sequences.append(sequence)
    return sequences

def random_motifs(dna, k):
    """Selects a random k-mer from each DNA sequence."""
    return [seq[random.randint(0, len(seq) - k): random.randint(0, len(seq) - k) + k] for seq in dna]

def profile_with_pseudocounts(motifs):
    """Computes a profile matrix with pseudocounts."""
    k = len(motifs[0])
    t = len(motifs)
    profile = {nuc: [1] * k for nuc in "ACGT"}  # Pseudocounts
    
    for motif in motifs:
        for i, base in enumerate(motif):
            profile[base][i] += 1
    
    for nuc in "ACGT":
        profile[nuc] = [x / (t + 4) for x in profile[nuc]]  # Normalize
    
    return profile

def most_probable_kmer(text, k, profile):
    """Finds the most probable k-mer in a given DNA string based on a profile."""
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

def score(motifs):
    """Computes the score of a set of motifs based on consensus mismatch."""
    k = len(motifs[0])
    consensus = ""
    for i in range(k):
        column = [motif[i] for motif in motifs]
        max_count = max(column.count(nuc) for nuc in "ACGT")
        for nuc in "ACGT":
            if column.count(nuc) == max_count:
                consensus += nuc
                break
    
    return sum(sum(1 for i in range(k) if motif[i] != consensus[i]) for motif in motifs)

def randomized_motif_search(dna, k, iterations=1000):
    """Runs Randomized Motif Search multiple times and returns the best motifs."""
    best_motifs = random_motifs(dna, k)
    best_score = score(best_motifs)
    
    for _ in range(iterations):
        profile = profile_with_pseudocounts(best_motifs)
        motifs = [most_probable_kmer(seq, k, profile) for seq in dna]
        current_score = score(motifs)
        if current_score < best_score:
            best_motifs = motifs
            best_score = current_score
    
    return best_motifs

def main():
    filename = "upstream250.txt"
    k = 20  # Given motif length
    dna = read_fasta(filename)
    best_motifs = randomized_motif_search(dna, k, iterations=2000)
    print("\n".join(best_motifs))

if __name__ == "__main__":
    main()