import math

def Profile(Motifs):
    """
    Builds the profile matrix for a given set of motifs.

    The profile matrix is a representation where the frequency of each nucleotide A, C, G, and T at every position 
    across a set of sequences is captured.

    Parameters:
    Motifs (list of str): A list of strings representing a set of motifs.

    Returns:
    list: A list containing the profile matrix, where each element is a list corresponding to the frequencies of 
    A, C, G, and T at each position in the motifs.
    """
    # Initialize an empty list P to store the profile matrix
    P = []
    # Iterate over each position in the motifs
    for i in range(len(Motifs[0])):
        # Initialize the nucleotide count list for the current position
        P.append([])
        # Iterate over the nucleotides "A", "C", "G", "T"
        for j in ["A", "C", "G", "T"]:
            # Initialize the counter for the current nucleotide
            count = 0
            # Iterate over each sequence in the motifs
            for k in range(len(Motifs)):
                # If the nucleotide at the current position matches the current nucleotide type
                if Motifs[k][i] == j:
                    # Increment the counter
                    count += 1
            # Add the frequency of the current nucleotide at this position to the profile matrix
            P[i].append(count / len(Motifs))
    # Return the constructed profile matrix
    return P

def Entropy(P):
    """
    Calculate the entropy of a given probability distribution P.

    Entropy is an important concept in information theory, representing a measure of uncertainty. 
    The higher the entropy of a distribution, the greater its uncertainty.

    Parameters:
    P: list or array-like object
        Probability distribution represented by a set of non-negative numbers that sum to 1.

    Returns:
    float
        The entropy of the distribution P.
    """
    # Initialize a list H to store the entropy value for each probability
    H = []

    # Iterate through each element in the probability distribution P
    for i in range(len(P)):
        # If the current element is not 0, calculate its corresponding entropy value and append it to H
        if P[i] != 0:
            H.append(-P[i] * math.log2(P[i]))
        # If the current element is 0, its corresponding entropy is 0; append this to H
        elif P[i] == 0:
            H.append(0)

    # Return the sum of all elements in H, which represents the entropy of the probability distribution P
    return sum(H)

def EntropySum(P):
    """
    Calculate the sum of entropy for a given probability distribution P.

    Parameters:
    P (list): A list containing probabilities of events, where the sum of these probabilities equals 1.

    Returns:
    float: The total sum of entropy for all events in P.

    Note:
    Entropy is an important concept in information theory that measures the uncertainty of information. 
    Here, we assume the function Entropy(x) is already defined to calculate the entropy of a single event.
    This function computes the total entropy of the entire probability distribution by passing each event's probability 
    in P to the Entropy function and summing up the results.
    """
    return sum(Entropy(x) for x in P)

Motifs = [
    'TCGGGGGTTTTT',
    'CCGGTGACTTAC',
    'ACGGGGATTTTC',
    'TTGGGGACTTTT',
    'AAGGGGACTTCC',
    'TTGGGGACTTCC',
    'TCGGGGATTCAT',
    'TCGGGGATTCCT',
    'TAGGGGAACTAC',
    'TCGGGTATAACC'
]

print(EntropySum(Profile(Motifs)))