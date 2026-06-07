function Navbar() {
  return (
    <nav className="nav">
      <a className="brand" href="#top">
        <img src={import.meta.env.BASE_URL + "logo.png"} alt="Bioinformatics Algorithms logo" />
        <span>
          <strong>Bioinformatics Algorithms</strong>
          <em>DNA sequence analysis</em>
        </span>
      </a>

      <div className="navLinks">
        <a href="#methods">Methods</a>
        <a href="#detail">Detail</a>
        <a href="#source">Source</a>
      </div>
    </nav>
  );
}

export default Navbar;
