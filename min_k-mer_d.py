from itertools import product

def hamming_distance(s1, s2):
    """Compute the Hamming distance between two strings."""
    return sum(c1 != c2 for c1, c2 in zip(s1, s2))

def d(pattern, dna_list):
    """Compute the total distance from pattern to all sequences in dna_list."""
    k = len(pattern)
    total_distance = 0
    for dna in dna_list:
        min_dist = min(hamming_distance(pattern, dna[i:i+k]) for i in range(len(dna) - k + 1))
        total_distance += min_dist
    return total_distance

def median_string(k, dna_list):
    """Find the k-mer that minimizes d(Pattern, Dna)."""
    min_distance = float('inf')
    median = None
    
    for pattern in map("".join, product("ACGT", repeat=k)):
        curr_distance = d(pattern, dna_list)
        if curr_distance < min_distance:
            min_distance = curr_distance
            median = pattern
    
    return median

if __name__ == "__main__":
    k = int(input())
    dna_list = input().split()
    
    result = median_string(k, dna_list)
    print(result)