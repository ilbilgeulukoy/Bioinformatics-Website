from math import ceil

def max_score(num_motifs, motif_length):
    """Compute the maximum possible Score(Motifs)"""
    num_nucleotides = 4  # A, C, G, T
    max_mismatches_per_column = num_motifs - ceil(num_motifs / num_nucleotides)
    return max_mismatches_per_column * motif_length

if __name__ == "__main__":
    num_motifs = 10  # Given number of motifs
    motif_length = 15  # Given length of motifs
    
    result = max_score(num_motifs, motif_length)
    print(result)
