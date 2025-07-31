def hamming_distance(p, q):
    """
    Compute the Hamming distance between two strings p and q.
    (i.e., the number of positions at which the symbols differ)
    """
    return sum(1 for a, b in zip(p, q) if a != b)

def Neighbors(pattern, d):
    """
    Generate the d-neighborhood of 'pattern', i.e., the set of all k-mers 
    that differ from 'pattern' by at most d mismatches.
    """
    if d == 0:
        return {pattern}
    if len(pattern) == 1:
        return {"A", "C", "G", "T"}
    
    neighborhood = set()
    suffix_neighbors = Neighbors(pattern[1:], d)
    for text in suffix_neighbors:
        if hamming_distance(pattern[1:], text) < d:
            for nucleotide in "ACGT":
                neighborhood.add(nucleotide + text)
        else:
            neighborhood.add(pattern[0] + text)
    return neighborhood

def reverse_complement(pattern):
    """
    Return the reverse complement of the DNA string 'pattern'.
    """
    complement = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}
    return "".join(complement[nuc] for nuc in reversed(pattern))

def FrequentWordsWithMismatchesAndRC(Text, k, d):
    """
    Find all most frequent k-mers (with mismatches and reverse complements) in Text.
    
    For each k-mer in Text, generate its d-neighborhood (all k-mers within d mismatches)
    and update a frequency map. Then, for each k-mer in the map, combine its count 
    with the count of its reverse complement. Finally, return those k-mers that maximize 
    this combined count.
    """
    freqMap = {}
    n = len(Text)
    
    # For every k-mer in Text, generate its d-neighborhood.
    for i in range(n - k + 1):
        pattern = Text[i:i+k]
        neighborhood = Neighbors(pattern, d)
        for neighbor in neighborhood:
            freqMap[neighbor] = freqMap.get(neighbor, 0) + 1

    # Combine counts for each k-mer with its reverse complement.
    combinedCounts = {}
    for pattern in freqMap:
        rc = reverse_complement(pattern)
        combinedCounts[pattern] = freqMap.get(pattern, 0) + freqMap.get(rc, 0)
    
    # Find the maximum combined frequency.
    maxCount = max(combinedCounts.values())
    
    # Return all k-mers with the maximum combined count.
    result = [pattern for pattern, count in combinedCounts.items() if count == maxCount]
    return result

if __name__ == "__main__":
    # Input: A DNA string and integers k and d.
    Text = input("Enter the text: ").strip().upper()
    k = int(input("Enter k: ").strip())
    d = int(input("Enter d: ").strip())
    
    # Find the most frequent k-mers with mismatches and reverse complements.
    result = FrequentWordsWithMismatchesAndRC(Text, k, d)
    print(" ".join(result))