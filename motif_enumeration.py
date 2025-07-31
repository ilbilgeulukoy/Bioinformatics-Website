from itertools import product  # Fix: Import product

def hamming_distance(s1, s2):
    """Calculate the Hamming distance between two strings."""
    return sum(c1 != c2 for c1, c2 in zip(s1, s2))

def generate_neighbors(pattern, d):
    """Generate all k-mers that differ from the given pattern by at most d mismatches."""
    nucleotides = ['A', 'C', 'G', 'T']
    k = len(pattern)
    neighbors = set()
    
    for positions in product(nucleotides, repeat=k):  # Ensure 'product' is imported
        candidate = ''.join(positions)
        if hamming_distance(pattern, candidate) <= d:
            neighbors.add(candidate)
    
    return neighbors

def appears_in_all(pattern, dna_list, d):
    """Check if a pattern appears in all strings of dna_list with at most d mismatches."""
    k = len(pattern)
    for dna in dna_list:
        found = any(hamming_distance(pattern, dna[i:i+k]) <= d for i in range(len(dna) - k + 1))
        if not found:
            return False
    return True

def motif_enumeration(dna_list, k, d):
    """Find all (k, d)-motifs in Dna."""
    patterns = set()
    
    for dna in dna_list:
        for i in range(len(dna) - k + 1):
            pattern = dna[i:i+k]
            neighbors = generate_neighbors(pattern, d)
            for neighbor in neighbors:
                if appears_in_all(neighbor, dna_list, d):
                    patterns.add(neighbor)
    
    return sorted(patterns)

if __name__ == "__main__":
    # Read input
    k, d = map(int, input().split())
    dna_list = input().split()
    
    # Compute motifs
    result = motif_enumeration(dna_list, k, d)
    
    # Print output
    print(" ".join(result))