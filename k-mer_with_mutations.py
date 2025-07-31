def hamming_distance(p, q):
    """
    Compute the Hamming distance between two strings p and q.
    The Hamming distance is the number of positions where the characters differ.
    """
    return sum(1 for a, b in zip(p, q) if a != b)

def Neighbors(pattern, d):
    """
    Generate the d-neighborhood of 'pattern', i.e., the set of all k-mers
    that differ from 'pattern' by at most d mismatches.
    
    This is done recursively:
      - If d is 0, return the pattern itself.
      - If the pattern has length 1, return all nucleotides.
      - Otherwise, recursively compute the neighbors for the suffix and
        combine them appropriately with each nucleotide at the first position.
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

def FrequentWordsWithMismatches(Text, k, d):
    """
    Find all most frequent k-mers with up to d mismatches in Text.
    
    For every k-mer in Text, generate its d-neighborhood, then count each
    neighbor's frequency across the entire text. Finally, return the k-mers
    that have the maximum frequency.
    """
    freqMap = {}
    n = len(Text)
    
    # For every k-mer in Text:
    for i in range(n - k + 1):
        pattern = Text[i:i+k]
        neighborhood = Neighbors(pattern, d)
        for neighbor in neighborhood:
            if neighbor not in freqMap:
                freqMap[neighbor] = 0
            freqMap[neighbor] += 1
    
    # Find the maximum frequency in the frequency map.
    maxCount = max(freqMap.values())
    
    # Collect all k-mers that achieve this maximum frequency.
    mostFrequent = [pattern for pattern, count in freqMap.items() if count == maxCount]
    
    return mostFrequent

if __name__ == "__main__":
    Text = input("Enter the text: ").strip().upper()
    k = int(input("Enter k: ").strip())
    d = int(input("Enter d: ").strip())
    
    result = FrequentWordsWithMismatches(Text, k, d)
    print("Most frequent k-mers with up to d mismatches:")
    print(" ".join(result))