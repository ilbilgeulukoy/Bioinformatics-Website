def compute_skew(sequence):
    """Computes the skew at each position of the given DNA sequence."""
    skew = [0]  # Skew starts at 0
    min_skew = 0
    min_positions = [0]  # Track positions where minimum skew occurs

    for i, nucleotide in enumerate(sequence):
        if nucleotide == 'G':
            skew.append(skew[-1] + 1)
        elif nucleotide == 'C':
            skew.append(skew[-1] - 1)
        else:
            skew.append(skew[-1])  # A and T do not change the skew
        
        # Update min skew and track positions
        if skew[-1] < min_skew:
            min_skew = skew[-1]
            min_positions = [i + 1]  # Reset list with new min position
        elif skew[-1] == min_skew:
            min_positions.append(i + 1)

    return skew, min_positions


def read_sequence_from_file(filename):
    """Reads a DNA sequence from a file and removes any whitespace."""
    with open(filename, 'r') as file:
        return file.read().replace('\n', '').strip()


def main():
    import sys
    if len(sys.argv) > 1:
        # Read sequence from a file if a filename is provided
        filename = sys.argv[1]
        sequence = read_sequence_from_file(filename)
    else:
        # Otherwise, take user input
        sequence = input("Enter a DNA sequence: ").strip()

    # Compute skew and find minimum skew positions
    skew_values, min_skew_positions = compute_skew(sequence)

    # Output results
    print("Minimum skew value occurs at positions:", *min_skew_positions)
    
    # Optionally, print full skew values (comment out if not needed)
    # print("Skew values:", skew_values)


if __name__ == "__main__":
    main()
