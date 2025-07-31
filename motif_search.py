def profile_most_probable_kmer(dna, k, profile):
    max_prob = -1
    most_probable_kmer = dna[:k]  # Default to first k-mer

    for i in range(len(dna) - k + 1):
        kmer = dna[i:i + k]
        prob = 1

        for j, nucleotide in enumerate(kmer):
            if nucleotide == 'A':
                prob *= profile[0][j]
            elif nucleotide == 'C':
                prob *= profile[1][j]
            elif nucleotide == 'G':
                prob *= profile[2][j]
            elif nucleotide == 'T':
                prob *= profile[3][j]

        if prob > max_prob:
            max_prob = prob
            most_probable_kmer = kmer

    return most_probable_kmer


# Read input
dna = input().strip()
k = int(input().strip())

profile = []
for _ in range(4):
    profile.append(list(map(float, input().strip().split())))

# Find and print the most probable k-mer
print(profile_most_probable_kmer(dna, k, profile))