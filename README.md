https://ilbilgeulukoy.github.io/Bioinformatics-Website/

# Bioinfo Algorithms

Bioinfo Algorithms is an educational bioinformatics project that explains core DNA sequence analysis algorithms with Python implementations and beginner-friendly examples.

The goal of this project is to transform foundational bioinformatics programming exercises into a clear learning resource for students interested in computational biology, genomics, and algorithmic thinking.

## Project Overview

This repository contains Python implementations of classic bioinformatics algorithms used to analyze DNA sequences, detect patterns, compare sequence similarity, explore mutations, and discover motifs.

The project also includes a Vite/React website structure, which will be used to present these algorithms as an interactive educational website.

## Topics Covered

This project includes algorithms and concepts such as:

* K-mer counting
* Pattern matching in DNA sequences
* Reverse complement analysis
* Palindromic sequence detection
* Hamming distance
* Approximate pattern matching
* Neighborhood generation
* Motif enumeration
* Motif scoring
* Greedy motif search
* Randomized motif search
* Gibbs sampling
* Entropy-based motif analysis
* Genome skew analysis

## Why This Project Matters

Many bioinformatics problems start with a simple question:

How can we find meaningful patterns inside biological sequences?

These patterns can help identify repeated DNA words, regulatory motifs, mutations, conserved regions, and biologically relevant sequence signals.

This project connects biological questions with algorithmic solutions using Python.

## Example Algorithms

### K-mer Counting

K-mers are short DNA words of length k.

For example, in the DNA sequence:

ACGTTGCATGTCGCATGATGCATGAGAGCT

a k-mer counting algorithm can identify repeated patterns and frequent DNA words.

### Hamming Distance

Hamming distance measures how many positions differ between two sequences of the same length.

Example:

GGGCCGTTGGT
GGACCGTTGAC

The Hamming distance helps compare similar DNA sequences and detect mutations.

### Motif Search

Motifs are short recurring patterns that may have biological meaning, such as transcription factor binding sites.

Motif search algorithms help identify conserved patterns across multiple DNA sequences.

## Repository Structure

The repository currently contains Python scripts implementing bioinformatics algorithms, as well as a web application structure.

Main files include:

* count_pattern.py
* hamming_distance.py
* mutation.py
* neighbourhood.py
* motif_enumeration.py
* motif_score.py
* motif_search.py
* greedy_motif.py
* RandomizedMotifSearch.py
* gibbs_sampler.py
* entropy.py
* skew_v2.py
* palindrom.py

Website-related files include:

* src/
* public/
* index.html
* package.json
* vite.config.ts

## Planned Website

The website version of this project will include:

* Algorithm explanation cards
* Beginner-friendly bioinformatics lessons
* DNA sequence examples
* Python implementation links
* Interactive pattern matching examples
* Visual explanations of motif search and sequence comparison

## Technologies Used

* Python
* React
* TypeScript
* Vite
* GitHub Pages

## How to Run the Website Locally

Install dependencies:

npm install

Start the development server:

npm run dev

Then open the local URL shown in the terminal.


## Author

Created by Ilbilge Ulukoy.

This project was built as a bioinformatics learning and portfolio project, combining Python programming, sequence analysis, and educational web development.
