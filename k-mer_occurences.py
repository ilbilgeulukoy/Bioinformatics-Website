def expected_kmer_occurrences(kmer_length, sequence_length, num_sequences):
    """
    Calculate the expected number of occurrences of a specific k-mer in multiple random DNA sequences.

    Parameters:
    - kmer_length (int): Length of the k-mer
    - sequence_length (int): Length of each DNA sequence
    - num_sequences (int): Number of sequences

    Returns:
    - float: Expected number of occurrences of the k-mer
    """
    # Number of possible starting positions in one sequence
    num_positions = sequence_length - kmer_length + 1

    # Probability of a specific k-mer occurring at any given position
    prob_kmer = (0.25) ** kmer_length

    # Expected occurrences in one sequence
    expected_per_sequence = num_positions * prob_kmer

    # Expected occurrences across all sequences
    expected_total = num_sequences * expected_per_sequence

    return round(expected_total, 4)


# Example usage
kmer_length = 9
sequence_length = 1000
num_sequences = 500

expected_count = expected_kmer_occurrences(kmer_length, sequence_length, num_sequences)
print(f"Expected occurrences of a {kmer_length}-mer: {expected_count}")