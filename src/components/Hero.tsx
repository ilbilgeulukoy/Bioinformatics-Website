function Hero() {
  return (
    <section id="top" className="hero">
      <div className="heroText">
        <p className="eyebrow">Foundational computational methods</p>

        <h1>
          Bioinformatics algorithms
          <span>for DNA sequence analysis.</span>
        </h1>

        <p className="subtitle">
          A structured reference for exact and approximate string matching,
          k-mer probability models, motif discovery, entropy-based motif
          evaluation, genome skew, and reverse-complement palindromic sequences.
        </p>
      </div>

      <aside className="heroPanel">
        <p className="panelTitle">Scope</p>
        <h2>Core methods</h2>
        <p>
          The methods are based on the Python scripts in the repository. Each
          entry includes a definition, computational formulation, input and
          output description, and, where suitable, a browser-based simulation.
        </p>
      </aside>
    </section>
  );
}

export default Hero;
