def find_pattern(sequence, pattern):
    positions = []  # List to store positions
    for i in range(len(sequence) - len(pattern) + 1):
        if sequence[i:i+len(pattern)] == pattern:
            positions.append(i)
    return positions

# Example usage
sequence = input("Enter the sequence: ").strip()
pattern = input("Enter the pattern: ").strip()

positions = find_pattern(sequence, pattern)

if positions:
    print("Pattern found at positions:", " ".join(map(str, positions)))
else:
    print("Pattern not found.")

