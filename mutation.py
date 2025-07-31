def hamming_distance(p, q):
    """
    Compute the Hamming distance between two strings p and q.
    The Hamming distance is defined as the number of positions
    at which the corresponding symbols differ.
    """
    if len(p) != len(q):
        raise ValueError("Strings must be of equal length")
    return sum(1 for a, b in zip(p, q) if a != b)

if __name__ == "__main__":
    p = input("Enter the first string: ").strip()
    q = input("Enter the second string: ").strip()
    
    # Calculate the Hamming distance
    distance = hamming_distance(p, q)
    
    # Print the result with a descriptive message
    print(f"The Hamming distance (number of mutations) is: {distance}")
    