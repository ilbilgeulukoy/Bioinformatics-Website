import random

def generate_palindromic_sequence(length):
    # Ensure length is even to make the palindromic sequence possible
    if length % 2 != 0:
        print("Length should be even for palindromic sequence")
        return None

    # Define the possible nucleotides
    nucleotides = ['A', 'T', 'C', 'G']

    # Generate the first half of the sequence randomly
    half_sequence = random.choices(nucleotides, k=length // 2)

    # Create the second half by taking the reverse complement of the first half
    complement = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}
    second_half = [complement[base] for base in reversed(half_sequence)]

    # Combine both halves to form the palindromic sequence
    palindromic_sequence = half_sequence + second_half

    # Convert list to string
    return ''.join(palindromic_sequence)

# Example usage:
length = 200
  # Length of the palindromic sequence (must be even)
palindrome = generate_palindromic_sequence(length)
if palindrome:
    print(f"Generated Palindromic Sequence: {palindrome}")
