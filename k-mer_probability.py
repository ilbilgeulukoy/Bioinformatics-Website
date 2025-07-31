def probability_at_least_two_implanted(n=10, string_length=600, k=15):
    """
    Compute the probability that, in n independent strings of given length,
    each having one implanted k-mer (with total positions = string_length - k + 1),
    at least two of the randomly chosen k-mers are exactly the implanted ones.
    """
    total_positions = string_length - k + 1  # 600 - 15 + 1 = 586
    p = 1 / total_positions                 # probability to capture the implanted k-mer in one string
    q = 1 - p                               # probability to not capture the implanted k-mer
    
    # Binomial: X ~ Binomial(n, p)
    # P(X>=2) = 1 - P(X=0) - P(X=1)
    prob_zero = q ** n
    prob_one = n * p * (q ** (n - 1))
    return 1 - prob_zero - prob_one

if __name__ == '__main__':
    probability = probability_at_least_two_implanted()
    print(probability)