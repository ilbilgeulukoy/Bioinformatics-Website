def calculate_tm(primer_sequence):
    """
    Calculate the melting temperature (Tm) of a PCR primer using the basic formula:
    Tm = 2°C * (A + T) + 4°C * (G + C)

    Parameters:
    primer_sequence (str): The DNA primer sequence (e.g., "ATGCATGC").

    Returns:
    float: The calculated Tm value in Celsius.
    """
    
    # Convert the primer sequence to uppercase to avoid errors with case sensitivity
    primer_sequence = primer_sequence.upper()

    # Count occurrences of each nucleotide in the sequence
    A_count = primer_sequence.count('A')
    T_count = primer_sequence.count('T')
    G_count = primer_sequence.count('G')
    C_count = primer_sequence.count('C')

    # Calculate Tm using the basic formula
    tm = (2 * (A_count + T_count)) + (4 * (G_count + C_count))

    return tm

# Example usage
primer = "ATGCATGC"
tm_value = calculate_tm(primer)
print(f"Melting temperature (Tm) for the primer {primer}: {tm_value} °C")
