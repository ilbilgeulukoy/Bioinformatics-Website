def hamming_distance(s1, s2):
    """Compute the Hamming distance between two equal-length DNA strings."""
    return sum(1 for a, b in zip(s1, s2) if a != b)

seq1 = "TGACCCGTTATGCTCGAGTTCGGTCAGAGCGTCATTGCGAGTAGTCGTTTGCTTTCTCAAACTCC"
seq2 = "GAGCGATTAAGCGTGACAGCCCCAGGGAACCCACAAAACGTGATCGCAGTCCATCCGATCATACA"

print(hamming_distance(seq1, seq2))  