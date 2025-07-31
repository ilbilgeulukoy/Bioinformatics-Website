def hamming_distance(p, q):
    """Return the Hamming distance between two strings p and q."""
    return sum(1 for a, b in zip(p, q) if a != b)

def Neighbors(pattern, d):
    """
    Return the set of all strings that are at most d mismatches away from pattern.
    
    Parameters:
        pattern (str): The original string.
        d (int): The maximum number of mismatches allowed.
    
    Returns:
        set: A set containing all neighbors (strings with at most d mismatches).
    """
    if d == 0:
        return {pattern}
    if len(pattern) == 1:
        return {"A", "C", "G", "T"}
    
    neighborhood = set()
    suffix = pattern[1:]
    suffix_neighbors = Neighbors(suffix, d)
    
    for text in suffix_neighbors:
        # If the suffix neighbor is already d mismatches away, we cannot introduce a new mismatch at the first position.
        if hamming_distance(suffix, text) < d:
            # We have room for one mismatch; any nucleotide can be added at the front.
            for nucleotide in "ACGT":
                neighborhood.add(nucleotide + text)
        else:
            # We already reached d mismatches in the suffix; must keep the original first symbol.
            neighborhood.add(pattern[0] + text)
    
    return neighborhood

if __name__ == "__main__":
    # Read input from the user.
    # Sample Input:
    # ACG
    # 1
    pattern = input().strip()
    d = int(input().strip())
    
    # Generate the d-neighborhood of the pattern.
    neighbors = Neighbors(pattern, d)
    
    # Print each neighbor on a new line.
    for neighbor in neighbors:
        print(neighbor)