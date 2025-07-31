def hamming_distance(p, q):
    """
    Compute the Hamming distance between two strings p and q.
    The Hamming distance is the number of positions where the characters differ.
    """
    return sum(1 for a, b in zip(p, q) if a != b)

def count_approximate_occurrences(text, pattern, d):
    """
    Count the number of occurrences of 'pattern' in 'text' 
    with at most d mismatches.
    
    Parameters:
        text (str): The text (or DNA string) to search within.
        pattern (str): The pattern (k-mer) to search for.
        d (int): Maximum number of mismatches allowed.
        
    Returns:
        int: The total count of approximate occurrences.
    """
    count = 0
    k = len(pattern)
    for i in range(len(text) - k + 1):
        substring = text[i:i+k]
        if hamming_distance(substring, pattern) <= d:
            count += 1
    return count

if __name__ == "__main__":
    # Given sample input:
    text = "GGACAAGGCCATGGGTCCCTATCCGTGGATGGTCAGTAAACGTGTTAATGTCGGATTGATATTCCGGTTCAAAACTCCAATCGATGTAGGGTAGGATCAAAATTGCCCTGCGTCACCTCTTTTGTTATATAGCTATCTGCGGATCCCCATCGGATACAAGATATGGTTTTTCAACGGAATGCTAGCGCCCGTGGAGAATTGCGTGATAGAGACACCGTCTTAAGGTATGAACTATGTTGTGTGTGGTCGCCCGTGCATAGTCTTAAAAGCGCCTTTAAGAGGCAATAACTACTTACTGTCTTATACACAGTTTACATACCCCGTATATTAACATTAAACACGGTAGCTAATATACTCAGGAAGCCGTGCGTCACCGGAATGTTTA"
    pattern = "CGTGCAT"
    d = 3

    # Calculate Count₂, i.e., the number of occurrences with ≤ 2 mismatches
    result = count_approximate_occurrences(text, pattern, d)
    print(result)