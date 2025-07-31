import sys

def hamming_distance(p1, p2):
    """Calculate the Hamming distance between two equal-length strings."""
    return sum(1 for x, y in zip(p1, p2) if x != y)

def distance_between_pattern_and_strings(pattern, dna_list):
    """Calculate d(Pattern, Dna), the sum of distances between pattern and each DNA string."""
    k = len(pattern)
    total_distance = 0
    
    for text in dna_list:
        min_hamming_distance = float('inf')
        
        # Check all k-mers in the current DNA string
        for i in range(len(text) - k + 1):
            kmer = text[i:i+k]
            curr_distance = hamming_distance(pattern, kmer)
            
            if curr_distance < min_hamming_distance:
                min_hamming_distance = curr_distance
        
        total_distance += min_hamming_distance
    
    return total_distance

# Read input from a file
with open("dataset_30312_1-3.txt", "r") as file:
    lines = file.read().splitlines()

# Extract pattern and DNA sequences
pattern = lines[0].strip()
dna_strings = lines[1].strip().split()  # Splitting on spaces

# Compute and print the result
result = distance_between_pattern_and_strings(pattern, dna_strings)
print(result)

